import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const pageUrl = new URL("../src/pages/index.astro", import.meta.url);

describe("HEADBLADE CONTOUR SYSTEM homepage", () => {
  it("composes the approved decision journey instead of a generic product dump", async () => {
    const source = await readFile(pageUrl, "utf8");
    for (const component of [
      "ContourLine",
      "ChooseSystem",
      "ContourMechanics",
      "CompatibilitySection",
      "RoutineSection",
      "ManualVsElectric",
      "HelpBeforeBuying",
    ]) {
      expect(source).toContain(component);
    }
    for (const phrase of [
      "Für deinen Kopf gebaut.",
      "HeadBlade Fit",
      "MOTO",
      "ATX",
      "HB4",
      "HB6",
      "Häufige Fragen",
    ]) {
      expect(source).toContain(phrase);
    }
  });

  it("keeps the homepage visibly review-only", async () => {
    const source = await readFile(pageUrl, "utf8");
    expect(source).toContain("Keine Bestellung");
    expect(source).not.toMatch(/Jetzt bezahlen|Kreditkarte|PayPal|Klarna/i);
  });
});
