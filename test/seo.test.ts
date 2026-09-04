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

  it("builds truthful review Product schema without merchant Offer claims", () => {
    const moto = getProduct("headblade-moto");
    expect(moto).toBeDefined();
    const schema = buildProductJsonLd(moto!);
    expect(schema["@type"]).toBe("Product");
    expect(schema.name).toBe("HeadBlade MOTO");
    expect(schema).not.toHaveProperty("offers");
    expect(schema).not.toHaveProperty("availability");
    expect(JSON.stringify(schema)).not.toMatch(/"@type":"Offer"/);
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
