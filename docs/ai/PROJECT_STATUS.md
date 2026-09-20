# Project Status: HeadBlade Germany

Stand: **2026-09-20**

## Kurzfassung

Die Review-Preview ist inhaltlich und technisch abnahmefähig und läuft öffentlich.
Ein Livegang unter `www.headblade.info` ist **nicht** erreicht und mit dem
aktuellen Funktionsumfang auch nicht erreichbar — dort läuft ein aktiver Shop,
den diese Preview nicht ersetzen kann.

## Live

**`https://review-headblade-germany-review.cherinojoel.workers.dev`**

Unabhängig geprüft (nicht nur CI-Status gelesen): acht Review-Routen `200`,
unbekannte Pfade `404`, `x-robots-tag: noindex`, zehn Produktbilder `200` als
`image/webp` (295 KB gesamt), keine externen Assets, keine Referenz auf
`headblade.info/images`.

## Qualitätsstand

| Gate | Ergebnis |
| --- | --- |
| `npm run check` | 0 Fehler |
| `npm test` | 81/81 |
| `npm run build` | 28 Seiten |
| `npm run validate:preview` | `PREVIEW_VALIDATION_OK` |
| Chromium-e2e | 6/6 |
| Lighthouse (beide CI-Seiten) | Performance 1.0 · Accessibility 1.0 · Best Practices 1.0 · SEO 1.0 |
| `npm audit --audit-level=high` | 0 Vulnerabilities |
| `npm run assert:production` | **bricht ab** — korrekt, dies ist eine Preview |

## Was zuletzt passiert ist

1. **Security** — kritische Astro-Kette gepatcht (RCE über AVIF-Optimierung,
   Auth-Bypass), dazu wrangler und vitest.
2. **Bilder first-party** — zehn Produktbilder mit Inhaberfreigabe übernommen;
   seither lädt die Preview keine externen Assets mehr.
3. **Kontrast** — fünf Befunde, eine Ursache: der Motion-Lab-Layer hat Flächen
   umgefärbt, während die Farbregeln an `.section--dark` hingen. Schlimmster
   Fall 1.08:1.
4. **Design-Durchgang** — Kernbefund lag im Bildmaterial, nicht im CSS: alle
   zehn Quellbilder trugen einen eingebrannten Studiohintergrund (49–81 % der
   Fläche). Freistell-Pipeline gebaut, Kacheln entfernt, Hero neu komponiert,
   eingebrannter reddot-Badge entfernt.
5. **Betriebs-Gerüst** — `AGENTS.md`, `CLAUDE.md`, `docs/ai/` nach dem Muster
   von auto-hub und hsb-boden ergänzt; Produktions-Deploy-Pfad angelegt und
   durch ein Readiness-Gate gesperrt.

## Offen

| Punkt | Wer |
| --- | --- |
| PR #3 reviewen und mergen | Inhaber |
| Entscheidung Weg A/B/C aus `docs/PRODUCTION_CUTOVER.md` | Inhaber |
| Preise und Rechtstexte für Produktion neu freigeben | Inhaber |
| Shop-Funktionen (Warenkorb, Checkout, Zahlung) | eigenes Projekt, nicht begonnen |

## Bewusst nicht vorhanden

Warenkorb, Checkout, Zahlung, Formulare, Kundendatenerfassung, Analytics,
Consent-Layer, Produktionsdomain, Produktionsrouting.
