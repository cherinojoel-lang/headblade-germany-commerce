# HeadBlade Germany — Review Preview

Unabhängiger, statischer Redesign-Entwurf für HeadBlade Germany.

## Sicherheitsgrenze

- **Kein** Zugriff auf oder Deployment zu `headblade.info`
- **Kein** Checkout, keine Bestellung, keine Zahlung
- **Keine** Formulare oder Kundendatenerfassung
- `noindex,nofollow,noarchive` + `robots.txt: Disallow /`
- Cloudflare-Ziel ist ausschließlich ein separates `*.workers.dev` Review-Projekt

## Lokale Verifikation

```bash
npm test
node scripts/validate.mjs
```

Die App selbst benötigt zur Laufzeit keine Framework- oder CDN-Abhängigkeiten. Sie besteht aus statischem HTML/CSS/ES-Modulen und ist daher für eine Review-Preview bewusst klein und robust.

## Cloudflare Workers Static Assets

Die Konfiguration liegt in `wrangler.jsonc`:

- `assets.directory = ./public`
- `not_found_handling = single-page-application`
- `workers_dev = true`
- `preview_urls = true`

Beim **allerersten** Anlegen des Workers muss Cloudflare/Wrangler einmal `wrangler deploy` ausführen. Danach kann eine neue Review-Version ohne Traffic-Umschaltung mit `wrangler versions upload --preview-alias review` hochgeladen werden.

## Quellenstand

Produktnamen und Preise wurden am 03.09.2026 gegen den öffentlich sichtbaren deutschen Shop `headblade.info` geprüft. Produktbilder werden in dieser Review aus der bestehenden öffentlichen HeadBlade-Quelle geladen; vor einem Produktions-Livegang müssen die freigegebenen Originalassets lokal/first-party übernommen werden.
