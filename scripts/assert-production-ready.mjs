/**
 * Production readiness gate — the counterpart to `validate-preview.mjs`.
 *
 * `validate-preview.mjs` proves the build is SAFE AS A PREVIEW: noindex
 * everywhere, no forms, no payments, no production routing. Those same
 * properties are exactly what makes the build UNFIT FOR PRODUCTION. Shipping it
 * to a customer-facing domain would publish a shop with no cart and no checkout,
 * and put `noindex,nofollow` on every page of that domain.
 *
 * This script therefore asserts the inverse, and fails closed. It exists so the
 * production deploy workflow cannot be fired on a build that is still a review
 * preview — the failure mode that would otherwise be one button press away.
 *
 * Run: node scripts/assert-production-ready.mjs
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const DIST = "dist";
const failures = [];

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const pages = await htmlFiles(DIST);
if (pages.length === 0) {
  console.error("No built HTML found in dist/ — run `npm run build` first.");
  process.exit(2);
}

// 1. Indexability. A production domain that answers `noindex` on every page
//    removes itself from search results; on a domain that currently ranks, that
//    is the single most damaging thing a deploy can do.
const stillNoindex = [];
for (const file of pages) {
  const html = await readFile(file, "utf8");
  const robots = html.match(/<meta\b[^>]*\bname=["']robots["'][^>]*>/i)?.[0] ?? "";
  if (/\bnoindex\b/i.test(robots)) stillNoindex.push(path.relative(DIST, file));
}
if (stillNoindex.length) {
  failures.push(
    `${stillNoindex.length} of ${pages.length} pages still carry meta robots noindex ` +
      `(e.g. ${stillNoindex.slice(0, 3).join(", ")}). This build is a review preview.`,
  );
}

// 2. The `_headers` file enforces X-Robots-Tag: noindex for the whole
//    deployment. It overrides per-page tags at the edge.
try {
  const headers = await readFile(path.join(DIST, "_headers"), "utf8");
  if (/X-Robots-Tag:\s*noindex/i.test(headers)) {
    failures.push("dist/_headers still sends X-Robots-Tag: noindex for the whole deployment.");
  }
} catch {
  // No _headers file is fine for production.
}

// 3. Review chrome must be gone. Shipping a banner that reads
//    "keine Bestellung · keine Zahlung" onto a commercial domain tells real
//    customers the shop does not work.
const withBanner = [];
for (const file of pages) {
  const html = await readFile(file, "utf8");
  if (/review-preview|preview-banner/i.test(html)) withBanner.push(path.relative(DIST, file));
}
if (withBanner.length) {
  failures.push(`${withBanner.length} pages still render the review-preview banner.`);
}

// 4. Content sign-off. Prices were checked once, on 2026-09-03, for review
//    purposes; legal texts are preview drafts. Under German law both are
//    binding on a live shop (Preisangabenverordnung, Impressumspflicht), so
//    this gate needs a human to state explicitly that they were re-verified.
if (process.env.PRODUCTION_CONTENT_APPROVED !== "true") {
  failures.push(
    "PRODUCTION_CONTENT_APPROVED is not set to \"true\". Prices, legal texts and " +
      "shipping terms must be re-verified by the owner before they go live.",
  );
}

// 5. Cutover acknowledgement. www.headblade.info currently serves a running
//    Gambio shop (cart, session cookies, index,follow). Repointing it replaces
//    that shop. Nothing here can verify the owner intends that, so it has to be
//    stated.
if (process.env.PRODUCTION_CUTOVER_ACKNOWLEDGED !== "true") {
  failures.push(
    "PRODUCTION_CUTOVER_ACKNOWLEDGED is not set to \"true\". The target domain " +
      "still serves a live shop; repointing it takes that shop offline.",
  );
}

if (failures.length) {
  console.error("PRODUCTION_READINESS_FAILED\n");
  for (const [i, f] of failures.entries()) console.error(`  ${i + 1}. ${f}`);
  console.error(
    "\nThis build is a review preview. See docs/PRODUCTION_CUTOVER.md for what a real " +
      "cutover requires.",
  );
  process.exit(1);
}

console.log(`PRODUCTION_READINESS_OK html=${pages.length} indexable=yes review_chrome=none`);
