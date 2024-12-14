import { StateInfo } from '../../types/StateInfo';
import { commonHolidays } from '../commonHolidays';
import { getStateHolidays } from '../../utils/getStateHolidays';

const stateSpecificDescriptions: Record<string, string> = {
  "Reformationstag": "Der Reformationstag erinnert an die Veröffentlichung der 95 Thesen Martin Luthers und ist in Brandenburg ein gesetzlicher Feiertag."
};

const getHolidaysForYear = (year: number) => {
  const stateHolidays = getStateHolidays('BB', year).map(holiday => ({
    ...holiday,
    description: stateSpecificDescriptions[holiday.name] || `${holiday.name} ist in Brandenburg ein gesetzlicher Feiertag.`
  }));

  return [...commonHolidays[year], ...stateHolidays];
};

export const brandenburg: StateInfo = {
  name: "Brandenburg",
  shortName: "BB",
  holidays: {
    2024: getHolidaysForYear(2024),
    2025: getHolidaysForYear(2025),
    2026: getHolidaysForYear(2026)
  },
  themeColor: "#FF0000",
  description: "Brandenburg ist ein Bundesland im Osten Deutschlands. Die Landeshauptstadt ist Potsdam. Brandenburg umgibt vollständig das Bundesland Berlin und grenzt im Norden an Mecklenburg-Vorpommern, im Osten an Polen, im Süden an Sachsen und im Westen an Sachsen-Anhalt."
}; 