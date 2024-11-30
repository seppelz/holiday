import { Holiday, BridgeDay } from '../types/holiday';
import { addDays, isWeekend, isSameDay, isWithinInterval } from 'date-fns';
import { GermanState } from '../types/germanState';

export const bridgeDayService = {
  calculateBridgeDays(holidays: Holiday[], state: GermanState): BridgeDay[] {
    const bridgeDays: BridgeDay[] = [];
    const publicHolidays = holidays.filter(h => h.type === 'public' && h.state === state);
    const schoolHolidays = holidays.filter(h => h.type === 'regional' && h.state === state);

    // Helper function to check if a date is within any school holiday period
    const isSchoolHoliday = (date: Date) => {
      return schoolHolidays.some(holiday => 
        holiday.endDate && 
        isWithinInterval(date, { start: holiday.date, end: holiday.endDate })
      );
    };

    // Helper function to check if a date is the start of school holidays
    const isSchoolHolidayStart = (date: Date) => {
      return schoolHolidays.some(holiday => 
        isSameDay(holiday.date, date)
      );
    };

    // Helper function to check if a date is next to a public holiday
    const isNextToPublicHoliday = (date: Date) => {
      return publicHolidays.some(holiday => {
        const dayAfterHoliday = addDays(holiday.date, 1);
        return isSameDay(date, dayAfterHoliday);
      });
    };

    // Check each day after public holidays
    for (const holiday of publicHolidays) {
      const nextDay = addDays(holiday.date, 1);
      const nextNextDay = addDays(holiday.date, 2);

      // Skip if the holiday itself is during school holidays
      if (isSchoolHoliday(holiday.date)) {
        continue;
      }

      // Skip if next day is during school holidays
      if (isSchoolHoliday(nextDay)) {
        continue;
      }

      // Skip if next day is a public holiday
      if (publicHolidays.some(h => isSameDay(h.date, nextDay))) {
        continue;
      }

      // Skip if next day is a weekend
      if (isWeekend(nextDay)) {
        continue;
      }

      // Check if the next next day is either:
      // 1. A weekend
      // 2. The start of school holidays
      // 3. Another public holiday
      if (isWeekend(nextNextDay) || 
          isSchoolHolidayStart(nextNextDay) ||
          publicHolidays.some(h => isSameDay(h.date, nextNextDay))) {
        
        // Skip if the next next day is during school holidays
        if (isSchoolHoliday(nextNextDay)) {
          continue;
        }

        // Skip if the next next day is a school holiday start but also during school holidays
        if (isSchoolHolidayStart(nextNextDay) && isSchoolHoliday(nextNextDay)) {
          continue;
        }

        // Skip if the next next day is a weekend and the next day is during school holidays
        if (isWeekend(nextNextDay) && isSchoolHoliday(nextDay)) {
          continue;
        }

        bridgeDays.push({
          date: nextDay,
          name: 'Brückentag',
          type: 'bridge',
          state: state,
          connectedHolidays: [holiday],
          requiredVacationDays: 1,
          totalDaysOff: 4,
          efficiency: 4
        });
      }
    }

    return bridgeDays;
  }
}; 