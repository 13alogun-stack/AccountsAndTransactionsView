/*
 * KWL_01_separate_layers.jsx
 * ---------------------------------------------------------------------------
 * PHASE 1 - Layer architecture only. No colour changes. No geometry changes.
 *
 * Run from Illustrator:  File > Scripts > Other Script...  (Cmd+F12)
 *
 * Builds these layers, top to bottom:
 *     Guides - Dielines      (locked at the end)
 *     Text
 *     Illustrations
 *     Background
 *     Reference - Hidden     (hidden at the end)
 *
 * Guarantees, by construction:
 *   - Objects are re-parented via Illustrator's own .move(). Coordinates are
 *     document-space, so every object keeps its exact position.
 *   - Only TOP-LEVEL items are touched. Groups and clipping masks move whole
 *     and are never entered, so no mask is broken.
 *   - Relative stacking order is preserved within each destination layer.
 *   - Nothing is flattened, outlined, rasterised, resized or recoloured.
 *   - Artboards are not read, written or reordered.
 *
 * Also writes a report next to the document listing every swatch in the file,
 * which is what Phase 2 needs in order to resolve "Orange 20", "Yellow 20"
 * etc. to real values instead of guessing them.
 * ---------------------------------------------------------------------------
 */

#target illustrator

(function () {

    // ---------------------------------------------------------------- config

    var L_GUIDES = "Guides - Dielines";
    var L_TEXT   = "Text";
    var L_ILLUS  = "Illustrations";
    var L_BG     = "Background";
    var L_REF    = "Reference - Hidden";

    // Name fragments that mark an object as die/guide furniture.
    var RE_GUIDE = /(bleed|trim|safe|die[\s_-]*line|dieline|cut[\s_-]*contour|cutcontour|keep[\s_-]*clear|hole|crop|registration|perf)/i;
    // Name fragments that mark an object as reference-only material.
    var RE_REF   = /(reference|^ref\b|template|mockup|mock[\s_-]*up|placeholder|do[\s_-]*not[\s_-]*print|fpo)/i;
    // Name fragments that mark an object as a background plate.
    var RE_BG    = /(background|^bg\b|backing|base[\s_-]*plate)/i;
    // Spot-colour names that mean "this is a cut path, not artwork".
    var RE_SPOT_CUT = /(cut[\s_-]*contour|dieline|die[\s_-]*line|thru[\s_-]*cut|through[\s_-]*cut|crease|perf)/i;

    var BG_COVERAGE = 0.90;   // fraction of artboard an item must span to read as background

    // ------------------------------------------------------------ preflight

    if (app.documents.length === 0) {
        alert("No document is open.\n\nOpen KWL_layered_color_variants.ai and run this again.");
        return;
    }

    var doc = app.activeDocument;

    // Refuse to run on the untouched original unless explicitly allowed.
    if (/^kwl\.ai$/i.test(doc.name)) {
        if (!confirm(
            "The active document is the ORIGINAL kwl.ai.\n\n" +
            "You should File > Save As to KWL_layered_color_variants.ai first, " +
            "so the original stays pristine.\n\n" +
            "Continue anyway?"
        )) { return; }
    }

    if (doc.layers.length === 0) { alert("This document has no layers."); return; }

    // ------------------------------------------------------------- utilities

    function findLayer(name) {
        for (var i = 0; i < doc.layers.length; i++) {
            if (doc.layers[i].name === name) return doc.layers[i];
        }
        return null;
    }

    // New layers land on top, so create bottom-most first to get the order above.
    function makeLayer(name) {
        var existing = findLayer(name);
        if (existing) { existing.locked = false; existing.visible = true; return existing; }
        var l = doc.layers.add();
        l.name = name;
        return l;
    }

    function rectsOverlap(a, b) {
        // bounds arrays are [left, top, right, bottom]; top > bottom in Illustrator
        return !(a[2] < b[0] || a[0] > b[2] || a[3] > b[1] || a[1] < b[3]);
    }

    // Which artboard does this item sit on? Returns artboardRect or null.
    function artboardFor(bounds) {
        for (var i = 0; i < doc.artboards.length; i++) {
            var ab = doc.artboards[i].artboardRect;
            if (rectsOverlap(bounds, ab)) return ab;
        }
        return null;
    }

    function hasFill(item) {
        try { return item.filled === true; } catch (e) { return false; }
    }

    function spotStrokeIsCut(item) {
        try {
            if (item.stroked && item.strokeColor &&
                item.strokeColor.typename === "SpotColor" &&
                RE_SPOT_CUT.test(item.strokeColor.spot.name)) return true;
        } catch (e) {}
        try {
            if (item.filled && item.fillColor &&
                item.fillColor.typename === "SpotColor" &&
                RE_SPOT_CUT.test(item.fillColor.spot.name)) return true;
        } catch (e) {}
        return false;
    }

    // Count text vs non-text inside a group. Read-only: nothing is modified and
    // no mask is entered or released. group.pageItems is already a flat list of
    // everything nested inside, so a single pass covers all depths. Nested
    // GroupItems are containers, not content, so they are not counted as art -
    // a group of groups of text is still pure text.
    function tallyGroup(group, tally) {
        var items = group.pageItems;
        for (var i = 0; i < items.length; i++) {
            var t = items[i].typename;
            if (t === "TextFrame") { tally.text++; }
            else if (t === "GroupItem") { /* container only */ }
            else if (t === "PlacedItem" || t === "RasterItem") { tally.image++; tally.other++; }
            else { tally.other++; }
        }
    }

    // ------------------------------------------------------- classification

    function classify(item, originLayerName) {
        var name = "";
        try { name = item.name || ""; } catch (e) {}

        // 1. True Illustrator guides are always furniture.
        try { if (item.guides === true) return L_GUIDES; } catch (e) {}

        // 2. Cut/dieline spot colours, or guide-ish naming on the item or its origin layer.
        if (spotStrokeIsCut(item)) return L_GUIDES;
        if (RE_GUIDE.test(name)) return L_GUIDES;
        if (RE_GUIDE.test(originLayerName)) return L_GUIDES;

        // 3. Explicit reference naming, on the item or its origin layer.
        if (RE_REF.test(name) || RE_REF.test(originLayerName)) return L_REF;

        // 4. Anything the designer had already hidden is reference material.
        try { if (item.hidden === true) return L_REF; } catch (e) {}

        // 5. Live text.
        if (item.typename === "TextFrame") return L_TEXT;

        // 6. Groups: pure-text groups are Text, everything else is artwork.
        //    The group moves whole either way - never entered, never ungrouped.
        if (item.typename === "GroupItem") {
            var tally = { text: 0, other: 0, image: 0 };
            tallyGroup(item, tally);
            if (tally.text > 0 && tally.other === 0) return L_TEXT;
            return L_ILLUS;
        }

        // 7. Explicit background naming.
        if (RE_BG.test(name)) return L_BG;

        // 8. Full-bleed filled plate = background.
        if (item.typename === "PathItem" && hasFill(item)) {
            try {
                var b  = item.geometricBounds;
                var ab = artboardFor(b);
                if (ab) {
                    var iw = Math.abs(b[2] - b[0]),  ih = Math.abs(b[1] - b[3]);
                    var aw = Math.abs(ab[2] - ab[0]), ah = Math.abs(ab[1] - ab[3]);
                    if (aw > 0 && ah > 0 && (iw / aw) >= BG_COVERAGE && (ih / ah) >= BG_COVERAGE) {
                        return L_BG;
                    }
                }
            } catch (e) {}
        }

        // 9. Embedded/linked imagery that is NOT named as reference is real artwork.
        //    Deliberately NOT auto-hidden - hiding live art would change the design.
        if (item.typename === "PlacedItem" || item.typename === "RasterItem") return L_ILLUS;

        return L_ILLUS;
    }

    // ------------------------------------------- unlock everything, remember

    var layerState = [];
    function unlockLayerTree(layers) {
        for (var i = 0; i < layers.length; i++) {
            var l = layers[i];
            layerState.push({ layer: l, locked: l.locked, visible: l.visible });
            l.locked = false;
            l.visible = true;
            if (l.layers && l.layers.length) unlockLayerTree(l.layers);
        }
    }
    unlockLayerTree(doc.layers);

    // -------------------------------------- collect top-level items in z-order

    // Global z-order: layer 0 is topmost; within a layer, pageItems[0] is topmost.
    // Collecting top-to-bottom and later moving with PLACEATEND preserves order.
    //
    // NOTE: layer.pageItems is a FLAT list - it includes items nested inside
    // groups and inside sublayers. An item is top-level exactly when its parent
    // is a Layer rather than a GroupItem/CompoundPathItem. Testing that also
    // picks up the top-level items of sublayers, each exactly once, so there is
    // no separate sublayer recursion here (that would double-collect them).
    var harvested = [];   // { item, originLayer }

    function parentIsLayer(it) {
        try { return it.parent.typename === "Layer"; } catch (e) { return false; }
    }
    function parentLayerName(it) {
        try { return it.parent.name; } catch (e) { return ""; }
    }

    function harvestLayer(layer) {
        for (var i = 0; i < layer.pageItems.length; i++) {
            var it = layer.pageItems[i];
            if (!parentIsLayer(it)) continue;          // nested in a group - leave it alone
            harvested.push({ item: it, originLayer: parentLayerName(it) });
        }
    }

    var originalLayers = [];
    for (var li = 0; li < doc.layers.length; li++) originalLayers.push(doc.layers[li]);
    for (var lj = 0; lj < originalLayers.length; lj++) harvestLayer(originalLayers[lj]);

    if (harvested.length === 0) { alert("Found no top-level objects to sort."); return; }

    // ----------------------------------------------- create destination layers

    // Created bottom-most first; each new layer is added above the last.
    var refLayer    = makeLayer(L_REF);
    var bgLayer     = makeLayer(L_BG);
    var illusLayer  = makeLayer(L_ILLUS);
    var textLayer   = makeLayer(L_TEXT);
    var guidesLayer = makeLayer(L_GUIDES);

    var target = {};
    target[L_REF]    = refLayer;
    target[L_BG]     = bgLayer;
    target[L_ILLUS]  = illusLayer;
    target[L_TEXT]   = textLayer;
    target[L_GUIDES] = guidesLayer;

    var newLayerNames = {};
    newLayerNames[L_REF] = 1; newLayerNames[L_BG] = 1; newLayerNames[L_ILLUS] = 1;
    newLayerNames[L_TEXT] = 1; newLayerNames[L_GUIDES] = 1;

    // --------------------------------------------------------------- move pass

    var counts = {}, moved = 0, failed = 0, failures = [];
    counts[L_GUIDES] = 0; counts[L_TEXT] = 0; counts[L_ILLUS] = 0;
    counts[L_BG] = 0; counts[L_REF] = 0;

    var imagesSeen = [];

    for (var h = 0; h < harvested.length; h++) {
        var rec  = harvested[h];
        var item = rec.item;

        // Skip anything already sitting in a destination layer.
        try { if (newLayerNames[rec.originLayer]) continue; } catch (e) {}

        var wasLocked = false, wasHidden = false;
        try { wasLocked = item.locked; item.locked = false; } catch (e) {}
        try { wasHidden = item.hidden; if (wasHidden) item.hidden = false; } catch (e) {}

        var dest = classify(item, rec.originLayer);

        try {
            if (item.typename === "PlacedItem" || item.typename === "RasterItem") {
                var nm = ""; try { nm = item.name || "(unnamed)"; } catch (e2) {}
                imagesSeen.push(nm + "  ->  " + dest);
            }

            item.move(target[dest], ElementPlacement.PLACEATEND);
            counts[dest]++;
            moved++;

            // Restore per-object lock. Hidden state is expressed by the
            // Reference layer, so individually hidden items are left visible
            // inside it rather than double-hidden.
            try { item.locked = wasLocked; } catch (e3) {}
            if (dest !== L_REF) { try { item.hidden = wasHidden; } catch (e4) {} }

        } catch (err) {
            failed++;
            if (failures.length < 12) {
                var fn = ""; try { fn = item.name || item.typename; } catch (e5) { fn = "?"; }
                failures.push(fn + " : " + err);
            }
        }
    }

    // ------------------------------------------------- remove emptied layers

    // Sublayers first, then their parents, so a layer emptied by removing its
    // sublayers can itself be removed in the same pass.
    var removed = 0;

    function pruneEmpty(collection) {
        for (var d = collection.length - 1; d >= 0; d--) {
            var lay = collection[d];
            if (newLayerNames[lay.name]) continue;
            try {
                if (lay.layers.length) pruneEmpty(lay.layers);
                if (lay.pageItems.length === 0 && lay.layers.length === 0) {
                    lay.locked = false;
                    lay.remove();
                    removed++;
                }
            } catch (e) {}
        }
    }
    pruneEmpty(doc.layers);

    // ------------------------------------------------- final layer states

    guidesLayer.locked = true;                 // brief: lock the dieline layer
    refLayer.visible   = false;                // brief: keep reference hidden
    textLayer.locked = false;  textLayer.visible = true;
    illusLayer.locked = false; illusLayer.visible = true;
    bgLayer.locked = false;    bgLayer.visible = true;

    // --------------------------------------------- swatch report for Phase 2

    var swatchLines = [];
    try {
        for (var s = 0; s < doc.swatches.length; s++) {
            var sw = doc.swatches[s];
            var line = sw.name, c = null;
            try { c = sw.color; } catch (e) {}
            if (c) {
                if (c.typename === "SpotColor") {
                    var inner = null;
                    try { inner = c.spot.color; } catch (e) {}
                    if (inner && inner.typename === "CMYKColor") {
                        line += "  [SPOT CMYK " + Math.round(inner.cyan) + "/" + Math.round(inner.magenta) +
                                "/" + Math.round(inner.yellow) + "/" + Math.round(inner.black) + "]";
                    } else if (inner && inner.typename === "RGBColor") {
                        line += "  [SPOT RGB " + Math.round(inner.red) + "," + Math.round(inner.green) +
                                "," + Math.round(inner.blue) + "]";
                    } else { line += "  [SPOT]"; }
                } else if (c.typename === "CMYKColor") {
                    line += "  [CMYK " + Math.round(c.cyan) + "/" + Math.round(c.magenta) +
                            "/" + Math.round(c.yellow) + "/" + Math.round(c.black) + "]";
                } else if (c.typename === "RGBColor") {
                    line += "  [RGB " + Math.round(c.red) + "," + Math.round(c.green) + "," + Math.round(c.blue) + "]";
                } else if (c.typename === "GrayColor") {
                    line += "  [GRAY " + Math.round(c.gray) + "]";
                } else {
                    line += "  [" + c.typename + "]";
                }
            }
            swatchLines.push(line);
        }
    } catch (e) { swatchLines.push("(could not read swatches: " + e + ")"); }

    var report =
        "KWL - Phase 1 layer separation\n" +
        "Document: " + doc.name + "\n" +
        "Artboards: " + doc.artboards.length + "\n" +
        "Top-level objects processed: " + moved + "\n" +
        "Failed to move: " + failed + "\n" +
        "Emptied layers removed: " + removed + "\n\n" +
        "PER LAYER\n" +
        "  " + L_GUIDES + " : " + counts[L_GUIDES] + "  (locked)\n" +
        "  " + L_TEXT   + " : " + counts[L_TEXT] + "\n" +
        "  " + L_ILLUS  + " : " + counts[L_ILLUS] + "\n" +
        "  " + L_BG     + " : " + counts[L_BG] + "\n" +
        "  " + L_REF    + " : " + counts[L_REF] + "  (hidden)\n\n" +
        (imagesSeen.length ? "IMAGES FOUND\n  " + imagesSeen.join("\n  ") + "\n\n" : "") +
        (failures.length ? "FAILURES\n  " + failures.join("\n  ") + "\n\n" : "") +
        "SWATCHES IN DOCUMENT (" + swatchLines.length + ")\n  " + swatchLines.join("\n  ") + "\n";

    // Write the report beside the document if it has been saved to disk.
    var written = "";
    try {
        var out = new File(doc.path + "/KWL_phase1_report.txt");
        out.open("w"); out.write(report); out.close();
        written = "\n\nReport written to:\n" + out.fsName;
    } catch (e) {
        written = "\n\n(Could not write report file - copy the text above instead.)";
    }

    alert(
        "Phase 1 complete - layers only, no colour or geometry changes.\n\n" +
        "Guides - Dielines : " + counts[L_GUIDES] + "   (locked)\n" +
        "Text              : " + counts[L_TEXT] + "\n" +
        "Illustrations     : " + counts[L_ILLUS] + "\n" +
        "Background        : " + counts[L_BG] + "\n" +
        "Reference - Hidden: " + counts[L_REF] + "   (hidden)\n\n" +
        "Moved " + moved + " objects, " + failed + " failures, " +
        removed + " empty layers removed.\n" +
        "Swatches found: " + swatchLines.length +
        written +
        "\n\nNothing is saved yet. Check the artwork, then Save."
    );

})();
