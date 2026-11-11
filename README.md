# WASP Personalplan

Personal- und Maschinenplanung WASP 2.0 – Weiss + Appetito Spezialdienste AG, Sparte «Saugen und Blasen».

Die App ist eine einzelne Webseite (`index.html`) und läuft ohne Server direkt im Browser.
Sie lässt sich auf PC, Tablet und Handy wie eine App installieren und funktioniert auch offline.

## Inhalt

| Datei | Zweck |
|---|---|
| `index.html` | Die App |
| `manifest.webmanifest` | Damit die App installierbar ist (Name, Icon, Farben) |
| `sw.js` | Offline-Speicher, App startet auch ohne Internet |
| `icon-192.png`, `icon-512.png` | App-Icons |

## Einrichten auf GitHub (einmalig, ca. 10 Minuten)

1. **Konto:** Auf <https://github.com> ein kostenloses Konto anlegen.
2. **Repository erstellen:** Oben rechts **+ → New repository**
   - Name: `personalplan-wasp`
   - **Public** wählen (GitHub Pages ist im Gratis-Konto nur für öffentliche Repositories verfügbar – es wird nur der App-Code öffentlich, **keine** Personaldaten)
   - **Create repository**
3. **Dateien hochladen:** Im neuen Repository auf **uploading an existing file** klicken, alle Dateien aus diesem Ordner hineinziehen (nicht den Ordner selbst) → **Commit changes**.
4. **Veröffentlichen:** **Settings → Pages** → bei *Branch* `main` und `/ (root)` wählen → **Save**.
   Nach 1–2 Minuten ist die App erreichbar unter
   `https://DEIN-BENUTZERNAME.github.io/personalplan-wasp/`

## Bestehende Daten übernehmen

1. In der bisherigen App (claude.ai): **☰ Menü → Team → ganz unten «Daten sichern»** → es wird eine Datei `Personalplan_Sicherung.json` gespeichert.
2. Die neue App öffnen: **☰ Menü → Team → «Sicherung laden»** → diese Datei auswählen.
   Danach sind alle Mitarbeiter, Einteilungen, Ferien, Werkstatt-Termine und Kommentare da.

## Als App installieren

- **PC (Chrome / Edge):** In der Adressleiste auf das Symbol «App installieren» klicken.
- **Android (Chrome):** Menü ⋮ → **App installieren** / **Zum Startbildschirm hinzufügen**.
- **iPhone (Safari):** Teilen-Symbol → **Zum Home-Bildschirm**.

## Wichtig: Wo die Daten liegen

- Die Daten werden **nur im jeweiligen Browser / Gerät** gespeichert (nicht auf GitHub).
- Jedes Gerät hat seinen eigenen Stand. Zum Übertragen auf ein anderes Gerät:
  **Team → Daten sichern** auf Gerät A, dann **Team → Sicherung laden** auf Gerät B.
- **Regelmässig sichern** (z. B. jeden Freitag) und die Datei auf dem Firmenlaufwerk ablegen.
- Die Sicherungsdatei enthält Personaldaten (inkl. Krank/Unfall) – **niemals auf GitHub hochladen**.
- Browserdaten löschen («Verlauf / Websitedaten löschen») löscht auch den Plan → vorher sichern.

## Updates einspielen

Neue Version von `index.html` erhalten → im Repository die Datei `index.html` anklicken → Stift-Symbol bzw. **Add file → Upload files** → neue Datei hochladen → **Commit changes**.
Die Daten im Browser bleiben dabei erhalten.

## Später: gemeinsame Daten für mehrere Geräte

Soll der Plan live auf allen Geräten gleich sein (wie bisher bei claude.ai), braucht es zusätzlich eine kleine Datenbank
(z. B. Microsoft 365 der Firma, ein eigener Server/NAS oder Schweizer Hosting). Die App ist dafür vorbereitet.
