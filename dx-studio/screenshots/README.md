# Screenshots — DX Studio property audit

Empty until Phase 1 capture runs (blocked; see [`../property-audit.md`](../property-audit.md)).

## Naming

```
{site-slug}_{viewport}_{section}.png
```

- **site-slug** — `flowers-by-fortinos`, `pane-fresco`, `flyer-{banner}` (e.g. `flyer-zehrs`)
- **viewport** — `desktop` (1440×900) or `mobile` (390×844)
- **section** — `hero`, `module-1`, `module-2`

Six files per property. Examples:

```
pane-fresco_desktop_hero.png
pane-fresco_desktop_module-1.png
pane-fresco_desktop_module-2.png
pane-fresco_mobile_hero.png
pane-fresco_mobile_module-1.png
pane-fresco_mobile_module-2.png
```

## Capture notes

- Shoot the hero **above the fold as it loads** — don't scroll-stitch it. If a carousel
  auto-rotates, capture the first slide and note the rotation in the audit row; a hero the
  user never fully reads is a hero-effectiveness finding.
- Dismiss cookie/consent interstitials before capturing, but note any that obscure the
  hero on mobile — that's a finding too.
- For an AODA score of 1–2, add a crop showing the specific failure, suffixed
  `_aoda-{issue}` (e.g. `pane-fresco_mobile_hero_aoda-contrast.png`). These crops are
  what sell the fix in the pitch session.
- Annotate nothing else. Before/after treatment belongs in Phase 2 in Figma.
