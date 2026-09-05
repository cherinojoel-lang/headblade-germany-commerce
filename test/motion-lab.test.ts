import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("Motion Lab visual contract", () => {
  it("loads a dedicated Motion Lab layer and removes the old public Contour branding", () => {
    const layout = read("src/layouts/BaseLayout.astro");
    const home = read("src/pages/index.astro");
    const hero = read("src/components/sections/HeroSection.astro");

    expect(layout).toContain('import "../styles/motion-lab.css"');
    expect(home).not.toContain("HEADBLADE CONTOUR SYSTEM");
    expect(hero).not.toContain("HEADBLADE CONTOUR SYSTEM");
    expect(hero).not.toContain("Purpose-built Head Shaving");
  });

  it("uses the real HeadBlade Germany product source and a light product-led hero", () => {
    const products = read("src/data/products.ts");
    const hero = read("src/components/sections/HeroSection.astro");
    const motion = read("src/styles/motion-lab.css");

    expect(products).toContain("https://www.headblade.info/images/product_images/");
    expect(hero).toContain("motion-hero__product");
    expect(hero).toContain("product.detailImage ?? product.image");
    expect(motion).toContain("--ml-canvas: #ffffff");
    expect(motion).toContain(".motion-hero");
    expect(motion).not.toContain("background: var(--ink)");
  });

  it("keeps motion finite and fully respects reduced motion", () => {
    const motion = read("src/styles/motion-lab.css");
    expect(motion).toContain("@media (prefers-reduced-motion: reduce)");
    expect(motion).toContain("animation: none !important");
    expect(motion).not.toMatch(/animation-iteration-count:\s*infinite/);
  });

  it("shows real MOTO and ATX imagery on the choice surface", () => {
    const choose = read("src/components/sections/ChooseSystem.astro");
    expect(choose).toContain("moto.image");
    expect(choose).toContain("atx.image");
    expect(choose).toContain("/vergleich/moto-vs-atx");
  });
});
