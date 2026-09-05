import { describe, expect, it } from "vitest";
import {
  hb4Hb6Rows,
  manualElectricRows,
  motoAtxRows,
  routineSteps,
} from "../src/data/decision-content";

const forbiddenClaims = /heilt|verhindert irritation|garantiert|schneller als|gründlicher als|beste rasur/i;

describe("shared Contour decision content", () => {
  it("keeps MOTO vs ATX focused on explainable customer choices", () => {
    expect(motoAtxRows.length).toBeGreaterThanOrEqual(3);
    expect(motoAtxRows.map((row) => row.criterion).join(" ").toLowerCase()).toContain("führung");
    expect(JSON.stringify(motoAtxRows)).not.toMatch(forbiddenClaims);
  });

  it("puts compatibility first for HB4 vs HB6", () => {
    expect(hb4Hb6Rows[0]?.criterion.toLowerCase()).toContain("kompatibilität");
    expect(JSON.stringify(hb4Hb6Rows)).toContain("HB4");
    expect(JSON.stringify(hb4Hb6Rows)).toContain("HB6");
  });

  it("keeps manual versus electric neutral rather than declaring a universal winner", () => {
    expect(manualElectricRows.length).toBeGreaterThanOrEqual(3);
    expect(JSON.stringify(manualElectricRows)).not.toMatch(/gewinner|überlegen|besser als/i);
  });

  it("defines the four-step HeadBlade routine in order", () => {
    expect(routineSteps.map((step) => step.id)).toEqual(["prepare", "shave", "calm", "protect"]);
    expect(routineSteps.every((step) => step.title.length > 0 && step.body.length > 0)).toBe(true);
    expect(JSON.stringify(routineSteps)).not.toMatch(forbiddenClaims);
  });
});
