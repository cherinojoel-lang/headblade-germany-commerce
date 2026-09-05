# HeadBlade Germany — Review Security Notes

The review build is intentionally non-transactional and non-data-collecting.

Controls in the review branch include:

- no checkout/payment integration
- no customer forms or customer-data submission
- no analytics/advertising integration
- noindex/noarchive controls at page, robots, and header level
- GitHub secret scan and high-severity npm audit
- fail-closed Cloudflare deployment when credentials are missing
- production domain and DNS excluded from preview automation

No secrets belong in repository source files. Cloudflare credentials must remain GitHub Actions secrets or an equivalent authenticated deployment mechanism.
