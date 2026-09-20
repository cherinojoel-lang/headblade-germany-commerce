# Sources: HeadBlade Germany

Belege für alles, was in diesem Repo als geprüft gilt. Ohne Eintrag hier gilt
eine Angabe als ungeprüft.

## Produktdaten

| Angabe | Quelle | Datum | Gültigkeit |
| --- | --- | --- | --- |
| Produktnamen | öffentlicher deutscher Shop `www.headblade.info` | 2026-09-03 | nur Review |
| Preise | öffentlicher deutscher Shop | 2026-09-03 | **nur Review** — vor Produktion neu zu prüfen |
| Kompatibilitätsangaben HB4/HB6 | Herstellerangaben auf der Quellseite | 2026-09-03 | nur Review |

## Bildmaterial

| Angabe | Quelle | Datum |
| --- | --- | --- |
| Zehn Produktbilder | HeadBlade-Germany-Quelle, ausdrückliche Inhaberfreigabe | 2026-09-16 |
| Maximale Quellauflösung 350×350 bzw. 600×600 | eigene Erhebung über die Bildpfade der Quellseite | 2026-09-16 |

Höher aufgelöste Originale existieren auf der Quellseite nicht. Deshalb wird
nirgends über die native Größe hinaus skaliert.

## Infrastruktur

| Angabe | Methode | Datum |
| --- | --- | --- |
| `www.headblade.info` ist ein aktiver Gambio-Shop | HTTP-Abruf: `GXsid_`-Sessioncookie, Warenkorb im HTML, `index,follow` | 2026-09-19 |
| Nameserver `ns5/ns6.kasserver.com` | DNS-over-HTTPS-Abfrage | 2026-09-19 |
| `www.hsb-boden.de` → CNAME → `hsb-boden.pages.dev` | DNS-over-HTTPS-Abfrage plus `server: cloudflare` | 2026-09-19 |
| `automobile-quick.de` wird von nginx bedient | HTTP-Header-Abruf | 2026-09-20 |

Die hsb-boden-Zeile widerlegt eine frühere Annahme in diesem Repo, ein Livegang
brauche eine Nameserver-Migration. Er braucht einen CNAME beim bestehenden
DNS-Anbieter.

## Nicht belegt — deshalb nicht verwendet

- „reddot design award winner 2017" (war im Hero-Bild eingebrannt, entfernt)
- Bewertungen, Sternzahlen, Verkaufszahlen jeder Art
- Lieferzeiten, Versandkosten, Rückgabefristen
