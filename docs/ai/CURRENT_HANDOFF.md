# Current Handoff: HeadBlade Germany

**Session-Ende:** 2026-09-20
**Branch:** `claude/headblade-pruefung-website-imy0xi`
**PR:** #3 — offen, `mergeable_state: clean`, alle Checks grün

## Was in dieser Session zuletzt getan wurde

1. **Bildschärfe behoben.** Der Inhaber meldete sichtbare Verpixelung.
   Gemessen statt geschätzt: schlechtester Fall lag bei 4.65× Hochskalierung
   auf einem 2×-Display. Zwei eigene Fehler gefunden und behoben — siehe
   `docs/REVIEW_STATUS.md`, Abschnitt „Bildschärfe": zwei Quellbilder waren
   unnötig klein importiert (600×600-Varianten lagen auf der eigenen Seite
   bereit), und ein CSS-Spezifitätsfehler hat das Hero-Breitenlimit seit
   seiner Einführung wirkungslos gemacht. Nachher: 1.99× schlechtester Fall.
2. **GA4/GSC/GTM vorbereitet, bewusst inaktiv.** Der Inhaber wollte
   ursprünglich, dass Google-Stack „fertig" ist. Das steht im direkten
   Widerspruch zu `docs/OWNER_GATE.md` („analytics activation" braucht eine
   separate, ausdrückliche Freigabe). Rückgefragt statt geraten — der
   Inhaber hat sich für „vorbereiten, aber inaktiv lassen" entschieden.
   Umgesetzt in `src/lib/analytics.ts` + `Analytics.astro` +
   `AnalyticsNoScript.astro`, gesteuert über `PRODUCTION_ANALYTICS_APPROVED`
   im `production`-Environment. Zwei automatisierte Gegenproben halten das
   fest: `validate:preview` bricht bei jedem Tracking-Marker in der Preview
   ab, `assert:production` bricht ab, wenn Freigabe-Flag und tatsächlicher
   Build-Inhalt auseinanderlaufen. Details: `docs/PRODUCTION_CUTOVER.md`
   Abschnitt 3a.

## Was in der Session davor getan wurde

1. **Struktur von auto-hub und hsb-boden übernommen.** headblade hatte weder
   `AGENTS.md` noch `CLAUDE.md` noch `docs/ai/`. Jetzt vorhanden, mit
   headblades eigenen geprüften Fakten gefüllt — nicht kopiert.
2. **Produktions-Deploy-Pfad angelegt** (`deploy-production.yml`), nach dem
   Muster von hsb-boden: nur manuell, GitHub-Environment `production`,
   zusätzliche Bestätigungs-Checkbox. Anders als bei hsb-boden ist er durch
   ein Readiness-Gate gesperrt.
3. **`scripts/assert-production-ready.mjs`** als Gegenstück zu
   `validate-preview.mjs`. Prüft, ob der Build die Review-Sperren verlassen
   hat.
4. **Veralteten Branch-Trigger korrigiert.** `deploy-preview.yml` hörte auf
   einen Branch, der seit PR #2 nicht mehr existiert; Preview-Deploys mussten
   von Hand ausgelöst werden.

## Wichtigster Befund über beide Sessions

Frühere Notizen in diesem Repo, auch von mir, behaupteten, ein Livegang
brauche eine **Nameserver-Umstellung beim Registrar**. Das ist falsch —
`hsb-boden.de` und `headblade.info` liegen auf denselben Nameservern, und
hsb-boden ist trotzdem live über Cloudflare, per CNAME.

Der eigentliche Blocker ist größer: **`www.headblade.info` ist ein laufender
Gambio-Shop** mit Warenkorb, Session-Cookies und `index,follow`. Die Preview
hat keinen Warenkorb und `noindex` auf jeder Seite. Ein Umbiegen der Domain
nähme einen funktionierenden Shop vom Netz.

## Nächster Schritt

Der Inhaber entscheidet zwischen den drei Wegen in `docs/PRODUCTION_CUTOVER.md`.
**Weg B** (eigene Subdomain, z. B. `neu.headblade.info`, per CNAME auf den
Worker) bleibt die Empfehlung. Zusätzlich offen, unabhängig davon: Freigabe
für echte Herstellerbilder in höherer Auflösung (headblade.com, bis 1251px)
und die Entscheidung, ob/wann Analytics aktiviert wird.

Ohne diese Entscheidungen ist hier nichts weiter zu tun, das nicht Risiko
erzeugt.
