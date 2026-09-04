import { describe, expect, it } from "vitest";
import { validateHtml, validateWrangler } from "../scripts/preview-contract.mjs";

const safeHtml = `<!doctype html><html><head><meta name="robots" content="noindex,nofollow,noarchive,nosnippet"></head><body><main>Review-Preview</main></body></html>`;
const safeWrangler = `{
  "name":"headblade-germany-review",
  "assets":{"directory":"./dist"},
  "workers_dev":true,
  "preview_urls":true
}`;

describe("hard preview safety validator", () => {
  it("accepts a static noindex review page", () => {
    expect(() => validateHtml(safeHtml, "index.html")).not.toThrow();
  });

  it("rejects customer-data forms and transactional providers", () => {
    expect(() => validateHtml(`${safeHtml}<form><input type="email"></form>`, "form.html")).toThrow(/form|data/i);
    expect(() => validateHtml(`${safeHtml}<script>PayPal.Buttons()</script>`, "pay.html")).toThrow(/payment|transaction/i);
    expect(() => validateHtml(`${safeHtml}<p>Jetzt bezahlen</p>`, "checkout.html")).toThrow(/transaction/i);
  });

  it("rejects merchant Offer structured data in review HTML", () => {
    const merchantSchema = `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Product","offers":{"@type":"Offer","price":"21.95","priceCurrency":"EUR"}}</script>`;
    expect(() => validateHtml(`${safeHtml}${merchantSchema}`, "merchant.html")).toThrow(/offer|merchant|commerce/i);
  });

  it("rejects pages without the immutable preview robots directive", () => {
    expect(() => validateHtml("<html><head></head><body>Preview</body></html>", "bad.html")).toThrow(/robots|noindex/i);
  });

  it("accepts only an isolated workers.dev review configuration", () => {
    expect(() => validateWrangler(safeWrangler)).not.toThrow();
    expect(() => validateWrangler(`${safeWrangler}\n"routes":[{"pattern":"headblade.info/*"}]`)).toThrow(/production|routing/i);
    expect(() => validateWrangler(`${safeWrangler}\n"custom_domain":true`)).toThrow(/production|routing/i);
    expect(() => validateWrangler(`{"name":"headblade-germany-review","assets":{"directory":"./dist"},"workers_dev":false,"preview_urls":true}`)).toThrow(/workers\.dev|isolated/i);
    expect(() => validateWrangler(`{"name":"headblade-germany-review","assets":{"directory":"./dist"},"workers_dev":true,"preview_urls":false}`)).toThrow(/preview/i);
  });
});
