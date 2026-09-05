# HeadBlade Germany — HEADBLADE CONTOUR SYSTEM Design

**Date:** 2026-09-04  
**Status:** DESIGN DIRECTION APPROVED — WRITTEN SPEC AWAITING USER REVIEW  
**Project:** `HEADBLADE_DE_2026`  
**Target:** Public owner-review preview first; production `https://www.headblade.info/` remains untouched until a later explicit owner gate.  
**Supersedes:** `docs/superpowers/specs/2026-09-03-headblade-premium-astro-design.md` as the current product/experience specification. The Astro/Cloudflare engineering foundation from that document remains valid where not explicitly changed here.

## 1. Outcome

HeadBlade Germany must not present as another generic razor catalogue. The successor experience positions HeadBlade as the specialist system for manual head shaving: a product family designed around the geometry, movement and care needs of the scalp.

The defining brand/product idea is:

> **HEADBLADE CONTOUR SYSTEM — Purpose-built Head Shaving.**

The website must make HeadBlade immediately understandable, memorable and easy to choose. It combines the product-specific strengths of MOTO/ATX, blade compatibility and scalp-care routines into one coherent decision system rather than a set of unrelated products.

The review preview must demonstrate the intended near-final visual and information experience without enabling transactions, collecting customer data, activating analytics or changing production infrastructure.

Immediate success state:

`PREVIEW_READY_FOR_OWNER_REVIEW`

Later production success is a separate project phase and requires owner approval plus current commercial, legal, fulfilment, analytics and source-of-truth verification.

## 2. Non-negotiable boundaries

Until explicit production approval:

- no changes to `headblade.info`, DNS or the existing live shop;
- no live cart, checkout, order, payment, account or customer-data collection;
- no real marketing automation, analytics, advertising or consent-storage activation;
- no unverified product claims, ratings, guarantees, delivery promises, availability, stock or legal text;
- no copied competitor creative, wording, layout or proprietary feature names;
- no public product asset copied into the repository unless usage rights are confirmed;
- no fake reviews or invented social-proof counters;
- no generic AI-generated SEO content farm;
- no accessibility overlay as a substitute for native accessibility;
- no production Product/Offer merchant-listing schema until a customer can actually purchase from the page and the offer data is authoritative.

## 3. Evidence and competitive diagnosis

### 3.1 Current SEO baseline

Semrush Germany snapshot collected on 2026-09-04 for `headblade.info`:

- 31 organic keywords;
- estimated 19 organic visits;
- 2 keywords in positions 1–3;
- 5 keywords in positions 4–10;
- 6 keywords associated with AI Overview SERPs;
- 20 keywords associated with People Also Ask SERPs.

This is a small current footprint with disproportionate opportunity in question-led and explanatory search. The strategy therefore prioritizes authoritative decision content and product understanding rather than mass page production.

The Semrush API account reported zero remaining API units before a complete competitor-domain matrix could be executed. Competitor evidence is therefore supplemented by current first-party competitor sites, HeadBlade USA, Google Search/Merchant documentation, Baymard ecommerce UX research and official accessibility/performance sources.

### 3.2 Competitor lessons

**Skull Shaver** is strong at technical explanation, ergonomic differentiation, product variants, usage scenarios and large-scale social proof. Weakness: pages can become long and mechanically dense. HeadBlade should equal the decision confidence with less cognitive load.

**Remington Balder** is strong at mainstream trust, concise features, waterproof/battery/use-case explanation and familiar grooming language. Weakness: it behaves like an appliance family, leaving room for HeadBlade to own a more specific head-shaving culture and ritual.

**Freebird** is strong at DTC conversion architecture: bundled value, comparisons, risk reversal, refill logic, testimonials and aggressive benefit sequencing. Weakness: promotion density and pressure can make the experience feel sales-first. HeadBlade should use the clarity without adopting discount theatre or unsupported guarantees.

**HeadBlade USA** provides the most valuable brand truth: products specifically designed for head shaving, MOTO contour/pivot mechanics, ATX learning-curve accessibility, HB4/HB6 compatibility, dedicated head-care products and a history dating to 1999. The German experience should translate these brand truths into a stronger system while keeping only claims that can be verified and legitimately used.

### 3.3 Differentiation rule

We do not win by claiming a stronger motor, more rotary heads or a faster electric shave. Those are competitor categories.

HeadBlade wins by owning:

1. **Control by feel** — a hand-led tool designed around the scalp.
2. **Contour mechanics** — the product follows the head rather than forcing the hand into a generic razor grip.
3. **System compatibility** — razor, blade and care products form an understandable routine.
4. **Specialist identity** — head shaving is the primary design problem, not an accessory use case.
5. **Human decision support** — the site explains which system fits whom instead of making visitors decode SKUs.

## 4. Signature brand language: The Contour Line

The distinctive visual device is the **HeadBlade Red Contour Line**.

It is a restrained graphic line derived from the curve of the human scalp and the movement path of the MOTO suspension. It may appear as:

- the primary hero composition guide;
- section-transition geometry;
- product-mechanism annotation;
- progress/path indicator in the finder;
- comparison-table emphasis;
- subtle crop or framing device in editorial imagery;
- social/share creative motif.

Rules:

- it must communicate motion, contour or sequence; never be random decoration;
- one dominant contour gesture per viewport/section maximum;
- HeadBlade red remains the only strong accent against graphite, off-white and steel neutrals;
- no neon gradients, glow, gaming effects, parallax spectacle or uncontrolled animation;
- motion, where used, is short and functional and respects `prefers-reduced-motion`;
- the mark must remain recognizable in static screenshots and social crops, not depend on animation.

This creates a repeatable memory structure that belongs to the actual product logic rather than a generic ecommerce trend.

## 5. Visual system

### Palette

- Graphite / near-black: primary authority field.
- Warm off-white: editorial/content field.
- HeadBlade red: action, contour and decisive state only.
- Steel/neutral grays: technical/supporting information.
- Functional success/warning colors only where semantics require them.

### Typography

- locally served display face with compact, confident headings;
- highly readable body face with German-language character coverage;
- responsive fluid scale with sensible line length;
- no ultra-thin text, novelty fonts or oversized headings that push the product below the fold on mobile;
- fallback metrics chosen to minimize layout shift.

### Photography and media

Production-quality pages require a planned image system rather than one image per SKU:

1. clean product studio image;
2. close technical detail;
3. hand/scale reference;
4. real scalp-use image;
5. mechanism/compatibility explanatory graphic;
6. optional short original use video;
7. search/social crops in 1:1, 4:3 and 16:9 where appropriate.

Preview may use rights-safe review references, but production requires approved first-party assets. No competitor photography is copied.

## 6. Customer jobs and information architecture

Every major route must resolve one of five customer questions:

1. **Welcher Rasierer passt zu mir?**
2. **Welche Klinge brauche ich?**
3. **Wie benutze ich HeadBlade richtig?**
4. **Wie pflege ich meine Kopfhaut vor und nach der Rasur?**
5. **Warum HeadBlade statt eines normalen oder elektrischen Rasierers?**

### Top-level navigation

Recommended production-oriented information architecture:

- **Rasierer**
- **Klingen**
- **Pflege**
- **Sets**
- **Finder**
- **So geht’s**
- **Vergleichen**

Lifestyle/brand content remains available but should not displace purchase/decision categories from mobile top-level navigation.

### Required preview route families

Existing routes remain and are progressively aligned to this model. New or expanded authority routes should include at minimum:

- `/finder` — HeadBlade Fit;
- `/vergleich/moto-vs-atx`;
- `/vergleich/hb4-vs-hb6`;
- `/anleitungen/kopf-richtig-rasieren`;
- `/anleitungen/erste-kopfrasur`;
- `/anleitungen/kopfhaut-pflegen`;
- `/vergleich/manuell-vs-elektrisch`.

Avoid generating dozens of thin query variants. One excellent page should satisfy related questions where the customer task is the same.

## 7. Homepage design

The homepage becomes a decision journey, not a product dump.

### Section order

1. **Review safety banner** — visually subordinate but explicit.
2. **Navigation** — product categories exposed directly on mobile.
3. **Hero: “Für deinen Kopf gebaut.”** — MOTO visual + Contour Line + one primary decision CTA and one catalog CTA.
4. **Three-second category explanation** — HeadBlade is a manual head-shaving system, not an electric shaver.
5. **Choose your HeadBlade** — MOTO / ATX / first-start set with concise “best for” differentiation.
6. **HeadBlade Fit entry** — 3–5 short questions, transparent recommendation.
7. **Contour mechanics** — visual explanation of hand contact, pivot/rolling/contour behavior using only verified product mechanics.
8. **Blade compatibility** — HB4/HB6 decision matrix.
9. **The HeadBlade Routine** — Prepare → Shave → Calm → Protect, translated naturally into German UI copy.
10. **Manual vs electric** — neutral use-case comparison, not a false universal winner claim.
11. **Bestsellers / routines / sets** — catalog-driven, not promotion-driven.
12. **How to shave** — compact three-to-five step explainer with link to full guide/video.
13. **Verified social proof** — only real reviews/ratings when authoritative source and usage rights are confirmed. Until then, preview uses clearly labeled placeholders or omits the block.
14. **Help before buying** — compatibility, shipping/returns links when authoritative.
15. **FAQ** — real objections, concise answers and links to detailed authority pages.
16. **Final decision CTA** — Finder or catalog, not artificial urgency.
17. **Footer** — help, shipping/returns, accessibility information and legal routes.

## 8. HeadBlade Fit — explainable product finder

The finder is a small decision-support tool, not a black-box recommendation engine.

Inputs should be limited to factors that genuinely change the recommendation, e.g.:

- first head shave vs experienced;
- desired guidance/control style;
- preferred MOTO flexibility vs ATX rigid/wheel-guided handling;
- existing compatible blade system where relevant;
- whether the shopper needs a starter set or only the razor.

Output:

- one primary recommendation;
- optional alternative;
- 2–4 human-readable reasons;
- compatible blades;
- link to comparison and use guide;
- no medical/scalp diagnosis;
- no hidden scoring that cannot be explained.

The result must work without account creation and should be URL/share-state capable only if that can be achieved without personal data or unnecessary client complexity.

## 9. Product-list and comparison UX

Product cards must answer more than name + price:

- category/use case;
- “best for” distinction;
- blade compatibility where relevant;
- concise primary difference from the nearest alternative;
- at least one strong image; production target is multiple useful thumbnails where assets allow;
- one accessible focus target per card.

For spec-driven choices, use deliberate comparison rather than forcing users to memorize product pages.

**MOTO vs ATX** should compare only confirmed dimensions such as handling principle, lateral movement/pivot behavior, beginner guidance, blade compatibility and intended use — not invented superiority claims.

**HB4 vs HB6** must surface compatibility first, then practical differences based on authoritative product data.

## 10. Product detail page contract

Above the fold on mobile and desktop:

- breadcrumb;
- product gallery with clear thumbnails where multiple images exist;
- product name;
- verified review summary only when valid;
- current verified price for preview display;
- one-sentence use case;
- “passt zu dir, wenn …” decision support;
- compatibility;
- review-mode purchase-disabled state.

Below the fold:

1. primary benefits;
2. mechanism/technical explanation;
3. in-use/scale media;
4. how to use;
5. compatible blades/products;
6. comparison to nearest HeadBlade alternative;
7. routine pairing;
8. authoritative shipping/returns information when available;
9. FAQ/Q&A;
10. real review content when owner-authorized;
11. related products.

No important specification is hidden in a mobile subpage. Technical data is normalized into scannable groups.

## 11. SEO and AI-search strategy

### 11.1 Principle

There is no separate “GEO hack” layer. Google’s 2026 guidance states that eligibility for AI Overviews/AI Mode rests on the same crawlability, indexability, helpful-content and page-experience fundamentals as Search overall.

Therefore:

- build pages for real customer tasks;
- publish original, non-commodity expert content;
- keep important facts textual and internally linked;
- support them with original images/video;
- keep structured data synchronized with visible content;
- avoid `llms.txt` or AI-specific markup as a ranking tactic;
- avoid scaled thin pages generated for every long-tail variation.

### 11.2 Authority content

Priority launch-quality assets:

1. **MOTO oder ATX?** Direct decision guide.
2. **HB4 oder HB6?** Compatibility and blade guide.
3. **Kopf richtig rasieren.** First-party method with verified HeadBlade usage.
4. **Erste Kopfrasur.** Beginner guide addressing fear, technique and realistic expectations without medical advice.
5. **Manuelle Kopfrasur oder elektrischer Kopfrasierer?** Balanced comparison by user need.
6. **Kopfhaut nach der Rasur pflegen.** Product/routine education with no medical claims.

Each page needs a unique primary purpose, author/source responsibility, update date where useful, internal links to relevant products/guides and demonstrable first-party expertise rather than rewritten competitor content.

### 11.3 On-page structure

- descriptive unique title and meta description;
- one primary intent per URL;
- concise answer early, depth below;
- semantic headings for readability/accessibility;
- meaningful internal anchors;
- real breadcrumb path;
- indexable production media;
- canonical URLs derived centrally;
- no meta keywords;
- no keyword stuffing or arbitrary word-count targets.

## 12. Product structured data and Google Merchant readiness

### Review preview

The preview remains `noindex` and cannot pretend to be a purchasable merchant listing.

Use only schema that truthfully describes the preview. Product snippet data may be emitted from verified visible fields where appropriate; do not claim an active purchasable `Offer` purely to chase rich results.

### Production

When real purchase capability and authoritative commerce data exist, build Product/Offer data from the same canonical record that renders the page. Include when verified and applicable:

- name;
- description;
- image set;
- SKU;
- GTIN;
- brand;
- price / priceCurrency;
- availability;
- item condition;
- shipping details or organization shipping policy reference;
- return policy or organization return policy reference;
- real aggregate rating/reviews if policy-compliant.

Use Google Merchant Center product feed plus on-page structured data in production. Stable product IDs must not change casually, preserving performance/history. Feed, visible page, schema, checkout price and availability must agree.

## 13. Trust and conversion system

Trust must come from evidence, not badges pasted into the UI.

Priority signals:

- clearly explained specialist product design;
- real awards only with source/usage verification;
- authentic reviews with provenance;
- delivery costs/dates and return policy near the decision point once authoritative;
- compatibility confidence before cart;
- easy-to-find help/contact/legal information;
- no false countdown timers, fake scarcity or permanently-on “sale” treatment;
- clear total price and shipping expectations in future commerce phase;
- security/payment marks only if they correspond to actually used providers.

The desired conversion tone is **confident guidance**, not pressure.

## 14. Viral/shareable layer without gimmicks

“Viral” is treated as content utility and brand recognizability, not animation volume.

Create assets people can naturally share:

- MOTO vs ATX one-screen comparison;
- HB4/HB6 compatibility card;
- “first head shave” checklist;
- Contour Line before/after routine graphic;
- short first-party mechanism clips;
- result from HeadBlade Fit with a clean shareable summary;
- social crops using the same HeadBlade Red Contour Line.

No auto-playing audio, intrusive full-screen video, manipulative share gates or social widgets that add third-party tracking to the preview.

## 15. Accessibility / BFSG engineering target

Design and implementation target: **WCAG 2.2 AA**, aligned with current EN 301 549/BFSG guidance as a quality baseline. Final legal applicability/exemptions are an owner/legal determination, not a code assumption.

Required native patterns:

- semantic landmarks and heading hierarchy;
- skip link;
- full keyboard operation;
- visible focus indicators;
- correct accessible names matching visible labels;
- contrast meeting AA;
- zoom/reflow without loss of functionality;
- touch targets approximately 44px where practical;
- alt text based on image purpose, not keyword stuffing;
- captions/transcripts for meaningful production video;
- status/error communication not dependent on color;
- reduced-motion support;
- no accessibility overlay.

Automated tooling is necessary but insufficient; core journeys require keyboard and screen-reader-oriented manual checks before production.

## 16. Performance and Core Web Vitals

Architecture remains Astro static-first on Cloudflare Workers Static Assets.

Field targets at p75 for production:

- LCP <= 2.5s;
- INP <= 200ms;
- CLS <= 0.1.

Engineering budgets for the preview should be stricter than merely passing Lighthouse:

- static HTML for all non-interactive content;
- no framework hydration for decorative components;
- Finder/gallery JS isolated and deferred;
- no heavy carousel dependency;
- local critical fonts only;
- LCP image in initial HTML, not lazy loaded, with dimensions and appropriate priority;
- responsive image sources and modern formats where local assets are available;
- width/height or stable `aspect-ratio` for all media;
- below-fold images lazy loaded;
- minimal third-party code;
- no layout-injecting promotional bars after paint;
- animation restricted to transform/opacity where practical.

Lighthouse remains a regression gate; Search Console/CrUX becomes the source for real-user CWV after production.

## 17. Technical architecture

Keep the verified implementation foundation:

- Astro 7;
- TypeScript strict;
- Tailwind CSS 4;
- static prerendered routes;
- Vitest;
- Playwright desktop/mobile smoke tests;
- Lighthouse CI;
- Cloudflare Workers Static Assets;
- GitHub PR/feature-branch quality gates.

No Astro Cloudflare adapter while the project is fully static.

### Component boundaries

Add/refine focused units rather than one homepage monolith:

```text
src/
  components/
    brand/
      ContourLine.astro
      ProductMechanic.astro
    commerce/
      ProductCard.astro
      ProductGallery.astro
      ProductComparison.astro
      CompatibilityMatrix.astro
      RoutineStep.astro
    finder/
      FinderShell.astro
      FinderStep.astro
      FinderResult.astro
    content/
      AuthorityIntro.astro
      EvidenceBlock.astro
      FAQ.astro
    layout/
    seo/
  data/
    products.ts
    categories.ts
    comparisons.ts
    routines.ts
    authority.ts
  lib/
    catalog.ts
    compatibility.ts
    finder.ts
    seo.ts
    schema.ts
    preview.ts
```

Exact files may differ after implementation planning if the existing repository already contains equivalent clean boundaries. Do not refactor unrelated code simply to match this tree.

## 18. Data-quality contract

Extend the product/content model only with fields supported by real use cases. Candidate fields include:

- `sku` / `gtin` when verified;
- `bestFor`;
- `compatibility`;
- `mechanics`;
- `usageSteps`;
- `media[]` with role/aspect/alt/source status;
- `claimSources[]` or an equivalent verification record for sensitive claims;
- `reviewSummary` only from authorized evidence;
- `seo` metadata;
- `updatedAt` for authority content where useful.

Review seed data remains explicitly non-authoritative for stock, fulfilment or legal promises. Production requires source reconciliation.

## 19. Measurement plan

No analytics activate in review mode.

Production measurement should be consent-aware and tied to customer decisions rather than vanity events. Candidate GA4/ecommerce events include:

- `view_item_list`;
- `select_item`;
- `view_item`;
- `add_to_cart`;
- `begin_checkout`;
- `purchase`;
- `search`;
- Finder start/complete/recommendation interaction as documented custom events;
- comparison interactions where they represent meaningful decision behavior.

No unnecessary personal data in analytics payloads. Event naming/data ownership is documented before launch and tested against duplicate firing.

## 20. Preview indexing and safety contract

Current review architecture remains isolated:

- `headblade-germany-review` Worker;
- `workers.dev`/preview alias only;
- production domain routes absent;
- `noindex` in HTML and `X-Robots-Tag`;
- preview must remain crawl-accessible enough for the `noindex` directive to be observed rather than relying on a contradictory blanket robots block;
- no forms/customer-data fields;
- no payment/checkout provider;
- no transaction-complete wording;
- no production analytics/ads.

The existing validator must be extended when new components/routes create new safety surface.

## 21. Cloudflare delivery contract

Use Workers Static Assets with the existing isolated review worker.

Normal review builds use version upload / preview alias rather than production traffic promotion. First bootstrap of an otherwise nonexistent Worker may require an explicit manual deploy, but that is an isolated review-worker action, not a production-domain action.

Deployment must fail closed when credentials are invalid. Pipeline commands must preserve the real Wrangler exit code. A successful preview is not claimed until the published endpoint returns HTTP 200 and the expected noindex controls are independently verified.

No custom production domain or DNS is introduced by this design phase.

## 22. Testing and verification matrix

### Contract/unit

- finder recommendation rules;
- compatibility matrix;
- comparison facts sourced only from canonical data;
- schema sanitization;
- SEO metadata uniqueness/requirements;
- preview safety;
- route existence;
- product/media data integrity.

### Rendering/browser

Desktop and mobile critical journeys:

1. homepage → MOTO/ATX decision;
2. homepage → Finder → result;
3. product list → product detail → compatibility;
4. MOTO vs ATX comparison;
5. HB4 vs HB6 comparison;
6. authority guide → relevant product/guide internal links;
7. keyboard navigation/menu/focus;
8. 404 and legal/help routing.

### Automated quality gates

- `npm ci` reproducibility;
- Astro/TypeScript check: zero errors/warnings/hints target;
- Vitest all pass;
- static build all declared routes;
- preview safety validator pass;
- secret scanning/security workflows pass;
- Playwright desktop/mobile smoke pass;
- Lighthouse accessibility >= 0.95 error threshold;
- Lighthouse SEO >= 0.95 error threshold;
- Lighthouse performance >= 0.90 warning threshold, with regressions investigated rather than hidden by lowering thresholds;
- structured-data validation for production-target schema before launch.

### Manual review before production

- content accuracy/source review;
- visual QA at representative mobile/tablet/desktop widths;
- keyboard journey;
- screen-reader-oriented landmark/name/state review;
- German language/copy proof;
- image rights/alt/crops;
- legal/shipping/returns source verification;
- Merchant/GA4/GSC readiness;
- production migration and rollback runbook.

## 23. Acceptance criteria for this redesign phase

The HEADBLADE CONTOUR SYSTEM implementation is owner-review ready only when:

1. the Contour visual language is consistently recognizable without reducing readability;
2. MOTO vs ATX is understandable without opening multiple tabs;
3. HB4/HB6 compatibility is explicit and test-covered;
4. Finder recommendations are explainable and deterministic;
5. homepage communicates “manual specialist head-shaving system” within the first viewport/next immediate section;
6. product details provide decision support, compatibility and use guidance rather than catalogue-only text;
7. at least the priority authority routes exist with original, useful German content;
8. no competitor copy or unverified claim has been imported;
9. preview remains transaction-free and noindex;
10. accessibility, CI, browser, security and Lighthouse gates pass;
11. Cloudflare public review URL is independently verified;
12. `headblade.info` and production DNS remain unchanged.

## 24. Explicit non-goals for this implementation cycle

- live commerce backend;
- payment provider;
- account/customer database;
- customer/order migration;
- live Merchant Center activation;
- live GA4/Ads activation;
- production DNS/domain cutover;
- replacing owner-approved legal texts;
- large SEO content farm;
- influencer campaign or paid-media execution;
- unsupported medical/scalp-health claims.

These can become later workstreams after owner review and source access.

## 25. Project truth and supersession rules

To prevent multiple conflicting truths:

1. **GitHub current design truth:** this file.
2. **GitHub engineering implementation truth:** current feature branch + its implementation plan after user approval.
3. **Drive current management truth:** one current `PROJECT_STATE` document reflecting GitHub/Cloudflare reality.
4. Older Next.js/Vercel/Supabase commerce-rebuild design is historical and superseded for the current preview architecture.
5. The 2026-09-03 Premium Astro spec is historical after this design is approved; its architecture findings remain traceable but its product/UX requirements no longer govern when this document differs.
6. Production remains a later explicit owner gate regardless of preview quality.

## 26. Primary verification sources used for this design

- HeadBlade US first-party product/category/get-started pages — brand history, MOTO/ATX mechanics, blade compatibility and product-system positioning.
- Skull Shaver Germany first-party product pages — technical explanation and product decision patterns.
- Remington Europe Balder first-party pages — mainstream head-shaver product communication.
- Freebird first-party product/compare pages — DTC decision, comparison, guarantee and refill presentation patterns (patterns only; no creative/copy copied).
- Google Search Central 2026 AI Search guidance — people-first/non-commodity content; no special GEO/AEO technical layer required.
- Google Product/Merchant structured-data documentation — Product/Offer, image, shipping/returns and feed alignment rules.
- Google Merchant Center product-data guidance — stable IDs, complete identifiers, image/data quality and landing-page/feed consistency.
- Google/web.dev Core Web Vitals — LCP/INP/CLS field thresholds.
- Baymard ecommerce UX research — product-page imagery, comparison, mobile navigation, shipping/returns visibility, FAQ/Q&A and specification-scannability patterns.
- Bundesfachstelle Barrierefreiheit / BFSG sources — native ecommerce accessibility and EN 301 549/WCAG orientation.
- Semrush Germany domain snapshot for `headblade.info` collected 2026-09-04.

## 27. Next gate

This written specification must be reviewed and approved by the user before implementation planning begins.

After approval, invoke Superpowers `writing-plans` and derive a staged TDD/subagent implementation plan against the existing `feat/astro-headblade-premium` branch. Do not start implementation merely because this file is committed.
