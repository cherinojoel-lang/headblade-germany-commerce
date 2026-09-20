# Produktions-Cutover — tatsächlicher Stand

Dieses Dokument hält fest, was heute zwischen der Review-Preview und einem echten
Livegang steht. Es ersetzt nicht `docs/OWNER_GATE.md`, sondern liefert die
geprüften Fakten dazu.

Stand der Prüfung: **2026-09-19**, gegen die realen Systeme, nicht gegen Annahmen.

## 1. Was heute unter der Zieldomain läuft

`www.headblade.info` ist **kein geparkter Platzhalter**, sondern ein laufender
Gambio-Shop. Nachgeprüft:

| Prüfung | Ergebnis |
| --- | --- |
| Plattform | Gambio Cloud (`www.headblade.info` → CNAME → `domains.gambiocloud.com`) |
| Session-Handling | setzt `GXsid_…`-Cookie, also aktive Shop-Session |
| Warenkorb | im ausgelieferten HTML vorhanden |
| Indexierung | `<meta name="robots" content="index,follow">`, eigene `robots.txt` |

Die Review-Preview hat demgegenüber **keinen Warenkorb, kein Checkout, keine
Zahlung** und `noindex,nofollow,noarchive,nosnippet` auf jeder Seite.

**Konsequenz:** Die Domain auf die Preview umzubiegen nimmt einen funktionierenden
Shop vom Netz und entfernt die Domain aus dem Google-Index. Das ist kein
Deploy-Schritt, sondern eine Geschäftsentscheidung mit Umsatzwirkung.

## 2. Was der Livegang technisch *nicht* braucht

Frühere Notizen in diesem Repo — auch von mir — sprachen von einer
**Nameserver-Umstellung beim Registrar**. Das ist nach Prüfung falsch.

`hsb-boden.de` und `headblade.info` liegen beide auf denselben Nameservern
(`ns5/ns6.kasserver.com`, All-Inkl). hsb-boden ist trotzdem live über Cloudflare:

```
www.hsb-boden.de  →  CNAME  →  hsb-boden.pages.dev     (Server: cloudflare)
hsb-boden.de      →  A      →  85.13.130.17            (weiter bei All-Inkl)
```

Der Livegang bei hsb-boden war also **ein CNAME-Eintrag beim bestehenden
DNS-Anbieter**, keine Nameserver-Migration. Derselbe Weg steht für headblade
offen, sobald die inhaltlichen Punkte unter 3. erfüllt sind.

## 3. Was wirklich fehlt

Das Readiness-Gate (`npm run assert:production`) prüft diese Punkte maschinell und
bricht ab, solange sie offen sind. Aktueller Lauf gegen den Build:

1. **28 von 28 Seiten tragen `noindex`.** Solange das so ist, ist der Build eine
   Preview, keine Produktionsseite.
2. **`dist/_headers` erzwingt `X-Robots-Tag: noindex`** für das gesamte Deployment.
3. **28 Seiten rendern das Review-Banner** („keine Bestellung · keine Zahlung").
   Auf einer kommerziellen Domain teilt das echten Kunden mit, dass der Shop nicht
   funktioniert.
4. **`PRODUCTION_CONTENT_APPROVED` ist nicht gesetzt.** Preise wurden einmalig am
   03.09.2026 zu Reviewzwecken geprüft, die Rechtstexte sind Preview-Fassungen.
   Auf einem Live-Shop sind beide bindend (Preisangabenverordnung,
   Impressumspflicht) und müssen neu freigegeben werden.
5. **`PRODUCTION_CUTOVER_ACKNOWLEDGED` ist nicht gesetzt.** Siehe Punkt 1 oben.

Nicht maschinell prüfbar, aber ebenso offen: **Die Preview hat keine
Shop-Funktion.** Warenkorb, Checkout, Zahlung, Bestellabwicklung und
Kundendatenverarbeitung existieren in diesem Projekt bewusst nicht. Ein Ersatz
des Gambio-Shops setzt voraus, dass diese Funktionen gebaut und rechtlich
abgesichert werden — das ist ein eigenes Projekt, kein Restpunkt.

## 4. Mögliche Wege

| Weg | Was passiert | Voraussetzung |
| --- | --- | --- |
| **A — Preview bleibt Preview** | Review läuft weiter unter `workers.dev`, Shop bleibt unangetastet | nichts; das ist der heutige Zustand |
| **B — Eigene Subdomain** | z. B. `neu.headblade.info` per CNAME auf den Worker; Shop bleibt live, das neue Design ist unter eigener Adresse zeigbar | ein CNAME bei All-Inkl; `noindex` kann bleiben |
| **C — Vollständiger Ersatz** | Preview ersetzt den Shop unter `www.headblade.info` | Shop-Funktionen bauen, Rechtstexte und Preise freigeben, Punkte 1–5 oben lösen |

**Weg B** ist der realistische nächste Schritt, wenn das neue Design unter der
eigenen Domain begutachtbar sein soll, ohne den laufenden Shop anzufassen.

## 5. Deploy-Pfade im Repo

| Workflow | Auslöser | Ziel |
| --- | --- | --- |
| `deploy-preview.yml` | Push auf `main`/`claude/**`/`feat/**`, oder manuell | Worker `headblade-germany-review`, Preview-Alias `review` |
| `deploy-production.yml` | ausschließlich manuell, GitHub-Environment `production`, zusätzliche Checkbox | `wrangler deploy` — **bricht ab**, solange das Readiness-Gate nicht erfüllt ist |

Der Produktions-Workflow ist bewusst als *gesperrter* Pfad angelegt: Er
existiert, damit der Releaseweg vorhanden und geprüft ist — nicht, damit er heute
ausgelöst wird.
