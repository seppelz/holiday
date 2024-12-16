import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Das neue Jahr wird mit maritimen Traditionen und nordischen Bräuchen begrüßt.",
    traditions: ["Feuerwerk über den Häfen", "Neujahrsschwimmen", "Maritime Konzerte"],
    locations: ["Kiel", "Lübeck", "Flensburg"]
  },
  "Karfreitag": {
    description: "Die Karfreitagstraditionen verbinden hanseatisches Erbe mit nordischer Frömmigkeit.",
    traditions: ["Passionskonzerte", "Prozessionen", "Andachten"],
    locations: ["Lübecker Dom", "Schleswiger Dom", "St. Nikolai Kiel"]
  },
  "Ostermontag": {
    description: "Ostertraditionen von Küstenfeuer bis zu friesischen Bräuchen.",
    traditions: ["Osterfeuer", "Eiersuche am Strand", "Ostermärkte"],
    locations: ["Nordfriesische Inseln", "Ostseeküste", "Holsteinische Schweiz"]
  },
  "Tag der Arbeit": {
    description: "Der Maifeiertag wird mit maritimen Traditionen und Hafenfesten gefeiert.",
    traditions: ["Hafenfeste", "Maibaumaufstellung", "Seglerparaden"],
    locations: ["Kieler Hafen", "Lübecker Hafen", "Flensburger Förde"]
  },
  "Christi Himmelfahrt": {
    description: "Vatertag wird mit Ausflügen an die Küste und zu den Seen gefeiert.",
    traditions: ["Wattwanderungen", "Segeltouren", "Strandwanderungen"],
    locations: ["Wattenmeer", "Ostseestrand", "Plöner See"]
  },
  "Pfingstmontag": {
    description: "Pfingsttraditionen von maritimen Festen bis zu Landpartien.",
    traditions: ["Hafenfeste", "Pfingstregatta", "Strandpicknicks"],
    locations: ["Kieler Förde", "Lübecker Bucht", "Schlei"]
  },
  "Tag der Deutschen Einheit": {
    description: "Der Tag der Deutschen Einheit wird mit Fokus auf die maritime Verbindung gefeiert.",
    traditions: ["Hafenfeste", "Segelparaden", "Konzerte"],
    culturalSignificance: "Bedeutung der maritimen Verbindung zwischen Ost und West",
    locations: ["Kiel", "Lübeck", "Flensburg"]
  },
  "Reformationstag": {
    description: "Der Reformationstag wird als wichtiger protestantischer Feiertag begangen.",
    traditions: ["Reformationsgottesdienste", "Kirchenkonzerte", "Historische Führungen"],
    culturalSignificance: "Bedeutende protestantische Tradition im Norden",
    locations: ["Lübeck", "Schleswig", "Husum"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag verbindet maritime mit nordischen Traditionen.",
    traditions: ["Weihnachtsgottesdienste", "Hafenweihnacht", "Konzerte"],
    locations: ["Lübecker Dom", "Kieler St. Nikolai", "Flensburger Nikolaikirche"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtstag locken winterliche Aktivitäten an Küste und Seen.",
    traditions: ["Winterwanderungen", "Familienbesuche", "Konzerte"],
    locations: ["Ostseeküste", "Holsteinische Schweiz", "Nordfriesische Inseln"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühjahr",
    description: "Erste Strandtage, Hafenfeste und maritime Veranstaltungen läuten die Saison ein."
  },
  {
    season: "Sommer",
    description: "Kieler Woche, Strandleben und Wassersport prägen den Sommer an Nord- und Ostsee."
  },
  {
    season: "Herbst",
    description: "Herbststürme, Krabbenfang und gemütliche Teestuben bestimmen die Jahreszeit."
  },
  {
    season: "Winter",
    description: "Maritimes Winterflair mit Weihnachtsmärkten in historischen Hafenstädten."
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "Nordseeküste & Inseln",
    description: "Wattenmeer und Nordfriesische Inseln",
    attractions: [
      "UNESCO-Weltnaturerbe Wattenmeer",
      "Sylt",
      "Amrum",
      "Halligen"
    ],
    activities: [
      "Wattwandern",
      "Strandleben",
      "Inselerkundung",
      "Wellness"
    ]
  },
  {
    name: "Ostseeküste",
    description: "Badeorte und historische Hansestädte",
    attractions: [
      "Lübecker Altstadt",
      "Timmendorfer Strand",
      "Kieler Förde",
      "Flensburger Förde"
    ],
    activities: [
      "Baden",
      "Segeln",
      "Stadtbesichtigungen",
      "Strandwandern"
    ]
  },
  {
    name: "Binnenland",
    description: "Holsteinische Schweiz und historische Städte",
    attractions: [
      "Plöner See",
      "Schleswig",
      "Holsteinische Schweiz",
      "Viking Museum Haithabu"
    ],
    activities: [
      "Wassersport",
      "Radfahren",
      "Kulturerkundung",
      "Naturerlebnis"
    ]
  }
];

export const schleswigHolstein: StateInfo = {
  fullName: "Schleswig-Holstein",
  shortName: "SH",
  capital: "Kiel",
  description: "Schleswig-Holstein, das Land zwischen den Meeren, verbindet maritimes Flair mit nordischer Lebensart. Von den Nordfriesischen Inseln über das UNESCO-Weltnaturerbe Wattenmeer bis zur Ostseeküste und der Holsteinischen Schweiz bietet das nördlichste Bundesland eine einzigartige Vielfalt.",
  culturalHighlights: [
    "UNESCO-Weltnaturerbe Wattenmeer",
    "UNESCO-Weltkulturerbe Lübeck",
    "Kieler Woche",
    "Wikingererbe",
    "Hansestädte",
    "Maritime Kultur"
  ],
  keyFacts: {
    population: "2,9 Millionen (2021)",
    area: "15.804 km²",
    founded: "1946",
    economicStrength: [
      "Maritime Wirtschaft",
      "Tourismus",
      "Erneuerbare Energien",
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
        description: `${holiday.name} ist in Schleswig-Holstein ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["SH"] || []).map(holiday => ({
      ...holiday,
      type: "public" as const,
      isRegional: true,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Schleswig-Holstein ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: holidays.schoolHolidays["2025"]["SH"].map(holiday => {
    const familyActivities: Record<string, { description: string, activities: string[] }> = {
      "Winterferien": {
        description: "Winterferien zwischen Küste und Seen - Maritime Entdeckungen",
        activities: [
          "Winterwanderungen am Strand",
          "Museumsbesuche",
          "Indoor-Wasserwelten",
          "Wellness"
        ]
      },
      "Osterferien": {
        description: "Osterferien an der Küste - Frühlingserwachen am Meer",
        activities: [
          "Strandwanderungen",
          "Wattwanderungen",
          "Inselausflüge",
          "Maritime Museen"
        ]
      },
      "Pfingstferien": {
        description: "Pfingstferien am Meer - Aktiv zwischen den Küsten",
        activities: [
          "Segeln lernen",
          "Strandaktivitäten",
          "Radtouren",
          "Wassersport"
        ]
      },
      "Sommerferien": {
        description: "Sommerferien im Küstenparadies - Sechs Wochen Meer",
        activities: [
          "Strandleben",
          "Wassersport",
          "Inselhopping",
          "Naturerkundung"
        ]
      },
      "Herbstferien": {
        description: "Herbstferien an der See - Herbstliche Küstenromantik",
        activities: [
          "Drachensteigen",
          "Bernsteinsuche",
          "Wattwanderungen",
          "Wellness"
        ]
      },
      "Weihnachtsferien": {
        description: "Weihnachtsferien im Norden - Maritime Winterstimmung",
        activities: [
          "Weihnachtsmärkte besuchen",
          "Winterstrandwanderungen",
          "Wellness",
          "Kulturgenuss"
        ]
      }
    };

    const holidayName = holiday.name.split(" ")[0] as keyof typeof familyActivities;
    const holidayInfo = familyActivities[holidayName] || {
      description: `${holiday.name} in Schleswig-Holstein`,
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
  uniqueHolidayInfo: "Schleswig-Holstein verbindet maritime Festkultur mit nordischen Traditionen. Die Vielfalt der Regionen von der Nordsee über die Ostsee bis zur Holsteinischen Schweiz spiegelt sich in den Feierlichkeiten wider.",
  traditionInfo: "Die Traditionen Schleswig-Holsteins sind geprägt von maritimer Geschichte, hanseatischem Erbe und nordischer Kultur. Hafenfeste, Segelsport und Küstenbrauchtum prägen das kulturelle Leben.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Maritimes Erbe",
      icon: "anchor",
      items: [
        {
          title: "Küstenkultur",
          description: "Zwischen Nord- und Ostsee",
          icon: "water"
        },
        {
          title: "Hanseerbe",
          description: "Historische Hafenstädte",
          icon: "ship"
        }
      ]
    },
    {
      title: "Natur & Kultur",
      icon: "leaf",
      items: [
        {
          title: "Wattenmeer",
          description: "UNESCO-Weltnaturerbe",
          icon: "wave"
        },
        {
          title: "Seenland",
          description: "Holsteinische Schweiz",
          icon: "lake"
        }
      ]
    }
  ]
}; 