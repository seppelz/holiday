import { VacationPlan } from '../types/vacationPlan';
import { Holiday } from '../types/holiday';
import { eachDayOfInterval, isWeekend, isSameDay } from 'date-fns';

interface VacationDaysResult {
  usedDays: number;
  gainedDays: number;
}

export function calculateVacationDays(
  vacationPlans: VacationPlan[],
  holidays: Holiday[]
): VacationDaysResult {
  let usedDays = 0;
  let totalFreeDays = 0;

  vacationPlans.forEach(vacation => {
    if (!vacation.isVisible) return;

    // Get all days in the vacation period
    const allDays = eachDayOfInterval({ start: vacation.start, end: vacation.end });
    
    // Count workdays and all free days (including vacation days)
    allDays.forEach(date => {
      if (isWeekend(date)) {
        totalFreeDays++;
        return;
      }

      const isPublicHoliday = holidays.some(h => 
        h.type === 'public' && isSameDay(new Date(h.date), date)
      );

      if (isPublicHoliday) {
        totalFreeDays++;
      } else {
        usedDays++;
        totalFreeDays++; // Count vacation days as free days too
      }
    });
  });

  return {
    usedDays,
    gainedDays: totalFreeDays // This now includes vacation days + weekends + holidays
  };
} 