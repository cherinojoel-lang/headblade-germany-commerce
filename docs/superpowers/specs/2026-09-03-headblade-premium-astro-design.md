# HeadBlade Germany Premium Astro Design

**Date:** 2026-09-03
**Status:** Approved after Exa + Context7 + GitHub verification
**Target:** Public review preview only. Production `https://www.headblade.info/` remains untouched until a later explicit owner gate.

## 1. Goal

Rebuild the current HeadBlade Germany review prototype as a production-grade, static Astro storefront/catalog preview with the engineering discipline proven in HSB-Boden, but with an original HeadBlade premium DTC visual language.

The immediate success state is:

`PREVIEW_READY_FOR_OWNER_REVIEW`

The preview must be visually polished, mobile-first, technically robust, fast, accessible, testable, and deployable as Cloudflare Workers Static Assets. It must not create orders, collect customer data, initialize payment providers, activate analytics, or modify the production domain.

## 2. Verified architecture decision

Use:

- Astro 7
- TypeScript strict mode
- Tailwind CSS 4
- Static output / prerendered pages
- Vitest for domain/rendering/SEO tests
- Playwright for browser smoke tests when a browser runtime is available
- Lighthouse CI thresholds aligned with HSB-Boden
- Cloudflare Workers Static Assets
- GitHub feature branch + CI gates

Do **not** use the Astro Cloudflare adapter while all routes remain fully static. Current Astro and Cloudflare documentation both confirm that a fully prerendered Astro site can be built to `dist/` and uploaded directly as Workers Static Assets without a Worker entrypoint.

HSB-Boden remains the reference for project organization, quality gates, accessibility patterns, SEO centralization, preview/production separation, and release discipline. Its historical Cloudflare Pages deployment target is intentionally **not** copied because Cloudflare now recommends Workers Static Assets for new projects.

## 3. Repository structure

```text
src/
  components/
    commerce/
    layout/
    sections/
    seo/
  data/
    products.ts
    categories.ts
    site.ts
  layouts/
    BaseLayout.astro
  lib/
    catalog.ts
    seo.ts
    schema.ts
    preview.ts
  pages/
    index.astro
    produkte/index.astro
    rasierer/index.astro
    klingen-zubehoer/index.astro
    pflege/index.astro
    angebote/index.astro
    finder/index.astro
    anleitungen/index.astro
    produkt/[slug].astro
    impressum/index.astro
    datenschutz/index.astro
    404.astro
  styles/
    global.css
public/
  brand/
  media/
  robots.txt
  _headers
```

Each unit has one responsibility. Product data is isolated from presentation. Layout owns page shell and global preview behavior. SEO and structured data are centralized. Components are small and independently understandable.

## 4. Visual direction

The site must look like a premium shaving/head-care brand rather than a generic template.

### Palette

- Near-black / graphite as primary brand field
- White / warm off-white as content field
- HeadBlade red as primary action/accent
- Neutral steel grays for supporting text
- No decorative acid-green palette from the earlier prototype

### Typography

- Strong, compact display headings
- High legibility body text
- Locally bundled font assets only
- Responsive type scale and balanced line lengths

### UI principles

- Strong editorial hierarchy
- Product-led imagery
- Large whitespace and deliberate rhythm
- Minimal radii; no excessive pill UI
- Clear hover/focus/active states
- Motion limited to subtle opacity/translate/scale and disabled for `prefers-reduced-motion`
- Mobile layout designed independently, not merely compressed desktop

## 5. Homepage information architecture

1. Preview safety banner
2. Header/navigation
3. Hero: HeadBlade MOTO as visual anchor
4. Brand/product promise strip
5. Bestseller grid
6. MOTO product spotlight
7. HB4/HB6 compatibility explainer
8. Product finder teaser
9. Why HeadBlade / head-shaving benefits
10. Shaving routine / how-to sequence
11. Bundles and offer cards
12. Trust/service strip
13. FAQ
14. Final catalog CTA
15. Footer with legal and contact information

The page must make the product category understandable in seconds and lead users from discovery to product comparison without a live checkout.

## 6. Product/catalog model

Use typed product data with at minimum:

```ts
export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  price: number | null;
  compareAtPrice?: number;
  shortDescription: string;
  description: string;
  compatibility: string[];
  highlights: string[];
  image: string;
  imageAlt: string;
  badge?: string;
};
```

The verified public HeadBlade Germany product names/prices already collected on 2026-09-03 remain the review seed data. Before production, remote image hotlinks must be replaced by approved local first-party assets and all prices/rechtliche Angaben revalidated.

## 7. Product detail pages

Each product route includes:

- breadcrumb
- large product image/visual
- name, price and optional compare-at price
- review-preview purchase-state block instead of buy button
- compatibility
- product benefits
- use/application guidance
- related products
- structured Product/Breadcrumb JSON-LD where data is complete enough for preview rendering

No form, basket state, payment provider, order submission or customer-data field exists in this preview phase.

## 8. SEO and indexing

Reuse HSB-Boden's centralized SEO pattern but configure review-safe behavior:

- descriptive title and meta description per route
- OpenGraph and Twitter cards
- canonical helper exists, but preview pages default to `noindex,nofollow,noarchive`
- `robots.txt` disallows crawling in review mode
- JSON-LD sanitized before output
- breadcrumb schema on product/category pages
- Product schema only from explicit verified fields
- final production indexing is a separate release task

## 9. Accessibility

Required patterns:

- semantic landmarks
- skip link
- keyboard-operable navigation
- visible focus state
- color contrast suitable for WCAG AA
- meaningful image alt text
- touch targets >= 44px where practical
- no essential information conveyed only through color
- reduced-motion support

Lighthouse CI target:

- accessibility >= 0.95 (error)
- SEO >= 0.95 (error)
- best practices >= 0.95 (warn)
- performance >= 0.90 (warn)

## 10. Performance

- static HTML by default
- zero client JS for sections that do not need it
- no framework hydration unless interactive behavior requires it
- local fonts
- responsive images / explicit dimensions
- eager/fetchpriority only for true LCP content
- lazy loading below the fold
- no third-party analytics/tracking in review

## 11. Preview safety contract

The review build must fail validation if it detects:

- `<form>` or customer-data fields
- Stripe, PayPal, Klarna or another payment provider
- live checkout/order wording that implies a transaction can complete
- missing `noindex` preview directive
- missing robots disallow
- production domain routing/deployment configuration

Visible UI must clearly state that checkout/order/payment functions are disabled in review mode.

## 12. CI and security

Follow the HSB-Boden gate pattern with a reduced, relevant set:

- install with `npm ci`
- Astro/TypeScript check
- Vitest
- production build
- preview-safety validator
- Lighthouse CI
- secret scanning
- dependency review on pull requests

Production deploy remains manual/owner-gated and is not part of this implementation.

## 13. Cloudflare deployment

Use Workers Static Assets:

```jsonc
{
  "name": "headblade-germany-review",
  "compatibility_date": "2026-09-03",
  "workers_dev": true,
  "preview_urls": true,
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  }
}
```

First project creation/deployment uses `wrangler deploy`. Subsequent review versions may use `wrangler versions upload --preview-alias review` when supported by the configured project/workflow.

No custom production domain is configured in this phase.

## 14. Acceptance criteria

The feature branch is review-ready only when all of the following are evidenced:

1. Astro/TypeScript check passes.
2. Unit/component/domain tests pass.
3. Static build succeeds.
4. Preview-safety validator passes.
5. All declared routes render in the build.
6. No checkout/payment/form collection is present.
7. `noindex` and robots blocking are present.
8. CI is green on the feature branch/PR.
9. Lighthouse meets the configured thresholds when the environment can execute Chromium.
10. A Cloudflare preview URL is verified before it is presented as ready.
11. `headblade.info` production remains unchanged.
