# Current Handoff: HeadBlade Germany

**Session-Ende:** 2026-09-20
**Branch:** `claude/headblade-pruefung-website-imy0xi`
**PR:** #3 — offen, `mergeable_state: clean`, alle Checks grün

## Was in dieser Session getan wurde

1. **Struktur von auto-hub und hsb-boden übernommen.** headblade hatte weder
   `AGENTS.md` noch `CLAUDE.md` noch `docs/ai/`. Beide Referenzprojekte haben
   das. Jetzt vorhanden, mit headblades eigenen geprüften Fakten gefüllt —
   nicht kopiert.
2. **Produktions-Deploy-Pfad angelegt** (`deploy-production.yml`), nach dem
   Muster von hsb-boden: nur manuell, GitHub-Environment `production`, zusätzliche
   Bestätigungs-Checkbox. Anders als bei hsb-boden ist er durch ein
   Readiness-Gate gesperrt.
3. **`scripts/assert-production-ready.mjs`** als Gegenstück zu
   `validate-preview.mjs`. Prüft, ob der Build die Review-Sperren verlassen hat.
   Läuft aktuell mit fünf benannten Blockern auf Fehler — so gewollt.
4. **Veralteten Branch-Trigger korrigiert.** `deploy-preview.yml` hörte auf
   `feat/astro-headblade-premium`, das seit PR #2 kein Arbeitsbranch mehr ist.
   Deshalb musste jeder Preview-Deploy von Hand ausgelöst werden.
5. **Infrastruktur real nachgeprüft** statt angenommen — siehe unten.

## Wichtigster Befund dieser Session

Frühere Notizen in diesem Repo, auch von mir, behaupteten, ein Livegang brauche
eine **Nameserver-Umstellung beim Registrar**. Das ist falsch.

`hsb-boden.de` und `headblade.info` liegen auf denselben Nameservern
(All-Inkl). hsb-boden ist trotzdem live über Cloudflare — per **CNAME** auf
`hsb-boden.pages.dev`. Der Weg steht für headblade offen.

Der eigentliche Blocker ist ein anderer und größer: **`www.headblade.info` ist
ein laufender Gambio-Shop** mit Warenkorb, Session-Cookies und `index,follow`.
Die Preview hat keinen Warenkorb und `noindex` auf jeder Seite. Ein Umbiegen
der Domain nähme einen funktionierenden Shop vom Netz und entfernte ihn aus dem
Index.

## Nächster Schritt

Der Inhaber entscheidet zwischen den drei Wegen in `docs/PRODUCTION_CUTOVER.md`.
**Weg B** (eigene Subdomain, z. B. `neu.headblade.info`, per CNAME auf den
Worker) ist der realistische nächste Schritt: Das neue Design wird unter eigener
Adresse zeigbar, ohne den laufenden Shop anzufassen. Dafür genügt ein
CNAME-Eintrag bei All-Inkl plus eine Custom Domain am Worker.

Ohne diese Entscheidung ist hier nichts weiter zu tun, das nicht Risiko erzeugt.
