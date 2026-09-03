import { describe, expect, it } from "vitest";
import { validateHtml, validateWrangler } from "../scripts/preview-contract.mjs";

const safeHtml = `<!doctype html><html><head><meta name="robots" content="noindex,nofollow,noarchive,nosnippet"></head><body><main>Review-Preview</main></body></html>`;

describe("hard preview safety validator", () => {
  it("accepts a static noindex review page", () => {
    expect(() => validateHtml(safeHtml, "index.html")).not.toThrow();
  });

  it("rejects customer-data forms and transactional providers", () => {
    expect(() => validateHtml(`${safeHtml}<form><input type="email"></form>`, "form.html")).toThrow(/form|data/i);
    expect(() => validateHtml(`${safeHtml}<script>PayPal.Buttons()</script>`, "pay.html")).toThrow(/payment|transaction/i);
    expect(() => validateHtml(`${safeHtml}<p>Jetzt bezahlen</p>`, "checkout.html")).toThrow(/transaction/i);
  });

  it("rejects pages without the immutable preview robots directive", () => {
    expect(() => validateHtml("<html><head></head><body>Preview</body></html>", "bad.html")).toThrow(/robots|noindex/i);
  });

  it("rejects production routing in Wrangler configuration", () => {
    expect(() => validateWrangler(`{"name":"headblade-germany-review","assets":{"directory":"./dist"}}`)).not.toThrow();
    expect(() => validateWrangler(`{"name":"headblade-germany-review","routes":[{"pattern":"headblade.info/*"}]}`)).toThrow(/production|routing/i);
    expect(() => validateWrangler(`{"name":"headblade-germany-review","custom_domain":true}`)).toThrow(/production|routing/i);
  });
});
