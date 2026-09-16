# HeadBlade Germany Review Status

Current delivery mode: isolated public owner-review preview.

Production domain: `https://www.headblade.info/` — unchanged and out of scope until separate explicit owner approval.

## Implemented review scope

The `feat/astro-headblade-premium` branch now contains the approved **HEADBLADE CONTOUR SYSTEM** review experience:

- decision-led Contour homepage and product-focused responsive navigation
- **HeadBlade Fit** with explainable local recommendations and no data collection
- MOTO vs ATX, HB4 vs HB6, and manual vs electric comparison routes
- focused authority guides for head shaving, irritation avoidance, and blade compatibility
- stronger product detail pages with media gallery, fit guidance, compatibility, usage context, and nearest alternatives
- truthful review Product/Article/Breadcrumb structured data with **no Merchant `Offer` or availability claim**
- immutable review safety: no checkout, no payment provider, no customer forms, no production canonical, `noindex/nofollow/noarchive/nosnippet`
- keyboard/mobile navigation, skip link, comparison-table semantics, explicit reduced-motion handling, and high-priority primary product media
- CI, security, Lighthouse, desktop/mobile Playwright, preview validator, Cloudflare Workers Static Assets preview workflow, rollback, owner-review, and production-gate runbooks

## Release state

Implementation is complete. `PREVIEW_READY_FOR_OWNER_REVIEW` may only be declared after the **final branch SHA** has all automated gates green and the resulting public `workers.dev` endpoint has been opened and verified.

The deployment workflow fails closed if Cloudflare review credentials are unavailable. The default release path uploads a review version with a stable preview alias; it does not route production traffic.

## Finalization pass (2026-09-15)

A full local verification pass (`npm run check`, `npm test`, `npm run build`, `npm run validate:preview`, and Chromium `playwright test`) was re-run against the current branch head and two real gaps were fixed:

- **Dependency security**: `npm audit` reported one critical (Astro AVIF/base-path RCE and auth-bypass advisories), one high (sharp/miniflare via wrangler), and one moderate (vitest mocker path traversal) finding. Patched in-range within the existing major versions — `astro` 7.1.1 → 7.3.2, `wrangler` 4.128.0 → 4.131.2, `vitest` 4.1.8 → 4.1.11 — and reinstalled with `npm@11.6.0` (matching the CI-pinned resolver). `npm audit --audit-level=high` now reports 0 vulnerabilities; `npm ci` is reproducible from the updated lockfile.
- **Missing favicon**: no `<link rel="icon">` or favicon asset existed, so every page load produced a browser-logged `404` console error for `/favicon.ico`, tripping the Owner Review Checklist's "no console errors" bar. Added `public/favicon.svg` (brand ink/red mark) and wired it into `BaseLayout.astro`.

All four `npm run verify` gates and the Chromium desktop/mobile Playwright specs are green after these fixes. Firefox/WebKit e2e and the Cloudflare `workers.dev` endpoint check were not re-run locally (no matching browser binaries / no Cloudflare review credentials in this environment) — both run automatically in CI on push/PR and remain the authoritative gate before declaring `PREVIEW_READY_FOR_OWNER_REVIEW`.

## First-party Produktbilder (2026-09-16)

Auf ausdrückliche Inhaberfreigabe wurden die zehn Produktbilder aus der HeadBlade-Germany-Quelle
übernommen und liegen jetzt unter `public/media/produkte/`; `src/data/products.ts` referenziert nur noch
lokale Pfade. Damit lädt die Review-Preview **keine externen Assets** mehr.

- Normalisiert beim Import: `moto_package_nb_shadow_350x350.png`, `moto_fire_shdw_350x350.gif` und
  `headcase_04.png` enthielten JPEG-Bytes und heißen jetzt `.jpg`; `HB4_bag`/`HB6_bag` waren
  600×600-PNGs mit vollständig opakem Alphakanal und wurden zu JPEG q88 umgesetzt (298 KB → 52 KB
  bzw. 307 KB → 53 KB). Gesamtgewicht aller Produktbilder: 292 KB.
- Testvertrag umgestellt: `test/media.test.ts` verlangt jetzt First-Party-Pfade statt der früheren
  Remote-URLs und prüft zusätzlich, dass jede referenzierte Datei real ausgeliefert wird;
  `test/motion-lab.test.ts` und `e2e/review.spec.ts` entsprechend nachgezogen.
- Nebeneffekt: Der e2e-Test `review preview loads safely` ist erstmals vollständig grün, weil die
  bisherigen Konsolenfehler ausschließlich aus den externen Bild-Requests stammten.

## Live Review-Preview (2026-09-16)

Auf Inhaberanweisung wurde der Deploy-Workflow (`workflow_dispatch`, `bootstrap_review_worker=false`,
Worker `headblade-germany-review` bestand bereits seit 2026-09-05) gegen den Branch-Stand `fdbac91`
ausgeführt und ist erfolgreich durchgelaufen.

**Verifizierte URL:** `https://review-headblade-germany-review.cherinojoel.workers.dev`

Nach dem Upload unabhängig nachgeprüft:

- Startseite `HTTP 200`, Header `x-robots-tag: noindex`, Meta `noindex,nofollow,noarchive,nosnippet`
- `/produkte/`, `/produkt/headblade-moto/`, `/finder/`, `/vergleich/moto-vs-atx/`, `/rasierer/`,
  `/anleitungen/`, `/impressum/` liefern `200`; unbekannte Pfade korrekt `404`
- Produktbilder unter `/media/produkte/` liefern `200` mit `image/jpeg` in exakt der erwarteten Größe
- **keine** verbliebene Referenz auf `headblade.info/images` im ausgelieferten HTML

`headblade.info`, DNS und Produktionsrouting wurden nicht berührt. Die Verbindung der
Produktionsdomain bleibt ein separates Owner-Gate gemäß `docs/OWNER_GATE.md` und erfordert die
Nameserver-Umstellung beim Registrar.

## Kontrast-Korrekturen (2026-09-16)

Der Lighthouse-Lauf auf dem Deploy-Stand meldete `color-contrast` als fehlgeschlagen (Gewicht 7);
Accessibility lag dadurch bei 0.95 bzw. 0.96 — der CI-Schwellwert ist exakt 0.95. Lokal mit
Lighthouse 12 nachgestellt und vier Stellen gefunden, alle mit derselben Ursache: Der
Motion-Lab-Layer hat Flächen aufgehellt bzw. neue dunkle Flächen eingeführt, während die
Farbregeln aus `contour.css` weiter an `.section--dark` hingen.

| Stelle | vorher | Ursache |
| --- | --- | --- |
| `.motion-blade .button--ghost` | **1.08:1** | `.motion-blades` trug kein `section--dark`, Ghost-Button blieb `#111214` auf `#181b1e` — praktisch unsichtbar |
| `.motion-blades` Eyebrow / Fließtext | 3.70:1 | gleiche Ursache, Grundfarbe `#6b7077` auf `#121416` |
| `.mechanics-grid b` | 2.82:1 | `contour.css` färbt `.section--dark .mechanics-grid b` mit `#ff5a5f` (für dunkle Flächen), `.contour-mechanics` ist per Refine-Layer aber hell |
| `.offer-card` Badge / Link | 3.05:1 | `.offer-card` wurde weiß, `.section--dark .offer-card span` blieb bei `#ff5a5f` |
| `.decision-support` Eyebrow | 4.38:1 | Fläche nutzte noch `--paper-warm` `#f4f0e8`; alle übrigen warmen Flächen hatte der Refine-Layer auf `#f7f8f9` gezogen |

Behoben ausschließlich mit vorhandenen Palettenwerten — keine neuen Farben. Ergebnis auf beiden
von CI geprüften Seiten: **Performance 1.0, Accessibility 1.0, Best Practices 1.0**, `color-contrast`
ohne Treffer.

## Deploy-Stand (2026-09-16, Branch-Head `3f6bf06`)

Die Kontrast-Korrekturen sind ausgeliefert. Deploy-Lauf 110 (`workflow_dispatch`,
`bootstrap_review_worker=false`) ist erfolgreich; alle sieben PR-Checks auf `3f6bf06` sind grün
(`verify`, `smoke`, `lighthouse`, `npm-audit`, `pr-dependency-audit`, `secret-scan`,
`deploy-review`) und `lhci assert` meldet keine Verletzung mehr.

Live nachgeprüft unter `https://review-headblade-germany-review.cherinojoel.workers.dev`:

- alle acht Review-Routen `200`, unbekannte Pfade `404`, Header `x-robots-tag: noindex`
- alle zehn Produktbilder unter `/media/produkte/` `200` als `image/jpeg`, zusammen 292 KB;
  keine Referenz auf `headblade.info/images` im ausgelieferten HTML
- Kontrast-Fixes im ausgelieferten CSS belegt: `.motion-blades` trägt jetzt `section--dark`,
  die Refine-Regel für `.offer-card` steht nach der `contour.css`-Regel (gewinnt die Kaskade),
  und `.decision-support` liegt auf `#f7f8f9`

Produktionsdomain, DNS und Routing bleiben unberührt — weiterhin Owner-Gate nach `docs/OWNER_GATE.md`.

## Design-Durchgang (2026-09-16)

Vollständiger Designdurchgang auf Basis von Screenshots des gebauten Stands, nicht des Quelltexts.

### Befund

Die zentrale Schwäche lag nicht im CSS, sondern im Bildmaterial. Alle zehn Produktbilder trugen
einen eingebrannten Studiohintergrund — neun weiß mit 49–81 % Flächenanteil, die MOTO-Verpackung
schwarz. Das Layout hat darauf reagiert, indem es jedes Produkt hinter eine helle Kachel gestellt
hat. Auf der dunklen Klingen-Sektion ergab das weiße Kästen, in denen der Beutel rund ein Drittel
einnahm; der Rest las sich als leerer Platzhalter. Gleichzeitig tat der Hero so, als sei sein Bild
freigestellt: Produktschatten, Kreisgeometrie, helle Bühne — tatsächlich stand dort ein weißes
Rechteck mit Schlagschatten darauf.

Zwei weitere Punkte kamen dazu:

- Das Hero-Bild ist nativ 350 px breit und wurde auf 520 CSS-px gezeigt — auf einem 2×-Display eine
  Dreifach-Skalierung. Eine Prüfung der Quelle ergab, dass es dort **keine** höher aufgelösten
  Originale gibt; alles ist auf 350×350 bzw. 600×600 gedeckelt.
- Im Hero-Bild war ein „reddot design award winner 2017"-Badge eingebrannt. Ein von hier aus nicht
  belegbarer Zertifizierungsclaim, den die Non-Negotiables ausschließen.

### Umsetzung

- **Freisteller-Pipeline** (`npm run images`, `scripts/cutout-product-images.mjs`). Motiverkennung
  über „dunkel ODER farbig" statt über Helligkeit — Helligkeit allein hätte das gelbe Chassis als
  Hintergrund eingestuft und den grauen Produktschatten behalten, der auf diesen Quellen als
  ausgefranster Fleck erscheint. Dann größte zusammenhängende Komponente, morphologisches Schließen
  (Innenlöcher füllen, damit Glanzlichter nicht durch das Produkt stanzen; anschließend erodieren,
  damit kein heller Saum bleibt) und eine Alpha-Rampe nur auf der Silhouette.
- **Vier Quellen bleiben Packshots**, weil sie sich nicht trennen lassen: beide Vorratspakete
  (der Promo-Block ist selbst weiß), HeadSlick (weiße Tube auf Weiß) und die MOTO-Verpackung. Sie
  werden stattdessen auf einen einheitlichen Rand normalisiert — vorher schwankte ihr Weißanteil
  zwischen 49 % und 81 %, wodurch dasselbe Produkt in jeder Rasterzelle anders groß wirkte.
- **Hero neu komponiert**: Produkt auf native Größe begrenzt, Bühne enger, mehr Raum für die
  Typografie. Der CSS-Schlagschatten entfiel, weil er zusammen mit dem fotografierten Schatten zwei
  Lichtquellen ergeben hätte.
- **Kacheln entfernt**, die es nur wegen der Bildhintergründe gab: weiße Kachel auf der dunklen
  Klingen-Sektion, Silberfläche der Auswahlkarten, Rahmen der Produktkarten.
- **MOTO-Kartenbild getauscht**: Das Flaggschiff zeigte den Blisterkarton mit aufgedruckter
  Werbesprache; jetzt den freigestellten Rasierer. Die Verpackung bleibt als Ansicht in der Galerie.
- **Doppelte Review-Banner zusammengeführt.** `preview-banner` und `review-note` standen gestapelt
  und sagten fast dasselbe; zusammen etwa 150 px des ersten Viewports.
- **Bildmaße korrigiert.** Alle `<img>` trugen fest `width="700" height="700"` o. ä., bei nun teils
  querformatigen Freistellern reserviert der Browser damit ein quadratisches Feld. Die Maße kommen
  jetzt aus `src/data/product-image-sizes.ts`, das die Pipeline miterzeugt.

### Nebenbefund: `sizes` ohne `srcset`

Fünf Komponenten trugen `sizes`-Attribute, und ein Test (`supplies responsive sizing hints at every
primary product-image surface`) erzwang deren Vorhandensein. Im gesamten Projekt gibt es jedoch
**kein einziges `srcset`** — ohne das ignoriert der Browser `sizes` vollständig. Der Test hat damit
eine Wirkung abgesichert, die es nie gab. Da die Assets einzelne feste Dateien sind, die auf oder
unter ihrer nativen Breite gezeigt werden, wäre echtes `srcset` hier Mehrgewicht ohne Gegenwert.
Der Vertrag wurde daher ersetzt: explizite echte Bildmaße an jeder Fläche, und `sizes` darf nur
gemeinsam mit `srcset` auftreten.

### Verifikation

`npm run verify` grün (81 Tests, 28 Seiten, `PREVIEW_VALIDATION_OK`), 6 Chromium-e2e grün,
Lighthouse lokal auf beiden von CI geprüften Seiten **Performance 1.0 · Accessibility 1.0 ·
Best Practices 1.0 · SEO 1.0**.

### Bekannte Grenze

Drei der vier Packshots behalten ihren weißen Grund und zeigen im Produktraster eine feine Kante
gegen die hellgraue Kachel. Das ist eine Eigenschaft des Quellmaterials, keine Layout-Entscheidung;
sauber lösbar wäre es nur mit neuen Produktfotos.
