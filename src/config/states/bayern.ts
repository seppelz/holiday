import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Bayern begrüßt das neue Jahr mit traditionellen Bräuchen wie dem Neujahrsanblasen und den mystischen Rauhnächten.",
    traditions: ["Neujahrsanblasen", "Rauhnächte", "Neujahrskonzerte"],
    locations: ["München", "Nürnberg", "Augsburg"]
  },
  "Heilige Drei Könige": {
    description: "Das Dreikönigsfest wird in Bayern besonders feierlich mit Sternsingern und traditionellen Hausbesuchen begangen.",
    traditions: ["Sternsinger", "Hausbesuche", "Weihrauchsegnungen"],
    culturalSignificance: "Traditioneller Abschluss der Weihnachtszeit",
    locations: ["Münchner Dom", "Würzburger Dom", "Regensburger Dom"]
  },
  "Karfreitag": {
    description: "Bayern begeht den Karfreitag mit eindrucksvollen Passionsspielen und stillen Prozessionen in historischen Städten.",
    traditions: ["Passionsspiele", "Kreuzwege", "Fastenbräuche"],
    locations: ["Oberammergau", "Altötting", "Bamberg"]
  },
  "Ostermontag": {
    description: "Die bayerischen Osterbräuche vereinen religiöse Traditionen mit volkstümlichen Festen wie dem Schmücken der Osterbrunnen.",
    traditions: ["Osterbrunnen", "Osterritte", "Speisenweihe"],
    locations: ["Fränkische Schweiz", "Chiemgau", "Allgäu"]
  },
  "Tag der Arbeit": {
    description: "Der bayerische Maifeiertag ist geprägt von traditionellem Maibaumaufstellen und regionalen Handwerkerfesten.",
    traditions: ["Maibaumaufstellen", "Tanz in den Mai", "Handwerkerfeste"],
    locations: ["Münchner Viktualienmarkt", "Würzburg", "Regensburg"]
  },
  "Christi Himmelfahrt": {
    description: "In Bayern verbindet man Christi Himmelfahrt mit beeindruckenden Bergmessen und traditionellen Vatertagsausflügen.",
    traditions: ["Prozessionen", "Vatertagsausflüge", "Bergmessen"],
    locations: ["Bayerische Alpen", "Bayerischer Wald", "Fichtelgebirge"]
  },
  "Pfingstmontag": {
    description: "Die bayerischen Pfingsttraditionen umfassen den berühmten Pfingstritt und historische Pfingstochsenumzüge.",
    traditions: ["Pfingstritt", "Pfingstochsenumzüge", "Pfingstkonzerte"],
    locations: ["Bad Kötzting", "Rothenburg ob der Tauber", "Landshut"]
  },
  "Fronleichnam": {
    description: "Die bayerischen Fronleichnamsprozessionen beeindrucken mit kunstvollen Blumenteppichen und festlichen Umzügen.",
    traditions: ["Prozessionen", "Blumenteppiche", "Kirchenfeste"],
    culturalSignificance: "Höhepunkt des katholischen Kirchenjahres",
    locations: ["Altötting", "Bamberg", "Würzburg"]
  },
  "Mariä Himmelfahrt": {
    description: "Das bayerische Marienfest zeichnet sich durch die traditionelle Kräuterweihe und prachtvolle Marienprozessionen aus.",
    traditions: ["Kräuterweihe", "Prozessionen", "Marienfeste"],
    culturalSignificance: "Wichtiger Marienfeiertag in katholischen Regionen",
    locations: ["Altötting", "Maria Gern", "Andechs"]
  },
  "Tag der Deutschen Einheit": {
    description: "Bayern feiert die deutsche Einheit mit einer einzigartigen Mischung aus Tradition und modernen Festveranstaltungen.",
    traditions: ["Bürgerfeste", "Konzerte", "Ausstellungen"],
    culturalSignificance: "Erinnerung an die Wiedervereinigung und bayerische Identität",
    locations: ["München", "Nürnberg", "Bayreuth"]
  },
  "Allerheiligen": {
    description: "Das bayerische Allerheiligenfest verbindet würdevolles Gedenken mit traditionellen Gräbersegnungen.",
    traditions: ["Gräberbesuche", "Gottesdienste", "Gräbersegnungen"],
    culturalSignificance: "Tag des Gedenkens und der Besinnung",
    locations: ["Münchner Waldfriedhof", "Nürnberger Johannisfriedhof", "Würzburger Hauptfriedhof"]
  },
  "1. Weihnachtstag": {
    description: "Der bayerische erste Weihnachtsfeiertag ist geprägt von festlichen Christmetten und traditionellen Krippenspielen.",
    traditions: ["Christmetten", "Krippenspiele", "Festessen"],
    locations: ["Münchner Frauenkirche", "Bamberger Dom", "Passauer Dom"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtsfeiertag pflegt Bayern besondere Traditionen wie den Stefaniritt und winterliche Bergwanderungen.",
    traditions: ["Stefaniritt", "Weihnachtskonzerte", "Bergwanderungen"],
    locations: ["Berchtesgadener Land", "Oberallgäu", "Bayerischer Wald"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühling",
    description: "Maibaumaufstellen, Frühjahrs-Volksfeste, Osterbrunnen in der Fränkischen Schweiz"
  },
  {
    season: "Sommer",
    description: "Bergfeste, Münchner Tollwood, Klassik Open Air in Nürnberg"
  },
  {
    season: "Herbst",
    description: "Oktoberfest, Kirchweihfeste, Almabtrieb im Allgäu"
  },
  {
    season: "Winter",
    description: "Christkindlesmärkte, Berchtesgadener Advent, Rauhnächte im Bayerischen Wald"
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "Schloss Neuschwanstein",
    description: "Das weltberühmte Märchenschloss König Ludwigs II. thront majestätisch über Hohenschwangau. Die romantische Architektur und die atemberaubende Alpenkulisse machen es zu einem der meistbesuchten Schlösser Europas.",
    attractions: [
      "Prunkvolle Schlossinnenräume",
      "Marienbrücke mit Panoramablick",
      "Historisches Museum",
      "Alpsee und Schwansee"
    ],
    activities: [
      "Schlossführungen",
      "Wanderungen in der Umgebung",
      "Kutschfahrten",
      "Fotografieren der Traumkulisse"
    ]
  },
  {
    name: "Berchtesgadener Land",
    description: "Diese einzigartige Alpenregion bietet mit dem Königssee, dem Watzmann und dem Kehlsteinhaus eine perfekte Mischung aus Natur, Geschichte und Freizeitmöglichkeiten.",
    attractions: [
      "Königssee mit St. Bartholomä",
      "Kehlsteinhaus (Eagle's Nest)",
      "Nationalpark Berchtesgaden",
      "Salzbergwerk Berchtesgaden"
    ],
    activities: [
      "Wandern und Bergsteigen",
      "Schifffahrten auf dem Königssee",
      "Besichtigung historischer Stätten",
      "Wintersport"
    ]
  },
  {
    name: "Rothenburg ob der Tauber",
    description: "Die besterhaltene mittelalterliche Stadt Deutschlands verzaubert mit ihrer vollständig erhaltenen Stadtmauer, malerischen Fachwerkhäusern und dem weltberühmten Weihnachtsdorf.",
    attractions: [
      "Mittelalterliche Altstadt",
      "Plönlein (meistfotografierter Punkt)",
      "Mittelalterliches Kriminalmuseum",
      "Käthe Wohlfahrt Weihnachtsdorf"
    ],
    activities: [
      "Stadtmauerrundgang",
      "Historische Nachtwächterführungen",
      "Mittelalterliche Festmahle",
      "Traditionelles Handwerk erleben"
    ]
  }
];

export const bayern: StateInfo = {
  fullName: "Bayern",
  shortName: "BY",
  capital: "München",
  description: "Bayern ist das flächengrößte deutsche Bundesland und vereint Tradition und Moderne. Von den Alpen bis zum Fichtelgebirge prägen unterschiedliche Landschaften und kulturelle Traditionen das Land.",
  culturalHighlights: [
    "Schloss Neuschwanstein",
    "Münchner Residenz",
    "Würzburger Residenz (UNESCO-Welterbe)",
    "Bamberger Altstadt",
    "Oktoberfest"
  ],
  keyFacts: {
    population: "13,1 Millionen",
    area: "70.542 km²",
    founded: "1806",
    economicStrength: [
      "Automobilindustrie",
      "Informationstechnologie",
      "Luft- und Raumfahrt",
      "Tourismus",
      "Landwirtschaft"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: false,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Bayern ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["BY"] || []).map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: true,
      date: holiday.start,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Bayern ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: holidays.schoolHolidays["2025"]["BY"].map(holiday => {
    const familyActivities = {
      "Winterferien": {
        description: "Winterferien in Bayern - perfekt für Skiurlaub und winterliche Aktivitäten",
        activities: [
          "Skifahren und Rodeln in den bayerischen Alpen",
          "Besuch der Winterwanderwege im Bayerischen Wald",
          "Familienausflüge zu den Schlössern mit Winterprogramm",
          "Indoor-Aktivitäten wie das Deutsche Museum München"
        ]
      },
      "Osterferien": {
        description: "Osterferien in Bayern - Zeit für Frühlingsaktivitäten und Osterbräuche",
        activities: [
          "Besuch der berühmten Osterbrunnen in der Fränkischen Schweiz",
          "Familienausflüge zu Tierparks und Wildgehegen",
          "Frühlingserwachen in den botanischen Gärten",
          "Osterprogramme in den Freilichtmuseen"
        ]
      },
      "Pfingstferien": {
        description: "Pfingstferien in Bayern - ideal für Outdoor-Aktivitäten",
        activities: [
          "Wanderungen zu Berghütten mit Familienrogramm",
          "Besuch der Pfingstfeste und traditionellen Umzüge",
          "Radtouren entlang der Flüsse",
          "Ausflüge zu Erlebnisbauernhöfen"
        ]
      },
      "Sommerferien": {
        description: "Sommerferien in Bayern - sechs Wochen voller Abenteuer und Erlebnisse",
        activities: [
          "Badespaß an den bayerischen Seen",
          "Familienfreundliche Bergbahnen und Sommerrodelbahnen",
          "Besuch der Sommervolksfeste und Mittelalter-Spektakel",
          "Entdeckungstouren in den Naturparks"
        ]
      },
      "Herbstferien": {
        description: "Herbstferien in Bayern - Zeit für bunte Naturerlebnisse",
        activities: [
          "Drachsteigen auf den Herbstwiesen",
          "Besuch der Kürbisfeste und Erntedankfeiern",
          "Wanderungen durch herbstliche Wälder",
          "Indoor-Kletterhallen und Erlebnismuseen"
        ]
      },
      "Weihnachtsferien": {
        description: "Weihnachtsferien in Bayern - festliche Stimmung und Winterzauber",
        activities: [
          "Besuch der traditionellen Christkindlmärkte",
          "Winterwanderungen zu verschneiten Berghütten",
          "Schlittschuhlaufen auf Natureis oder in Eishallen",
          "Weihnachtliche Konzerte und Krippenspiele"
        ]
      }
    };

    console.log('Raw holiday name:', holiday.name);
    const baseHolidayName = holiday.name.split(" ")[0];
    const holidayName = baseHolidayName.charAt(0).toUpperCase() + baseHolidayName.slice(1);
    console.log('Processed holiday name:', holidayName);
    console.log('Available holiday keys:', Object.keys(familyActivities));
    
    const holidayInfo = familyActivities[holidayName] || {
      description: `${holiday.name} in Bayern`,
      activities: []
    };
    console.log('Found holiday info:', holidayInfo);

    const mappedHoliday = {
      ...holiday,
      type: "school" as const,
      date: holiday.start,
      details: {
        description: holidayInfo.description,
        familyActivities: holidayInfo.activities
      }
    };
    console.log('Final mapped holiday:', mappedHoliday);
    
    return mappedHoliday;
  }),
  uniqueHolidayInfo: "Bayern verbindet bei seinen Feiertagen katholische Traditionen mit regionalem Brauchtum und ist das Bundesland mit den meisten gesetzlichen Feiertagen.",
  traditionInfo: "Die Feiertage in Bayern sind stark von der katholischen Tradition geprägt und werden mit besonderer Festlichkeit begangen.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Traditionelle Feste",
      icon: "crown",
      items: [
        {
          title: "Oktoberfest",
          description: "Das weltberühmte Volksfest in München mit traditioneller Tracht, bayerischer Musik und Festzeltatmosphäre",
          icon: "beer"
        },
        {
          title: "Bergfeste",
          description: "Traditionelle Almfeste in den bayerischen Alpen mit Volksmusik und regionalen Spezialitäten",
          icon: "mountain"
        }
      ]
    },
    {
      title: "Kulturelles Erbe",
      icon: "landmark",
      items: [
        {
          title: "Königsschlösser",
          description: "Die märchenhaften Schlösser König Ludwigs II., wie Neuschwanstein und Linderhof",
          icon: "monument"
        },
        {
          title: "Wallfahrtsorte",
          description: "Bedeutende religiöse Stätten wie die Wieskirche und Altötting",
          icon: "church"
        }
      ]
    }
  ]
}; 