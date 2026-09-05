# HeadBlade Germany — Preview Handoff

The review artifact is the `feat/astro-headblade-premium` branch and its public preview deployment.

A valid handoff must contain:

- exact Git commit SHA
- public review URL
- successful CI, Security, Lighthouse, Browser Smoke, and PR Dependency Review results
- confirmation that preview safety validation passed
- confirmation that `headblade.info` and production DNS were not changed
- explicit note that production deployment remains owner-gated

Do not report `PREVIEW_READY_FOR_OWNER_REVIEW` until the public URL itself has been opened and verified after deployment.
