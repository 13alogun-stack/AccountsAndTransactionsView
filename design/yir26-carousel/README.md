# YIR 2026 · Cover carousel (vector, minimal)

| File | What |
|---|---|
| `out/yir26-carousel-{ebook,audio}-{kplus,alc}.gif` | The four deliverables, 560×400, 24 fps, play once |
| `yir26-carousel-rig.jsx` | Builds the AE project (shared rig). Run via File › Scripts › Run Script File, save as `yir26-carousel.aep` |
| `rig.py` | Single source of truth: geometry, timing, ease, colours. Renders the GIFs (`python3 rig.py`, needs Pillow, numpy, gifsicle) |
| `ae_rig.py` | Regenerates the .jsx from `rig.py` |

**Rig.** 7 covers (accent, then white / BOOK_BASE alternating), repeated once for a seamless wrap, all on `STRIP_CTRL`; only its X is keyframed. The strip travels exactly one strip length, so frame 1 and the landed end state are identical. `EINK_STRIP` is the duplicate, alpha-matted to `SCREEN_MATTE` and tinted to e-ink greys by expression (luma ramp), so covers turn digital inside the screen. Ghosts are two copies trailing 1 and 2 frames, opacity scaled by speed.

**Ease.** Single bezier, fast start and hard stop, no overshoot: key 1 out speed 4× average at 25 % influence, key 2 in speed 0 at 70 % (cubic-bezier 0.25, 1, 0.3, 1).

**Brand swap.** Only the three colour controls on `_CONTROLS › CONTROLS` change:

| | FIELD | BOOK_BASE | BOOK_ACCENT |
|---|---|---|---|
| K+ | `#0A59C6` Blue 100 | `#CCDCF3` Blue 20 | `#F1C541` Yellow 80 |
| ALC | `#BF0000` Red 100 | `#F2CBCC` Red 020 | `#E5999A` Red 040 |

Blue 20, Red 020 and Red 040 were sampled from the existing YIR handoff GIFs; confirm against the Figma variables.
