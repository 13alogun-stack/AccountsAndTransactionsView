"""Kobo hook roulette GIF.

A Kobo-style e-reader whose screen spins through reading "hooks" like a
slot reel, lands on each one, holds, then spins to the next. Loops forever.

Edit HOOKS / timing below, then run:  python3 make_gif.py
Output: kobo-hook-roulette.gif next to this script.
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

# ---- Content (placeholders: swap for approved YIR copy) -------------------
HOOKS = [
    "You read 34 books this year.",
    "Your top genre: Mystery.",
    "12,480 pages turned.",
    "Longest reading streak: 21 days.",
    "Your 2026 in reading.",
]
LABEL = "YOUR YEAR IN READING"

# ---- Timing -----------------------------------------------------------------
FRAME_MS = 40          # spin frame duration (25 fps)
SPIN_FRAMES = 20       # frames per spin (0.8 s)
HOLD_MS = 1700         # pause on each landed hook
EXTRA_LOOPS = 1        # full reel passes per spin, for the roulette feel

# ---- Look -------------------------------------------------------------------
W, H = 600, 600
BG = (241, 236, 228)
BODY = (28, 28, 30)
SCREEN = (233, 231, 225)
INK = (24, 24, 24)
MUTED = (120, 118, 112)
SERIF = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
SANS = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

DEV_W, DEV_H, DEV_R = 330, 460, 30
BEZEL_X, BEZEL_TOP, BEZEL_BOT = 22, 24, 52
dev_x0, dev_y0 = (W - DEV_W) // 2, (H - DEV_H) // 2
scr = (dev_x0 + BEZEL_X, dev_y0 + BEZEL_TOP,
       dev_x0 + DEV_W - BEZEL_X, dev_y0 + DEV_H - BEZEL_BOT)
SCR_W, SCR_H = scr[2] - scr[0], scr[3] - scr[1]
SLOT_H = 150                         # height of one hook on the reel
WIN_Y = scr[1] + (SCR_H - SLOT_H) // 2 + 6
PAD = 26

serif = ImageFont.truetype(SERIF, 30)
sans = ImageFont.truetype(SANS, 11)


def wrap(text, font, max_w):
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if font.getlength(trial) <= max_w:
            line = trial
        else:
            lines.append(line)
            line = word
    lines.append(line)
    return lines


def hook_tile(text):
    tile = Image.new("RGB", (SCR_W, SLOT_H), SCREEN)
    d = ImageDraw.Draw(tile)
    lines = wrap(text, serif, SCR_W - 2 * PAD)
    lh = 38
    y = (SLOT_H - lh * len(lines)) // 2
    for ln in lines:
        x = (SCR_W - serif.getlength(ln)) / 2
        d.text((x, y), ln, font=serif, fill=INK)
        y += lh
    return tile


# Reel: all hooks stacked, doubled so the window can wrap around.
n = len(HOOKS)
reel = Image.new("RGB", (SCR_W, SLOT_H * n * 2), SCREEN)
for i in range(n * 2):
    reel.paste(hook_tile(HOOKS[i % n]), (0, i * SLOT_H))
reel_np = np.asarray(reel).astype(np.float32)
REEL_LEN = SLOT_H * n


def window_at(pos, blur_px):
    """Crop the reel at pos with vertical motion blur of blur_px."""
    samples = max(1, min(40, int(blur_px / 1.5)))
    acc = np.zeros((SLOT_H, SCR_W, 3), np.float32)
    for s in range(samples):
        off = pos - blur_px * s / samples
        y = int(round(off)) % REEL_LEN
        acc += reel_np[y:y + SLOT_H]
    return acc / samples


# Static base: background, device, screen, label.
base = Image.new("RGB", (W, H), BG)
bd = ImageDraw.Draw(base)
bd.rounded_rectangle((dev_x0 + 6, dev_y0 + 10, dev_x0 + DEV_W + 6,
                      dev_y0 + DEV_H + 10), DEV_R, fill=(222, 216, 207))
bd.rounded_rectangle((dev_x0, dev_y0, dev_x0 + DEV_W, dev_y0 + DEV_H),
                     DEV_R, fill=BODY)
bd.rectangle(scr, fill=SCREEN)
lw = sans.getlength(LABEL)
bd.text((scr[0] + (SCR_W - lw) / 2, scr[1] + 30), LABEL, font=sans,
        fill=MUTED)

# Fade mask so hooks blur in/out at the window edges.
fade = np.ones((SLOT_H, 1, 1), np.float32)
edge = 34
ramp = np.linspace(0, 1, edge, dtype=np.float32) ** 1.6
fade[:edge, 0, 0] = ramp
fade[-edge:, 0, 0] = ramp[::-1]
screen_np = np.array(SCREEN, np.float32)


def dots(img, active):
    d = ImageDraw.Draw(img)
    gap, r = 14, 3
    x0 = scr[0] + SCR_W / 2 - gap * (n - 1) / 2
    y = scr[3] - 28
    for i in range(n):
        x = x0 + i * gap
        fill = INK if i == active else (190, 187, 180)
        d.ellipse((x - r, y - r, x + r, y + r), fill=fill)


def frame(pos, blur_px, active):
    win = window_at(pos, blur_px)
    win = win * fade + screen_np * (1 - fade)
    img = base.copy()
    img.paste(Image.fromarray(win.astype(np.uint8)), (scr[0], WIN_Y))
    dots(img, active)
    return img


def ease_out_back(t, s=1.15):
    t -= 1
    return t * t * ((s + 1) * t + s) + 1


frames, durations = [], []
for i in range(n):
    start = ((i - 1) % n) * SLOT_H
    travel = (1 + EXTRA_LOOPS * n) * SLOT_H
    prev = start
    for f in range(1, SPIN_FRAMES + 1):
        p = start + travel * ease_out_back(f / SPIN_FRAMES)
        blur = abs(p - prev) * 0.9
        frames.append(frame(p, blur, i))
        durations.append(FRAME_MS)
        prev = p
    durations[-1] = HOLD_MS  # last spin frame is the landed hook

# One shared palette keeps colours stable across frames (no flicker).
pal = frames[len(frames) // 2].quantize(colors=128, dither=Image.Dither.NONE)
out = [f.quantize(palette=pal, dither=Image.Dither.NONE) for f in frames]
dest = Path(__file__).with_name("kobo-hook-roulette.gif")
out[0].save(dest, save_all=True, append_images=out[1:], duration=durations,
            loop=0, optimize=True, disposal=1)
print(f"{dest.name}: {len(out)} frames, "
      f"{sum(durations)/1000:.1f}s loop, {dest.stat().st_size/1024:.0f} KB")
