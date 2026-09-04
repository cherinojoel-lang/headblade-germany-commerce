import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const pageUrl = new URL("../src/pages/index.astro", import.meta.url);
const heroUrl = new URL("../src/components/sections/HeroSection.astro", import.meta.url);
const choiceUrl = new URL("../src/components/sections/ChooseSystem.astro", import.meta.url);

describe("HeadBlade Motion Lab homepage", () => {
  it("composes the approved product-led decision journey", async () => {
    const source = await readFile(pageUrl, "utf8");
    for (const component of [
      "HeroSection",
      "ChooseSystem",
      "ContourMechanics",
      "CompatibilitySection",
      "RoutineSection",
      "ManualVsElectric",
      "HelpBeforeBuying",
    ]) {
      expect(source).toContain(component);
    }
    expect(source).not.toContain("ContourLine");
    expect(source).not.toContain("HEADBLADE CONTOUR SYSTEM");
  });

  it("puts the real MOTO product and the MOTO/ATX decision in the first journey", async () => {
    const hero = await readFile(heroUrl, "utf8");
    const choice = await readFile(choiceUrl, "utf8");
    expect(hero).toContain("HeadBlade MOTO");
    expect(hero).toContain("Für die Kopfrasur entwickelt.");
    expect(hero).toContain("product.detailImage ?? product.image");
    expect(choice).toContain("moto.image");
    expect(choice).toContain("atx.image");
    expect(choice).toContain("/vergleich/moto-vs-atx");
  });

  it("keeps the homepage visibly review-only", async () => {
    const source = await readFile(pageUrl, "utf8");
    expect(source).toContain("keine Bestellung");
    expect(source).not.toMatch(/Jetzt bezahlen|Kreditkarte|PayPal|Klarna/i);
  });
});
