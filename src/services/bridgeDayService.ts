import { Holiday, BridgeDay } from '../types/holiday';
import { addDays, isWeekend, isSameDay, isWithinInterval, subDays, getDay } from 'date-fns';
import { GermanState } from '../types/germanState';
import { parseDateString } from '../utils/dateUtils';

type CombinationPattern = {
  pattern: string;
  weight: number;
  description: string;
}

const COMBINATION_PATTERNS: CombinationPattern[] = [
  {
    pattern: 'HOLIDAY_BRIDGE_WEEKEND',
    weight: 4.0,
    description: 'Brückentag verbindet Feiertag mit Wochenende'
  },
  {
    pattern: 'HOLIDAY_BRIDGE_HOLIDAY',
    weight: 3.5,
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
    factor: 0.8,
    description: 'Hauptsaison'
  },
  WINTER_HOLIDAYS: {
    months: [12],
    factor: 0.9,
    description: 'Winterferien'
  },
  SHOULDER_SEASON: {
    months: [5, 6, 9],
    factor: 1.2,
    description: 'Optimale Reisezeit'
  },
  OFF_PEAK: {
    months: [1, 2, 3, 4, 10, 11],
    factor: 1.1,
    description: 'Nebensaison'
  }
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

    // Helper function to check if a date is a public holiday
    const isPublicHoliday = (date: Date) => {
      return publicHolidays.some(holiday => isSameDay(date, holiday.date));
    };

    // Helper function to get the holiday object for a date
    const getHoliday = (date: Date): Holiday | undefined => {
      return publicHolidays.find(holiday => isSameDay(date, holiday.date));
    };

    // Helper function to determine pattern and calculate efficiency
    const analyzeBridgeDay = (
      beforeDate: Date,
      bridgeDate: Date,
      afterDate: Date,
      publicHolidays: Holiday[]
    ): { pattern: CombinationPattern; totalDaysOff: number; connectedHolidays: Holiday[] } | null => {
      const beforeHoliday = getHoliday(beforeDate);
      const afterHoliday = getHoliday(afterDate);
      const isBeforeWeekend = isWeekend(beforeDate);
      const isAfterWeekend = isWeekend(afterDate);
      const isBeforeHoliday = !!beforeHoliday;
      const isAfterHoliday = !!afterHoliday;
      
      let pattern: CombinationPattern | undefined;
      const connectedHolidays: Holiday[] = [];
      let totalDaysOff = 1; // Bridge day itself

      // HOLIDAY_BRIDGE_WEEKEND: Holiday -> Bridge -> Weekend
      if (isBeforeHoliday && isAfterWeekend) {
        pattern = COMBINATION_PATTERNS.find(p => p.pattern === 'HOLIDAY_BRIDGE_WEEKEND');
        if (beforeHoliday) connectedHolidays.push(beforeHoliday);
        totalDaysOff = 4; // Holiday + Bridge + Weekend
      }
      // WEEKEND_BRIDGE_HOLIDAY: Weekend -> Bridge -> Holiday
      else if (isBeforeWeekend && isAfterHoliday) {
        pattern = COMBINATION_PATTERNS.find(p => p.pattern === 'WEEKEND_BRIDGE_HOLIDAY');
        if (afterHoliday) connectedHolidays.push(afterHoliday);
        totalDaysOff = 4; // Weekend + Bridge + Holiday
      }
      // HOLIDAY_BRIDGE_HOLIDAY: Holiday -> Bridge -> Holiday
      else if (isBeforeHoliday && isAfterHoliday) {
        pattern = COMBINATION_PATTERNS.find(p => p.pattern === 'HOLIDAY_BRIDGE_HOLIDAY');
        if (beforeHoliday) connectedHolidays.push(beforeHoliday);
        if (afterHoliday) connectedHolidays.push(afterHoliday);
        totalDaysOff = 3; // Holiday + Bridge + Holiday
      }
      // HOLIDAY_BRIDGE_NORMAL: Single bridge day next to a holiday
      else if (isBeforeHoliday || isAfterHoliday) {
        pattern = COMBINATION_PATTERNS.find(p => p.pattern === 'HOLIDAY_BRIDGE_NORMAL');
        if (beforeHoliday) connectedHolidays.push(beforeHoliday);
        if (afterHoliday) connectedHolidays.push(afterHoliday);
        totalDaysOff = 2; // Holiday + Bridge
      }

      return pattern ? { pattern, totalDaysOff, connectedHolidays } : null;
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

    // Process each public holiday
    for (const holiday of publicHolidays) {
      const holidayDate = holiday.date;
      const possibleBridgeDays: {
        date: Date;
        analysis: { pattern: CombinationPattern; totalDaysOff: number; connectedHolidays: Holiday[] };
        efficiency: number;
      }[] = [];

      // Check days before holiday (up to 2 days)
      for (let i = 1; i <= 2; i++) {
        const prevDay = subDays(holidayDate, i);
        const dayBeforePrev = subDays(prevDay, 1);

        if (!isWeekend(prevDay) && !isPublicHoliday(prevDay)) {
          const analysis = analyzeBridgeDay(dayBeforePrev, prevDay, holidayDate, publicHolidays);
          if (analysis) {
            const seasonalFactor = getSeasonalFactor(prevDay);
            const efficiency = (analysis.totalDaysOff / i) * analysis.pattern.weight * seasonalFactor;
            possibleBridgeDays.push({ date: prevDay, analysis, efficiency });
          }
        }
      }

      // Check days after holiday (up to 2 days)
      for (let i = 1; i <= 2; i++) {
        const nextDay = addDays(holidayDate, i);
        const dayAfterNext = addDays(nextDay, 1);

        if (!isWeekend(nextDay) && !isPublicHoliday(nextDay)) {
          const analysis = analyzeBridgeDay(holidayDate, nextDay, dayAfterNext, publicHolidays);
          if (analysis) {
            const seasonalFactor = getSeasonalFactor(nextDay);
            const efficiency = (analysis.totalDaysOff / i) * analysis.pattern.weight * seasonalFactor;
            possibleBridgeDays.push({ date: nextDay, analysis, efficiency });
          }
        }
      }

      // Add all valid bridge days for this holiday
      possibleBridgeDays.forEach(bridgeDay => {
        bridgeDays.push({
          date: bridgeDay.date,
          name: bridgeDay.analysis.pattern.description,
          type: 'bridge',
          state,
          connectedHolidays: bridgeDay.analysis.connectedHolidays,
          requiredVacationDays: 1,
          totalDaysOff: bridgeDay.analysis.totalDaysOff,
          efficiency: bridgeDay.efficiency,
          pattern: bridgeDay.analysis.pattern.pattern
        });
      });
    }

    // Sort by date first, then by efficiency, and remove duplicates
    return bridgeDays
      .sort((a, b) => {
        const dateA = a.date;
        const dateB = b.date;
        const dateDiff = dateA.getTime() - dateB.getTime();
        if (dateDiff !== 0) return dateDiff;
        return b.efficiency - a.efficiency;
      })
      .filter((bridgeDay, index, self) => 
        index === self.findIndex(bd => isSameDay(bd.date, bridgeDay.date))
      );
  }
}; 