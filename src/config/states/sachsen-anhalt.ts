import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Das neue Jahr wird mit mittelalterlichen Traditionen und Brauchtum begrüßt.",
    traditions: ["Feuerwerk über der Altstadt", "Neujahrskonzerte", "Traditionelle Umzüge"],
    locations: ["Magdeburg", "Halle", "Wernigerode"]
  },
  "Karfreitag": {
    description: "Die Karfreitagstraditionen verbinden Luthers Erbe mit regionalen Bräuchen.",
    traditions: ["Passionsmusik", "Kreuzwege", "Andachten"],
    locations: ["Lutherstadt Wittenberg", "Magdeburger Dom", "Halberstadt"]
  },
  "Ostermontag": {
    description: "Ostertraditionen von mittelalterlichen Ostermärkten bis zu Harzer Bräuchen.",
    traditions: ["Ostermärkte", "Osterfeuer", "Traditionelle Umzüge"],
    locations: ["Quedlinburg", "Harz", "Altmark"]
  },
  "Tag der Arbeit": {
    description: "Der Maifeiertag wird mit traditionellen Festen und regionalen Bräuchen gefeiert.",
    traditions: ["Maifeste", "Handwerkerfeste", "Frühlingsmärkte"],
    locations: ["Magdeburg", "Dessau", "Stendal"]
  },
  "Christi Himmelfahrt": {
    description: "Vatertag wird mit Wanderungen durch den Harz und die Kulturlandschaften gefeiert.",
    traditions: ["Wanderungen", "Himmelfahrtsgottesdienste", "Familienausflüge"],
    locations: ["Harz", "Saale-Unstrut", "Altmark"]
  },
  "Pfingstmontag": {
    description: "Pfingsttraditionen von mittelalterlichen Festspielen bis zu regionalen Festen.",
    traditions: ["Pfingstmärkte", "Ritterspiele", "Kirchenfeste"],
    locations: ["Wernigerode", "Tangermünde", "Naumburg"]
  },
  "Reformationstag": {
    description: "Der Reformationstag wird als wichtiger protestantischer Feiertag mit historischer Bedeutung begangen.",
    traditions: ["Reformationsgottesdienste", "Lutherfeste", "Historische Führungen"],
    culturalSignificance: "Zentrum der Reformation mit Luthers Wirkungsstätten",
    locations: ["Lutherstadt Wittenberg", "Eisleben", "Mansfeld"]
  },
  "Tag der Deutschen Einheit": {
    description: "Sachsen-Anhalt feiert die Deutsche Einheit mit Fokus auf die Friedliche Revolution.",
    traditions: ["Bürgerfeste", "Konzerte", "Ausstellungen"],
    culturalSignificance: "Bedeutender Ort der Friedlichen Revolution",
    locations: ["Magdeburg", "Halle", "Dessau"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag verbindet mittelalterliche Traditionen mit Harzer Brauchtum.",
    traditions: ["Christvespern", "Weihnachtskonzerte", "Krippenspiele"],
    locations: ["Magdeburger Dom", "Quedlinburg", "Wernigerode"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtstag locken winterliche Aktivitäten und traditionelle Feste.",
    traditions: ["Weihnachtskonzerte", "Winterwanderungen", "Familienbesuche"],
    locations: ["Harz", "Altmark", "Saale-Unstrut"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühjahr",
    description: "Mittelalterliche Frühlingsfeste, erste Wanderungen im Harz und Kulturveranstaltungen in den UNESCO-Welterbestätten."
  },
  {
    season: "Sommer",
    description: "Historische Festspiele, Schloss- und Burgenfeste und Open-Air-Events prägen den Sommer."
  },
  {
    season: "Herbst",
    description: "Weinfeste im Saale-Unstrut-Gebiet, mittelalterliche Herbstmärkte und Wanderungen im Harz."
  },
  {
    season: "Winter",
    description: "Historische Weihnachtsmärkte in Fachwerkstädten, Harzer Wintertraditionen und kulturelle Veranstaltungen."
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "UNESCO-Welterbestätten",
    description: "Mittelalterliche Städte und Reformationsgeschichte",
    attractions: [
      "Lutherstadt Wittenberg",
      "Quedlinburg",
      "Dessau-Wörlitzer Gartenreich",
      "Naumburger Dom"
    ],
    activities: [
      "Stadtführungen",
      "Museumsbesuche",
      "Kulturveranstaltungen",
      "Historische Rundgänge"
    ]
  },
  {
    name: "Harz & Vorland",
    description: "Mittelgebirge und historische Bergbauregion",
    attractions: [
      "Brocken",
      "Wernigerode",
      "Harzer Schmalspurbahnen",
      "Bodetal"
    ],
    activities: [
      "Wandern",
      "Wintersport",
      "Dampflokfahrten",
      "Naturerkundung"
    ]
  },
  {
    name: "Saale-Unstrut-Region",
    description: "Weinanbaugebiet und Kulturlandschaft",
    attractions: [
      "Weinberge",
      "Burgen und Schlösser",
      "Romanische Straße",
      "Klöster"
    ],
    activities: [
      "Weinproben",
      "Radwandern",
      "Kulturtouren",
      "Schifffahrten"
    ]
  }
];

export const sachsenAnhalt: StateInfo = {
  fullName: "Sachsen-Anhalt",
  shortName: "ST",
  capital: "Magdeburg",
  description: "Sachsen-Anhalt vereint mittelalterliches Erbe mit UNESCO-Weltkulturerbe und reizvoller Natur. Von der Lutherstadt Wittenberg über die Fachwerkstadt Quedlinburg bis zum Harz bietet das Land eine einzigartige Mischung aus Geschichte und Landschaft.",
  culturalHighlights: [
    "UNESCO-Welterbe Lutherstätten",
    "UNESCO-Welterbe Quedlinburg",
    "UNESCO-Welterbe Dessau-Wörlitz",
    "Romanische Straße",
    "Mittelalterliche Städte",
    "Harz-Region"
  ],
  keyFacts: {
    population: "2,2 Millionen (2021)",
    area: "20.454 km²",
    founded: "1990",
    economicStrength: [
      "Chemische Industrie",
      "Erneuerbare Energien",
      "Tourismus",
      "Landwirtschaft"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      type: "public" as const,
      isRegional: false,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Sachsen-Anhalt ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["ST"] || []).map(holiday => ({
      ...holiday,
      type: "public" as const,
      isRegional: true,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Sachsen-Anhalt ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: holidays.schoolHolidays["2025"]["ST"].map(holiday => {
    const familyActivities: Record<string, { description: string, activities: string[] }> = {
      "Winterferien": {
        description: "Winterferien zwischen Kultur und Natur - Vielfältiges Vergnügen",
        activities: [
          "Wintersport im Harz",
          "Museumsbesuche",
          "Stadtführungen",
          "Indoor-Aktivitäten"
        ]
      },
      "Osterferien": {
        description: "Osterferien im Geschichtsland - Zwischen Tradition und Natur",
        activities: [
          "Ostermärkte besuchen",
          "Frühlingsradtouren",
          "UNESCO-Stätten erkunden",
          "Wanderungen"
        ]
      },
      "Pfingstferien": {
        description: "Pfingstferien in der Kulturregion - Aktiv zwischen Geschichte und Natur",
        activities: [
          "Burgen erkunden",
          "Wandern im Harz",
          "Stadtführungen",
          "Gartenreich entdecken"
        ]
      },
      "Sommerferien": {
        description: "Sommerferien im Erlebnisland - Sechs Wochen Entdeckungen",
        activities: [
          "Dampflokfahrten",
          "Freibäder besuchen",
          "Mittelalter erleben",
          "Naturparks erkunden"
        ]
      },
      "Herbstferien": {
        description: "Herbstferien in bunter Vielfalt - Kultur und Natur",
        activities: [
          "Herbstwanderungen",
          "Weinfeste besuchen",
          "Museumstouren",
          "Burgenbesichtigungen"
        ]
      },
      "Weihnachtsferien": {
        description: "Weihnachtsferien im Lichterglanz - Festliche Zeit in historischer Kulisse",
        activities: [
          "Weihnachtsmärkte besuchen",
          "Winterwandern im Harz",
          "Stadtführungen",
          "Kulturgenuss"
        ]
      }
    };

    const holidayName = holiday.name.split(" ")[0] as keyof typeof familyActivities;
    const holidayInfo = familyActivities[holidayName] || {
      description: `${holiday.name} in Sachsen-Anhalt`,
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
  uniqueHolidayInfo: "Sachsen-Anhalt verbindet mittelalterliche Festkultur mit Reformationsgeschichte. Die Vielfalt der Regionen von der Altmark über den Harz bis zur Saale-Unstrut spiegelt sich in den Feierlichkeiten wider.",
  traditionInfo: "Die Traditionen Sachsen-Anhalts sind geprägt von mittelalterlicher Geschichte, Reformationsgeschichte und regionaler Kultur. Historische Feste, Luthergedenken und lebendiges Brauchtum prägen das kulturelle Leben.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Kulturerbe",
      icon: "landmark",
      items: [
        {
          title: "Mittelalter",
          description: "UNESCO-Welterbe und lebendige Geschichte",
          icon: "castle"
        },
        {
          title: "Reformation",
          description: "Luthers Wirkungsstätten",
          icon: "book"
        }
      ]
    },
    {
      title: "Naturerlebnis",
      icon: "mountain",
      items: [
        {
          title: "Harz",
          description: "Höchster Norden Deutschlands",
          icon: "hiking"
        },
        {
          title: "Weinland",
          description: "Saale-Unstrut-Region",
          icon: "wine-glass"
        }
      ]
    }
  ]
}; 