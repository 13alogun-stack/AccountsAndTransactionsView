# SHN — Final QA Pass Log

**File:** `CyaiHbcORLBfjim5AeylIR` · **Date:** 2026-10-10 · **Run by:** Claude (Ibra's Figma session)
**Status:** 3 of 4 sections complete. Section 1 (comments) is blocked on access — see below.

---

## 0. Scope & method

**What was audited — the launch pages as dev would build them:**
`📄 SHN Pages` ▸ `⑦ Page Proofs` holds 9 `COMPONENT_SET`s, each with exactly one Desktop (1440w)
and one Mobile (414w) variant. **18 full-page frames, ~123,000px of stacked content, 1,766 text layers.**

| Page | Set ID | Desktop | Mobile |
|---|---|---|---|
| Home | `4818:239439` | 1440×9045 | 414×10916 |
| Life Sciences | `4818:239443` | 1440×8613 | 414×11259 |
| Provider Programs | `4818:239442` | 1440×7868 | 414×10197 |
| Patient Journey | `4818:239441` | 1440×6950 | 414×7638 |
| About | `4818:239438` | 1440×7583 | 414×9467 |
| Contact | `4818:239440` | 1440×3304 | 414×4149 |
| Our Model | `4818:239437` | 1440×4459 | 414×5409 |
| Careers D1 | `4818:239436` | 1440×3082 | 414×4083 |
| Careers D2 | `4818:239435` | 1440×4419 | 414×5613 |

`Responsive Pass 2.0` (8 bands, ~234 frames, 121,000px wide) is the **working/build lane**, not the proof.
QA ran against Page Proofs. If the two have drifted, Page Proofs is what this log describes.

**Method:** every diff and audit was computed programmatically via the Figma Plugin API
(text extraction, bounds maths, fill/style binding checks) rather than by eye. Candidate defects were
then re-verified individually before any change — which matters, because **most first-pass defect hits
were false positives** (see §3.2).

---

## 1. Comment sweep — ⛔ BLOCKED, no data

**I could not read a single comment.** Figma exposes comments **only** through the REST API
(`GET /v1/files/:file_key/comments`). The Figma MCP server in this session has no comment tool, and the
Plugin API — which everything else here ran on — has no comment surface at all. There is no workaround
from inside the file.

**To unblock (≈2 min):** Figma → Settings → Security → Personal access tokens → generate one with
scope `file_comments:read`, then paste it into the session. I can then produce the full table:
page · frame · author · request · resolved-state · timestamp, for every open thread from Veronika,
Phil, Amir, Shashi and Annette — and group them the same way as §2 so they're resolvable in one pass.

Nothing else in this log depends on it.

---

## 2. Desktop ↔ mobile copy diffs — for Annette

**No copy was changed anywhere in this pass.** Logged only.

**Noise filtered out:** the six nav links (`Our Model`, `Life Sciences Partners`, `Providers`,
`Patients & Caregivers`, `Support`, `Sign In`) read as "desktop-only" on every page because mobile
collapses them into a hamburger overlay. That's structural, not a copy mismatch. Excluded throughout.

**On "which looks newer":** Figma's API exposes **no per-layer modified timestamp**, so this cannot be
read from the file. Each call below is inference from content signals (specificity, placeholder text,
SHN-grounded vs. generic template copy) and is labelled with its reason. Where there is no honest
signal, it says so.

### 2A. Whole sections where desktop and mobile carry different copy — decide these first

**1. Home ▸ Home Proof Band — two completely different casts of testimonials.** *(biggest single find)*

| | Desktop | Mobile |
|---|---|---|
| People | Dr. Sarah Mitchell · Marcus Thompson, PharmD · Elena Reyes · James Kowalski · Cindy Lau, Pharmacist · Carol Watkins, RN · David Chen · Robert Okafor | Therapist Rachel Kim · Dr. Emily Torres · Pharmacist James Lee · Nurse Sarah Patel · Dr. Michael Adams |
| Audience labels | Specialty Pharmacists · Practice Managers · Case Managers · Health Plan Directors | Therapists · Pharmacy · Nursing Staff |
| Sample quote | "SHN's prior authorization support has cut our approval times dramatically. Our patients start treatment sooner…" | "Integrating evidence-based practices, our therapists focus on empowering patients through rehabilitative care and education." |

**Desktop looks newer.** Its quotes name real SHN mechanics (prior authorisation, specialty enrolment,
specialty spend) and its audience labels match the site's audience architecture. Mobile's read as
generic healthcare template copy with no SHN specifics. → Mobile almost certainly needs desktop's set.

**2. Life Sciences ▸ Therapeutic Areas — mobile has no content, only photo placeholders.**

- **Desktop:** 6 therapeutic areas with body copy — Allergy & Immunology, Endocrinology, Rheumatology,
  Hematology, Respirology (+ one more).
- **Mobile:** none of those. Instead 4 literal placeholder strings: `PHOTO: Mother & newborn moment`,
  `PHOTO: Family hands together`, `PHOTO: Elder patient & specialist`, `PHOTO: Patient close-up, soft light`.

**Desktop is newer; mobile is unbuilt.** This section is also structurally broken on mobile (§3.2) —
body copy 737px wide inside 305px cards. **Not a copy fix — this section needs rebuilding.**

**3. Careers D1 ▸ Core Values — fully rewritten, and here *mobile* is the better draft.**

| | Desktop | Mobile |
|---|---|---|
| Intro | "We are dedicated to the health of all Canadians. Our values guide our decision making and empower us to deliver an amazing customer experience while achieving sustainable results." | "Our values aren't just words on a wall - they are the principles that guide our decisions every single day." |
| Care | "We take great care in the work we do and how we do it." | "Our care for others is what defines us. We go above and beyond for our patients and for each other." |
| Ownership | "We take on each day with accountability and commitment." | "We take responsibility for our actions and our results. We are entrepreneurs who act on behalf of the whole company." |
| Respect | "Every day we act with integrity, respect and openness." | "We believe in the dignity of every person and the value of every voice. We foster a culture of inclusivity and trust." |
| Excellence | "We are leaders because we put excellence in our values." | "We strive to be the best in everything we do. We are committed to clinical quality and operational precision." |

**Mobile looks newer** — SHN-specific ("clinical quality and operational precision", "for our patients"),
where desktop reads as inherited Loblaw corporate boilerplate. **Note this is the opposite direction to
Home** — so there is no blanket "desktop wins" rule. Each section needs its own call.
*(Mobile intro uses a hyphen `-` where an em dash is probably intended.)*

**4. Contact ▸ Page End — different paragraphs entirely.**
- Desktop: "Care by Design™ and TherapyLink™ connect the people, services, and context surrounding specialty care—helping every interaction build on the one before it."
- Mobile: "Every specialty care experience starts somewhere. Tell us what you need, and we'll help connect you with the right support."

No reliable newness signal — both are finished copy. **Needs Annette's call.**

**5. Home ▸ TherapyLink gradient region — different headings and body.**

| | Desktop | Mobile |
|---|---|---|
| Heading | "we hold the view" | "How We Hold the View" |
| Body | "Whether you're a healthcare provider, life sciences partner, or part of the broader care network, TherapyLink™ helps connect the context surrounding specialty care—making coordinat[ion]…" | "When people have better context, coordination becomes easier. Decisions happen with greater confidence. Fewer details are left to memory, follow-up, or chance." |
| Desktop-only block | "The work gets distributed" · "Every step belongs to someone, but no one owns the experience." · "The person beyond the data" · contact-card data (Dr. Lila T. Johnson, Emma Thompson, E Smith, Lucy Carter) | — |
| Mobile-only | carousel counter "1/3" | — |

Root cause is structural: these are **two separately hand-built frames, not one responsive component** (§4).
That is why they drift. Fixing the component is the durable fix; fixing the copy alone will drift again.

**6. About ▸ Team — desktop names 12 people individually, mobile groups them into accordions.**
- Desktop: Mary Barbieri, Sheryl Pace, Catherine Fitzsimon, Josh Brott, Sarah Michalowicz, Sheeba Akram,
  Cathy Armes, Rhonda Giberovitch, Josephine Kwong, Matt Simioni (+ titles), "Healthcare Businesses".
- Mobile: "The rest of the team", "Expand all", and four group headings — Leadership · Clinical & Nursing ·
  Operations & Strategy · Specialty Programs.

This reads as a deliberate responsive pattern, **but it means mobile users never see the individual names
and titles.** Content-parity decision, not a copy error. *(Also: `Josephine Kwong` has no title on desktop
while every other name does — likely a genuine omission.)*

### 2B. Same section, small wording / punctuation deltas

| Page | Section | Desktop | Mobile | Call |
|---|---|---|---|---|
| About | Our Mission | `People experience care— not prescriptions.` | `People experience care—not prescriptions.` | Space after em dash. Mobile is typographically correct. |
| Home | TherapyLink CTA | `Learn more →` | `Learn More` | Case + missing arrow. Desktop matches the CTA pattern used elsewhere. |
| Life Sciences | Therapeutic Areas CTA | — | `Learn more  →` | **Double space** before the arrow on mobile. |
| Life Sciences | Case Studies | `Pfizer: Cutting time-to-therapy by 40%` | same, hard-wrapped + **an extra body paragraph desktop does not have** ("A specialty manufacturer partnered with SHN to streamline prior authorizations and benefit verification—getting patients on therapy faster and cutting abandonment at the pharmacy") | Mobile is richer here. Desktop may be missing this paragraph. |
| Patient Journey | Coordinated Care Model | `Nurse ` / `Patient Care Specialist  ` | no trailing space | Trailing whitespace on desktop (1 and 2 spaces). |
| Careers D2 | Page End | `Learn more about TherapyLink™ ` | *absent* | CTA missing on mobile (+ trailing space on desktop). |
| About | Our History | `2` + `/ 5` as two layers | `2 / 5` one layer | Not copy — but desktop hardcodes the index `2`. |

### 2C. Placeholder / unfinished copy still in the file

| Page | Variant | String | Note |
|---|---|---|---|
| Home | Desktop | `EYEBROW LABEL` | Unfilled placeholder, live in the TherapyLink region. |
| Home | Desktop | `Figures reflect SHN's national network — placeholder values pending final confirmation.` | Stats not yet signed off. |
| Life Sciences | Mobile | `PHOTO: …` ×4 | See 2A-2. |
| Home | Both | `INFO BANNERINFO BANNERINFO BANNERINFO BA…` | Repeated filler string in the Info Banner, set to truncate. |
| Life Sciences | Desktop | "These treatments often require precise timing, and cold-chain handling. **Our distributions handles exactly that.**" | Grammar error (Hematology card). Flagged, **not** corrected — copy is Annette's. |

---

## 3. Fixes made

### 3.1 Changes applied (2)

Both are **instance-level overrides**. Neither edits a shared master, so nothing propagates to other
usages — this was the deliberate choice given the "check every usage before editing a shared component"
rule. Both verified before and after; copy byte-identical in both cases (asserted programmatically).

**Fix 1 — Life Sciences (Desktop): accent heading clipped by its own container**
- Node: `Heading Block` `I4581:128561;4572:21522;4569:15704` (648×138, inside `SHN / Molecule / Section Intro`)
- Defect: `clipsContent: true` cut ~2px off the descender of the italic accent line "one-size-fits-all."
- Change: `clipsContent` **true → false**. No geometry moved.
- Evidence: property change confirmed; screenshots captured at 2× before and after. **Honest note:** the
  clip was 2px, so the two screenshots are near-identical to the eye — the evidence here is the property,
  not a visible difference. Low value, zero risk.
- Root cause is in the `Section Intro` molecule; this only patches the Life Sciences instance. → §4.

**Fix 2 — About (Mobile): job title truncated mid-word**
- Node: `copy.label.role` `I4638:135201;…;4832:117454` — "Senior Vice President, Healthcare Businesses"
- Defect: text 311px wide, non-wrapping (`WIDTH_AND_HEIGHT`), inside `Quote Row` 294px with
  `clipsContent: true` → rendered as **"…Healthcare Business"**, final "es" cut off. Visible defect.
- Change: `Quote Attribution` and `copy.label.role` set to `layoutSizingHorizontal = FILL`;
  `textAutoResize = HEIGHT`. Result 294×42 — wraps cleanly to two lines, full title visible.
- Evidence: screenshots before/after at 2×; `role.characters` asserted unchanged.
- **First approach failed:** `resize(294, …)` was silently reverted to 311 by the hugging auto-layout
  parent. Switched from resizing the text node to re-sizing the container chain with FILL. *(Logged per
  the "switch approach after a failure" rule.)*

### 3.2 Deliberately NOT fixed — first-pass hits that verification disproved

Recording these so nobody re-runs the same scan and "fixes" them:

| Reported | Verdict |
|---|---|
| ~40 "empty" image frames (`Image`, `Card Photo`, `Photo Frame`, `Image Panel`, `SHN / Image / …`) | **False positive.** All carry `IMAGE` fills with valid `imageHash`. Images are present; the frames just have no *children*. |
| Home Proof Band "overflow" up to 2,256px | **Intentional carousel.** `Row` is 5,952px wide, 9 children, inside an `Overflow Hidden` frame. |
| About Our History "clipped" milestones (168/612/1,056/1,500px) | **Intentional carousel.** `Carousel Track` 2,815px in a 616px window — matches the on-screen "2 / 5" counter. |
| Life Sciences Therapeutic Areas card offsets | **Intentional carousel.** |
| `Decorative Divider` overflowing 259px on 5 mobile pages | **Not a visible defect** — its parent `Page End` (414w) has `clipsContent: true`, so the overflow is clipped and invisible. Real problem is hygiene, logged in §4 instead. Resizing it would have changed the visible crop of a decorative element — i.e. a design change, not a QA fix. |

### 3.3 Real defects found but deliberately left alone — they need a design decision, not a patch

| Page(s) | Defect | Why not auto-fixed |
|---|---|---|
| Life Sciences (Mobile) | Therapeutic Areas: body copy **737px wide inside 305px cards** (clipped ~60%); `Learn more` CTAs clipped 27–75px; absolute positioning (`layoutMode: NONE`) throughout; photo placeholders instead of content | Section is **unbuilt**, not misaligned. Patching widths would disguise an incomplete section. Needs a rebuild. |
| Patients (Mobile), Providers (Mobile) | `Tabs` row is **612px wide inside a 374px clipping panel** — tab 1 clipped 16px, tabs 2–3 entirely off-screen | Fix is stack-vs-scroll — a responsive design decision, not a mechanical one. |
| Contact, Providers, Patients, Life Sciences (Mobile) | `Tab List` master (`Version=Version3`) is **570px wide**, used inside 414px pages; labels "Patients & Caregivers" / "Providers" clipped 70px / 166px | Master is desktop-sized. Needs a mobile variant — a library change affecting 4 pages. |
| Contact (Mobile) | `inst.FAQ` has **negative itemSpacing (-48)** — children overlap by design or by accident | Can't tell intent from structure alone. |

---

## 4. Component & token flags

### 4.1 Structure — the real dev-readiness risks

**a) Three different nav components across 8 pages.**

| Component | Pages |
|---|---|
| `SHN / Global / Nav` | Life Sciences, Providers, Patients, Careers D1, Careers D2 |
| `Nav` | About, Our Model |
| `inst.Nav` | Contact |
| *(none at page level — nav is nested **inside** the Hero)* | **Home** |

Home nesting its nav inside `SHN / Section / Hero / Standard` is the odd one out and will bite dev.

**b) Contact uses a completely different naming convention.** Every section is `inst.*`
(`inst.SubHero`, `inst.ContactForm`, `inst.FAQ`, `inst.PageEnd`, `inst.Nav`) while all other pages use
`SHN / Section / …`. Either rename Contact or document the exception.

**c) Home's TherapyLink region is not a component on either breakpoint.**
`FRAME: gradient region (Audience Pathways ▸ TherapyLink)` (desktop) and
`FRAME: gradient region mobile (Audience ▸ TherapyLink)` (mobile) are two independent hand-built frames.
**This is the root cause of copy diff 2A-5, and it carries 212 of the file's unbound colour fills (§4.2).**
Highest-value component work in the file.

**d) Detached instances.**

| Page / variant | Detached node |
|---|---|
| Home (Mobile) | `component.Integrated care model / TherapyLink` |
| Life Sciences, Providers, Patients, Careers D1 — **Desktop** | `component.State 1 / 7` |
| Life Sciences, Providers, Patients, Careers D1 — **Mobile** | `component.State 1 / 6` |
| About (Desktop + Mobile) | `FRAME: Content Group` at page level |

The `State 1 / 7` vs `State 1 / 6` split means the Timed Accordion has **7 states on desktop but 6 on
mobile** — a content-parity gap worth confirming, independent of the detachment.

**e) `Decorative Divider` is badly scaled.** Instance is **932×1313** from a **720×634** master — stretched
~1.3× horizontally and ~2.1× vertically, then clipped to 414px by `Page End`. Used on 5 mobile pages.
Dev would export a 932px asset for a 414px slot. Master is also poorly named: variant **`variant=41`**
on a page called **`Component 1`**.

**f) `Card Photo` frames carry two IMAGE fills, one hidden.** A hidden alternate image sits underneath the
visible one. Harmless in Figma, but a handoff trap — worth purging before dev export.

### 4.2 Hardcoded colours (no variable binding, no style)

**Highest leverage — 3 unbound fills appear on all 18 frames**, from the Info Banner / Language Toggle
components: `#e03127` (×2, `Vector`), `#f0f0f5` (`Language Toggle`), `#333340` (`FR`).
**Binding these in the source components clears 54 instances across the whole file in one edit.**

**Worst single offender — Home's hand-built TherapyLink region: ~212 unbound fills** (106 per variant):

| Hex | Count (per variant) | On |
|---|---|---|
| `#77b2ff` | 58 | `Icon`, `Divider` |
| `#73bbff` | 28 | `Icon` |
| `#0068ff` | 8 | `Graphic`, `Icon` |
| `#7800ff` | 8 | `Graphic`, `Icon` |
| `#2058d6` | 4 | `Graphic`, `Icon` |

**Token drift — Patients eyebrows use four near-identical teals:** `#216b8c`, `#1e6c8c`, `#173b4a`,
`#99cce5`. `#216b8c` and `#1e6c8c` differ by 3/255 on two channels — almost certainly meant to be one token.

**Other unbound one-offs:** Providers `#4b9fe5` (×4, `copy.eyebrow`/`copy.label`) · Life Sciences `#0b2d4e`,
`#c8d7e6`, `#1e466e` · About `#161616` (`copy.body`), `#6cb8e3` (`copy.cta`, mobile only), `#ebf7fc`,
`#b3b7c5` · Patients mobile `#dce3ea` (×5, carousel dots) · Home mobile `#f1f8fe`, `#525a66`.

### 4.3 Unstyled type

**421 of 1,766 text layers (23.8%) have no text style applied.** Worst first:

| Page | Desktop | Mobile |
|---|---|---|
| **Home** | **63/156 (40%)** | **62/141 (44%)** |
| **Contact** | **23/68 (34%)** | **25/60 (42%)** |
| **Our Model** | 17/64 (27%) | 20/56 (36%) |
| Life Sciences | 27/158 (17%) | 32/152 (21%) |
| Providers | 23/125 (18%) | 25/117 (21%) |
| About | 17/144 (12%) | 23/112 (21%) |
| Patients | 16/111 (14%) | 18/99 (18%) |
| Careers D1 | 7/50 (14%) | 8/42 (19%) |
| Careers D2 | 7/60 (12%) | 8/51 (16%) |

Mobile is consistently worse than desktop on every single page — the mobile build skipped styles.
Home and Contact are the two to fix first.

---

## 5. Top 5 — needs a decision from Ibra

**1. Home Proof Band: which testimonial cast ships?**
Desktop has 8 SHN-specific testimonials; mobile has 5 generic template ones. They share nothing.
*Recommendation: desktop's set, ported to mobile.* Blocks dev on the highest-traffic page.

**2. Life Sciences ▸ Therapeutic Areas (mobile) is unbuilt — rebuild or cut for launch?**
Desktop has 6 areas with copy; mobile has 4 photo placeholders, absolutely-positioned cards, and body
copy clipped to ~40%. This is the single largest piece of outstanding build work found.

**3. Careers D1 Core Values: desktop or mobile wording?**
Completely different drafts. Mobile reads as the newer, better, SHN-specific one — which is the
**opposite** direction to Home, so this needs an explicit call rather than a blanket rule.

**4. Mobile tab rails: stack or scroll?**
`Tab List` (570px master) and the `Tabs` row (612px) both exceed the 414px mobile frame across 4 pages,
clipping real labels. One decision fixes all four. Also determines whether `Tab List` needs a mobile variant.

**5. Nav consolidation before handoff — 3 components + 1 nested-in-hero.**
`SHN / Global / Nav` vs `Nav` vs `inst.Nav`, with Home's nav living inside its Hero. Cheap to fix now,
expensive once dev has built against it.

**Still outstanding:** the comment sweep (§1) — one Figma token away.

---

*Generated by [Claude Code](https://claude.ai/code)*
