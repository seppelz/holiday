import { Holiday, BridgeDay } from '../types/holiday';
import { addDays, isWeekend, isSameDay, isWithinInterval, subDays, getDay, differenceInDays, eachDayOfInterval } from 'date-fns';
import { GermanState } from '../types/germanState';

type CombinationPattern = {
  pattern: string;
  weight: number;
  description: string;
}

const COMBINATION_PATTERNS: CombinationPattern[] = [
  {
    pattern: 'HOLIDAY_BRIDGE_WEEKEND',
    weight: 3.0,
    description: 'Brückentag verbindet Feiertag mit Wochenende'
  },
  {
    pattern: 'HOLIDAY_BRIDGE_HOLIDAY',
    weight: 4.0,
    description: 'Brückentag zwischen zwei Feiertagen'
  },
  {
    pattern: 'WEEKEND_BRIDGE_HOLIDAY',
    weight: 3.0,
    description: 'Brückentag verbindet Wochenende mit Feiertag'
  },
  {
    pattern: 'HOLIDAY_BRIDGE_NORMAL',
    weight: 2.0,
    description: 'Einzelner Brückentag nach Feiertag'
  }
];

const SEASONAL_FACTORS = {
  SUMMER_PEAK: {
    months: [7, 8],
    factor: 0.7,
    description: 'Hauptsaison'
  },
  WINTER_HOLIDAYS: {
    months: [12, 1],
    factor: 0.8,
    description: 'Winterferien'
  },
  SHOULDER_SEASON: {
    months: [5, 6, 9],
    factor: 1.3,
    description: 'Optimale Reisezeit'
  },
  OFF_PEAK: {
    months: [2, 3, 4, 10, 11],
    factor: 1.2,
    description: 'Nebensaison'
  }
};

// Helper function to find a holiday on a specific date
const findHolidayOnDate = (date: Date, holidays: Holiday[]): Holiday | undefined => {
  return holidays.find(h => h.type === 'public' && isSameDay(h.date, date));
};

// Helper function to find connected free days
const findConnectedFreeDays = (
  date: Date,
  direction: 'forward' | 'backward',
  holidays: Holiday[]
): { dates: Date[]; holidays: Holiday[] } => {
  const dates: Date[] = [];
  const connectedHolidays: Holiday[] = [];
  let currentDate = date;

  for (let i = 0; i < 5; i++) {
    currentDate = direction === 'forward' ? addDays(currentDate, 1) : subDays(currentDate, 1);
    
    // Check if it's a weekend
    if (isWeekend(currentDate)) {
      dates.push(currentDate);
      continue;
    }

    // Check if it's a holiday
    const holiday = holidays.find(h => isSameDay(h.date, currentDate));
    if (holiday) {
      dates.push(currentDate);
      connectedHolidays.push(holiday);
      continue;
    }

    // If we hit a regular workday, stop looking
    break;
  }

  return {
    dates: direction === 'forward' ? dates : dates.reverse(),
    holidays: connectedHolidays
  };
};

// Calculate workdays needed between two dates
const calculateWorkdays = (startDate: Date, endDate: Date, holidays: Holiday[]): number => {
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  return days.filter(day => {
    if (isWeekend(day)) return false;
    if (holidays.some(h => isSameDay(h.date, day))) return false;
    return true;
  }).length;
};

// Helper function to get seasonal factor
const getSeasonalFactor = (date: Date): number => {
  const month = date.getMonth() + 1; // JavaScript months are 0-based
  
  for (const season of Object.values(SEASONAL_FACTORS)) {
    if (season.months.includes(month)) {
      return season.factor;
    }
  }
  return 1.0; // Default factor if no season matches
};

export const bridgeDayService = {
  calculateBridgeDays(holidays: Holiday[], state: GermanState): BridgeDay[] {
    const bridgeDays: BridgeDay[] = [];
    
    // Filter holidays to only include public holidays for 2025
    const publicHolidays = holidays.filter(h => {
      const holidayDate = new Date(h.date);
      return h.type === 'public' && 
             h.state === state &&
             holidayDate.getFullYear() === 2025;
    }).map(h => ({
      ...h,
      date: new Date(h.date)
    }));

    // Process each public holiday that's not on a weekend
    for (const holiday of publicHolidays.filter(h => !isWeekend(h.date))) {
      // Check days before holiday
      for (let i = 1; i <= 2; i++) {
        const bridgeDate = subDays(holiday.date, i);
        if (isWeekend(bridgeDate) || findHolidayOnDate(bridgeDate, publicHolidays)) continue;

        // Find connected free days
        const before = findConnectedFreeDays(bridgeDate, 'backward', publicHolidays);
        const after = findConnectedFreeDays(bridgeDate, 'forward', publicHolidays);

        // Calculate period
        const allDates = [...before.dates, bridgeDate, ...after.dates];
        const allHolidays = [...before.holidays, ...after.holidays];
        
        const periodStart = before.dates.length > 0 ? before.dates[before.dates.length - 1] : bridgeDate;
        const periodEnd = after.dates.length > 0 ? after.dates[after.dates.length - 1] : holiday.date;

        // Calculate workdays needed
        const requiredDays = i;
        const totalDaysOff = differenceInDays(periodEnd, periodStart) + 1;

        // Determine pattern
        let pattern = COMBINATION_PATTERNS.find(p => p.pattern === 'HOLIDAY_BRIDGE_NORMAL');
        if (before.holidays.length > 0 && after.holidays.length > 0) {
          pattern = COMBINATION_PATTERNS.find(p => p.pattern === 'HOLIDAY_BRIDGE_HOLIDAY');
        } else if (before.dates.some(isWeekend) && after.holidays.length > 0) {
          pattern = COMBINATION_PATTERNS.find(p => p.pattern === 'WEEKEND_BRIDGE_HOLIDAY');
        } else if (before.holidays.length > 0 && after.dates.some(isWeekend)) {
          pattern = COMBINATION_PATTERNS.find(p => p.pattern === 'HOLIDAY_BRIDGE_WEEKEND');
        }

        if (pattern) {
          const seasonalFactor = getSeasonalFactor(bridgeDate);
          const efficiency = (totalDaysOff / requiredDays) * pattern.weight * seasonalFactor;

          bridgeDays.push({
            date: bridgeDate,
            name: pattern.description,
            type: 'bridge',
            state,
            connectedHolidays: allHolidays,
            requiredVacationDays: requiredDays,
            totalDaysOff,
            efficiency,
            pattern: pattern.pattern,
            periodStart,
            periodEnd
          });
        }
      }

      // Check days after holiday (similar logic)
      for (let i = 1; i <= 2; i++) {
        const bridgeDate = addDays(holiday.date, i);
        if (isWeekend(bridgeDate) || findHolidayOnDate(bridgeDate, publicHolidays)) continue;

        const before = findConnectedFreeDays(bridgeDate, 'backward', publicHolidays);
        const after = findConnectedFreeDays(bridgeDate, 'forward', publicHolidays);

        const allDates = [...before.dates, bridgeDate, ...after.dates];
        const allHolidays = [...before.holidays, ...after.holidays];
        
        const periodStart = holiday.date;
        const periodEnd = after.dates.length > 0 ? after.dates[after.dates.length - 1] : bridgeDate;

        const requiredDays = i;
        const totalDaysOff = differenceInDays(periodEnd, periodStart) + 1;

        let pattern = COMBINATION_PATTERNS.find(p => p.pattern === 'HOLIDAY_BRIDGE_NORMAL');
        if (before.holidays.length > 0 && after.holidays.length > 0) {
          pattern = COMBINATION_PATTERNS.find(p => p.pattern === 'HOLIDAY_BRIDGE_HOLIDAY');
        } else if (before.dates.some(isWeekend) && after.holidays.length > 0) {
          pattern = COMBINATION_PATTERNS.find(p => p.pattern === 'WEEKEND_BRIDGE_HOLIDAY');
        } else if (before.holidays.length > 0 && after.dates.some(isWeekend)) {
          pattern = COMBINATION_PATTERNS.find(p => p.pattern === 'HOLIDAY_BRIDGE_WEEKEND');
        }

        if (pattern) {
          const seasonalFactor = getSeasonalFactor(bridgeDate);
          const efficiency = (totalDaysOff / requiredDays) * pattern.weight * seasonalFactor;

          bridgeDays.push({
            date: bridgeDate,
            name: pattern.description,
            type: 'bridge',
            state,
            connectedHolidays: allHolidays,
            requiredVacationDays: requiredDays,
            totalDaysOff,
            efficiency,
            pattern: pattern.pattern,
            periodStart,
            periodEnd
          });
        }
      }
    }

    // Sort by date and remove duplicates
    return bridgeDays
      .sort((a, b) => {
        const dateCompare = a.date.getTime() - b.date.getTime();
        if (dateCompare !== 0) return dateCompare;
        // If same date, prefer the one with better efficiency
        return b.efficiency - a.efficiency;
      })
      .filter((bridgeDay, index, self) => 
        index === self.findIndex(bd => 
          isSameDay(bd.date, bridgeDay.date) &&
          isSameDay(bd.periodStart, bridgeDay.periodStart) &&
          isSameDay(bd.periodEnd, bridgeDay.periodEnd)
        )
      );
  }
}; 