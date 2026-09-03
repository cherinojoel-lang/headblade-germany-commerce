import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { categories } from "../src/data/categories";
import { products } from "../src/data/products";
import {
  categoryPagePath,
  categoryProducts,
  primaryProductCategory,
  productRoute,
} from "../src/lib/routes";

describe("catalog route contract", () => {
  it("maps every product to a unique generated detail route", () => {
    const routes = products.map(productRoute);
    expect(new Set(routes).size).toBe(products.length);
    expect(routes).toContain("/produkt/headblade-moto");
  });

  it("maps every public category to its configured path and only matching products", () => {
    for (const category of categories) {
      expect(categoryPagePath(category.id)).toBe(category.path);
      expect(categoryProducts(category.id).every((product) => product.categories.includes(category.id))).toBe(true);
    }
  });

  it("routes MOTO HeadCase through the real Lifestyle category", () => {
    const headCase = products.find((product) => product.slug === "moto-headcase");
    expect(headCase).toBeDefined();
    expect(primaryProductCategory(headCase!)).toMatchObject({ id: "lifestyle", path: "/lifestyle" });
  });

  it("ships a static Lifestyle category page", async () => {
    const source = await readFile(new URL("../src/pages/lifestyle/index.astro", import.meta.url), "utf8");
    expect(source).toContain('categoryProducts("lifestyle")');
    expect(source).toContain('title="Lifestyle"');
  });

  it("defines a static product route with review-only checkout copy", async () => {
    const source = await readFile(new URL("../src/pages/produkt/[slug].astro", import.meta.url), "utf8");
    expect(source).toContain("getStaticPaths");
    expect(source).toContain("Review-Preview: Checkout bewusst deaktiviert");
    expect(source).toContain("<Breadcrumbs");
    expect(source).not.toMatch(/Jetzt bezahlen|Kreditkarte|PayPal|Klarna/i);
  });
});
