# HeadBlade Germany — Quality Gates

A review build is acceptable only when the same commit passes:

- Astro/type check
- unit/regression tests
- static build
- preview safety validator
- secret scan and high-severity dependency audit
- Lighthouse quality assertions
- Chromium desktop/mobile smoke test
- pull-request dependency security audit

GitHub's native Dependency Review action requires the repository Dependency Graph. This repository does not currently expose that feature to the connected tooling, so pull requests use a fail-closed `npm ci` plus `npm audit --audit-level=high` dependency-security fallback instead. If the Dependency Graph is enabled later, the native action can be restored as an additional gate.

The current Lighthouse target is at least 0.90 performance, 0.95 accessibility, 0.95 best practices, and 0.95 SEO, with indexing intentionally blocked in review mode.

A green build does not authorize production deployment.
