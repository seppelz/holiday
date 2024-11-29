import {
  addDays,
  subDays,
  isWeekend,
  parseISO,
  differenceInDays,
  getDay,
} from 'date-fns';
import { Holiday, BridgeDay, GermanState } from '../types/holiday';

export const bridgeDayService = {
  calculateBridgeDays(holidays: Holiday[], region?: GermanState): BridgeDay[] {
    if (holidays.length === 0) return [];

    // Filter holidays based on region
    const relevantHolidays = holidays.filter(h => 
      h.type === 'public' || // Always include public holidays
      (h.type === 'regional' && h.region === region) // Include matching regional holidays
    );

    if (relevantHolidays.length === 0) return [];

    // Create a map of holidays for quick lookup
    const holidayMap = new Map<string, Holiday>();
    relevantHolidays.forEach(h => {
      const date = typeof h.date === 'string' ? parseISO(h.date) : h.date;
      holidayMap.set(date.toDateString(), h);
    });

    // Check if holidays are too far apart
    const sortedHolidays = [...relevantHolidays].sort((a, b) => {
      const dateA = typeof a.date === 'string' ? parseISO(a.date) : a.date;
      const dateB = typeof b.date === 'string' ? parseISO(b.date) : b.date;
      return dateA.getTime() - dateB.getTime();
    });

    for (let i = 1; i < sortedHolidays.length; i++) {
      const prevDate = sortedHolidays[i - 1].date;
      const currDate = sortedHolidays[i].date;
      const daysBetween = Math.abs(differenceInDays(currDate, prevDate));
      if (daysBetween > 7) {
        return []; // Holidays are too far apart, no bridge days possible
      }
    }

    // First pass: collect all potential bridge days
    const potentialBridgeDays: BridgeDay[] = [];

    // Process each holiday
    for (const holiday of relevantHolidays) {
      const holidayDate = typeof holiday.date === 'string' ? parseISO(holiday.date) : holiday.date;
      const weekday = getDay(holidayDate);

      // Thursday holiday -> Friday bridge day
      if (weekday === 4) {
        const bridgeDate = addDays(holidayDate, 1);
        if (!isWeekend(bridgeDate) && !holidayMap.has(bridgeDate.toDateString())) {
          potentialBridgeDays.push({
            date: bridgeDate,
            name: `Brückentag nach ${holiday.name}`,
            type: 'bridge',
            region: holiday.region,
            connectedHolidays: [holiday],
            requiredVacationDays: 1,
            totalDaysOff: 4, // Thu-Sun
            efficiency: 4,
          });
        }
      }

      // Monday holiday -> Tuesday bridge day
      if (weekday === 1) {
        const bridgeDate = addDays(holidayDate, 1);
        if (!isWeekend(bridgeDate) && !holidayMap.has(bridgeDate.toDateString())) {
          potentialBridgeDays.push({
            date: bridgeDate,
            name: `Brückentag nach ${holiday.name}`,
            type: 'bridge',
            region: holiday.region,
            connectedHolidays: [holiday],
            requiredVacationDays: 1,
            totalDaysOff: 4, // Sat-Tue
            efficiency: 4,
          });
        }
      }

      // Wednesday holiday -> Monday/Tuesday and Thursday/Friday bridge days
      if (weekday === 3) {
        // Monday/Tuesday before the holiday
        const mondayDate = subDays(holidayDate, 2);
        if (!holidayMap.has(mondayDate.toDateString())) {
          potentialBridgeDays.push({
            date: mondayDate,
            name: `Brückentage vor ${holiday.name}`,
            type: 'bridge',
            region: holiday.region,
            connectedHolidays: [holiday],
            requiredVacationDays: 2,
            totalDaysOff: 5, // Mon-Fri
            efficiency: 2.5,
          });
        }

        // Thursday/Friday after the holiday
        const thursdayDate = addDays(holidayDate, 1);
        if (!holidayMap.has(thursdayDate.toDateString())) {
          potentialBridgeDays.push({
            date: thursdayDate,
            name: `Brückentage nach ${holiday.name}`,
            type: 'bridge',
            region: holiday.region,
            connectedHolidays: [holiday],
            requiredVacationDays: 2,
            totalDaysOff: 5, // Wed-Sun
            efficiency: 2.5,
          });
        }
      }
    }

    // Second pass: merge connected bridge days
    const mergedBridgeDays: BridgeDay[] = [];
    let currentBridgeDay: BridgeDay | null = null;

    // Sort bridge days by date
    potentialBridgeDays.sort((a, b) => a.date.getTime() - b.date.getTime());

    for (const bridgeDay of potentialBridgeDays) {
      if (!currentBridgeDay) {
        currentBridgeDay = bridgeDay;
        continue;
      }

      const daysBetween = differenceInDays(bridgeDay.date, currentBridgeDay.date);
      
      // Only merge if they're connected and not from the same holiday
      const sameHoliday = currentBridgeDay.connectedHolidays.some(h1 => 
        bridgeDay.connectedHolidays.some(h2 => 
          h1.date.getTime() === h2.date.getTime()
        )
      );

      const shouldMerge = daysBetween <= 4 && !sameHoliday;

      if (shouldMerge) {
        // Merge bridge days
        currentBridgeDay = {
          ...currentBridgeDay,
          name: `${currentBridgeDay.name} und ${bridgeDay.name}`,
          connectedHolidays: [...currentBridgeDay.connectedHolidays, ...bridgeDay.connectedHolidays],
          requiredVacationDays: Math.min(currentBridgeDay.requiredVacationDays, bridgeDay.requiredVacationDays),
          totalDaysOff: 6, // Extended period (e.g., Thu-Tue)
          efficiency: 6,
        };
      } else {
        mergedBridgeDays.push(currentBridgeDay);
        currentBridgeDay = bridgeDay;
      }
    }

    if (currentBridgeDay) {
      mergedBridgeDays.push(currentBridgeDay);
    }

    return mergedBridgeDays;
  }
}; 