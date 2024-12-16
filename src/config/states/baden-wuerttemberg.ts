import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Baden-Württemberg startet das Jahr mit einer einzigartigen Mischung aus alemannischen und schwäbischen Neujahrsbräuchen.",
    traditions: ["Neujahrsempfänge", "Fasnetsbeginn", "Glücksbringer-Bräuche"],
    locations: ["Stuttgart", "Freiburg", "Heidelberg"]
  },
  "Heilige Drei Könige": {
    description: "Das baden-württembergische Dreikönigsfest verbindet kirchliche Tradition mit lebendigen Sternsingerumzügen.",
    traditions: ["Sternsinger", "Dreikönigssingen", "Hausbesuche"],
    culturalSignificance: "Traditioneller Abschluss der Weihnachtszeit",
    locations: ["Freiburger Münster", "Rottenburger Dom", "Ulmer Münster"]
  },
  "Karfreitag": {
    description: "Der Karfreitag in Baden-Württemberg zeichnet sich durch besonders eindrucksvolle Passionsspiele und Kreuzwege aus.",
    traditions: ["Passionsspiele", "Kreuzwege", "Fastenbräuche"],
    locations: ["Ulmer Münster", "Freiburger Münster", "Kloster Maulbronn"]
  },
  "Ostermontag": {
    description: "Die baden-württembergischen Ostertraditionen vereinen den Ostereierlauf mit dem Schmücken historischer Osterbrunnen.",
    traditions: ["Ostereierlauf", "Osterbrunnen schmücken", "Osterfeuer"],
    locations: ["Schwarzwald", "Schwäbische Alb", "Bodensee"]
  },
  "Tag der Arbeit": {
    description: "Der baden-württembergische Maifeiertag verbindet traditionelles Maibaumstellen mit modernen Handwerkerfesten.",
    traditions: ["Maibaumstellen", "Handwerkerfeste", "Maikundgebungen"],
    locations: ["Stuttgart", "Mannheim", "Karlsruhe"]
  },
  "Christi Himmelfahrt": {
    description: "Die Himmelfahrtstraditionen in Baden-Württemberg reichen von Bergprozessionen bis zu Vatertagswanderungen im Schwarzwald.",
    traditions: ["Vatertagswanderungen", "Prozessionen", "Familienausflüge"],
    locations: ["Schwarzwald", "Hohenlohe", "Bodensee"]
  },
  "Pfingstmontag": {
    description: "Die baden-württembergischen Pfingstbräuche umfassen den berühmten Weingartener Blutritt und regionale Heimattage.",
    traditions: ["Pfingstritt", "Heimattage", "Pfingstmärkte"],
    locations: ["Weingarten", "Konstanz", "Rottweil"]
  },
  "Fronleichnam": {
    description: "Die Fronleichnamsfeiern in Baden-Württemberg beeindrucken mit kunstvollen Blumenteppichen und historischen Prozessionen.",
    traditions: ["Prozessionen", "Blumenteppiche", "Kirchenfeste"],
    culturalSignificance: "Wichtiger katholischer Feiertag in der Region",
    locations: ["Freiburg", "Rottenburg", "Konstanz"]
  },
  "Tag der Deutschen Einheit": {
    description: "Baden-Württemberg gestaltet den Tag der Deutschen Einheit mit einer Verbindung aus Tradition und Innovation.",
    traditions: ["Bürgerfeste", "Konzerte", "Ausstellungen"],
    culturalSignificance: "Symbol für die Verbundenheit mit ganz Deutschland",
    locations: ["Stuttgart", "Karlsruhe", "Mannheim"]
  },
  "Allerheiligen": {
    description: "Das baden-württembergische Allerheiligenfest vereint katholische Traditionen mit regionalen Gedenkbräuchen.",
    traditions: ["Gräberbesuche", "Gottesdienste", "Gedenkfeiern"],
    culturalSignificance: "Tag des Gedenkens und der Besinnung",
    locations: ["Rottweil", "Baden-Baden", "Heilbronn"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag in Baden-Württemberg verbindet schwäbische und badische Weihnachtstraditionen.",
    traditions: ["Christmetten", "Krippenspiele", "Familienessen"],
    locations: ["Rottweil", "Tübingen", "Heidelberg"]
  },
  "2. Weihnachtstag": {
    description: "Der baden-württembergische zweite Weihnachtsfeiertag ist geprägt von winterlichen Konzerten und Wandertraditionen.",
    traditions: ["Weihnachtskonzerte", "Verwandtenbesuche", "Winterwanderungen"],
    locations: ["Schwarzwald", "Schwäbische Alb", "Kraichgau"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühling",
    description: "Fasnet im Schwarzwald, Stuttgarter Frühlingsfest, Spargelsaison in der Kurpfalz"
  },
  {
    season: "Sommer",
    description: "Seenachtfest Konstanz, Stuttgarter Weindorf, Heidelberger Schlossbeleuchtung"
  },
  {
    season: "Herbst",
    description: "Cannstatter Wasen, Herbstmesse Baden-Baden, Weinlese am Kaiserstuhl"
  },
  {
    season: "Winter",
    description: "Weihnachtsmärkte in historischen Altstädten, Fasnetsbeginn, Schwarzwälder Wintertraditionen"
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "Schwarzwald",
    description: "Der größte deutsche Mittelgebirgsraum mit einzigartigen Naturerlebnissen",
    attractions: ["Triberg Wasserfälle", "Titisee", "Feldberg", "Schwarzwaldhochstraße"],
    activities: [
      "Wandern auf dem Westweg",
      "Skifahren im Winter",
      "Kuckucksuhren-Workshops",
      "Thermalbäder besuchen"
    ]
  },
  {
    name: "Bodensee",
    description: "Deutschlands größter See mit mediterranem Flair",
    attractions: ["Mainau", "Konstanz Altstadt", "Meersburg", "Reichenau"],
    activities: [
      "Schifffahrten",
      "Radfahren am Bodensee-Radweg",
      "Wassersport",
      "Weinproben"
    ]
  },
  {
    name: "Schwäbische Alb",
    description: "UNESCO Geopark mit beeindruckender Höhlenlandschaft",
    attractions: ["Lichtenstein Schloss", "Nebelhöhle", "Uracher Wasserfall"],
    activities: [
      "Höhlenwanderungen",
      "Klettern",
      "Fossilien suchen",
      "Burgen erkunden"
    ]
  }
];

export const badenWuerttemberg: StateInfo = {
  fullName: "Baden-Württemberg",
  shortName: "BW",
  capital: "Stuttgart",
  description: "Baden-Württemberg vereint die historischen Regionen Baden, Württemberg und Hohenzollern. Das Bundesland ist bekannt für seine innovative Wirtschaft, reiche Kultur und vielfältige Landschaft vom Schwarzwald bis zum Bodensee.",
  culturalHighlights: [
    "UNESCO-Welterbe Kloster Maulbronn",
    "Heidelberger Schloss",
    "Schwarzwald und Bodensee",
    "Schwäbische Alb",
    "Fasnet-Traditionen"
  ],
  keyFacts: {
    population: "11,1 Millionen",
    area: "35.751 km²",
    founded: "1952",
    economicStrength: [
      "Automobilindustrie",
      "Maschinenbau",
      "Informationstechnologie",
      "Biotechnologie",
      "Tourismus"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: false,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Baden-Württemberg ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["BW"] || []).map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: true,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Baden-Württemberg ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: holidays.schoolHolidays["2025"]["BW"].map(holiday => {
    const familyActivities: Record<string, { description: string, activities: string[] }> = {
      "Winterferien": {
        description: "Winterferien in Baden-Württemberg - Wintersport und Naturerlebnisse",
        activities: [
          "Skifahren und Rodeln im Schwarzwald",
          "Besuch der Therme Caracalla in Baden-Baden",
          "Winterwanderungen auf der Schwäbischen Alb",
          "Europa-Park Rust im Winterzauber"
        ]
      },
      "Osterferien": {
        description: "Osterferien in Baden-Württemberg - Frühlingserwachen und Osterbräuche",
        activities: [
          "Ostereiermärkte und Osterbrunnen im Schwarzwald",
          "Frühlingsblüte auf der Insel Mainau",
          "Osterprogramm im Freilichtmuseum Vogtsbauernhof",
          "Familienausflüge zu den Stuttgarter Zoos"
        ]
      },
      "Pfingstferien": {
        description: "Pfingstferien in Baden-Württemberg - Aktiv in der Natur",
        activities: [
          "Wandern auf dem Schwarzwald-Westweg",
          "Bodensee-Radweg mit der Familie",
          "Besuch der Höhlen der Schwäbischen Alb",
          "Schifffahrten auf dem Bodensee"
        ]
      },
      "Sommerferien": {
        description: "Sommerferien in Baden-Württemberg - Sechs Wochen voller Abenteuer",
        activities: [
          "Badespaß an den Bodensee-Stränden",
          "Kletterparks im Schwarzwald",
          "Besuch der Ravensburger Spieleland",
          "Erlebnispfade auf der Schwäbischen Alb"
        ]
      },
      "Herbstferien": {
        description: "Herbstferien in Baden-Württemberg - Bunte Naturerlebnisse",
        activities: [
          "Wandern durch herbstliche Weinberge",
          "Besuch der Kürbisausstellung in Ludwigsburg",
          "Kastaniensammeln im Schwarzwald",
          "Herbstliche Stadtführungen in historischen Städten"
        ]
      },
      "Weihnachtsferien": {
        description: "Weihnachtsferien in Baden-Württemberg - Festliche Stimmung und Winterzauber",
        activities: [
          "Besuch der historischen Weihnachtsmärkte",
          "Schneeschuhwandern im Schwarzwald",
          "Schlittschuhlaufen in den Eiswelten",
          "Weihnachtliche Schlossführungen"
        ]
      }
    };

    const baseHolidayName = holiday.name.split(" ")[0];
    const holidayName = baseHolidayName.charAt(0).toUpperCase() + baseHolidayName.slice(1);
    const holidayInfo = familyActivities[holidayName] || {
      description: `${holiday.name} in Baden-Württemberg`,
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
  uniqueHolidayInfo: "Baden-Württemberg verbindet bei seinen Feiertagen alemannische und schwäbische Traditionen mit katholischem und evangelischem Brauchtum.",
  traditionInfo: "Die Feiertage in Baden-Württemberg sind geprägt von der reichen kulturellen Vielfalt des Landes, von der Fasnet bis zu den Weinfesten.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Traditionelle Feste",
      icon: "mask",
      items: [
        {
          title: "Schwäbisch-Alemannische Fasnet",
          description: "Eines der ältesten Winterfeste mit einzigartigen Masken und Bräuchen",
          icon: "carnival"
        },
        {
          title: "Cannstatter Wasen",
          description: "Das zweitgrößte Volksfest Deutschlands mit schwäbischer Festtradition",
          icon: "ferrisWheel"
        }
      ]
    },
    {
      title: "Kulturelles Erbe",
      icon: "landmark",
      items: [
        {
          title: "UNESCO-Welterbestätten",
          description: "Von Kloster Maulbronn bis zur Höhlen der Schwäbischen Alb",
          icon: "monument"
        },
        {
          title: "Historische Altstädte",
          description: "Mittelalterliche Städte wie Tübingen, Heidelberg und Konstanz",
          icon: "castle"
        }
      ]
    }
  ]
}; 