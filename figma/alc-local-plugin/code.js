// ALC review set — finish pass. Run in Figma desktop (Georgia + Trebuchet MS must be installed).
// Scope: section `05 · ALC · review set` only. Never deletes; hides instead. Ends with a placeholder audit.

const SECTION_ID = '1801:97499';
const PLACEHOLDER = /TBC|XXXX|\[dynamic\]|Kobo Plus|lorem|insert here|KWL/i;
const RED = { r: 191 / 255, g: 0, b: 0 };
const ORANGE = { r: 203 / 255, g: 79 / 255, b: 17 / 255 };
const LEGAL = '*Represents books obtained directly from Rakuten Kobo. Any eBook omnibus or series collection published as a single eBook is counted as one book.';
const COVER_TITLES = {
  the_long_way_home: 'The Long Way Home', long_way_home: 'The Long Way Home', funny_story: 'Funny Story',
  james: 'James', the_women: 'The Women', god_of_the_woods: 'The God of the Woods', intermezzo: 'Intermezzo', truly: 'Truly',
};
const DISCOVER_ORDER = ['James', 'The Women', 'The God of the Woods', 'Intermezzo'];
const FRAME_RENAMES = [
  [/ALC · 01 BASELINE/, 'ALC · Opt 1'], [/ALC · 02 OPTION A — restructured/, 'ALC · Opt 3'],
  [/ALC · 03 OPTION B — reference-led/, 'ALC · Alt 1'], [/ALC · 04 ALT — middle ground/, 'ALC · Alt 2'],
  [/ · ORANGE colourway/, ' · ORANGE'],
];
const STRING_FIXES = [
  [/YOUR 2026 KOBO PLUS READING LIFE/g, 'YOUR 2026 READING LIFE'],
  [/our\s+Kobo Plus readers\s+around/g, 'our readers around'],
  [/1,800,000|XXXX/g, '2,400,000'],
  [/Your Kobo Plus\s+year at a glance/g, 'The year at a glance'],
  [/The most read Kobo Plus book in Canada:/g, 'The most read book in Canada:'],
  [/Thank you for making Kobo your home for reading and listening/g, 'Thank you for reading with us'],
];
const OPT2_STATS = { '32': '40', '186': '242', '12': '15', '74': '91' };

const log = { renamed: 0, text: 0, covers: 0, beyond: 0, hidden: 0, corners: 0, recolour: 0, swaps: 0, copied: 0, warnings: [] };

async function loadFonts(t) {
  const fonts = t.characters.length ? t.getStyledTextSegments(['fontName']).map(s => s.fontName) : [t.fontName];
  for (const f of fonts) if (f !== figma.mixed) await figma.loadFontAsync(f);
}
async function setText(t, s) {
  if (t.characters === s) return false;
  try { await loadFonts(t); t.characters = s; log.text++; return true; }
  catch (e) { log.warnings.push(`${t.id} "${t.characters.slice(0, 40)}": ${e.message}`); return false; }
}
const isVisible = n => { for (let p = n; p && p.type !== 'SECTION'; p = p.parent) if (p.visible === false) return false; return true; };
const outerInstance = n => { let o = null; for (let p = n.parent; p && p.type !== 'SECTION'; p = p.parent) if (p.type === 'INSTANCE') o = p; return o; };
const inFooterOrHeader = t => { for (let p = t.parent; p && p.type !== 'SECTION'; p = p.parent) if (/^(Footer · 2025|Header Email · 2025|Band · Footer|Band · Header)/.test(p.name)) return true; return false; };
const pathOf = (n, root) => { const a = []; for (let p = n; p !== root; p = p.parent) a.unshift(p.parent.children.indexOf(p)); return a.join('.'); };
const keyOf = (t, root) => { const oi = outerInstance(t); return oi ? pathOf(oi, root) + '|' + t.id.split(';').slice(1).join(';') : pathOf(t, root); };
const isBlue = c => c.b > c.r + 0.15;

async function fixFrame(F) {
  const isOrange = / · ORANGE/.test(F.name);
  const isOpt2 = /^ALC · Opt 2/.test(F.name);
  const texts = F.findAllWithCriteria({ types: ['TEXT'] });

  // 1. "beyond" slots → ALC-only eBook stats (deck rows 24 + 28–29, which have no other home)
  const beyond = texts.filter(t => /K\+-only slot|beyond Kobo Plus/i.test(t.name) ||
    (() => { for (let p = t.parent; p && p !== F; p = p.parent) if (/beyond Kobo Plus/i.test(p.name) || /^Tile · Beyond/.test(p.name)) return true; return false; })());
  const vals = ['12,904', '23'], labels = ['PAGES TURNED', 'LONGEST READING STREAK (DAYS)'];
  let vi = 0, li = 0;
  for (const t of beyond) {
    const size = t.fontSize === figma.mixed ? 16 : t.fontSize;
    let s;
    if (size >= 40) s = vals[vi++]; else if (size >= 20) s = 'Your year in eBooks'; else s = labels[li++];
    if (s && await setText(t, s)) log.beyond++;
    if (!outerInstance(t)) t.name = 'ALC · Your year in eBooks (was K+ beyond slot)';
  }
  for (const n of F.findAll(n => /beyond Kobo Plus/i.test(n.name) && n.type !== 'TEXT')) n.name = 'Your year in eBooks (ALC-only stats)';

  // 2. string fixes, Opt 2 stats, hygiene
  for (const t of texts) {
    if (beyond.includes(t)) continue;
    let s = t.characters;
    for (const [re, rep] of STRING_FIXES) s = s.replace(re, rep);
    if (isOpt2 && OPT2_STATS[s.trim()] && t.fontSize !== figma.mixed && t.fontSize >= 40) s = OPT2_STATS[s.trim()];
    if (t.id.endsWith(';708:89702') || /insert here|lorem/i.test(s)) s = LEGAL;
    if (!/\$\{/.test(s)) s = s.replace(/'/g, '’').replace(/ {2,}/g, ' ').replace(/ +:/g, ':');
    await setText(t, s);
    if (t.characters === 'The most read book in Canada:' && t.fontSize !== figma.mixed && t.fontSize < 24) { await loadFonts(t); t.fontSize = 24; }
  }

  // 3. cover slot labels → staged titles
  for (const inst of F.findAllWithCriteria({ types: ['INSTANCE'] }).filter(i => /Cover slot/.test(i.name))) {
    const label = inst.findOne(n => n.type === 'TEXT'); if (!label) continue;
    const m = inst.name.match(/(?:COVER|face) · (?:user_)?([a-z_]+)/);
    let title = m && COVER_TITLES[m[1]];
    if (!title && /BookCover · 2025/.test(inst.name)) title = 'The Long Way Home';
    if (!title && /Canada/.test(inst.parent.name)) title = 'The Long Way Home';
    if (!title && inst.parent.name === 'Covers') title = DISCOVER_ORDER[inst.parent.children.filter(c => /Cover slot/.test(c.name)).indexOf(inst)];
    if (title && await setText(label, title)) log.covers++;
    if (!title) log.warnings.push(`${inst.id} cover slot: no title rule for "${inst.name}"`);
  }

  // 4. hidden placeholders → copy the visible sibling value; year lockup → 2026
  for (const t of texts) {
    if (!PLACEHOLDER.test(t.characters) || isVisible(t)) continue;
    let s = /year lockup/i.test(t.name) ? '2026' : null;
    const ok = c => c !== t && c.type === 'TEXT' && c.visible && !PLACEHOLDER.test(c.characters) && c.fontSize !== figma.mixed && c.fontSize >= 20;
    if (!s) { const sib = t.parent.children.find(ok) || (t.parent.parent && 'findAll' in t.parent.parent ? t.parent.parent.findAll(ok)[0] : null); if (sib) s = sib.characters; }
    if (s) { await setText(t, s); log.hidden++; }
  }

  // 5. CTA with no ALC deck row → hide (never delete)
  for (const t of texts) if (/no ALC deck row \(K\+ placeholder "Hero CTA"\)/.test(t.name)) {
    const cta = t.parent && /^CTA/.test(t.parent.name) ? t.parent : t;
    if (cta.visible) { cta.visible = false; cta.name = '⛔ hidden · ' + cta.name; log.hidden++; }
  }

  // 6. square corners (own nodes only; library instance internals untouched)
  for (const n of [F, ...F.findAll(() => true)]) {
    if (n.type === 'INSTANCE' || outerInstance(n)) continue;
    if ('cornerRadius' in n && typeof n.cornerRadius === 'number' && n.cornerRadius > 0) { n.cornerRadius = 0; log.corners++; }
  }

  // 7. Opt 2 frames (cloned from K+): blue text → palette colour
  if (isOpt2) for (const t of texts) {
    const target = isOrange ? ORANGE : RED;
    try {
      await loadFonts(t);
      for (const seg of t.getStyledTextSegments(['fills'])) {
        if (seg.fills.some(p => p.type === 'SOLID' && isBlue(p.color))) {
          t.setRangeFills(seg.start, seg.end, seg.fills.map(p => (p.type === 'SOLID' && isBlue(p.color)) ? { ...p, color: target } : p));
          log.recolour++;
        }
      }
    } catch (e) { log.warnings.push(`${t.id} recolour: ${e.message}`); }
  }
}

async function copyFromTwin(O, R) {
  // ORANGE clones carry "[KWL COPY TBC]" — copy the finished red string at the same tree position.
  const rm = {}; for (const t of R.findAllWithCriteria({ types: ['TEXT'] })) rm[keyOf(t, R)] = t;
  for (const t of O.findAllWithCriteria({ types: ['TEXT'] })) {
    if (!PLACEHOLDER.test(t.characters) || inFooterOrHeader(t)) continue;
    const m = rm[keyOf(t, O)];
    if (!m) { log.warnings.push(`${O.name}: no red twin node for ${t.id} "${t.characters.slice(0, 30)}"`); continue; }
    if (await setText(t, m.characters)) log.copied++;
    if (!outerInstance(t) && PLACEHOLDER.test(t.name) && !PLACEHOLDER.test(m.name)) t.name = m.name;
  }
}

async function swapHeaderFooter(O, footerMain, headerMain) {
  for (const inst of O.findAllWithCriteria({ types: ['INSTANCE'] })) {
    if (outerInstance(inst) || !inst.visible) continue;
    const mc = await inst.getMainComponentAsync(); if (!mc) continue;
    const isF = /^KWL · Email Footer/.test(mc.name), isH = /^KWL · Email Header/.test(mc.name);
    if (!(isF && footerMain) && !(isH && headerMain)) continue;
    const ni = (isF ? footerMain : headerMain).createInstance();
    const par = inst.parent; par.insertChild(par.children.indexOf(inst) + 1, ni);
    ni.name = isF ? 'Footer · 2025' : 'Header Email · 2025';
    if (par.layoutMode && par.layoutMode !== 'NONE') ni.layoutSizingHorizontal = 'FILL';
    inst.visible = false; inst.name = '⛔ hidden · ' + inst.name; log.swaps++;
    const legal = ni.findOne(n => n.type === 'TEXT' && n.id.endsWith(';708:89702'));
    if (legal) await setText(legal, LEGAL);
  }
}

async function main() {
  const sec = await figma.getNodeByIdAsync(SECTION_ID);
  if (!sec) { figma.closePlugin('Section 1801:97499 not found'); return; }
  let page = sec; while (page.type !== 'PAGE') page = page.parent;
  await figma.setCurrentPageAsync(page);

  const frames = sec.children.filter(c => c.type === 'FRAME' && /^ALC · /.test(c.name) && !/parts|PASS|MOTION SET/.test(c.name));
  for (const F of frames) { let n = F.name; for (const [re, rep] of FRAME_RENAMES) n = n.replace(re, rep); if (n !== F.name) { F.name = n; log.renamed++; } }

  // labels: section-level text sitting just above a frame takes that frame's name
  for (const L of sec.children.filter(c => c.type === 'TEXT')) {
    const F = frames.find(f => Math.abs(f.x - L.x) < 5 && f.y > L.y && f.y - L.y < 300);
    if (F && L.characters !== F.name) { await setText(L, F.name); L.name = F.name; }
  }

  // parts frame: no TBC left in the unused KWL footer / cover-slot mains
  const parts = sec.children.find(c => /parts/.test(c.name));
  if (parts) for (const t of parts.findAllWithCriteria({ types: ['TEXT'] })) {
    if (!PLACEHOLDER.test(t.characters)) continue;
    const s = /Footer links/.test(t.name) ? 'View in browser  |  Privacy  |  Contact Us  |  Visit Kobo.com'.replace(/ {2,}/g, ' ')
      : /Address/.test(t.name) ? 'Rakuten Kobo Inc. 150 John St., 5th Floor, Toronto, ON, M5V 3E3'
      : /Cover label/.test(t.name) ? 'Book cover' : null;
    if (s) { await setText(t, s); t.name = t.name.replace(/\s*·?\s*\[(KWL COPY|COVER) TBC\]/, ''); }
  }

  const red = frames.filter(f => !/ · ORANGE/.test(f.name));
  const orange = frames.filter(f => / · ORANGE/.test(f.name));
  for (const F of red) await fixFrame(F);

  const footerSrc = frames.find(f => /^ALC · Opt 1$/.test(f.name));
  const headerSrc = frames.find(f => /^ALC · Opt 3$/.test(f.name));
  const footerInst = footerSrc && footerSrc.findOne(n => n.type === 'INSTANCE' && n.name === 'Footer · 2025');
  const headerInst = headerSrc && headerSrc.findOne(n => n.type === 'INSTANCE' && n.name === 'Header Email · 2025');
  const footerMain = footerInst ? await footerInst.getMainComponentAsync() : null;
  const headerMain = headerInst ? await headerInst.getMainComponentAsync() : null;

  for (const O of orange) {
    const twin = red.find(r => r.name === O.name.replace(' · ORANGE', ''));
    if (twin) await copyFromTwin(O, twin); else log.warnings.push(`${O.name}: no red twin found`);
    await fixFrame(O);
    await swapHeaderFooter(O, footerMain, headerMain);
  }

  // audit — every text in the section, visible or hidden (merge tags allowed)
  const left = sec.findAllWithCriteria({ types: ['TEXT'] })
    .filter(t => (PLACEHOLDER.test(t.characters) || / {2,}/.test(t.characters) || / :/.test(t.characters) || /'/.test(t.characters)) && !/\$\{/.test(t.characters))
    .map(t => `${t.id} [${isVisible(t) ? 'visible' : 'hidden'}] ${t.characters.slice(0, 60).replace(/\n/g, ' ')}`);

  const html = `<pre style="font:12px/1.4 monospace;white-space:pre-wrap">${JSON.stringify({ ...log, placeholdersLeft: left.length }, null, 1)}\n\nPLACEHOLDERS LEFT (${left.length}):\n${left.join('\n') || 'none ✓'}</pre>`;
  figma.showUI(html, { width: 560, height: 640 });
}

main().catch(e => figma.closePlugin('Error: ' + e.message));
