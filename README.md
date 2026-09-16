# HeadBlade Germany — Premium Review Preview

Statischer Astro-7-Redesign-Entwurf für HeadBlade Germany. Die Architektur übernimmt die Engineering-Disziplin aus HSB-Boden — zentrale Layouts, typisierte Daten, SEO-/Accessibility-Verträge, CI, Security und Lighthouse — mit einer eigenständigen Premium-DTC-Produktgestaltung für HeadBlade.

## Sicherheitsgrenze

Diese Branch-Version ist ausschließlich für öffentliche Review/Abnahme bestimmt:

- **kein** Deployment, DNS- oder Routingzugriff auf `headblade.info`
- **kein** Warenkorb, Checkout, Bestellung oder Zahlung
- **keine** Formulare oder Kundendatenerfassung
- **keine** Analytics-, Ads- oder Consent-abhängigen Drittanbieter-Skripte
- `noindex,nofollow,noarchive,nosnippet` in jeder Seite
- `robots.txt` erlaubt Crawling bewusst, damit Suchmaschinen die `noindex`-Direktiven lesen können
- `_headers` erzwingt zusätzlich `X-Robots-Tag: noindex` und Security-Header
- Cloudflare-Ziel ist ausschließlich der separate Worker `headblade-germany-review` auf `*.workers.dev`

## Architektur

- Astro 7, statisches Prerendering nach `dist/`
- TypeScript strict
- Tailwind CSS 4 + lokal gebündelte Outfit-Fonts
- typisierte Produkt-/Kategorie-/Site-Daten
- zentrale SEO- und JSON-LD-Helfer
- semantisches, tastaturbedienbares Layout mit Skip-Link und Reduced-Motion-Support
- 22 statische Review-Seiten einschließlich Produktdetails, Lifestyle-Kategorie, Finder, Anleitung, Rechtstext-Preview und 404
- Cloudflare Workers Static Assets; kein Astro-Cloudflare-Adapter solange SSR unnötig ist

## Verifikation

```bash
npm ci
npm run check
npm test
npm run build
npm run validate:preview
```

Oder vollständig:

```bash
npm run verify
```

Der Validator stoppt den Build bei Formularen/Kundendatenfeldern, Zahlungsanbietern bzw. transaktionaler Checkout-Sprache, fehlender `noindex`-Absicherung, einer `robots.txt`-Sperre, die `noindex` vor Crawlern verstecken würde, oder Produktionsrouting im Wrangler-Setup.

GitHub Actions führt zusätzlich getrennte CI-, Secret-/Dependency-/npm-Audit-, Browser-Smoke- und Lighthouse-Gates aus. Lighthouse prüft Performance, Accessibility, Best Practices und SEO; nur der Audit `is-crawlable` wird in der Review absichtlich übersprungen, weil `noindex` hier zwingende Sicherheitsanforderung ist.

## Cloudflare Workers Static Assets

`wrangler.jsonc` enthält ausschließlich:

- Worker: `headblade-germany-review`
- `assets.directory = ./dist`
- `not_found_handling = 404-page`
- `workers_dev = true`
- `preview_urls = true`
- keine Route und keine Custom Domain für `headblade.info`

Der allererste Aufbau des isolierten Review-Workers benötigt einmalig und manuell:

```bash
npm run cf:review-bootstrap
```

Danach werden Review-Versionen ohne Produktionsdeployment mit:

```bash
npm run cf:preview
```

hochgeladen. Der GitHub-Workflow nutzt bei normalen Branch-Pushes `wrangler versions upload --preview-alias review`; ein `wrangler deploy` ist nur hinter dem expliziten manuellen Bootstrap-Gate möglich. Eine Verbindung oder Migration der Produktionsdomain ist ein separates Owner-Gate und ausdrücklich nicht Teil dieses Branches.

## Review-Daten und Assets

Produktnamen und Preise wurden am 03.09.2026 gegen den öffentlich sichtbaren deutschen Shop geprüft.

Die Produktbilder wurden am 16.09.2026 mit Inhaberfreigabe aus der HeadBlade-Germany-Quelle übernommen und liegen seitdem first-party unter `public/media/produkte/`. Es wird nichts mehr von `headblade.info` hotverlinkt — die Review-Preview lädt keine externen Assets mehr. `test/media.test.ts` erzwingt den First-Party-Vertrag und prüft, dass jede referenzierte Datei tatsächlich ausgeliefert wird.

### Bildaufbereitung

Die unveränderten Importe liegen in `assets/produkte-quelle/` und werden **nicht** ausgeliefert. Was die Seite zeigt, erzeugt:

```bash
npm run images
```

Das Skript stellt die Motive frei (der eingebrannte weiße Studiohintergrund nahm 49–81 % der Fläche ein und zwang das Layout dazu, jedes Produkt hinter einer hellen Kachel zu verstecken), normalisiert die nicht freistellbaren Packshots auf einen einheitlichen Rand und schreibt `src/data/product-image-sizes.ts` mit den echten Maßen für die `width`/`height`-Attribute.

Vier Quellen lassen sich nicht sauber freistellen und bleiben bewusst Packshots: die beiden Vorratspakete (der „BUY 4 – GET 1 FREE"-Block ist selbst weiß), HeadSlick (weiße Tube auf Weiß) und die MOTO-Verpackung (Blisterkarton auf dunklem Grund). Die Quelle liefert alles nur bis 350×350 bzw. 600×600 — größere Originale existieren dort nicht, deshalb werden die Bilder nirgends über ihre native Größe hinaus skaliert.

Aus dem Hero-Bild wurde beim Freistellen der eingebrannte „reddot design award winner 2017"-Badge herausgeschnitten: ein Zertifizierungsclaim, der sich hier nicht belegen lässt, und damit ein Fall für die Non-Negotiables.

Weiterhin offen vor Produktion: Preise, Rechtstexte, Versand-/Shopangaben und alle produktiven Integrationen müssen erneut freigegeben werden.
