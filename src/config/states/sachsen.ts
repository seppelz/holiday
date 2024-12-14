import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string }> = {
  "Neujahr": {
    description: 'Sachsen begrüßt das neue Jahr mit traditionellen Feierlichkeiten und regionalen Bräuchen.',
    traditions: ['Neujahrskonzert in der Semperoper', 'Feuerwerk über der Dresdner Altstadt', 'Neujahrswanderungen im Erzgebirge'],
    culturalSignificance: 'Verbindung von sächsischer Tradition mit festlicher Moderne'
  },
  "Buß- und Bettag": {
    description: 'Als einziges Bundesland behält Sachsen den Buß- und Bettag als gesetzlichen Feiertag bei.',
    traditions: ['Besondere Gottesdienste in der Frauenkirche', 'Ökumenische Andachten', 'Friedensgebete'],
    culturalSignificance: 'Tag der protestantischen Tradition und gesellschaftlichen Reflexion'
  },
  "Fronleichnam": {
    description: 'Das Fronleichnamsfest wird in Sachsen besonders in den katholisch geprägten Regionen feierlich begangen.',
    traditions: ['Prozessionen in der Lausitz', 'Festgottesdienste', 'Gemeinsame Feiern'],
    culturalSignificance: 'Ausdruck katholischer Tradition in Sachsen'
  },
  "Heilige Drei Könige": {
    description: 'In Sachsen wird das Dreikönigsfest mit besonderen Traditionen im Erzgebirge gefeiert.',
    traditions: ['Sternsinger-Umzüge', 'Traditionelle Bergparaden', 'Kirchliche Feiern'],
    culturalSignificance: 'Verbindung von Bergbautradition und christlichem Brauchtum'
  }
};

export const sachsen: StateInfo = {
  fullName: 'Sachsen',
  shortName: 'SN',
  capital: 'Dresden',
  description: 'Sachsen, das Kulturland im Osten Deutschlands, verbindet reiche Geschichte mit moderner Innovation. Die historischen Residenzstädte, die Industriekultur und die lebendigen Traditionen prägen das kulturelle Leben.',
  culturalHighlights: [
    'UNESCO-Weltkulturerbe Dresdner Altstadt',
    'Leipziger Musikgeschichte',
    'Erzgebirgische Volkskunst',
    'Meißner Porzellanmanufaktur',
    'Industriekultur und Bergbautradition',
    'Sächsische Küche und Braukunst'
  ],
  keyFacts: {
    population: '4,0 Millionen (2021)',
    area: '18.450 km²',
    founded: '1990 (Neugründung)',
    economicStrength: [
      'Automobilindustrie und Maschinenbau',
      'Mikroelektronik und IT',
      'Innovative Technologieregion'
    ]
  },
  uniqueHolidayInfo: 'Sachsen ist das einzige Bundesland, das den Buß- und Bettag als gesetzlichen Feiertag beibehält. Die Feiertage verbinden protestantische Tradition mit regionaler Festkultur.',
  traditionInfo: 'Die sächsischen Traditionen sind geprägt von Handwerk, Bergbau und Kultur. Die weltberühmte Weihnachtstradition des Erzgebirges, die Volkskunst und die Musikkultur bestimmen das kulturelle Leben.',
  seasonalTraditions: [
    {
      season: 'Frühjahr',
      description: 'Traditionelle Osterbräuche im Erzgebirge, die Leipziger Buchmesse und zahlreiche Frühlingsfeste beleben die Region.'
    },
    {
      season: 'Sommer',
      description: 'Stadtfeste wie die Dresdner Schlössernacht, Musikfestivals und Open-Air-Veranstaltungen prägen den sächsischen Sommer.'
    },
    {
      season: 'Herbst',
      description: 'Erntedankfeste, der Tag der Sachsen und traditionelle Herbstmärkte bestimmen die herbstliche Festkultur.'
    },
    {
      season: 'Winter',
      description: 'Der Dresdner Striezelmarkt als ältester Weihnachtsmarkt Deutschlands und die erzgebirgische Weihnachtstradition prägen die Adventszeit.'
    }
  ],
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist ein bundesweiter gesetzlicher Feiertag.`
      }
    })),
    ...holidays.publicHolidays["2025"]["SN"].map(holiday => ({
      ...holiday,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Sachsen ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: [
    ...holidays.schoolHolidays["2025"]["SN"]
  ]
}; 