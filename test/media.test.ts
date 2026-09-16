import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { products } from "../src/data/products";

const bySlug = (slug: string) => products.find((product) => product.slug === slug)!;

describe("review product media contract", () => {
  it("uses SKU-specific media instead of MOTO placeholders", () => {
    expect(bySlug("headblade-atx-package").image).toContain("atx-package");
    expect(bySlug("atx-pink").image).toContain("atx-pink");
    expect(bySlug("klingenset-4blade").image).toContain("hb4-klingen");
    expect(bySlug("klingenset-6blade").image).toContain("hb6-klingen");
    expect(bySlug("4blade-4plus1").image).toContain("hb4-powerpack");
    expect(bySlug("6blade-4plus1").image).toContain("hb6-powerpack");
    expect(bySlug("moto-headcase").image).toContain("moto-headcase");
  });

  it("represents the MOTO + HeadSlick bundle with both included products", () => {
    const bundle = bySlug("moto-slick-bundle");
    expect(bundle.image).toContain("moto-package");
    expect(bundle.secondaryImage).toContain("headslick");
  });

  it("serves every product image first-party, never hotlinked from production", () => {
    for (const product of products) {
      for (const source of [product.image, product.detailImage, product.secondaryImage, ...(product.media ?? []).map((item) => item.src)].filter(Boolean)) {
        expect(source).toMatch(/^\/media\/produkte\/[a-z0-9-]+\.(jpg|png|webp)$/);
      }
    }
  });

  it("ships every referenced product image as a real file in public/", async () => {
    const referenced = new Set(
      products.flatMap((product) =>
        [product.image, product.detailImage, product.secondaryImage, ...(product.media ?? []).map((item) => item.src)].filter(
          (source): source is string => Boolean(source),
        ),
      ),
    );

    for (const source of referenced) {
      const file = new URL(`../public${source}`, import.meta.url);
      const bytes = await readFile(file);
      expect(bytes.byteLength, `${source} must not be empty`).toBeGreaterThan(1024);
    }
  });

  it("requires useful alt text for explicit product media entries", () => {
    for (const product of products) {
      for (const media of product.media ?? []) {
        expect(media.alt.trim().length).toBeGreaterThan(8);
        expect(media.src).toMatch(/^\/media\/produkte\//);
      }
    }
  });

  it("composes the PDP from a gallery and decision-support layer", async () => {
    const route = await readFile(new URL("../src/pages/produkt/[slug].astro", import.meta.url), "utf8");
    expect(route).toContain("ProductMediaGallery");
    expect(route).toContain("ProductDecisionSupport");
  });

  it("keeps the first gallery image eager and dimensioned", async () => {
    const gallery = await readFile(new URL("../src/components/commerce/ProductMediaGallery.astro", import.meta.url), "utf8");
    expect(gallery).toContain('fetchpriority="high"');
    expect(gallery).toContain('width="760"');
    expect(gallery).toContain('height="760"');
    expect(gallery).not.toMatch(/first[^\n]{0,80}loading="lazy"/i);
  });

  it("supplies responsive sizing hints at every primary product-image surface", async () => {
    for (const path of [
      "src/components/commerce/ProductCard.astro",
      "src/components/commerce/ProductHero.astro",
      "src/components/commerce/ProductMediaGallery.astro",
      "src/components/sections/HeroSection.astro",
      "src/components/sections/MotoSpotlight.astro",
    ]) {
      const source = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
      expect(source, `${path} must declare responsive image sizes`).toContain("sizes=");
    }
  });
});
