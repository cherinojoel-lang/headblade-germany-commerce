import type { ProductCategoryId } from "../data/categories";
import { products, type Product } from "../data/products";

export function formatPrice(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return "Preis vor Livegang bestätigen";
  }

  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function searchProducts(
  query: string,
  list: readonly Product[] = products,
): Product[] {
  const normalized = String(query ?? "").trim().toLocaleLowerCase("de-DE");
  if (!normalized) return [...list];

  return list.filter((product) => {
    const haystack = [
      product.name,
      product.short,
      product.compatibility,
      ...product.keywords,
    ]
      .join(" ")
      .toLocaleLowerCase("de-DE");

    return haystack.includes(normalized);
  });
}

export function productsByCategory(
  category: ProductCategoryId,
  list: readonly Product[] = products,
): Product[] {
  return list.filter((product) => product.categories.includes(category));
}
