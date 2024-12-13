interface StateInfo {
  name: string;
  totalHolidays: number;
  uniqueHolidays: number;
  comparison: string;
  uniqueHolidayAnswer: string;
  comparisonAnswer: string;
  traditionAnswer: string;
  bridgeDayInfo: string;
  businessHoursInfo: string;
  seasonalTraditions: {
    season: string;
    description: string;
  }[];
}

export const stateData: Record<string, StateInfo> = {
  'baden-wuerttemberg': {
    name: 'Baden-Württemberg',
    totalHolidays: 12,
    uniqueHolidays: 3,
    comparison: 'eine der großzügigsten Feiertagsregelungen in Deutschland',
    uniqueHolidayAnswer: 'Baden-Württemberg zeichnet sich durch seine besonderen katholisch geprägten Feiertage aus: Fronleichnam mit seinen traditionellen Blumenteppichen und Prozessionen, Allerheiligen mit seiner tief verwurzelten Gedenkkultur, sowie die regionalen Fastnachtsbräuche, die zwar kein offizieller Feiertag sind, aber das kulturelle Leben stark prägen.',
    comparisonAnswer: 'Baden-Württemberg hebt sich durch seine einzigartige Mischung aus katholischen und protestantischen Feiertagen von anderen Bundesländern ab. Mit 12 gesetzlichen Feiertagen gehört es zu den Spitzenreitern in Deutschland. Besonders die Verbindung von religiösen Festen mit lokalen Traditionen, wie die aufwändigen Fronleichnamsprozessionen, sind charakteristisch für das Land.',
    traditionAnswer: 'Die Feiertage in Baden-Württemberg sind reich an lokalen Traditionen: Zu Fronleichnam werden in vielen Gemeinden kunstvolle Blumenteppiche gelegt, an Allerheiligen gibt es besondere Gedenkfeiern mit Gräbersegnung, und die "Schwäbisch-Alemannische Fastnacht" bringt einzigartige Bräuche wie das "Häs"-Tragen und die "Narrensprünge" mit sich.',
    bridgeDayInfo: 'Besonders effektiv sind Brückentage um Fronleichnam (Mai/Juni) und Allerheiligen (1. November). Mit einem Brückentag zwischen Fronleichnam (Donnerstag) und Wochenende ergibt sich ein 4-Tage-Wochenende.',
    businessHoursInfo: 'An gesetzlichen Feiertagen bleiben Geschäfte geschlossen. In der Vorweihnachtszeit und an verkaufsoffenen Sonntagen gibt es besondere Öffnungszeiten. Tankstellen, Bahnhofshops und bestimmte Bäckereien dürfen auch an Feiertagen öffnen.',
    seasonalTraditions: [
      {
        season: 'Frühjahr',
        description: 'Die Fastenzeit wird mit der Schwäbisch-Alemannischen Fastnacht eingeleitet. Ostern und Fronleichnam werden mit aufwändigen Prozessionen und Bräuchen gefeiert.'
      },
      {
        season: 'Sommer',
        description: 'Zahlreiche Stadtfeste und traditionelle Kirchweihfeste ("Kirbe") prägen die Sommermonate. Besonders die Weinfeste in den Weinbauregionen sind Publikumsmagnete.'
      },
      {
        season: 'Herbst',
        description: 'Erntedankfeste und Allerheiligen sind wichtige Herbstfeiertage. Die Weinlese wird mit traditionellen Festen gefeiert, und viele Gemeinden veranstalten Herbstmärkte.'
      },
      {
        season: 'Winter',
        description: 'Die Adventszeit wird mit stimmungsvollen Weihnachtsmärkten gefeiert. Heilige Drei Könige markiert den Jahresbeginn mit dem traditionellen Sternsingen.'
      }
    ]
  },
  'bayern': {
    name: 'Bayern',
    totalHolidays: 13,
    uniqueHolidays: 4,
    comparison: 'die meisten gesetzlichen Feiertage aller Bundesländer',
    uniqueHolidayAnswer: 'Bayern hat einige besondere regionale Feiertage: Mariä Himmelfahrt (15. August) wird in katholisch geprägten Gemeinden mit der Tradition der Kräuterweihe gefeiert. Zudem gibt es regionale Feiertage wie das Friedensfest in Augsburg (8. August) und besondere Bräuche an Fronleichnam.',
    comparisonAnswer: 'Bayern ist mit 13 gesetzlichen Feiertagen das Bundesland mit den meisten Feiertagen in Deutschland. Besonders die starke katholische Prägung zeigt sich in Feiertagen wie Mariä Himmelfahrt, der nur in überwiegend katholischen Gemeinden gilt.',
    traditionAnswer: 'Bayerische Feiertage sind bekannt für ihre lebendigen Traditionen: Die Kräuterweihe an Mariä Himmelfahrt, prachtvolle Fronleichnamsprozessionen, das einzigartige Augsburger Friedensfest und die berühmten Weihnachtsmärkte prägen das kulturelle Leben.',
    bridgeDayInfo: 'Strategisch günstige Brückentage ergeben sich besonders um Fronleichnam und Mariä Himmelfahrt. In Jahren, in denen diese Feiertage auf einen Donnerstag fallen, lässt sich mit einem Brückentag ein verlängertes Wochenende gestalten.',
    businessHoursInfo: 'Die Ladenöffnungszeiten sind an Feiertagen streng geregelt. In Tourismusgebieten und an Bahnhöfen gelten Sonderregelungen. An Mariä Himmelfahrt sind die Öffnungszeiten je nach religiöser Prägung der Gemeinde unterschiedlich.',
    seasonalTraditions: [
      {
        season: 'Frühjahr',
        description: 'Die Fastenzeit beginnt mit traditionellen Fastnachtsbräuchen. Ostern wird mit regionalen Traditionen wie dem Osterbrunnen-Schmücken in der Fränkischen Schweiz gefeiert.'
      },
      {
        season: 'Sommer',
        description: 'Fronleichnamsprozessionen und das Augsburger Friedensfest sind Höhepunkte. An Mariä Himmelfahrt werden in vielen Gemeinden Kräuterbuschen geweiht.'
      },
      {
        season: 'Herbst',
        description: 'Die Zeit ist geprägt von Erntedankfesten und traditionellen Kirchweihfeiern ("Kirwa"). Volksfeste wie das Oktoberfest sind wichtige kulturelle Ereignisse.'
      },
      {
        season: 'Winter',
        description: 'Die Adventszeit wird mit berühmten Christkindlmärkten gefeiert. An Heilige Drei Könige ziehen die Sternsinger durch die Straßen.'
      }
    ]
  }
  // Additional states can be added here
}; 