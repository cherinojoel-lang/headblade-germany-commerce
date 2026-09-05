import { site } from "../data/site";

export function pageTitle(title: string): string {
  const normalized = title.trim();
  if (!normalized || normalized === site.name) return site.name;
  if (normalized.endsWith(`| ${site.name}`)) return normalized;
  return `${normalized} | ${site.name}`;
}

export function canonicalForPreview(_path: string): undefined {
  return undefined;
}
