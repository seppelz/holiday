import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Die saarländischen Neujahrsfeiern verbinden deutsch-französische Festkultur mit traditionellem Feuerwerk an der Saar.",
    traditions: ["Deutsch-französische Neujahrsfeste", "Feuerwerk an der Saar", "Grenzüberschreitende Neujahrsempfänge"],
    locations: ["Saarbrücken", "Völklingen", "Saarlouis"]
  },
  "Karfreitag": {
    description: "Der saarländische Karfreitag wird mit grenzüberschreitenden Prozessionen und traditionellen Fastengerichten der Region begangen.",
    traditions: ["Grenzüberschreitende Prozessionen", "Traditionelle Fastengerichte", "Ökumenische Gottesdienste"],
    locations: ["Saarbrücker Dom", "St. Ludwig Saarlouis", "Basilika St. Johann"]
  },
  "Ostermontag": {
    description: "Die saarländischen Ostertraditionen vereinen deutsch-französische Ostermärkte mit traditionellen Bergmannsbräuchen.",
    traditions: ["Grenzüberschreitende Ostermärkte", "Bergmannsosterfeuer", "Ostereiersuche"],
    locations: ["Völklinger Hütte", "Saarbrücker Schloss", "Deutsch-Französischer Garten"]
  },
  "Tag der Arbeit": {
    description: "Der saarländische Maifeiertag steht im Zeichen der Bergbautradition und der deutsch-französischen Arbeiterbewegung.",
    traditions: ["Bergmannsfeste", "Maikundgebungen", "Deutsch-französische Arbeiterfeste"],
    locations: ["Völklinger Hütte", "Saarbrücken", "Neunkirchen"]
  },
  "Christi Himmelfahrt": {
    description: "Die saarländischen Himmelfahrtstraditionen führen zu Vatertagswanderungen entlang der deutsch-französischen Grenze.",
    traditions: ["Grenzwanderungen", "Vatertagstouren", "Himmelfahrtsgottesdienste"],
    locations: ["Bliesgau", "Saargau", "Hunsrück"]
  },
  "Pfingstmontag": {
    description: "Der saarländische Pfingstmontag lockt mit deutsch-französischen Kulturfesten und traditionellen Bergmannsfeiern.",
    traditions: ["Deutsch-französische Kulturfeste", "Bergmannsfeste", "Pfingstmärkte"],
    locations: ["Saarbrücken", "Saarlouis", "St. Ingbert"]
  },
  "Fronleichnam": {
    description: "Die saarländischen Fronleichnamsfeiern beeindrucken mit grenzüberschreitenden Prozessionen und kunstvollen Blumenteppichen.",
    traditions: ["Prozessionen", "Blumenteppiche", "Kirchenfeste"],
    culturalSignificance: "Verbindung deutscher und französischer katholischer Traditionen",
    locations: ["Saarbrücker Dom", "St. Ludwig Saarlouis", "Basilika St. Wendel"]
  },
  "Mariä Himmelfahrt": {
    description: "Das saarländische Marienfest vereint lothringische Wallfahrtstraditionen mit deutschen Marienbräuchen.",
    traditions: ["Wallfahrten", "Marienprozessionen", "Kräuterweihe"],
    culturalSignificance: "Besondere Bedeutung in der deutsch-französischen Grenzregion",
    locations: ["Basilika St. Johann", "Wallfahrtskirche Blieskastel", "Marienkapelle Saarlouis"]
  },
  "Tag der Deutschen Einheit": {
    description: "Das Saarland feiert die Deutsche Einheit mit besonderem Fokus auf die deutsch-französische Freundschaft und europäische Integration.",
    traditions: ["Deutsch-französische Bürgerfeste", "Europafeste", "Kulturveranstaltungen"],
    culturalSignificance: "Symbol für europäische Integration und grenzüberschreitende Zusammenarbeit",
    locations: ["Saarbrücken", "Völklingen", "Saarlouis"]
  },
  "Allerheiligen": {
    description: "Das saarländische Allerheiligenfest verbindet deutsche und französische Gedenktraditionen mit bergmännischem Brauchtum.",
    traditions: ["Grenzüberschreitende Gedenkfeiern", "Bergmannsprozessionen", "Friedhofsbesuche"],
    culturalSignificance: "Tag des deutsch-französischen Gedenkens",
    locations: ["Saarbrücker Hauptfriedhof", "Bergmannsfriedhof Luisenthal", "St. Eligius Völklingen"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag im Saarland vereint deutsch-französische Festtraditionen mit bergmännischen Weihnachtsbräuchen.",
    traditions: ["Bergmannsweihnacht", "Deutsch-französische Weihnachtslieder", "Festessen"],
    locations: ["Saarbrücker Dom", "Völklinger Hütte", "St. Ludwig Saarlouis"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtsfeiertag lädt das Saarland zu grenzüberschreitenden Winterwanderungen und traditionellen Bergmannskonzerten.",
    traditions: ["Bergmannskonzerte", "Grenzwanderungen", "Familienfeste"],
    locations: ["Deutsch-Französischer Garten", "Warndt", "Bliesgau"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühjahr",
    description: "Traditionelle Fastnacht mit französischem Einfluss. Frühlingsfeste und erste Weinfeste beleben die Region."
  },
  {
    season: "Sommer",
    description: "Zahlreiche Stadtfeste, deutsch-französische Kulturfeste und Open-Air-Veranstaltungen prägen den Sommer."
  },
  {
    season: "Herbst",
    description: "Erntedankfeste, traditionelle Herbstmärkte und Weinfeste bestimmen die Jahreszeit. Die Bergmannstradition wird besonders gepflegt."
  },
  {
    season: "Winter",
    description: "Historische Weihnachtsmärkte wie der Saarbrücker Christkindlmarkt und traditionelle Bergmannsweihnacht prägen die Adventszeit."
  }
];

export const saarland: StateInfo = {
  fullName: "Saarland",
  shortName: "SL",
  capital: "Saarbrücken",
  description: "Das Saarland, das kleinste Flächenland Deutschlands, verbindet französisches Savoir-vivre mit deutscher Tradition. Die ehemalige Montanregion hat sich zu einem modernen Wirtschafts- und Technologiestandort entwickelt.",
  culturalHighlights: [
    "UNESCO-Weltkulturerbe Völklinger Hütte",
    "Deutsch-französische Kultur",
    "Industriekultur und Bergbautradition",
    "Saarländische Küche und Lebensart",
    "Historische Barockbauten",
    "Traditionelle Bergmannskultur"
  ],
  keyFacts: {
    population: "0,98 Millionen (2021)",
    area: "2.570 km²",
    founded: "1957 (Beitritt zur BRD)",
    economicStrength: [
      "Automobilzulieferindustrie",
      "IT und Digitalisierung",
      "Innovative Technologieregion"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist im Saarland ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["SL"] || []).map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: true,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist im Saarland ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: [
    ...holidays.schoolHolidays["2024"]["SL"],
    ...holidays.schoolHolidays["2025"]["SL"],
    ...holidays.schoolHolidays["2026"]["SL"]
  ],
  uniqueHolidayInfo: "Das Saarland verbindet deutsche und französische Festtraditionen. Die Bergbautradition und die grenzüberschreitende Kultur prägen das Festjahr.",
  traditionInfo: "Die saarländischen Traditionen sind geprägt von der Bergbaugeschichte und dem französischen Einfluss. Bergmannsfeste, kulinarische Traditionen und grenzüberschreitende Feste bestimmen das kulturelle Leben.",
  seasonalTraditions
}; 