import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Das neue Jahr wird in den Weinregionen und am romantischen Rhein mit traditionellen Festen begrüßt.",
    traditions: ["Feuerwerk über dem Rhein", "Neujahrsweinproben", "Neujahrskonzerte"],
    locations: ["Mainz", "Koblenz", "Trier"]
  },
  "Karfreitag": {
    description: "Die Karfreitagstraditionen verbinden römische Geschichte mit christlichen Bräuchen.",
    traditions: ["Kreuzwege", "Passionskonzerte", "Prozessionen"],
    locations: ["Trierer Dom", "Mainzer Dom", "Speyerer Dom"]
  },
  "Ostermontag": {
    description: "Ostertraditionen von Weinbergswanderungen bis zu römischen Osterfesten.",
    traditions: ["Ostereiersuche in Weinbergen", "Osterfeuer", "Ostermärkte"],
    locations: ["Moseltal", "Rheingau", "Pfalz"]
  },
  "Tag der Arbeit": {
    description: "Der Maifeiertag verbindet Weinfeste mit traditionellen Maibräuchen.",
    traditions: ["Maifeste", "Weinwanderungen", "Maibaum aufstellen"],
    locations: ["Rheinhessen", "Ahr", "Westerwald"]
  },
  "Christi Himmelfahrt": {
    description: "Vatertag wird mit Wanderungen durch die Weinberge und entlang des Rheins gefeiert.",
    traditions: ["Vatertagswanderungen", "Weinfeste", "Schifffahrten"],
    locations: ["Mittelrhein", "Nahe", "Hunsrück"]
  },
  "Pfingstmontag": {
    description: "Pfingsttraditionen von Weinfesten bis zu mittelalterlichen Burgfesten.",
    traditions: ["Burgenfeste", "Pfingstmärkte", "Weinproben"],
    locations: ["Rheinburgen", "Trifels", "Hambach"]
  },
  "Fronleichnam": {
    description: "Das Fronleichnamsfest wird mit prächtigen Prozessionen in den historischen Städten gefeiert.",
    traditions: ["Prozessionen", "Blumenteppiche", "Kirchenfeste"],
    culturalSignificance: "Wichtiger katholischer Feiertag in den Weinregionen",
    locations: ["Mainz", "Trier", "Speyer"]
  },
  "Tag der Deutschen Einheit": {
    description: "Rheinland-Pfalz feiert die Deutsche Einheit mit Fokus auf europäische Integration.",
    traditions: ["Bürgerfeste", "Konzerte", "Weinpräsentationen"],
    culturalSignificance: "Symbol für europäische Verbundenheit",
    locations: ["Mainz", "Koblenz", "Ludwigshafen"]
  },
  "Allerheiligen": {
    description: "Allerheiligen wird besonders in den katholischen Weinregionen als wichtiger Gedenktag begangen.",
    traditions: ["Gräberbesuche", "Gedenkgottesdienste", "Lichtermeere"],
    culturalSignificance: "Bedeutender katholischer Feiertag",
    locations: ["Mosel", "Rheinhessen", "Pfalz"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag verbindet römische Geschichte mit rheinischer Festlichkeit.",
    traditions: ["Weihnachtsgottesdienste", "Krippenspiele", "Konzerte"],
    locations: ["Trierer Dom", "Mainzer Dom", "Wormser Dom"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtstag locken Winterwanderungen in den Weinbergen und festliche Konzerte.",
    traditions: ["Winterwanderungen", "Weihnachtskonzerte", "Glühweinproben"],
    locations: ["Mittelrhein", "Pfalz", "Nahe"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühjahr",
    description: "Mandelblüte in der Pfalz, erste Weinfeste und römische Frühlingsfeste prägen die Jahreszeit."
  },
  {
    season: "Sommer",
    description: "Zahlreiche Weinfeste, Burgenfestspiele und Rhein in Flammen sind die Höhepunkte des Sommers."
  },
  {
    season: "Herbst",
    description: "Weinlese, traditionelle Weinfeste und römische Herbstfeste bestimmen die Jahreszeit."
  },
  {
    season: "Winter",
    description: "Historische Weihnachtsmärkte, Glühweinwanderungen und Winterweinfeste prägen die kalte Jahreszeit."
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "UNESCO-Welterbe Oberes Mittelrheintal",
    description: "Romantische Burgen und Weinberge im Rheintal",
    attractions: [
      "Loreley-Felsen",
      "Marksburg",
      "Rheinsteig",
      "Historische Weingüter"
    ],
    activities: [
      "Burgenbesichtigungen",
      "Rheinschifffahrten",
      "Weinproben",
      "Wandern"
    ]
  },
  {
    name: "Mosel-Saar-Ruwer",
    description: "Steile Weinberge und römische Geschichte",
    attractions: [
      "Porta Nigra",
      "Moselschleife",
      "Römische Bauwerke",
      "Weingüter"
    ],
    activities: [
      "Weinwanderungen",
      "Römische Geschichte erleben",
      "Radfahren",
      "Weinverkostungen"
    ]
  },
  {
    name: "Deutsche Weinstraße & Pfälzerwald",
    description: "Weinparadies und größtes zusammenhängendes Waldgebiet",
    attractions: [
      "Hambacher Schloss",
      "Deutsche Weintor",
      "Trifels",
      "Naturpark Pfälzerwald"
    ],
    activities: [
      "Wandern im Pfälzerwald",
      "Weinfeste besuchen",
      "Burgen erkunden",
      "Naturerlebnisse"
    ]
  }
];

export const rheinlandPfalz: StateInfo = {
  fullName: "Rheinland-Pfalz",
  shortName: "RP",
  capital: "Mainz",
  description: "Rheinland-Pfalz vereint Weinkultur, romantische Landschaften und römische Geschichte. Von den UNESCO-Welterbestätten am Rhein über die Weinregionen bis zum Pfälzerwald bietet das Land einzigartige Kultur- und Naturerlebnisse.",
  culturalHighlights: [
    "UNESCO-Welterbe Oberes Mittelrheintal",
    "UNESCO-Welterbe Römerbauten Trier",
    "Deutsche Weinstraße",
    "Römische Geschichte",
    "Burgen und Schlösser",
    "Weinkultur"
  ],
  keyFacts: {
    population: "4,1 Millionen (2021)",
    area: "19.854 km²",
    founded: "1946",
    economicStrength: [
      "Weinbau",
      "Tourismus",
      "Chemische Industrie",
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
        description: `${holiday.name} ist in Rheinland-Pfalz ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["RP"] || []).map(holiday => ({
      ...holiday,
      type: "public" as const,
      isRegional: true,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Rheinland-Pfalz ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: holidays.schoolHolidays["2025"]["RP"].map(holiday => {
    const familyActivities: Record<string, { description: string, activities: string[] }> = {
      "Winterferien": {
        description: "Winterferien im Weinland - Zwischen Geschichte und Genuss",
        activities: [
          "Winterwanderungen in Weinbergen",
          "Römische Museen erkunden",
          "Burgenbesichtigungen",
          "Indoor-Spielwelten"
        ]
      },
      "Osterferien": {
        description: "Osterferien im Frühling - Blütezeit an Rhein und Mosel",
        activities: [
          "Mandelblüte erleben",
          "Osterbräuche entdecken",
          "Frühlingsradtouren",
          "Schifffahrten"
        ]
      },
      "Pfingstferien": {
        description: "Pfingstferien in der Naturregion - Aktiv zwischen Wein und Wald",
        activities: [
          "Burgenfeste besuchen",
          "Wandern im Pfälzerwald",
          "Weinfeste erleben",
          "Kletterparks erkunden"
        ]
      },
      "Sommerferien": {
        description: "Sommerferien im Urlaubsparadies - Sechs Wochen Kultur und Natur",
        activities: [
          "Rhein in Flammen",
          "Burgenfestspiele",
          "Weinbergtouren",
          "Freibäder besuchen"
        ]
      },
      "Herbstferien": {
        description: "Herbstferien zur Weinlese - Farbenprächtige Weinberge",
        activities: [
          "Weinlese erleben",
          "Herbstwanderungen",
          "Weinfeste besuchen",
          "Burgentouren"
        ]
      },
      "Weihnachtsferien": {
        description: "Weihnachtsferien im Lichterglanz - Festliche Zeit am Rhein",
        activities: [
          "Weihnachtsmärkte besuchen",
          "Glühweinwanderungen",
          "Winterliche Burgentouren",
          "Römische Weihnacht"
        ]
      }
    };

    const holidayName = holiday.name.split(" ")[0] as keyof typeof familyActivities;
    const holidayInfo = familyActivities[holidayName] || {
      description: `${holiday.name} in Rheinland-Pfalz`,
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
  uniqueHolidayInfo: "Rheinland-Pfalz verbindet Weinfestkultur mit römischer Geschichte. Die Vielfalt der Regionen von Rhein über Mosel bis zur Pfalz spiegelt sich in den Feierlichkeiten wider.",
  traditionInfo: "Die Traditionen von Rheinland-Pfalz sind geprägt von Weinbau, römischer Geschichte und rheinischer Lebensart. Weinfeste, römische Feiern und mittelalterliche Burgenfeste prägen das kulturelle Leben.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Weinkultur",
      icon: "wine-glass",
      items: [
        {
          title: "Weinregionen",
          description: "Sechs einzigartige Anbaugebiete mit Tradition",
          icon: "grapes"
        },
        {
          title: "Weinfeste",
          description: "Lebendige Festkultur das ganze Jahr",
          icon: "glass-cheers"
        }
      ]
    },
    {
      title: "Kulturerbe",
      icon: "landmark",
      items: [
        {
          title: "Römerbauten",
          description: "UNESCO-Welterbe und lebendige Geschichte",
          icon: "monument"
        },
        {
          title: "Burgenland",
          description: "Romantische Burgen am Rhein und an der Mosel",
          icon: "castle"
        }
      ]
    }
  ]
}; 