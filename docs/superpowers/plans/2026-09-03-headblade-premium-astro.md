# HeadBlade Premium Astro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current hand-written review SPA with a premium static Astro storefront/catalog preview that follows HSB-Boden's engineering discipline while remaining safely isolated from production commerce.

**Architecture:** Astro 7 statically prerenders every route from typed product/category data. Shared layouts/components centralize SEO, preview safety, accessibility and visual consistency. Cloudflare Workers Static Assets serves `dist/`; production remains manual and out of scope.

**Tech Stack:** Astro 7, TypeScript, Tailwind CSS 4, Vitest, Playwright, Lighthouse CI, Wrangler 4, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-03-headblade-premium-astro-design.md`

## Global Constraints

- Production `https://www.headblade.info/` is read-only and must not be deployed to or reconfigured.
- Review routes are `noindex,nofollow,noarchive`.
- No forms, customer-data collection, cart state, checkout, order submission, payment providers, analytics or advertising scripts.
- Use Cloudflare Workers Static Assets, not Pages, for this new project.
- Use static Astro output; no Cloudflare adapter while SSR is unnecessary.
- Preserve verified 2026-09-03 review product names/prices; production values require later revalidation.
- Remote image hotlinks are temporary review assets only and must not be treated as production-ready.
- TDD red-green-refactor is mandatory for behavior changes.

---

### Task 1: Establish Astro build foundation and preview contract

**Files:**
- Modify: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Modify: `wrangler.jsonc`
- Create: `src/env.d.ts`
- Create: `src/lib/preview.ts`
- Create: `test/preview.test.ts`

**Interfaces:**
- Produces: `PREVIEW_MODE: true`, `previewRobots(): string`, Astro static build to `dist/`.
- Consumes: none.

- [ ] **Step 1: Write failing preview contract tests**

```ts
import { describe, expect, it } from "vitest";
import { PREVIEW_MODE, previewRobots } from "../src/lib/preview";

describe("review preview contract", () => {
  it("keeps preview mode permanently enabled in this branch", () => {
    expect(PREVIEW_MODE).toBe(true);
  });

  it("blocks indexing", () => {
    expect(previewRobots()).toBe("noindex,nofollow,noarchive,nosnippet");
  });
});
```

- [ ] **Step 2: Run `npm test -- test/preview.test.ts` and verify RED because the module does not exist.**
- [ ] **Step 3: Add Astro/TypeScript/Tailwind/Vitest/Wrangler dependencies and scripts:**

```json
{
  "scripts": {
    "dev": "astro dev",
    "check": "astro check",
    "test": "vitest run",
    "build": "astro build",
    "validate:preview": "node scripts/validate-preview.mjs",
    "verify": "npm run check && npm test && npm run build && npm run validate:preview",
    "cf:first-deploy": "npm run build && wrangler deploy",
    "cf:preview": "npm run build && wrangler versions upload --preview-alias review"
  }
}
```

- [ ] **Step 4: Implement `src/lib/preview.ts` minimally:**

```ts
export const PREVIEW_MODE = true as const;
export const previewRobots = () => "noindex,nofollow,noarchive,nosnippet";
```

- [ ] **Step 5: Configure Astro static output and Wrangler assets directory `./dist`, `preview_urls: true`, `workers_dev: true`, `not_found_handling: "404-page"`.**
- [ ] **Step 6: Run the test and verify GREEN.**
- [ ] **Step 7: Run `npm run check` and `npm run build`.**
- [ ] **Step 8: Commit `feat: establish Astro static preview foundation`.**

### Task 2: Create typed catalog domain

**Files:**
- Create: `src/data/site.ts`
- Create: `src/data/categories.ts`
- Create: `src/data/products.ts`
- Create: `src/lib/catalog.ts`
- Replace: `test/domain.test.mjs` with `test/catalog.test.ts`

**Interfaces:**
- Produces: `Product`, `ProductCategory`, `products`, `categories`, `getProduct(slug)`, `productsByCategory(category)`, `searchProducts(query)`, `formatPrice(price)`.
- Consumes: verified review seed products/prices from the existing prototype.

- [ ] **Step 1: Write failing tests for price formatting, product lookup, HB4/HB6 compatibility search, category filtering and unknown slug handling.**
- [ ] **Step 2: Run `npm test -- test/catalog.test.ts` and verify RED.**
- [ ] **Step 3: Define exact typed product/category contracts and seed data.**
- [ ] **Step 4: Implement catalog helpers with normalized lowercase search over name, short description and compatibility.**
- [ ] **Step 5: Run targeted tests and verify GREEN.**
- [ ] **Step 6: Run all tests.**
- [ ] **Step 7: Commit `feat: add typed HeadBlade catalog domain`.**

### Task 3: Build SEO, schema and shared page shell

**Files:**
- Create: `src/lib/seo.ts`
- Create: `src/lib/schema.ts`
- Create: `src/components/seo/SEOHead.astro`
- Create: `src/components/layout/PreviewBanner.astro`
- Create: `src/components/layout/Header.astro`
- Create: `src/components/layout/Footer.astro`
- Create: `src/layouts/BaseLayout.astro`
- Create: `test/seo.test.ts`

**Interfaces:**
- Produces: `pageTitle()`, `canonicalForPreview()`, `sanitizeJsonLd()`, `buildProductJsonLd()`, `buildBreadcrumbJsonLd()` and `BaseLayout`.
- Consumes: `previewRobots()`, site metadata, product domain.

- [ ] **Step 1: Write failing tests asserting preview robots value, title formatting, JSON-LD `<` escaping and omission of incomplete Product fields.**
- [ ] **Step 2: Verify RED.**
- [ ] **Step 3: Implement SEO helpers and schema builders.**
- [ ] **Step 4: Build `SEOHead.astro` with title, description, robots, OG/Twitter and sanitized JSON-LD.**
- [ ] **Step 5: Build accessible shell with skip link, header, main landmark, footer and visible preview banner.**
- [ ] **Step 6: Verify tests GREEN and run Astro check.**
- [ ] **Step 7: Commit `feat: add SEO and accessible review shell`.**

### Task 4: Establish HeadBlade visual design system

**Files:**
- Create: `src/styles/global.css`
- Create: `tailwind.config.mjs`
- Create: `src/components/commerce/ProductCard.astro`
- Create: `src/components/sections/SectionHeading.astro`
- Create: `test/rendering.test.ts`

**Interfaces:**
- Produces: reusable typography, spacing, buttons, surfaces, product cards and motion utilities.
- Consumes: product domain.

- [ ] **Step 1: Write failing rendering tests that render `ProductCard` and assert product name, formatted price, image alt and review-safe product link while forbidding payment wording.**
- [ ] **Step 2: Verify RED.**
- [ ] **Step 3: Implement design tokens: graphite/black, warm white, HeadBlade red, steel neutrals, 1180-1240px content width, restrained radius and shadow scale.**
- [ ] **Step 4: Add responsive heading/body scales, visible focus styles, 44px touch targets and reduced-motion overrides.**
- [ ] **Step 5: Implement `ProductCard` and `SectionHeading`.**
- [ ] **Step 6: Verify tests GREEN and build.**
- [ ] **Step 7: Commit `feat: establish HeadBlade premium design system`.**

### Task 5: Build premium homepage sections

**Files:**
- Create: `src/components/sections/HeroSection.astro`
- Create: `src/components/sections/PromiseStrip.astro`
- Create: `src/components/sections/BestsellerGrid.astro`
- Create: `src/components/sections/MotoSpotlight.astro`
- Create: `src/components/sections/CompatibilitySection.astro`
- Create: `src/components/sections/FinderTeaser.astro`
- Create: `src/components/sections/WhyHeadBlade.astro`
- Create: `src/components/sections/RoutineSection.astro`
- Create: `src/components/sections/OfferGrid.astro`
- Create: `src/components/sections/TrustStrip.astro`
- Create: `src/components/sections/FaqSection.astro`
- Create: `src/components/sections/FinalCTA.astro`
- Create: `src/pages/index.astro`
- Create: `test/homepage.test.ts`

**Interfaces:**
- Produces: complete homepage composition.
- Consumes: catalog, BaseLayout, ProductCard, SectionHeading.

- [ ] **Step 1: Write failing homepage render test asserting hero copy, MOTO, bestseller section, compatibility, routine, FAQ, final CTA and visible preview safety copy.**
- [ ] **Step 2: Verify RED.**
- [ ] **Step 3: Implement each section as an isolated Astro component with semantic headings and minimal/no client JS.**
- [ ] **Step 4: Compose homepage in the exact information order from the design spec.**
- [ ] **Step 5: Verify test GREEN, Astro check and build.**
- [ ] **Step 6: Commit `feat: build premium HeadBlade homepage`.**

### Task 6: Build catalog, categories and product pages

**Files:**
- Create: `src/pages/produkte/index.astro`
- Create: `src/pages/rasierer/index.astro`
- Create: `src/pages/klingen-zubehoer/index.astro`
- Create: `src/pages/pflege/index.astro`
- Create: `src/pages/angebote/index.astro`
- Create: `src/pages/produkt/[slug].astro`
- Create: `src/components/commerce/ProductGrid.astro`
- Create: `src/components/commerce/ProductHero.astro`
- Create: `src/components/commerce/CompatibilityCard.astro`
- Create: `src/components/commerce/RelatedProducts.astro`
- Create: `test/routes.test.ts`

**Interfaces:**
- Produces: all product/category static routes via `getStaticPaths()`.
- Consumes: catalog and schema helpers.

- [ ] **Step 1: Write failing route tests asserting every product slug maps to a generated route and category paths contain only matching products.**
- [ ] **Step 2: Verify RED.**
- [ ] **Step 3: Implement product/category components and static routes.**
- [ ] **Step 4: Product detail must show `Review-Preview: Checkout bewusst deaktiviert` instead of a transactional CTA.**
- [ ] **Step 5: Build and inspect generated route list in `dist/`.**
- [ ] **Step 6: Verify tests GREEN.**
- [ ] **Step 7: Commit `feat: add catalog and product detail routes`.**

### Task 7: Build finder, guide, legal and 404 routes

**Files:**
- Create: `src/pages/finder/index.astro`
- Create: `src/pages/anleitungen/index.astro`
- Create: `src/pages/impressum/index.astro`
- Create: `src/pages/datenschutz/index.astro`
- Create: `src/pages/404.astro`
- Create: `test/content-routes.test.ts`

**Interfaces:**
- Produces: informational routes without customer-data collection.
- Consumes: site metadata and catalog.

- [ ] **Step 1: Write failing content-route tests for required headings/contact/legal identity and absence of forms.**
- [ ] **Step 2: Verify RED.**
- [ ] **Step 3: Implement a no-input finder matrix that links users to product categories based on stated needs; do not store user answers.**
- [ ] **Step 4: Implement guide/how-it-works content and legal preview pages.**
- [ ] **Step 5: Implement branded 404.**
- [ ] **Step 6: Verify tests GREEN and build.**
- [ ] **Step 7: Commit `feat: add finder guide and legal routes`.**

### Task 8: Add hard preview-safety validator and headers

**Files:**
- Replace: `scripts/validate.mjs` with `scripts/validate-preview.mjs`
- Create: `public/robots.txt`
- Create: `public/_headers`
- Create: `test/validator.test.ts`

**Interfaces:**
- Produces: command `npm run validate:preview` that exits non-zero on contract violations.
- Consumes: built `dist/`.

- [ ] **Step 1: Write failing validator tests using fixture HTML containing a form, payment provider, missing robots directive and production-domain deployment config.**
- [ ] **Step 2: Verify RED.**
- [ ] **Step 3: Implement recursive scan of generated HTML/JS/config output for forbidden patterns.**
- [ ] **Step 4: Add robots disallow and security headers appropriate to a public static preview.**
- [ ] **Step 5: Run build then validator and verify GREEN.**
- [ ] **Step 6: Commit `test: enforce review preview safety contract`.**

### Task 9: Add CI, security and Lighthouse gates

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `.github/workflows/security.yml`
- Create: `.github/workflows/lighthouse.yml`
- Create: `.lighthouserc.json`

**Interfaces:**
- Produces: independent GitHub checks for build/test, security and Lighthouse.
- Consumes: npm scripts from prior tasks.

- [ ] **Step 1: Add CI workflow with pinned checkout/setup-node actions, Node 22, `npm ci`, `npm run check`, `npm test`, `npm run build`, `npm run validate:preview`.**
- [ ] **Step 2: Add secret-scanning workflow and PR dependency review aligned with HSB-Boden.**
- [ ] **Step 3: Add Lighthouse thresholds: performance 0.90 warn, accessibility 0.95 error, best-practices 0.95 warn, SEO 0.95 error.**
- [ ] **Step 4: Validate YAML locally where possible and run full `npm run verify`.**
- [ ] **Step 5: Commit `ci: add HeadBlade quality and security gates`.**

### Task 10: Final verification and review PR

**Files:**
- Modify: `README.md`
- No production deployment files or DNS changes.

**Interfaces:**
- Produces: owner-reviewable PR and verified deployment instructions.
- Consumes: all prior tasks.

- [ ] **Step 1: Document local commands, preview safety boundary, Cloudflare Workers first-deploy and subsequent preview-version commands.**
- [ ] **Step 2: Run fresh `npm ci`, `npm run check`, `npm test`, `npm run build`, `npm run validate:preview`.**
- [ ] **Step 3: Inspect generated route tree and grep for forms/payment providers/production deployment references.**
- [ ] **Step 4: Push/commit all feature work to `feat/astro-headblade-premium`.**
- [ ] **Step 5: Open a draft PR against `main` with exact verification evidence and explicit statement that production remains untouched.**
- [ ] **Step 6: Wait for GitHub CI and inspect every required check. Do not claim completion until all applicable checks are green.**
- [ ] **Step 7: If Cloudflare GitHub integration is available, obtain and verify the public preview URL. If it is not connected, stop at the single owner-only Cloudflare authorization gate rather than inventing a URL.**
