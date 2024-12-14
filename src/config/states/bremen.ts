import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Die Bremer Neujahrsfeiern verbinden maritimes Flair an der Schlachte mit traditionellem Neujahrsschwimmen in der Weser.",
    traditions: ["Feuerwerk an der Weser", "Neujahrsschwimmen", "Neujahrsempfänge"],
    locations: ["Bremer Rathaus", "Schlachte", "Vegesack"]
  },
  "Karfreitag": {
    description: "Der Bremer Karfreitag ist geprägt von protestantischen Passionskonzerten in den historischen Kirchen der Hansestadt.",
    traditions: ["Passionskonzerte", "Kreuzwege", "Fastenbräuche"],
    locations: ["Bremer Dom", "St. Petri Dom", "Unser Lieben Frauen"]
  },
  "Ostermontag": {
    description: "Die Bremer Ostertraditionen vereinen hanseatisches Brauchtum mit niederdeutschen Osterfeuern im Blockland.",
    traditions: ["Osterfeuer", "Ostereiersuche", "Ostermärkte"],
    locations: ["Bürgerpark", "Wallanlagen", "Blockland"]
  },
  "Tag der Arbeit": {
    description: "Der Bremer Maifeiertag steht im Zeichen der Hafenarbeiter-Tradition mit Festen entlang der Weser.",
    traditions: ["Maikundgebungen", "Hafenfeste", "Gewerkschaftsveranstaltungen"],
    locations: ["Marktplatz", "Überseestadt", "Gröpelingen"]
  },
  "Christi Himmelfahrt": {
    description: "Die Bremer Himmelfahrtstraditionen locken zu Bollerwagen-Touren durch den Bürgerpark und entlang der Weser.",
    traditions: ["Vatertagstouren", "Bollerwagen-Touren", "Familienausflüge"],
    locations: ["Bürgerpark", "Werdersee", "Stadtwaldsee"]
  },
  "Pfingstmontag": {
    description: "Der Bremer Pfingstmontag begeistert mit maritimen Festen und traditionellen Schiffsparaden auf der Weser.",
    traditions: ["Hafenfeste", "Pfingstkonzerte", "Schiffsparaden"],
    locations: ["Schlachte", "Vegesack", "Überseestadt"]
  },
  "Tag der Deutschen Einheit": {
    description: "Die Hansestadt Bremen feiert die Deutsche Einheit mit einer Mischung aus maritimer Tradition und modernen Bürgerfesten.",
    traditions: ["Bürgerfeste", "Hafenkonzerte", "Kulturveranstaltungen"],
    culturalSignificance: "Symbol für die Verbindung von Tradition und Moderne",
    locations: ["Marktplatz", "Schlachte", "Überseestadt"]
  },
  "Reformationstag": {
    description: "Als protestantische Hansestadt begeht Bremen den Reformationstag mit besonderen Gottesdiensten und historischen Stadtführungen.",
    traditions: ["Reformationsgottesdienste", "Kirchenkonzerte", "Historische Führungen"],
    culturalSignificance: "Erinnerung an die protestantische Tradition der Hansestadt",
    locations: ["Bremer Dom", "St. Martini", "Unser Lieben Frauen"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag in Bremen vereint hanseatische Festlichkeit mit norddeutschen Weihnachtstraditionen.",
    traditions: ["Weihnachtsgottesdienste", "Festessen", "Konzerte"],
    locations: ["Bremer Dom", "Schnoor", "Böttcherstraße"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtsfeiertag lädt Bremen zu winterlichen Spaziergängen durch historische Gassen und verschneite Parks.",
    traditions: ["Weihnachtskonzerte", "Verwandtenbesuche", "Winterwanderungen"],
    locations: ["Bürgerpark", "Blockland", "Werdersee"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühling",
    description: "Osterwiese, Bremer Freimarkt Frühlingsflohmarkt, Maritime Woche an der Schlachte"
  },
  {
    season: "Sommer",
    description: "Breminale, Musikfest Bremen, Maritime Woche, Vegesacker Hafenfest"
  },
  {
    season: "Herbst",
    description: "Bremer Freimarkt, Maritimer Markt, Ischa Freimaak"
  },
  {
    season: "Winter",
    description: "Bremer Weihnachtsmarkt, Schlachte-Zauber, Winterlights im Bürgerpark"
  }
];

export const bremen: StateInfo = {
  fullName: "Bremen",
  shortName: "HB",
  capital: "Bremen",
  description: "Bremen ist ein Stadtstaat mit langer hanseatischer Tradition. Die Freie Hansestadt Bremen besteht aus den Städten Bremen und Bremerhaven und ist geprägt von maritimer Geschichte und moderner Hafenwirtschaft.",
  culturalHighlights: [
    "UNESCO-Welterbe Bremer Rathaus und Roland",
    "Bremer Stadtmusikanten",
    "Historische Böttcherstraße",
    "Überseestadt",
    "Deutsches Schifffahrtsmuseum"
  ],
  keyFacts: {
    population: "680.000",
    area: "419 km²",
    founded: "787",
    economicStrength: [
      "Hafen und Logistik",
      "Luft- und Raumfahrt",
      "Maritime Wirtschaft",
      "Wissenschaft",
      "Lebensmittelindustrie"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Bremen ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["HB"] || []).map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: true,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Bremen ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: [
    ...holidays.schoolHolidays["2024"]["HB"],
    ...holidays.schoolHolidays["2025"]["HB"],
    ...holidays.schoolHolidays["2026"]["HB"]
  ],
  uniqueHolidayInfo: "Bremen verbindet bei seinen Feiertagen hanseatische Tradition mit norddeutscher Lebensart und maritimem Flair.",
  traditionInfo: "Die Feiertage in Bremen sind geprägt von der protestantischen Tradition und der engen Verbindung zur Seefahrt und zum Handel.",
  seasonalTraditions
}; 