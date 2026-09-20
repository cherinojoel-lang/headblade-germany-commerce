/**
 * Cut the baked-in studio backdrop out of the imported product images.
 *
 * The catalogue shots from the HeadBlade Germany source all carry a flat white
 * backdrop covering 49-81% of the frame. Rendered on our own surfaces that
 * backdrop shows as a hard rectangle, which is why every product had to be
 * hidden behind a light tile. Cutting it away lets a product sit directly on the
 * section surface.
 *
 * Not every source survives this. Files listed in KEEP_AS_PACKSHOT are composite
 * marketing images (promo blocks with their own white panels) or light products
 * on white, where no threshold separates subject from ground; those stay as
 * packshots on a tile. Run the script and look at the contact sheet before
 * moving a file between the two groups.
 *
 * Method:
 *   1. core   = pixels that are dark OR chromatic. Lightness alone cannot decide:
 *               the photographed contact shadow is mid-grey, and on these sources
 *               it is a ragged stain that looks worse than no shadow at all.
 *   2. gate   = largest connected component of the core, then a morphological
 *               closing (dilate, fill interior holes, erode by the same amount).
 *               The fill stops specular highlights from punching through the
 *               product; the erode stops a pale halo from the backdrop.
 *   3. alpha  = opaque inside, and only on the silhouette a ramp over
 *               min(r,g,b) so the cut edge keeps its anti-aliasing.
 *
 * Run with: node scripts/cutout-product-images.mjs
 */
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/** Untouched imports, kept out of `public/` so they are never served. */
const SRC = "assets/produkte-quelle";
/** What the site actually ships. */
const DIR = "public/media/produkte";

/** Sources that cannot be separated from their ground; they stay packshots. */
const KEEP_AS_PACKSHOT = new Set([
  "hb4-powerpack.jpg", // "BUY 4 - GET 1 FREE" promo panel is itself white
  "hb6-powerpack.jpg",
  "headslick-5oz.jpg", // white bottle on white
  "moto-package.jpg", // retail blister art, dark ground, no clean subject
]);

/** Per-file overrides. `crop` is applied before the cutout, in source pixels. */
const OVERRIDES = {
  // Crops away the "reddot design award winner 2017" badge in the top-left -- a
  // certification claim we cannot substantiate. Cutting inside the photographed
  // contact shadow leaves a hard straight edge, so the crop follows the content
  // extent rather than a round number.
  // Source is the 600x600 variant from the shop's popup_images/ (the 350x350 in
  // the filename is misleading). Row 133 is the gap between badge and product,
  // and the right/bottom edges follow the content extent (col 598, row 566) so
  // the photographed contact shadow stays whole.
  "moto-detail.jpg": { crop: { left: 12, top: 133, width: 587, height: 434 } },
};

/**
 * A pixel belongs to the subject when it is dark or colourful. Pure lightness is
 * not enough to decide: the photographed contact shadow is mid-grey and would be
 * kept, and on these sources it is a ragged stain rather than a usable shadow.
 * Neutral grey fails both tests, black plastic passes MAX_DARK, the yellow
 * chassis and the blue pouches pass MIN_CHROMA.
 */
const MAX_DARK = 95; // min(r,g,b) below this counts as subject
const MIN_CHROMA = 45; // max(r,g,b) - min(r,g,b) above this counts as subject
const EDGE_OPAQUE = 225; // silhouette ramp: fully opaque at or below
const EDGE_CLEAR = 252; // silhouette ramp: fully transparent at or above
const DILATE = 2;

function cutoutAlpha(data, width, height, channels) {
  const n = width * height;
  const whiteness = new Uint8Array(n);
  const core = new Uint8Array(n);
  for (let p = 0; p < n; p++) {
    const i = p * channels;
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    whiteness[p] = min;
    core[p] = min < MAX_DARK || max - min > MIN_CHROMA ? 1 : 0;
  }

  // Largest connected component of the core.
  const label = new Int32Array(n).fill(-1);
  let best = -1;
  let bestSize = 0;
  for (let seed = 0; seed < n; seed++) {
    if (!core[seed] || label[seed] >= 0) continue;
    let size = 0;
    const stack = [seed];
    label[seed] = seed;
    while (stack.length) {
      const p = stack.pop();
      size++;
      const x = p % width;
      const y = (p - x) / width;
      if (x + 1 < width && core[p + 1] && label[p + 1] < 0) (label[p + 1] = seed), stack.push(p + 1);
      if (x > 0 && core[p - 1] && label[p - 1] < 0) (label[p - 1] = seed), stack.push(p - 1);
      if (y + 1 < height && core[p + width] && label[p + width] < 0)
        (label[p + width] = seed), stack.push(p + width);
      if (y > 0 && core[p - width] && label[p - width] < 0)
        (label[p - width] = seed), stack.push(p - width);
    }
    if (size > bestSize) {
      bestSize = size;
      best = seed;
    }
  }

  let gate = new Uint8Array(n);
  for (let p = 0; p < n; p++) gate[p] = label[p] === best ? 1 : 0;
  for (let round = 0; round < DILATE; round++) {
    const next = new Uint8Array(gate);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const p = y * width + x;
        if (gate[p]) continue;
        if (
          (x + 1 < width && gate[p + 1]) ||
          (x > 0 && gate[p - 1]) ||
          (y + 1 < height && gate[p + width]) ||
          (y > 0 && gate[p - width])
        )
          next[p] = 1;
      }
    }
    gate = next;
  }

  // Fill interior holes. Specular highlights on the black body are neutral and
  // bright, so they fail the core test; without this they punch see-through
  // holes straight through the product. Anything the outside cannot reach is
  // interior by definition.
  const outside = new Uint8Array(n);
  const queue = [];
  for (let x = 0; x < width; x++) {
    queue.push(x, (height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    queue.push(y * width, y * width + width - 1);
  }
  while (queue.length) {
    const p = queue.pop();
    if (outside[p] || gate[p]) continue;
    outside[p] = 1;
    const x = p % width;
    const y = (p - x) / width;
    if (x + 1 < width) queue.push(p + 1);
    if (x > 0) queue.push(p - 1);
    if (y + 1 < height) queue.push(p + width);
    if (y > 0) queue.push(p - width);
  }
  for (let p = 0; p < n; p++) if (!gate[p] && !outside[p]) gate[p] = 1;

  // Erode by what we dilated. Dilation exists only to bridge gaps before the
  // hole fill; left in, it pushes the mask out into the white backdrop and the
  // product ships with a pale halo around it. Together the two steps are a
  // morphological closing, so gaps stay bridged and the edge snaps back.
  for (let round = 0; round < DILATE; round++) {
    const next = new Uint8Array(gate);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const p = y * width + x;
        if (!gate[p]) continue;
        if (
          (x + 1 < width && !gate[p + 1]) ||
          (x > 0 && !gate[p - 1]) ||
          (y + 1 < height && !gate[p + width]) ||
          (y > 0 && !gate[p - width])
        )
          next[p] = 0;
      }
    }
    gate = next;
  }

  // The whiteness ramp only anti-aliases the silhouette. Applying it inside the
  // product would make every light surface semi-transparent.
  for (let p = 0; p < n; p++) {
    if (!gate[p]) {
      data[p * channels + 3] = 0;
      continue;
    }
    const x = p % width;
    const y = (p - x) / width;
    const onEdge =
      (x + 1 < width && !gate[p + 1]) ||
      (x > 0 && !gate[p - 1]) ||
      (y + 1 < height && !gate[p + width]) ||
      (y > 0 && !gate[p - width]);
    if (!onEdge) {
      data[p * channels + 3] = 255;
      continue;
    }
    const w = whiteness[p];
    data[p * channels + 3] =
      w <= EDGE_OPAQUE
        ? 255
        : w >= EDGE_CLEAR
          ? 0
          : Math.round((255 * (EDGE_CLEAR - w)) / (EDGE_CLEAR - EDGE_OPAQUE));
  }
  return bestSize;
}

function bbox(data, width, height, channels) {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * channels + 3] > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

/**
 * A packshot keeps its ground, but is trimmed to its subject and re-matted with
 * a fixed margin. Untouched, the white share runs from 49% to 81% across these
 * files, which makes the same product look a different size in every grid cell.
 */
async function normalisePackshot(file) {
  const src = path.join(SRC, file);
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // moto-package sits on black, the rest on white; measure against the corner.
  const corner = [data[0], data[1], data[2]];
  const isGround = (i) =>
    Math.abs(data[i] - corner[0]) <= 26 &&
    Math.abs(data[i + 1] - corner[1]) <= 26 &&
    Math.abs(data[i + 2] - corner[2]) <= 26;

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!isGround((y * width + x) * channels)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const side = Math.max(maxX - minX + 1, maxY - minY + 1);
  const canvas = Math.round(side * 1.12); // uniform 6% margin on the long edge
  const out = path.join(DIR, file.replace(/\.(jpg|png|gif)$/i, ".webp"));
  const written = await sharp(data, { raw: { width, height, channels } })
    .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
    .resize(canvas, canvas, {
      fit: "contain",
      background: { r: corner[0], g: corner[1], b: corner[2], alpha: 1 },
    })
    .webp({ quality: 88, effort: 6 })
    .toFile(out);

  manifest[`/media/produkte/${path.basename(out)}`] = [written.width, written.height];
  console.log(
    `${file.padEnd(22)} ${`${width}x${height}`.padStart(9)} -> ` +
      `${`${written.width}x${written.height}`.padStart(9)}  ` +
      `${String(Math.round(written.size / 1024)).padStart(3)} KB  Packshot, Rand normalisiert`,
  );
}

/** Intrinsic size of every emitted file, written out for the `<img>` attributes. */
const manifest = {};

const files = (await readdir(SRC)).filter((f) => /\.(jpg|png|gif)$/i.test(f)).sort();
for (const file of files) {
  if (KEEP_AS_PACKSHOT.has(file)) {
    await normalisePackshot(file);
    continue;
  }
  const opts = OVERRIDES[file] ?? {};
  let pipeline = sharp(path.join(SRC, file));
  if (opts.crop) pipeline = pipeline.extract(opts.crop);

  const { data, info } = await pipeline.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const subject = cutoutAlpha(data, width, height, channels);
  const box = bbox(data, width, height, channels);

  const out = path.join(DIR, file.replace(/\.(jpg|png|gif)$/i, ".webp"));
  const written = await sharp(data, { raw: { width, height, channels } })
    .extract(box)
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toFile(out);

  manifest[`/media/produkte/${path.basename(out)}`] = [written.width, written.height];
  console.log(
    `${file.padEnd(22)} ${`${width}x${height}`.padStart(9)} -> ` +
      `${`${written.width}x${written.height}`.padStart(9)}  ` +
      `${String(Math.round(written.size / 1024)).padStart(3)} KB  ` +
      `Motiv ${String(Math.round((subject / (width * height)) * 100)).padStart(2)}%`,
  );
}

// The `<img>` elements need the real intrinsic size: with only a width in CSS the
// UA derives the reserved box from these attributes, so a square placeholder on a
// 330x233 cutout reserves dead space and mis-centres the product.
const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(
  "src/data/product-image-sizes.ts",
  "// Generated by scripts/cutout-product-images.mjs -- do not edit by hand.\n" +
    "export const productImageSizes: Record<string, readonly [number, number]> = " +
    `${JSON.stringify(sorted, null, 2)};\n`,
);
console.log(`\nsrc/data/product-image-sizes.ts: ${Object.keys(sorted).length} Einträge`);
