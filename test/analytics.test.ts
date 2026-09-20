import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { getAnalyticsConfig } from "../src/lib/analytics";

async function readRepoFile(path: string) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

describe("analytics gate (src/lib/analytics.ts)", () => {
  it("stays disabled with no env at all", () => {
    expect(getAnalyticsConfig({})).toEqual({ enabled: false });
  });

  it("stays disabled when IDs are configured but the approval flag is missing", () => {
    // This is the exact shape of a preview build if a tracking ID ever leaked
    // into the environment by accident: the gate must still refuse it.
    expect(
      getAnalyticsConfig({
        PUBLIC_GA4_ID: "G-LEAKED123",
        PUBLIC_GTM_ID: "GTM-LEAKED",
        PUBLIC_GSC_VERIFICATION: "leaked-token",
      }),
    ).toEqual({ enabled: false });
  });

  it("stays disabled when the flag is set but no ID is configured", () => {
    expect(getAnalyticsConfig({ PUBLIC_ANALYTICS_ENABLED: "true" })).toEqual({ enabled: false });
  });

  it("enables only with both the approval flag and at least one ID", () => {
    expect(
      getAnalyticsConfig({ PUBLIC_ANALYTICS_ENABLED: "true", PUBLIC_GTM_ID: "GTM-ABC123" }),
    ).toEqual({ enabled: true, ga4Id: undefined, gtmId: "GTM-ABC123", gscVerification: undefined });
  });

  it("treats a whitespace-only ID as absent", () => {
    expect(
      getAnalyticsConfig({ PUBLIC_ANALYTICS_ENABLED: "true", PUBLIC_GA4_ID: "   " }),
    ).toEqual({ enabled: false });
  });
});

describe("analytics stays out of the review preview", () => {
  it("deploy-preview.yml never sets a PUBLIC_* analytics var", async () => {
    const workflow = await readRepoFile(".github/workflows/deploy-preview.yml");
    expect(workflow).not.toMatch(/PUBLIC_ANALYTICS_ENABLED|PUBLIC_GA4_ID|PUBLIC_GTM_ID|PUBLIC_GSC_VERIFICATION/);
  });

  it("deploy-production.yml only forwards analytics vars behind PRODUCTION_ANALYTICS_APPROVED", async () => {
    const workflow = await readRepoFile(".github/workflows/deploy-production.yml");
    expect(workflow).toContain("PRODUCTION_ANALYTICS_APPROVED");
    expect(workflow).toContain("PUBLIC_ANALYTICS_ENABLED");
    // Every analytics var must be conditioned on the same approval flag, not
    // passed through unconditionally.
    for (const line of workflow.split("\n")) {
      if (/^\s*PUBLIC_(ANALYTICS_ENABLED|GA4_ID|GTM_ID|GSC_VERIFICATION):/.test(line)) {
        expect(line, line).toContain("PRODUCTION_ANALYTICS_APPROVED == 'true'");
      }
    }
  });

  // The built-HTML check ("does dist/ actually contain zero tracking markers")
  // is deliberately NOT a vitest test: `npm run verify` runs `npm test` before
  // `npm run build`, so dist/ does not exist yet at this point in a clean CI
  // checkout (it only did locally because an earlier manual build had left one
  // behind). No other file in this directory reads from dist/ for the same
  // reason. The equivalent assertion already runs post-build, in
  // scripts/preview-contract.mjs's ANALYTICS_MARKER check, invoked by
  // `npm run validate:preview` -- the last step of `npm run verify` and the
  // established place in this repo for anything that inspects the built
  // output.
});
