# Agent Rules: HeadBlade Germany

Bindend für jeden Agenten in diesem Repo. Ergänzt `AGENTS.md`.

## Ohne Rückfrage erlaubt

- `npm run check`, `npm test`, `npm run build`, `npm run validate:preview`, `npm run verify`
- `npm run test:e2e`, `npm run images`, `npm run assert:production`
- `npm audit`
- `git status`, `git log`, `git diff`
- `curl` zur Verifikation öffentlicher Endpunkte
- eng begrenzte Codeänderungen im Rahmen der gestellten Aufgabe

## Nie ohne ausdrückliche Freigabe

- **Irgendetwas an `headblade.info`**: DNS, Routing, Custom Domain, `routes`-Block
- `wrangler deploy` gegen eine andere Zieladresse als den Review-Worker
- Entfernen von `noindex` oder des Review-Banners
- Hinzufügen von Warenkorb, Checkout, Zahlungsanbieter, Formularen, Analytics
- Preise, Rechtstexte oder Versandangaben ändern oder als geprüft ausgeben
- Zertifizierungs-, Auszeichnungs- oder Referenzclaims ohne Beleg
- `rm`, `git reset --hard`, force-push
- Secrets anzeigen oder committen

## Geprüfte Fakten — nicht ohne Neuprüfung ändern

| Fakt | Stand |
| --- | --- |
| Preise | geprüft 03.09.2026 gegen den öffentlichen deutschen Shop, **nur zu Reviewzwecken** |
| Produktbilder | Inhaberfreigabe 16.09.2026, first-party unter `public/media/produkte/` |
| Live-Domain | `www.headblade.info` → CNAME → `domains.gambiocloud.com` (aktiver Shop) |
| Nameserver | `ns5/ns6.kasserver.com` (All-Inkl), **keine** Cloudflare-Nameserver |
| Review-URL | `https://review-headblade-germany-review.cherinojoel.workers.dev` |

## Wiederholte Fehler, auf die im Diff zu prüfen ist

1. **Eingebrannte Claims im Bildmaterial.** Das Hero-Bild trug einen
   „reddot design award winner 2017"-Badge. Bildinhalte sind Aussagen.
2. **Kaskadenkonflikte.** Eine Farbregel in `contour.css` kann von
   `motion-lab.css` still überschrieben werden. Nach jeder Farbänderung
   Kontrast messen, nicht schätzen.
3. **Attribute ohne Wirkung.** Fünf Komponenten trugen `sizes` ohne jedes
   `srcset`; ein Test erzwang das sogar. Ein grüner Test ist kein Beleg für
   Wirkung.
4. **Lazy-Loading-Artefakte in Screenshots.** Ein Screenshot kann leere Kästen
   zeigen, wo die Seite korrekt rendert. Vor dem Melden eines Bildfehlers
   scrollen und auf `complete && naturalWidth > 0` prüfen.

## Vor jedem Commit

```bash
npm run verify
npm run test:e2e
```

Bei Designänderungen zusätzlich: Build screenshotten (Desktop und Mobil) und
ansehen. Bei Bildänderungen: Kontaktabzug der Freisteller ansehen.
