import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Die niedersächsischen Neujahrsfeiern verbinden das traditionelle Rummelpottlaufen an der Küste mit festlichen Neujahrskonzerten in den historischen Städten.",
    traditions: ["Neujahrssingen", "Rummelpottlaufen", "Neujahrskonzerte"],
    locations: ["Hannover", "Braunschweig", "Oldenburg"]
  },
  "Karfreitag": {
    description: "Der niedersächsische Karfreitag wird mit eindrucksvollen Passionskonzerten in den historischen Domen und stillen Prozessionen begangen.",
    traditions: ["Passionskonzerte", "Kreuzwege", "Stille Prozessionen"],
    locations: ["Mariendom Hildesheim", "St. Michaelis Lüneburg", "Braunschweiger Dom"]
  },
  "Ostermontag": {
    description: "Die niedersächsischen Ostertraditionen reichen vom berühmten Osterräderlauf in Lügde bis zu den traditionellen Osterfeuern in der Lüneburger Heide.",
    traditions: ["Osterfeuer", "Ostereiersuche im Harz", "Osterräderlauf in Lüdge"],
    locations: ["Harz", "Lüneburger Heide", "Ostfriesland"]
  },
  "Tag der Arbeit": {
    description: "Der niedersächsische Maifeiertag vereint Industrietraditionen in der Autostadt mit traditionellem Maibaumaufstellen in den Dörfern.",
    traditions: ["Maikundgebungen", "Maibaumaufstellen", "Maisingen"],
    locations: ["VW-Stadt Wolfsburg", "Hannover Innenstadt", "Braunschweig"]
  },
  "Christi Himmelfahrt": {
    description: "Die niedersächsischen Himmelfahrtstraditionen führen zu Wanderungen im Weserbergland und Ausflügen zu den Ostfriesischen Inseln.",
    traditions: ["Vatertagswanderungen", "Himmelfahrtsgottesdienste", "Familienausflüge"],
    locations: ["Weserbergland", "Elm-Lappwald", "Ostfriesische Inseln"]
  },
  "Pfingstmontag": {
    description: "Der niedersächsische Pfingstmontag lockt mit traditionellen Festen im Alten Land und besonderen Pfingstmärkten im Wendland.",
    traditions: ["Pfingstbräuche", "Pfingstmärkte", "Pfingstkonzerte"],
    locations: ["Altes Land", "Wendland", "Emsland"]
  },
  "Tag der Deutschen Einheit": {
    description: "Niedersachsen feiert die Deutsche Einheit mit besonderem Bezug zur ehemaligen innerdeutschen Grenze und den Grenzlandmuseen.",
    traditions: ["Bürgerfeste", "Grenzlandmuseen", "Einheitsfeiern"],
    culturalSignificance: "Erinnerung an die Zeit der deutschen Teilung und die Grenzlage",
    locations: ["Zonengrenz-Museum Helmstedt", "Hannover", "Braunschweig"]
  },
  "Reformationstag": {
    description: "Der niedersächsische Reformationstag wird mit besonderen Gottesdiensten in den historischen Stadtkirchen und Lutherfesten gefeiert.",
    traditions: ["Reformationsgottesdienste", "Lutherfeste", "Kirchenkonzerte"],
    culturalSignificance: "Erinnerung an die protestantische Prägung des Landes",
    locations: ["St. Michaelis Lüneburg", "Marktkirche Hannover", "Dom zu Verden"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag in Niedersachsen vereint festliche Gottesdienste in mittelalterlichen Stadtkirchen mit Krippenspielen in historischen Altstädten.",
    traditions: ["Weihnachtsgottesdienste", "Krippenspiele", "Familienessen"],
    locations: ["Lüneburger Altstadt", "Goslar", "Celle"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtsfeiertag lädt Niedersachsen zu winterlichen Wanderungen im verschneiten Harz und gemütlichen Konzerten in historischen Kirchen.",
    traditions: ["Verwandtenbesuche", "Winterwanderungen", "Weihnachtskonzerte"],
    locations: ["Harz", "Deister", "Ostfriesland"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühling",
    description: "Spargelzeit in der Lüneburger Heide, Krokusfeste im Harz, Osterfeuer in ganz Niedersachsen"
  },
  {
    season: "Sommer",
    description: "Schützenfeste, Maschseefest in Hannover, Wattenmeer-Festivals an der Küste"
  },
  {
    season: "Herbst",
    description: "Erntefeste im Alten Land, Herbstmärkte, Martinisingen in Ostfriesland"
  },
  {
    season: "Winter",
    description: "Historische Weihnachtsmärkte, Braunkohlwanderungen, Wintervergnügen im Harz"
  }
];

export const niedersachsen: StateInfo = {
  fullName: "Niedersachsen",
  shortName: "NI",
  capital: "Hannover",
  description: "Niedersachsen ist ein vielfältiges Bundesland im Nordwesten Deutschlands, das sich von der Nordsee bis zum Harz erstreckt. Es vereint maritime Küstenlandschaften, weite Heidegebiete und Mittelgebirgsregionen.",
  culturalHighlights: [
    "UNESCO-Welterbe Goslar und Rammelsberg",
    "Herrenhäuser Gärten in Hannover",
    "Ostfriesische Teekultur",
    "Altes Land - größtes zusammenhängendes Obstanbaugebiet Nordeuropas",
    "Autostadt Wolfsburg"
  ],
  keyFacts: {
    population: "8 Millionen",
    area: "47.614 km²",
    founded: "1946",
    economicStrength: [
      "Automobilindustrie",
      "Landwirtschaft",
      "Maritime Wirtschaft",
      "Tourismus",
      "Energiewirtschaft"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Niedersachsen ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["NI"] || []).map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: true,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Niedersachsen ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: [
    ...holidays.schoolHolidays["2024"]["NI"],
    ...holidays.schoolHolidays["2025"]["NI"],
    ...holidays.schoolHolidays["2026"]["NI"]
  ],
  uniqueHolidayInfo: "Niedersachsen verbindet bei seinen Feiertagen norddeutsche Traditionen mit regionalen Besonderheiten von der Küste bis zum Harz.",
  traditionInfo: "Die Feiertage in Niedersachsen sind geprägt von der protestantischen Tradition, maritimen Einflüssen an der Küste und ländlichen Bräuchen im Binnenland.",
  seasonalTraditions
}; 