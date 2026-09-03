import { categories, type ProductCategory, type ProductCategoryId } from "../data/categories";
import { products, type Product } from "../data/products";
import { productsByCategory } from "./catalog";

export function productRoute(product: Product): string {
  return `/produkt/${product.slug}`;
}

export function categoryPagePath(category: ProductCategoryId): string {
  return categories.find((entry) => entry.id === category)?.path ?? "/produkte";
}

export function categoryProducts(category: ProductCategoryId): Product[] {
  return productsByCategory(category, products);
}

export function primaryProductCategory(product: Product): ProductCategory | undefined {
  const primaryId = product.categories.find((category) => category !== "angebote") ?? product.categories[0];
  return categories.find((category) => category.id === primaryId);
}
