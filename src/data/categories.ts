export type ProductCategoryId =
  | "angebote"
  | "rasierer"
  | "klingen"
  | "pflege"
  | "lifestyle";

export interface ProductCategory {
  id: ProductCategoryId;
  name: string;
  path: string;
  description: string;
}

export const categories: readonly ProductCategory[] = [
  {
    id: "angebote",
    name: "Angebote & Bundles",
    path: "/angebote",
    description: "Starter-Sets und rabattierte Kombinationen.",
  },
  {
    id: "rasierer",
    name: "Rasierer",
    path: "/rasierer",
    description: "HeadBlade MOTO, ATX und ausgewählte Varianten.",
  },
  {
    id: "klingen",
    name: "Klingen & Zubehör",
    path: "/klingen-zubehoer",
    description: "HB4/HB6 Nachfüllklingen und Zubehör.",
  },
  {
    id: "pflege",
    name: "Pflege",
    path: "/pflege",
    description: "Gleitmittel und Pflege rund um die Kopfrasur.",
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    path: "/lifestyle",
    description: "Cases und ergänzendes Zubehör.",
  },
];
