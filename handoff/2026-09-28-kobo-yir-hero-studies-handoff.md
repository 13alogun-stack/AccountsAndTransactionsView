# Kobo Plus YIR 2026 — handoff to the local Figma session (2026-09-28)

Written by the cloud session for the local "TONIGHT.zip file" session (desktop bridge, real fonts).
Ibra keeps art direction and critique. The local session executes.

File: SHN-Migration, key `yIodoNrl7m2Wg0B1EeTtGM`.
Link pattern: `https://www.figma.com/design/yIodoNrl7m2Wg0B1EeTtGM/SHN-Migration?node-id=<id with - instead of :>`

Status marks used below: ✅ done · ↩️ to do · ❓ Ibra's call.

## Ibra's standing rules (apply to everything)

- All design text is Georgia or Trebuchet MS (Caveat allowed as the Kobo script). Never Inter in designs.
- Never delete: hide and prefix the name `(hidden · date · reason)`. Duplicate before bulk edits.
- Copy comes only from the copy deck / the approved finals. `<COPY>` where missing. Never invent copy.
- Kobo Plus styles, variables and components only. Library photography and the shareable book/device imagery only. No new stock.
- Once something is approved: push it into the component masters, every final, the sibling persona/market and the motion GIFs, then sweep and screenshot without being asked.
- Don't publish library changes. Don't build ALC, animated or dark-mode variants unless asked.

---

## 1. Finished in the cloud (don't redo)

### ✅ #109 · per-market symbol row (Explorations 09-26 page `2561:28918`)
- Row `2646:31952` verified by screenshot: symbol 40×40 Yellow 80 top-centre, headline pushed down 48 px, nothing beside the country name.
- Cards: CA `2646:31953` · AU `2646:32361` (Southern Cross stars scaled ×1.35 in place) · NZ `2646:32770` · US `2649:33143` (star `2649:33553`) · IE `2649:33558` (shamrock `2649:33968`) · UK `2649:33976` (no symbol, band collapsed).
- Row header with the dev note `2649:34389`. Stale captions hidden with the prefix. #105 and everything below shifted down 163 px to keep the 120 px gap. Nothing deleted.
- Star and shamrock were drawn as vectors in the cloud; the motion session's SVG paths are not needed.
- ✅ Decision 5 (local session, Ibra had no preference): a market with no symbol collapses the 48 px band, so the card is shorter. Dev rule "no symbol → hide the slot". The UK card already works this way and its caption says so; record the rule in the row's dev note once text is editable on the desktop.
- Still open with Ibra/Kobo on #109 (from the local session): hide the superseded inline options (A/B rows) when prepping the review · Yellow 80 vs white symbol · market list (Ireland? US?) · US copy "the US" vs "the United States" (Jacques) · brand/legal sign-off on national symbols · FR-CA and other locales ("au Canada") · which M06 layout(s) carry the symbol slot.

### ✅ Hero explorations page `2666:28918` ("YIR – Hero Explorations")
- Section `2666:28919`: H1–H6 (the six briefed image-window variations), H7–H9 (Yellow 80 field, white field with 3 windows, Decoded copy), letterform mask test (exported clean at 2×), footers F1–F3, storyboard. Prototype section `2667:29095` has the Smart Animate flow "Hero · windows open".
- This is an exploration from the earlier, wider brief. It is **not** approved work and it is not one of the three studies below. Keep it as reference.
- Fonts on this page and in the #109 captions are stand-ins because the cloud cannot load Georgia/Trebuchet (see task 2.1).

### ✅ Phase 0 audit (read-only), condensed
| Area | Where | Status |
|---|---|---|
| Finals Opt 1 "Last round" `2534:69228`, Opt 2 "Option 2" `2534:69275`, Opt 3 "Wildcard" `2534:69419` | K+ FINAL `2087:277382` › Final `2534:69226` › Final `2534:69227` | Final; flows Opt 1/2/3 exist |
| Alt 1 bento `2534:69476` | same section, loose | Superseded?; its flow "#65 bento pop-in" starts inside the hidden "Archived - Sep 26" section |
| Loose parts: orphan hero `2534:69464`, Tile · Canada `2534:69632`, Shape 7 `2534:69639`, Frames 15578/15579/15581 | Final section | Label or park before the meeting |
| Kammy round 1 (#38–#70) | Thursday review tracker `2015:161717` | Applied (batches 0–4 ✓). Open: Jacques's line #38 (`2020:162291`), Opt 3 has no most-active-month stat #50 (`2061:245242`), K+ seal GIF empty first frame, #65 dev answer |
| Kammy round 2 (#73–#115) | Explorations 09-26 sections #102 `2561:28919`, #104 `2562:71466`, #108 `2572:29127`, #87/88 `2574:29127`, #109 `2575:203731`, #105 `2581:30338`, #103 `2596:106632`, #92 `2604:123972`, #91/#68 `2605:124103`, motion `2606:124181`, #96/97 `2606:124274` | Built with Ibra's picks; #105 and #108 pushed to finals per the local session; the rest still to integrate |
| KWL Writer Marks in finals (Shape 1/5/7, Squiggly 5/6, 16 instances) | Wildcard + Most-read variants | Brand risk; official doodles live in New Refs › Section 20 › Doodles `2534:108875` |
| Components `2293:28918`, 276 components, 3062 instances | | 0 broken instances on every YIR page |
| Imagery | 1317 image fills in K+ FINAL | None missing; covers are staging |
| Dark mode / mobile | none for Opt 1/2/3 | Missing (only the Sep-14 old direction has dark mode) |
| Animation | Structure page `2043:182183` › MOTION variants `2048:238541`, index `2153:510722` | GIFs all under 300 KB (largest 281 KB); MP4 slots never uploaded, GIFs stand in |
| Interactive prototype | Thursday › section 16 `2035:173311` | Paused: 7 screens, no cover/nav/flow |

---

## 2. Do first on the desktop

### 2.1 ↩️ Font swap (stand-ins → brand fonts)
Scope: every TEXT node on page `2666:28918`, in row `2646:31952` and header `2649:34389`.
Mapping: Gelasio Regular → Georgia Regular · Gelasio Bold → Georgia Bold · Gelasio Italic → Georgia Italic · Fira Sans Regular → Trebuchet MS Regular · Fira Sans Bold → Trebuchet MS Bold.
Gelasio is metric-compatible with Georgia, so nothing should reflow. After the swap, re-check that the six headline lines on the hero page stay under 486 px.
In the US/IE/UK #109 cards the original Georgia headline sits under a substitute at opacity 0 (`#Headline · <country> · cloud substitute…`). Keep one, hide the other with the prefix.

### 2.2 ↩️ Cancel the queued #109 build brief
The local session still has "build the #109 country row" and "Option C drawn leaf" in its queue. The row exists (section 1). Do not add a duplicate. Option C (the hand-drawn leaf from `TONIGHT/motion/maple_leaf_0927/`) is still ❓ Ibra: flag leaf (A/B) or drawn leaf (C).

### 2.3 ↩️ Optional: save a named version-history checkpoint (not possible from the cloud).

---

## 3. Hero studies — execution brief (Ibra, 09-28)

Three distinct **static** hero studies for Kobo Plus 2026 Year in Review. Reference: the DAZN / NFL Game Pass banner ("HOW REAL / FANS NFL": photo tiles between words, dark background, alternating pale and yellow type, yellow brand/CTA panel). Translate its logic into Kobo's brand and reading context. Focused exploration only: no full-email redesign, no replacing approved work.

### 3.1 Establish the source first
❓ **Which hero is the approved K+ source?** Three finals exist. Default to Opt 1 "Last round" unless Ibra says otherwise (the tracker calls it the safe baseline). Record the chosen source frame and node link in an annotation inside the section.

| Final | Email frame | Hero | Headline (exact) | Style |
|---|---|---|---|---|
| Opt 1 "Last round" | `2534:69228` | M02 instance `2534:69230`, 550×450, white field + "2025 YIR ALC" top image | `Your 2026` ⏎ `Reading Rewind` | Georgia Regular 40, white, centred |
| Opt 2 "Option 2" | `2534:69275` | M02 instance `2534:69277`, 550×660, Blue 100 | `Your Kobo Reading` ⏎ `Recap for 2026` | Georgia Regular 44, white |
| Opt 3 "Wildcard" | `2534:69419` | frame "M02 · Hero" 550×372, Blue 100 (loose copy `2534:69464`) | `Your 2026` ⏎ `in books, decoded` | Georgia Regular 46, white |

Shared copy (deck lines already in the finals, use verbatim):
- Topper: `YOUR KOBO PLUS READING LIFE` — Trebuchet MS Bold 24, black on the topper band.
- Subcopy: `Our Kobo Plus readers around the world finished 1,800,000 books` — Trebuchet MS Regular 20 (Opt 1) / 16 (Opt 2), `1,800,000 books` in Bold; Wildcard sets it in Georgia 18.
- No hero CTA exists in the finals. If a CTA panel is used, the label is `<COPY · CTA>`.
- Personalised values (the 1,800,000) stay live text, never baked into artwork.

Colour variables (bind, don't type hex):
- Blue 100 `VariableID:2293:167205` (finals) or `Kobo/Blue/100` `VariableID:673:39768` · Blue 80 `673:39769` · Blue 20 `673:39772` · Blue Deep `1681:198008`
- Yellow 80 `VariableID:2336:37170` (used for the country word in the finals) or `Kobo/Yellow/80` `673:39764`
- White text `2293:167215` · Black text `2293:167214`
- "Yellow 80" in this file is the token `Kobo/Yellow/80` (#F1C541), **not** 80 % opacity.
- The "bookmark" is the approved #105 treatment: Blue 20 panel flush to the right edge (x 16, w 534, top-left radius 30), live in Wildcard M07 `2534:69446` and component variant `2329:36542`.

Approved covers already in the finals (image hash · name · status). Preserve proportions and artwork; whole covers only.
- `78c82410f913d76f8be99530bbd2b8e0726d0cc5` · The Long Way Home (Louise Penny), eBook 2:3 · most-read module (staging)
- `2a12ffb1543b30ade05220b58a9aaaa5f0180f14` · A Ray of Sunshine · Kobo Original (Best Books)
- `041ffca76af08f370d5a2631d5ac077a2414a790` · House of Earth and Blood · trade (Best Books)
- `c5d2548ce2be405fa817251c3120e480b2f1ccec` · Moby Dick · Kobo Edition (Best Books)
- `07729fe0991d1ed0c7b944ff9bcdaf13c5239c13` · Fourth Wing · audiobook, square (K+ badge convention)
- `9718c7e66cacbb1c5e059aec930f332f74e8cb63` · user_outlander · real cover (staging) · `e81c45f33853352232d4b34f8423398640ca227c` · user_sunrise · real cover (staging)
❓ Which of these are cleared for hero use per geo is Ibra's call. Label generic catalogue covers as illustrative, not a personalised reading history, in the annotation.

Other approved assets: SHOT_3 Clara + Libra shelf render `db505354516ef92ab92572fc3564c9e36c669d13` (New Refs › K+ `2534:114586`); library photo KOBO2025-0203 `b9c9e59c7764b0757b4a095456a516ed435f1b35`; official doodles in New Refs › Doodles `2534:108875` (Underline 1 `2534:108889`, Circling 1 `2534:108893`, Circling 2 `2534:108877`, Arrow 1 `2534:108882`, Arrow 2 `2534:108884`, Box `2534:108876`). Do not use KWL Writer Marks (Shape/Squiggly).

### 3.2 What to take from the reference (visual interpretation, not the designer's intent)
1. Copy gives imagery a purpose. Books illustrate the experience the words describe.
2. Colour creates a second reading: yellow links the key phrase across lines; the other words frame it.
3. Images participate in the type grid: containers share the cap height of neighbouring letters.
4. Containment makes the breakout meaningful: subjects extend past a clear boundary while the structure stays readable.
5. The offer completes the story: identification → benefit → a place to go.
Do not sample the photographed screen as a palette.

### 3.3 Kobo translation
Working premise (internal, not headline copy): *your reading made this year yours.* Typography establishes the message; imagery supplies meaning; colour prioritises the message. Every mask and overlap must support that relationship. Never imply every reader read a particular book. Covers are designed rectangles: overlap whole covers for depth; never cut characters out or round-mask away title/author.

### 3.4 The three studies (build all three, same copy, same cover set, same palette)

**01 · Inline stories** (baseline). A few cover tiles in deliberate spaces around the approved headline: word, image, word. Containers align with adjacent type or a shared grid. Scale the layout to the books; never stretch a book. Full headline readable in order. Spacing, scale and alignment first; rotation and decoration last. If the copy is too long for inline images at mobile scale, put the cover rhythm directly above or below the intact headline.
Question: do the books feel necessary, and does the headline still read immediately?

**02 · Stories in 2026** (controlled experiment). Oversized 2026 topper with limited imagery masked into portions of the numerals; enough solid structure that the year reads. Approved headline intact underneath. Test sparingly. Masking is exploratory and subject to artwork-use approval. If recognition dies or it reads as texture, mark the route unsuccessful; no rescue effects.
Question: a year shaped by stories, or decorative image-filled type?

**03 · Beyond the frame** (bold route). A clear container, shelf or restrained cover group interacting with the year or headline; one or two whole covers extend past its boundary. Stable baseline and spacing first, limited overlaps, reading order and key cover details preserved, deliberate asymmetry, no scattered pile. The boundary must be visible enough that breaking it means something.
Question: does it celebrate discovery while staying unmistakably Kobo and legible at email size?

### 3.5 Colour and typography
- Actual K+ styles and font families from the file (Georgia / Trebuchet MS). No DAZN typography, no invented hex.
- Start from the full Blue 100 K+ background and white primary message (verify against the chosen source).
- Yellow gets one intentional role: one meaningful emphasis or the existing bookmark. No competing yellow accents.
- Keep cover colours from overwhelming the type through selection, scale, spacing and contrast; no recolouring artwork.
- Same core palette across all three so the comparison tests composition.
- No plus-sign pattern, confetti or new motifs to compensate for a weak idea.

### 3.6 Scope and file safety
- New section named exactly `K+ YIR / Hero studies / DAZN reference` on the Explorations 09-26 page `2561:28918` (below the last section, keep the 120 px gap) or on the hero explorations page `2666:28918`. Duplicate source material into it; never touch the approved frames or masters.
- Keep one **unchanged** duplicate of the approved hero beside the studies, labelled "Approved source · reference (not a concept)".
- Study frame names: `01 Inline stories`, `02 Stories in 2026`, `03 Beyond the frame`.
- Editable text, named image layers, editable masks; each route grouped logically. Reuse components and image fills; no export/re-import, no detaching, no shared-style changes.
- Do not delete, move, rename or lock unrelated work. Do not publish library changes. No full emails, ALC, animated or dark-mode variants in this pass.

### 3.7 Email feasibility (static pass)
- Inspect at 550 and in a temporary ~375 px scaled preview (0.68×). Check headline reading order, year recognition, cover silhouettes, spacing.
- Annotate per study which elements are a fixed topper/image and which stay live text. Interwoven headline/image designs are not automatically live email text.
- Personalised values and stats stay live text outside fixed artwork.
- Flag localisation implications of headline line breaks and fixed graphics; no translations now.
- Dark mode later, for the selected route only. No motion, no GIF exports now (earlier constraints for reference: under 300 KB, ≤ 5 s, play once, complete readable first frame).

### 3.8 Review criteria (score 1–5, one concrete observation per score; totals inform, they don't decide)
| Criterion | What good looks like |
|---|---|
| Copy–image relationship | Books contribute to the meaning of the approved message |
| Hierarchy and colour | The intended phrase reads first; yellow has a clear purpose |
| Typography and composition | Type and images share a deliberate rhythm and structure |
| Kobo brand fit | Feels like Kobo, not a sports-ad reskin |
| Mobile readability | Message and year immediately clear at small size |
| Production feasibility | Asset boundaries, localisation and email build are credible |

Reject or flag any route that changes approved copy, misrepresents personalised reading, distorts covers, loses the year or headline at mobile size, or needs unexplained production assumptions.

### 3.9 Handoff back to Ibra
1. Links to the section and each study frame.
2. A side-by-side view with the unchanged approved hero.
3. Per study: the message, the role of imagery, the role of colour, the main trade-off.
4. The score table and the recommended route with asset/implementation dependencies.
5. A concise record of what was created and any source ambiguity.

Initial art-direction preference: 01 is the strongest baseline; 03 has the greatest celebratory potential; 02 must earn its place. Challenge that if the results say otherwise. **Stop after the studies and the recommendation.** Next decision: which route to refine, then extend into the email and dark mode.

---

## 4. Backlog after the studies (from the presentation-prep plan)

- ↩️ **Phase 5** · integrate the chosen hero (and footer) into Opt 1/2/3 in context; keep the previous hero as an alternate frame.
- ↩️ **Phase 2 · round-2 picks still to push into the finals** (source sections in the Phase 0 table): #87/88 one graphic drop shadow on every cover (finals currently mix six: 6/6 @28 %, 10.4, 13.1, 9.56, 3.56, 4.8 — Ibra ref `2534:71070`: x4.8 y4.8 blur 0 #000 25 %); #96/97 one stat-icon box and baseline; #103 official Arrow 1/2 for the remote "Shape 1"; #102 official doodle in the Wildcard hero; #104 Best Books list markers; #92 author image (open blue book + phone with audio screen); #91/#68 device on the shelf; motion in context (#115 conveyor, #73 covers only). Then replace the 16 KWL marks in the finals with official doodles.
- ↩️ **Phase 3 · motion**: confirm a frame-one static for every GIF; re-export the K+ seal GIF (empty first frame); move or re-point the "#65 bento pop-in" flow (starts in the hidden archived section); Alt 1 dev answer (GIF vs CSS keyframes).
- ↩️ **Presentation hygiene**: label or park the loose parts in the Final section; three stacked M10 closers in Option 2 (`2534:69275`) look unintentional, check.
- ↩️ **Phase 6/7**: slides per Ibra's presentation mockup; prototype flows in presentation order (section 16 prototype is paused).
- ❓ Ibra: hide Kammy's REMAKE stickies on the Option 2 badge; loosen the Surprise component's "32" leading; Ireland in scope for #109; US/UK wording (Jacques); Option C drawn leaf.

## 5. Missing inputs (Ibra to supply)
Presentation mockup link · Kammy's file/comments MK-107615 (comments #74/75/80/83/84-85/90/93/95/111/118 have no known location) · copy deck · Ibra's polish notes · existing Kobo animation references.
