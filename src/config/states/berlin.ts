import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Die Berliner Silvesterfeier am Brandenburger Tor ist eine der größten Freiluftpartys Europas mit spektakulärem Feuerwerk.",
    traditions: ["Silvesterparty am Brandenburger Tor", "Neujahrslauf", "Neujahrskonzerte"],
    locations: ["Brandenburger Tor", "Alexanderplatz", "Kulturbrauerei"]
  },
  "Karfreitag": {
    description: "Der Berliner Karfreitag verbindet zeitgenössische Kunstausstellungen mit traditionellen Passionskonzerten in historischen Kirchen.",
    traditions: ["Passionskonzerte", "Kreuzwege", "Kunstausstellungen"],
    locations: ["Berliner Dom", "Gedächtniskirche", "Gethsemanekirche"]
  },
  "Ostermontag": {
    description: "Die Berliner Osterfeierlichkeiten vereinen urbane Brunchkultur mit traditionellen Osterfeuern in den Stadtparks.",
    traditions: ["Osterfeuer", "Osterbrunch", "Ostermärkte"],
    locations: ["Britzer Garten", "Botanischer Garten", "Domäne Dahlem"]
  },
  "Tag der Arbeit": {
    description: "Der Berliner 1. Mai ist bekannt für das multikulturelle MyFest in Kreuzberg und friedliche politische Demonstrationen.",
    traditions: ["MyFest in Kreuzberg", "Demonstrationen", "Straßenfeste"],
    locations: ["Kreuzberg", "Prenzlauer Berg", "Friedrichshain"]
  },
  "Christi Himmelfahrt": {
    description: "An Christi Himmelfahrt verwandeln sich Berlins Grünanlagen und Seen in beliebte Ausflugsziele für Vatertagstouren.",
    traditions: ["Vatertagstouren", "Picknicks", "Bootsfahrten"],
    locations: ["Wannsee", "Müggelsee", "Tiergarten"]
  },
  "Pfingstmontag": {
    description: "Der Berliner Pfingstmontag ist untrennbar mit dem bunten Karneval der Kulturen und Open-Air-Festivals verbunden.",
    traditions: ["Karneval der Kulturen", "Pfingstkonzerte", "Stadtfeste"],
    locations: ["Kreuzberg", "Tempelhof", "Mauerpark"]
  },
  "Tag der Deutschen Einheit": {
    description: "Berlin feiert die Deutsche Einheit mit besonderer Intensität entlang der ehemaligen Mauer mit Festmeile und Bürgerfest.",
    traditions: ["Bürgerfest", "Festmeile", "Konzerte"],
    culturalSignificance: "Symbol für die Überwindung der deutschen Teilung",
    locations: ["Brandenburger Tor", "East Side Gallery", "Potsdamer Platz"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag in Berlin vereint festliche Konzerte in der Philharmonie mit stimmungsvollen Gottesdiensten im Dom.",
    traditions: ["Weihnachtsgottesdienste", "Konzerte", "Festessen"],
    locations: ["Berliner Dom", "Konzerthaus", "Gendarmenmarkt"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtsfeiertag locken Berlins Kulturinstitutionen mit besonderen Aufführungen und winterlichen Veranstaltungen.",
    traditions: ["Theaterbesuche", "Weihnachtskonzerte", "Wintermärkte"],
    locations: ["Staatsoper", "Philharmonie", "Charlottenburg"]
  },
  "Internationaler Frauentag": {
    description: "Der Internationale Frauentag als Berliner Feiertag würdigt die Geschichte der Frauenbewegung mit vielfältigen Veranstaltungen.",
    traditions: ["Demonstrationen", "Kulturveranstaltungen", "Diskussionsrunden"],
    culturalSignificance: "Symbol für die Gleichberechtigung und Emanzipation",
    locations: ["Unter den Linden", "Alexanderplatz", "Kurfürstendamm"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühling",
    description: "Internationales Filmfestival Berlinale, Karneval der Kulturen, Gallery Weekend"
  },
  {
    season: "Sommer",
    description: "Fête de la Musique, Christopher Street Day, Open Air Kinos und Konzerte"
  },
  {
    season: "Herbst",
    description: "Festival of Lights, Berlin Art Week, Berliner Oktoberfest"
  },
  {
    season: "Winter",
    description: "Weihnachtsmärkte in allen Bezirken, Silvesterfeier am Brandenburger Tor"
  }
];

export const berlin: StateInfo = {
  fullName: "Berlin",
  shortName: "BE",
  capital: "Berlin",
  description: "Berlin ist die Hauptstadt und ein Stadtstaat der Bundesrepublik Deutschland. Als Metropole vereint sie Geschichte, Kultur, Politik und eine lebendige internationale Szene.",
  culturalHighlights: [
    "Museumsinsel (UNESCO-Weltkulturerbe)",
    "East Side Gallery",
    "Brandenburger Tor",
    "Reichstagsgebäude",
    "Berliner Philharmonie"
  ],
  keyFacts: {
    population: "3,7 Millionen",
    area: "892 km²",
    founded: "1237",
    economicStrength: [
      "Kreativwirtschaft",
      "Technologie und Startups",
      "Tourismus",
      "Wissenschaft und Forschung",
      "Medien"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Berlin ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["BE"] || []).map(holiday => ({
      ...holiday,
      type: "public",
      isRegional: holiday.name === "Internationaler Frauentag",
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Berlin ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: holidays.schoolHolidays["2025"]["BE"],
  uniqueHolidayInfo: "Berlin verbindet bei seinen Feiertagen internationale Weltoffenheit mit deutscher Geschichte und Tradition.",
  traditionInfo: "Die Feiertage in Berlin spiegeln die Vielfalt der Metropole wider, von traditionellen Festen bis zu modernen Kulturveranstaltungen.",
  seasonalTraditions
}; 