# Übergabeprotokoll - Holiday Planner

## 📚 Documentation Structure
This project now has a comprehensive documentation structure:

1. **Project Documentation**
   - `README.md` - Project overview and features
   - `handover.md` (this file) - Development state and handover notes
   - `.github/CONTRIBUTING.md` - Detailed workflow guidelines
   - `.github/ISSUE_TEMPLATE/` - Standardized issue templates

2. **Quick Access to Project Management**
   ```bash
   # GitHub CLI setup (add to .env.local):
   GH_TOKEN=your_token
   
   # View project board:
   gh api graphql -f query='query { user(login: "seppelz") { projectV2(number: 3) { items(first: 100) { nodes { id content { ... on Issue { number title state } } } } } } }'
   ```

3. **Important IDs**
   - Project ID: `PVT_kwHOAEVDoc4AtXxZ`
   - Status Field ID: `PVTSSF_lAHOAEVDoc4AtXxZzgkJLUk`
   - Done Status Option ID: `98236657`

For detailed contribution guidelines and workflows, see [CONTRIBUTING.md](.github/CONTRIBUTING.md)

## 📋 Development Session Checklist
Before starting each development session:

1. **Project Status**
   - [ ] Check current milestone in GitHub Projects
   - [ ] Review high-priority issues
   - [ ] Check recent PRs and changes

2. **Environment Setup**
   - [ ] Verify GitHub token in `.env.local`
   - [ ] Run `gh auth status`
   - [ ] Start development server (`npm run dev`)

3. **Code Review**
   - [ ] Read recent changes in handover.md
   - [ ] Check affected components
   - [ ] Review related issues

4. **Development Plan**
   - [ ] Create/update issues as needed
   - [ ] Update project board status
   - [ ] Document planned changes

Remember: Always update handover.md at the end of your session!

## Aktueller Stand
- Kalender-Layout optimiert für Desktop (12 Monate, above the fold)
- Perfekte Ausrichtung von Wochentagen und Daten
- Personenbasiertes Modell implementiert
- Direkte Kalenderauswahl für Urlaubsplanung integriert
- Umfangreiche Tastatursteuerung implementiert
- Intelligente Urlaubsverwaltung mit automatischer Sortierung
- Benutzerfreundliches Benachrichtigungssystem
- Smart Features für Urlaubsplanung hinzugefügt
- Brückentag-Berechnung implementiert und verbessert
- Urlaubseffizienz-Analyse hinzugefügt
- Farbkodierung für verschiedene Tagestypen implementiert
- Cookie-basierte Datenpersistenz implementiert
+ Schulferien-Blockierung entfernt (nur für Studenten/Lehrer relevant)
+ Brückentag-Berechnung für Oktober und Weihnachten korrigiert
+ Vorschau-Zeitraum auf 365 Tage erweitert
+ UI vereinfacht: Urlaubstage-Zähler nur noch in Sidebar

## Aktuelle Herausforderungen
- Brückentag-Berechnungen für Person 2 müssen getestet werden
- Datumsverarbeitung benötigt robustere Validierung
- UI-Elemente benötigen bessere visuelle Unterscheidung
- Konsistente Berechnungen zwischen Brückentag-Möglichkeiten und Urlaubsliste sicherstellen
- Brückentage zeigen manchmal 0 Urlaubstage oder unendliche Effizienz
+ Brückentag-Empfehlungen zeigen jetzt korrekte Zeiträume
+ Empfehlungsliste aktualisiert sich korrekt nach Auswahl

## Projektstruktur
Wichtige vorhandene Dateien:
- `src/components/Calendar/Calendar.tsx` (Hauptkalenderkomponente)
- `src/components/Desktop/Calendar/DesktopCalendar.tsx` (Desktop-spezifische Implementierung)
- `src/components/Shared/Calendar/BaseCalendar.tsx` (Basis-Kalenderlogik)
- `src/types/person.ts` (Personenbasiertes Datenmodell)
- `src/services/bridgeDayAnalyzer.ts` (Brückentag-Logik)
- `src/hooks/useHolidays.ts` (Holiday Management)
- `src/components/VacationCounter/VacationCounter.tsx`
- `src/layouts/MainLayout.tsx` (Hauptlayout mit Menü)
- `src/contexts/PersonContext.tsx` (Personen-State Management)
- `src/contexts/NotificationContext.tsx` (Benachrichtigungssystem)
- `src/components/KeyboardShortcutsHelper.tsx` (Tastaturkürzel-Hilfe)

## Letzte Änderungen
+ Schulferien blockieren keine Brückentage mehr
+ Brückentag-Berechnung für Oktober und Weihnachten 2025 korrigiert
+ Vorschau-Zeitraum von 180 auf 365 Tage erweitert
+ UI vereinfacht durch Entfernung des Urlaubstage-Zählers aus dem Header
+ Berechnung der genutzten Urlaubstage in die Sidebar verschoben
- Tastatursteuerung implementiert (1-8, n/m, p)
- Intelligente Urlaubsverwaltung hinzugefügt
  - Automatische Sortierung nach Datum
  - Zusammenführung überlappender Urlaube
  - Verhinderung von Doppelbuchungen
- Benutzerfreundliches Benachrichtigungssystem eingeführt
- Keyboard Shortcuts Helper hinzugefügt
- Farbschema für bessere Sichtbarkeit aktualisiert
  - Hellere Farben für Urlaubsliste (emerald-200/cyan-200)
  - Dunklere Farben für Toggle-Buttons beibehalten
- Brückentag-Möglichkeiten in Sidebar integriert
- Datumsanzeige für Brückentag-Möglichkeiten hinzugefügt
- Farbverläufe im Kalender korrigiert
- Datumsvalidierung in holidayService verbessert
- Keyboars helper für neue funktionen muss noch ergänzt werden für auswahl von empfehlungen
+ Brückentag-Empfehlungen zeigen jetzt den kompletten Zeitraum (z.B. 1.5. - 4.5.25 statt nur 2.5.25)
+ Empfehlungen werden chronologisch statt nach Effizienz sortiert
+ Empfehlungen verschwinden automatisch nach Auswahl aus der Liste
+ Rechte Sidebar mit doppelten Empfehlungen entfernt
+ UI vereinfacht und übersichtlicher gestaltet

## Tastaturkürzel
- `?` - Tastaturkürzel-Übersicht anzeigen/verstecken
- `n` - Urlaub für Person 1 planen
- `m` - Urlaub für Person 2 planen (aktiviert Person 2 automatisch)
- `1-4` - Urlaub 1-4 von Person 1 löschen
- `5-8` - Urlaub 1-4 von Person 2 löschen
- `p` - Person 2 ein-/ausblenden
- Pfeiltasten - Kalendernavigation
- `Enter` - Tag auswählen

## GitHub Integration & Zugriff
- Repository: https://github.com/seppelz/holiday
- Project Board: https://github.com/users/seppelz/projects/3
- Authentifizierung: `gh auth login --with-token` wobei der Token in der Datei `.env.local` in GH_TOKEN= gespeichert wird. er muss also von mit echo ausgelesen und eingesetzt werden, du musst ihn dafür nicht kennen.
 Access project board:
   1. Web Interface:
      - Direct URL: https://github.com/users/seppelz/projects/3
      - Access via repository: Projects tab in repository

   2. GitHub CLI:
      - List items: `gh api graphql -f query='query { user(login: "seppelz") { projectV2(number: 3) { items(first: 100) { nodes { id content { ... on Issue { number title state } } } } } } }'`
      - Add item: `gh api graphql -f query='mutation { addProjectV2ItemById(input: { projectId: "PVT_kwHOAEVDoc4AtXxZ" contentId: "$ISSUE_ID" }) { item { id } } }'`
      - Update status: `gh api graphql -f query='mutation { updateProjectV2ItemFieldValue(input: { projectId: "PVT_kwHOAEVDoc4AtXxZ" itemId: "$ITEM_ID" fieldId: "PVTSSF_lAHOAEVDoc4AtXxZzgkJLUk" value: { singleSelectOptionId: "98236657" } }) { projectV2Item { id } } }'`

   3. Important IDs:
      - Project ID: PVT_kwHOAEVDoc4AtXxZ
      - Status Field ID: PVTSSF_lAHOAEVDoc4AtXxZzgkJLUk
      - Done Status Option ID: 98236657
- Issues via `gh issue list/create/edit --repo seppelz/holiday`
- High-Priority Label für aktuelle Aufgaben

## Nächste Schritte
1. Priorität Hoch:
   + Person 2 Funktionalität vollständig testen
   + Brückentag-Berechnung für beide Personen validieren
   - Visuelle Klarheit der Urlaubsliste verbessern
   - Datumsverarbeitung über Komponenten hinweg validieren
   - Mobile Optimierung (#54)
   - Export-Funktionalität (PDF, iCal) (#55)
   - Erweiterte Statistiken (#56)


## Person 2 Status
+ Implementierte Funktionen:
+ - Grundlegende Urlaubsplanung
+ - Bundesland-Auswahl
+ - Tastatursteuerung (m für Urlaub, 5-8 für Löschen)
+ - Gemeinsame Urlaubstage-Anzeige
+ 
+ Zu testende Aspekte:
+ - Brückentag-Berechnung mit verschiedenen Bundesländern
+ - Überlappende Urlaube zwischen Personen
+ - Korrekte Effizienzberechnung
+ - UI-Konsistenz bei Person-Wechsel
+ - Gemeinsame Urlaubstage-Hervorhebung

## Test-Szenarien für Person 2
+ 1. Brückentage
+    - Berechnung mit gleichem Bundesland wie Person 1
+    - Berechnung mit anderem Bundesland
+    - Kombination von Brückentagen beider Personen
+ 
+ 2. Urlaubsplanung
+    - Überlappende Urlaube zwischen Personen
+    - Getrennte Urlaube
+    - Gemeinsame Urlaubstage
+ 
+ 3. UI/UX
+    - Konsistente Farbgebung
+    - Korrekte Anzeige der Urlaubstage
+    - Toggle-Funktionalität
+    - Tastatursteuerung
2. Priorität Medium:
   - Brand Identity (#31)
   - Error Handling (#23)
   - Internationalisierung (#57)

## Meilensteine (aktualisiert)
- Foundation & Core (✓ Abgeschlossen)
  - Personenbasiertes Modell & Kernfunktionen
  - Tastatursteuerung & Urlaubsverwaltung
- MVP - Basic Holiday Planning (✓ Abgeschlossen)
  - Grundlegende Urlaubsplanung
  - Intelligente Urlaubsverwaltung
- v0.2.0 (28.02.2024)
  - UI/UX Verbesserungen & Branding
  - Mobile Optimierung
- Enhanced Features (28.02.2024)
  - Export-Funktionalität
  - Erweiterte Statistiken

## Technische Details
- Personenbasiertes Datenmodell statt State-basiert
- Kompakter Kalender ohne Scrollen
- Direkte Kalenderauswahl für Urlaubsplanung
- Intelligente Urlaubsverwaltung mit Merge-Logik
- Benutzerfreundliches Benachrichtigungssystem
- Umfangreiche Tastatursteuerung
- TypeScript mit strikter Typisierung
- Tailwind CSS für Styling
- React mit Vite als Build-Tool

## Technische Schulden
- Datumsverarbeitungslogik konsolidieren
- Urlaubsberechnungslogik für bessere Konsistenz überarbeiten
- Typsicherheit bei Datumsverarbeitung verbessern
- Brückentag-Berechnungslogik überarbeiten
  + Schulferien-Blockierung entfernt
  + Korrekte Berechnung für Oktober/Weihnachten
  - Effizienzberechnung ohne Wochenenden
  - 2-Tages-Szenarien berücksichtigen

## Entwicklungskontext
- Feature Branch: feature/bridge-day-calculation
- Parallel gepflegtes GitHub Project Board
- README.md als zentrale Dokumentation
- Vorhandene CI/CD Pipeline
- Jest für Testing eingerichtet

## Aktuelle Prioritäten für nächste Session
1. Person 2 Testing
   - Brückentag-Berechnungen für beide Personen testen
   - Urlaubsüberlappungen prüfen
   - Gemeinsame Urlaubstage validieren
2. Urlaubslisten-Darstellung
   - Bessere visuelle Unterscheidung
   - Konsistente Farbgebung
   - Verbesserte Toggle-Button-Interaktion
3. Mobile Optimierung
   - Touch-freundliche Interaktionen
   - Angepasstes Layout für kleine Bildschirme
   - Optimierte Benachrichtigungen
   4. exports