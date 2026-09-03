# HeadBlade Germany Review Status

Current delivery mode: isolated public review preview.

Production domain: `https://www.headblade.info/` — unchanged and out of scope until separate explicit owner approval.

The review branch contains the Astro/TypeScript/Tailwind redesign, typed catalog data, product/category/content routes, preview safety enforcement, CI/security/Lighthouse gates, desktop/mobile Playwright smoke tests, Cloudflare Workers Static Assets configuration, and review/rollback/production-gate runbooks.

The only external deployment prerequisite is authenticated Cloudflare access for the review Worker. The GitHub deployment workflow fails closed when the required Cloudflare credentials are absent.
