"""YIR 2026 cover carousel: shared rig + GIF renderer.

One rig, two variants (ebook, audio), two brands (kplus, alc). Brands differ
only in the three colour values in BRANDS. The After Effects build script
(ae_rig.py -> yir26-carousel-rig.jsx) reads the same numbers from here.

    python3 rig.py            # renders out/yir26-carousel-<variant>-<brand>.gif

Motion: frame 1 is the landed state. The strip (7 covers, repeated once so it
wraps seamlessly) then travels exactly one strip length with a single ease
(fast start, hard stop, no overshoot), so it lands back on the same state
and holds. Speed reads through frame spacing plus two ghost copies; no blur.
"""
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

HERE = Path(__file__).parent
OUT = HERE / "out"

# ---- Canvas / timing ----------------------------------------------------------
W, H, FPS = 560, 400, 24
HOLD_IN_F = 5                  # landed frame 1 shows ~0.2 s before the spin
MOTION_F = 60                  # 2.5 s spin
TOTAL_S = 3.75                 # everything incl. end hold (< 5 s)
EASE = (0.25, 1.0, 0.30, 1.0)  # cubic-bezier; AE: out speed 4x avg @25 %, in 0 @70 %
SIZE_BUDGET = 300 * 1024

# ---- Colour: the three brand values --------------------------------------------
BRANDS = {
    "kplus": {"FIELD": "#0A59C6", "BOOK_BASE": "#CCDCF3", "BOOK_ACCENT": "#F1C541"},
    "alc":   {"FIELD": "#BF0000", "BOOK_BASE": "#F2CBCC", "BOOK_ACCENT": "#E5999A"},
}
# Fixed neutrals (never change per brand).
WHITE, BEZEL, PAPER = "#FFFFFF", "#1B1B1B", "#DADAD5"
INK_DARK, INK_LIGHT, TRACK = "#3A3A38", "#F4F4F0", "#B4B4B0"
BAND_SHADE = 0.82              # title band = cover colour x 0.82
EINK_LO = 0.55                 # luma at/below this maps to INK_DARK, 1.0 -> INK_LIGHT

# ---- Device (static, centred) ---------------------------------------------------
DEVICE = dict(x=190, y=71, w=180, h=258, r=18)
SCREEN = dict(x=204, y=87, w=152, h=216, r=3)

# ---- Strip ------------------------------------------------------------------------
N_COVERS, PITCH = 7, 176
STRIP_LEN = N_COVERS * PITCH
SLOTS = list(range(-3, 2 * N_COVERS - 3))   # 14 slots = the 7 covers twice
X_LAND = W / 2                               # accent slot 0 centred in the screen
COVER_R = 3
BAND_TOP, BAND_H = 0.16, 0.14                # title band, fractions of cover height
GHOSTS = ((1, 0.45), (2, 0.20))              # (frames back, opacity at full speed)
GHOST_FULL_SPEED = 30                        # px/frame where ghosts reach full opacity

VARIANTS = {
    "ebook": dict(cover=(124, 186), strip_y=195),   # 2:3, centred in the screen
    "audio": dict(cover=(120, 120), strip_y=163),   # 1:1, raised for the player row
}
# Audio player row (screen UI, e-ink)
PROGRESS = dict(x=220, y=239, w=120, h=4, fill=0.38)
PLAY = dict(x=253, cy=268, w=16, h=18)
WAVE = dict(x=279, cy=268, bar_w=4, gap=4, rest=4, peaks=(12, 20, 14, 9),
            dur=0.40, stagger=0.05)


def role(slot):
    k = slot % N_COVERS
    return "BOOK_ACCENT" if k == 0 else ("WHITE" if k % 2 else "BOOK_BASE")


def rgb(h):
    h = h.lstrip("#"); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def hexc(c):
    return "#%02X%02X%02X" % tuple(int(round(v)) for v in c)


def shade(h, k=BAND_SHADE):
    return hexc([v * k for v in rgb(h)])


def eink(h):
    """E-ink tint: luma -> grey ramp between INK_DARK and INK_LIGHT."""
    r, g, b = rgb(h)
    luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    t = min(1.0, max(0.0, (luma - EINK_LO) / (1 - EINK_LO)))
    lo, hi = rgb(INK_DARK), rgb(INK_LIGHT)
    return hexc([a + (b_ - a) * t for a, b_ in zip(lo, hi)])


def bezier_y(u, p=EASE):
    if u <= 0: return 0.0
    if u >= 1: return 1.0
    x1, y1, x2, y2 = p
    bx = lambda s: 3 * (1 - s) ** 2 * s * x1 + 3 * (1 - s) * s * s * x2 + s ** 3
    lo, hi = 0.0, 1.0
    for _ in range(60):
        mid = (lo + hi) / 2
        lo, hi = (mid, hi) if bx(mid) < u else (lo, mid)
    s = (lo + hi) / 2
    return 3 * (1 - s) ** 2 * s * y1 + 3 * (1 - s) * s * s * y2 + s ** 3


def strip_x(t, fps=FPS):
    t0, T = HOLD_IN_F / FPS, MOTION_F / FPS
    return X_LAND - STRIP_LEN * bezier_y((t - t0) / T)


def landed_time():
    """First time the strip is within 0.5 px of its final position."""
    t = HOLD_IN_F / FPS
    while abs(strip_x(t) - (X_LAND - STRIP_LEN)) > 0.5: t += 1 / 240
    return t


def wave_heights(t):
    t_w = landed_time()
    hs = []
    for j, peak in enumerate(WAVE["peaks"]):
        u = (t - t_w - j * WAVE["stagger"]) / WAVE["dur"]
        bump = np.sin(np.pi * u) if 0 < u < 1 else 0.0
        hs.append(WAVE["rest"] + (peak - WAVE["rest"]) * bump)
    return hs


# ---- Rendering (4x supersampled flat shapes, box-filtered down) ---------------------
SS = 4


def draw_covers(d, colours, X, y, size, off=(0, 0), clip=(0, W)):
    w, h = size
    for slot in SLOTS:
        cx = X + slot * PITCH
        if cx + w / 2 < clip[0] or cx - w / 2 > clip[1]: continue
        x0, y0 = cx - w / 2 - off[0], y - h / 2 - off[1]
        body = colours[role(slot)]
        band = colours[role(slot) + "_band"]
        box = [v * SS for v in (x0, y0, x0 + w, y0 + h)]
        d.rounded_rectangle(box, radius=COVER_R * SS, fill=body)
        by = y0 + h * BAND_TOP
        d.rectangle([x0 * SS, by * SS, (x0 + w) * SS, (by + h * BAND_H) * SS], fill=band)


def palette(brand, tint):
    cols = {"WHITE": WHITE, **{k: v for k, v in BRANDS[brand].items() if k != "FIELD"}}
    cols.update({k + "_band": shade(v) for k, v in list(cols.items())})
    return {k: eink(v) for k, v in cols.items()} if tint else cols


def render(variant, brand, t, fps=FPS):
    V = VARIANTS[variant]
    X = strip_x(t)
    img = Image.new("RGBA", (W * SS, H * SS), BRANDS[brand]["FIELD"])
    colour = palette(brand, tint=False)
    # ghosts (behind the strip), opacity scales with speed
    speed = abs(X - strip_x(t - 1 / fps))
    for back, alpha in GHOSTS:
        a = alpha * min(1.0, speed / GHOST_FULL_SPEED)
        if a < 0.02: continue
        layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
        draw_covers(ImageDraw.Draw(layer), colour, strip_x(t - back / fps), V["strip_y"], V["cover"])
        layer.putalpha(layer.getchannel("A").point(lambda v: int(v * a)))
        img = Image.alpha_composite(img, layer)
    d = ImageDraw.Draw(img)
    draw_covers(d, colour, X, V["strip_y"], V["cover"])
    D = DEVICE
    d.rounded_rectangle([D["x"] * SS, D["y"] * SS, (D["x"] + D["w"]) * SS, (D["y"] + D["h"]) * SS],
                        radius=D["r"] * SS, fill=BEZEL)
    # screen: e-ink copy of the strip, matted to the screen shape
    S = SCREEN
    scr = Image.new("RGBA", (S["w"] * SS, S["h"] * SS), PAPER)
    sd = ImageDraw.Draw(scr)
    draw_covers(sd, palette(brand, tint=True), X, V["strip_y"], V["cover"],
                off=(S["x"], S["y"]), clip=(S["x"], S["x"] + S["w"]))
    if variant == "audio":
        rect = lambda x, y, w, h, c, r=0: sd.rounded_rectangle(
            [(x - S["x"]) * SS, (y - S["y"]) * SS, (x - S["x"] + w) * SS, (y - S["y"] + h) * SS],
            radius=r * SS, fill=c)
        P = PROGRESS
        rect(P["x"], P["y"], P["w"], P["h"], TRACK, P["h"] / 2)
        rect(P["x"], P["y"], P["w"] * P["fill"], P["h"], INK_DARK, P["h"] / 2)
        G = PLAY
        sd.polygon([((G["x"] - S["x"]) * SS, (G["cy"] - G["h"] / 2 - S["y"]) * SS),
                    ((G["x"] + G["w"] - S["x"]) * SS, (G["cy"] - S["y"]) * SS),
                    ((G["x"] - S["x"]) * SS, (G["cy"] + G["h"] / 2 - S["y"]) * SS)], fill=INK_DARK)
        Wv = WAVE
        for j, hgt in enumerate(wave_heights(t)):
            x = Wv["x"] + j * (Wv["bar_w"] + Wv["gap"])
            rect(x, Wv["cy"] - hgt / 2, Wv["bar_w"], hgt, INK_DARK, Wv["bar_w"] / 2)
    mask = Image.new("L", scr.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, scr.size[0] - 1, scr.size[1] - 1], radius=S["r"] * SS, fill=255)
    img.paste(scr, (S["x"] * SS, S["y"] * SS), mask)
    return np.asarray(img.convert("RGB").reduce(SS))


# ---- GIF export -----------------------------------------------------------------------
def frames_for(variant, brand, fps, total_s):
    n = int(round(total_s * fps))
    times = [k / fps for k in range(n)]
    frames, starts = [], []
    for k, t in enumerate(times):
        f = render(variant, brand, t, fps)
        if frames and np.array_equal(f, frames[-1]): continue   # merge holds
        frames.append(f); starts.append(t)
    cs = [int(round(t * 100)) for t in starts] + [int(round(total_s * 100))]
    return frames, [10 * (b - a) for a, b in zip(cs, cs[1:])]


def write_gif(frames, durations, path, colours):
    stack = Image.fromarray(np.concatenate(frames[:: max(1, len(frames) // 24)], axis=0))
    pal = stack.quantize(colors=colours, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    imgs = [Image.fromarray(f).quantize(palette=pal, dither=Image.Dither.NONE) for f in frames]
    raw = path.with_suffix(".raw.gif")
    imgs[0].save(raw, save_all=True, append_images=imgs[1:], duration=durations, disposal=1)  # no loop block
    subprocess.run(["gifsicle", "-O3", str(raw), "-o", str(path)], check=True)
    raw.unlink()
    return path.stat().st_size


def export(variant, brand):
    """Budget ladder from the brief: 24 fps -> 12 fps -> shorter hold -> 64 colours."""
    OUT.mkdir(exist_ok=True)
    path = OUT / f"yir26-carousel-{variant}-{brand}.gif"
    ladder = [(FPS, TOTAL_S, 256), (12, TOTAL_S, 256), (12, 3.25, 256), (12, 3.25, 64)]
    for step, (fps, total, ncol) in enumerate(ladder):
        frames, durs = frames_for(variant, brand, fps, total)
        size = write_gif(frames, durs, path, ncol)
        if size <= SIZE_BUDGET: break
    return dict(file=path.name, bytes=size, fps=fps, seconds=sum(durs) / 1000, colours=ncol,
                frames=len(frames), ladder_step=step)


if __name__ == "__main__":
    for brand in BRANDS:
        for variant in VARIANTS:
            print(export(variant, brand))
