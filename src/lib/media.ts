import { productImageSizes } from "../data/product-image-sizes";

/**
 * Intrinsic size of a product image, for the `width`/`height` attributes.
 *
 * These are not decoration: with only a width in CSS the browser derives the
 * reserved box from the attributes, so a square placeholder on a landscape
 * cutout reserves dead space and mis-centres the product. The sizes come from
 * `scripts/cutout-product-images.mjs`, which regenerates the map whenever the
 * images are rebuilt.
 */
export function imageSize(src: string | undefined): { width: number; height: number } {
  const size = src ? productImageSizes[src] : undefined;
  if (!size) {
    // A referenced image with no entry means the map is stale; fall back to a
    // square so layout stays sane, and let the media test catch the mismatch.
    return { width: 600, height: 600 };
  }
  return { width: size[0], height: size[1] };
}
