# HeadBlade Germany — Deployment Notes

Review hosting target: Cloudflare Workers Static Assets.

The review Worker is isolated from the production HeadBlade domain. Its deployment consumes only the static Astro `dist/` output and may use the default `workers.dev` hostname.

Deployment must not create a route for `headblade.info`, modify DNS, or enable live commerce. The public review URL must be verified after upload before it is sent for owner review.
