/**
 * Analytics configuration — prepared, not activated.
 *
 * `docs/OWNER_GATE.md` treats "analytics activation" as its own explicit
 * decision, separate from a positive design review and separate from general
 * production go-live. This module is the single gate all three Google
 * surfaces (GTM, GA4, Search Console verification) go through, so there is
 * one place — not three scattered `if`s — that decides whether any of them
 * render.
 *
 * `enabled` requires BOTH the explicit approval flag AND at least one real
 * ID. Either alone is not enough: a stray `PUBLIC_ANALYTICS_ENABLED=true`
 * with no IDs configured would render nothing anyway, but a leaked ID
 * without the flag must never activate on its own.
 *
 * All values come from build-time env vars (`import.meta.env`), because this
 * is a fully static site — there is no server to read a runtime flag from.
 * `deploy-preview.yml` never sets any of these, so every preview build has
 * `enabled: false`. `deploy-production.yml` only sets them when the
 * `production` GitHub Environment carries `PRODUCTION_ANALYTICS_APPROVED =
 * "true"`. See docs/PRODUCTION_CUTOVER.md.
 */

export interface AnalyticsConfig {
  readonly enabled: boolean;
  readonly ga4Id?: string;
  readonly gtmId?: string;
  readonly gscVerification?: string;
}

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function getAnalyticsConfig(
  env: ImportMetaEnv | Record<string, string | undefined> = import.meta.env,
): AnalyticsConfig {
  const approved = env.PUBLIC_ANALYTICS_ENABLED === "true";
  const ga4Id = clean(env.PUBLIC_GA4_ID as string | undefined);
  const gtmId = clean(env.PUBLIC_GTM_ID as string | undefined);
  const gscVerification = clean(env.PUBLIC_GSC_VERIFICATION as string | undefined);

  const enabled = approved && Boolean(ga4Id || gtmId || gscVerification);
  if (!enabled) return { enabled: false };

  return { enabled: true, ga4Id, gtmId, gscVerification };
}
