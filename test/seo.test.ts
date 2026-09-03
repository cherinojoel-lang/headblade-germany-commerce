import { describe, expect, it } from "vitest";
import { pageTitle, canonicalForPreview } from "../src/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildProductJsonLd,
  sanitizeJsonLd,
} from "../src/lib/schema";
import { getProduct } from "../src/lib/catalog";

describe("review SEO contract", () => {
  it("formats page titles without duplicating the brand", () => {
    expect(pageTitle("HeadBlade MOTO")).toBe("HeadBlade MOTO | HeadBlade Germany");
    expect(pageTitle("HeadBlade Germany")).toBe("HeadBlade Germany");
  });

  it("does not emit a production canonical during review", () => {
    expect(canonicalForPreview("/produkt/headblade-moto")).toBeUndefined();
  });

  it("escapes HTML-sensitive characters in JSON-LD", () => {
    const json = sanitizeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(json).not.toContain("<");
    expect(json).toContain("\\u003c");
  });

  it("builds product schema only from available review fields", () => {
    const moto = getProduct("headblade-moto");
    expect(moto).toBeDefined();
    const schema = buildProductJsonLd(moto!);
    expect(schema["@type"]).toBe("Product");
    expect(schema.name).toBe("HeadBlade MOTO");
    expect(schema.offers).toMatchObject({ priceCurrency: "EUR", price: 21.95 });

    const noPrice = buildProductJsonLd({ ...moto!, price: null });
    expect(noPrice).not.toHaveProperty("offers");
  });

  it("builds ordered breadcrumb schema", () => {
    const schema = buildBreadcrumbJsonLd([
      { name: "Start", path: "/" },
      { name: "MOTO", path: "/produkt/headblade-moto" },
    ]);
    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[1]).toMatchObject({ position: 2, name: "MOTO" });
  });
});
