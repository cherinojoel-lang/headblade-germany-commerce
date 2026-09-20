---
name: deploy-preview
description: Preview-Deploy fuer dieses Cloudflare-Projekt — nur nach check, Tests und Dry-Run. Production-Deploy nie ohne ausdrueckliche Freigabe.
disable-model-invocation: true
---

# deploy-preview

Reihenfolge, keine Schritte ueberspringen. Abbruch beim ersten Fehler; Ausgabe zeigen, nicht zusammenfassen.

Arbeitsverzeichnis: Projektroot

1. `git status --porcelain` — uncommitted Aenderungen benennen (kein Deploy von unbekanntem Stand).
2. `npm run check`
3. `npm run test`
4. `npm run validate:preview`
5. `npm run verify`
6. Preview-URL aus der Ausgabe nennen und einen Smoke-Test (`curl -sI <url>` → HTTP 200) zeigen.

Nie: `npx wrangler deploy (Ziel nur headblade-germany-review auf workers.dev)` — Production ausschliesslich nach Freigabe des Nutzers in derselben Nachricht.
