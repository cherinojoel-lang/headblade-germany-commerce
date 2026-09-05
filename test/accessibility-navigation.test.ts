import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

async function readRepoFile(path: string) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

describe("responsive navigation and card accessibility", () => {
  it("provides a native no-JS mobile navigation centered on customer tasks", async () => {
    const header = await readRepoFile("src/components/layout/Header.astro");
    expect(header).toContain('<details class="mobile-nav">');
    for (const label of ["Rasierer", "Klingen", "Pflege", "Sets", "Finder", "So geht’s", "Vergleichen"]) {
      expect(header).toContain(`label: "${label}"`);
    }
    expect(header).not.toContain('label: "Lifestyle"');
    expect(header).not.toMatch(/<script|client:/i);
  });

  it("keeps the signature Contour Line decorative for assistive technology", async () => {
    const contour = await readRepoFile("src/components/brand/ContourLine.astro");
    expect(contour).toContain('class="contour-line"');
    expect(contour).toContain('aria-hidden="true"');
    expect(contour).toContain('focusable="false"');
  });

  it("exposes exactly one product-detail link per card without overriding visible link text", async () => {
    const card = await readRepoFile("src/components/commerce/ProductCard.astro");
    expect(card.match(/href=\{productHref\(product\)\}/g)).toHaveLength(1);
    expect(card).toContain('class="product-card__target"');
    expect(card).toContain("<h3>{product.name}</h3>");
    expect(card).not.toContain('aria-label={`${product.name}');
  });

  it("uses the same descriptive breadcrumb data for visible and structured navigation", async () => {
    const page = await readRepoFile("src/pages/produkt/[slug].astro");
    expect(page).toContain('{ name: "Startseite", path: "/" }');
    expect(page).toContain("buildBreadcrumbJsonLd(breadcrumbItems)");
    expect(page).toContain("<Breadcrumbs items={breadcrumbItems}");
  });
});
