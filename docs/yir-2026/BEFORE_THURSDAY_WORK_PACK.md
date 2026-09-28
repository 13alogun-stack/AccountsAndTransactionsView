# YIR 2026 — Before-Thursday work pack

Prepared Mon 28 Sep 2026. Everything here is prep that can be applied in Figma once feedback lands Tue EOD.
Anything marked **proposal** is my suggestion, not a stakeholder decision.

## Status board

| # | Item | State | Blocked on |
|---|------|-------|------------|
| 1 | ALC reskin (red palette + ALC copy, 4 emails) | Palette map ready below. Copy not applied. | Figma link to "★ YIR 2026 · ALC FINAL"; the ALC copy doc |
| 2 | Mark every live slot in the finals | Checklist ready below. Not yet marked in Figma. | Figma link |
| 3 | Held swaps (Oct/Romance live text, Opt 2 arrow, Opt 4 blue block) | Specs ready below. Hold until Tue EOD feedback. | Figma link |
| 4 | Three Opt 4 bento versions | Wireframe sketched: `opt4-bento-versions.html` | Real Opt 4 tile inventory to confirm |

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
