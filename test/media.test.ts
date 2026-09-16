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
    expect(gallery).toContain("width={imageSize(firstMedia.src).width}");
    expect(gallery).toContain("height={imageSize(firstMedia.src).height}");
    expect(gallery).not.toMatch(/first[^\n]{0,80}loading="lazy"/i);
  });

  it("dimensions every product image from its real intrinsic size", async () => {
    // Hard-coded square dimensions used to sit on landscape cut-outs, which made
    // the browser reserve a square box and mis-centre the product. Every surface
    // now takes its numbers from the generated size map.
    for (const path of [
      "src/components/commerce/ProductCard.astro",
      "src/components/commerce/ProductHero.astro",
      "src/components/commerce/ProductMediaGallery.astro",
      "src/components/sections/HeroSection.astro",
      "src/components/sections/MotoSpotlight.astro",
      "src/components/sections/ChooseSystem.astro",
      "src/components/sections/CompatibilitySection.astro",
    ]) {
      const source = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
      expect(source, `${path} must derive image dimensions from imageSize()`).toContain("imageSize");
      expect(source, `${path} must not hard-code image dimensions`).not.toMatch(
        /(width|height)="\d+"/,
      );
    }
  });

  it("never declares sizes= without a srcset, where the browser ignores it", async () => {
    // `sizes` only takes effect alongside `srcset`. Until 2026-09-16 five
    // components carried `sizes` with no `srcset` anywhere in the project, and a
    // test asserted their presence -- an inert attribute reported as responsive
    // image support. These assets are single fixed files displayed at or below
    // their native width, so the fix is to not claim responsiveness at all.
    for (const path of [
      "src/components/commerce/ProductCard.astro",
      "src/components/commerce/ProductHero.astro",
      "src/components/commerce/ProductMediaGallery.astro",
      "src/components/sections/HeroSection.astro",
      "src/components/sections/MotoSpotlight.astro",
      "src/components/sections/ChooseSystem.astro",
      "src/components/sections/CompatibilitySection.astro",
    ]) {
      const source = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
      if (source.includes("sizes=")) {
        expect(source, `${path} declares sizes= but no srcset`).toContain("srcset");
      }
    }
  });

  it("keeps the generated size map in step with the shipped images", async () => {
    const { productImageSizes } = await import("../src/data/product-image-sizes");
    const referenced = new Set(
      products.flatMap((product) =>
        [product.image, product.detailImage, product.secondaryImage, ...(product.media ?? []).map((item) => item.src)].filter(
          (source): source is string => Boolean(source),
        ),
      ),
    );
    for (const source of referenced) {
      expect(productImageSizes[source], `${source} is missing from product-image-sizes.ts`).toBeDefined();
    }
  });
});
