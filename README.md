# 🏖 Holiday Planner

Ein modernes Tool zur Urlaubsplanung und Brückentag-Analyse.

## Features

### Implementiert ✅
- 🗓 Intelligente Berechnung von Brückentagen
  - Berücksichtigung von Wochenenden
  - Optimale Verbindung von Feiertagen
  - Effizienzberechnung (Urlaubstage vs. freie Tage)
- 🌍 Unterstützung für alle Bundesländer
  - Bundesweite Feiertage
  - Länderspezifische Feiertage
- 🎨 Modernes UI-Design
  - Responsive Layout für Desktop und Mobile
  - State-spezifische Themes
  - Glassmorphism Effekte
  - Kompakte Menüleiste mit erweiterbarer Ansicht
- 🤝 Erweiterte Dual-State Unterstützung
  - Auswahl zweier Bundesländer
  - Kombinierte Kalenderansicht
  - Separate Urlaubsplanung pro Person
  - Urlaubstage-Tracking pro Person
- 📅 Flexible Urlaubsplanung
  - Popup-Kalender mit Jahresansicht
  - Datumseingabe per Tastatur oder Kalender
  - Validierung von Urlaubszeiträumen
  - Markierung bereits gebuchter Urlaube
- 💾 Lokale Datenspeicherung
  - Persistente Speicherung aller Einstellungen
  - Automatisches Laden beim Start

### In Entwicklung 🚧
- 📱 Optimierte Mobile Ansicht
  - Separate Komponenten für Mobile/Desktop
  - Verbesserte Touch-Interaktion
  - Angepasstes Layout für kleine Bildschirme
- 🧮 Erweiterte Analysefunktionen
  - Effizienzkalkulation für kombinierte Staaten
  - Hervorhebung optimaler Kombinationen
- 🏫 Integration von Schulferien
  - Anzeige im Kalender
  - Berücksichtigung bei der Planung
- 📊 Statistiken und Auswertungen
  - Urlaubsübersicht pro Person
  - Vergleich zwischen Personen
  - Jahresauswertung

### Technische Verbesserungen ✅
- ✅ Personenbasiertes Datenmodell
- ✅ Optimierte Kalenderdarstellung
- ✅ Modernes, responsives Design
- ✅ Effizientes State-Management
- ✅ TypeScript-Integration
- ✅ Komponenten-Struktur für Desktop/Mobile
- ✅ Erweiterte Test-Abdeckung

## Tech Stack
- ⚛️ React 18 mit TypeScript
- 🎨 TailwindCSS für Styling
- 📦 Zustand für State Management
- 🏃 Vite als Build Tool
- 🧪 Jest für Testing

## Roadmap
- [ ] PWA-Unterstützung
- [ ] Export-Funktionalität (PDF, iCal)
- [ ] Erweiterte Statistiken
- [ ] Team-Kalender Feature
- [ ] Internationalisierung

## Installation & Entwicklung

### Setup
```bash
git clone https://github.com/seppelz/holiday.git
cd holiday
npm install
npm run dev
```

### Projektstruktur
```
src/
├── components/
│   ├── Desktop/       # Desktop-spezifische Komponenten
│   ├── Mobile/        # Mobile-spezifische Komponenten
│   └── Shared/        # Gemeinsam genutzte Komponenten
├── contexts/          # React Contexts
├── hooks/             # Custom Hooks
├── layouts/           # Layout Komponenten
├── pages/             # Seiten-Komponenten
├── services/          # API Services
├── types/             # TypeScript Typen
└── utils/             # Hilfsfunktionen
```

### Entwicklungsrichtlinien
- 🌿 GitHub Flow für Branching
- 📝 Conventional Commits
- 📋 GitHub Projects für Projektmanagement
- 🔄 GitHub Actions für CI/CD
- 📱 Mobile-First Design Prinzipien

## Browser-Unterstützung
- Chrome (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Edge (letzte 2 Versionen)

## Lizenz
MIT
