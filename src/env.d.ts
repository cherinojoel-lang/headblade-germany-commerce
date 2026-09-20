/// <reference types="astro/client" />

interface ImportMetaEnv {
  /**
   * Master switch for src/lib/analytics.ts. Only "true" activates GTM/GA4/GSC,
   * and only when `deploy-production.yml` sets it from the `production`
   * GitHub Environment's `PRODUCTION_ANALYTICS_APPROVED` variable. Never set
   * by deploy-preview.yml.
   */
  readonly PUBLIC_ANALYTICS_ENABLED?: string;
  readonly PUBLIC_GA4_ID?: string;
  readonly PUBLIC_GTM_ID?: string;
  readonly PUBLIC_GSC_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
