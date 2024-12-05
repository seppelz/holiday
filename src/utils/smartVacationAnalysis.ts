import { addDays, eachDayOfInterval, format, isWeekend, isSameDay, isSameMonth, isSameYear, differenceInDays, subDays, startOfDay } from 'date-fns';
import { Holiday, BridgeDay } from '../types/holiday';
import { GermanState } from '../types/GermanState';
import { bridgeDayService } from '../services/bridgeDayService';

export interface VacationRecommendation {
  startDate: Date;
  endDate: Date;
  periodStart: Date;
  periodEnd: Date;
  requiredDays: number;
  gainedDays: number;
  efficiency: number;
  efficiencyDisplay: string;
  type: 'bridge' | 'extended';
  publicHolidays: Holiday[];
  weekendDays: Date[];
  displayRange: string;
  vacationDays: Date[];
}

const formatEfficiency = (requiredDays: number, gainedDays: number): string => {
  if (requiredDays === 0) return '0d = 0d';
  return `${requiredDays}d = ${gainedDays}d`;
};

const formatDateRange = (start: Date, end: Date): string => {
  if (isSameDay(start, end)) {
    return format(start, 'dd.MM.yy');
  }
  return `${format(start, 'dd.MM.')} - ${format(end, 'dd.MM.yy')}`;
};

const isPublicHoliday = (date: Date, holidays: Holiday[]): boolean => {
  if (isWeekend(date)) return false;
  return holidays.some(h => h.type === 'public' && isSameDay(h.date, date));
};

const isFreeDay = (date: Date, holidays: Holiday[]): boolean => {
  return isWeekend(date) || isPublicHoliday(date, holidays);
};

// Calculate workdays needed between two dates
const calculateWorkdays = (startDate: Date, endDate: Date, holidays: Holiday[]): number => {
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  return days.filter(day => {
    if (isWeekend(day)) return false;
    if (isPublicHoliday(day, holidays)) return false;
    return true;
  }).length;
};

// Find all free days in a period (weekends and public holidays)
const findFreeDays = (start: Date, end: Date, holidays: Holiday[]): {
  weekendDays: Date[];
  publicHolidays: Holiday[];
} => {
  const days = eachDayOfInterval({ start, end });
  return {
    weekendDays: days.filter(d => isWeekend(d)),
    publicHolidays: holidays.filter(h => 
      h.type === 'public' && 
      days.some(d => isSameDay(d, h.date)) &&
      !isWeekend(h.date)
    )
  };
};

const analyzeBridgeDayOpportunity = (
  start: Date,
  end: Date,
  holidays: Holiday[]
): VacationRecommendation | null => {
  // Calculate required workdays
  const requiredDays = calculateWorkdays(start, end, holidays);
  if (requiredDays === 0) return null;

  // Get free days in the period
  const { weekendDays, publicHolidays } = findFreeDays(start, end, holidays);
  
  // Calculate total days in period
  const totalDays = differenceInDays(end, start) + 1;
  
  // Calculate actual free days (weekends + holidays + vacation days)
  const freeDays = eachDayOfInterval({ start, end }).filter(d => 
    isWeekend(d) || isPublicHoliday(d, holidays)
  ).length;
  
  // Total gained days is the period length
  const gainedDays = totalDays;
  
  // Calculate efficiency based on actual benefit
  const efficiency = gainedDays / requiredDays;

  // Only return if we gain more days than we take off
  if (efficiency <= 1) return null;
  
  // Only return if there's at least one public holiday on a workday
  if (publicHolidays.length === 0) return null;

  // Find the actual vacation days (workdays)
  const vacationDays = eachDayOfInterval({ start, end })
    .filter(d => !isWeekend(d) && !isPublicHoliday(d, holidays));

  // Find the display period (including surrounding weekends)
  let displayStart = start;
  let displayEnd = end;
  
  // Check if start date itself is a free day
  if (isWeekend(start) || isPublicHoliday(start, holidays)) {
    displayStart = start;
  } else {
    // Look backwards for connected free days
    let currentDay = subDays(start, 1);
    while (isWeekend(currentDay) || isPublicHoliday(currentDay, holidays)) {
      displayStart = currentDay;
      currentDay = subDays(currentDay, 1);
    }
  }
  
  // Check if end date itself is a free day
  if (isWeekend(end) || isPublicHoliday(end, holidays)) {
    displayEnd = end;
  } else {
    // Look forwards for connected free days
    let currentDay = addDays(end, 1);
    while (isWeekend(currentDay) || isPublicHoliday(currentDay, holidays)) {
      displayEnd = currentDay;
      currentDay = addDays(currentDay, 1);
    }
  }

  // Ensure all dates are at the start of their respective days
  const startOfDisplayStart = startOfDay(displayStart);
  const startOfDisplayEnd = startOfDay(displayEnd);
  const startOfStart = startOfDay(start);
  const startOfEnd = startOfDay(end);

  return {
    startDate: startOfStart,
    endDate: startOfEnd,
    periodStart: startOfDisplayStart,
    periodEnd: startOfDisplayEnd,
    requiredDays,
    gainedDays,
    efficiency,
    efficiencyDisplay: formatEfficiency(requiredDays, gainedDays),
    type: requiredDays === 1 ? 'bridge' : 'extended',
    publicHolidays,
    weekendDays,
    displayRange: formatDateRange(startOfDisplayStart, startOfDisplayEnd),
    vacationDays: vacationDays.map(d => startOfDay(d))
  };
};

export function analyzeVacationOpportunities(
  holidays: Holiday[],
  state: GermanState
): VacationRecommendation[] {
  const recommendations: VacationRecommendation[] = [];
  
  // Get bridge days from service
  const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, state);
  
  // Group bridge days that are close to each other (within 3 days)
  const groupedBridgeDays: BridgeDay[][] = [];
  let currentGroup: BridgeDay[] = [];
  
  const sortedBridgeDays = [...bridgeDays].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  for (const bridgeDay of sortedBridgeDays) {
    if (currentGroup.length === 0) {
      currentGroup.push(bridgeDay);
    } else {
      const lastDay = currentGroup[currentGroup.length - 1];
      const daysBetween = differenceInDays(bridgeDay.date, lastDay.date);
      
      if (daysBetween <= 3) {
        currentGroup.push(bridgeDay);
      } else {
        groupedBridgeDays.push([...currentGroup]);
        currentGroup = [bridgeDay];
      }
    }
  }
  if (currentGroup.length > 0) {
    groupedBridgeDays.push(currentGroup);
  }

  // Analyze each group of bridge days
  for (const group of groupedBridgeDays) {
    // For each group, try different combinations of start and end dates
    const firstDay = group[0];
    const lastDay = group[group.length - 1];
    
    // Look at a window around the group
    const windowStart = addDays(firstDay.date, -3);
    const windowEnd = addDays(lastDay.date, 3);
    
    // Try different period lengths
    for (let start = windowStart; start <= firstDay.date; start = addDays(start, 1)) {
      for (let end = lastDay.date; end <= windowEnd; end = addDays(end, 1)) {
        const rec = analyzeBridgeDayOpportunity(start, end, holidays);
        if (rec) recommendations.push(rec);
      }
    }
  }
  
  // Find holiday periods for extended opportunities
  const publicHolidays = holidays.filter(h => h.type === 'public');
  
  // Group holidays that are close to each other
  const groupedHolidays: Holiday[][] = [];
  let currentHolidayGroup: Holiday[] = [];
  
  const sortedHolidays = [...publicHolidays].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  for (const holiday of sortedHolidays) {
    if (currentHolidayGroup.length === 0) {
      currentHolidayGroup.push(holiday);
    } else {
      const lastHoliday = currentHolidayGroup[currentHolidayGroup.length - 1];
      const daysBetween = differenceInDays(holiday.date, lastHoliday.date);
      
      if (daysBetween <= 5) {
        currentHolidayGroup.push(holiday);
      } else {
        groupedHolidays.push([...currentHolidayGroup]);
        currentHolidayGroup = [holiday];
      }
    }
  }
  if (currentHolidayGroup.length > 0) {
    groupedHolidays.push(currentHolidayGroup);
  }

  // Analyze each group of holidays
  for (const group of groupedHolidays) {
    const firstHoliday = group[0];
    const lastHoliday = group[group.length - 1];
    
    // Look at a window around the group
    const windowStart = addDays(firstHoliday.date, -5);
    const windowEnd = addDays(lastHoliday.date, 5);
    
    // Try different period lengths
    for (let start = windowStart; start <= firstHoliday.date; start = addDays(start, 1)) {
      for (let end = lastHoliday.date; end <= windowEnd; end = addDays(end, 1)) {
        const rec = analyzeBridgeDayOpportunity(start, end, holidays);
        if (rec) recommendations.push(rec);
      }
    }
  }
  
  // Sort by efficiency and length
  recommendations.sort((a, b) => {
    const lengthDiff = (b.gainedDays / b.requiredDays) - (a.gainedDays / a.requiredDays);
    if (Math.abs(lengthDiff) < 0.1) { // If efficiency is similar, prefer longer periods
      return b.gainedDays - a.gainedDays;
    }
    return lengthDiff;
  });
  
  // Remove overlapping recommendations, preferring longer/more efficient ones
  const uniqueRecommendations: VacationRecommendation[] = [];
  const addedPeriods = new Set<string>();
  
  for (const rec of recommendations) {
    const periodKey = `${rec.periodStart.getTime()}-${rec.periodEnd.getTime()}`;
    if (addedPeriods.has(periodKey)) continue;
    
    const hasOverlap = uniqueRecommendations.some(existing => 
      (rec.periodStart <= existing.periodEnd && rec.periodEnd >= existing.periodStart)
    );
    
    if (!hasOverlap) {
      uniqueRecommendations.push(rec);
      addedPeriods.add(periodKey);
    }
  }
  
  // Sort by date
  return uniqueRecommendations.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}