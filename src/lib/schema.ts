import type { Product } from "../data/products";

export type JsonLdRecord = Record<string, any>;

export function sanitizeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function buildProductJsonLd(product: Product): JsonLdRecord {
  const schema: JsonLdRecord = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short,
    image: [product.detailImage ?? product.image],
  };

  if (product.price !== null) {
    schema.offers = {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.price,
    };
  }

  return schema;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildBreadcrumbJsonLd(items: readonly BreadcrumbItem[]): JsonLdRecord {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path,
    })),
  };
}
