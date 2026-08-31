/*
 * KWL_00_probe.jsx  -  READ ONLY DIAGNOSTIC
 *
 * Changes nothing. Reports what is actually in the document so the real
 * cause of a failure is visible instead of guessed at.
 *
 * Run: File > Scripts > Other Script...   (Cmd+F12)
 */

#target illustrator

(function () {
    var out = [];
    function say(s) { out.push(s); }

    try {
        say("=== KWL PROBE ===");

        // --- application -------------------------------------------------
        try { say("Illustrator version : " + app.version); } catch (e) { say("app.version failed: " + e); }
        try { say("Locale              : " + $.locale); } catch (e) {}

        if (app.documents.length === 0) {
            say("");
            say("!! NO DOCUMENT OPEN. Open KWL_layered_color_variants.ai and run again.");
            alert(out.join("\n"));
            return;
        }

        var doc = app.activeDocument;
        say("Document            : " + doc.name);
        try { say("Saved to disk       : " + (doc.saved ? "yes" : "NO - unsaved changes")); } catch (e) {}
        try { say("Path                : " + (doc.path ? doc.path.fsName : "(never saved)")); } catch (e) { say("Path                : (unavailable)"); }
        try { say("Colour space        : " + doc.documentColorSpace); } catch (e) {}
        try { say("Artboards           : " + doc.artboards.length); } catch (e) {}

        // --- layers ------------------------------------------------------
        say("");
        say("--- LAYERS (exact names, in brackets to expose stray spaces) ---");
        try {
            for (var i = 0; i < doc.layers.length; i++) {
                var L = doc.layers[i];
                var n = 0, sub = 0;
                try { n = L.pageItems.length; } catch (e) {}
                try { sub = L.layers.length; } catch (e) {}
                say("  [" + L.name + "]  items:" + n + "  sublayers:" + sub +
                    "  locked:" + L.locked + "  visible:" + L.visible);
            }
        } catch (e) { say("  layer walk failed: " + e); }

        // --- what Phase 2 looks for --------------------------------------
        say("");
        say("--- PHASE 2 LAYER LOOKUP ---");
        var wanted = ["Background", "Text", "Illustrations", "Guides - Dielines", "Reference - Hidden"];
        for (var w = 0; w < wanted.length; w++) {
            var hit = null;
            for (var j = 0; j < doc.layers.length; j++) {
                if (doc.layers[j].name === wanted[w]) { hit = doc.layers[j]; break; }
            }
            say("  " + (hit ? "FOUND   " : "MISSING ") + "\"" + wanted[w] + "\"");
        }
        say("  (MISSING usually means the name differs - a different dash, or extra spaces.)");

        // --- artboard names ----------------------------------------------
        say("");
        say("--- FIRST 10 ARTBOARDS ---");
        try {
            var lim = Math.min(10, doc.artboards.length);
            for (var a = 0; a < lim; a++) {
                var r = doc.artboards[a].artboardRect;
                say("  " + (a + 1) + ". [" + doc.artboards[a].name + "]  " +
                    ((r[2] - r[0]) / 72).toFixed(3) + " x " + ((r[1] - r[3]) / 72).toFixed(3) + " in");
            }
        } catch (e) { say("  artboard walk failed: " + e); }

        // --- swatches ------------------------------------------------------
        say("");
        say("--- SWATCHES (first 40) ---");
        try {
            var sl = Math.min(40, doc.swatches.length);
            say("  total: " + doc.swatches.length);
            for (var s = 0; s < sl; s++) say("  [" + doc.swatches[s].name + "]");
        } catch (e) { say("  swatch walk failed: " + e); }

        // --- API availability the scripts depend on -------------------------
        say("");
        say("--- API CHECKS ---");
        try { say("  convertSampleColor : " + (typeof app.convertSampleColor)); } catch (e) { say("  convertSampleColor : MISSING"); }
        try { say("  ImageColorSpace    : " + (typeof ImageColorSpace)); } catch (e) { say("  ImageColorSpace    : MISSING"); }
        try { say("  ColorConvertPurpose: " + (typeof ColorConvertPurpose)); } catch (e) { say("  ColorConvertPurpose: MISSING"); }
        try { say("  ElementPlacement   : " + (typeof ElementPlacement)); } catch (e) { say("  ElementPlacement   : MISSING"); }

    } catch (fatal) {
        say("");
        say("!! FATAL: " + fatal + (fatal.line ? "  (line " + fatal.line + ")" : ""));
    }

    var text = out.join("\n");

    // Try to drop the report next to the document, then on the desktop.
    var written = "";
    try {
        var f = new File(app.activeDocument.path + "/KWL_probe.txt");
        f.open("w"); f.write(text); f.close();
        written = "\n\nWritten to: " + f.fsName;
    } catch (e) {
        try {
            var f2 = new File("~/Desktop/KWL_probe.txt");
            f2.open("w"); f2.write(text); f2.close();
            written = "\n\nWritten to: " + f2.fsName;
        } catch (e2) { written = "\n\n(Could not write a file - copy this text manually.)"; }
    }

    alert(text + written);
})();
