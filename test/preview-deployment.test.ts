import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

async function readRepoFile(path: string) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

describe("review deployment contract", () => {
  it("allows crawling while retaining noindex enforcement", async () => {
    const robots = await readRepoFile("public/robots.txt");
    const headers = await readRepoFile("public/_headers");
    expect(robots).toMatch(/User-agent:\s*\*/i);
    expect(robots).toMatch(/Allow:\s*\/\s*$/im);
    expect(robots).not.toMatch(/Disallow:\s*\/\s*$/im);
    expect(headers).toMatch(/X-Robots-Tag:\s*noindex/i);
  });

  it("uses version-only previews by default and gates the first Worker creation manually", async () => {
    const workflow = await readRepoFile(".github/workflows/deploy-preview.yml");
    expect(workflow).toContain("wrangler versions upload --preview-alias review");
    expect(workflow).toContain("bootstrap_review_worker:");
    expect(workflow).toContain('github.event_name }}" == "workflow_dispatch"');
    expect(workflow).toContain("wrangler deploy");
  });

  it("preserves Wrangler failures and verifies the public noindex endpoint", async () => {
    const workflow = await readRepoFile(".github/workflows/deploy-preview.yml");
    expect(workflow).toContain("set -euo pipefail");
    expect(workflow).toContain("X-Robots-Tag noindex");
    expect(workflow).toContain("HTTP 200");
    expect(workflow).toContain("review-body.html");
  });
});
