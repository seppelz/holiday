import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Die Hamburger Neujahrsfeiern beeindrucken mit spektakulärem Feuerwerk über Alster und Elbe sowie traditionellen Hafenrundfahrten.",
    traditions: ["Feuerwerk über der Elbe", "Hafenrundfahrten", "Neujahrsempfänge"],
    locations: ["Landungsbrücken", "Jungfernstieg", "Speicherstadt"]
  },
  "Karfreitag": {
    description: "Der Hamburger Karfreitag vereint hanseatische Würde mit beeindruckenden Passionskonzerten in den historischen Hauptkirchen.",
    traditions: ["Passionskonzerte", "Kreuzwege", "Fastenbräuche"],
    locations: ["Michel", "Hauptkirche St. Petri", "St. Katharinen"]
  },
  "Ostermontag": {
    description: "Die Hamburger Ostertraditionen verbinden maritime Bräuche mit festlichen Osterfeuern entlang der Elbe und in den Stadtparks.",
    traditions: ["Osterfeuer an der Elbe", "Ostermärkte", "Hafenrundfahrten"],
    locations: ["Planten un Blomen", "Stadtpark", "Alsterpark"]
  },
  "Tag der Arbeit": {
    description: "Der Hamburger Maifeiertag ist eng mit dem Hafengeburtstag verknüpft und feiert die maritime Arbeiterkultur der Hansestadt.",
    traditions: ["Hafengeburtstag", "Maikundgebungen", "Stadtteilfeste"],
    locations: ["Landungsbrücken", "Fischmarkt", "Hafencity"]
  },
  "Christi Himmelfahrt": {
    description: "Die Hamburger Himmelfahrtstraditionen locken zu Ausflügen an Alster und Elbe sowie zu besonderen Hafenrundfahrten.",
    traditions: ["Vatertagstouren", "Alstervergnügen", "Hafenrundfahrten"],
    locations: ["Außenalster", "Stadtpark", "Övelgönne"]
  },
  "Pfingstmontag": {
    description: "Der Hamburger Pfingstmontag bietet maritime Feste in der HafenCity und traditionelle Veranstaltungen an der Alster.",
    traditions: ["Hafenfeste", "Alstervergnügen", "Pfingstkonzerte"],
    locations: ["Hafencity", "Blankenese", "St. Pauli"]
  },
  "Tag der Deutschen Einheit": {
    description: "Hamburg feiert die Deutsche Einheit als internationales Tor zur Welt mit einer Verbindung aus Hafentradition und Weltoffenheit.",
    traditions: ["Bürgerfeste", "Hafenkonzerte", "Kulturveranstaltungen"],
    culturalSignificance: "Symbol für Weltoffenheit und internationale Verbindungen",
    locations: ["Rathausmarkt", "Hafencity", "Speicherstadt"]
  },
  "Reformationstag": {
    description: "Als protestantische Hansestadt zelebriert Hamburg den Reformationstag mit besonderen Gottesdiensten in den historischen Hauptkirchen.",
    traditions: ["Reformationsgottesdienste", "Kirchenkonzerte", "Historische Führungen"],
    culturalSignificance: "Erinnerung an die protestantische Tradition der Hansestadt",
    locations: ["Hauptkirche St. Michaelis", "St. Petri", "St. Nikolai"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag in Hamburg verbindet festliche Gottesdienste im Michel mit der einzigartigen Illumination der Speicherstadt.",
    traditions: ["Weihnachtsgottesdienste", "Hafenlichter", "Festessen"],
    locations: ["Michel", "Speicherstadt", "Blankenese"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtsfeiertag lädt Hamburg zu winterlichen Hafenrundfahrten und stimmungsvollen Spaziergängen am Elbstrand.",
    traditions: ["Winterliche Hafenrundfahrten", "Konzerte", "Spaziergänge"],
    locations: ["Landungsbrücken", "Alster", "Elbstrand"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühling",
    description: "Kirschblütenfest in der Hafencity, Hafengeburtstag, Alstervergnügen"
  },
  {
    season: "Sommer",
    description: "Hamburger DOM, Altonale, Dockville Festival, Cruise Days"
  },
  {
    season: "Herbst",
    description: "Hamburger Filmfest, Reeperbahn Festival, Laternenumzüge"
  },
  {
    season: "Winter",
    description: "Historischer Weihnachtsmarkt, Winterdom, Alstertanne"
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "HafenCity & Speicherstadt",
    description: "Moderne Architektur trifft UNESCO-Weltkulturerbe",
    attractions: [
      "Elbphilharmonie",
      "Speicherstadt",
      "Miniatur Wunderland",
      "HafenCity Universität"
    ],
    activities: [
      "Hafenrundfahrten",
      "Speicherstadtführungen",
      "Miniatur Wunderland besuchen",
      "Maritime Architekturtouren"
    ]
  },
  {
    name: "Alster & Stadtparks",
    description: "Grüne Oasen und Wasserwege im Herzen der Stadt",
    attractions: [
      "Außenalster",
      "Planten un Blomen",
      "Stadtpark",
      "Alsterarkaden"
    ],
    activities: [
      "Alstervergnügen",
      "Bootfahren und Segeln",
      "Picknick im Stadtpark",
      "Botanische Führungen"
    ]
  },
  {
    name: "St. Pauli & Altona",
    description: "Hamburgs bunte Seite mit Kultur und Entertainment",
    attractions: [
      "Reeperbahn",
      "Fischmarkt",
      "Landungsbrücken",
      "Altonaer Balkon"
    ],
    activities: [
      "Fischmarkt am frühen Morgen",
      "Musicalbesuche",
      "Hafenrundgänge",
      "Stadtteilführungen"
    ]
  }
];

export const hamburg: StateInfo = {
  fullName: "Hamburg",
  shortName: "HH",
  capital: "Hamburg",
  description: "Hamburg ist ein Stadtstaat und die zweitgrößte Stadt Deutschlands. Als wichtigster deutscher Seehafen und traditionelle Hansestadt verbindet Hamburg maritime Geschichte mit moderner Weltoffenheit.",
  culturalHighlights: [
    "UNESCO-Welterbe Speicherstadt und Kontorhausviertel",
    "Elbphilharmonie",
    "Michel (Wahrzeichen)",
    "Hamburger Hafen",
    "Reeperbahn und St. Pauli"
  ],
  keyFacts: {
    population: "1,9 Millionen",
    area: "755 km²",
    founded: "808",
    economicStrength: [
      "Hafen und Logistik",
      "Medien und Kultur",
      "Luftfahrtindustrie",
      "Handel",
      "Tourismus"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      type: "public" as const,
      isRegional: false,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Hamburg ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["HH"] || []).map(holiday => ({
      ...holiday,
      type: "public" as const,
      isRegional: true,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Hamburg ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: holidays.schoolHolidays["2025"]["HH"].map(holiday => {
    const familyActivities: Record<string, { description: string, activities: string[] }> = {
      "Winterferien": {
        description: "Winterferien in Hamburg - Maritime Indoor-Abenteuer",
        activities: [
          "Miniatur Wunderland entdecken",
          "Internationales Maritimes Museum",
          "Dialog im Dunkeln erleben",
          "Planetarium Hamburg besuchen"
        ]
      },
      "Osterferien": {
        description: "Osterferien in Hamburg - Frühlingserwachen an Alster und Elbe",
        activities: [
          "Hagenbecks Tierpark mit Osteraktionen",
          "Kirschblütenfest in der HafenCity",
          "Alstervergnügen für Familien",
          "Frühlingserwachen in Planten un Blomen"
        ]
      },
      "Pfingstferien": {
        description: "Pfingstferien in Hamburg - Maritimes Flair",
        activities: [
          "Hafengeburtstag mit Kinderprogramm",
          "Museumsschiff Cap San Diego",
          "Wasserlichtspiele in Planten un Blomen",
          "Ausflugsschifffahrt auf der Alster"
        ]
      },
      "Sommerferien": {
        description: "Sommerferien in Hamburg - Sechs Wochen Großstadtabenteuer",
        activities: [
          "Strandperle und Elbstrand",
          "Hamburger DOM-Besuch",
          "Alsterkanal-Kanufahrten",
          "Wildpark Schwarze Berge"
        ]
      },
      "Herbstferien": {
        description: "Herbstferien in Hamburg - Kulturelle Entdeckungen",
        activities: [
          "Hamburger Kinderbuchhaus",
          "Herbst-DOM mit Attraktionen",
          "Laternenumzüge in den Stadtteilen",
          "Kindertheater im Schmidt Theater"
        ]
      },
      "Weihnachtsferien": {
        description: "Weihnachtsferien in Hamburg - Maritimer Winterzauber",
        activities: [
          "Historischer Weihnachtsmarkt am Rathaus",
          "Eisvergnügen in Planten un Blomen",
          "Weihnachtsparade in der HafenCity",
          "Märchenschiffe an den Landungsbrücken"
        ]
      }
    };

    const baseHolidayName = holiday.name.split(" ")[0];
    const holidayName = baseHolidayName.charAt(0).toUpperCase() + baseHolidayName.slice(1);
    const holidayInfo = familyActivities[holidayName] || {
      description: `${holiday.name} in Hamburg`,
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
  uniqueHolidayInfo: "Hamburg verbindet bei seinen Feiertagen hanseatische Tradition mit maritimem Flair und weltoffener Modernität.",
  traditionInfo: "Die Feiertage in Hamburg sind geprägt von der protestantischen Tradition und der engen Verbindung zum Hafen und zur Seefahrt.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Maritime Kultur",
      icon: "anchor",
      items: [
        {
          title: "Hamburger Hafen",
          description: "Deutschlands größter Seehafen mit jahrhundertealter Geschichte",
          icon: "ship"
        },
        {
          title: "Speicherstadt",
          description: "UNESCO-Weltkulturerbe und größter historischer Lagerhauskomplex der Welt",
          icon: "building"
        }
      ]
    },
    {
      title: "Hanseatische Tradition",
      icon: "landmark",
      items: [
        {
          title: "Historische Hauptkirchen",
          description: "Die fünf Hauptkirchen als Wahrzeichen hanseatischer Tradition",
          icon: "church"
        },
        {
          title: "Alster & Elbe",
          description: "Die prägenden Wasserwege der Hansestadt",
          icon: "water"
        }
      ]
    }
  ]
}; 