import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";

const read = (path: string) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const routes = [
  "src/pages/finder/index.astro",
  "src/pages/anleitungen/index.astro",
  "src/pages/impressum/index.astro",
  "src/pages/datenschutz/index.astro",
  "src/pages/404.astro",
] as const;

const authorityGuides = [
  "src/pages/anleitungen/kopf-richtig-rasieren.astro",
  "src/pages/anleitungen/erste-kopfrasur.astro",
  "src/pages/anleitungen/kopfhaut-pflegen.astro",
] as const;

describe("informational route contract", () => {
  it("ships every owner-review information route", async () => {
    for (const route of routes) {
      expect((await read(route)).trim().length).toBeGreaterThan(100);
    }
  });

  it("ships three substantial first-party authority guides", async () => {
    for (const route of authorityGuides) {
      const source = await read(route);
      expect(source.length).toBeGreaterThan(1200);
      expect(source).toContain("<BaseLayout");
      expect(source).toMatch(/href="\/produkt\//);
      expect(source).toMatch(/href="\/anleitungen\//);
      expect(source).not.toMatch(/heilt|therapiert|garantiert reizungsfrei/i);
    }
  });

  it("makes the beginner guide explicitly non-medical and safety-oriented", async () => {
    const beginner = await read(authorityGuides[1]);
    expect(beginner).toMatch(/Verletzung|anhaltend|medizinisch|ärztlich/i);
    expect(beginner).toMatch(/Pause|stoppen|unterbrechen/i);
  });

  it("promotes the authority guides from the guide index", async () => {
    const index = await read(routes[1]);
    expect(index).toContain('href="/anleitungen/kopf-richtig-rasieren"');
    expect(index).toContain('href="/anleitungen/erste-kopfrasur"');
    expect(index).toContain('href="/anleitungen/kopfhaut-pflegen"');
  });

  it("finder and guide never collect customer data", async () => {
    const source = `${await read(routes[0])}\n${await read(routes[1])}`;
    expect(source).not.toMatch(/<form\b|type=["'](?:email|tel|password)["']/i);
    expect(source).toMatch(/HeadBlade Fit|Produktfinder/i);
    expect(source).toMatch(/Kopfrasur|Rasur/i);
  });

  it("legal preview names the verified business identity and contact", async () => {
    const imprint = await read(routes[2]);
    const privacy = await read(routes[3]);
    expect(imprint).toMatch(/LAV Verwaltungs GmbH|site\.legalName/);
    expect(imprint).toMatch(/info@headblade\.info|site\.email/);
    expect(privacy).toMatch(/Datenschutz/i);
    expect(`${imprint}\n${privacy}`).not.toMatch(/<form\b/i);
  });

  it("has a branded not-found route", async () => {
    const page = await read(routes[4]);
    expect(page).toMatch(/404/);
    expect(page).toMatch(/HeadBlade|rasier/i);
  });
});
