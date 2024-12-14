import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Die rheinland-pfälzischen Neujahrsfeiern verbinden festliches Feuerwerk über den Weinbergen mit traditionellem Neujahrsschwimmen im Rhein.",
    traditions: ["Neujahrsfeuerwerk an Rhein und Mosel", "Neujahrsschwimmen", "Neujahrskonzerte"],
    locations: ["Mainz", "Koblenz", "Trier"]
  },
  "Karfreitag": {
    description: "Der rheinland-pfälzische Karfreitag wird mit eindrucksvollen Passionskonzerten in den romanischen Kaiserdomen und stillen Kreuzwegen begangen.",
    traditions: ["Kreuzwege", "Passionsmusik", "Fastenbräuche"],
    locations: ["Mainzer Dom", "Speyerer Dom", "Trierer Dom"]
  },
  "Ostermontag": {
    description: "Die rheinland-pfälzischen Ostertraditionen vereinen geschmückte Osterbrunnen in den Weindörfern mit festlichen Ostermärkten in den historischen Städten.",
    traditions: ["Osterbrunnen schmücken", "Ostereiersuche in den Weinbergen", "Ostermärkte"],
    locations: ["Rheinhessen", "Pfalz", "Moseltal"]
  },
  "Tag der Arbeit": {
    description: "Der rheinland-pfälzische Maifeiertag verbindet traditionelle Weinwanderungen durch die Weinberge mit Arbeiterfesten in den Industriestädten.",
    traditions: ["Maikundgebungen", "Weinwanderungen", "Maifeste"],
    locations: ["Ludwigshafen", "Kaiserslautern", "Mainz"]
  },
  "Christi Himmelfahrt": {
    description: "Die rheinland-pfälzischen Himmelfahrtstraditionen führen zu Vatertagswanderungen durch die Weinberge und festlichen Weinfesten im Moseltal.",
    traditions: ["Vatertagswanderungen", "Weinfeste", "Himmelfahrtsgottesdienste"],
    locations: ["Rheingau", "Moseltal", "Pfälzer Wald"]
  },
  "Pfingstmontag": {
    description: "Der rheinland-pfälzische Pfingstmontag lockt mit traditionellen Weinfesten entlang der Deutschen Weinstraße und historischen Pfingstmärkten.",
    traditions: ["Pfingstmärkte", "Weinfeste", "Pfingstkonzerte"],
    locations: ["Bad Dürkheim", "Neustadt an der Weinstraße", "Worms"]
  },
  "Fronleichnam": {
    description: "Die rheinland-pfälzischen Fronleichnamsfeiern beeindrucken mit prächtigen Prozessionen durch die Weinberge und kunstvollen Blumenteppichen in den Altstädten.",
    traditions: ["Prozessionen", "Blumenteppiche", "Kirchenfeste"],
    culturalSignificance: "Besondere Bedeutung in den katholischen Weinbauregionen",
    locations: ["Mainz", "Speyer", "Trier"]
  },
  "Tag der Deutschen Einheit": {
    description: "Rheinland-Pfalz feiert die Deutsche Einheit als Heimat der Deutschen Weinstraße mit einer Verbindung aus Weinfesten und Bürgerfeiern.",
    traditions: ["Bürgerfeste", "Weinfeste", "Kulturveranstaltungen"],
    culturalSignificance: "Symbol für die Verbindung von Tradition und Moderne",
    locations: ["Mainz", "Trier", "Koblenz"]
  },
  "Allerheiligen": {
    description: "Das rheinland-pfälzische Allerheiligenfest verbindet katholische Gedenktraditionen mit stimmungsvollen Friedhofsbeleuchtungen in den historischen Städten.",
    traditions: ["Gräberbesuche", "Gottesdienste", "Gedenkfeiern"],
    culturalSignificance: "Tag des Gedenkens und der Besinnung",
    locations: ["Mainzer Friedhöfe", "Speyerer Friedhöfe", "Trierer Friedhöfe"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag in Rheinland-Pfalz vereint festliche Gottesdienste in den Kaiserdomen mit traditionellen pfälzischen Weihnachtsgerichten.",
    traditions: ["Weihnachtsgottesdienste", "Festessen mit Pfälzer Spezialitäten", "Krippenspiele"],
    locations: ["Speyerer Dom", "Wormser Dom", "Mainzer Dom"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtsfeiertag lädt Rheinland-Pfalz zu winterlichen Wanderungen durch die Weinberge und gemütlichen Weinstubenbesuchen.",
    traditions: ["Weihnachtskonzerte", "Verwandtenbesuche", "Winterwanderungen"],
    locations: ["Deutsche Weinstraße", "Hunsrück", "Westerwald"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühling",
    description: "Mandelblütenfeste in der Pfalz, Weinwanderungen an Mosel und Rhein, Osterbräuche"
  },
  {
    season: "Sommer",
    description: "Rheinland-Pfalz-Tag, Weinfeste in allen Weinbauregionen, Burgenfestspiele"
  },
  {
    season: "Herbst",
    description: "Weinlese und Weinfeste, Pfälzer Herbstmärkte, Hunsrücker Kartoffelfeste"
  },
  {
    season: "Winter",
    description: "Mainzer Weihnachtsmarkt, Glühweinwanderungen an der Mosel, Pfälzer Wintermärkte"
  }
];

export const rheinlandPfalz: StateInfo = {
  fullName: "Rheinland-Pfalz",
  shortName: "RP",
  capital: "Mainz",
  description: "Rheinland-Pfalz ist bekannt für seine Weinbaugebiete, historischen Städte und Burgen. Das Land vereint die Regionen Rheinhessen, Pfalz, Moseltal und Westerwald.",
  culturalHighlights: [
    "UNESCO-Welterbe Oberes Mittelrheintal",
    "Speyerer Dom",
    "Römisches Trier",
    "Deutsche Weinstraße",
    "Mainzer Fastnacht"
  ],
  keyFacts: {
    population: "4,1 Millionen",
    area: "19.854 km²",
    founded: "1946",
    economicStrength: [
      "Weinbau",
      "Chemische Industrie",
      "Tourismus",
      "Landwirtschaft",
      "Fahrzeugbau"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Rheinland-Pfalz ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["RP"] || []).map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: true,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Rheinland-Pfalz ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: [
    ...holidays.schoolHolidays["2024"]["RP"],
    ...holidays.schoolHolidays["2025"]["RP"],
    ...holidays.schoolHolidays["2026"]["RP"]
  ],
  uniqueHolidayInfo: "Rheinland-Pfalz verbindet bei seinen Feiertagen rheinische Traditionen mit der Weinkultur und dem kulturellen Erbe der Region.",
  traditionInfo: "Die Feiertage in Rheinland-Pfalz sind geprägt von der Weinbautradition, der katholischen Prägung und der langen Geschichte der Region.",
  seasonalTraditions
}; 