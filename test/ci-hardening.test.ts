import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const workflowPaths = [
  ".github/workflows/ci.yml",
  ".github/workflows/e2e.yml",
  ".github/workflows/lighthouse.yml",
  ".github/workflows/security.yml",
  ".github/workflows/deploy-preview.yml",
] as const;

async function readRepoFile(path: string) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

describe("CI hardening contract", () => {
  it("declares the known-good npm resolver for reproducible installs", async () => {
    const packageJson = JSON.parse(await readRepoFile("package.json"));
    expect(packageJson.packageManager).toBe("npm@11.6.0");
  });

  it("pins every external action or reusable workflow to an immutable full commit SHA", async () => {
    for (const path of workflowPaths) {
      const source = await readRepoFile(path);
      const uses = [...source.matchAll(/^\s*(?:-\s*)?uses:\s*([^\s#]+)/gm)].map((match) => match[1]);
      expect(uses.length, `${path} should contain at least one uses reference`).toBeGreaterThan(0);

      for (const reference of uses) {
        if (reference.startsWith("./")) continue;
        const separator = reference.lastIndexOf("@");
        expect(separator, `${path}: ${reference} must include @<sha>`).toBeGreaterThan(0);
        const ref = reference.slice(separator + 1);
        expect(ref, `${path}: ${reference} must use a 40-character SHA`).toMatch(/^[0-9a-f]{40}$/i);
      }
    }
  });

  it("cancels superseded runs for every hardened workflow", async () => {
    for (const path of workflowPaths) {
      const source = await readRepoFile(path);
      expect(source, `${path} must define concurrency`).toMatch(/^concurrency:\s*$/m);
      expect(source, `${path} must cancel superseded runs`).toMatch(/^\s+cancel-in-progress:\s*true\s*$/m);
      expect(source, `${path} must scope the concurrency group`).toMatch(/^\s+group:\s*\$\{\{\s*github\.workflow\s*\}\}/m);
    }
  });

  it("does not execute unversioned one-shot npx packages", async () => {
    for (const path of workflowPaths) {
      const source = await readRepoFile(path);
      const oneShotPackages = [...source.matchAll(/\bnpx\s+--yes\s+([^\s]+)/g)].map((match) => match[1]);
      for (const packageSpec of oneShotPackages) {
        expect(packageSpec, `${path}: ${packageSpec} must include an explicit version`).toMatch(/^@?[^@\s]+(?:\/[^@\s]+)?@\d/);
      }
    }
  });
});
