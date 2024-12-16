import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Das neue Jahr wird in NRW mit einer Mischung aus urbanen Feierlichkeiten und traditionellen Bräuchen begrüßt.",
    traditions: ["Silvesterfeuerwerk am Rhein", "Neujahrskonzerte", "Bergmannskapellen"],
    locations: ["Köln", "Düsseldorf", "Dortmund"]
  },
  "Karfreitag": {
    description: "Die Karfreitagstraditionen verbinden rheinischen Katholizismus mit westfälischer Frömmigkeit.",
    traditions: ["Kreuzwege", "Passionskonzerte", "Stille Prozessionen"],
    locations: ["Kölner Dom", "Soester Dom", "Aachener Dom"]
  },
  "Ostermontag": {
    description: "Ostertraditionen von rheinischen Ostermärkten bis zu westfälischen Osterfeuern.",
    traditions: ["Ostermärkte", "Osterfeuer", "Ostereiersuche"],
    locations: ["Münsterland", "Bergisches Land", "Sauerland"]
  },
  "Tag der Arbeit": {
    description: "Der Maifeiertag wird besonders im Ruhrgebiet mit Bezug zur Industriegeschichte gefeiert.",
    traditions: ["Maikundgebungen", "Bergmannsfeste", "Maifeste"],
    locations: ["Ruhrgebiet", "Düsseldorf", "Bielefeld"]
  },
  "Christi Himmelfahrt": {
    description: "Vatertag wird mit Ausflügen in die zahlreichen Naturparks und Naherholungsgebiete gefeiert.",
    traditions: ["Vatertagstouren", "Himmelfahrtsprozessionen", "Familienausflüge"],
    locations: ["Teutoburger Wald", "Siebengebirge", "Sauerland"]
  },
  "Pfingstmontag": {
    description: "Pfingsttraditionen von rheinischen Schützenfesten bis zu westfälischen Pfingstbräuchen.",
    traditions: ["Schützenfeste", "Pfingstmärkte", "Pfingstprozessionen"],
    locations: ["Neuss", "Paderborn", "Münster"]
  },
  "Fronleichnam": {
    description: "Das Fronleichnamsfest wird besonders in den katholischen Regionen mit prächtigen Prozessionen gefeiert.",
    traditions: ["Prozessionen", "Blumenteppiche", "Kirchenfeste"],
    culturalSignificance: "Wichtiger katholischer Feiertag mit langer Tradition",
    locations: ["Köln", "Münster", "Paderborn"]
  },
  "Tag der Deutschen Einheit": {
    description: "NRW feiert die Deutsche Einheit mit Fokus auf die industrielle und kulturelle Entwicklung.",
    traditions: ["Bürgerfeste", "Konzerte", "Ausstellungen"],
    culturalSignificance: "Symbol für wirtschaftliche Stärke und kulturelle Vielfalt",
    locations: ["Düsseldorf", "Essen", "Dortmund"]
  },
  "Allerheiligen": {
    description: "Allerheiligen wird besonders in den katholischen Regionen als wichtiger Gedenktag begangen.",
    traditions: ["Gräberbesuche", "Gedenkgottesdienste", "Lichtermeere"],
    culturalSignificance: "Bedeutender katholischer Feiertag",
    locations: ["Rheinland", "Münsterland", "Köln"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag verbindet rheinische Festlichkeit mit westfälischer Tradition.",
    traditions: ["Weihnachtsgottesdienste", "Familienfeste", "Konzerte"],
    locations: ["Kölner Dom", "Münster", "Aachen"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtstag locken traditionelle Veranstaltungen und winterliche Aktivitäten.",
    traditions: ["Weihnachtskonzerte", "Winterwanderungen", "Familienbesuche"],
    locations: ["Sauerland", "Bergisches Land", "Siegerland"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühjahr",
    description: "Rheinischer Karneval, Frühlingskirmes und erste Outdoor-Aktivitäten in den Naturparks."
  },
  {
    season: "Sommer",
    description: "Zahlreiche Stadtfeste, Schützenfeste und Open-Air-Events prägen den Sommer. Die Cranger Kirmes ist ein Höhepunkt."
  },
  {
    season: "Herbst",
    description: "Weinfeste am Rhein, traditionelle Erntedankfeste und Herbstkirmes bestimmen die Jahreszeit."
  },
  {
    season: "Winter",
    description: "Berühmte Weihnachtsmärkte wie der Kölner und Dortmunder Weihnachtsmarkt, Wintersporthochsaison im Sauerland."
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "Metropolregion Rhein-Ruhr",
    description: "Kulturelle Vielfalt und industrielles Weltkulturerbe",
    attractions: [
      "Kölner Dom",
      "Zeche Zollverein",
      "Düsseldorfer Altstadt",
      "Landschaftspark Duisburg-Nord"
    ],
    activities: [
      "Museumsbesuche",
      "Industriekultur erleben",
      "Rheinschifffahrten",
      "Shopping-Touren"
    ]
  },
  {
    name: "Sauerland & Bergisches Land",
    description: "Mittelgebirgsregion mit vielfältigen Freizeitmöglichkeiten",
    attractions: [
      "Winterberg",
      "Atta-Höhle",
      "Biggesee",
      "Rothaarsteig"
    ],
    activities: [
      "Wandern",
      "Wintersport",
      "Mountainbiking",
      "Wassersport"
    ]
  },
  {
    name: "Münsterland & Teutoburger Wald",
    description: "Historische Kulturlandschaft und Naturerlebnis",
    attractions: [
      "Münster Altstadt",
      "Externsteine",
      "Wasserschlösser",
      "Hermann Denkmal"
    ],
    activities: [
      "Radwandern",
      "Schlösser besichtigen",
      "Naturparks erkunden",
      "Kulturelle Events"
    ]
  }
];

export const nordrheinWestfalen: StateInfo = {
  fullName: "Nordrhein-Westfalen",
  shortName: "NW",
  capital: "Düsseldorf",
  description: "Nordrhein-Westfalen vereint pulsierende Metropolen mit industriellem Weltkulturerbe und reizvoller Natur. Von der Rheinmetropole Köln über das Ruhrgebiet bis zum Sauerland bietet das Land eine einzigartige Mischung aus Kultur, Geschichte und Naturerlebnis.",
  culturalHighlights: [
    "UNESCO-Weltkulturerbe Kölner Dom",
    "UNESCO-Weltkulturerbe Zeche Zollverein",
    "Industriekultur Ruhrgebiet",
    "Rheinische Karnevalstradition",
    "Westfälische Hansestädte",
    "Moderne Kunstszene"
  ],
  keyFacts: {
    population: "17,9 Millionen (2021)",
    area: "34.110 km²",
    founded: "1946",
    economicStrength: [
      "Industrie und Technologie",
      "Dienstleistungssektor",
      "Medien und Kultur",
      "Handel und Messen"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      type: "public" as const,
      isRegional: false,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Nordrhein-Westfalen ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["NW"] || []).map(holiday => ({
      ...holiday,
      type: "public" as const,
      isRegional: true,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Nordrhein-Westfalen ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: holidays.schoolHolidays["2025"]["NW"].map(holiday => {
    const familyActivities: Record<string, { description: string, activities: string[] }> = {
      "Winterferien": {
        description: "Winterferien zwischen Metropolen und Bergen - Vielfältiges Vergnügen",
        activities: [
          "Skifahren in Winterberg",
          "Museumsbesuche",
          "Indoor-Spielparks",
          "Winterwandern im Sauerland"
        ]
      },
      "Osterferien": {
        description: "Osterferien im Kulturland - Zwischen Tradition und Moderne",
        activities: [
          "Osterkirmes besuchen",
          "Frühlingsradtouren",
          "Industriekultur erkunden",
          "Osterbräuche erleben"
        ]
      },
      "Pfingstferien": {
        description: "Pfingstferien in der Freizeitregion - Aktiv in Stadt und Natur",
        activities: [
          "Freizeitparks besuchen",
          "Wandern im Teutoburger Wald",
          "Stadtführungen",
          "Kletterparks erkunden"
        ]
      },
      "Sommerferien": {
        description: "Sommerferien im Erlebnisland - Sechs Wochen Abenteuer",
        activities: [
          "Straßenfeste erleben",
          "Freibäder besuchen",
          "Naturparks erkunden",
          "Freizeitparks genießen"
        ]
      },
      "Herbstferien": {
        description: "Herbstferien in bunter Vielfalt - Kultur und Natur",
        activities: [
          "Drachenfeste",
          "Herbstwanderungen",
          "Museumsbesuche",
          "Indoor-Aktivitäten"
        ]
      },
      "Weihnachtsferien": {
        description: "Weihnachtsferien im Lichterglanz - Festliche Metropolen",
        activities: [
          "Weihnachtsmärkte besuchen",
          "Wintersporthochburg Sauerland",
          "Silvester am Rhein",
          "Indoor-Spielwelten"
        ]
      }
    };

    const holidayName = holiday.name.split(" ")[0] as keyof typeof familyActivities;
    const holidayInfo = familyActivities[holidayName] || {
      description: `${holiday.name} in Nordrhein-Westfalen`,
      activities: []
    };

    return {
      ...holiday,
      type: "school" as const,
      date: holiday.start,
      details: {
        description: holidayInfo.description,
        familyActivities: holidayInfo.activities
      }
    };
  }),
  uniqueHolidayInfo: "Nordrhein-Westfalen verbindet rheinische Festkultur mit westfälischen Traditionen. Die Vielfalt der Regionen spiegelt sich in den Feierlichkeiten wider.",
  traditionInfo: "Die Traditionen Nordrhein-Westfalens sind geprägt von der Vielfalt seiner Regionen: Rheinischer Karneval, Industriekultur des Ruhrgebiets und westfälische Bräuche prägen das kulturelle Leben.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Metropolkultur",
      icon: "city",
      items: [
        {
          title: "Rheinmetropolen",
          description: "Kulturelle Vielfalt und rheinische Lebensart",
          icon: "landmark"
        },
        {
          title: "Ruhrgebiet",
          description: "Industriekultur und moderne Transformation",
          icon: "industry"
        }
      ]
    },
    {
      title: "Naturerlebnis",
      icon: "mountain",
      items: [
        {
          title: "Sauerland",
          description: "Outdoor-Aktivitäten und Wintersport",
          icon: "skiing"
        },
        {
          title: "Münsterland",
          description: "Radfahrerparadies und Schlösserland",
          icon: "bicycle"
        }
      ]
    }
  ]
}; 