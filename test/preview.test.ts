import { describe, expect, it } from "vitest";
import { PREVIEW_MODE, previewRobots } from "../src/lib/preview";

describe("review preview contract", () => {
  it("keeps preview mode permanently enabled in this branch", () => {
    expect(PREVIEW_MODE).toBe(true);
  });

  it("blocks indexing", () => {
    expect(previewRobots()).toBe("noindex,nofollow,noarchive,nosnippet");
  });
});
