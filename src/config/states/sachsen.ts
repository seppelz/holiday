import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Das neue Jahr wird mit sächsischen Traditionen und barockem Glanz begrüßt.",
    traditions: ["Feuerwerk über der Elbe", "Neujahrskonzerte", "Bergparaden"],
    locations: ["Dresden", "Leipzig", "Chemnitz"]
  },
  "Karfreitag": {
    description: "Die Karfreitagstraditionen verbinden Bachsche Passionsmusik mit erzgebirgischer Frömmigkeit.",
    traditions: ["Bach-Passionen", "Kreuzwege", "Bergmannsandachten"],
    locations: ["Thomaskirche Leipzig", "Kreuzkirche Dresden", "Dom zu Freiberg"]
  },
  "Ostermontag": {
    description: "Ostertraditionen von sorbischen Osterfesten bis zu erzgebirgischen Bergmannsbräuchen.",
    traditions: ["Sorbische Osterreiter", "Osterfeuer", "Bergmannsosterfeste"],
    locations: ["Lausitz", "Erzgebirge", "Vogtland"]
  },
  "Tag der Arbeit": {
    description: "Der Maifeiertag wird besonders in den Industrieregionen mit Bezug zur Tradition gefeiert.",
    traditions: ["Maikundgebungen", "Bergmannsfeste", "Handwerkerfeste"],
    locations: ["Chemnitz", "Zwickau", "Plauen"]
  },
  "Christi Himmelfahrt": {
    description: "Vatertag wird mit Wanderungen durch die sächsische Schweiz und das Erzgebirge gefeiert.",
    traditions: ["Wanderungen", "Himmelfahrtsgottesdienste", "Familienausflüge"],
    locations: ["Sächsische Schweiz", "Erzgebirge", "Zittauer Gebirge"]
  },
  "Pfingstmontag": {
    description: "Pfingsttraditionen von sorbischen Pfingstfesten bis zu barocken Kirchenfeiern.",
    traditions: ["Sorbische Feste", "Pfingstkonzerte", "Bergmannsfeste"],
    locations: ["Dresden", "Bautzen", "Annaberg-Buchholz"]
  },
  "Reformationstag": {
    description: "Der Reformationstag wird als wichtiger protestantischer Feiertag mit historischer Bedeutung begangen.",
    traditions: ["Reformationsgottesdienste", "Lutherfeste", "Kirchenmusik"],
    culturalSignificance: "Zentrum der Reformation mit besonderer historischer Bedeutung",
    locations: ["Leipzig", "Dresden", "Torgau"]
  },
  "Buß- und Bettag": {
    description: "Der Buß- und Bettag wird als einziges Bundesland als gesetzlicher Feiertag begangen.",
    traditions: ["Gottesdienste", "Konzerte", "Besinnungstage"],
    culturalSignificance: "Einziges Bundesland mit diesem gesetzlichen Feiertag",
    locations: ["Dresden", "Leipzig", "Chemnitz"]
  },
  "Tag der Deutschen Einheit": {
    description: "Sachsen feiert die Deutsche Einheit mit Fokus auf die Friedliche Revolution.",
    traditions: ["Friedensgebete", "Lichtfeste", "Konzerte"],
    culturalSignificance: "Besondere Bedeutung durch die Rolle bei der Friedlichen Revolution",
    locations: ["Leipzig", "Dresden", "Plauen"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag verbindet erzgebirgische Traditionen mit barocker Kirchenmusik.",
    traditions: ["Christvespern", "Bergparaden", "Weihnachtskonzerte"],
    locations: ["Dresdner Kreuzchor", "Thomaskirche Leipzig", "Dom zu Freiberg"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtstag locken erzgebirgische Traditionen und winterliche Aktivitäten.",
    traditions: ["Bergparaden", "Mettenschichten", "Winterwanderungen"],
    locations: ["Erzgebirge", "Sächsische Schweiz", "Vogtland"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühjahr",
    description: "Leipziger Buchmesse, Dresdner Musikfestspiele und erste Bergparaden im Erzgebirge."
  },
  {
    season: "Sommer",
    description: "Elbhangfest in Dresden, Bach-Fest Leipzig und Bergbautraditionen prägen den Sommer."
  },
  {
    season: "Herbst",
    description: "Filmfest Dresden, Leipziger Jazztage und traditionelle Bergparaden bestimmen die Jahreszeit."
  },
  {
    season: "Winter",
    description: "Berühmte Weihnachtsmärkte, erzgebirgische Traditionen und Wintersport im Erzgebirge."
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "Dresden & Elbtal",
    description: "Barockstadt und UNESCO-Weltkulturerbe",
    attractions: [
      "Frauenkirche",
      "Zwinger",
      "Semperoper",
      "Brühlsche Terrasse"
    ],
    activities: [
      "Kulturgenuss",
      "Elbschifffahrt",
      "Museumsbesuche",
      "Stadtführungen"
    ]
  },
  {
    name: "Sächsische Schweiz",
    description: "Einzigartiges Felsengebirge und Naturparadies",
    attractions: [
      "Bastei",
      "Festung Königstein",
      "Malerweg",
      "Nationalpark"
    ],
    activities: [
      "Wandern",
      "Klettern",
      "Naturerkundung",
      "Fototouren"
    ]
  },
  {
    name: "Erzgebirge",
    description: "UNESCO-Weltkulturerbe Montanregion",
    attractions: [
      "Bergbaumuseen",
      "Weihnachtsmärkte",
      "Fichtelberg",
      "Bergstädte"
    ],
    activities: [
      "Wintersport",
      "Bergbautraditionen",
      "Handwerkskunst",
      "Wandern"
    ]
  }
];

export const sachsen: StateInfo = {
  fullName: "Sachsen",
  shortName: "SN",
  capital: "Dresden",
  description: "Sachsen vereint barocke Pracht mit lebendiger Kulturszene und innovativer Wirtschaft. Von der Barockstadt Dresden über die Musikstadt Leipzig bis zum UNESCO-Welterbe Erzgebirge bietet das Land eine einzigartige Mischung aus Tradition und Moderne.",
  culturalHighlights: [
    "UNESCO-Welterbe Dresdner Altstadt",
    "Leipziger Musikerbe",
    "UNESCO-Welterbe Montanregion Erzgebirge",
    "Sächsische Schweiz",
    "Barockarchitektur",
    "Kunstsammlungen"
  ],
  keyFacts: {
    population: "4,0 Millionen (2021)",
    area: "18.450 km²",
    founded: "1990",
    economicStrength: [
      "Hochtechnologie",
      "Automobilindustrie",
      "Kultur und Tourismus",
      "Mikroelektronik"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      type: "public" as const,
      isRegional: false,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Sachsen ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["SN"] || []).map(holiday => ({
      ...holiday,
      type: "public" as const,
      isRegional: true,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Sachsen ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: holidays.schoolHolidays["2025"]["SN"].map(holiday => {
    const familyActivities: Record<string, { description: string, activities: string[] }> = {
      "Winterferien": {
        description: "Winterferien zwischen Kultur und Sport - Vielfältiges Vergnügen",
        activities: [
          "Skifahren im Erzgebirge",
          "Museumsbesuche",
          "Bergbautraditionen",
          "Indoor-Aktivitäten"
        ]
      },
      "Osterferien": {
        description: "Osterferien im Kulturland - Zwischen Tradition und Moderne",
        activities: [
          "Ostermärkte besuchen",
          "Frühlingsradtouren",
          "Kulturerbe erkunden",
          "Naturerlebnisse"
        ]
      },
      "Pfingstferien": {
        description: "Pfingstferien in der Kulturregion - Aktiv zwischen Stadt und Natur",
        activities: [
          "Stadtführungen",
          "Wandern in der Sächsischen Schweiz",
          "Museumsbesuche",
          "Kletterparks"
        ]
      },
      "Sommerferien": {
        description: "Sommerferien im Kulturparadies - Sechs Wochen Entdeckungen",
        activities: [
          "Elbschifffahrt",
          "Wanderungen",
          "Freibäder besuchen",
          "Kulturveranstaltungen"
        ]
      },
      "Herbstferien": {
        description: "Herbstferien in bunter Vielfalt - Kultur und Natur",
        activities: [
          "Herbstwanderungen",
          "Museumsbesuche",
          "Bergbautraditionen",
          "Indoor-Aktivitäten"
        ]
      },
      "Weihnachtsferien": {
        description: "Weihnachtsferien im Lichterglanz - Festliche Zeit in Sachsen",
        activities: [
          "Weihnachtsmärkte besuchen",
          "Wintersport im Erzgebirge",
          "Bergparaden erleben",
          "Kulturgenuss"
        ]
      }
    };

    const baseHolidayName = holiday.name.split(" ")[0];
    const holidayName = baseHolidayName.charAt(0).toUpperCase() + baseHolidayName.slice(1);
    const holidayInfo = familyActivities[holidayName] || {
      description: `${holiday.name} in Sachsen`,
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
  uniqueHolidayInfo: "Sachsen verbindet barocke Festkultur mit erzgebirgischen Traditionen. Die Vielfalt der Regionen von Dresden über Leipzig bis zum Erzgebirge spiegelt sich in den Feierlichkeiten wider.",
  traditionInfo: "Die Traditionen Sachsens sind geprägt von barocker Kultur, Musikgeschichte und Bergbautradition. Klassische Musik, erzgebirgisches Brauchtum und lebendige Stadtkultur prägen das kulturelle Leben.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Kulturerbe",
      icon: "landmark",
      items: [
        {
          title: "Barockkultur",
          description: "Weltberühmte Architektur und Kunstschätze",
          icon: "building"
        },
        {
          title: "Musikstadt",
          description: "Bach, Gewandhaus und lebendige Szene",
          icon: "music"
        }
      ]
    },
    {
      title: "Tradition & Innovation",
      icon: "cogs",
      items: [
        {
          title: "Bergbautradition",
          description: "UNESCO-Welterbe Montanregion",
          icon: "mountain"
        },
        {
          title: "Silicon Saxony",
          description: "Moderne Hochtechnologie",
          icon: "microchip"
        }
      ]
    }
  ]
}; 