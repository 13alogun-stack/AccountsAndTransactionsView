# ALC review set — local handoff

**File:** SHN-Migration `yIodoNrl7m2Wg0B1EeTtGM` · **Page:** `YIR · Wednesday review` · **Section:** `05 · ALC · review set` `1801:97499`

**Why local:** every ALC frame (red and ORANGE) is set in **Georgia** and **Trebuchet MS**. The cloud Figma API can't load either font, so no text can be edited from there. Run this in Figma desktop, where the fonts are installed: the Claude desktop app with the Figma desktop MCP, or a dev plugin.

**State at handoff:** unchanged. The cloud rename/corner/footer script errored and rolled back, so nothing was written.

**Don't touch:** `01 · REVIEW` (`1759:73610`), `Overview in context` (`1880:307481`), the archive. **Don't delete anything:** hide or move instead. No "Kobo Plus" wording, no plus pattern.

---

## Decisions already made

| Topic | Decision |
|---|---|
| Naming | Match `01 · REVIEW` **by structure** (table below) |
| Opt 3 / Alt 1 swap | Applies. ALC 03 is the mosaic: it has the same layers as K+ Alt 1 `1687:156161` (`Band · Header / Topper · Image / Frame 15551 / Band · Footer`) |
| Missing frame | ALC has no **Opt 2** counterpart; K+ Opt 2 is `1759:76213` (Header·Hero + two Content Cards). Flag it or build it; don't use filler |
| Intro figure | **2,400,000** |
| Corners | Square everywhere (`cornerRadius = 0`), illustration details included |
| ORANGE header/footer | Hide the `KWL · Email Header/Footer · PROPOSED SLOT` instances and insert library `Header Email · 2025` / `Footer · 2025` next to them |
| Sign-off | Keep the deck line `Thank you for reading with us` until Annette confirms. Subcopy `Cheers to new bookish adventures!` |

## 1 · Renames (frame name + label text)

| Frame | Label | New name |
|---|---|---|
| `1801:97636` (01 BASELINE) | `1801:97780` | `ALC · Opt 1` |
| `1801:97797` (02 OPTION A) | `1801:97918` | `ALC · Opt 3` |
| `1801:97931` (03 OPTION B, mosaic) | `1801:98044` | `ALC · Alt 1` |
| `1801:98129` (04 ALT) | `1801:98284` | `ALC · Alt 2` |
| `1801:99410` | `1801:99551` | `ALC · Opt 1 · ORANGE` |
| `1801:99743` | `1801:99861` | `ALC · Opt 3 · ORANGE` |
| `1801:99991` | `1801:100106` | `ALC · Alt 1 · ORANGE` |
| `1801:100232` | `1801:100407` | `ALC · Alt 2 · ORANGE` |
| `1801:97500` parts frame | — | `ALC · parts (components used by the ALC frames)` |

Evidence for 02 → Opt 3: ALC 02 shares `In numbers` and `More to discover with Kobo · colour block` with K+ Opt 3 `1801:62426`, but has no Reader's card or Card ledger. It's a partial match. ALC 04 matches K+ Alt 2 `1759:71518` exactly (`01 · HERO · cream · QUIET` + `Frame 3019`).

The frames already sit left to right in K+ order, with a gap where Opt 2 would go.

## 2 · Copy fill (~226 TBC strings)

| Where | TBC | Notes |
|---|---|---|
| Red Opt 1 / Opt 3 / Alt 1 / Alt 2 | 8 / 12 / 9 / 13 | Mostly the K+-only "Beyond Kobo Plus" slots, plus `[COVER TBC]` labels |
| ORANGE ×4 | 43 / 52 / 34 / 52 | Everything is TBC |
| Parts frame | 3 | KWL footer component + cover label |

**Fastest route:** the red frames already hold the correct ALC copy. The ORANGE frames are clones with identical tree structure, so copy the text across by matching tree position. Dry-run result: every ORANGE text node matched, with zero unmatched.

Key each text node by its child-index path from the frame root. For nodes inside instances, use the outermost instance's path plus the id suffix after the first `;`. A plain index path collides on the headline and subcopy inside `Headline · SubCopy` instances.

Pairs (red → ORANGE): `97636→99410`, `97797→99743`, `97931→99991`, `98129→100232` (all prefixed `1801:`).

**Bug to avoid** (it's what killed the cloud run): walking `.parent` from a node whose id starts with `I…;` can throw "node does not exist". Skip instance sublayers early, e.g. `if (n.id.startsWith('I')) continue`, before calling any parent-walking helper.

### ALC copy (deck `COPY - ALC - EN geos`, col EN (CA))
- Subject: `Take a look back on your 2026 reading life 🗓️` · Preview: `We’re glad you spent so much time reading with us`
- Topper `YOUR 2026 READING LIFE` · Headline `Your full year, one page at a time`
- Intro `In 2026, our readers around the world finished 2,400,000 books`
- `The year at a glance` · Top %: `YOU’RE IN THE TOP 8%` / `You read more than 8% of all Kobo readers`
- `HOW IT STARTED / HOW IT ENDED` · `Check out your first and last reads of 2026`
- `Your year in eBooks`: 40 `BOOKS READ*` · 12 `KOBO AVERAGE` · 12,904 `PAGES TURNED` · 242 `HOURS READING` · `LONGEST READING STREAK` 23 `DAYS`
- Legal: `*Represents books obtained directly from Rakuten Kobo. Any eBook omnibus or series collection published as a single eBook is counted as one book.`
- `Your year in audiobooks`: 15 `BOOKS LISTENED TO` · 4 `KOBO AVERAGE` · 91 `HOURS LISTENING` · `LONGEST LISTENING STREAK` 9 `DAYS`
- `Your 2026 highlights:` · `MOST ACTIVE MONTH` October · `MOST ACTIVE DAY` June 17 · `THE KOBO THIS OR THAT? CONTEST REVEALED YOU’RE A` Plot Chaser · `MOST READ AUTHOR` Emily Henry · `TOP GENRE` Romance · `This year, you were all about love stories bursting with passion.`
- `The most read book in Canada:` (a headline, not only an eyebrow) · The Long Way Home / Louise Penny · CTA `Get it Now`
- Eyebrow `MORE TO DISCOVER WITH KOBO` (sans bold, uppercase, 8% tracking) · `Haven’t read all of the best of 2026? Your Kobo library is ready for more — start building your reading list for next year with these great picks.` · CTA `Browse Best of the Year`
- Wishlist: `Start the year strong with a book on your Wishlist. Or, add your latest discoveries to it for a future escape.` · CTA `Go to Wishlist`
- Sign-off `Thank you for reading with us` · `Cheers to new bookish adventures!`

### Still open after the fill (flag these, don't invent)
- **"Beyond Kobo Plus" slots** (red and ORANGE, all four designs) have no ALC deck row. They're the natural home for `Your year in audiobooks` if you want to repurpose them, but that's a layout call.
- **Opt 3 hero CTA** `1801:97807` has no ALC deck row.
- **No slot exists** for: Top %, How it started / How it ended, the separate eBooks/audiobooks sections, Kobo average, Pages turned, both streaks, Wishlist. In Opt 1, the layers named "There’s always your Wishlist" hold the sign-off.
- **`[COVER TBC]` labels** on the dynamic cover slots are visible. Stage real titles where known: the Canada cover is The Long Way Home.

## 3 · Hygiene pass (all 8 frames)
- `cornerRadius = 0` on every non-instance node. Rounded counts now: Opt 3 1, Alt 1 6, Alt 2 19, Opt 1·O 4, Opt 3·O 2, Alt 1·O 8, Alt 2·O 23. That includes Alt 2's topper lozenge (r=999), hero photo and genre tab.
- Rename the stale `Blue 100` / `Blue 20` layer names in Alt 2: the fills are already red.
- Straight `'` → `’`. Collapse double spaces. Remove any space before `:`. Skip text inside footer instances (`${EMAIL_ADDRESS_}` etc.).
- No visible `XXXX` or `[dynamic]`. The two `[dynamic]` nodes in Opt 1 (`1801:97726`, `1801:97744`) are already hidden.
- One bookmark per design, holding the logo lockup, or no bookmark.

## 4 · ORANGE header/footer swap
The source components come from the red instances: footer `1801:98804` → main component, header `1801:98685` → main component. In each ORANGE frame, find top-level (non-nested) instances of `KWL · Email Footer…` / `KWL · Email Header…`. Insert the library instance right after each one, set it to FILL width, then hide the KWL instance and prefix its name with `⛔ hidden · `. Frames will grow (152 → ~488); let them.

## 5 · Motion (after the copy is filled; duplicating TBCs is wasted work)
Sources already in the section: `ALC · PASS 1 · Heroes` `1880:304975`, `ALC · 05 MOTION SET · pass 1` `1880:305034`, `Book motion set · ALC · 09-23` `1880:305792`, plus the V1 stat icons in the icons section.

Use K+'s placement as the model (`1880:307481` captions): hero → one ALC hero per frame · stats → V1 stat icons (Alt 2 used V2 in K+) · beyond → ALC page-turn · highlights → flip card · sign-off → optional lockup. Frame 1 of each animation is the finished state; each fills the existing slot at its size; no layout changes.

Then build `ALC · Overview in context` as a duplicate of the ALC set with the animations placed, with a caption per frame the way K+ has. Leave the clean set untouched.

**Heads-up on the K+ Overview board:** its frame *names* changed while I was reading it (someone may be editing). Its names now match `01 · REVIEW`, but its label text still says "Opt 3" above the mosaic (x=1715). Mirror `01 · REVIEW`, not Overview.

## 6 · ALC · Opt 2 — built in cloud, text to finish in desktop
Cloned from K+ Opt 2 `1759:76213` (original untouched) → **`1948:33952`** at x=850, y=1000; placeholder label `1948:34119` (currently reads `Opt 2`, set it to `ALC · Opt 2`). Everything at x≥850 in the section moved right 750 and the section widened 750, so the red row now reads Opt 1 · Opt 2 · (02) · (03) · (04). Height 6475.

Done in cloud:
- Blue changed to ALC red on 22 fills: Blue 100 → `#BF0000`, mid blue → `#D99C9B`, Blue 20 → `#EBCDCD`, lightest → `#FCF2F2`. The topper gradient is now red.
- Square corners.
- Sign-off plus-pattern video removed from the clone (it's now flat red).
- Hero photo slot set to Red 20. The ALC hero animation goes here in the motion pass.

Text (Georgia/Trebuchet: desktop only):

| Node | Now (K+) | Set to |
|---|---|---|
| `I1948:33957;114:52436` | YOUR 2026 KOBO PLUS READING LIFE | `YOUR 2026 READING LIFE` |
| `1948:33961` | Your full year,␣␣one page… | `Your full year, one page at a time` |
| `1948:33962` | …Kobo Plus readers… 1,800,000 | `In 2026, our readers around the world finished 2,400,000 books` |
| `1948:33966` | In 2026, our␣␣Kobo Plus readers… | `In 2026, our readers around the world finished` |
| `1948:33968` | 1,800,000 | `2,400,000` |
| `I1948:33972;117:52331` | Your Kobo Plus year at a glance | `The year at a glance` |
| `1948:33982` / `33987` / `34000` / `34005` | 32 / 186 / 12 / 74 | `40` / `242` / `15` / `91` |
| `1948:34018` | The most read Kobo Plus book in Canada: | `The most read book in Canada:` |
| `I1948:34036;117:52331`, `1948:34040`, `1948:34043` | beyond Kobo Plus / 8 / 3 | K+-only slot, no ALC deck row. Set to `[TBC]` like the other frames, or use it for `Your year in audiobooks` |
| `1948:34064`, `1948:34094` | `[dynamic] ` | hide |
| `1948:34072` | June␣␣17 | `June 17` |
| `1948:34115` | Thank you for making Kobo your home… | `Thank you for reading with us` (pending Annette) |

Recolour these text fills from blue to `#BF0000` (text can't be recoloured from the cloud either): `1948:33961, 33962, 33968, 33969, 33987, 34005, 34040, 34043, 34049, 34093, 34098`.

K+ furniture still in the frame, for you to decide:
- `Kplus Arrows` images `1948:34029` / `34083`: yellow arrows by the Canada cover and Plot Chaser
- `Module · Top Genre · K+` instance `1948:34059`
- the Clara device image `1948:34056`, which sits under the lifestyle photo and isn't visible

## 7 · ALC · Opt 2 · ORANGE (built in cloud)
- A clone of `ALC · Opt 2` → **`1955:36425`** at x=4800, y=1000 in the ORANGE row. Its label is `1955:36592`; set it to `ALC · Opt 2 · ORANGE`.
- To make room, everything at x≥4800 moved right 750 and the section widened 750. Height 6475.
- Colours changed to the ORANGE palette. The mapping comes from the existing red/ORANGE pairs: `#BF0000→#CB4F11`, `#EBCDCD→#F6DCD0`, `#D99C9B→#EAB9A0`, plus `#FCF2F2/#F2CBCC→#F6DCD0` and `#650808→#6B2400`.
- **Hero imagery:** red Opt 2's hero slot shows a rendered image of `Art crop · Bookshelf · Red Light` (`1801:97501`); ORANGE Opt 2 shows `Bookshelf · Orange Dark` (`1801:97545`). Same slot size (550×508). Both are stand-ins until the ALC hero animation goes in.
- **Hero readability:** the headline and intro sit on top of the device in the art. Once the text is recoloured, check contrast and, if needed, shift the image crop in the fill settings. Don't change the layout.
- Text: use the same node map as section 6. ORANGE node ids are the red ids + 2473 in most cases (e.g. `1948:33961` → `1955:36434`), but check each one. Text fills that are blue should become `#CB4F11` here, not red.
- The other imagery (book covers, lifestyle photo, Plot Chaser illustration) doesn't depend on colourway, so it's shared with red, the same as in the existing ORANGE frames. The yellow `Kplus Arrows` are still K+ furniture.

## Heights before any of this
Opt 1 4586 · Opt 3 3632 · Alt 1 3098 · Alt 2 5435 · ORANGE: 4165 / 3318 / 2672 / 5005
