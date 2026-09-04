import { describe, expect, it } from "vitest";
import { products } from "../src/data/products";
import { buildArticleJsonLd, buildProductJsonLd } from "../src/lib/schema";

describe("preview structured-data truth", () => {
  it("never describes review products as purchasable offers", () => {
    for (const product of products) {
      const json = JSON.stringify(buildProductJsonLd(product));
      expect(json).not.toContain('"offers"');
      expect(json).not.toContain('"availability"');
      expect(json).not.toContain('"@type":"Offer"');
    }
  });

  it("can describe a visible first-party guide without inventing commerce fields", () => {
    const schema = buildArticleJsonLd({
      headline: "Kopf richtig rasieren",
      description: "Schritt für Schritt zur kontrollierten Kopfrasur.",
      path: "/anleitungen/kopf-richtig-rasieren",
    });
    expect(schema).toMatchObject({
      "@type": "Article",
      headline: "Kopf richtig rasieren",
      description: "Schritt für Schritt zur kontrollierten Kopfrasur.",
    });
    expect(JSON.stringify(schema)).not.toMatch(/Offer|availability|priceCurrency/);
  });
});
