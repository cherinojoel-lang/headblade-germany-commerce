import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { authorityRoutes } from "../src/lib/routes";

async function readRepoFile(path: string) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

describe("Contour System comparison routes", () => {
  it("registers the three customer-decision comparison routes", () => {
    expect(authorityRoutes).toEqual(expect.arrayContaining([
      "/vergleich/moto-vs-atx",
      "/vergleich/hb4-vs-hb6",
      "/vergleich/manuell-vs-elektrisch",
    ]));
  });

  it.each([
    ["src/pages/vergleich/moto-vs-atx.astro", "MOTO oder ATX"],
    ["src/pages/vergleich/hb4-vs-hb6.astro", "HB4 oder HB6"],
    ["src/pages/vergleich/manuell-vs-elektrisch.astro", "manuell oder elektrisch"],
  ])("ships %s with a clear decision heading and accessible comparison table", async (path, phrase) => {
    const source = await readRepoFile(path);
    expect(source.toLowerCase()).toContain(phrase.toLowerCase());
    expect(source).toContain("<ComparisonTable");
  });

  it("keeps comparison tables semantically accessible", async () => {
    const source = await readRepoFile("src/components/commerce/ComparisonTable.astro");
    expect(source).toContain("<table");
    expect(source).toContain("<caption>");
    expect(source).toContain('scope="col"');
    expect(source).toContain('scope="row"');
  });
});
