import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

async function readRepoFile(path: string) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

describe("responsive navigation and card accessibility", () => {
  it("provides a native no-JS mobile navigation with the real Lifestyle route", async () => {
    const header = await readRepoFile("src/components/layout/Header.astro");
    expect(header).toContain('<details class="mobile-nav">');
    expect(header).toContain('href: "/lifestyle"');
    expect(header).not.toMatch(/<script|client:/i);
  });

  it("exposes exactly one product-detail link per card", async () => {
    const card = await readRepoFile("src/components/commerce/ProductCard.astro");
    expect(card.match(/href=\{productHref\(product\)\}/g)).toHaveLength(1);
    expect(card).toContain('class="product-card__target"');
    expect(card).toContain("<h3>{product.name}</h3>");
  });

  it("uses the same breadcrumb data for visible and structured navigation", async () => {
    const page = await readRepoFile("src/pages/produkt/[slug].astro");
    expect(page).toContain("buildBreadcrumbJsonLd(breadcrumbItems)");
    expect(page).toContain("<Breadcrumbs items={breadcrumbItems}");
  });
});
