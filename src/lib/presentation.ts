import type { Product } from "../data/products";

export function productHref(product: Product): string {
  return `/produkt/${product.slug}`;
}

export function productImageAlt(product: Product): string {
  return `${product.name} – Produktansicht`;
}

export function reviewPurchaseLabel(): string {
  return "Review-Preview: Checkout bewusst deaktiviert";
}
