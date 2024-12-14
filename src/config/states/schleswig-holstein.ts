import { StateInfo } from '../types/StateInfo';
import { Holiday } from '../types/Holiday';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string }> = {
  "Neujahr": {
    description: 'Schleswig-Holstein begrüßt das neue Jahr mit maritimen Traditionen an Nord- und Ostsee.',
    traditions: ['Neujahrsempfang im Kieler Landtag', 'Feuerwerk über den Hafenstädten', 'Neujahrsschwimmen in der Ostsee'],
    culturalSignificance: 'Verbindung von maritimer Tradition mit modernen Feierlichkeiten'
  },
  "Reformationstag": {
    description: 'Der Reformationstag wird in Schleswig-Holstein mit besonderem Bezug zur hanseatischen Geschichte gefeiert.',
    traditions: ['Festgottesdienste in historischen Kirchen', 'Kulturveranstaltungen in der Lübecker Altstadt', 'Historische Stadtführungen'],
    culturalSignificance: 'Verbindung von protestantischer Tradition mit hanseatischem Erbe'
  },
  "Tag der Deutschen Einheit": {
    description: 'Als Tor zum Norden feiert Schleswig-Holstein den Tag der Deutschen Einheit mit maritimem Flair.',
    traditions: ['Bürgerfeste in den Hafenstädten', 'Deutsch-Dänische Kulturfeste', 'Maritime Paraden'],
    culturalSignificance: 'Symbol für die Nord-Süd-Verbindung und europäische Integration'
  },
  "Karfreitag": {
    description: 'Der Karfreitag wird in Schleswig-Holstein mit besonderen maritimen und hanseatischen Traditionen begangen.',
    traditions: ['Fischessen in den Küstenstädten', 'Passionskonzerte in historischen Kirchen', 'Stille Prozessionen'],
    culturalSignificance: 'Verbindung christlicher Tradition mit maritimer Kultur'
  }
};

export const schleswigHolstein: StateInfo = {
  fullName: 'Schleswig-Holstein',
  shortName: 'SH',
  capital: 'Kiel',
  description: 'Schleswig-Holstein, das Land zwischen den Meeren, verbindet maritime Tradition mit moderner Wirtschaft. Die Küstenlandschaft, die historischen Hansestädte und die nordische Kultur prägen das Leben zwischen Nord- und Ostsee.',
  culturalHighlights: [
    'UNESCO-Weltkulturerbe Lübecker Altstadt',
    'Nordfriesische Inseln und Halligen',
    'Maritime Tradition und Hafenkultur',
    'Schleswig-Holsteinische Musikfestspiele',
    'Historische Hansestädte',
    'Traditionelle norddeutsche Küche'
  ],
  keyFacts: {
    population: '2,9 Millionen (2021)',
    area: '15.804 km²',
    founded: '1946',
    economicStrength: [
      'Maritime Wirtschaft und Häfen',
      'Erneuerbare Energien',
      'Tourismus und Landwirtschaft'
    ]
  },
  uniqueHolidayInfo: 'Schleswig-Holstein verbindet maritime Traditionen mit hanseatischen Feiertagen. Die Hafenfeste, traditionellen Fischermärkte und die Kieler Woche prägen das kulturelle Leben.',
  traditionInfo: 'Die Traditionen sind geprägt von der maritimen Geschichte, dem hanseatischen und nordischen Erbe. Seefahrt, Fischerei und die Verbindung zu Skandinavien bestimmen das kulturelle Leben.',
  seasonalTraditions: [
    {
      season: 'Frühjahr',
      description: 'Das traditionelle Biikebrennen auf den nordfriesischen Inseln, maritime Frühlingsfeste und der Start der Krabbensaison beleben die Küstenregion.'
    },
    {
      season: 'Sommer',
      description: 'Die weltberühmte Kieler Woche, internationale Segelregatten und traditionelle Hafenfeste prägen den Sommer an Nord- und Ostsee.'
    },
    {
      season: 'Herbst',
      description: 'Traditionelle Krabbentage, das Dithmarscher Kohlfest und historische Herbstmärkte in den Hansestädten bestimmen die herbstliche Festkultur.'
    },
    {
      season: 'Winter',
      description: 'Der UNESCO-Welterbe Lübecker Weihnachtsmarkt, maritime Winterfeste und das traditionelle Grünkohlessen prägen die Adventszeit.'
    }
  ],
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist ein bundesweiter gesetzlicher Feiertag.`
      }
    })),
    ...holidays.publicHolidays["2025"]["SH"].map(holiday => ({
      ...holiday,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Schleswig-Holstein ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: [
    ...holidays.schoolHolidays["2025"]["SH"]
  ]
}; 