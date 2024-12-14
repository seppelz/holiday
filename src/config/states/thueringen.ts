import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string }> = {
  "Neujahr": {
    description: 'Thüringen begrüßt das neue Jahr mit kulturellen Traditionen in den historischen Residenzstädten.',
    traditions: ['Neujahrskonzert im Deutschen Nationaltheater Weimar', 'Feuerwerk über der Wartburg', 'Neujahrswanderungen auf dem Rennsteig'],
    culturalSignificance: 'Verbindung von kulturellem Erbe mit festlichen Traditionen'
  },
  "Reformationstag": {
    description: 'Als wichtiger Ort der Reformation feiert Thüringen den Reformationstag mit besonderer historischer Bedeutung.',
    traditions: ['Festgottesdienste auf der Wartburg', 'Lutherfestspiele', 'Historische Führungen'],
    culturalSignificance: 'Zentrale Bedeutung für die protestantische Reformation'
  },
  "Tag der Deutschen Einheit": {
    description: 'Thüringen feiert die Deutsche Einheit als Symbol der friedlichen Revolution und Wiedervereinigung.',
    traditions: ['Bürgerfeste in Erfurt', 'Kulturveranstaltungen in der Gedenkstätte Grenzlandmuseum', 'Friedensgebete'],
    culturalSignificance: 'Symbol für die Überwindung der deutschen Teilung'
  },
  "Weltkindertag": {
    description: 'Als einziges Bundesland feiert Thüringen den Weltkindertag als gesetzlichen Feiertag.',
    traditions: ['Kinderfeste in allen großen Städten', 'Kulturelle Kinderveranstaltungen', 'Familienaktionen'],
    culturalSignificance: 'Besondere Wertschätzung der Kinderrechte und Familienkultur'
  }
};

const seasonalTraditions = [
  {
    season: 'Frühjahr',
    description: 'Die Bach-Festspiele in Eisenach, traditionelle Osterbräuche und die Frühlingsfeste in den historischen Residenzstädten beleben die Region.'
  },
  {
    season: 'Sommer',
    description: 'Das Kunstfest Weimar, die Thüringer Bachwochen und zahlreiche Kulturfestivals in den UNESCO-Welterbestädten prägen den Kultursommer.'
  },
  {
    season: 'Herbst',
    description: 'Der berühmte Erfurter Zwiebelmarkt, traditionelle Erntedankfeste und die Reformationsfeiern auf der Wartburg bestimmen die herbstliche Festkultur.'
  },
  {
    season: 'Winter',
    description: 'Der historische Erfurter Weihnachtsmarkt, die Eisenacher Wartburg-Weihnacht und die klassischen Adventskonzerte prägen die Vorweihnachtszeit.'
  }
];

export const thueringen: StateInfo = {
  fullName: "Thüringen",
  shortName: "TH",
  capital: "Erfurt",
  description: "Thüringen ist bekannt für seine reiche kulturelle Geschichte, die Wartburg und seine zentrale Lage im Herzen Deutschlands.",
  culturalHighlights: [
    "Wartburg (UNESCO-Weltkulturerbe)",
    "Weimarer Klassik",
    "Erfurter Dom",
    "Thüringer Wald",
    "Bach-Gedenkstätten"
  ],
  keyFacts: {
    population: "2,1 Millionen",
    area: "16.171 km²",
    founded: "1920",
    economicStrength: [
      "Optische Industrie",
      "Automobilzulieferer",
      "Technologie",
      "Tourismus",
      "Ernährungswirtschaft"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist ein bundesweiter gesetzlicher Feiertag.`
      }
    })),
    ...holidays.publicHolidays["2025"]["TH"].map(holiday => ({
      ...holiday,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Thüringen ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: [
    ...holidays.schoolHolidays["2025"]["TH"]
  ],
  uniqueHolidayInfo: "Thüringen verbindet bei seinen Feiertagen kulturelles Erbe mit regionalen Traditionen. Die Reformationsgeschichte und das Erbe der Klassik prägen das Festjahr.",
  traditionInfo: "Die thüringischen Traditionen sind geprägt von der Reformationsgeschichte, der Weimarer Klassik und dem kulturellen Erbe der Region.",
  seasonalTraditions
}; 