import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Baden-Württemberg startet das Jahr mit einer einzigartigen Mischung aus alemannischen und schwäbischen Neujahrsbräuchen.",
    traditions: ["Neujahrsempfänge", "Fasnetsbeginn", "Glücksbringer-Bräuche"],
    locations: ["Stuttgart", "Freiburg", "Heidelberg"]
  },
  "Heilige Drei Könige": {
    description: "Das baden-württembergische Dreikönigsfest verbindet kirchliche Tradition mit lebendigen Sternsingerumzügen.",
    traditions: ["Sternsinger", "Dreikönigssingen", "Hausbesuche"],
    culturalSignificance: "Traditioneller Abschluss der Weihnachtszeit",
    locations: ["Freiburger Münster", "Rottenburger Dom", "Ulmer Münster"]
  },
  "Karfreitag": {
    description: "Der Karfreitag in Baden-Württemberg zeichnet sich durch besonders eindrucksvolle Passionsspiele und Kreuzwege aus.",
    traditions: ["Passionsspiele", "Kreuzwege", "Fastenbräuche"],
    locations: ["Ulmer Münster", "Freiburger Münster", "Kloster Maulbronn"]
  },
  "Ostermontag": {
    description: "Die baden-württembergischen Ostertraditionen vereinen den Ostereierlauf mit dem Schmücken historischer Osterbrunnen.",
    traditions: ["Ostereierlauf", "Osterbrunnen schmücken", "Osterfeuer"],
    locations: ["Schwarzwald", "Schwäbische Alb", "Bodensee"]
  },
  "Tag der Arbeit": {
    description: "Der baden-württembergische Maifeiertag verbindet traditionelles Maibaumstellen mit modernen Handwerkerfesten.",
    traditions: ["Maibaumstellen", "Handwerkerfeste", "Maikundgebungen"],
    locations: ["Stuttgart", "Mannheim", "Karlsruhe"]
  },
  "Christi Himmelfahrt": {
    description: "Die Himmelfahrtstraditionen in Baden-Württemberg reichen von Bergprozessionen bis zu Vatertagswanderungen im Schwarzwald.",
    traditions: ["Vatertagswanderungen", "Prozessionen", "Familienausflüge"],
    locations: ["Schwarzwald", "Hohenlohe", "Bodensee"]
  },
  "Pfingstmontag": {
    description: "Die baden-württembergischen Pfingstbräuche umfassen den berühmten Weingartener Blutritt und regionale Heimattage.",
    traditions: ["Pfingstritt", "Heimattage", "Pfingstmärkte"],
    locations: ["Weingarten", "Konstanz", "Rottweil"]
  },
  "Fronleichnam": {
    description: "Die Fronleichnamsfeiern in Baden-Württemberg beeindrucken mit kunstvollen Blumenteppichen und historischen Prozessionen.",
    traditions: ["Prozessionen", "Blumenteppiche", "Kirchenfeste"],
    culturalSignificance: "Wichtiger katholischer Feiertag in der Region",
    locations: ["Freiburg", "Rottenburg", "Konstanz"]
  },
  "Tag der Deutschen Einheit": {
    description: "Baden-Württemberg gestaltet den Tag der Deutschen Einheit mit einer Verbindung aus Tradition und Innovation.",
    traditions: ["Bürgerfeste", "Konzerte", "Ausstellungen"],
    culturalSignificance: "Symbol für die Verbundenheit mit ganz Deutschland",
    locations: ["Stuttgart", "Karlsruhe", "Mannheim"]
  },
  "Allerheiligen": {
    description: "Das baden-württembergische Allerheiligenfest vereint katholische Traditionen mit regionalen Gedenkbräuchen.",
    traditions: ["Gräberbesuche", "Gottesdienste", "Gedenkfeiern"],
    culturalSignificance: "Tag des Gedenkens und der Besinnung",
    locations: ["Rottweil", "Baden-Baden", "Heilbronn"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag in Baden-Württemberg verbindet schwäbische und badische Weihnachtstraditionen.",
    traditions: ["Christmetten", "Krippenspiele", "Familienessen"],
    locations: ["Rottweil", "Tübingen", "Heidelberg"]
  },
  "2. Weihnachtstag": {
    description: "Der baden-württembergische zweite Weihnachtsfeiertag ist geprägt von winterlichen Konzerten und Wandertraditionen.",
    traditions: ["Weihnachtskonzerte", "Verwandtenbesuche", "Winterwanderungen"],
    locations: ["Schwarzwald", "Schwäbische Alb", "Kraichgau"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühling",
    description: "Fasnet im Schwarzwald, Stuttgarter Frühlingsfest, Spargelsaison in der Kurpfalz"
  },
  {
    season: "Sommer",
    description: "Seenachtfest Konstanz, Stuttgarter Weindorf, Heidelberger Schlossbeleuchtung"
  },
  {
    season: "Herbst",
    description: "Cannstatter Wasen, Herbstmesse Baden-Baden, Weinlese am Kaiserstuhl"
  },
  {
    season: "Winter",
    description: "Weihnachtsmärkte in historischen Altstädten, Fasnetsbeginn, Schwarzwälder Wintertraditionen"
  }
];

export const badenWuerttemberg: StateInfo = {
  fullName: "Baden-Württemberg",
  shortName: "BW",
  capital: "Stuttgart",
  description: "Baden-Württemberg vereint die historischen Regionen Baden, Württemberg und Hohenzollern. Das Bundesland ist bekannt für seine innovative Wirtschaft, reiche Kultur und vielfältige Landschaft vom Schwarzwald bis zum Bodensee.",
  culturalHighlights: [
    "UNESCO-Welterbe Kloster Maulbronn",
    "Heidelberger Schloss",
    "Schwarzwald und Bodensee",
    "Schwäbische Alb",
    "Fasnet-Traditionen"
  ],
  keyFacts: {
    population: "11,1 Millionen",
    area: "35.751 km²",
    founded: "1952",
    economicStrength: [
      "Automobilindustrie",
      "Maschinenbau",
      "Informationstechnologie",
      "Biotechnologie",
      "Tourismus"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Baden-Württemberg ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["BW"] || []).map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: true,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Baden-Württemberg ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: [
    ...holidays.schoolHolidays["2024"]["BW"],
    ...holidays.schoolHolidays["2025"]["BW"],
    ...holidays.schoolHolidays["2026"]["BW"]
  ],
  uniqueHolidayInfo: "Baden-Württemberg verbindet bei seinen Feiertagen alemannische und schwäbische Traditionen mit katholischem und evangelischem Brauchtum.",
  traditionInfo: "Die Feiertage in Baden-Württemberg sind geprägt von der reichen kulturellen Vielfalt des Landes, von der Fasnet bis zu den Weinfesten.",
  seasonalTraditions
}; 