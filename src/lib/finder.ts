export type Experience = "first" | "experienced";
export type GuidancePreference = "guided" | "flexible";
export type Need = "razor" | "blades" | "routine" | "starter";

export interface FinderAnswers {
  experience: Experience;
  guidance: GuidancePreference;
  need: Need;
}

export interface FinderRecommendation {
  primarySlug: string;
  alternativeSlug?: string;
  reasons: readonly string[];
  nextHref: string;
}

export function recommendHeadBlade(answers: FinderAnswers): FinderRecommendation {
  if (answers.need === "blades") {
    return {
      primarySlug: "klingenset-4blade",
      alternativeSlug: "klingenset-6blade",
      reasons: [
        "Bei Klingen entscheidet zuerst die Kompatibilität mit deinem vorhandenen HeadBlade-System.",
        "HB4 und HB6 werden deshalb direkt gegenübergestellt, statt dir ungefragt einen neuen Rasierer zu empfehlen.",
      ],
      nextHref: "/vergleich/hb4-vs-hb6",
    };
  }

  if (answers.need === "routine") {
    return {
      primarySlug: "headslick-5oz",
      reasons: [
        "Für eine Rasur-Routine ist zuerst die passende Vorbereitung und Gleitfähigkeit relevant.",
        "Die Pflegeübersicht erklärt die verfügbaren Review-Produkte ohne medizinische Bewertung deiner Kopfhaut.",
      ],
      nextHref: "/pflege",
    };
  }

  if (answers.experience === "first" && answers.guidance === "guided") {
    return {
      primarySlug: "headblade-atx-package",
      alternativeSlug: "headblade-moto",
      reasons: [
        "ATX ist im aktuellen HeadBlade-Sortiment die stärker geführte Einstiegsoption.",
        "Das geprüfte ATX-Paket kombiniert den Rasierer bereits mit HB4-Klingen.",
      ],
      nextHref: "/vergleich/moto-vs-atx",
    };
  }

  return {
    primarySlug: "headblade-moto",
    alternativeSlug: "headblade-atx-package",
    reasons: [
      "MOTO ist das konturorientierte Kernprodukt im aktuellen deutschen Review-Katalog.",
      "Die bewegliche Konstruktion ist auf flexible Führung entlang der Kopfform ausgelegt.",
    ],
    nextHref: "/vergleich/moto-vs-atx",
  };
}
