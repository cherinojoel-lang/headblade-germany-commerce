# HeadBlade Germany – Vollwertiger Shop ohne Abo-Modell: Discovery & Spec Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Dieser Plan endet mit einer **freigegebenen Spec**, nicht mit Checkout-Code. Der Implementierungsplan wird danach mit `superpowers:writing-plans` aus der Spec erzeugt.

**Goal:** Entscheidungsreife Spec für den Umbau des Review-Entwurfs zu einem echten E-Commerce-Shop für headblade.info: ohne monatliche Plattformgebühr (kein Shopify-Abo), rechtssicher in DE und mit mindestens der Konversionsqualität des bestehenden Shops.

**Architecture:** Drei Phasen: (1) Sammler: Ist-Shop, frühere Arbeit, Produkt- und Preisdaten. (2) Recherche und Optionsvergleich der abofreien Shop-Architekturen. (3) Spec plus Owner-Freigabe. Erst danach wird die README-Sicherheitsgrenze (kein Checkout, keine Formulare, `noindex`, kein Zugriff auf headblade.info) aufgehoben, und zwar ausdrücklich durch den Nutzer.

**Tech Stack (heute):** Astro 7 statisch, TypeScript strict, Tailwind 4, Vitest, Playwright, Worker `headblade-germany-review` (`*.workers.dev`).

**Spec:** Masterplan `~/KI-System/ObsidianVault/brain/05_reports/2026-09-23-portfolio-autopilot-masterplan.md`.

## Global Constraints

- README-Sicherheitsgrenze bleibt in Kraft, bis der Nutzer die Spec freigibt.
- Nur lesender Zugriff auf `headblade.info`: kein Login, keine Bestellung, kein Formular.
- Kein Anbieter wird aus dem Gedächtnis gewählt. Jede Gebühr wird mit Quell-URL und Abrufdatum belegt.
- Kein Push, kein Deploy, kein DNS.

## Sammler-Befunde (2026-09-23)

| Befund | Beleg |
|---|---|
| Review-Entwurf gemergt (PR #2), 78 Unit- und 12 Browser-Tests grün, 28 Seiten, „Motion Lab“-Design | active_state `headblade_germany_closure_20260905` |
| 11 Produkte in `src/data/products.ts`, `price: number \| null` → Preise teilweise unbekannt | `grep -c slug:` = 11 |
| Bildpfade `headblade.info/images/product_images/{info,popup}_images/…` → Hinweis auf einen selbst gehosteten Shop der xt:Commerce-Familie (modified eCommerce/Gambio). **Unbestätigt**, siehe Task 1 | `products.ts:32-44` |
| Jules-Session 15228041403965837991 „awaiting_user_feedback“ | active_state |
| Drive-Ordner „HeadBlade Germany — Shop Audit & Growth“ (`1-zbKXQDdM-bmtcoLMR1Wt6qNXoOPtlqw`) | active_state |
| 1 lokaler Commit nicht gepusht (`94c43c6`) | `git rev-list` |

## Review Focus (für die Spec)

1. **Preis fehlt (`price: null`)**: Das Produkt darf nicht kaufbar sein, es muss „Preis auf Anfrage“ oder ausgeblendet werden.
2. **Button-Lösung (§ 312j BGB)**: Der finale Button muss „zahlungspflichtig bestellen“ o. ä. heißen.
3. **Grundpreis (PAngV)** bei Klingen-Packs, dazu Versandkosten vor dem Checkout.
4. **Widerruf**: Belehrung und Muster-Formular, seit 2026 zusätzlich die elektronische Widerrufsfunktion. Stand vorher recherchieren.
5. **Lagerbestand 0**: Überverkauf verhindern.

---

### Task 1: Sammler – Ist-Shop und frühere Arbeit

- [ ] **Step 1: Shop-Software identifizieren (read-only)**
```bash
curl -sI https://www.headblade.info/ | grep -iE 'server|x-powered|set-cookie' | sed 's/=.*/=…/'
curl -s https://www.headblade.info/ | grep -oiE 'gambio|modified eCommerce|xt:Commerce|shopware|woocommerce|generator[^>]{0,80}' | sort -u
```
Ergebnis mit Beleg in `docs/discovery/2026-09-23-ist-shop.md`.
- [ ] **Step 2:** Drive-Ordner `1-zbKXQDdM-bmtcoLMR1Wt6qNXoOPtlqw` listen (`google-workspace-cherinojoel__list_folder`) und das Shop-Audit lesen. Die Kernbefunde übernehmen.
- [ ] **Step 3:** Jules-Session-Stand prüfen (URL im State). Offene Rückfragen notieren, nicht beantworten.
- [ ] **Step 4:** Live-Produktkatalog (Name, Preis, Grundpreis, Versand, Varianten) per Claude-in-Chrome einlesen und gegen `src/data/products.ts` abgleichen. Differenztabelle erstellen.

### Task 2: Recherche abofreier Architekturen

- [ ] **Step 1:** Agent `research-scout` beauftragen. Er vergleicht mit Quellen und Abrufdatum, jeweils mit Fixkosten pro Monat, Transaktionsgebühr, Hosting, DE-Rechtskonformität (Button-Lösung, Widerruf, Rechnungen/XRechnung, OSS) und Aufwand:
  1. Bestehende Shop-Software aus Task 1 behalten und nur das Frontend modernisieren (Headless oder Theme).
  2. Astro-Frontend + Stripe Checkout/Payment Links (keine Grundgebühr, nur Transaktionsgebühr) + Cloudflare D1 für Bestellungen.
  3. Astro-Frontend + PayPal Checkout + Rechnungskauf-Anbieter.
  4. Open-Source-Commerce-Backend (z. B. Shopware CE, Medusa) selbst gehostet, inklusive realer Hosting- und Wartungskosten.
  Ausschlusskriterium: Jede Lösung mit monatlicher Plattformgebühr (Shopify, Snipcart u. ä.). Diese Einstufung ist per Quelle zu belegen.
- [ ] **Step 2:** Rechtliche Pflichtliste für DE-Onlineshops 2026 mit Quellen (§ 312j BGB, PAngV, VerpackG/LUCID, ElektroG falls Rasierer mit Akku, BattG, Widerruf inkl. Widerrufsbutton, DSGVO/TTDSG-Consent, OS-Plattform-Hinweis Stand 2026).

### Task 3: Brainstorming und Spec

- [ ] **Step 1:** Skill `superpowers:brainstorming` mit den Ergebnissen aus Task 1 und 2. Die Optionen vorlegen, **eine** Empfehlung mit Begründung geben (Kosten/Monat, Risiko, Aufwand).
- [ ] **Step 2:** Die Spec nach `docs/superpowers/specs/2026-09-2x-hb-shop-design.md` schreiben. Darin: Architektur, Datenmodell (Produkt, Variante, Bestand, Bestellung), Checkout-Fluss, Rechtsseiten, SEO-Migration (301-Mapping alter URLs auf neue), Tracking/Consent, Conversion-Muster (Skill `anthropic-skills:ui-ux-conversion`).
- [ ] **Step 3: Owner-Gate.** Der Nutzer gibt frei: Architektur, Zahlungsanbieter, Aufhebung der Sicherheitsgrenze, Domain-Strategie. Ohne Freigabe endet dieser Plan hier.
- [ ] **Step 4:** Nach der Freigabe mit `superpowers:writing-plans` den Implementierungsplan aus der Spec erzeugen (Worktree `.worktrees/hb-shop`, Loop-Kontrakt nach `sicherer-loop`, Ultrareview-Kandidat für den 2. Freilauf).
- [ ] **Step 5:** `active_state.json` → `headblade_shop_discovery_20260923` schreiben.
