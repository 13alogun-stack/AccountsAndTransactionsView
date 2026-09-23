# ALC review set — local handoff

**File** SHN-Migration `yIodoNrl7m2Wg0B1EeTtGM` · **Page** `YIR · Wednesday review` · **Section** `05 · ALC · review set` `1801:97499`

**Why local:** every ALC frame is set in Georgia and Trebuchet MS, and the cloud Figma API can't load either font. All text work happens in Figma desktop.

## Run it
1. Figma desktop → Plugins → Development → **Import plugin from manifest…** → `figma/alc-local-plugin/manifest.json`
2. Open the file, go to the `YIR · Wednesday review` page, run **ALC review set — finish pass**.
3. A panel shows what changed and ends with **PLACEHOLDERS LEFT**. That list has to read `none ✓`. If it doesn't, each line gives a node id to fix by hand, then run the plugin again (it's safe to re-run).

The plugin touches only section `1801:97499`. It never deletes anything; it hides instead. It doesn't touch `01 · REVIEW`, `Overview in context` or the archive.

## What it does (every `ALC · …` frame, including the motion-hero variants)
| Step | Result |
|---|---|
| Frame names | Any leftover old names → `Opt 1 / Opt 3 / Alt 1 / Alt 2`, `· ORANGE colourway` → `· ORANGE`. Each canvas label is reset to its frame's name |
| K+ wording | Topper, intro, at-a-glance, Canada and sign-off lines → ALC deck wording. `1,800,000` / `XXXX` → **2,400,000** |
| Opt 2 + Opt 2 ORANGE (cloned from K+) | Stats 32/186/12/74 → **40/242/15/91**. Blue text → `#BF0000` (red) or `#CB4F11` (ORANGE) |
| "Beyond Kobo Plus" slots | → **Your year in eBooks**: `12,904 PAGES TURNED` + `23 LONGEST READING STREAK (DAYS)`. These are deck rows 24 and 28–29, which had nowhere else to go |
| ORANGE frames | Every `[KWL COPY TBC]` / `[TBC]` copied from the red twin at the same layer position. The KWL header and footer are hidden and replaced with library `Header Email · 2025` / `Footer · 2025` |
| Cover slots | `[COVER TBC]` → staged titles: The Long Way Home, Funny Story, James, The Women, The God of the Woods, Intermezzo, Truly |
| Footer legal | "Legal headline copy insert here… lorem" → the ALC `*Represents books…` disclaimer, as in K+ |
| Hidden placeholders | Hidden `[dynamic]` → the visible value next to it. Hidden K+ year lockup → `2026` |
| Opt 3 hero CTA | No ALC deck row, so it's **hidden** |
| Canada line | Wherever `The most read book in Canada:` is smaller than 24, it's set to 24 so it reads as a headline |
| Hygiene | Curly apostrophes, no double spaces, no space before `:`, square corners (library instance internals left alone) |
| Parts frame | Unused KWL footer component and cover-slot component: TBC → real strings, so they don't show up as placeholders |

## Calls baked in: change them in `code.js` if you disagree
- **The beyond slot becomes eBook stats.** The other choice was `Your year in audiobooks`, but listening is already in the at-a-glance block.
- **Truly** is staged from the `user_truly` layer name. Swap in the full title if you know it.
- **Sign-off** stays as the deck line `Thank you for reading with us` until Annette confirms whether ALC takes the K+ "making Kobo your home…" line.

## Not placeholders, but still open
- **No slot anywhere for:**
  - Top % (`YOU’RE IN THE TOP 8%`)
  - How it started / How it ended
  - Separate eBooks and audiobooks sections, Kobo average (12 / 4), listening streak (9 days)
  - Wishlist (`Start the year strong with a book on your Wishlist…` / `Go to Wishlist`)

  These need layout decisions.
- **K+ furniture still in both Opt 2s:** the yellow `Kplus Arrows` images, the `Module · Top Genre · K+` instance, and the Clara image hidden under the lifestyle photo.
- **Opt 2 heroes** show rendered images of the ALC bookshelf art crops (Red Light / Orange Dark) as stand-ins. After recolouring, check the headline can be read over the art.
- **Motion:** the variants `+ book motion hero` and `+ page-turn hero` are already in the section. What's left is placement for stats (V1 icons), beyond (page-turn), highlights (flip card) and the optional sign-off lockup. Then build `ALC · Overview in context` from a duplicate of the finished set, and leave the clean set untouched.
- **The K+ `Overview in context` board** still has "Opt 3" label text above its mosaic. Mirror `01 · REVIEW`, not Overview.
