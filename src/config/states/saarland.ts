import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Das neue Jahr wird mit einer Mischung aus französischen und deutschen Traditionen begrüßt.",
    traditions: ["Deutsch-französische Neujahrsfeste", "Feuerwerk an der Saar", "Neujahrskonzerte"],
    locations: ["Saarbrücken", "Saarlouis", "Merzig"]
  },
  "Karfreitag": {
    description: "Die Karfreitagstraditionen verbinden deutsch-französische Bräuche mit Bergbautraditionen.",
    traditions: ["Kreuzwege", "Passionskonzerte", "Bergmannsandachten"],
    locations: ["St. Johann Basilika", "Ludwigskirche", "Völklinger Hütte"]
  },
  "Ostermontag": {
    description: "Ostertraditionen von französisch inspirierten Ostermärkten bis zu Bergmannsfesten.",
    traditions: ["Ostermärkte", "Osterfeuer", "Bergmannsfeste"],
    locations: ["Saarbrücken", "Neunkirchen", "St. Wendel"]
  },
  "Tag der Arbeit": {
    description: "Der Maifeiertag wird besonders im ehemaligen Bergbaurevier mit Bezug zur Industriegeschichte gefeiert.",
    traditions: ["Maikundgebungen", "Bergmannsfeste", "Deutsch-französische Feste"],
    locations: ["Völklingen", "Saarlouis", "Dillingen"]
  },
  "Christi Himmelfahrt": {
    description: "Vatertag wird mit Wanderungen durch die deutsch-französische Grenzregion gefeiert.",
    traditions: ["Grenzwanderungen", "Vatertagstouren", "Familienausflüge"],
    locations: ["Bliesgau", "Saargau", "Hunsrück"]
  },
  "Pfingstmontag": {
    description: "Pfingsttraditionen von französisch geprägten Festen bis zu saarländischen Bergmannsfeiern.",
    traditions: ["Pfingstmärkte", "Bergmannsfeste", "Grenzfeste"],
    locations: ["Saarbrücken", "Homburg", "St. Ingbert"]
  },
  "Fronleichnam": {
    description: "Das Fronleichnamsfest wird mit deutsch-französischer Prägung und prächtigen Prozessionen gefeiert.",
    traditions: ["Prozessionen", "Blumenteppiche", "Kirchenfeste"],
    culturalSignificance: "Wichtiger katholischer Feiertag mit grenzüberschreitender Bedeutung",
    locations: ["Saarbrücken", "Merzig", "Saarlouis"]
  },
  "Mariä Himmelfahrt": {
    description: "Mariä Himmelfahrt wird als wichtiger katholischer Feiertag mit französischem Einfluss begangen.",
    traditions: ["Prozessionen", "Kräuterweihe", "Marienfeste"],
    culturalSignificance: "Bedeutender katholischer Feiertag mit regionaler Tradition",
    locations: ["Saarbrücker Dom", "Basilika St. Johann", "Merziger Kirche"]
  },
  "Tag der Deutschen Einheit": {
    description: "Das Saarland feiert die Deutsche Einheit mit Fokus auf deutsch-französische Freundschaft.",
    traditions: ["Bürgerfeste", "Grenzfeste", "Konzerte"],
    culturalSignificance: "Symbol für europäische Integration",
    locations: ["Saarbrücken", "Saarlouis", "Völklingen"]
  },
  "Allerheiligen": {
    description: "Allerheiligen wird mit deutsch-französischen Traditionen als wichtiger Gedenktag begangen.",
    traditions: ["Gräberbesuche", "Gedenkgottesdienste", "Lichtermeere"],
    culturalSignificance: "Bedeutender katholischer Feiertag",
    locations: ["Saarbrücken", "Dillingen", "Merzig"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag verbindet deutsche und französische Weihnachtstraditionen.",
    traditions: ["Weihnachtsgottesdienste", "Festessen", "Konzerte"],
    locations: ["Saarbrücken", "St. Wendel", "Homburg"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtstag locken deutsch-französische Traditionen und winterliche Aktivitäten.",
    traditions: ["Weihnachtskonzerte", "Winterwanderungen", "Familienbesuche"],
    locations: ["Bliesgau", "Saargau", "Saarbrücken"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühjahr",
    description: "Deutsch-französische Frühlingsfeste, erste Bergmannsfeste und Wanderungen im Bliesgau."
  },
  {
    season: "Sommer",
    description: "Industriekultur-Events, deutsch-französische Stadtfeste und Saar-Spektakel prägen den Sommer."
  },
  {
    season: "Herbst",
    description: "Erntedankfeste mit französischem Einfluss, Bergmannsfeste und kulinarische Wochen."
  },
  {
    season: "Winter",
    description: "Französisch inspirierte Weihnachtsmärkte, Bergmannsweihnacht und winterliche Industriekultur."
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "UNESCO-Weltkulturerbe Völklinger Hütte",
    description: "Industriekultur von Weltrang und lebendige Geschichte",
    attractions: [
      "Völklinger Hütte",
      "Science Center Ferrodrom",
      "Industriekulturpfad",
      "Ausstellungen"
    ],
    activities: [
      "Industriekultur erleben",
      "Führungen",
      "Kulturveranstaltungen",
      "Fototouren"
    ]
  },
  {
    name: "UNESCO-Biosphärenreservat Bliesgau",
    description: "Einzigartige Naturlandschaft mit deutsch-französischem Charakter",
    attractions: [
      "Orchideenwiesen",
      "Streuobstwiesen",
      "Historische Städte",
      "Kulturlandschaft"
    ],
    activities: [
      "Naturwanderungen",
      "Radtouren",
      "Kulturerbe erkunden",
      "Kulinarische Entdeckungen"
    ]
  },
  {
    name: "Saarschleife & Saartal",
    description: "Naturwunder und deutsch-französische Kulturregion",
    attractions: [
      "Saarschleife",
      "Baumwipfelpfad",
      "Burgruinen",
      "Weinberge"
    ],
    activities: [
      "Schifffahrten",
      "Wandern",
      "Weinproben",
      "Aussichtsplattformen"
    ]
  }
];

export const saarland: StateInfo = {
  fullName: "Saarland",
  shortName: "SL",
  capital: "Saarbrücken",
  description: "Das Saarland vereint deutsch-französische Lebensart mit industriellem Weltkulturerbe und reizvoller Natur. Von der UNESCO-Welterbestätte Völklinger Hütte über das Biosphärenreservat Bliesgau bis zur eindrucksvollen Saarschleife bietet das Land eine einzigartige Mischung aus Kultur und Natur.",
  culturalHighlights: [
    "UNESCO-Weltkulturerbe Völklinger Hütte",
    "UNESCO-Biosphärenreservat Bliesgau",
    "Deutsch-französische Kultur",
    "Industriekultur",
    "Saarschleife",
    "Kulinarische Tradition"
  ],
  keyFacts: {
    population: "0,98 Millionen (2021)",
    area: "2.570 km²",
    founded: "1957",
    economicStrength: [
      "Automobilindustrie",
      "IT-Technologie",
      "Tourismus",
      "Kulturwirtschaft"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      type: "public" as const,
      isRegional: false,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist im Saarland ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["SL"] || []).map(holiday => ({
      ...holiday,
      type: "public" as const,
      isRegional: true,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist im Saarland ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: holidays.schoolHolidays["2025"]["SL"].map(holiday => {
    const familyActivities: Record<string, { description: string, activities: string[] }> = {
      "Winterferien": {
        description: "Winterferien zwischen Industrie und Natur - Vielfältiges Vergnügen",
        activities: [
          "Industriekultur erkunden",
          "Winterwanderungen",
          "Indoor-Spielwelten",
          "Museumsbesuche"
        ]
      },
      "Osterferien": {
        description: "Osterferien im Grenzland - Deutsch-französische Traditionen",
        activities: [
          "Ostermärkte besuchen",
          "Frühlingsradtouren",
          "Industriekultur erleben",
          "Naturerkundungen"
        ]
      },
      "Pfingstferien": {
        description: "Pfingstferien in der Kulturregion - Aktiv zwischen Geschichte und Natur",
        activities: [
          "Völklinger Hütte erkunden",
          "Wandern im Bliesgau",
          "Saarschleife besuchen",
          "Kulturtouren"
        ]
      },
      "Sommerferien": {
        description: "Sommerferien im Grenzland - Sechs Wochen Kultur und Natur",
        activities: [
          "Saar-Spektakel erleben",
          "Freibäder besuchen",
          "Naturparks erkunden",
          "Industriekultur entdecken"
        ]
      },
      "Herbstferien": {
        description: "Herbstferien in bunter Vielfalt - Kultur und Natur",
        activities: [
          "Herbstwanderungen",
          "Industriekultur erleben",
          "Kulinarische Touren",
          "Museumsbesuche"
        ]
      },
      "Weihnachtsferien": {
        description: "Weihnachtsferien im Lichterglanz - Festliche Zeit im Grenzland",
        activities: [
          "Weihnachtsmärkte besuchen",
          "Bergmannsweihnacht erleben",
          "Winterwanderungen",
          "Indoor-Aktivitäten"
        ]
      }
    };

    const holidayName = holiday.name.split(" ")[0] as keyof typeof familyActivities;
    const holidayInfo = familyActivities[holidayName] || {
      description: `${holiday.name} im Saarland`,
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
  uniqueHolidayInfo: "Das Saarland verbindet deutsch-französische Festkultur mit Industrietraditionen. Die Vielfalt der Regionen und die Nähe zu Frankreich spiegeln sich in den Feierlichkeiten wider.",
  traditionInfo: "Die Traditionen des Saarlandes sind geprägt von deutsch-französischer Lebensart, Industriegeschichte und katholischen Bräuchen. Bergmannsfeste, französisch inspirierte Feiern und regionale Traditionen prägen das kulturelle Leben.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Kulturmix",
      icon: "globe-europe",
      items: [
        {
          title: "Deutsch-französisch",
          description: "Einzigartige Mischung der Kulturen",
          icon: "flag"
        },
        {
          title: "Industriekultur",
          description: "Lebendiges Weltkulturerbe",
          icon: "industry"
        }
      ]
    },
    {
      title: "Naturerlebnis",
      icon: "leaf",
      items: [
        {
          title: "Bliesgau",
          description: "UNESCO-Biosphärenreservat",
          icon: "tree"
        },
        {
          title: "Saarschleife",
          description: "Einzigartiges Naturwunder",
          icon: "water"
        }
      ]
    }
  ]
}; 