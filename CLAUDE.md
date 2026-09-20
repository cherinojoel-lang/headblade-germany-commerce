# Claude Adapter: HeadBlade Germany

`AGENTS.md` zuerst lesen, dann den Repo-Kontext in `docs/ai/`.

Lesereihenfolge:
1. `AGENTS.md`
2. `docs/ai/PROJECT_CONTEXT.md`
3. `docs/ai/PROJECT_STATUS.md`
4. `docs/ai/CURRENT_HANDOFF.md`
5. `docs/ai/AGENT_RULES.md`

## Was dieses Projekt ist — und was nicht
Eine **Review-Preview**, optimiert für die Eigentümer-Abnahme unter der `workers.dev`-Adresse.
Es heißt **nicht** Live-Domain unter `www.headblade.info`.
Details und die geprüften Belege: `docs/PRODUCTION_CUTOVER.md`.

## Harte Regeln
- Kein DNS-, Routing- oder Custom-Domain-Zugriff auf `headblade.info`.
- Kein `routes`-Block in `wrangler.jsonc` — `validate-preview.mjs` bricht darauf ab, und zwar absichtlich.
- Kein Zahlungsanbieter, unsichere Formulare oder Analytics.
- Keine unbelegten Auszeichnungs- oder Zertifizierungsclaims.
- Keine Secrets anzeigen oder committen.

## Befehle & Verifikation
```bash
npm run dev           # lokal
npm run check         # astro check + Typen
npm test              # Vitest Suite
npm run build         # Astro statischer Build
npm run validate:preview # Preview-Vertragsprüfung
npm run verify        # vollständige Pipeline
```

## Bei Designarbeit
Nicht am Quelltext beurteilen, sondern am gebauten Ergebnis. Screenshots des Builds ansehen, auf Desktop und Mobil.

## Abschluss
`docs/ai/CURRENT_HANDOFF.md` fortschreiben, dann committen.
