# HEADBLADE CONTOUR SYSTEM Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing static HeadBlade Germany Astro review preview into the approved HEADBLADE CONTOUR SYSTEM: a distinctive, mobile-first, decision-oriented specialist experience for manual head shaving with explainable product finding, comparison content, authority guides, stronger PDPs, rigorous SEO/schema truthfulness, accessibility and performance gates.

**Architecture:** Keep the current Astro 7 static-first architecture, typed catalog and Cloudflare Workers Static Assets deployment. Add pure TypeScript decision/knowledge modules for finder and comparison logic, then render them through small Astro components and static routes. Interactive behavior must be progressive enhancement only; core decisions, links and content remain available in initial HTML. Preview safety stays fail-closed: no forms, customer data, checkout, payments, analytics, production routing or merchant `Offer` claims.

**Tech Stack:** Astro 7.1.1, TypeScript 5.8.3 strict, Tailwind CSS 4.3.2, Vitest 4.1.8, Playwright 1.62.1, Lighthouse CI, Cloudflare Workers Static Assets / Wrangler 4.128.0, npm 11.6.0, Node >=22.12.0.

**Spec:** `docs/superpowers/specs/2026-09-04-headblade-contour-system-design.md`

## Global Constraints

- Work only on `feat/astro-headblade-premium`; do not merge to `main` as part of this plan.
- `https://www.headblade.info/`, production DNS and the existing live shop remain untouched.
- No live cart, checkout, order, payment, account, lead/customer form, analytics, advertising or personal-data storage.
- No unverified ratings, guarantees, delivery dates, stock, awards, medical claims or competitor-superiority claims.
- Remote review images may stay hotlinked; do not copy third-party product files into this public repository without rights confirmation.
- Preview pages remain `noindex,nofollow,noarchive`; `robots.txt` must allow crawling so the noindex directive can be read.
- Do not emit purchasable merchant `Offer` schema in review mode.
- Keep static HTML as the default; no hydration for content that works without JavaScript.
- Accessibility target: WCAG 2.2 AA-oriented native implementation, no overlay tooling.
- Core Web Vitals design target: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at p75 in production; CI continues to use Lighthouse as a lab regression gate.
- Preserve current CI hardening, action SHA pins, concurrency protections and preview-deployment isolation.
- All behavior changes follow RED -> verify RED -> GREEN -> verify GREEN -> refactor.

---

## File Structure / Responsibility Map

### Existing files to extend

- `src/data/products.ts` — canonical review catalog; add decision-support fields only when grounded in verified current product facts.
- `src/data/categories.ts` — customer-facing catalog categories; preserve stable route identifiers.
- `src/data/site.ts` — global site metadata / navigation support.
- `src/lib/catalog.ts` — existing product lookup and formatting.
- `src/lib/routes.ts` — stable route registry and breadcrumb/category routing.
- `src/lib/schema.ts` — structured-data builders; must remain preview-truthful.
- `src/lib/seo.ts` — SEO metadata helpers.
- `src/components/layout/Header.astro` / `Footer.astro` — product-first navigation and help links.
- `src/components/sections/*.astro` — homepage decision journey.
- `src/components/commerce/*.astro` — cards and PDP presentation.
- `src/pages/index.astro` — homepage composition.
- `src/pages/finder/index.astro` — HeadBlade Fit entry and progressive enhancement shell.
- `src/pages/produkt/[slug].astro` — PDP composition.
- `src/styles/global.css` / `src/styles/accessibility.css` — Contour visual language, responsive behavior and accessibility states.
- `test/*.test.ts`, `e2e/review.spec.ts` — behavior, render-contract and browser regressions.

### New focused modules/files

- `src/lib/finder.ts` — pure explainable recommendation engine; no DOM and no user persistence.
- `src/data/decision-content.ts` — curated comparison/routine/guide facts used across homepage and authority routes.
- `src/components/brand/ContourLine.astro` — reusable decorative/semantic-free Contour Line SVG treatment.
- `src/components/commerce/DecisionCard.astro` — concise “best for / compatibility / nearest alternative” UI.
- `src/components/commerce/ComparisonTable.astro` — accessible static comparison table.
- `src/components/sections/ChooseSystem.astro` — MOTO vs ATX homepage decision block.
- `src/components/sections/ContourMechanics.astro` — product-mechanics explanation.
- `src/components/sections/ManualVsElectric.astro` — neutral use-case comparison teaser.
- `src/components/sections/HelpBeforeBuying.astro` — compatibility/help/legal decision links without invented fulfilment promises.
- `src/pages/vergleich/moto-vs-atx.astro`
- `src/pages/vergleich/hb4-vs-hb6.astro`
- `src/pages/vergleich/manuell-vs-elektrisch.astro`
- `src/pages/anleitungen/kopf-richtig-rasieren.astro`
- `src/pages/anleitungen/erste-kopfrasur.astro`
- `src/pages/anleitungen/kopfhaut-pflegen.astro`
- `test/finder.test.ts`
- `test/decision-content.test.ts`
- `test/contour-system-routes.test.ts`
- `test/structured-data-preview.test.ts`

---

### Task 1: Explainable HeadBlade Fit decision model

**Files:**
- Create: `src/lib/finder.ts`
- Create: `src/data/decision-content.ts`
- Create: `test/finder.test.ts`
- Create: `test/decision-content.test.ts`
- Modify: `src/pages/finder/index.astro`

**Interfaces:**
- Consumes: existing product slugs `headblade-moto`, `headblade-atx-package`, `klingenset-4blade`, `klingenset-6blade`, `moto-slick-bundle`.
- Produces:
  - `type Experience = "first" | "experienced"`
  - `type GuidancePreference = "guided" | "flexible"`
  - `type Need = "razor" | "blades" | "routine" | "starter"`
  - `type FinderAnswers = { experience: Experience; guidance: GuidancePreference; need: Need }`
  - `type FinderRecommendation = { primarySlug: string; alternativeSlug?: string; reasons: readonly string[]; nextHref: string }`
  - `recommendHeadBlade(answers: FinderAnswers): FinderRecommendation`
  - shared immutable arrays `motoAtxRows`, `hb4Hb6Rows`, `manualElectricRows`, `routineSteps`.

- [ ] **Step 1: Write the failing finder tests**

```ts
import { describe, expect, it } from "vitest";
import { recommendHeadBlade } from "../src/lib/finder";

describe("recommendHeadBlade", () => {
  it("recommends the ATX starter package for a first-time user asking for guided handling", () => {
    expect(recommendHeadBlade({ experience: "first", guidance: "guided", need: "starter" })).toEqual({
      primarySlug: "headblade-atx-package",
      alternativeSlug: "headblade-moto",
      reasons: [
        "ATX is the more guided starting point in the current HeadBlade range.",
        "The reviewed package already groups the ATX with HB4 blades.",
      ],
      nextHref: "/vergleich/moto-vs-atx",
    });
  });

  it("recommends MOTO for an experienced user prioritizing flexible contour following", () => {
    const result = recommendHeadBlade({ experience: "experienced", guidance: "flexible", need: "razor" });
    expect(result.primarySlug).toBe("headblade-moto");
    expect(result.alternativeSlug).toBe("headblade-atx-package");
    expect(result.nextHref).toBe("/vergleich/moto-vs-atx");
    expect(result.reasons).toContain("MOTO is the current contour-focused core product in the German review catalog.");
  });

  it("routes blade needs to compatibility guidance instead of inventing a razor recommendation", () => {
    const result = recommendHeadBlade({ experience: "experienced", guidance: "flexible", need: "blades" });
    expect(result.primarySlug).toBe("klingenset-4blade");
    expect(result.nextHref).toBe("/vergleich/hb4-vs-hb6");
    expect(result.reasons[0]).toMatch(/compatibility/i);
  });
});
```

- [ ] **Step 2: Verify RED in GitHub Actions**

Commit only the test files and push to the feature branch. Expected CI failure: module `../src/lib/finder` and/or `../src/data/decision-content` does not exist. Confirm failure is caused by missing production code, not syntax or dependency errors.

- [ ] **Step 3: Implement the pure decision engine and immutable content facts**

`finder.ts` must use explicit branches; no opaque scoring model. Blade/routine requests must route to the relevant content path. `decision-content.ts` stores only facts already supported by the approved spec/current catalog; competitor comparison wording must stay neutral.

- [ ] **Step 4: Replace the static finder page with a progressive-enhancement decision surface**

Render all three questions and all result destinations in initial HTML. A small inline script may update the visible recommendation client-side, but the default page must still contain direct links to MOTO vs ATX, HB4 vs HB6, Pflege and Sets. Do not add `<form>`, input fields that collect personal data, localStorage, cookies or analytics.

- [ ] **Step 5: Verify GREEN**

Expected: `npm test -- finder.test.ts decision-content.test.ts` passes in CI and the global preview validator still passes.

- [ ] **Step 6: Commit**

Commit message: `feat: add explainable HeadBlade Fit model`.

---

### Task 2: Contour visual system, navigation and homepage decision journey

**Files:**
- Create: `src/components/brand/ContourLine.astro`
- Create: `src/components/commerce/DecisionCard.astro`
- Create: `src/components/sections/ChooseSystem.astro`
- Create: `src/components/sections/ContourMechanics.astro`
- Create: `src/components/sections/ManualVsElectric.astro`
- Create: `src/components/sections/HelpBeforeBuying.astro`
- Modify: `src/components/layout/Header.astro`
- Modify: `src/components/layout/Footer.astro`
- Modify: `src/components/sections/HeroSection.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`
- Modify: `src/styles/accessibility.css`
- Modify: `test/homepage.test.ts`
- Modify: `test/accessibility-navigation.test.ts`

**Interfaces:**
- Consumes: `motoAtxRows`, `manualElectricRows`, `routineSteps` from Task 1 and existing `Product` objects.
- Produces: semantic homepage sections with stable test markers/classes: `.contour-line`, `.choose-system`, `.contour-mechanics`, `.manual-electric`, `.help-before-buying`.

- [ ] **Step 1: Extend homepage/navigation tests first**

Add assertions that the homepage source composes `ChooseSystem`, `ContourMechanics`, `ManualVsElectric`, `HelpBeforeBuying`; Header exposes top-level `Rasierer`, `Klingen`, `Pflege`, `Sets`, `Finder`, `So geht’s`, `Vergleichen`; `Lifestyle` is not a primary mobile navigation item. Add an assertion that `ContourLine.astro` exists and contains `aria-hidden="true"` so the signature graphic is not announced by screen readers.

- [ ] **Step 2: Verify RED**

Expected failure: missing components/new navigation labels.

- [ ] **Step 3: Implement the reusable Contour Line**

Use an inline SVG with `viewBox`, `preserveAspectRatio="none"`, `aria-hidden="true"`, `focusable="false"`. It must be styled through CSS custom properties and never contain product claims or essential text.

- [ ] **Step 4: Refactor navigation**

Desktop and mobile must prioritize product/customer tasks. `Sets` links to `/angebote`, `So geht’s` to `/anleitungen`, `Vergleichen` to `/vergleich/moto-vs-atx`. Keep the existing native `<details>` mobile pattern; no navigation JS.

- [ ] **Step 5: Recompose homepage**

Required order after banner/header:
1. Hero “Für deinen Kopf gebaut.”
2. three-second specialist explanation
3. Choose your HeadBlade (MOTO/ATX)
4. HeadBlade Fit entry
5. Contour mechanics
6. HB4/HB6 compatibility
7. routine
8. manual vs electric
9. products/sets
10. how-to
11. Help before buying
12. FAQ
13. final CTA

Omit unverified review/social-proof counters rather than using placeholders that could be mistaken for real proof.

- [ ] **Step 6: Implement Contour visual tokens**

Add `--contour-red`, `--graphite`, `--paper-warm`, `--steel-*`, controlled line widths and section curve classes. Do not add glow, parallax, auto-play or scroll-jacking. All motion must be transform/opacity only and disabled under `prefers-reduced-motion`.

- [ ] **Step 7: Verify GREEN**

Run full CI. Expected homepage/accessibility tests pass, preview validator remains green, Astro check has 0 errors.

- [ ] **Step 8: Commit**

Commit message: `feat: apply HeadBlade Contour homepage system`.

---

### Task 3: Static comparison routes that reduce decision friction

**Files:**
- Create: `src/components/commerce/ComparisonTable.astro`
- Create: `src/pages/vergleich/moto-vs-atx.astro`
- Create: `src/pages/vergleich/hb4-vs-hb6.astro`
- Create: `src/pages/vergleich/manuell-vs-elektrisch.astro`
- Create: `test/contour-system-routes.test.ts`
- Modify: `src/lib/routes.ts`
- Modify: `test/routes.test.ts`
- Modify: `src/pages/anleitungen/index.astro`

**Interfaces:**
- Consumes: `motoAtxRows`, `hb4Hb6Rows`, `manualElectricRows`.
- Produces: three static, crawl-ready production-candidate routes (still noindex in preview) with one primary user task each.

- [ ] **Step 1: Write route/render-contract tests**

```ts
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

describe("Contour System authority routes", () => {
  it.each([
    ["src/pages/vergleich/moto-vs-atx.astro", "MOTO oder ATX"],
    ["src/pages/vergleich/hb4-vs-hb6.astro", "HB4 oder HB6"],
    ["src/pages/vergleich/manuell-vs-elektrisch.astro", "manuell"],
  ])("provides %s with a clear customer decision heading", (path, phrase) => {
    expect(read(path).toLowerCase()).toContain(phrase.toLowerCase());
  });
});
```

Extend `routes.test.ts` so the stable route registry includes all three paths.

- [ ] **Step 2: Verify RED**

Expected failures: files/routes absent.

- [ ] **Step 3: Implement accessible `ComparisonTable.astro`**

Use a real `<table>` on larger screens with `<caption>`, column `<th scope="col">`, row `<th scope="row">`. On narrow screens allow horizontal overflow rather than destroying table semantics. No icon-only yes/no cells without text.

- [ ] **Step 4: Implement MOTO vs ATX page**

Required sections: early answer, “best for” cards, comparison table, handling explanation, compatibility, “choose MOTO if / choose ATX if”, finder link, relevant product links. Use only verified/current review facts; do not claim one is objectively closer, safer or faster unless sourced.

- [ ] **Step 5: Implement HB4 vs HB6 page**

Compatibility first, then blade-count/system distinctions that are actually verified. Explicitly state when adapter/model compatibility must be rechecked before production.

- [ ] **Step 6: Implement manual vs electric page**

Compare by control style, power dependency, maintenance model, replaceable blades/heads and learning preference without declaring a universal winner. Do not invent shaving-time, irritation or closeness metrics.

- [ ] **Step 7: Verify GREEN and commit**

Full CI must pass. Commit: `feat: add HeadBlade comparison guides`.

---

### Task 4: High-value authority guides, not SEO filler

**Files:**
- Create: `src/pages/anleitungen/kopf-richtig-rasieren.astro`
- Create: `src/pages/anleitungen/erste-kopfrasur.astro`
- Create: `src/pages/anleitungen/kopfhaut-pflegen.astro`
- Modify: `src/pages/anleitungen/index.astro`
- Modify: `src/lib/routes.ts`
- Modify: `test/content-routes.test.ts`
- Modify: `test/seo.test.ts`

**Interfaces:**
- Consumes: `routineSteps` and existing catalog links.
- Produces: three people-first authority pages with descriptive metadata and internal links.

- [ ] **Step 1: Write failing content tests**

Assert each new guide file exists; each has one explicit `BaseLayout` title/description; each links to at least one relevant product/category and one related authority page; `erste-kopfrasur` contains a visible non-medical caveat for persistent irritation/injury instead of giving diagnosis advice.

- [ ] **Step 2: Verify RED**

Expected missing-file failures.

- [ ] **Step 3: Implement `kopf-richtig-rasieren`**

Structure: concise answer; prepare; technique; direction/control; rinse/inspect; aftercare; common mistakes; relevant HeadBlade products; related guides. Avoid keyword repetition and arbitrary word count.

- [ ] **Step 4: Implement `erste-kopfrasur`**

Structure: expectations; preparation; first-pass technique; pressure/control caution; checking difficult contours; aftercare; when to stop and seek appropriate professional advice for persistent injury/skin problems. No medical claims.

- [ ] **Step 5: Implement `kopfhaut-pflegen`**

Structure: pre-shave preparation, during-shave glide, post-shave rinse/calm/protect concepts, product links where verified. Do not claim treatment/cure of skin conditions.

- [ ] **Step 6: Upgrade the guide index**

Make the three authority guides the primary cards. Existing generic guide copy becomes supporting context, not a duplicate thin page.

- [ ] **Step 7: Verify GREEN and commit**

Commit: `feat: add first-party head shaving authority guides`.

---

### Task 5: Decision-support product detail pages

**Files:**
- Modify: `src/data/products.ts`
- Modify: `src/components/commerce/ProductCard.astro`
- Modify: `src/components/commerce/ProductHero.astro`
- Create: `src/components/commerce/ProductDecisionSupport.astro`
- Create: `src/components/commerce/ProductMediaGallery.astro`
- Modify: `src/pages/produkt/[slug].astro`
- Modify: `test/catalog.test.ts`
- Modify: `test/media.test.ts`
- Modify: `e2e/review.spec.ts`

**Interfaces:**
- Extend `Product` with optional review-safe fields:
  - `bestFor?: readonly string[]`
  - `nearestAlternativeSlug?: string`
  - `usage?: readonly string[]`
  - `media?: readonly { src: string; alt: string; kind: "product" | "detail" | "context" }[]`
- Do not add GTIN/SKU/availability unless authoritative source data is actually present.

- [ ] **Step 1: Write failing catalog/media tests**

Require MOTO and ATX to have non-empty `bestFor`; require nearest alternatives to resolve to real products; require every media entry to have non-empty alt text and HTTPS URL; require MOTO product route source to include `ProductDecisionSupport` and `ProductMediaGallery`.

- [ ] **Step 2: Verify RED**

Expected: missing fields/components.

- [ ] **Step 3: Add review-safe decision metadata**

Only encode facts already present in the approved spec/current catalog. Avoid “perfect”, “best shave”, “prevents irritation”, “fastest” or similar unsupported claims.

- [ ] **Step 4: Implement media gallery**

Render first image as normal initial HTML with explicit dimensions and high fetch priority. Additional images use real thumbnail buttons/links only when multiple assets exist. No heavy carousel library. If only one image exists, render no fake gallery controls.

- [ ] **Step 5: Implement decision-support block**

Show “Passt zu dir, wenn …”, compatibility, nearest HeadBlade alternative, use guidance and comparison link. Keep checkout disabled state explicit but visually secondary to product understanding.

- [ ] **Step 6: Improve product cards**

Add concise “best for”/compatibility line where data exists while preserving one primary focus target per card.

- [ ] **Step 7: Verify browser behavior**

Playwright desktop/mobile must be able to navigate homepage -> MOTO PDP -> comparison -> back to catalog without hidden/duplicate card links.

- [ ] **Step 8: Commit**

Commit: `feat: strengthen product decision support`.

---

### Task 6: SEO, schema and Merchant-readiness without preview deception

**Files:**
- Create: `test/structured-data-preview.test.ts`
- Modify: `src/lib/schema.ts`
- Modify: `src/components/seo/SEOHead.astro`
- Modify: `src/lib/seo.ts`
- Modify: `test/seo.test.ts`
- Modify: `scripts/validate-preview.mjs`
- Modify: `test/validator.test.ts`

**Interfaces:**
- `buildProductJsonLd(product)` remains a preview-safe Product snippet description and must not return purchasable `offers` in review mode.
- New optional `buildArticleJsonLd(...)` may describe authority guides only with visible title/description/date facts.

- [ ] **Step 1: Write failing structured-data tests**

```ts
import { expect, it } from "vitest";
import { products } from "../src/data/products";
import { buildProductJsonLd } from "../src/lib/schema";

it("does not claim a purchasable Offer in review-mode Product JSON-LD", () => {
  const json = JSON.stringify(buildProductJsonLd(products[0]));
  expect(json).not.toContain('"offers"');
  expect(json).not.toContain('"availability"');
});
```

Add validator tests rejecting generated preview HTML containing `"@type":"Offer"`, checkout endpoints or customer forms.

- [ ] **Step 2: Verify RED if the current schema violates the contract**

If existing code is already compliant, make the first RED assertion target the new article/schema helper or validator behavior so the test demonstrably fails for missing behavior rather than manufacturing a false failure.

- [ ] **Step 3: Centralize route metadata**

Ensure comparison/guide pages have unique descriptive title/description and canonical-helper support while preview remains noindex.

- [ ] **Step 4: Harden schema**

Product JSON-LD: name, description, image, brand and URL only when truthful; no Offer. Breadcrumb JSON-LD stays synchronized with visible breadcrumbs. Authority Article JSON-LD only where visible metadata supports it.

- [ ] **Step 5: Harden preview validator**

Reject `<form`, payment providers, checkout/order submission language that implies completion, merchant Offer schema, production domain routes and missing noindex. Continue allowing Googlebot to fetch robots.txt.

- [ ] **Step 6: Verify GREEN and commit**

Commit: `feat: harden preview SEO and structured data truth`.

---

### Task 7: Accessibility, performance and browser regression gates

**Files:**
- Modify: `src/styles/accessibility.css`
- Modify: `src/styles/global.css`
- Modify: `e2e/review.spec.ts`
- Modify: `.lighthouserc.json` only if additional URLs are needed; do not lower existing thresholds.
- Modify: `test/accessibility-navigation.test.ts`
- Modify: `test/media.test.ts`

**Interfaces:**
- No new runtime dependency unless absolutely required; prefer native HTML/CSS.

- [ ] **Step 1: Add failing accessibility/browser assertions**

Require: skip link; one H1 per tested route; native mobile menu keyboard operation; comparison table caption; visible focus; finder result update does not trap focus; all product images have dimensions; first/LCP product image is not lazy-loaded; reduced-motion rule covers Contour animations.

- [ ] **Step 2: Verify RED for at least one new assertion**

Use browser smoke or source tests. Do not lower quality thresholds to obtain GREEN.

- [ ] **Step 3: Fix semantics and responsive edge cases**

Target 320px–1440px layouts, zoom/reflow, long German copy, horizontal comparison table scrolling with preserved semantics, 44px practical touch targets and focus visibility.

- [ ] **Step 4: Performance pass**

No new hydration except finder progressive enhancement. LCP image remains explicit dimensions + eager/high priority only for true above-fold image; below-fold images lazy. Avoid CSS background image as the hero LCP source. No third-party scripts.

- [ ] **Step 5: Full verification**

Required green: CI, Security, desktop/mobile Playwright, Lighthouse. Any SEO/accessibility score below configured threshold is a defect; fix the implementation, not the threshold.

- [ ] **Step 6: Commit**

Commit: `test: enforce Contour System quality gates`.

---

### Task 8: Documentation, Drive truth and Cloudflare owner-review preview

**Files:**
- Modify: `docs/superpowers/specs/2026-09-04-headblade-contour-system-design.md` status to implementation-complete only after verification.
- Modify: `docs/runbooks/PREVIEW_RELEASE.md`
- Modify: `docs/runbooks/OWNER_REVIEW_CHECKLIST.md`
- Modify: `docs/REVIEW_STATUS.md`
- Modify: `README.md`
- Update Google Drive `PROJECT_STATE — HeadBlade Germany — CURRENT` in place.

**Interfaces:**
- Review worker remains `headblade-germany-review`.
- Normal review deployment uses `wrangler versions upload --preview-alias review`; first worker bootstrap may use the explicitly manual bootstrap path only if Cloudflare reports the worker does not yet exist.

- [ ] **Step 1: Freshly verify final branch and all GitHub checks**

Record final SHA. Require CI, Security, Browser Smoke and Lighthouse success for that SHA.

- [ ] **Step 2: Update documentation with factual final state**

Document actual route count, actual tests, Contour System components and known production blockers (asset rights, authoritative commerce data, legal/fulfilment verification). No aspirational “done” statements without evidence.

- [ ] **Step 3: Update Drive current state in place**

Set phase to `CONTOUR_IMPLEMENTED__PREVIEW_VERIFICATION` while deployment is pending, then `PREVIEW_READY_FOR_OWNER_REVIEW` only after endpoint verification. Keep superseded files historical.

- [ ] **Step 4: Trigger isolated Cloudflare review deployment**

Use the existing GitHub workflow and current repository secrets. If Cloudflare authentication still fails, classify the exact credential/permission error and stop short of claiming preview completion; do not touch production/DNS.

- [ ] **Step 5: Verify the public endpoint**

Require HTTP 200 plus `X-Robots-Tag` containing `noindex` and HTML robots meta containing `noindex`. Spot-check homepage, finder, MOTO vs ATX, HB4 vs HB6, one guide and one PDP.

- [ ] **Step 6: Final owner-review handoff**

Provide the real `workers.dev` preview URL, final SHA, passing checks, explicit production blockers and the statement that `headblade.info`/DNS remain unchanged.

- [ ] **Step 7: Commit docs only if changes are still pending**

Commit: `docs: finalize Contour System owner-review handoff`.

---

## Pre-flight task interaction scan

| Tasks | Shared interface/file | Ruling |
|---|---|---|
| 1 -> 2 | `decision-content.ts` feeds homepage sections | Task 1 owns data shape; Task 2 consumes it without redefining facts. |
| 1 -> 3 | comparison arrays feed three routes | Task 3 renders only Task 1 facts and may not add unsourced assertions. |
| 1 -> 5 | finder/product slugs and alternatives | Product slugs stay stable; Task 5 validates every alternative slug resolves. |
| 2 -> 7 | `global.css`, accessibility and motion | Task 2 creates visual rules; Task 7 may refine only for measured accessibility/performance defects without changing the approved visual concept. |
| 3 -> 6 | comparison metadata and breadcrumbs | Task 6 centralizes SEO/schema only; it must not alter comparison conclusions. |
| 4 -> 6 | authority page metadata/article schema | Visible page text is authority; structured data must match it exactly. |
| 5 -> 6 | Product JSON-LD | PDP may display price for owner review, but Task 6 must not convert this into merchant `Offer` schema. |
| 5 -> 7 | product gallery / LCP | Task 5 owns gallery behavior; Task 7 may optimize loading attributes while preserving first-image initial HTML. |
| 6 -> 8 | preview safety and deployment verification | Deployment cannot be called successful unless the exact headers/meta contract from Task 6 passes on the public endpoint. |

## Self-review against the approved spec

- Competitive differentiation / specialist positioning: Tasks 2–5.
- HeadBlade Red Contour Line: Task 2.
- Product-first mobile navigation: Task 2.
- HeadBlade Fit: Task 1.
- MOTO vs ATX / HB4 vs HB6 / manual vs electric: Task 3.
- Routine and authority content: Tasks 2 and 4.
- Product-page decision support/media: Task 5.
- People-first SEO/AI-search, no GEO hacks: Tasks 4 and 6.
- Merchant readiness without preview deception: Task 6.
- Native accessibility / BFSG-oriented quality: Task 7.
- Core Web Vitals/static-first discipline: Task 7.
- Shareable utility without gimmicks: Tasks 2–4 via comparison/routine/finder surfaces; no tracking or social SDK is required in preview.
- Cloudflare isolation and owner review: Task 8.
- Drive/GitHub single truth: Task 8.

Placeholder scan: no `TBD`, `TODO`, “implement later”, unspecified error-handling instructions or undefined production interfaces remain in this plan.
