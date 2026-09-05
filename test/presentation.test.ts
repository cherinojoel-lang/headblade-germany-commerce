import { describe, expect, it } from "vitest";
import { getProduct } from "../src/lib/catalog";
import {
  productHref,
  productImageAlt,
  reviewPurchaseLabel,
} from "../src/lib/presentation";

describe("review presentation contract", () => {
  it("creates safe product links and meaningful image text", () => {
    const moto = getProduct("headblade-moto")!;
    expect(productHref(moto)).toBe("/produkt/headblade-moto");
    expect(productImageAlt(moto)).toContain("HeadBlade MOTO");
  });

  it("uses an explicitly non-transactional purchase state", () => {
    expect(reviewPurchaseLabel()).toBe("Review-Preview: Checkout bewusst deaktiviert");
  });
});
