import { readFile, readdir } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { validateHtml, validateWrangler } from "./preview-contract.mjs";

const distUrl = new URL("../dist/", import.meta.url);
const distPath = fileURLToPath(distUrl);

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

const files = await walk(distPath);
const htmlFiles = files.filter((file) => extname(file) === ".html");
if (!htmlFiles.length) throw new Error("No generated HTML found in dist/");

for (const file of htmlFiles) {
  validateHtml(await readFile(file, "utf8"), file);
}

const robots = await readFile(new URL("../dist/robots.txt", import.meta.url), "utf8");
if (!/User-agent:\s*\*/i.test(robots) || !/Allow:\s*\/\s*$/im.test(robots)) {
  throw new Error("robots.txt must allow crawlers to read the review noindex directives");
}
if (/Disallow:\s*\/\s*$/im.test(robots)) {
  throw new Error("robots.txt must not hide review noindex directives behind Disallow: /");
}

const headers = await readFile(new URL("../dist/_headers", import.meta.url), "utf8");
if (!/X-Robots-Tag:\s*noindex/i.test(headers)) {
  throw new Error("Static asset headers must enforce X-Robots-Tag noindex");
}

validateWrangler(await readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8"));
console.log(`PREVIEW_VALIDATION_OK html=${htmlFiles.length} forms=none payments=none indexing=noindex crawl=allowed production_routes=none`);
