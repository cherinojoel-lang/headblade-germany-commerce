# HeadBlade Germany Motion Lab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the HSB-like Contour visual treatment with the approved HeadBlade-specific Motion Lab experience while preserving the proven Astro/Cloudflare, accessibility, SEO, preview-safety and product-decision architecture.

**Architecture:** Keep Astro static-first and the existing typed catalog. Motion Lab is implemented as a product-led visual layer and focused component refactor: true-white/light product stages, real current HeadBlade Germany review assets, product-derived geometry, clearer MOTO/ATX and HB4/HB6 decision support, restrained motion and no additional client framework. Existing comparison, finder, guide and safety routes remain intact unless a test proves a required adjustment.

**Tech Stack:** Astro 7, TypeScript, Tailwind CSS 4, Vitest, Playwright, Lighthouse CI, Cloudflare Workers Static Assets, Wrangler versions preview.

**Spec:** `docs/superpowers/specs/2026-09-04-headblade-motion-lab-design.md`

## Global Constraints

- `main`, `headblade.info`, production DNS and production traffic remain untouched.
- Review remains `noindex`, non-transactional and without customer-data collection, analytics or ads.
- Use only verified product facts and current `headblade.info` review image references already represented in the catalog.
- No fake reviews, fake urgency, fake stock, invented shipping or unsupported medical/performance claims.
- No HSB-Boden visual language: no dark corporate split hero, no repeated red eyebrow system, no industrial card-grid rhythm.
- Motion must be finite, functional, compositor-friendly and fully disabled by `prefers-reduced-motion`.
- Preserve semantic HTML, keyboard navigation, focus visibility and existing preview-safety gates.
- Preview deploy remains `wrangler versions upload`; no production deploy or route change.

---

### Task 1: Motion Lab visual contract

**Files:**
- Create: `test/motion-lab.test.ts`
- Create: `src/styles/motion-lab.css`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`

**Interfaces:**
- Produces CSS tokens/classes used by homepage, header, product cards and product detail pages.
- Preserves existing global accessibility and structural classes.

- [ ] **Step 1:** Add source-contract tests asserting Motion Lab is imported, the hero is light/product-led, public copy does not expose the internal label, real product media remains sourced from `headblade.info`, and reduced-motion rules exist.
- [ ] **Step 2:** Run CI and confirm RED against the pre-Motion-Lab implementation.
- [ ] **Step 3:** Implement the Motion Lab tokens, type hierarchy, true-white/light product stage, red/silver product-motion geometry and finite motion.
- [ ] **Step 4:** Run CI and confirm GREEN.
- [ ] **Step 5:** Commit.

### Task 2: Product-led first viewport and navigation

**Files:**
- Modify: `src/components/layout/Header.astro`
- Modify: `src/components/sections/HeroSection.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Hero consumes existing `Product` image/detailImage.
- Navigation preserves all current destination routes.

- [ ] **Step 1:** Add/extend tests for no public Motion Lab/Contour label, one dominant H1, real MOTO media, product-first CTAs and mobile navigation.
- [ ] **Step 2:** Verify RED.
- [ ] **Step 3:** Implement white product-studio hero with MOTO image, engineering arc, concise copy and MOTO/compare CTAs; simplify header chrome.
- [ ] **Step 4:** Verify unit/build/preview-safety GREEN.
- [ ] **Step 5:** Commit.

### Task 3: MOTO/ATX and blade decision surfaces

**Files:**
- Modify: `src/components/sections/ChooseSystem.astro`
- Modify: `src/components/sections/CompatibilitySection.astro`
- Modify: `src/components/commerce/DecisionCard.astro` or replace its usage with product-specific markup.

**Interfaces:**
- Uses `getProduct()` canonical catalog records.
- Surfaces image, handling/use-case distinction, compatibility and direct comparison routes.

- [ ] **Step 1:** Test that MOTO and ATX are represented with their real catalog image sources and that HB4/HB6 compatibility is visible before generic benefits.
- [ ] **Step 2:** Verify RED.
- [ ] **Step 3:** Implement asymmetric product comparison layout and blade rail without generic card-grid styling.
- [ ] **Step 4:** Verify GREEN.
- [ ] **Step 5:** Commit.

### Task 4: Routine, authority and product-story rhythm

**Files:**
- Modify: `src/components/sections/RoutineSection.astro`
- Modify: `src/components/sections/WhyHeadBlade.astro`
- Modify: `src/components/sections/BestsellerGrid.astro`
- Modify: `src/components/sections/HelpBeforeBuying.astro`

**Interfaces:**
- Uses existing routes and catalog; no new unverified content sources.

- [ ] **Step 1:** Test for integrated routine/guide links and absence of fake proof/urgency.
- [ ] **Step 2:** Verify RED where needed.
- [ ] **Step 3:** Implement editorial open-layout bands, product-image rail and first-party design story.
- [ ] **Step 4:** Verify GREEN.
- [ ] **Step 5:** Commit.

### Task 5: Product detail Motion Lab treatment

**Files:**
- Modify: `src/pages/produkt/[slug].astro`
- Modify existing PDP styles in `src/styles/motion-lab.css`.

**Interfaces:**
- Product media array stays canonical.
- Review mode remains purchase-disabled and emits no Merchant `Offer`.

- [ ] **Step 1:** Test gallery thumbnails, decision support, compatibility, nearest alternative and no active purchase controls.
- [ ] **Step 2:** Verify RED only for new visual/source contracts.
- [ ] **Step 3:** Implement large light gallery, scannable decision panel and product mechanics hierarchy.
- [ ] **Step 4:** Verify GREEN.
- [ ] **Step 5:** Commit.

### Task 6: Browser, SEO, performance and preview completion

**Files:**
- Modify: `playwright.config.ts` and/or `e2e/*.spec.ts` only if WebKit/Firefox coverage is not already present.
- Modify docs/status files only after verified results.

**Interfaces:**
- CI, Security, Browser Smoke, Lighthouse and Preview validator are release gates.
- Cloudflare review deploy must return a real `workers.dev` endpoint with HTTP 200, HTML `noindex`, and `X-Robots-Tag: noindex`.

- [ ] **Step 1:** Run complete CI/Security/Lighthouse/desktop/mobile browser checks on the final code SHA.
- [ ] **Step 2:** Add WebKit/iPhone and Firefox coverage if absent; rerun until GREEN or record a platform-specific external blocker without weakening tests.
- [ ] **Step 3:** Run isolated Cloudflare review deployment using `wrangler versions upload` and verify endpoint headers/body.
- [ ] **Step 4:** Update PR #1 summary and review runbooks with exact final SHA and evidence.
- [ ] **Step 5:** Update the existing canonical Google Drive `PROJECT_STATE — HeadBlade Germany — CURRENT` in place and verify same-ID readback.

## Self-review

- Spec coverage: visual identity, product imagery, decision support, mobile, accessibility, SEO, performance, preview safety and deployment are mapped to Tasks 1–6.
- No placeholders/TODOs are permitted in implementation.
- No production merge/DNS/checkout action is part of this plan.
- The design uses real current HeadBlade Germany review imagery and keeps competitor material as research only.
