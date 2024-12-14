import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Die hessischen Neujahrsfeiern verbinden urbanes Feuerwerk in der Finanzmetropole mit traditionellen Bräuchen im Taunus.",
    traditions: ["Silvesterfeuerwerk am Main", "Neujahrskonzerte", "Neujahrsempfänge"],
    locations: ["Frankfurt", "Wiesbaden", "Kassel"]
  },
  "Karfreitag": {
    description: "Der hessische Karfreitag wird mit Passionskonzerten in historischen Kirchen und stillen Wanderungen im Taunus begangen.",
    traditions: ["Passionskonzerte", "Kreuzwege", "Fastenbräuche"],
    locations: ["Marburger Elisabethkirche", "Frankfurter Dom", "Kasseler Martinskirche"]
  },
  "Ostermontag": {
    description: "Die hessischen Ostertraditionen reichen von Osterbrunnen im Vogelsberg bis zu festlichen Ostermärkten in den Fachwerkstädten.",
    traditions: ["Osterbrunnen schmücken", "Ostermärkte", "Osterfeuer"],
    locations: ["Vogelsberg", "Marburg", "Limburg"]
  },
  "Tag der Arbeit": {
    description: "Der hessische Maifeiertag vereint Bankenviertel-Demonstrationen mit traditionellen Maifesten in den Landregionen.",
    traditions: ["Maikundgebungen", "Maibaumaufstellen", "Handwerkerfeste"],
    locations: ["Frankfurt", "Kassel", "Fulda"]
  },
  "Christi Himmelfahrt": {
    description: "Die hessischen Himmelfahrtstraditionen führen zu Wanderungen im Taunus und Vatertagsausflügen im Rheingau.",
    traditions: ["Vatertagswanderungen", "Weinfeste", "Familienausflüge"],
    locations: ["Taunus", "Rheingau", "Odenwald"]
  },
  "Pfingstmontag": {
    description: "Der hessische Pfingstmontag lockt mit Pfingstmärkten in den Fachwerkstädten und Weinfesten im Rheingau.",
    traditions: ["Pfingstmärkte", "Weinfeste", "Pfingstkonzerte"],
    locations: ["Rheingau", "Bad Homburg", "Wetzlar"]
  },
  "Fronleichnam": {
    description: "Die hessischen Fronleichnamsfeiern beeindrucken mit prächtigen Prozessionen und kunstvollen Blumenteppichen in katholischen Regionen.",
    traditions: ["Prozessionen", "Blumenteppiche", "Kirchenfeste"],
    culturalSignificance: "Besondere Bedeutung in den katholisch geprägten Regionen Hessens",
    locations: ["Fulda", "Limburg", "Fritzlar"]
  },
  "Tag der Deutschen Einheit": {
    description: "Hessen feiert die Deutsche Einheit als zentraler Finanzplatz Europas mit einer Verbindung aus Tradition und Moderne.",
    traditions: ["Bürgerfeste", "Konzerte", "Ausstellungen"],
    culturalSignificance: "Symbol für wirtschaftliche Stärke und kulturelle Vielfalt",
    locations: ["Frankfurt", "Wiesbaden", "Kassel"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag in Hessen verbindet Großstadtglamour mit beschaulichen Traditionen in den Fachwerkstädten.",
    traditions: ["Weihnachtsgottesdienste", "Konzerte", "Festessen"],
    locations: ["Frankfurter Dom", "Marburger Altstadt", "Kasseler Bergpark"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtsfeiertag lädt Hessen zu winterlichen Wanderungen im Taunus und festlichen Konzerten in historischen Kirchen.",
    traditions: ["Winterwanderungen", "Weihnachtskonzerte", "Familienbesuche"],
    locations: ["Taunus", "Rheingau", "Bergstraße"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühjahr",
    description: "Traditionelle Osterbräuche und Frühlingsfeste beleben die Region. Die Rheingauer Weinwochen beginnen."
  },
  {
    season: "Sommer",
    description: "Zahlreiche Stadtfeste, Kulturfestivals und Open-Air-Veranstaltungen prägen den Sommer. Das Museumsuferfest in Frankfurt ist ein Höhepunkt."
  },
  {
    season: "Herbst",
    description: "Erntedankfeste, traditionelle Herbstmärkte und Weinfeste bestimmen die Jahreszeit. Der Rheingauer Weinmarkt ist besonders beliebt."
  },
  {
    season: "Winter",
    description: "Historische Weihnachtsmärkte wie der Frankfurter und Wiesbadener Weihnachtsmarkt und traditionelle Winterfeste prägen die Adventszeit."
  }
];

export const hessen: StateInfo = {
  fullName: "Hessen",
  shortName: "HE",
  capital: "Wiesbaden",
  description: "Hessen, das Land im Herzen Deutschlands, verbindet Finanzmetropole mit Naturidylle. Die historischen Städte, die Finanzwirtschaft und die einzigartigen Naturlandschaften wie Taunus, Vogelsberg und Rheingau prägen das kulturelle Leben.",
  culturalHighlights: [
    "Finanzmetropole Frankfurt",
    "UNESCO-Weltkulturerbe Bergpark Wilhelmshöhe",
    "Märchenstraße der Brüder Grimm",
    "Rheingau-Weinkultur",
    "Historische Fachwerkstädte",
    "Traditionelle hessische Küche"
  ],
  keyFacts: {
    population: "6,3 Millionen (2021)",
    area: "21.115 km²",
    founded: "1945",
    economicStrength: [
      "Finanzwirtschaft",
      "Chemie- und Pharmaindustrie",
      "Logistik und Verkehr"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Hessen ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["HE"] || []).map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: true,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Hessen ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: [
    ...holidays.schoolHolidays["2024"]["HE"],
    ...holidays.schoolHolidays["2025"]["HE"],
    ...holidays.schoolHolidays["2026"]["HE"]
  ],
  uniqueHolidayInfo: "Hessen verbindet urbane Festkultur mit ländlichen Traditionen. Die Finanzmetropole Frankfurt und die historischen Kulturstädte prägen das Festjahr.",
  traditionInfo: "Die hessischen Traditionen sind geprägt von der Vielfalt zwischen Stadt und Land. Märchen der Brüder Grimm, Weinkultur und moderne Stadtfeste bestimmen das kulturelle Leben.",
  seasonalTraditions
}; 