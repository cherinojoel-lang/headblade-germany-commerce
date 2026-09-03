# HeadBlade Germany — Review Preview Release

Status target: `PREVIEW_READY_FOR_OWNER_REVIEW`

## Safety boundary

The public review preview is isolated from production.

- `https://www.headblade.info/` remains untouched until explicit owner approval.
- No production DNS/domain changes.
- No checkout, payment provider, order creation, customer form, or customer-data collection.
- Preview indexing is blocked with robots metadata, `robots.txt`, and `X-Robots-Tag` headers.
- Analytics and advertising integrations are disabled in review mode.

## Required gates

Before a preview URL is shared, the exact deployed commit must pass:

1. `npm ci`
2. `npm run check`
3. `npm test`
4. `npm run build`
5. `npm run validate:preview`
6. Desktop + mobile Playwright smoke tests
7. Security workflow, including secret scan and npm audit
8. Lighthouse quality gate
9. Pull-request dependency review
10. Public HTTP verification of the generated review URL, product-detail route, and `robots.txt`

## Cloudflare deployment

The project is configured for Cloudflare Workers Static Assets using `wrangler.jsonc` and deploys only the generated `dist/` directory.

The GitHub review-deployment workflow requires repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

If these credentials are not available, the workflow must fail closed before upload. Never bypass this gate by deploying to the production HeadBlade domain.

## Owner approval boundary

A successful review preview does not authorize production deployment. Production activation requires a separate explicit owner approval and a separate production-release procedure.
