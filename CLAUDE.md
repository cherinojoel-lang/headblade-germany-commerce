# Claude Adapter: HeadBlade Germany

`AGENTS.md` zuerst lesen, dann den Repo-Kontext in `docs/ai/`.

Lesereihenfolge:

1. `AGENTS.md`
2. `docs/ai/PROJECT_CONTEXT.md`
3. `docs/ai/PROJECT_STATUS.md`
4. `docs/ai/CURRENT_HANDOFF.md`
5. `docs/ai/AGENT_RULES.md`

## Was dieses Projekt ist — und was nicht

Eine **Review-Preview**, keine Shop-Ablösung. Wer hier „fertigstellen" hört,
muss wissen: Fertig heißt abnahmefähige Preview unter der `workers.dev`-Adresse.
Es heißt **nicht** live unter `www.headblade.info` — dort läuft ein aktiver
Gambio-Shop, den diese Preview funktional nicht ersetzen kann.
Details und die geprüften Belege: `docs/PRODUCTION_CUTOVER.md`.

## Harte Regeln

- Kein DNS-, Routing- oder Custom-Domain-Zugriff auf `headblade.info`.
- Kein `routes`-Block in `wrangler.jsonc` — `validate-preview.mjs` bricht darauf ab,
  und zwar absichtlich.
- Kein Warenkorb, Checkout, Zahlungsanbieter, Formular oder Analytics.
- Keine unbelegten Auszeichnungs- oder Zertifizierungsclaims.
- Preise und Rechtstexte nicht als produktionsgültig ausgeben.
- Keine Secrets anzeigen oder committen.

## Vor jedem Commit

```bash
npm run verify        # check + test + build + validate:preview
npm run test:e2e      # Chromium reicht lokal; CI fährt alle vier Projekte
```

Bei Bildänderungen zusätzlich `npm run images` und das Ergebnis **ansehen** —
die Freistell-Pipeline ist heuristisch, nicht garantiert. Kontaktabzug
(`scripts/cutout-product-images.mjs`) erzeugt die Dateien aus
`assets/produkte-quelle/`; `public/media/produkte/` ist generiert und wird nicht
von Hand bearbeitet.

## Bei Designarbeit

Nicht am Quelltext beurteilen, sondern am gebauten Ergebnis. Screenshots des
Builds ansehen, auf Desktop und Mobil. Der teuerste Fehler dieses Projekts war
zwei Runden lang unsichtbar, weil er nur im Bildmaterial stand und nicht im CSS
(siehe `docs/REVIEW_STATUS.md`, Abschnitt Design-Durchgang).

## Abschluss

`docs/ai/CURRENT_HANDOFF.md` fortschreiben, dann committen.
