import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const pageUrl = new URL("../src/pages/index.astro", import.meta.url);

describe("premium homepage composition", () => {
  it("contains the required product-led information architecture", async () => {
    const source = await readFile(pageUrl, "utf8");
    for (const phrase of [
      "HeadBlade MOTO",
      "Bestseller",
      "HB4 & HB6",
      "Produktfinder",
      "Warum HeadBlade",
      "Deine Rasur-Routine",
      "Bundles & Angebote",
      "Häufige Fragen",
      "Alle Produkte ansehen",
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
