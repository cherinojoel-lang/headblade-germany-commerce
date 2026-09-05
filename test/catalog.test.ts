import { describe, expect, it } from "vitest";
import {
  formatPrice,
  getProduct,
  productsByCategory,
  searchProducts,
} from "../src/lib/catalog";
import { products } from "../src/data/products";

describe("typed HeadBlade catalog", () => {
  it("formats German euro prices and preserves preview fallback", () => {
    expect(formatPrice(21.95)).toMatch(/21,95\s*€/);
    expect(formatPrice(null)).toBe("Preis vor Livegang bestätigen");
  });

  it("looks up known products and returns undefined for unknown slugs", () => {
    expect(getProduct("headblade-moto")?.name).toBe("HeadBlade MOTO");
    expect(getProduct("gibt-es-nicht")).toBeUndefined();
  });

  it("searches compatibility text for HB4 and HB6", () => {
    expect(searchProducts("HB4").some((product) => product.slug === "klingenset-4blade")).toBe(true);
    expect(searchProducts("HB6").some((product) => product.slug === "klingenset-6blade")).toBe(true);
  });

  it("filters category membership without leaking unrelated products", () => {
    const care = productsByCategory("pflege");
    expect(care.some((product) => product.slug === "headslick-5oz")).toBe(true);
    expect(care.every((product) => product.categories.includes("pflege"))).toBe(true);
  });

  it("contains the verified review seed catalog", () => {
    expect(products.length).toBeGreaterThanOrEqual(10);
  });

  it("gives MOTO and ATX explainable decision metadata with resolvable alternatives", () => {
    for (const slug of ["headblade-moto", "headblade-atx-package"]) {
      const product = getProduct(slug)!;
      expect(product.bestFor?.length).toBeGreaterThanOrEqual(2);
      expect(product.usage?.length).toBeGreaterThanOrEqual(2);
      expect(product.nearestAlternativeSlug).toBeTruthy();
      expect(getProduct(product.nearestAlternativeSlug!)).toBeDefined();
    }
    expect(getProduct("headblade-moto")?.nearestAlternativeSlug).toBe("headblade-atx-package");
    expect(getProduct("headblade-atx-package")?.nearestAlternativeSlug).toBe("headblade-moto");
  });
});
