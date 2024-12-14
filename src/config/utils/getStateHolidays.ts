import { holidays } from '../../data/holidays';
import { Holiday, RawPublicHoliday } from '../../types/Holiday';
import { GermanState } from '../../types/GermanState';

export function getStateHolidays(state: GermanState, year: number): Holiday[] {
  const stateHolidays = holidays.publicHolidays[year]?.[state] || [];
  
  return stateHolidays.map((holiday: RawPublicHoliday) => ({
    name: holiday.name,
    date: holiday.start,
    type: "public",
    details: {
      description: "" // State-specific descriptions will be added in state files
    },
    nationwide: false
  }));
} 