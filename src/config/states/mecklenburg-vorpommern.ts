import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "An der Ostseeküste wird das neue Jahr mit maritimen Neujahrsbräuchen und Strandfeuern begrüßt.",
    traditions: ["Neujahrsanbaden", "Leuchtturmbesteigungen", "Hafenfeuerwerk"],
    locations: ["Warnemünde", "Rostock", "Stralsund"]
  },
  "Karfreitag": {
    description: "Die Karfreitagstraditionen verbinden maritime Bräuche mit christlichen Traditionen in den historischen Hansestädten.",
    traditions: ["Fischerfeste", "Passionskonzerte", "Kreuzwege"],
    locations: ["Wismar", "Schwerin", "Greifswald"]
  },
  "Ostermontag": {
    description: "Osterbräuche an der Küste vereinen Strandwanderungen mit traditionellen Osterfeuern.",
    traditions: ["Osterfeuer am Strand", "Ostereiersuche in den Dünen", "Fischereitraditionen"],
    locations: ["Usedom", "Rügen", "Fischland-Darß"]
  },
  "Tag der Arbeit": {
    description: "Der Maifeiertag wird mit maritimen Festen und der Eröffnung der Strandsaison gefeiert.",
    traditions: ["Hafenfeste", "Maibaumaufstellen", "Strandkorbsaison-Eröffnung"],
    locations: ["Rostock", "Wismar", "Kühlungsborn"]
  },
  "Christi Himmelfahrt": {
    description: "Vatertag wird oft mit Bootsausflügen und Strandfesten verbunden.",
    traditions: ["Segeltouren", "Strandwanderungen", "Hafenrundfahrten"],
    locations: ["Warnemünde", "Schwerin", "Müritz"]
  },
  "Pfingstmontag": {
    description: "Traditionelle Pfingstfeste verbinden sich mit maritimen Bräuchen und Wassersport.",
    traditions: ["Hafenfeste", "Segelregatten", "Strandfeste"],
    locations: ["Rostock", "Stralsund", "Binz"]
  },
  "Tag der Deutschen Einheit": {
    description: "Der Tag wird mit besonderen Fokus auf die maritime Geschichte und Entwicklung seit der Wiedervereinigung gefeiert.",
    traditions: ["Hafenfeste", "Historische Ausstellungen", "Konzerte"],
    culturalSignificance: "Symbol für die Entwicklung der Küstenregion seit 1990",
    locations: ["Schwerin", "Rostock", "Stralsund"]
  },
  "1. Weihnachtstag": {
    description: "Weihnachten an der Ostsee verbindet maritime Traditionen mit festlicher Stimmung.",
    traditions: ["Weihnachtsgottesdienste", "Maritime Weihnachtskonzerte", "Festessen"],
    locations: ["Warnemünde", "Wismar", "Greifswald"]
  },
  "2. Weihnachtstag": {
    description: "Der zweite Weihnachtstag lädt zu winterlichen Strandspaziergängen und maritimen Traditionen.",
    traditions: ["Winterwanderungen am Strand", "Leuchtturmbesuche", "Familientreffen"],
    locations: ["Rügen", "Usedom", "Fischland-Darß"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühjahr",
    description: "Erwachen der Küstenregion mit ersten Strandspaziergängern und Seglern. Die Kreidefelsen erstrahlen im Frühlingslicht."
  },
  {
    season: "Sommer",
    description: "Hochsaison an den Stränden mit Segelregatten, Strandfesten und traditionellen Hafenfesten. Die Hanse Sail ist ein Höhepunkt."
  },
  {
    season: "Herbst",
    description: "Kranichzug auf Rügen, Herbststürme an der Küste und gemütliche Fischräuchereien prägen die Jahreszeit."
  },
  {
    season: "Winter",
    description: "Winterliche Strandspaziergänge, maritime Weihnachtsmärkte und Neujahrsbaden sind beliebte Traditionen."
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "Ostseeküste",
    description: "Kilometerlange Strände, Kreidefelsen und historische Seebäder",
    attractions: [
      "Kreidefelsen auf Rügen",
      "Kaiserbäder auf Usedom",
      "Warnemünder Leuchtturm",
      "Fischland-Darß-Zingst"
    ],
    activities: [
      "Strandwandern",
      "Wassersport",
      "Wellness in Seebädern",
      "Leuchtturmbesteigungen"
    ]
  },
  {
    name: "Hansestädte",
    description: "UNESCO-Welterbe und lebendige maritime Geschichte",
    attractions: [
      "Stralsunder Altstadt",
      "Wismarer Hafen",
      "Rostocker Stadtmauer",
      "Greifswalder Dom"
    ],
    activities: [
      "Stadtführungen",
      "Hafenrundfahrten",
      "Museumsbesuche",
      "Backsteingotik erkunden"
    ]
  },
  {
    name: "Seenplatte",
    description: "Größtes zusammenhängendes Seengebiet Europas",
    attractions: [
      "Müritz-Nationalpark",
      "Schweriner Schloss",
      "Wasserwanderrastplätze",
      "Naturparks"
    ],
    activities: [
      "Hausbooturlaub",
      "Radwandern",
      "Naturbeobachtungen",
      "Wassersport"
    ]
  }
];

export const mecklenburgVorpommern: StateInfo = {
  fullName: "Mecklenburg-Vorpommern",
  shortName: "MV",
  capital: "Schwerin",
  description: "Mecklenburg-Vorpommern, das Land der Seen und Ostsee, vereint maritime Tradition mit unberührter Natur. Von den UNESCO-Welterbe-Hansestädten bis zu den Kreidefelsen Rügens bietet das Land einzigartige Urlaubserlebnisse.",
  culturalHighlights: [
    "UNESCO-Welterbe Backsteingotik",
    "Maritime Traditionen",
    "Historische Seebäder",
    "Hansestädte",
    "Naturparks und Nationalparks",
    "Traditionelle Fischerei"
  ],
  keyFacts: {
    population: "1,6 Millionen (2021)",
    area: "23.295 km²",
    founded: "1945",
    economicStrength: [
      "Tourismus",
      "Maritime Wirtschaft",
      "Landwirtschaft",
      "Erneuerbare Energien"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      type: "public" as const,
      isRegional: false,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Mecklenburg-Vorpommern ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["MV"] || []).map(holiday => ({
      ...holiday,
      type: "public" as const,
      isRegional: true,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Mecklenburg-Vorpommern ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: holidays.schoolHolidays["2025"]["MV"].map(holiday => {
    const familyActivities: Record<string, { description: string, activities: string[] }> = {
      "Winterferien": {
        description: "Winterferien an der Ostsee - Maritimes Wintervergnügen",
        activities: [
          "Winterwandern am Strand",
          "Ozeaneum Stralsund",
          "Wellnessangebote in Seebädern",
          "Eisangeln an der Seenplatte"
        ]
      },
      "Osterferien": {
        description: "Osterferien im Küstenland - Frühlingserwachen an der See",
        activities: [
          "Kreidefelsen erkunden",
          "Frühlingsradtouren",
          "Störtebeker Festspiele",
          "Ostseebäder entdecken"
        ]
      },
      "Pfingstferien": {
        description: "Pfingstferien an der Küste - Maritime Abenteuer",
        activities: [
          "Segeltörns",
          "Wasserwandern",
          "Hansestädte erkunden",
          "Strandaktivitäten"
        ]
      },
      "Sommerferien": {
        description: "Sommerferien im Urlaubsparadies - Sechs Wochen Küstenglück",
        activities: [
          "Wassersport an der Ostsee",
          "Hanse Sail erleben",
          "Nationalpark-Touren",
          "Inselhüpfen"
        ]
      },
      "Herbstferien": {
        description: "Herbstferien an der Küste - Kraniche und Bernstein",
        activities: [
          "Kranichbeobachtung",
          "Bernsteinsuche",
          "Drachensteigen am Strand",
          "Maritimes Museum"
        ]
      },
      "Weihnachtsferien": {
        description: "Weihnachtsferien am Meer - Winterzauber an der Küste",
        activities: [
          "Maritime Weihnachtsmärkte",
          "Leuchtturm-Touren",
          "Winterwellness",
          "Neujahrsschwimmen"
        ]
      }
    };

    const baseHolidayName = holiday.name.split(" ")[0];
    const holidayName = baseHolidayName.charAt(0).toUpperCase() + baseHolidayName.slice(1);
    const holidayInfo = familyActivities[holidayName] || {
      description: `${holiday.name} in Mecklenburg-Vorpommern`,
      activities: []
    };

    return {
      ...holiday,
      type: 'school' as const,
      date: holiday.start,
      details: {
        description: holidayInfo.description,
        familyActivities: holidayInfo.activities
      }
    };
  }),
  uniqueHolidayInfo: "Mecklenburg-Vorpommern verbindet maritime Festkultur mit Naturerlebnissen. Die Kombination aus Strand, Hansestädten und Seenplatte prägt das Festjahr.",
  traditionInfo: "Die Traditionen Mecklenburg-Vorpommerns sind stark von der maritimen Geschichte und dem Leben an der Küste geprägt. Fischerei, Seefahrt und Bäderkultur bestimmen das kulturelle Leben.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Maritime Kultur",
      icon: "anchor",
      items: [
        {
          title: "Hansestädte",
          description: "UNESCO-Welterbe Backsteingotik und lebendige Hafentradition",
          icon: "building"
        },
        {
          title: "Seebäder",
          description: "Historische Bäderarchitektur und moderne Wellness",
          icon: "umbrella-beach"
        }
      ]
    },
    {
      title: "Naturschätze",
      icon: "leaf",
      items: [
        {
          title: "Ostseeküste",
          description: "Kreidefelsen, Nationalparks und endlose Strände",
          icon: "water"
        },
        {
          title: "Seenplatte",
          description: "Wassersportparadies und unberührte Natur",
          icon: "tree"
        }
      ]
    }
  ]
}; 