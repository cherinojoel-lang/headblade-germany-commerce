# HeadBlade Germany — Rollback

## Review preview

The review deployment is isolated from production. If a review version is defective, do not touch `headblade.info` or production DNS. Stop sharing the affected preview, fix on the feature branch, rerun all required gates, and deploy a corrected review build.

## Future production

Production rollback is not authorized by this document. Before any future production activation, a production-specific rollback procedure must identify the previous known-good deployment/version, DNS and hosting rollback steps, commerce/payment rollback behavior, data-integrity checks, and post-rollback verification. Production rollback execution remains behind the explicit owner-approved production release process.
