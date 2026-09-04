import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

describe("Contour System accessibility and performance contracts", () => {
  it("keeps the skip link and visible keyboard focus contract", async () => {
    const layout = await read("src/layouts/BaseLayout.astro");
    const accessibility = await read("src/styles/accessibility.css");
    const globalCss = await read("src/styles/global.css");
    expect(layout).toContain('class="skip-link"');
    expect(layout).toContain('href="#main-content"');
    expect(`${accessibility}\n${globalCss}`).toContain(":focus-visible");
  });

  it("preserves comparison-table semantics while allowing narrow-screen scrolling", async () => {
    const table = await read("src/components/commerce/ComparisonTable.astro");
    expect(table).toContain("<caption>{caption}</caption>");
    expect(table).toContain('scope="col"');
    expect(table).toContain('scope="row"');
    expect(table).toContain("overflow-x: auto");
  });

  it("explicitly neutralizes Contour Line motion when reduced motion is requested", async () => {
    const css = await read("src/styles/global.css");
    const reducedMotionStart = css.indexOf("@media (prefers-reduced-motion: reduce)");
    expect(reducedMotionStart).toBeGreaterThanOrEqual(0);
    const reducedMotion = css.slice(reducedMotionStart);
    expect(reducedMotion).toContain(".contour-line");
    expect(reducedMotion).toMatch(/(?:animation|transition):\s*none\s*!important/);
  });

  it("keeps the primary PDP image dimensioned and high priority without lazy loading", async () => {
    const gallery = await read("src/components/commerce/ProductMediaGallery.astro");
    const primary = gallery.slice(gallery.indexOf("{firstMedia &&"), gallery.indexOf("{remainingMedia.map"));
    expect(primary).toContain('width="760"');
    expect(primary).toContain('height="760"');
    expect(primary).toContain('fetchpriority="high"');
    expect(primary).not.toContain('loading="lazy"');
  });
});
