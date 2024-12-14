import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Die nordrhein-westfälischen Neujahrsfeiern verbinden rheinische Lebensfreude am Kölner Dom mit westfälischen Traditionen im Münsterland.",
    traditions: ["Neujahrsempfänge", "Neujahrssingen", "Bleigießen"],
    locations: ["Kölner Dom", "Düsseldorfer Altstadt", "Dortmunder U"]
  },
  "Karfreitag": {
    description: "Der nordrhein-westfälische Karfreitag wird mit eindrucksvollen Kreuzwegen in den historischen Domen und besonderen Passionskonzerten begangen.",
    traditions: ["Kreuzwege", "Passionskonzerte", "Fastenbräuche"],
    locations: ["Kölner Dom", "Aachener Dom", "Paderborner Dom"]
  },
  "Ostermontag": {
    description: "Die nordrhein-westfälischen Ostertraditionen reichen von rheinischen Ostermärkten bis zu westfälischen Osterfeuern im Münsterland.",
    traditions: ["Osterfeuer", "Ostereiersuche", "Osterräderlauf"],
    locations: ["Münsterland", "Sauerland", "Rheinland"]
  },
  "Tag der Arbeit": {
    description: "Der nordrhein-westfälische Maifeiertag steht im Zeichen der Industriekultur mit großen Kundgebungen im Ruhrgebiet und traditionellen Maifesten.",
    traditions: ["Maikundgebungen", "Maifeste", "Arbeiterdemonstrationen"],
    locations: ["Ruhrgebiet", "Düsseldorf", "Dortmund"]
  },
  "Christi Himmelfahrt": {
    description: "Die nordrhein-westfälischen Himmelfahrtstraditionen führen zu Wanderungen im Bergischen Land und Prozessionen im katholischen Münsterland.",
    traditions: ["Vatertagstouren", "Himmelfahrtsprozessionen", "Familienausflüge"],
    locations: ["Bergisches Land", "Teutoburger Wald", "Siebengebirge"]
  },
  "Pfingstmontag": {
    description: "Der nordrhein-westfälische Pfingstmontag vereint rheinische Pfingstkirmes mit westfälischen Pfingstbräuchen und Konzerten im Ruhrgebiet.",
    traditions: ["Pfingstkirmes", "Pfingstbräuche", "Pfingstkonzerte"],
    locations: ["Rheinwiesen", "Westfalenpark", "Münsterland"]
  },
  "Fronleichnam": {
    description: "Die nordrhein-westfälischen Fronleichnamsfeiern beeindrucken mit prächtigen Prozessionen und kunstvollen Blumenteppichen in den katholischen Regionen.",
    traditions: ["Prozessionen", "Blumenteppiche", "Kirchenfeste"],
    culturalSignificance: "Besondere Bedeutung im katholisch geprägten Rheinland",
    locations: ["Köln", "Münster", "Paderborn"]
  },
  "Tag der Deutschen Einheit": {
    description: "Nordrhein-Westfalen feiert die Deutsche Einheit als Integrationsland mit multikulturellen Bürgerfesten und Veranstaltungen im Ruhrgebiet.",
    traditions: ["Bürgerfeste", "Kulturveranstaltungen", "Interkulturelle Feste"],
    culturalSignificance: "Symbol für die Integration verschiedener Kulturen im Ruhrgebiet",
    locations: ["Düsseldorf", "Köln", "Dortmund"]
  },
  "Allerheiligen": {
    description: "Das nordrhein-westfälische Allerheiligenfest verbindet katholische Traditionen mit eindrucksvollen Lichtermeeren auf den historischen Friedhöfen.",
    traditions: ["Gräberbesuche", "Gottesdienste", "Lichtermeere auf Friedhöfen"],
    culturalSignificance: "Tag des Gedenkens und der Besinnung",
    locations: ["Kölner Friedhöfe", "Münsteraner Friedhöfe", "Aachener Friedhöfe"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag in Nordrhein-Westfalen vereint festliche Gottesdienste in den gotischen Domen mit traditionellen Krippenspielen.",
    traditions: ["Weihnachtsgottesdienste", "Krippenspiele", "Familienessen"],
    locations: ["Kölner Dom", "Münsteraner Dom", "Essener Dom"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtsfeiertag lädt Nordrhein-Westfalen zu winterlichen Wanderungen im Sauerland und festlichen Konzerten in historischen Kirchen.",
    traditions: ["Weihnachtskonzerte", "Verwandtenbesuche", "Winterwanderungen"],
    locations: ["Sauerland", "Teutoburger Wald", "Bergisches Land"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühling",
    description: "Rheinischer Karneval, Osterbräuche, Maifeste und Kirschblütenfeste im Rheinland"
  },
  {
    season: "Sommer",
    description: "Schützenfeste im Münsterland, Rheinkirmes in Düsseldorf, Ruhrfestspiele in Recklinghausen"
  },
  {
    season: "Herbst",
    description: "Weinfeste am Mittelrhein, Oktoberfeste im Ruhrgebiet, Kartoffelfeste im Münsterland"
  },
  {
    season: "Winter",
    description: "Weihnachtsmärkte in historischen Altstädten, Winterberger Wintersport, Adventskonzerte"
  }
];

export const nordrheinWestfalen: StateInfo = {
  fullName: "Nordrhein-Westfalen",
  shortName: "NW",
  capital: "Düsseldorf",
  description: "Nordrhein-Westfalen ist das bevölkerungsreichste Bundesland Deutschlands und vereint das urbane Ruhrgebiet, das kulturreiche Rheinland und das traditionelle Westfalen.",
  culturalHighlights: [
    "UNESCO-Welterbe Kölner Dom",
    "Zeche Zollverein in Essen",
    "Aachener Dom",
    "Schloss Augustusburg in Brühl",
    "Industriekultur im Ruhrgebiet"
  ],
  keyFacts: {
    population: "17,9 Millionen",
    area: "34.110 km²",
    founded: "1946",
    economicStrength: [
      "Industrie und Technologie",
      "Dienstleistungssektor",
      "Medien und Kommunikation",
      "Handel und Logistik",
      "Energiewirtschaft"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Nordrhein-Westfalen ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["NW"] || []).map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: true,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Nordrhein-Westfalen ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: [
    ...holidays.schoolHolidays["2024"]["NW"],
    ...holidays.schoolHolidays["2025"]["NW"],
    ...holidays.schoolHolidays["2026"]["NW"]
  ],
  uniqueHolidayInfo: "Nordrhein-Westfalen verbindet bei seinen Feiertagen rheinische Lebensfreude mit westfälischer Tradition und der multikulturellen Vielfalt des Ruhrgebiets.",
  traditionInfo: "Die Feiertage in NRW sind geprägt von der Verschmelzung katholischer und protestantischer Traditionen sowie der industriellen Geschichte des Landes.",
  seasonalTraditions
}; 