import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Die mecklenburg-vorpommerschen Neujahrsfeiern verbinden traditionelles Feuerwerk über der Ostsee mit dem berühmten Neujahrsschwimmen in der Ostsee.",
    traditions: ["Feuerwerk an der Ostsee", "Neujahrsschwimmen", "Maritime Neujahrsempfänge"],
    locations: ["Rostock", "Schwerin", "Stralsund"]
  },
  "Karfreitag": {
    description: "Der mecklenburg-vorpommersche Karfreitag wird mit eindrucksvollen Passionskonzerten in den historischen Backsteinkirchen begangen.",
    traditions: ["Passionsmusik", "Kreuzwege", "Fastenbräuche"],
    locations: ["Schweriner Dom", "St. Marien Rostock", "St. Nikolai Stralsund"]
  },
  "Ostermontag": {
    description: "Die mecklenburg-vorpommerschen Ostertraditionen vereinen maritime Ostermärkte an der Küste mit festlichen Osterfeuern in den historischen Herrenhäusern.",
    traditions: ["Osterfeuer am Strand", "Maritime Ostermärkte", "Ostereiersuche in den Herrenhäusern"],
    locations: ["Warnemünde", "Wismar", "Güstrow"]
  },
  "Tag der Arbeit": {
    description: "Der mecklenburg-vorpommersche Maifeiertag verbindet traditionelle Hafenfeste mit Frühlingsfeiern in den historischen Hansestädten.",
    traditions: ["Hafenfeste", "Maikundgebungen", "Frühlingsfeste"],
    locations: ["Rostocker Hafen", "Schweriner Schloss", "Stralsunder Hafen"]
  },
  "Christi Himmelfahrt": {
    description: "Die mecklenburg-vorpommerschen Himmelfahrtstraditionen führen zu Ausflügen in die Nationalparks und zu Vatertagstouren an der Ostseeküste.",
    traditions: ["Vatertagstouren", "Himmelfahrtsgottesdienste", "Ausflüge zur Ostsee"],
    locations: ["Müritz Nationalpark", "Jasmund Nationalpark", "Usedom"]
  },
  "Pfingstmontag": {
    description: "Der mecklenburg-vorpommersche Pfingstmontag lockt mit maritimen Festen in den Hansestädten und traditionellen Schlösserfesten im Binnenland.",
    traditions: ["Hafenfeste", "Pfingstmärkte", "Schlösserfeste"],
    locations: ["Hansestadt Rostock", "Schloss Schwerin", "Stralsund"]
  },
  "Tag der Deutschen Einheit": {
    description: "Mecklenburg-Vorpommern feiert die Deutsche Einheit mit besonderem Fokus auf die erfolgreiche Transformation der maritimen Wirtschaft und des Tourismus.",
    traditions: ["Bürgerfeste", "Historische Ausstellungen", "Hafenfeiern"],
    culturalSignificance: "Symbol für die erfolgreiche Entwicklung nach der Wiedervereinigung",
    locations: ["Schwerin", "Rostock", "Neubrandenburg"]
  },
  "Reformationstag": {
    description: "Der mecklenburg-vorpommersche Reformationstag wird mit besonderen Gottesdiensten in den imposanten Backsteinkirchen der Hansestädte begangen.",
    traditions: ["Reformationsgottesdienste", "Historische Führungen", "Kirchenkonzerte"],
    culturalSignificance: "Erinnerung an die protestantische Tradition des Landes",
    locations: ["Schweriner Dom", "St. Nikolai Stralsund", "Doberaner Münster"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag in Mecklenburg-Vorpommern vereint maritime Seemannsweihnacht mit festlichen Traditionen in den historischen Gutshäusern.",
    traditions: ["Weihnachtsgottesdienste", "Seemannsweihnacht", "Gutshausweihnacht"],
    locations: ["Stralsund", "Wismar", "Ludwigslust"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtsfeiertag lädt Mecklenburg-Vorpommern zu winterlichen Strandspaziergängen und Konzerten in den historischen Seebädern.",
    traditions: ["Winterwanderungen", "Weihnachtskonzerte", "Strandspaziergänge"],
    locations: ["Warnemünde", "Binz", "Heiligendamm"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühling",
    description: "Heringswochen an der Ostsee, Baumblütenfeste und Start der Segelssaison"
  },
  {
    season: "Sommer",
    description: "Hanse Sail in Rostock, Störtebeker Festspiele und zahlreiche Strandfeste"
  },
  {
    season: "Herbst",
    description: "Erntefeste in den ländlichen Regionen, Kranichwanderungen am Darß"
  },
  {
    season: "Winter",
    description: "Weihnachtsmärkte in historischen Altstädten, Winterbaden in der Ostsee"
  }
];

export const mecklenburgVorpommern: StateInfo = {
  fullName: "Mecklenburg-Vorpommern",
  shortName: "MV",
  capital: "Schwerin",
  description: "Mecklenburg-Vorpommern ist ein Bundesland im Nordosten Deutschlands, bekannt für seine Ostseeküste, die Seenplatte und historische Hansestädte.",
  culturalHighlights: [
    "UNESCO-Welterbe Hansestädte Stralsund und Wismar",
    "Störtebeker Festspiele auf Rügen",
    "Hanse Sail Rostock",
    "Mecklenburgische Seenplatte",
    "Historische Backsteingotik"
  ],
  keyFacts: {
    population: "1,6 Millionen",
    area: "23.295 km²",
    founded: "1945/1990",
    economicStrength: [
      "Maritime Wirtschaft",
      "Tourismus",
      "Landwirtschaft",
      "Erneuerbare Energien"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Mecklenburg-Vorpommern ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["MV"] || []).map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: true,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Mecklenburg-Vorpommern ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: [
    ...holidays.schoolHolidays["2024"]["MV"],
    ...holidays.schoolHolidays["2025"]["MV"],
    ...holidays.schoolHolidays["2026"]["MV"]
  ],
  uniqueHolidayInfo: "Mecklenburg-Vorpommern verbindet bei seinen Feiertagen maritime Traditionen mit dem kulturellen Erbe der Hanse und der ländlichen Regionen.",
  traditionInfo: "Die Feiertage in Mecklenburg-Vorpommern sind geprägt von der Nähe zur Ostsee, der hanseatischen Geschichte und den landwirtschaftlichen Traditionen.",
  seasonalTraditions
}; 