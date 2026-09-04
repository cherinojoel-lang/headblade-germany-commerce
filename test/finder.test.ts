import { describe, expect, it } from "vitest";
import { recommendHeadBlade } from "../src/lib/finder";

describe("recommendHeadBlade", () => {
  it("recommends the ATX starter package for a first-time user who wants guided handling", () => {
    const result = recommendHeadBlade({
      experience: "first",
      guidance: "guided",
      need: "starter",
    });

    expect(result.primarySlug).toBe("headblade-atx-package");
    expect(result.alternativeSlug).toBe("headblade-moto");
    expect(result.nextHref).toBe("/vergleich/moto-vs-atx");
    expect(result.reasons.length).toBeGreaterThanOrEqual(2);
  });

  it("recommends MOTO when an experienced user prioritizes flexible contour following", () => {
    const result = recommendHeadBlade({
      experience: "experienced",
      guidance: "flexible",
      need: "razor",
    });

    expect(result.primarySlug).toBe("headblade-moto");
    expect(result.alternativeSlug).toBe("headblade-atx-package");
    expect(result.nextHref).toBe("/vergleich/moto-vs-atx");
    expect(result.reasons.join(" ").toLowerCase()).toContain("kontur");
  });

  it("routes blade needs to compatibility guidance instead of inventing a razor recommendation", () => {
    const result = recommendHeadBlade({
      experience: "experienced",
      guidance: "flexible",
      need: "blades",
    });

    expect(result.primarySlug).toBe("klingenset-4blade");
    expect(result.alternativeSlug).toBe("klingenset-6blade");
    expect(result.nextHref).toBe("/vergleich/hb4-vs-hb6");
    expect(result.reasons.join(" ").toLowerCase()).toContain("kompatibilität");
  });

  it("routes routine needs to the care category without pretending to diagnose scalp needs", () => {
    const result = recommendHeadBlade({
      experience: "first",
      guidance: "guided",
      need: "routine",
    });

    expect(result.primarySlug).toBe("headslick-5oz");
    expect(result.nextHref).toBe("/pflege");
    expect(result.reasons.join(" ").toLowerCase()).not.toMatch(/heilt|therapi|diagnos/);
  });
});
