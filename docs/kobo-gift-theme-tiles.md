# Kobo Gift a Book — Theme Tiles

**Status:** Draft 2 for Kammy · 13 Oct 2026 · Built in Figma `SHN-Migration` (`yIodoNrl7m2Wg0B1EeTtGM`), page **Gift a Book · Theme Tiles** (`3783:28918`).

Replaces product's placeholder wallpapers (flat pastel blocks + Freepik balloons / candy canes / confetti) with 32 monochromatic, tone-on-tone tiles in two explored routes (Silhouette, Stylus line) plus a third (Texture). Everything is pure vector. No Getty, no stock, no asset IDs to log.

---

## Where things are (Figma)

| What | Node | Link |
|---|---|---|
| Deliverable — brief's six + stylus alt, product spec | `3841:57956` | https://www.figma.com/design/yIodoNrl7m2Wg0B1EeTtGM/?node-id=3841-57956 |
| Round 2 — six further ideas | `3846:57962` | https://www.figma.com/design/yIodoNrl7m2Wg0B1EeTtGM/?node-id=3846-57962 |
| Test grid — 32 themes × 6 real covers | `3850:58010` | https://www.figma.com/design/yIodoNrl7m2Wg0B1EeTtGM/?node-id=3850-58010 |
| In context + prototype — Gift Details page, 6 screens | `3854:58586` | https://www.figma.com/design/yIodoNrl7m2Wg0B1EeTtGM/?node-id=3854-58586 |
| v1 (superseded, 600×400) | on the page, labelled | — |

Product sources used (not modified): Themes section `3835:256775`, 36-card theme grid `3835:256782`, Gift Details page `3835:253960`. Cover cards cloned: `3835:256783` Zoe Spanos · `256796` Fahrenheit 451 · `256809` Hooked · `256822` Caged Bird · `256835` Luster · `256848` Art of War.

**PDF:** right-click any section → Export → PDF. (Could not be downloaded from the build sandbox — proxy blocks figma.com.)

---

## Spec (matched exactly from product)

| Surface | Size | Radius | Cover |
|---|---|---|---|
| Theme card tile (grid / email) | 406 × 170 | 0 | 104.29 × 146 at (151, 12) |
| Gift Summary tile (Gift Details page) | 456 × 170 | 0 | 89 × 138 at (183, 16) |
| Theme picker thumbnail | 168 × 97 outer, 152 × 81 inner at (8, 8) | 5 outer / 3 inner | none |

**Composition rule that falls out of the spec:** the cover sits dead centre, so every tile is two ~151 px bookends. Motifs live in the flanks; the centre stays quiet.

**Picker rule:** the whole 406 × 170 tile is fitted to the 152-wide inner (scale 0.374, 152 × 63.6, vertically centred). Nothing is cropped; the letterbox is invisible because the ground is uniform. Keep motifs inside the tile — do not bleed anything that must survive the thumb.

---

## Palette

Sampled from the live Kobo Stack masters in the file (no Kobo tokens exist in the attached libraries — those are DS3 / SDM / RCLS / PC / Maxi).

**Anchors:** Kobo Red `#BF0000` · Kobo Sage `#CCDED6` · Kobo Yellow `#FFF081` · Ink `#231F20` · White.

**Rule (Kammy):** one brand colour per tile at a soft tint (none above ~35–50 %), motif one step deeper, tone-on-tone. Never a saturated hue. The cover is the hero.

---

## The 32 themes

Route: **S** Silhouette · **L** Stylus line · **T** Texture · **B** Base layer. Ground / motif hexes.

### Brief's six (+ stylus alt)

| # | Theme | R | Ground | Motif | Why |
|---|---|---|---|---|---|
| 01 | Bookmark (refined) | S | `#E9F1ED` | `#C2D8CC`, shadow `#A8C4B6` | Band wider than the cover, bleeding off the top, notch shoulders showing. Graphic (flat) shadow — survives email clients. |
| 02 | Book silhouette (stacked) | S | `#F6E3E3` | `#DFB3B3` / `#E8C6C6` | Stacks in both flanks; cover sits in a gap in the shelf. |
| 02b | Book silhouette — stylus alt | L | `#F6E3E3` | `#D99F9F` 2.5 px | Same composition as 02 drawn as outline. 02 vs 02b is the Silhouette-vs-Stylus decision in one view. |
| 03 | Bookshelf | S | `#EDEBE8` | `#CBC6BE` / `#BDB7AE` | Plank lands on the cover baseline; the gift stands on the shelf with the others. **Strongest — lead with it.** |
| 04 | Genre: fantasy — mountains & moon | S | `#DCE8E3` | `#C9DCD3` / `#A6C3B7`, moon `#BFD4CA` | Four passes at a dragon all read as a bird or a ribbon; simplified to pure geometry. Weakest of the six — needs a hand-drawn source if a creature is wanted. |
| 05 | Genre: romance — hearts | S | `#FAEBEC` | `#E3AEB3` / `#EFC9CC` | Small hearts across both flanks, three cropped by the edge. Deliberately under-scaled. |
| 06 | Stylus line — open book | L | `#FCF5DA` | `#CBB55E` 4.5 px | One continuous outline; page curves emerge either side of the cover, one thread rising. |

### Round 2

| # | Theme | R | Ground | Motif | Why |
|---|---|---|---|---|---|
| 07 | Birthday — scalloped band | S | `#FBF3D3` | `#E6D48A` | Bunting reduced to one scalloped edge. |
| 08 | Christmas — stacked triangles | S | `#DCEAE2` | `#BFD6CA` / `#A9C8B9` | Evergreens as three stacked triangles, two per flank at two depths. |
| 09 | New Year — sparse confetti | S | `#E8E4DF` | `#B8AFA4` / `#CFC7BC` | 16 dots + 8 dashes, nothing in the cover zone. Over ~25 marks it becomes the clip art it replaces. |
| 10 | Texture — fore-edge hatch | T | `#E9F1ED` | `#C8DBD1` 1.25 px, 8 px pitch, 45° | Third route: no motif, just a hatch reading as a closed book's fore-edge. Literally wallpaper. |
| 11 | Stylus system — heart | L | `#FCF5DA` | `#CBB55E` 4 px | One line enters left, draws the loop, passes behind the cover, exits right. Swap the loop = new theme. |
| 12 | Stylus system — candle | L | `#FCF5DA` | `#CBB55E` 4 px | Same system, Birthday loop. |
| 13 | Stylus system — star | L | `#FCF5DA` | `#CBB55E` 4 px | Same system, pentagram loop. |
| 14 | Bookends | S | `#F7E6E4` | `#E2B9B6` / `#EBC9C6`, plank `#D9ADA9` | Spines stand upright and press against the cover's edges — the gift is the book pulled out. |
| 15 | Light-lift — base layer | B | `#D9E6DF` | white radial 90 → 45 → 0 % | Not a theme: a layer under any theme. Depth without a drop shadow. |

### New for the 32

| # | Theme | R | Ground | Motif | Why |
|---|---|---|---|---|---|
| 17 | Thank you — bow | S | `#FAEBEC` | `#EFC9CC`, knot `#E3AEB3` | Two loops, two tails, one knot, per flank. |
| 18 | Congratulations — sparkles | S | `#FCF5DA` | `#E0CD7C` / `#E6D48A` | Four-point stars, mixed scale. |
| 19 | Get well / Good morning — sun | L | `#FBF3D3` | `#CBB55E` 4 px | Stroked circle + eight rays, one per flank. |
| 20 | Mother's Day / Spring — petals | S | `#F7E6E4` | `#EBC9C6`, centre `#E2B9B6` | Five circles round a centre — a flower with no drawing in it. |
| 21 | Wedding / Anniversary — rings | L | `#E9F1ED` | `#9FBFB0` 4 px | Two overlapping rings left, one cropped right. |
| 22 | Bedtime / New baby — moon & stars | S | `#E4E1DC` | `#B8AFA4` | Crescent + scattered dots. |
| 23 | Texture — polka dots | T | `#E9F1ED` | `#C8DBD1` | 6 px dots, 26 px offset grid. |
| 24 | Genre: mystery — keyhole | S | `#EDEBE8` | `#BDB7AE` | Circle + trapezoid, one per flank. |
| 25 | Genre: sci-fi — planet | S | `#DCE8E3` | `#A6C3B7`, ring `#8FB3A4` | Circle + stroked ellipse ring, right flank; dots left. |
| 26 | Texture — graph grid | T | `#EDEBE8` | `#D4CFC8` 1 px, 20 px | Non-fiction / learning. |
| 27 | Kids — rainbow arcs | L | `#FAEBEC` | `#DFA9AE` 4 px | Three concentric arcs per flank rising from the baseline. |
| 28 | Poetry / Literary — quote marks | S | `#FBF3D3` | `#E0CD7C` | Typographic " " at 170 px, Inter Bold. |
| 29 | Travel / Adventure — waves | L | `#E9F1ED` | `#9FBFB0` 4 px | Three wave lines full width. |
| 30 | Autumn — leaves | S | `#F6E3E3` | `#DFB3B3` / `#E8C6C6` | Pointed-ellipse leaves, mixed scale. |
| 31 | Winter — snow | S | `#EEF4F1` | `#C8DBD1` | 18 circles, 3–10 px, sparse. |
| 32 | Texture — stripes | T | `#EDEBE8` | `#DAD5CE` 1.5 px, 10 px | Vertical fine stripes — spine rhythm. |

Numbers 16 is unused (02b takes its slot).

---

## Prototype (In context section)

Six screens, each a clone of product's real Gift Details page with only the tile art swapped:

| Screen | Selected theme | Node |
|---|---|---|
| 1 | 10 Fore-edge hatch | `3861:58960` |
| 2 | 14 Bookends | `3861:59134` |
| 3 | 03 Bookshelf (**flow start**) | `3854:58590` |
| 4 | 07 Birthday | `3861:59308` |
| 5 | 05 Romance | `3861:59482` |
| 6 | 08 Christmas | `3861:59656` |

- Each screen: summary tile = that theme at 456 × 170 behind the real *My Brilliant Friend* cover; that theme's thumbnail carries product's selected (red) border; label reads "Selected Theme: <name>".
- Every thumbnail → `ON_CLICK` → `NAVIGATE` to its theme's screen, dissolve 200 ms, scroll position preserved. 30 transitions. Clicking the already-selected thumbnail has no link (Figma rejects self-navigation; nothing is lost).
- Flow starting point "Gift a Book — theme picker" on screen 3.
- Label font is **Inter Semi Bold** — the original `Rakuten Sans UI` is not installed in the file.

---

## Open items / flags for Kammy and product

1. **Picker holds six; there are 32 themes.** Pagination, scroll or categories is product's call. Nothing built for it.
2. **Occasion coverage.** Product's grid is occasion-led (Birthday / Valentine's / Christmas / New Year). The brief's six are book- and genre-led. Round 2 and the 32 close the gap, but the set needs a decision on which 6–8 ship.
3. **04 Fantasy** is the one tile that would benefit from one of Ibra's sketches or a licensed silhouette. Geometry got it to "not wrong", not to "dragon".
4. **Mobile.** No mobile tile variant exists in product's file; none invented.
5. **GIF concept** — not started.
6. **References not supplied** (brief placeholders): product spec link (recovered from the Themes section), book-stack silhouette node, Plot Chaser stylus node, "Design exploration for social" link, Ibra's sketches. All motifs are drawn from scratch.
7. **Light-lift (15)** is a base layer — try it under 03 or 14, don't judge it alone.

---

## Build notes (for whoever picks this up)

- Everything was built with the Figma Plugin API through `use_figma`. Cards are **clones of product's own theme card** per cover; the two background image rects are removed, the tile frame is refilled with the ground, the motif is drawn, and the cover instance is re-appended on top. Metadata strip, type and covers are therefore product's, untouched.
- Motif paths authored in tile coordinates must be appended **without** setting `x`/`y` afterwards — setting them re-anchors the bounding box and shoves the art (this bit 04 and 08 once; fixed).
- A `use_figma` script that throws **rolls back the whole script**. Load fonts (and check they exist) before any text edit, or do text in its own script.
- Thumb art: a 406 × 170 frame drawn with the normal motif function, then `rescale(152/406)`, `x = 0`, `y = 8.7`.
- Summary art is drawn directly at 456 × 170 (plank-based motifs align to the cover bottom at y 154).
