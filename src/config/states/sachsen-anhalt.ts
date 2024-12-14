import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '../types/Holiday';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string }> = {
  "Neujahr": {
    description: 'Sachsen-Anhalt startet das neue Jahr mit besonderen Traditionen in den historischen Städten.',
    traditions: ['Neujahrskonzert im Magdeburger Dom', 'Feuerwerk über der Altstadt von Quedlinburg', 'Neujahrswanderungen im Harz'],
    culturalSignificance: 'Verbindung von mittelalterlichem Erbe mit modernen Feierlichkeiten'
  },
  "Heilige Drei Könige": {
    description: 'In Sachsen-Anhalt wird das Dreikönigsfest besonders in den historischen Kirchen und Lutherstädten gefeiert.',
    traditions: ['Sternsinger in den UNESCO-Welterbestädten', 'Festliche Gottesdienste', 'Historische Prozessionen'],
    culturalSignificance: 'Verbindung von Reformation und christlicher Tradition'
  },
  "Reformationstag": {
    description: 'Als Ursprungsland der Reformation feiert Sachsen-Anhalt den Reformationstag mit besonderer Bedeutung.',
    traditions: ['Festgottesdienste in der Schlosskirche Wittenberg', 'Historische Festumzüge', 'Lutherfestspiele'],
    culturalSignificance: 'Zentrum der protestantischen Reformation und ihrer Geschichte'
  },
  "Tag der Deutschen Einheit": {
    description: 'Der Tag der Deutschen Einheit hat für Sachsen-Anhalt als ostdeutsches Bundesland besondere Bedeutung.',
    traditions: ['Bürgerfeste in Magdeburg', 'Kulturelle Veranstaltungen', 'Friedensgebete'],
    culturalSignificance: 'Symbol für die friedliche Revolution und Wiedervereinigung'
  }
};

export const sachsenAnhalt: StateInfo = {
  fullName: 'Sachsen-Anhalt',
  shortName: 'ST',
  capital: 'Magdeburg',
  description: 'Sachsen-Anhalt, das Land der Reformation und frühen Industrialisierung, verbindet historisches Erbe mit moderner Entwicklung. Die UNESCO-Welterbestätten, die Lutherstätten und die Industriekultur prägen das kulturelle Leben.',
  culturalHighlights: [
    'UNESCO-Weltkulturerbe Lutherstätten',
    'Bauhaus-Erbe in Dessau',
    'Historische Altstadt Quedlinburg',
    'Magdeburger Dom',
    'Industriekultur und Bergbautradition',
    'Traditionelle mitteldeutsche Küche'
  ],
  keyFacts: {
    population: '2,2 Millionen (2021)',
    area: '20.452 km²',
    founded: '1990 (Neugründung)',
    economicStrength: [
      'Chemische Industrie',
      'Maschinenbau und Logistik',
      'Erneuerbare Energien'
    ]
  },
  uniqueHolidayInfo: 'Als Ursprungsland der Reformation feiert Sachsen-Anhalt den Reformationstag mit besonderer Bedeutung. Die Feiertage verbinden reformatorisches Erbe mit regionaler Festkultur.',
  traditionInfo: 'Die Traditionen sind geprägt von der Reformationsgeschichte, dem UNESCO-Welterbe und dem industriellen Erbe. Die Lutherstädte, das Bauhaus-Erbe und die protestantische Kultur bestimmen das kulturelle Leben.',
  seasonalTraditions: [
    {
      season: 'Frühjahr',
      description: 'Traditionelle Osterbräuche und Frühlingsfeste in den UNESCO-Welterbestädten. Die Lutherstädte feiern besondere Reformationsfeste und Frühlingsveranstaltungen.'
    },
    {
      season: 'Sommer',
      description: 'Das Bauhaus-Fest in Dessau, internationale Kulturfestivals und historische Stadtfeste prägen den Sommer in Sachsen-Anhalt.'
    },
    {
      season: 'Herbst',
      description: 'Der Reformationstag als Höhepunkt des Jahres, traditionelle Erntedankfeste und UNESCO-Welterbefeste bestimmen die herbstliche Festkultur.'
    },
    {
      season: 'Winter',
      description: 'Die historischen Weihnachtsmärkte in Magdeburg, Halle und Quedlinburg sowie mittelalterliche Winterfeste prägen die Adventszeit.'
    }
  ],
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      ...holiday,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist ein bundesweiter gesetzlicher Feiertag.`
      }
    })),
    ...holidays.publicHolidays["2025"]["ST"].map(holiday => ({
      ...holiday,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Sachsen-Anhalt ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: [
    ...holidays.schoolHolidays["2025"]["ST"]
  ]
}; 