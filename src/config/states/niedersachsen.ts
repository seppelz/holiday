import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Von der Nordseeküste bis zum Harz wird das neue Jahr mit regionaltypischen Bräuchen begrüßt.",
    traditions: ["Neujahrsschwimmen in der Nordsee", "Bergfeuer im Harz", "Rathausempfänge"],
    locations: ["Cuxhaven", "Goslar", "Hannover"]
  },
  "Karfreitag": {
    description: "Die niedersächsischen Karfreitagstraditionen verbinden Küstenrituale mit Harzer Bergbautraditionen.",
    traditions: ["Fischertradition", "Bergmannsandachten", "Passionskonzerte"],
    locations: ["Ostfriesland", "Clausthal-Zellerfeld", "Lüneburg"]
  },
  "Ostermontag": {
    description: "Ostertraditionen von den Osterfeuern an der Küste bis zu den Bergosterfeuern im Harz.",
    traditions: ["Osterfeuer", "Ostereiersuche in den Dünen", "Bergosterfeuer"],
    locations: ["Ostfriesische Inseln", "Lüneburger Heide", "Harz"]
  },
  "Tag der Arbeit": {
    description: "Der Maifeiertag verbindet Hafenfeste mit traditionellen Maibräuchen im Binnenland.",
    traditions: ["Hafenfeste", "Maibaumaufstellen", "Wanderungen"],
    locations: ["Wilhelmshaven", "Oldenburg", "Göttingen"]
  },
  "Christi Himmelfahrt": {
    description: "Vatertag wird mit Wattwanderungen an der Küste und Wanderungen im Harz gefeiert.",
    traditions: ["Wattwanderungen", "Harzwanderungen", "Vatertagstouren"],
    locations: ["Wattenmeer", "Braunlage", "Weserbergland"]
  },
  "Pfingstmontag": {
    description: "Pfingsttraditionen von maritimen Festen bis zu Bergfesten im Harz.",
    traditions: ["Küstenfeste", "Bergfeste", "Pfingstmärkte"],
    locations: ["Emden", "Sankt Andreasberg", "Hameln"]
  },
  "Tag der Deutschen Einheit": {
    description: "Der Tag wird besonders im ehemaligen Grenzgebiet mit Fokus auf die Wiedervereinigung gefeiert.",
    traditions: ["Grenzwanderungen", "Festakte", "Konzerte"],
    culturalSignificance: "Besondere Bedeutung durch die ehemalige innerdeutsche Grenze",
    locations: ["Helmstedt", "Braunschweig", "Hannover"]
  },
  "Reformationstag": {
    description: "Der Reformationstag wird mit besonderem Bezug zu den historischen Hansestädten begangen.",
    traditions: ["Reformationsgottesdienste", "Historische Führungen", "Konzerte"],
    culturalSignificance: "Wichtiger protestantischer Feiertag mit historischer Bedeutung",
    locations: ["Lüneburg", "Goslar", "Hildesheim"]
  },
  "1. Weihnachtstag": {
    description: "Weihnachten verbindet maritime Traditionen der Küste mit Bergmannsweihnacht im Harz.",
    traditions: ["Maritime Weihnacht", "Bergmannsweihnacht", "Weihnachtsgottesdienste"],
    locations: ["Nordseeküste", "Goslar", "Lüneburg"]
  },
  "2. Weihnachtstag": {
    description: "Der zweite Weihnachtstag lädt zu winterlichen Aktivitäten von der Küste bis zum verschneiten Harz.",
    traditions: ["Winterwanderungen", "Winterspaziergang am Strand", "Skifahren im Harz"],
    locations: ["Norderney", "Lüneburger Heide", "Wurmberg"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühjahr",
    description: "Krokusse in der Lüneburger Heide, erste Wattwanderungen und Frühlingserwachen im Harz."
  },
  {
    season: "Sommer",
    description: "Wattenmeerfestival, Heideblüte und Bergfeste im Harz prägen den Sommer."
  },
  {
    season: "Herbst",
    description: "Erntefeste in der Heide, Zugvogelbeobachtung im Wattenmeer und Indian Summer im Harz."
  },
  {
    season: "Winter",
    description: "Wintervergnügen von Winterwanderungen im Watt bis zum Skifahren im Harz."
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "Nordseeküste & Inseln",
    description: "UNESCO-Weltnaturerbe Wattenmeer und Ostfriesische Inseln",
    attractions: [
      "Nationalpark Wattenmeer",
      "Ostfriesische Inseln",
      "Cuxhaven Strand",
      "Seehundsbänke"
    ],
    activities: [
      "Wattwanderungen",
      "Inselhopping",
      "Seehundbeobachtung",
      "Wellness am Meer"
    ]
  },
  {
    name: "Harz & Weserbergland",
    description: "Höchstes Mittelgebirge Norddeutschlands mit reicher Bergbautradition",
    attractions: [
      "Brocken",
      "Goslar Altstadt",
      "Harzer Schmalspurbahn",
      "Weserbergland"
    ],
    activities: [
      "Wandern",
      "Skifahren",
      "Bergbaumuseen erkunden",
      "Märchenwege entdecken"
    ]
  },
  {
    name: "Lüneburger Heide",
    description: "Einzigartige Heidelandschaft mit historischen Heidedörfern",
    attractions: [
      "Heideblüte",
      "Wilseder Berg",
      "Lüneburger Altstadt",
      "Heide-Erlebniszentrum"
    ],
    activities: [
      "Kutschfahrten",
      "Radwandern",
      "Heidschnucken beobachten",
      "Naturerkundungen"
    ]
  }
];

export const niedersachsen: StateInfo = {
  fullName: "Niedersachsen",
  shortName: "NI",
  capital: "Hannover",
  description: "Niedersachsen vereint Küste, Heide und Berge zu einer einzigartigen Kulturlandschaft. Von den Ostfriesischen Inseln über die Lüneburger Heide bis zum Harz bietet das Land vielfältige Urlaubserlebnisse.",
  culturalHighlights: [
    "UNESCO-Weltnaturerbe Wattenmeer",
    "UNESCO-Weltkulturerbe Goslar",
    "Historische Hansestädte",
    "Lüneburger Heide",
    "Harzer Bergbautradition",
    "Ostfriesische Teekultur"
  ],
  keyFacts: {
    population: "8,0 Millionen (2021)",
    area: "47.614 km²",
    founded: "1946",
    economicStrength: [
      "Automobilindustrie",
      "Maritime Wirtschaft",
      "Landwirtschaft",
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
        description: `${holiday.name} ist in Niedersachsen ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["NI"] || []).map(holiday => ({
      ...holiday,
      type: "public" as const,
      isRegional: true,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Niedersachsen ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: holidays.schoolHolidays["2025"]["NI"].map(holiday => {
    const familyActivities: Record<string, { description: string, activities: string[] }> = {
      "Winterferien": {
        description: "Winterferien zwischen Küste und Harz - Vielfältiges Wintervergnügen",
        activities: [
          "Skifahren im Harz",
          "Winterwandern im Watt",
          "Robbenbabys beobachten",
          "Winterwellness an der Küste"
        ]
      },
      "Osterferien": {
        description: "Osterferien im Frühlingsland - Von der Küste bis zum Harz",
        activities: [
          "Osterfeuer erleben",
          "Frühlingsradtouren",
          "Lamm-Safari in der Heide",
          "Bergwerksmuseen erkunden"
        ]
      },
      "Pfingstferien": {
        description: "Pfingstferien in der Naturvielfalt - Aktiv zwischen Meer und Bergen",
        activities: [
          "Wattwanderungen",
          "Harzer Wandernadel sammeln",
          "Kutschfahrten in der Heide",
          "Kletterparks erkunden"
        ]
      },
      "Sommerferien": {
        description: "Sommerferien im Urlaubsparadies - Sechs Wochen Naturerlebnis",
        activities: [
          "Inselhopping",
          "Sommerrodelbahn im Harz",
          "Heideblüte erleben",
          "Freizeitparks besuchen"
        ]
      },
      "Herbstferien": {
        description: "Herbstferien in bunter Vielfalt - Zugvögel und Herbstfarben",
        activities: [
          "Zugvögel beobachten",
          "Indian Summer im Harz",
          "Drachensteigen am Strand",
          "Herbstwanderungen"
        ]
      },
      "Weihnachtsferien": {
        description: "Weihnachtsferien im Winterland - Festliche Zeit an Küste und Bergen",
        activities: [
          "Weihnachtsmärkte besuchen",
          "Winterwandern im Harz",
          "Silvester am Strand",
          "Schlittschuhlaufen"
        ]
      }
    };

    const holidayName = holiday.name.split(" ")[0] as keyof typeof familyActivities;
    const holidayInfo = familyActivities[holidayName] || {
      description: `${holiday.name} in Niedersachsen`,
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
  uniqueHolidayInfo: "Niedersachsen verbindet maritime Festkultur der Küste mit Bergbautraditionen des Harzes. Die Vielfalt der Landschaften spiegelt sich in den Feierlichkeiten wider.",
  traditionInfo: "Die Traditionen Niedersachsens sind geprägt von der Vielfalt seiner Landschaften: Maritime Bräuche der Küste, Heidetraditionen und Bergbaukultur des Harzes prägen das kulturelle Leben.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Küstenkultur",
      icon: "water",
      items: [
        {
          title: "Wattenmeer",
          description: "UNESCO-Weltnaturerbe mit einzigartiger Tierwelt",
          icon: "fish"
        },
        {
          title: "Inselleben",
          description: "Traditionelle Seebäder und maritime Kultur",
          icon: "umbrella-beach"
        }
      ]
    },
    {
      title: "Landschaftsvielfalt",
      icon: "mountain",
      items: [
        {
          title: "Harz",
          description: "Bergbautradition und Winterparadies",
          icon: "skiing"
        },
        {
          title: "Heide",
          description: "Historische Kulturlandschaft mit Heidschnucken",
          icon: "flower"
        }
      ]
    }
  ]
}; 