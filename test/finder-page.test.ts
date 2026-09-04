import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const finderUrl = new URL("../src/pages/finder/index.astro", import.meta.url);

describe("HeadBlade Fit page", () => {
  it("renders an explainable three-question decision surface without a data-collection form", async () => {
    const source = await readFile(finderUrl, "utf8");

    expect(source).toContain("HeadBlade Fit");
    expect(source).toContain('data-finder-question="experience"');
    expect(source).toContain('data-finder-question="guidance"');
    expect(source).toContain('data-finder-question="need"');
    expect(source).toContain("recommendHeadBlade");
    expect(source).toContain("Warum diese Empfehlung");
    expect(source).not.toMatch(/<form\b|localStorage|sessionStorage|document\.cookie/i);
  });

  it("keeps useful static fallback paths in the initial HTML", async () => {
    const source = await readFile(finderUrl, "utf8");
    for (const href of [
      "/vergleich/moto-vs-atx",
      "/vergleich/hb4-vs-hb6",
      "/pflege",
      "/angebote",
    ]) {
      expect(source).toContain(`href="${href}"`);
    }
  });
});
