import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

describe("Cart Drawer and E-Commerce Interactions", () => {
  it("renders cart trigger in site header with accessible label and live badge", async () => {
    const header = await read("src/components/layout/Header.astro");
    expect(header).toContain('class="cart-trigger js-cart-trigger"');
    expect(header).toContain('aria-label="Warenkorb öffnen"');
    expect(header).toContain('class="cart-badge js-cart-badge"');
  });

  it("includes CartDrawer in BaseLayout before closing body", async () => {
    const layout = await read("src/layouts/BaseLayout.astro");
    expect(layout).toContain('import CartDrawer from "../components/commerce/CartDrawer.astro";');
    expect(layout).toContain("<CartDrawer />");
  });

  it("provides add-to-cart button on ProductHero with required data attributes", async () => {
    const hero = await read("src/components/commerce/ProductHero.astro");
    expect(hero).toContain('class="button button--red button--add-cart js-add-to-cart"');
    expect(hero).toContain("data-id={product.slug}");
    expect(hero).toContain("data-name={product.name}");
    expect(hero).toContain("data-price={product.price}");
    expect(hero).toContain("In den Warenkorb");
  });

  it("strictly adheres to the preview contract (no forms, no payment providers, no transactional checkout URLs)", async () => {
    const drawer = await read("src/components/commerce/CartDrawer.astro");
    expect(drawer).not.toMatch(/<form\b/i);
    expect(drawer).not.toMatch(/type=["'](?:email|tel|password)["']/i);
    expect(drawer).not.toMatch(/paypal|stripe|klarna|checkout\.com/i);
    expect(drawer).not.toMatch(/jetzt bezahlen|bestellung absenden/i);
    expect(drawer).not.toMatch(/(?:href|action)=["'][^"']*(?:\/checkout\b|\/warenkorb\b|\/cart\b)/i);
  });
});
