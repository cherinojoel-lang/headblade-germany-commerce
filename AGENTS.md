# AGENTS.md — Universal Agent Standard

## Identity

HeadBlade Germany — Review-Preview einer Produktseite für Kopfrasur-Systeme
(Astro 7, statisch, Cloudflare Workers Static Assets).

**Dieses Repo baut keinen Shop.** Es baut eine abnahmefähige Design- und
Funktionspreview. Warenkorb, Checkout, Zahlung und Kundendatenverarbeitung
existieren bewusst nicht.

## Source of Truth

- **Status:** `docs/ai/PROJECT_STATUS.md`
- **Kontext:** `docs/ai/PROJECT_CONTEXT.md`
- **Übergabe:** `docs/ai/CURRENT_HANDOFF.md`
- **Regeln:** `docs/ai/AGENT_RULES.md`
- **Belege:** `docs/ai/SOURCES.md`
- **Produktions-Gate:** `docs/OWNER_GATE.md`, `docs/PRODUCTION_CUTOVER.md`

## Non-Negotiables

Diese Punkte sind nicht verhandelbar und gelten unabhängig von der Aufgabe:

1. **`www.headblade.info` wird nicht angefasst.** Dort läuft ein aktiver
   Gambio-Shop mit Warenkorb und Sessions. Kein DNS, kein Routing, keine
   Custom Domain auf diese Adresse.
2. **Keine unbelegten Zertifizierungs- oder Auszeichnungsclaims.** Siehe den
   Fall des eingebrannten reddot-Badges in `docs/REVIEW_STATUS.md`.
3. **Keine Preise, Rechtstexte oder Versandangaben als produktionsgültig
   darstellen**, solange sie nicht neu freigegeben sind.
4. **`noindex,nofollow,noarchive,nosnippet` bleibt auf jeder Seite**, solange
   dies eine Preview ist.
5. **Keine Formulare, keine Kundendatenerfassung, keine Zahlungsanbieter,
   keine Analytics.**

## Verification Commands

| Zweck | Befehl |
| --- | --- |
| Typen/Astro | `npm run check` |
| Unit-Tests | `npm test` |
| Build | `npm run build` |
| Preview-Sicherheit | `npm run validate:preview` |
| alles zusammen | `npm run verify` |
| Browser-Tests | `npm run test:e2e` |
| Produktionsreife | `npm run assert:production` (bricht bewusst ab, siehe unten) |
| Bildpipeline | `npm run images` |

`npm run assert:production` ist das Gegenstück zu `validate:preview`: Es prüft,
ob der Build die Review-Sperren verlassen hat. Solange dies eine Preview ist,
**muss** es fehlschlagen. Ein grünes `assert:production` bei gleichzeitig
grünem `validate:preview` wäre ein Widerspruch und ein Fehler.

## Deploy-Pfade

| Workflow | Auslöser | Ziel |
| --- | --- | --- |
| `deploy-preview.yml` | Push auf `main`/`claude/**`/`feat/**`, oder manuell | Worker `headblade-germany-review`, Alias `review` |
| `deploy-production.yml` | nur manuell, Environment `production`, Checkbox | gesperrt durch das Readiness-Gate |

Cloudflare-Konto für dieses Projekt: `043ec899a435f150995d89f402ed7b12`
(Cherinojoel@gmail.com) — dasselbe Konto wie `automobile-quick` und `hsb-boden`.

## Handover Protocol

Vor Sessionende `docs/ai/CURRENT_HANDOFF.md` aktualisieren und committen.
Bei Designänderungen zusätzlich `docs/REVIEW_STATUS.md` fortschreiben.
