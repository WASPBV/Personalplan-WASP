# Personalplan mit Supabase verbinden – Schritt für Schritt

**Alles am PC im Browser.** Dauer ca. 20–30 Minuten. Kein Google-Konto, keine IT, keine Kreditkarte.
Speicherort der Daten: **EU (Frankfurt)**.

Du arbeitest auf **3 Webseiten**:

| | Webseite | Wofür |
|---|---|---|
| 🅰 | **supabase.com** | Datenbank + Login einrichten |
| 🅱 | **github.com** (Repository *Personalplan-WASP*) | Neue App-Dateien hochladen |
| 🅲 | **waspbv.github.io/Personalplan-WASP/** | Deine App |

---

## Schritt 1 – Bei Supabase anmelden  🅰

1. **https://supabase.com** öffnen → oben rechts **«Sign in»** bzw. **«Start your project»**.
2. **«Continue with GitHub»** wählen → mit deinem GitHub-Konto (WASPBV) bestätigen → **Authorize**.
3. Falls gefragt: Organisation anlegen → Name `WASP`, Typ *Company* oder *Personal*, Plan **Free** → **Create organization**.

## Schritt 2 – Projekt erstellen  🅰

1. **«New project»**.
2. **Name:** `personalplan-wasp`
3. **Database Password:** auf **«Generate a password»** klicken und das Passwort **notieren** (wird für die App nicht gebraucht, nur zur Sicherheit).
4. **Region:** **Central EU (Frankfurt)** ✅
5. **«Create new project»** → ca. 1–2 Minuten warten, bis das Projekt bereit ist.

## Schritt 3 – Datenbank einrichten  🅰

1. Links in der Leiste auf **SQL Editor** (Symbol `>_`) klicken.
2. **«New query»** (bzw. *+ New SQL snippet*).
3. Den gesamten Inhalt der Datei **`supabase-einrichten.sql`** einfügen.
4. **Ganz unten** `deine.email@weissappetito.ch` durch **deine E-Mail-Adresse** ersetzen.
5. Unten rechts **«Run»** klicken → es muss **«Success. No rows returned»** erscheinen.

## Schritt 4 – Zugangsdaten kopieren  🅰

1. Links unten **Zahnrad ⚙ Project Settings** → **API** (bzw. *Data API*).
2. Zwei Werte in Notepad kopieren:
   - **Project URL** – z. B. `https://abcdefghijkl.supabase.co`
   - **anon public** Key (bei *Project API keys*) – langer Text, beginnt mit `eyJ…`
   ⚠ **Nicht** den *service_role* Key nehmen!

## Schritt 5 – Login einrichten und Benutzer anlegen  🅰

1. Links **Authentication** (Symbol mit Personen) → **Sign In / Providers** (bzw. *Providers*):
   - **Email** ist eingeschaltet ✅
   - **«Allow new users to sign up»** → **ausschalten** → **Save**
     (so kann sich niemand selbst ein Konto machen)
2. **Authentication → Users → «Add user» → «Create new user»**:
   - E-Mail + Passwort eingeben
   - **«Auto Confirm User»** anhaken ✅
   - **Create user**
3. **Authentication → URL Configuration**:
   - **Site URL:** `https://waspbv.github.io/Personalplan-WASP/`
   - Bei **Redirect URLs** dieselbe Adresse hinzufügen → **Save**
   (nötig für «Passwort vergessen»)

## Schritt 6 – App-Dateien auf GitHub  🅱

1. ZIP **personalplan-wasp-supabase.zip** entpacken.
2. Auf **github.com** → Repository **Personalplan-WASP** → **Add file → Upload files** → alle Dateien hineinziehen → **Commit changes**.
3. In der Dateiliste **`supabase-config.js`** anklicken → **Stift ✏**.
4. Die zwei Werte aus Schritt 4 eintragen:
   ```js
   url: "https://abcdefghijkl.supabase.co",
   anonKey: "eyJhbGciOi…(langer Text)…"
   ```
5. **Commit changes** → 1–2 Minuten warten.

## Schritt 7 – Erster Start  🅲

1. **https://waspbv.github.io/Personalplan-WASP/** öffnen → **Strg + F5** (neu laden).
2. Bei der Anmeldung zuerst **«ohne Anmeldung»** → **☰ Menü → Team → Daten sichern / wiederherstellen → «Sicherung laden»** → Sicherungsdatei wählen.
3. Seite neu laden → mit **E-Mail + Passwort** aus Schritt 5 anmelden.
4. Frage «Die Datenbank ist noch leer … hochladen?» → **OK**.
5. ✅ Oben steht **«Supabase ✓ (deine E-Mail) · live»**.

---

## Weitere Personen freischalten (je ca. 1 Minute)  🅰

1. **Authentication → Users → Add user → Create new user** (E-Mail + Passwort, *Auto Confirm* ✅).
2. **Table Editor → `pp_users` → «Insert» → «Insert row»** → bei *email* die E-Mail eintragen → **Save**.
3. Der Person Link + E-Mail + Passwort mitteilen. Fertig – sie sieht sofort denselben Plan.

**Sperren:** Zeile in `pp_users` löschen (und Benutzer unter *Authentication → Users* löschen).

## Gut zu wissen

- Änderungen erscheinen bei allen anderen **innert 1–2 Sekunden**.
- **Passwort vergessen:** in der App auf «Passwort vergessen?» → Mail mit Link → neues Passwort setzen.
- **Abmelden:** Team → Daten sichern / wiederherstellen → «Abmelden».
- **Gratis-Projekte pausieren nach 7 Tagen ohne Nutzung.** Bei täglicher Nutzung passiert das nicht.
  Falls doch: in 🅰 das Projekt öffnen → **«Restore project»**. Daten bleiben erhalten.
- **Sicherung** weiterhin möglich: Team → Daten sichern (z. B. monatlich aufs Firmenlaufwerk).
- **Test im Firmennetz:** Öffnet `https://supabase.co` am Firmen-PC normal (keine Sperrseite)? Dann klappt es auch dort.
