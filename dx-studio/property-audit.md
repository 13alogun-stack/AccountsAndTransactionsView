# DX Studio — Digital Property Audit (Phase 1)

**Owner:** Ibra · **Stakeholder:** Brittany · **Pitch sessions:** Shashi
**Goal:** lock Q1 project work. Component-level upgrades on Loblaw non-e-com properties, pitched like an agency — a hero, a key module, AODA fixes. Not site rebuilds.

**Status: scaffolding only. No site has been audited yet.** See [Blockers](#blockers).

---

## Blockers

1. **No network access to the live sites from this session.** The cloud environment's
   network policy denies outbound connections (403 on CONNECT, even for `example.com`;
   no external DNS). `fortinos.ca`, `panefresco.ca`, `flowersbyfortinos.ca` and
   `loblaws.ca` are all unreachable. Fix: environment settings → cloud environment menu
   in the session title bar → Edit → Network access. Either raise the access level, or
   add the property domains under **Allowed domains** (leave *Allow package managers*
   ticked). Steps: https://code.claude.com/docs/en/cloud-environments#network-access
2. **Property list link is missing** — the brief says "full list = Brittany's digital
   property list, `[paste link]`" and the placeholder was never filled.
3. **Banner flyer-hosting sites are unnamed.** The brief refers to "the affiliated flyer
   pages Brittany showed." Need the actual URLs.

**Recommendation:** run Phase 1 from a **Claude in Chrome** session on a local machine
rather than unblocking this container. Claude in Chrome renders in a real browser with
real fonts, real ad/consent interstitials and a real mobile emulation path, which is what
a visual-currency audit needs. A headless container screenshot will under-report exactly
the things being scored. Chrome also isn't available in this session's toolset, so this
container can't do it either way.

---

## Scoring rubric

Five criteria, each **1–5**. Anchors are defined so scores mean the same thing across
sites and across whoever runs the audit — the pitch has to survive "why is this a 2?"

### 1. Visual currency
*Does it look like it was designed this decade?*
- **1** — Visibly dated: pre-2015 patterns, stock-photo clip art, gradient/bevel chrome, centered 960px fixed layout, system-font body copy.
- **3** — Clean but generic: template-default spacing and type scale, nothing wrong, nothing considered. No brand expression beyond the logo.
- **5** — Current and intentional: deliberate type scale, modern spacing rhythm, photography that looks commissioned, brand expressed in the layout itself.

### 2. Hero effectiveness
*Does the top of the page tell you where you are and what to do?*
- **1** — No clear value proposition, no primary CTA, or a carousel that auto-rotates past the message.
- **3** — Message is present but buried, competing CTAs, or hero is decorative only and the real entry point is below the fold.
- **5** — One clear message, one obvious primary action, visible without scrolling on both viewports.

### 3. Mobile quality
*Was mobile designed, or just allowed to happen?*
- **1** — Horizontal scroll, desktop layout squeezed, text under 14px, nav unusable or hidden behind a broken toggle.
- **3** — Reflows correctly but is a stacked desktop layout: unoptimized image weight, awkward whitespace, hero crops badly.
- **5** — Mobile-considered: art direction that survives the crop, thumb-reachable actions, appropriate image payload.

### 4. AODA basics
*WCAG 2.0 AA, the four things that fail most often.* Score the **worst** of the four,
then note which one drove it.
- **Contrast** — body text ≥ 4.5:1, large text ≥ 3:1. Watch text-over-photo heroes.
- **Alt text** — meaningful images described, decorative ones empty-alt, no `alt="image"`/filename alt.
- **Focus states** — visible keyboard focus on every interactive element; tab order follows reading order.
- **Tap targets** — ≥ 44×44px, not crowded.
- **1** — Multiple clear AA failures, including one that blocks a task (unusable keyboard nav, illegible CTA).
- **3** — Passes on the obvious elements, fails in a contained area (one module, the footer, a form).
- **5** — No AA failures found in the audited area.

> AODA findings are the easiest part of a pitch to sell — they are a compliance
> obligation, not a taste argument. Log the specific failure and the element, not a
> general impression.

### 5. Broken or odd treatments
*What's actually wrong on the page right now?*
- **1** — Broken: stretched or missing images, overlapping text, 404'd assets, placeholder copy in production, layout collapse.
- **3** — Odd but functional: inconsistent corner radii/shadows, mismatched button styles, two type systems fighting, stale seasonal content.
- **5** — Consistent and clean, nothing out of place.

### Effort sizing
Scope is **one component**, not a page or a site.
- **S** — Restyle within the existing component: type, color, spacing, alt text, focus states, contrast. No new assets, no new content, no CMS change.
- **M** — Rebuild one component: new layout, art direction or responsive behaviour. May need one new asset or a content field.
- **L** — Touches the template, the CMS model, or more than one component. **Out of scope for a Q1 pitch** — if the answer is L, pick a smaller component.

---

## Audit table

One row per property. Scores 1–5 per the rubric above.

| Site | Visual currency | Hero | Mobile | AODA | Broken/odd | Top component to upgrade | Why (one line) | Effort |
|---|---|---|---|---|---|---|---|---|
| Flowers by Fortinos | — | — | — | — | — | — | — | — |
| Pane Fresco | — | — | — | — | — | — | — | — |
| Banner flyer page (TBD) | — | — | — | — | — | — | — | — |
| *(add from property list)* | | | | | | | | |

**Known qualitative note to verify:** Brittany flagged Pane Fresco as content-updated-often
but never visually refreshed — i.e. expect a low visual-currency score against healthy
content freshness. That combination is the strongest possible pitch shape: the client is
already investing in the property, so the upgrade protects spend they're already making.

---

## Pitch candidate ranking

Rank on **sellability**, not on worst score. A property that is merely ugly is a weak
pitch; a property with one visible, cheap, defensible fix is a strong one.

Weigh three things:
1. **Gap size** — how far the lowest-scoring criterion is from a 4.
2. **Visibility** — is the weak component above the fold, on the page everyone lands on?
3. **Fix smallness** — S beats M. An L disqualifies the candidate; re-scope to a smaller component.

An AODA failure in a visible component is the highest-value shape available: small fix,
visible result, and it lands as risk reduction rather than as a redesign opinion.

**Top 3 (pending audit):**

1. TBD
2. TBD
3. TBD

Ibra picks from these three; Phase 2 mocks up the chosen component for 2 sites.

---

## How to run Phase 1

For each property:

1. **Capture** the homepage hero and the first two modules below it, at both viewports.
   - Desktop **1440×900**, mobile **390×844**.
   - Save to `screenshots/` using the convention in [`screenshots/README.md`](screenshots/README.md).
2. **Score** all five criteria. Note the specific element behind any score of 1–2 — the
   note is what goes in the pitch, the number is just the sort key.
3. **Name one component** to upgrade, with a one-line why framed as a business outcome,
   and size it S/M/L.
4. **Fill a row** in the audit table.

### Rules
- **Read-only on live sites.** No form submits, no logins, no account creation.
- **If a site blocks screenshots twice, log it in the table and move on.** Don't spend a
  third attempt.
- Stay inside each banner's existing brand. Phase 2 is an evolution, not a rebrand.

### Not in scope now
- E-com motion service pitch — Shashi is running those with SDM, PCX and PCO creative leads.
- "Wrapped"-style customer recap concept — separate doc later.

**Stop after Phase 1 and report back.**
