import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { products } from "../src/data/products";

const bySlug = (slug: string) => products.find((product) => product.slug === slug)!;

describe("review product media contract", () => {
  it("uses SKU-specific HeadBlade source media instead of MOTO placeholders", () => {
    expect(bySlug("headblade-atx-package").image).toContain("41o8o0bsfjl.jpg");
    expect(bySlug("atx-pink").image).toContain("_12.jpg");
    expect(bySlug("klingenset-4blade").image).toContain("HB4_bag_600X600_350x350.png");
    expect(bySlug("klingenset-6blade").image).toContain("HB6_bag_600X600_350x350.png");
    expect(bySlug("4blade-4plus1").image).toContain("hb4_powerpack_2013_350x350.jpg");
    expect(bySlug("6blade-4plus1").image).toContain("hb6_powerpack_2013_350x350.jpg");
    expect(bySlug("moto-headcase").image).toContain("headcase_04.png");
  });

  it("represents the MOTO + HeadSlick bundle with both included products", () => {
    const bundle = bySlug("moto-slick-bundle");
    expect(bundle.image).toContain("moto_package");
    expect(bundle.secondaryImage).toContain("headslick");
  });

  it("keeps review media remote on the authorized HeadBlade source", () => {
    for (const product of products) {
      for (const source of [product.image, product.detailImage, product.secondaryImage].filter(Boolean)) {
        expect(source).toMatch(/^https:\/\/www\.headblade\.info\/images\/product_images\//);
      }
    }
  });

  it("supplies responsive sizing hints at every primary product-image surface", async () => {
    for (const path of [
      "src/components/commerce/ProductCard.astro",
      "src/components/commerce/ProductHero.astro",
      "src/components/sections/HeroSection.astro",
      "src/components/sections/MotoSpotlight.astro",
    ]) {
      const source = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
      expect(source, `${path} must declare responsive image sizes`).toContain("sizes=");
    }
  });
});
