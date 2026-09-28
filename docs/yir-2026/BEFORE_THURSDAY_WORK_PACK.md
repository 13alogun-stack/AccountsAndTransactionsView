# YIR 2026 — Before-Thursday work pack

Prepared Mon 28 Sep 2026. Everything here is prep that can be applied in Figma once feedback lands Tue EOD.
Anything marked **proposal** is my suggestion, not a stakeholder decision.

## Status board

| # | Item | State | Blocked on |
|---|------|-------|------------|
| 1 | ALC reskin (red palette + ALC copy, 4 emails) | Palette done in Figma via the YIR brand ALC mode. Text recolours and ALC copy are desktop tasks (fonts). See §6–§8. | ALC copy sign-off |
| 2 | Mark every live slot in the finals | Done: 72 Dev Mode annotations on the K+ finals and 72 on the ALC finals. | – |
| 3 | Held swaps (Oct/Romance live text, Opt 2 arrow, Opt 4 blue block) | B and C built as clones in "★ SWAPS" on the K+ FINAL page. A is a desktop task. Hold until Tue EOD. | Feedback |
| 4 | Three Opt 4 bento versions | Wireframe: `opt4-bento-versions.html`. Not yet in Figma. | Tile inventory sign-off |

## 1. Live-slot checklist (mark these in the finals)

Legend: **LIVE TEXT** = merge-field text in the email body font. **LIVE COVER** = cover image pulled at send time. **STATIC IMG** = sliced image, never changes. **HW** = handwritten font, allowed only on words that never change.

| Email / module | Slot | Type | Rule to check |
|----------------|------|------|---------------|
| All | Books read count | LIVE TEXT | Never on top of an image. Solid block behind it. |
| All | Audiobooks count | LIVE TEXT | Same. Listener versions only. |
| All | Hours listened | LIVE TEXT | Same. Listener versions only. Confirm it is in the data request. |
| All | Top month ("October") | LIVE TEXT | Not HW. Label around it can be HW ("your month was"). |
| All | Top genre ("Romance") | LIVE TEXT | Not HW. Same label treatment. |
| All | Top author | LIVE TEXT | Not HW. |
| All | Covers | LIVE COVER | No animation on or behind. Drop shadow TBC by Aiden. |
| Hero (conveyor belt) | Imagery | STATIC IMG | Generic imagery, not a wall of covers. Animation OK (no live cover under it). |
| Opt 2 | Arrow near Suzanne Collins cover | STATIC IMG (animated) | Must sit beside the cover, not on or behind it. |
| Opt 3 Best Books | List covers | LIVE COVER or STATIC IMG per country | Generic list. If shadow can't be live, one image per country. |
| Opt 4 bento | "32 BOOKS" stat | LIVE TEXT on solid blue block | Block sits next to the photo, not over it. |
| Opt 4 bento | Photo tile | STATIC IMG | No text on it. |
| Bookmark corner | Rounded corner | STATIC IMG slice | Live section beside it, full-width row below. |
| This or That | Picked side | STATIC IMG (swapped) | Copy stays LIVE TEXT. |
| Canada only | Maple leaf | STATIC IMG | Canada only. No other country symbols. |

When marking in Figma, name live layers with the merge field so dev can read them off the file. **Proposal:** `{{books_count}}`, `{{audiobooks_count}}`, `{{hours_listened}}`, `{{top_month}}`, `{{top_genre}}`, `{{top_author}}`, `{{cover_1}}`…

## 2. Held swaps (ready to apply, hold until Tue EOD feedback)

### Swap A: October and Romance become live text
- Before: month and genre set in the handwritten font.
- After: month and genre are LIVE TEXT in the email body font. The handwritten font stays only on the static words around them.
- Layout note: reserve width for the longest month in every language, so the live text never wraps differently from the comp. **Proposal:** test with "September" and "Septembre" and the longest genre label.
- Same for any other slot currently in HW that changes per reader (author name, counts).

### Swap B: Opt 2 arrow moves off the cover
- Before: animated arrow sits on the Suzanne Collins cover.
- After: arrow sits beside the cover, on the background, pointing at it. Animation stays because it no longer touches the live cover.
- Check: nothing else (glow, sparkle, underline) is layered on or behind the cover.

### Swap C: Opt 4 stat on a solid blue block
- Before: "32 BOOKS" as live text on the photo.
- After: photo tile is a plain STATIC IMG. A solid blue block next to it holds the count as LIVE TEXT plus the static "BOOKS" label.
- Keep the blue block the same height as the photo so the bento row still reads as one unit.

## 3. ALC reskin (Rakuten red)

Same structure as the Kobo finals so live slots map 1:1. Only palette and copy change, like last year.

| Token | Kobo finals | ALC |
|-------|-------------|-----|
| Primary / solid stat block | Kobo blue (existing token in the file) | Rakuten red `#BF0000` |
| Primary hover / dark | existing | darker red, **proposal** `#8A0000` |
| Tint / background wash | existing | light red tint, **proposal** `#FCEBEB` |
| Text on primary | white | white (check contrast on red: `#FFFFFF` on `#BF0000` passes AA for body text) |
| Accent (HW words, arrows) | existing | keep neutral or red. Confirm against last year's ALC file. |

Per-email checklist (repeat for each of the four emails):
- [ ] Palette swapped on every fill, stroke and stat block.
- [ ] Hero imagery still generic (no cover wall).
- [ ] ALC copy applied. **Blocked:** need the ALC copy doc.
- [ ] Live slots keep the same layer names as the Kobo version.
- [ ] Solid block behind every live count (Swap C rule applies here too).

## 4. Opt 4 bento: three versions

Wireframe in `opt4-bento-versions.html` (open it in a browser). Tile inventory:

| Tile | Reader-only | Listener-only | Combined |
|------|-------------|---------------|----------|
| Photo (STATIC IMG) + solid blue stat block | Books read | Audiobooks | Books read + audiobooks |
| Hours listened (LIVE TEXT on solid) | – | ✓ | ✓ |
| Top month (LIVE TEXT) | ✓ | ✓ | ✓ |
| Top genre (LIVE TEXT) | ✓ | ✓ | ✓ |
| Top author (LIVE TEXT) + one LIVE COVER | ✓ | ✓ | ✓ |

Rules baked into the sketch: no live text over images, no animation on or behind a live cover, HW only on static labels.

## Open questions to close before Thursday
1. Aiden: can live-pulled covers carry a drop shadow? If not: shadow off, or Best Books as one image per country.
2. Which counts are actually in the data request (books, audiobooks, hours)? The sketch assumes all three.
3. ALC copy: where is it, and is it final?

## Not reachable from this session
- The original notes file (`from_ibra_0926/monday/STAKEHOLDER_REVIEW_NOTES_0928.md`) is not in this repo or Drive. The summary above is what I have.
- The Figma file for "★ YIR 2026 · ALC FINAL". Paste the link and the Figma steps (mark slots, apply swaps, reskin) can start.

## 5. Figma work done 28 Sep (file yIodoNrl7m2Wg0B1EeTtGM)

Everything below is on copies or additive, except the annotations on the K+ FINAL components. Node ids are for jumping in Figma.

**ALC FINAL page (2789:107397), frames Opt 1–4**
- YIR brand collection set to mode **ALC** on all four frames. Every node bound to a semantic token (ground/*, text/*, accent/*) flipped to red by itself.
- 58 fills/strokes that pointed straight at Kobo Blue primitives or hex blues were rebound: Blue 100 → ground/primary or text/emphasis, Blue Deep → ground/deep or text/deep, Blue 80/60/40/20 → ground/mid, mark/tone, ground/tint, ground/light, Blue 10/05 → #F9E5E5 / #FDF6F3.
- K+ device renders swapped to the red colourway from the device-art page ("Red · Mystery · Clara Colour · Home · EN", image 1474:57921): Opt 1 highlights tile 2789:107674, Opt 2 hero band I2789:108420;2312:30661 and 2789:108524, Opt 4 books tile 2789:109209 and highlights tile 2789:109250.
- Opt 4 hero image (K+ generic with plus pattern) swapped for the 2025 ALC hero image on 2789:109193/109194/109195/109200. The two 40px topper strips are now crops of that image; re-export if you want them clean.
- Opt 4 K+ "plus" ripple video in the closer hidden (2789:109339).
- Opt 3 hero: the K+ GIF (blue, headline baked in) hidden (2789:108877); the live headline text shown instead (2789:108872). Needs an ALC GIF re-export if the animated hero stays.
- Opt 2 hero: Kobo Plus lockup hidden (I2789:108420;2312:30660).

**Live slots (item 2)**
- Dev Mode annotations, category Development, on the four K+ FINAL components (2768:73129–73132) and the four ALC frames. Labels: `LIVE TEXT · {{books_count}}`, `{{hours_reading}}`, `{{audiobooks_count}}`, `{{hours_listening}}`, `{{books_beyond_kplus}}`, `{{audiobooks_beyond_kplus}}`, `{{top_month}}`, `{{top_genre}}`, `{{top_day}}`, `{{top_author}}`, `{{persona}}`, `{{country}}`, `{{country_top_title}}`, `{{country_top_author}}`, `{{global_books_finished}}` (confirm); `LIVE COVER · nothing animates on or behind it · shadow TBC`; `CATALOGUE COVER · generic per country, not personal`.

**Held swaps (item 3)** — section "★ SWAPS · ready to apply · HOLD until Tue EOD feedback" on the K+ FINAL page, node 2803:48369 at (-79171, -75800).
- Swap B: clone of Opt 2 M03 (2803:48374). Arrow moved from (358,277) to (241,128) at 85% size, so it sits between the 186 numeral and the Last Read cover, pointing at the cover without touching it.
- Swap C: clone of the Opt 4 bento (2803:48436). Books tile keeps its Blue 20 fill, image moved into a 150px static rectangle on the right (2803:48463). Text untouched.
- Swap A: desktop task (see §6). The month/genre text nodes are the ones annotated `{{top_month}}` and `{{top_genre}}`.

## 6. Desktop handoff: text the MCP could not touch

Georgia and Trebuchet MS are not loadable in the MCP runtime, so text fills, text ranges and characters must be changed in the desktop app. Fastest route: select the ALC frame → Selection colours → swap the colour for every use at once.

| Where | Nodes | Now | Change to |
|-------|-------|-----|-----------|
| ALC Opt 4, glance + highlights | 2789:109206, 109214, 109216, 109228, 109229, 109234 | Kobo Blue/Kobo Blue 100 (#0A59C6) | ground/primary (Kobo/Red/100) |
| ALC Opt 4, tiles | 2789:109210, 109211, 109246, 109252 | #12305E | #650808 (ground/deep) |
| ALC Opt 4, text on red tiles | 2789:109225, 109256, 109258, 109340 | #CEDEF4 | #EBCDCD (Kobo/Red/20) or white |
| ALC Opt 1 + Opt 2, M06 headline (mixed fills) | I2789:107659;2325:33820, I2789:108504;2325:33353 | blue range inside the text | ground/primary |
| ALC Opt 3 hero subcopy, "1,800,000 books" range | 2789:108874 | blue underline range | ground/primary |

## 7. ALC copy map (apply in desktop, same reason)

Source: the 2025-approved ALC email cloned as "R0 · 2026 Refresh · ALC · STAGED" (archive page, node 692:141405). Same strings appear in all four emails.

| K+ string | ALC string (2025 approved) |
|-----------|----------------------------|
| YOUR KOBO PLUS READING LIFE | YOUR 2026 READING LIFE |
| Our Kobo Plus readers around the world finished 1,800,000 books | Our readers around the world finished [N] books |
| Your Kobo Plus year at a glance | The year at a glance |
| The most read Kobo Plus book in Canada: | The most read book in Canada: |
| Your reading activity beyond Kobo Plus (M07) | No ALC equivalent. Last round's ALC alt replaced it with the Kobo Plus trial bridge (approved MK-19724 copy, node 770:27486; source 738:64005). Decision needed. |
| Thank you for choosing Kobo as the home of your reading life | Thank you for reading with us |

## 8. Assets still on K+ blue (need ALC versions)
- Icons: Icons Book _K+, Audiobooks_K+, Page turn_4, Ear_1 (Opt 1), GIF phones icons (Opt 4), GIF books/headphones (Opt 2 M07), heart (M10). 2025 ALC used red vector icons.
- Opt 3 hero GIF (headline baked in on blue). Re-export on Rakuten red.
- Opt 4 topper strips and Opt 2 hero band are placeholders (see §5).
- Yellow accents (topper band, doodle arrows, odometer band, Opt 4 "Most read" block) stayed yellow because they point at Kobo Yellow primitives. The ALC token mode says accent = Orange/100. 2025 ALC had no yellow at all. Decide: yellow, orange, or red.
- Facebook icon blue is the brand icon; leave it.
