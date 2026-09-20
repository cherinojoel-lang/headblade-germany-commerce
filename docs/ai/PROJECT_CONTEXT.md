# Project Context: HeadBlade Germany

## Was gebaut wird

Eine statische Review-Preview für HeadBlade Germany: Produktübersicht,
Produktdetailseiten, Vergleichsrouten (MOTO vs. ATX, HB4 vs. HB6, manuell vs.
elektrisch), ein lokal rechnender Produktfinder ohne Datenerfassung, und
Anleitungsseiten zur Kopfrasur.

Zweck ist die Abnahme von Design, Informationsarchitektur und Textqualität —
nicht der Betrieb eines Shops.

## Architektur

| Baustein | Entscheidung |
| --- | --- |
| Framework | Astro 7, vollständig statisch nach `dist/` |
| Sprache | TypeScript strict |
| Styling | Tailwind CSS 4 plus vier eigene Layer (siehe unten) |
| Hosting | Cloudflare Workers Static Assets, kein SSR-Adapter |
| Worker | `headblade-germany-review`, Konto `043ec899a435f150995d89f402ed7b12` |
| Seitenzahl | 28 statische Seiten |

### CSS-Schichtung

Die Stylesheets werden in dieser Reihenfolge geladen und überschreiben einander
bewusst:

```
global.css  →  accessibility.css  →  contour.css  →  motion-lab.css  →  motion-lab-refine.css
```

`motion-lab.css` ist die tatsächlich sichtbare Gestaltung; `contour.css` ist die
darunterliegende ältere Schicht. Wer eine Farbe oder Fläche ändert, muss prüfen,
ob eine spätere Schicht sie zurücksetzt. Genau daraus entstanden fünf
Kontrastfehler, darunter ein Button bei 1.08:1 (praktisch unsichtbar) — siehe
`docs/REVIEW_STATUS.md`.

### Bildpipeline

`assets/produkte-quelle/` enthält die unveränderten Importe und wird **nicht**
ausgeliefert. `npm run images` erzeugt daraus `public/media/produkte/` und
`src/data/product-image-sizes.ts`. Sechs Motive sind freigestellt, vier bleiben
Packshots, weil sie sich nicht sauber trennen lassen. Das Verfahren und seine
Grenzen stehen im Kopf von `scripts/cutout-product-images.mjs`.

## Umfeld

`www.headblade.info` ist ein laufender Gambio-Shop, nicht ein Platzhalter.
Diese Preview steht daneben, nicht davor. Die geprüften Details stehen in
`docs/PRODUCTION_CUTOVER.md`.

## Verwandte Projekte im selben Cloudflare-Konto

| Projekt | Stack | Domain-Stand |
| --- | --- | --- |
| `automobile-quick` (auto-hub) | Astro SSR + D1/KV/AI | `custom_domain`-Routen konfiguriert; die Domain wird derzeit von nginx bedient |
| `hsb-boden` | Astro statisch → Cloudflare **Pages** | live: `www.hsb-boden.de` per CNAME auf `hsb-boden.pages.dev` |
| `headblade-germany-review` | Astro statisch → Workers Static Assets | nur `workers.dev`, bewusst ohne Domain |
