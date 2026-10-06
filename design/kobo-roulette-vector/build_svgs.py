"""Vector rebuild of ALC_stat_icon_eBooks_DEVICE_ROULETTE_LINES (YIR 2026).

A Kobo device stays put while a strip of five book covers slides right
behind it and the screen's text pages scroll in step. Geometry was measured
from the 220x158 (2x) handoff GIF; motion comes from motion.json
(see measure_motion.py). Run:  python3 build_svgs.py

Outputs (viewBox 0 0 220 158, same as the 2x GIF; scale freely):
  kobo-ebooks-roulette.svg          animated, plays once, holds the end frame
  kobo-ebooks-roulette_loop.svg     animated, loops with a 1.5 s end hold (review only)
  kobo-ebooks-roulette_end.svg      static finished frame (Figma / Illustrator)
  kobo-ebooks-roulette_start.svg    static first frame
Static renderers that ignore SMIL (Figma, Illustrator) show the end frame of
the animated files too.
"""
import json
from pathlib import Path

HERE = Path(__file__).parent
RED, PINK, DPINK, BG = "#BF0000", "#F2CBCC", "#E5999A", "#FDF6F3"
W, H = 220, 158

# ---- Measured geometry (px in the 2x canvas) --------------------------------
CARD_W, CARD_H, CARD_Y, CARD_X0, PITCH = 57, 81, 43, 3, 78.5
STROKE = 2.85
DEVICE = dict(x=65.17, y=26, w=89.66, h=126, r=11)
SCREEN = dict(x=76.5, y=37.33, w=67, h=91.84)
LINE_X0, LINE_W, LINE_W_LAST, LINE_H = 84.67, 50.66, 33.83, 5.4
LINE_Y = [47 + i * 40 / 3 for i in range(5)]
PAGE_PITCH = 70
TRAVEL = 2 * PITCH            # strip moves two cards right
PAGE_TRAVEL = 2 * PAGE_PITCH  # screen moves two pages right

# Strip slots j = -2..2, left to right (j=0 starts on the left, ends on the right).
STRIP = {-2: "mountain-dark", -1: "circle-red", 0: "mountain-light", 1: "sun-dark", 2: "mountain-red"}

n = lambda v: f"{v:.2f}".rstrip("0").rstrip(".")


def card(kind):
    solid = kind.endswith("-red")
    body = {"light": PINK, "dark": DPINK}.get(kind.split("-")[1])
    ink = PINK if solid else RED
    parts = [f'<rect width="{CARD_W}" height="{CARD_H}" rx="4" fill="{RED}"/>']
    if not solid:
        parts.append(f'<rect x="{STROKE}" y="{STROKE}" width="{n(CARD_W - 2 * STROKE)}" '
                     f'height="{n(CARD_H - 2 * STROKE)}" rx="1.4" fill="{body}"/>')
    parts.append(f'<rect x="9.8" y="10.4" width="37.4" height="5.6" fill="{ink}"/>')
    if kind.startswith("mountain"):
        parts.append(f'<path d="M7.4 60.8 24.15 27.3 32.9 41.7 39.2 31.5 50.3 60.8Z" fill="{ink}"/>')
    elif kind.startswith("circle"):
        parts.append(f'<circle cx="28.5" cy="40.5" r="14.3" fill="{ink}"/>')
    else:  # sun: half circle sitting on a baseline
        parts.append(f'<path d="M5.6 64A22.9 22.9 0 0 1 51.4 64Z" fill="{ink}"/>')
    parts.append(f'<rect x="17.55" y="68.6" width="21.9" height="3.2" fill="{ink}"/>')
    return "".join(parts)


def page(x):
    return "".join(
        f'<rect x="{n(x)}" y="{n(y)}" width="{n(LINE_W_LAST if i == 4 else LINE_W)}" height="{LINE_H}"/>'
        for i, y in enumerate(LINE_Y))


def device_open():
    d, s = DEVICE, SCREEN
    return (f'<g id="device"><rect id="device-body" x="{d["x"]}" y="{d["y"]}" width="{d["w"]}" '
            f'height="{d["h"]}" rx="{d["r"]}" fill="{RED}"/>'
            f'<rect id="device-screen" x="{s["x"]}" y="{s["y"]}" width="{s["w"]}" height="{s["h"]}" fill="{PINK}"/>')


def header(title, desc):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">'
            f'<title>{title}</title><desc>{desc}</desc>')


# ---- Static frames ------------------------------------------------------------
def static(progress, name, title):
    """progress 0 = first frame, 2 = finished frame (in card pitches)."""
    s, ps = progress * PITCH, progress * PAGE_PITCH
    cards = []
    for j, kind in STRIP.items():
        x = CARD_X0 + PITCH * j + s
        if x + CARD_W > 0 and x < W and not (x >= DEVICE["x"] and x + CARD_W <= DEVICE["x"] + DEVICE["w"]):
            side = "left" if x < W / 2 else "right"
            cards.append(f'<g id="card-{side}-{kind}" transform="translate({n(x)} {CARD_Y})">{card(kind)}</g>')
    svg = (header(title, "Kobo YIR 2026 eBooks stat icon, vector rebuild of the 220x158 2x GIF.")
           + f'<rect id="background" width="{W}" height="{H}" fill="{BG}"/>'
           + '<g id="covers">' + "".join(cards) + "</g>"
           + device_open()
           + f'<g id="screen-lines" fill="{RED}">{page(LINE_X0 + ps - (PAGE_TRAVEL if progress >= 1 else 0))}</g>'
           + "</g></svg>")
    (HERE / name).write_text(svg + "\n")


# ---- Animated -------------------------------------------------------------------
motion = json.loads((HERE / "motion.json").read_text())
fr = motion["frames"]
s0, s1 = fr[0]["s"], fr[-1]["s"]
for r in fr:  # normalise measurement bias: exactly 0 -> TRAVEL
    r["s"] = (r["s"] - s0) * TRAVEL / (s1 - s0)

# Fill hidden-card bob gaps by linear interpolation (0 at the ends).
for j in map(str, STRIP):
    known = [(i, r["bob"][j]) for i, r in enumerate(fr) if r["bob"][j] is not None]
    known = [(0, 0.0)] + known + [(len(fr) - 1, 0.0)] if j != "0" else known
    for i, r in enumerate(fr):
        if r["bob"][j] is None:
            a = max((k for k in known if k[0] <= i), key=lambda k: k[0])
            b = min((k for k in known if k[0] >= i), key=lambda k: k[0])
            r["bob"][j] = a[1] if a[0] == b[0] else a[1] + (b[1] - a[1]) * (i - a[0]) / (b[0] - a[0])
fr[-1]["bob"] = {j: 0.0 for j in fr[-1]["bob"]}

# Keyframes: first frame, every frame where the strip moves, and the end.
keys = [fr[0]] + [r for p, r in zip(fr, fr[1:]) if abs(r["s"] - p["s"]) > 0.05]


def animated(name, title, hold_ms, loop):
    total = motion["total_ms"] - 420 + hold_ms   # last GIF frame holds 420 ms
    times = [k["t"] / total for k in keys] + [1]
    kt = ";".join(n(t) if t not in (0, 1) else str(int(t)) for t in times)
    rep = 'repeatCount="indefinite"' if loop else 'fill="freeze"'
    anim = lambda vals: (f'<animateTransform attributeName="transform" type="translate" dur="{total / 1000:g}s" '
                         f'{rep} calcMode="linear" keyTimes="{kt}" values="{";".join(vals)}"/>')
    sv = [f'{n(k["s"])} 0' for k in keys] + [f"{n(TRAVEL)} 0"]
    pv = [f'{n(k["s"] * PAGE_PITCH / PITCH)} 0' for k in keys] + [f"{n(PAGE_TRAVEL)} 0"]
    cards = []
    for j, kind in STRIP.items():
        bv = [f'0 {n(k["bob"][str(j)])}' for k in keys] + ["0 0"]
        cards.append(f'<g id="cover-{kind}" transform="translate({n(CARD_X0 + PITCH * j)} {CARD_Y})">'
                     f'<g>{anim(bv)}{card(kind)}</g></g>')
    pages = "".join(page(LINE_X0 + PAGE_PITCH * k) for k in (-2, -1, 0))
    svg = (header(title, "Kobo YIR 2026 eBooks stat icon: covers roll through the device. "
                  "Vector rebuild of the 2x GIF; static renderers show the finished frame.")
           + f'<defs><clipPath id="canvas"><rect width="{W}" height="{H}"/></clipPath>'
           + f'<clipPath id="screen-clip"><rect x="{SCREEN["x"]}" y="{SCREEN["y"]}" width="{SCREEN["w"]}" height="{SCREEN["h"]}"/></clipPath></defs>'
           + f'<rect id="background" width="{W}" height="{H}" fill="{BG}"/>'
           + f'<g id="covers" clip-path="url(#canvas)"><g id="cover-strip" transform="translate({n(TRAVEL)} 0)">'
           + anim(sv) + "".join(cards) + "</g></g>"
           + device_open()
           + f'<g id="screen-lines" clip-path="url(#screen-clip)" fill="{RED}">'
           + f'<g transform="translate({n(PAGE_TRAVEL)} 0)">{anim(pv)}{pages}</g></g>'
           + "</g></svg>")
    (HERE / name).write_text(svg + "\n")


static(2, "kobo-ebooks-roulette_end.svg", "Kobo eBooks roulette, end frame")
static(0, "kobo-ebooks-roulette_start.svg", "Kobo eBooks roulette, first frame")
animated("kobo-ebooks-roulette.svg", "Kobo eBooks roulette", 420, loop=False)
animated("kobo-ebooks-roulette_loop.svg", "Kobo eBooks roulette, review loop", 1500, loop=True)
for f in sorted(HERE.glob("*.svg")):
    print(f.name, f.stat().st_size, "bytes")
