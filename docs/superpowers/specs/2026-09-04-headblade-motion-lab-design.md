# HeadBlade Germany — MOTION LAB Design

**Date:** 2026-09-04  
**Status:** DESIGN DIRECTION APPROVED — WRITTEN SPEC AWAITING USER REVIEW  
**Project:** `HEADBLADE_DE_2026`  
**Target:** isolated owner-review preview first; production `https://www.headblade.info/`, DNS and live commerce remain untouched until a separate owner gate.  
**Supersedes visually:** `docs/superpowers/specs/2026-09-04-headblade-contour-system-design.md`. The Contour System information architecture, product decision logic, accessibility/security boundaries and Astro/Cloudflare engineering foundation remain valid where this document does not replace them.

## 1. Decision

The current HeadBlade Germany experience must stop resembling the HSB-Boden visual language. HSB remains a reference only for engineering discipline, safety gates, CI quality and operational rigor — not for typography, palette, hero composition, section rhythm, cards or brand expression.

The approved visual/product direction is internally named **MOTION LAB**. This internal label is not public-facing branding. The public identity remains **HeadBlade Germany**.

MOTION LAB is a product-design-led ecommerce experience derived from HeadBlade itself: the MOTO finger ring, compact hand-led form, pivot/suspension behavior, scalp contour and the relationship between razor, blade and care routine.

The desired perception is:

- specialist head-shaving brand, not generic grooming retailer;
- engineered but human, not industrial;
- premium but accessible, not luxury theatre;
- clear product guidance, not catalog density;
- contemporary DTC, not HSB-style dark/red corporate design;
- real product evidence, not decorative mock-product imagery.

## 2. Hard boundaries

Until explicit production approval:

- no changes to `headblade.info`, DNS or production traffic;
- no active cart, checkout, payment, order, account or customer-data collection;
- no production analytics, advertising or consent persistence;
- no invented reviews, ratings, stock, shipping promises, guarantees or legal claims;
- no competitor creative copied into the site;
- no fake product renders presented as real HeadBlade products;
- no new third-party product assets copied into the repository unless rights are confirmed;
- preview may reference the existing public HeadBlade Germany product assets already used in the review data layer;
- no production Product/Offer schema until purchase data is authoritative;
- motion must respect `prefers-reduced-motion` and remain functional rather than decorative.

## 3. Evidence baseline

### 3.1 Current Semrush Germany snapshot

The current Semrush `de` snapshot for `headblade.info` on 2026-09-04 reports:

- 31 organic keywords;
- estimated 19 organic visits;
- 2 keywords in positions 1–3;
- 4 keywords in positions 4–10;
- 10 keywords in positions 11–20;
- 28 informational-intent position markers;
- 4 navigational-intent position markers;
- 9 transactional-intent position markers.

The organic keyword-detail and competitor reports could not be completed because the connected Semrush API account returned `API UNITS BALANCE IS ZERO`. No competitor keyword conclusions may be invented from that failure.

Implication: the redesign must connect product discovery and explanatory content rather than create a visually attractive shop with no search/education architecture.

### 3.2 Current research direction

Current small-catalog DTC and health/beauty ecommerce research supports:

- strong product imagery and clear product understanding;
- direct comparison where users must distinguish similar products;
- visible compatibility information;
- mobile-first product decision support;
- concise highlights before long-form explanation;
- fewer, stronger routes rather than large volumes of thin pages;
- accessible product galleries and reduced friction around additional images.

### 3.3 HeadBlade first-party brand truth

The visual system must derive from HeadBlade's actual product and brand story: a razor designed specifically for head shaving, intended to sit close to the head, be controlled by feel and follow head contours through its contact/pivot mechanics.

This is the primary brand-design source. Competitor sites are used only to identify decision-support patterns and category expectations.

## 4. Visual system

### 4.1 Palette

Primary page field:

- `Bone / warm white`: dominant background and editorial surface;
- `Pure white`: product cards, galleries and focused content surfaces;
- `Carbon`: text, navigation and selective high-contrast sections;
- `Aluminium / steel`: secondary technical lines, captions and motion paths;
- `HeadBlade red`: sparse decisive accent for key actions, active states and meaningful contour/motion annotations.

Red must no longer dominate whole sections by default. Dark graphite must no longer be the universal hero/background treatment.

### 4.2 Typography

The current Outfit-driven HSB-like typographic character is rejected for the new public design.

Requirements:

- replace Outfit with a locally served contemporary grotesk or neo-grotesk appropriate to premium product design;
- pair it, only if useful, with a restrained editorial face for explanatory/story content;
- German glyph coverage required;
- headings must not rely on oversized all-caps treatment as the primary brand device;
- sentence-case product headings preferred for clarity;
- body line length and line-height prioritize reading on mobile;
- font loading must preserve current performance and CLS standards.

Final font selection is an implementation-plan decision and must be validated for licensing, local hosting, Lighthouse and visual fit.

### 4.3 Shape language

MOTION LAB uses geometry taken from the actual product:

- finger-ring circle;
- pivot joint;
- short directional arcs showing movement;
- head/scalp contour curve;
- compact mechanical annotations;
- controlled circular crops around product detail where they communicate mechanism.

Avoid:

- HSB hexagons;
- industrial flooring-style section framing;
- generic diagonal speed lines;
- neon/glow effects;
- glassmorphism;
- gratuitous 3D chrome;
- continuous ambient animation.

### 4.4 Motion language

Motion must explain function.

Approved motion categories:

1. short hero product reveal;
2. one-time contour-path draw;
3. subtle product-card lift/focus response;
4. mechanism annotation showing pivot/contour direction;
5. gallery transitions and comparison-state changes.

Rules:

- transform/opacity first;
- short finite durations;
- no looping hero decoration;
- no parallax requirement;
- no layout-shifting transitions;
- all essential understanding must remain in the static state;
- `prefers-reduced-motion: reduce` disables nonessential motion without losing information.

## 5. Product-media system

The redesign must use current real HeadBlade Germany product images already referenced by the review branch for MOTO, MOTO detail, ATX, ATX Pink, HB4, HB6, HeadSlick and HeadCase.

Rules:

- no invented razor illustration as the main product representation;
- no unrelated stock grooming imagery in place of actual products;
- do not upscale low-resolution legacy assets into full-bleed hero photography where they visibly degrade;
- use contained studio framing, intentional negative space and detail crops to make existing assets look deliberate;
- MOTO receives the strongest media hierarchy because it is the primary product story;
- production launch requires a first-party asset audit for higher-resolution originals, hand/scale images, scalp-use images and mechanism visuals;
- image alt text must communicate actual product/informational content rather than marketing filler;
- main/LCP image is not lazy-loaded; secondary gallery images may be lazy-loaded;
- explicit dimensions and responsive source sizing are required.

## 6. Homepage contract

The homepage becomes a light, product-led decision journey.

### Section 1 — Hero

Composition:

- primarily light field;
- approximately 38–42% copy / 58–62% product area on large desktop, but not a rigid HSB 50/50 split;
- real MOTO product image is the dominant visual;
- restrained contour/pivot arcs are secondary explanatory graphics;
- no dark industrial wall, oversized red panel or HSB-like uppercase poster layout.

Required information:

- HeadBlade MOTO;
- clear German proposition such as `Für die Kopfrasur entwickelt.`;
- one concise line about moving/contour-following design and compatible blade system based only on verified facts;
- primary CTA to MOTO detail;
- secondary CTA to MOTO-vs-ATX comparison.

### Section 2 — Product Mechanics Rail

A compact horizontal explanation of the four buying concepts:

`Fingerführung → Pivot → Klingensystem → Kopfkontur`

This replaces generic trust/promise strips as the immediate post-hero section.

### Section 3 — MOTO oder ATX?

Two-product comparison using real product imagery.

Each side answers:

- handling principle;
- movement/guidance distinction;
- compatible blade system where verified;
- who may prefer it;
- link to full comparison.

No unsupported "better", "safer", "closer" or medical/sensitive-skin superiority claims.

### Section 4 — How MOTO moves

A mechanism-led editorial section using product detail imagery and a small explanatory motion/diagram.

Goal: make the product understandable without requiring a long paragraph.

### Section 5 — HeadBlade Fit

Keep the transparent local decision tool from the Contour System specification.

It remains:

- no login;
- no tracking profile;
- no diagnosis;
- explainable recommendation;
- one primary product and optional alternative;
- compatible blade guidance;
- direct links to comparison and use guidance.

### Section 6 — Blade compatibility

HB4/HB6 imagery and compatibility-first decision support. Compatibility appears before marketing differences.

### Section 7 — The head-shave routine

Product-led sequence:

`Prepare → Shave → Care`

Use real Razor / HeadSlick / relevant care imagery when supported by the current catalog.

### Section 8 — Current products

Small curated product rail or grid using actual current Germany catalog data. Avoid an indiscriminate product dump.

### Section 9 — Product design story

Explain why HeadBlade is shaped differently and how the head-shaving-specific design philosophy developed. Use verified first-party story material only.

### Section 10 — Guides / authority

Prioritize:

- MOTO vs ATX;
- HB4 vs HB6;
- erste Kopfrasur;
- Kopf richtig rasieren;
- manuell vs elektrisch;
- Kopfhautpflege without medical claims.

### Section 11 — Final decision

End with product choice, Fit or comparison — not artificial urgency.

## 7. Product detail page contract

Above the fold:

- breadcrumb;
- large real product gallery;
- visible thumbnails when multiple images exist;
- product title and current verified preview price;
- short product-purpose statement;
- fit guidance;
- compatibility;
- disabled/review-only commerce state;
- clear preview status that cannot be mistaken for a live checkout.

Below the fold:

1. highlights;
2. mechanism explanation;
3. image/detail evidence;
4. how to use;
5. blade compatibility;
6. nearest HeadBlade alternative;
7. care/routine pairing;
8. FAQ;
9. related products.

Mobile:

- product image must not consume the entire first viewport;
- title, price and key decision information remain quickly reachable;
- thumbnails/swipe affordance must be obvious;
- minimum tap targets remain accessible;
- no important specifications hidden in separate mobile subpages.

## 8. Comparison UX

Comparison is a first-class product feature.

Required routes remain:

- `/vergleich/moto-vs-atx`;
- `/vergleich/hb4-vs-hb6`;
- `/vergleich/manuell-vs-elektrisch`.

Comparison design should be editorial and scannable rather than a giant enterprise table.

Use:

- 2-up product imagery;
- compact labeled rows;
- compatibility markers;
- short "best fit" guidance;
- collapsible depth only after the primary differences are visible.

## 9. SEO/content integration

Do not separate `SEO pages` from the product experience.

The low current organic footprint and strong informational-intent signal mean education must feed directly into product decisions.

Rules:

- one meaningful customer task per page;
- product and guide routes cross-link contextually;
- concise answer near the top, depth below;
- unique titles/descriptions;
- no scaled thin content;
- visible textual facts remain synchronized with structured data;
- production Merchant/Product data only after the commerce source of truth exists;
- preview remains noindex.

## 10. Accessibility and performance

Non-negotiable release gates:

- WCAG AA contrast for normal text and interactive states;
- visible keyboard focus;
- semantic navigation/headings;
- gallery controls with accessible names;
- no color-only compatibility state;
- minimum 44px practical tap targets where applicable;
- reduced-motion support;
- no accessibility overlay;
- responsive images and stable dimensions;
- target Lighthouse homepage and MOTO PDP: Performance >= 0.95, Accessibility = 1.00, Best Practices >= 0.95, SEO = 1.00 in the established CI profile;
- final browser coverage includes Chromium desktop/mobile plus WebKit/iPhone and Firefox before production approval.

## 11. HSB non-copy gate

Before visual approval, compare the HeadBlade preview against HSB-Boden and reject the design if several of these remain materially similar at once:

- same primary font family;
- same near-black + red-dominant section composition;
- same dark split hero structure;
- same oversized all-caps display treatment;
- same red eyebrow + dark card system;
- same spacing/card rhythm;
- same CTA-bar/promise-strip composition;
- same industrial visual metaphor.

Engineering patterns may match. Brand/UI expression must not.

## 12. Current branch note

At the time this specification was written, the feature branch had already advanced to commit `94a9f6e2e183f8143c2d93f0572bc77bed78f95e` (`feat: add restrained HeadBlade Motion Lab`) with a small motion-only change in `src/styles/contour.css`.

That existing commit is treated as **provisional exploratory implementation**, not proof that this full specification has been implemented. It must not be mistaken for completion of the redesign.

No existing work is overwritten solely to satisfy this specification. The implementation plan must start from the current branch head, preserve valid concurrent work and deliberately replace only the HSB-like visual surfaces required by this design.

## 13. Verification acceptance criteria

MOTION LAB is ready for owner visual review only when all are true:

1. homepage no longer presents as an HSB-derived dark/red corporate design;
2. Outfit is removed from the public HeadBlade visual system or retained only where a specific documented technical reason justifies it;
3. real current HeadBlade product imagery is used for all major product surfaces;
4. hero, MOTO-vs-ATX, MOTO mechanics, blade compatibility and routine sections match this spec;
5. product pages provide gallery/thumbnails where media exists;
6. mobile layouts are purpose-built, not merely stacked desktop sections;
7. no unsupported commercial or product claims were introduced;
8. no checkout or customer-data path is activated;
9. preview remains noindex with `X-Robots-Tag`/HTML noindex verified;
10. CI, security, browser smoke and Lighthouse gates are green;
11. accessibility score is 1.00 on required Lighthouse pages and known contrast/name mismatches are fixed;
12. production `headblade.info` and DNS remain unchanged;
13. visual owner review explicitly approves the preview before any production migration planning begins.

## 14. Next process gate

This written specification requires user review under the Superpowers architectural workflow.

After approval, create a new implementation plan at:

`docs/superpowers/plans/2026-09-04-headblade-motion-lab.md`

Implementation then proceeds task-by-task with TDD, current-branch readback, deterministic visual/browser verification and no production merge without a separate explicit owner approval.
