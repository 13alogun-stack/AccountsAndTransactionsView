"""Measure the card-strip motion of the YIR eBooks device-roulette GIF.

Usage: python3 measure_motion.py <ALC_stat_icon_eBooks_DEVICE_ROULETTE_LINES_220x158_2x_v3.gif>
Writes motion.json next to this script: per GIF frame, its start time (ms),
the strip travel s (px, rightward) and each card's vertical bob (px).
"""
import json, sys
from pathlib import Path
from PIL import Image, ImageSequence

PITCH, CARD_W, CARD_TOP, CARD_BOT, X0 = 78.5, 57, 43, 124, 3
BG = (253, 246, 243)
DEVICE = (63, 157)                     # columns hidden by the device body

g = Image.open(sys.argv[1])
frames, durs = [], []
for f in ImageSequence.Iterator(g):
    frames.append(f.convert("RGB")); durs.append(f.info["duration"])

cov = lambda p: max(0.0, min(1.0, (246 - p[1]) / 246))
visible = lambda x: 0 <= x < 220 and not DEVICE[0] <= x <= DEVICE[1]

def strip_mod(f, y=50):
    """Card left-edge phase (s mod PITCH) from bg/card transitions on row y."""
    row = [f.getpixel((x, y)) for x in range(220)]
    phases = []
    for x in range(1, 219):
        if not (visible(x - 1) and visible(x)): continue
        a, b = row[x - 1], row[x]
        if a == BG and b != BG: left = x + 1 - cov(b)
        elif a != BG and b == BG: left = x - 1 + cov(a) - CARD_W
        else: continue
        phases.append((left - X0) % PITCH)
    if not phases: return None
    ref = phases[0]                    # average on the circle around ref
    return (ref + sum(((p - ref + PITCH / 2) % PITCH) - PITCH / 2 for p in phases) / len(phases)) % PITCH

def bob(f, left):
    xs = [x for x in range(int(left) + 8, int(left) + 50) if visible(x)]
    if len(xs) < 3: return None
    x = xs[len(xs) // 2]
    col = [f.getpixel((x, y)) for y in range(158)]
    top = next(y + 1 - cov(col[y]) for y in range(30, 60) if col[y] != BG)
    bot = next(y + cov(col[y]) for y in range(140, 100, -1) if col[y] != BG)
    return ((top - CARD_TOP) + (bot - CARD_BOT)) / 2

out, s, t = [], 0.0, 0
for i, f in enumerate(frames):
    m = strip_mod(f)
    if m is not None:                  # unwrap: travel only increases
        s += (m - s % PITCH) % PITCH if (m - s % PITCH) % PITCH < PITCH / 2 else 0
    out.append({"f": i, "t": t, "s": round(s, 2),
                "bob": {j: (round(b, 2) if (b := bob(f, X0 + PITCH * j + s)) is not None else None)
                        for j in range(-2, 3)}})
    t += durs[i]

Path(__file__).with_name("motion.json").write_text(json.dumps({"total_ms": t, "frames": out}, indent=0))
print("total", t, "ms; final s", out[-1]["s"])
for r in out: print(r["f"], r["t"], r["s"], r["bob"])
