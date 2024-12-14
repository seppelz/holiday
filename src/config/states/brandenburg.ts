import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Die brandenburgischen Neujahrsfeiern verbinden traditionelles Feuerwerk an der Havel mit beschaulichen Spaziergängen im Spreewald.",
    traditions: ["Feuerwerk an der Havel", "Neujahrsspaziergänge im Spreewald", "Neujahrsempfänge"],
    locations: ["Potsdam", "Spreewald", "Brandenburg an der Havel"]
  },
  "Karfreitag": {
    description: "Der brandenburgische Karfreitag wird mit stillen Andachten in historischen Kirchen und Klöstern begangen.",
    traditions: ["Passionsmusik", "Kreuzwege", "Andachten"],
    locations: ["Kloster Chorin", "Dom zu Brandenburg", "Nikolaikirche Potsdam"]
  },
  "Ostermontag": {
    description: "Die Ostertraditionen in Brandenburg sind besonders im Spreewald mit dem Osterreiten und der Ostereiersuche lebendig.",
    traditions: ["Osterreiten", "Ostereiersuche", "Osterfeuer"],
    locations: ["Spreewald", "Lausitz", "Havelland"]
  },
  "Tag der Arbeit": {
    description: "Der brandenburgische Maifeiertag vereint traditionelle Handwerksfeste mit modernen Arbeitnehmerfeiern.",
    traditions: ["Handwerkerfeste", "Maikundgebungen", "Familienfeste"],
    locations: ["Potsdam", "Cottbus", "Frankfurt (Oder)"]
  },
  "Christi Himmelfahrt": {
    description: "An Christi Himmelfahrt locken die brandenburgischen Seen und Wälder zu traditionellen Vatertagsausflügen.",
    traditions: ["Vatertagswanderungen", "Bootsausflüge", "Picknicks"],
    locations: ["Scharmützelsee", "Märkische Schweiz", "Spreewald"]
  },
  "Pfingstmontag": {
    description: "Der brandenburgische Pfingstmontag ist geprägt von Pfingstmärkten und traditionellen Kahnfahrten im Spreewald.",
    traditions: ["Pfingstmärkte", "Kahnfahrten", "Pfingstkonzerte"],
    locations: ["Spreewald", "Potsdam", "Rheinsberg"]
  },
  "Tag der Deutschen Einheit": {
    description: "Brandenburg feiert die Deutsche Einheit mit besonderem Fokus auf die Transformation der Region seit 1990.",
    traditions: ["Bürgerfeste", "Ausstellungen", "Konzerte"],
    culturalSignificance: "Symbol für die erfolgreiche Wiedervereinigung und den Wandel",
    locations: ["Potsdam", "Cottbus", "Frankfurt (Oder)"]
  },
  "Reformationstag": {
    description: "Als historisches Kernland der Reformation begeht Brandenburg den Reformationstag mit besonderen Festgottesdiensten und Lutherfestspielen.",
    traditions: ["Festgottesdienste", "Historische Führungen", "Lutherfestspiele"],
    culturalSignificance: "Erinnerung an die Reformation und ihre Bedeutung für Brandenburg-Preußen",
    locations: ["Wittenberg", "Brandenburg an der Havel", "Jüterbog"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag in Brandenburg verbindet preußische Traditionen mit festlichen Gottesdiensten in historischen Kirchen.",
    traditions: ["Christvespern", "Krippenspiele", "Festessen"],
    locations: ["Potsdamer Nikolaikirche", "Dom zu Brandenburg", "Kloster Neuzelle"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtsfeiertag pflegt Brandenburg winterliche Konzerte in historischen Schlössern und Kirchen.",
    traditions: ["Schlosskonzerte", "Winterwanderungen", "Familienbesuche"],
    locations: ["Schloss Sanssouci", "Schloss Rheinsberg", "Kloster Chorin"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühjahr",
    description: "Traditionelle Osterbräuche im Spreewald und Frühlingsfeste beleben die Region. Die Kahnfahrten-Saison beginnt."
  },
  {
    season: "Sommer",
    description: "Zahlreiche Schlössernächte, Kulturfestivals und Open-Air-Veranstaltungen prägen den Sommer. Die Potsdamer Schlössernacht ist ein Höhepunkt."
  },
  {
    season: "Herbst",
    description: "Erntedankfeste, traditionelle Herbstmärkte und Reformationsfeiern bestimmen die Jahreszeit. Die Kürbisfeste im Spreewald sind besonders beliebt."
  },
  {
    season: "Winter",
    description: "Historische Weihnachtsmärkte wie der Potsdamer und Cottbuser Weihnachtsmarkt und traditionelle Winterfeste prägen die Adventszeit."
  }
];

export const brandenburg: StateInfo = {
  fullName: "Brandenburg",
  shortName: "BB",
  capital: "Potsdam",
  description: "Brandenburg, das Land der tausend Seen und Wälder, verbindet preußische Geschichte mit moderner Entwicklung. Die historischen Residenzen, die UNESCO-Welterbestätten und die einzigartige Naturlandschaft prägen das kulturelle Leben.",
  culturalHighlights: [
    "UNESCO-Weltkulturerbe Schlösser und Parks von Potsdam",
    "Spreewald und seine Traditionen",
    "Preußische Geschichte und Architektur",
    "Filmstadt Babelsberg",
    "Naturparks und Biosphärenreservate",
    "Traditionelle märkische Küche"
  ],
  keyFacts: {
    population: "2,5 Millionen (2021)",
    area: "29.654 km²",
    founded: "1990 (Neugründung)",
    economicStrength: [
      "Luft- und Raumfahrttechnik",
      "Erneuerbare Energien",
      "Tourismus und Landwirtschaft"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Brandenburg ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["BB"] || []).map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: true,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Brandenburg ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: [
    ...holidays.schoolHolidays["2024"]["BB"],
    ...holidays.schoolHolidays["2025"]["BB"],
    ...holidays.schoolHolidays["2026"]["BB"]
  ],
  uniqueHolidayInfo: "Brandenburg verbindet preußische Traditionen mit regionalen Festen. Die Reformationsgeschichte und die Naturverbundenheit prägen das Festjahr.",
  traditionInfo: "Die brandenburgischen Traditionen sind geprägt von der preußischen Geschichte und dem ländlichen Erbe. Handwerk, Naturverbundenheit und regionale Bräuche bestimmen das kulturelle Leben.",
  seasonalTraditions
}; 