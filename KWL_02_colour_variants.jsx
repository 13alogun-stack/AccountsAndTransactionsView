/*
 * KWL_02_colour_variants.jsx
 * ---------------------------------------------------------------------------
 * PHASE 2 - Colour variants. Run AFTER KWL_01_separate_layers.jsx.
 *
 * Run from Illustrator:  File > Scripts > Other Script...  (Cmd+F12)
 *
 * Method, matching the brief exactly:
 *   1. Duplicate the source artboard and everything on it, off to the right.
 *   2. Recolour ONLY the duplicate. Originals are never touched.
 *   3. Rename the duplicate to the agreed convention.
 *
 * Layouts are not changed. Nothing moves relative to its own artboard, nothing
 * is scaled, flattened, outlined or rasterised, and no mask is entered.
 *
 * WHAT GETS RECOLOURED
 *   Background layer -> the variant's background tint
 *   Text layer       -> headline / support colours, split by type size
 *   Illustrations    -> LEFT ALONE, deliberately. Blanket-recolouring the
 *                       drawn artwork would destroy it. Per the brief,
 *                       illustrations are retained as-is.
 *
 * SET DRY_RUN = true FIRST. It reports what it would do and changes nothing.
 * ---------------------------------------------------------------------------
 */

#target illustrator

(function () {

    // ===================================================================
    // CONFIG
    // ===================================================================

    var DRY_RUN = true;        // <-- true = report only. Set false to build.

    var GAP          = 72;     // points between generated artboards
    var COPY_REF     = false;  // also copy "Reference - Hidden" items to variants
    var HEADLINE_PCT = 0.60;   // text >= 60% of the artboard's largest type = headline

    // Source artboards, 1-based, as numbered in Illustrator's Artboards panel.
    // Defaults come from the content audit of this file:
    //   1/2   Quiet please, Author at work        (front/back)
    //   3/4   SHHHH... I'm listening              (front/back)
    //   5/6   Plotting - Can't talk, too busy     (front/back)
    //   28/29 CAN'T TALK TOO BUSY PLOTTING        (front/back)
    var SOURCES = {
        quiet:    { front: 1,  back: 2  },
        shhh:     { front: 3,  back: 4  },
        bubble:   { front: 5,  back: 6  },
        typo:     { front: 28, back: 29 }
    };

    // ===================================================================
    // KWL 2025 COLOUR LIBRARY  (verbatim from the brand guidelines)
    // ===================================================================

    var KWL = {
        "Red 100": "BF0000", "Red 80": "BA403A", "Red 60": "C96C69", "Red 40": "D99C9B", "Red 20": "EBCDCD",
        "Yellow 100": "EEB711", "Yellow 80": "F1C541", "Yellow 60": "F5D470", "Yellow 40": "F8E2A0", "Yellow 20": "FCF1CF",
        "Blue 100": "0A59C6", "Blue 80": "3B7AD1", "Blue 60": "6C9BDD", "Blue 40": "9DBDE8", "Blue 20": "CEDEF4",
        "Green 100": "005830", "Green 80": "33795A", "Green 60": "669B83", "Green 40": "99BCAC", "Green 20": "CCDED6",
        "Pink 100": "AD2F74", "Pink 80": "B1598C", "Pink 60": "C286AA", "Pink 40": "D5AEC6", "Pink 20": "EAD6E2",
        "Orange 100": "CE5012", "Orange 80": "C97B4C", "Orange 60": "D59977", "Orange 40": "E2BBA4", "Orange 20": "F0DDD2",
        "Black": "111111", "White": "FFFFFF"
    };

    // ===================================================================
    // VARIANT RECIPES
    //
    // Patterns, per the agreed system:
    //   editorial : low tint bg  + black headline + black support
    //   balanced  : low tint bg  + 100 headline   + black support
    //   strong    : 100 bg       + white headline + white support
    //   reverse   : 100 bg       + 20 headline    + white support
    //
    // NOTE ON YELLOW: Yellow 100 is the highest-luminance value in the whole
    // library. White type on it is unreadable, so the Yellow "strong" option
    // uses BLACK type, not white. This is the one deliberate departure from
    // the generic pattern table and it is intentional.
    // ===================================================================

    // Front and back are stated explicitly rather than derived. Options A and B
    // are COORDINATED PAIRS - the back is the inverted colourway of the same
    // family, which is what the "20/100 FRONT, 100/20 BACK" naming promises.
    // Option C is the safe editorial set and stays low-tint on both sides.
    var RECIPES = [
        // ---- Quiet Please / Orange -------------------------------------
        { src: "quiet", opt: "A", label: "Quiet Please",
          front: { bg: "Orange 20",  headline: "Orange 100", support: "Black", ratio: "Orange 20/100" },
          back:  { bg: "Orange 100", headline: "White",      support: "Orange 20", ratio: "Orange 100/20" } },
        { src: "quiet", opt: "B", label: "Quiet Please",
          front: { bg: "Orange 100", headline: "White",      support: "Orange 20", ratio: "Orange 100/20" },
          back:  { bg: "Orange 20",  headline: "Orange 100", support: "Black", ratio: "Orange 20/100" } },
        { src: "quiet", opt: "C", label: "Quiet Please",
          front: { bg: "Orange 20",  headline: "Black",      support: "Black", ratio: "Orange 20-black" },
          back:  { bg: "Orange 20",  headline: "Black",      support: "Black", ratio: "Orange 20-black" } },

        // ---- SHHH / Yellow ---------------------------------------------
        // Yellow 100 is the brightest value in the library, so its type is
        // BLACK on both sides. White on Yellow 100 would be unreadable.
        { src: "shhh", opt: "A", label: "SHHH",
          front: { bg: "Yellow 20",  headline: "Black",      support: "Black", ratio: "Yellow 20-black" },
          back:  { bg: "Yellow 100", headline: "Black",      support: "Black", ratio: "Yellow 100-black" } },
        { src: "shhh", opt: "B", label: "SHHH",
          front: { bg: "Yellow 100", headline: "Black",      support: "Black", ratio: "Yellow 100-black" },
          back:  { bg: "Yellow 20",  headline: "Black",      support: "Black", ratio: "Yellow 20-black" } },
        // Option C is deliberately NOT Yellow 20 + Yellow 100. That pairing
        // measures 1.63:1 - Yellow 100 is itself a high-luminance value, so it
        // vanishes on Yellow 20. The "low tint + same-family 100" formula holds
        // for Red, Green, Orange, Pink and Blue but breaks for Yellow. This uses
        // the red accent called for in the SHHH direction instead.
        { src: "shhh", opt: "C", label: "SHHH",
          front: { bg: "Yellow 20",  headline: "Red 100", support: "Black", ratio: "Yellow 20-Red 100" },
          back:  { bg: "Yellow 20",  headline: "Red 100", support: "Black", ratio: "Yellow 20-Red 100" } },

        // ---- Can't Talk thought bubble / Green -------------------------
        // The coordinated pair the brief calls out by name:
        //   front Green 20 bg + Green 100 emphasis + black
        //   back  Green 100 bg + Green 20 details  + white
        { src: "bubble", opt: "A", label: "Cant Talk Bubble",
          front: { bg: "Green 20",  headline: "Green 100", support: "Black", ratio: "Green 20/100" },
          back:  { bg: "Green 100", headline: "Green 20",  support: "White", ratio: "Green 100/20" } },
        { src: "bubble", opt: "B", label: "Cant Talk Bubble",
          front: { bg: "Green 100", headline: "Green 20",  support: "White", ratio: "Green 100/20" },
          back:  { bg: "Green 20",  headline: "Green 100", support: "Black", ratio: "Green 20/100" } },

        // ---- Can't Talk typographic / Red ------------------------------
        { src: "typo", opt: "A", label: "Cant Talk Typo",
          front: { bg: "Red 100", headline: "White",   support: "Red 20", ratio: "Red 100/20" },
          back:  { bg: "Red 20",  headline: "Red 100", support: "Black",  ratio: "Red 20/100" } },
        { src: "typo", opt: "B", label: "Cant Talk Typo",
          front: { bg: "Red 20",  headline: "Black",   support: "Black",  ratio: "Red 20-black" },
          back:  { bg: "Red 20",  headline: "Black",   support: "Black",  ratio: "Red 20-black" } }
    ];

    // ===================================================================
    // PREFLIGHT
    // ===================================================================

    if (app.documents.length === 0) { alert("Open KWL_layered_color_variants.ai first."); return; }
    var doc = app.activeDocument;

    if (/^kwl\.ai$/i.test(doc.name)) {
        alert("This is the ORIGINAL kwl.ai.\n\nSave As to KWL_layered_color_variants.ai first."); return;
    }

    function findLayer(n) {
        for (var i = 0; i < doc.layers.length; i++) if (doc.layers[i].name === n) return doc.layers[i];
        return null;
    }

    var L_BG = findLayer("Background"), L_TX = findLayer("Text"),
        L_IL = findLayer("Illustrations"), L_GU = findLayer("Guides - Dielines"),
        L_RF = findLayer("Reference - Hidden");

    if (!L_BG || !L_TX || !L_IL || !L_GU) {
        alert("Phase 1 layers not found.\n\nRun KWL_01_separate_layers.jsx first.\n" +
              "Expected: Background, Text, Illustrations, Guides - Dielines.");
        return;
    }

    // ===================================================================
    // COLOUR
    // ===================================================================

    var isCMYK = (doc.documentColorSpace === DocumentColorSpace.CMYK);
    var colourCache = {};
    var conversionNote = "";

    function hexToRGB(h) {
        return [parseInt(h.substring(0,2),16), parseInt(h.substring(2,4),16), parseInt(h.substring(4,6),16)];
    }

    // Naive fallback only. Illustrator's own colour-managed conversion is
    // preferred because it respects the document's CMYK profile.
    function naiveCMYK(r, g, b) {
        var R=r/255, G=g/255, B=b/255;
        var k = 1 - Math.max(R, Math.max(G, B));
        if (k >= 1) return [0,0,0,100];
        return [ (1-R-k)/(1-k)*100, (1-G-k)/(1-k)*100, (1-B-k)/(1-k)*100, k*100 ];
    }

    // --- contrast validation ------------------------------------------------
    // Checked on the source hex values, before any CMYK conversion, using the
    // standard WCAG relative-luminance formula. This is the guard against the
    // brief's own "avoid low tint on low tint / same-value combinations" rule -
    // the recipes are verified rather than trusted.
    function relLum(hex) {
        var v = hexToRGB(hex), out = [];
        for (var i = 0; i < 3; i++) {
            var c = v[i] / 255;
            out[i] = (c <= 0.03928) ? (c / 12.92) : Math.pow((c + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * out[0] + 0.7152 * out[1] + 0.0722 * out[2];
    }

    function contrastRatio(nameA, nameB) {
        var a = relLum(KWL[nameA]), b = relLum(KWL[nameB]);
        var hi = Math.max(a, b), lo = Math.min(a, b);
        return (hi + 0.05) / (lo + 0.05);
    }

    function checkContrast(mix, label) {
        var notes = [];
        var h = contrastRatio(mix.bg, mix.headline);
        var s = contrastRatio(mix.bg, mix.support);
        // 3.0 is the large-type threshold, 4.5 the body-copy threshold.
        if (h < 3.0) notes.push(label + ": headline " + mix.headline + " on " + mix.bg +
                                " is only " + h.toFixed(2) + ":1 - too close in value, even for large type.");
        if (s < 4.5) notes.push(label + ": support " + mix.support + " on " + mix.bg +
                                " is " + s.toFixed(2) + ":1 - fine for large detail, under par for body copy.");
        return notes;
    }

    function makeColour(name) {
        if (colourCache[name]) return colourCache[name];
        var hex = KWL[name];
        if (!hex) throw new Error("Unknown KWL colour: " + name);
        var rgb = hexToRGB(hex), col;

        if (isCMYK) {
            var cmyk = null;
            try {
                var out = app.convertSampleColor(
                    ImageColorSpace.RGB, rgb, ImageColorSpace.CMYK,
                    ColorConvertPurpose.defaultpurpose);
                if (out && out.length >= 4) {
                    // convertSampleColor may return 0-255; normalise to 0-100.
                    var mx = Math.max(out[0], Math.max(out[1], Math.max(out[2], out[3])));
                    var sc = (mx > 100) ? (100/255) : 1;
                    cmyk = [out[0]*sc, out[1]*sc, out[2]*sc, out[3]*sc];
                }
            } catch (e) { conversionNote = "Used fallback RGB->CMYK maths (convertSampleColor unavailable)."; }
            if (!cmyk) { cmyk = naiveCMYK(rgb[0], rgb[1], rgb[2]);
                         if (!conversionNote) conversionNote = "Used fallback RGB->CMYK maths."; }
            col = new CMYKColor();
            col.cyan = cmyk[0]; col.magenta = cmyk[1]; col.yellow = cmyk[2]; col.black = cmyk[3];
        } else {
            col = new RGBColor();
            col.red = rgb[0]; col.green = rgb[1]; col.blue = rgb[2];
        }
        colourCache[name] = col;
        return col;
    }

    // Register the palette as named document swatches, so the file carries the
    // real KWL library afterwards rather than a pile of anonymous fills.
    function registerSwatches() {
        var added = 0;
        for (var name in KWL) {
            if (!KWL.hasOwnProperty(name)) continue;
            var swName = "KWL " + name, exists = false;
            try { doc.swatches.getByName(swName); exists = true; } catch (e) {}
            if (exists) continue;
            try {
                var sw = doc.swatches.add();
                sw.name = swName;
                sw.color = makeColour(name);
                added++;
            } catch (e2) {}
        }
        return added;
    }

    // ===================================================================
    // GEOMETRY HELPERS
    // ===================================================================

    function centreInside(bounds, rect) {
        var cx = (bounds[0] + bounds[2]) / 2, cy = (bounds[1] + bounds[3]) / 2;
        return (cx >= rect[0] && cx <= rect[2] && cy <= rect[1] && cy >= rect[3]);
    }

    function parentIsLayer(it) {
        try { return it.parent.typename === "Layer"; } catch (e) { return false; }
    }

    // Top-level items on a layer whose centre falls inside the artboard.
    function itemsOnArtboard(layer, rect) {
        var out = [];
        for (var i = 0; i < layer.pageItems.length; i++) {
            var it = layer.pageItems[i];
            if (!parentIsLayer(it)) continue;
            try { if (centreInside(it.geometricBounds, rect)) out.push(it); } catch (e) {}
        }
        return out;
    }

    // Largest type size in a frame. Samples rather than walking every glyph.
    function maxTypeSize(tf) {
        var best = 0;
        try {
            var chars = tf.textRange.characters, n = chars.length;
            if (n === 0) return 0;
            var step = Math.max(1, Math.floor(n / 25));
            for (var i = 0; i < n; i += step) {
                var s = chars[i].characterAttributes.size;
                if (s > best) best = s;
            }
        } catch (e) {
            try { best = tf.textRange.characterAttributes.size; } catch (e2) { best = 0; }
        }
        return best;
    }

    function paintText(tf, colour) {
        try { tf.textRange.characterAttributes.fillColor = colour; return true; }
        catch (e) { return false; }
    }

    function paintPath(it, colour) {
        var done = false;
        try { if (it.filled) { it.fillColor = colour; done = true; } } catch (e) {}
        if (it.typename === "CompoundPathItem") {
            try {
                for (var i = 0; i < it.pathItems.length; i++) {
                    if (it.pathItems[i].filled) { it.pathItems[i].fillColor = colour; done = true; }
                }
            } catch (e2) {}
        }
        return done;
    }

    // ===================================================================
    // BUILD
    // ===================================================================

    var layerLockState = [];
    for (var li = 0; li < doc.layers.length; li++) {
        layerLockState.push({ l: doc.layers[li], locked: doc.layers[li].locked, vis: doc.layers[li].visible });
        doc.layers[li].locked = false;
        doc.layers[li].visible = true;
    }

    // Rightmost edge of everything that already exists.
    var maxRight = -1e9;
    for (var a = 0; a < doc.artboards.length; a++) {
        var r = doc.artboards[a].artboardRect;
        if (r[2] > maxRight) maxRight = r[2];
    }
    var cursorX = maxRight + GAP;

    var log = [], created = 0, recoloured = 0, warnings = [];
    var swatchesAdded = DRY_RUN ? 0 : registerSwatches();

    function buildVariant(recipe, side) {
        var pair = SOURCES[recipe.src];
        if (!pair) { warnings.push("No source mapping for " + recipe.src); return; }

        var srcIndex = (side === "FRONT") ? pair.front : pair.back;
        if (srcIndex < 1 || srcIndex > doc.artboards.length) {
            warnings.push("Artboard " + srcIndex + " out of range for " + recipe.label);
            return;
        }

        var srcAb   = doc.artboards[srcIndex - 1];
        var srcRect = srcAb.artboardRect;
        var w = srcRect[2] - srcRect[0];

        // The side's own recipe carries its ratio label, so the name always
        // describes the colours actually applied.
        var mix = (side === "FRONT") ? recipe.front : recipe.back;
        var newName = recipe.label + " - Option " + recipe.opt + " - " + mix.ratio + " - " + side;

        var dx = cursorX - srcRect[0];
        var newRect = [cursorX, srcRect[1], cursorX + w, srcRect[3]];

        // ---- gather source artwork -------------------------------------
        var groups = [
            { layer: L_BG, role: "bg" },
            { layer: L_TX, role: "text" },
            { layer: L_IL, role: "art" },
            { layer: L_GU, role: "guide" }
        ];
        if (COPY_REF && L_RF) groups.push({ layer: L_RF, role: "ref" });

        var found = { bg: 0, text: 0, art: 0, guide: 0, ref: 0 };
        var picked = [];
        for (var g = 0; g < groups.length; g++) {
            var its = itemsOnArtboard(groups[g].layer, srcRect);
            found[groups[g].role] += its.length;
            for (var k = 0; k < its.length; k++) picked.push({ item: its[k], role: groups[g].role });
        }

        if (picked.length === 0) {
            warnings.push("Artboard " + srcIndex + " (" + newName + "): no objects found - skipped.");
            return;
        }
        if (found.bg === 0) {
            warnings.push(newName + ": no Background object - background tint not applied.");
        }

        log.push("[" + (DRY_RUN ? "would build" : "built") + "] " + newName +
                 "  <- artboard " + srcIndex +
                 "  | bg " + mix.bg + ", headline " + mix.headline + ", support " + mix.support +
                 "  | objects: bg " + found.bg + ", text " + found.text +
                 ", art " + found.art + ", guides " + found.guide);

        var cNotes = checkContrast(mix, newName);
        for (var cn = 0; cn < cNotes.length; cn++) warnings.push(cNotes[cn]);

        if (DRY_RUN) { cursorX += w + GAP; return; }

        // ---- duplicate --------------------------------------------------
        var newAb = doc.artboards.add(newRect);
        try { newAb.name = newName; }
        catch (e) { warnings.push("Could not name artboard: " + newName); }

        var copies = [];
        for (var p = 0; p < picked.length; p++) {
            try {
                var dup = picked[p].item.duplicate();
                dup.translate(dx, 0);              // horizontal only: layout is preserved exactly
                copies.push({ item: dup, role: picked[p].role });
            } catch (e) {
                warnings.push(newName + ": could not duplicate an object (" + e + ")");
            }
        }
        created++;

        // ---- recolour the copies ----------------------------------------
        var cBg   = makeColour(mix.bg);
        var cHead = makeColour(mix.headline);
        var cSupp = makeColour(mix.support);

        // Text roles are decided by size, relative to the biggest type here.
        var biggest = 0, textCopies = [];
        for (var t = 0; t < copies.length; t++) {
            if (copies[t].role !== "text") continue;
            var it = copies[t].item;
            var sz = 0;
            if (it.typename === "TextFrame") sz = maxTypeSize(it);
            textCopies.push({ item: it, size: sz });
            if (sz > biggest) biggest = sz;
        }

        for (var c = 0; c < copies.length; c++) {
            var obj = copies[c].item, role = copies[c].role;
            if (role === "bg") { if (paintPath(obj, cBg)) recoloured++; }
            else if (role === "text") {
                if (obj.typename !== "TextFrame") continue;   // grouped text: left alone
                var size = 0;
                for (var q = 0; q < textCopies.length; q++) if (textCopies[q].item === obj) size = textCopies[q].size;
                var isHead = (biggest > 0 && size >= biggest * HEADLINE_PCT);
                if (paintText(obj, isHead ? cHead : cSupp)) recoloured++;
            }
            // "art", "guide", "ref": untouched by design.
        }

        cursorX += w + GAP;
    }

    for (var i = 0; i < RECIPES.length; i++) {
        buildVariant(RECIPES[i], "FRONT");
        buildVariant(RECIPES[i], "BACK");
    }

    // Restore layer states; keep the dieline layer locked and reference hidden.
    for (var s = 0; s < layerLockState.length; s++) {
        var st = layerLockState[s];
        try { st.l.locked = st.locked; st.l.visible = st.vis; } catch (e) {}
    }
    try { L_GU.locked = true; } catch (e) {}
    try { if (L_RF) L_RF.visible = false; } catch (e) {}

    // ===================================================================
    // REPORT
    // ===================================================================

    var report =
        "KWL - Phase 2 colour variants\n" +
        (DRY_RUN ? "*** DRY RUN - nothing was changed ***\n" : "") +
        "Document: " + doc.name + "\n" +
        "Colour space: " + (isCMYK ? "CMYK" : "RGB") + "\n" +
        (conversionNote ? conversionNote + "\n" : "") +
        "Artboards before: " + (doc.artboards.length - created) + "\n" +
        "Variant artboards " + (DRY_RUN ? "planned" : "created") + ": " + (DRY_RUN ? RECIPES.length * 2 : created) + "\n" +
        "Objects recoloured: " + recoloured + "\n" +
        "Swatches added: " + swatchesAdded + "\n\n" +
        "PLAN\n  " + log.join("\n  ") + "\n\n" +
        (warnings.length ? "WARNINGS\n  " + warnings.join("\n  ") + "\n\n" : "") +
        "Illustrations were deliberately not recoloured.\n";

    var written = "";
    try {
        var out = new File(doc.path + "/KWL_phase2_report.txt");
        out.open("w"); out.write(report); out.close();
        written = "\n\nFull report:\n" + out.fsName;
    } catch (e) { written = "\n\n(Could not write the report file.)"; }

    alert(
        (DRY_RUN ? "DRY RUN - nothing changed.\n\n" : "Phase 2 complete.\n\n") +
        (DRY_RUN ? "Planned" : "Created") + " variant artboards: " + (DRY_RUN ? RECIPES.length * 2 : created) + "\n" +
        "Objects recoloured: " + recoloured + "\n" +
        "Swatches added: " + swatchesAdded + "\n" +
        "Warnings: " + warnings.length +
        written +
        (DRY_RUN ? "\n\nSet DRY_RUN = false at the top to build for real."
                 : "\n\nNothing is saved yet. Review, then Save.")
    );

})();
