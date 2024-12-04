import { VacationPlan } from '../types/vacationPlan';
import { differenceInBusinessDays, isWeekend, eachDayOfInterval } from 'date-fns';

export function calculateVacationEfficiency(vacation: VacationPlan): VacationPlan {
  const allDays = eachDayOfInterval({ start: vacation.start, end: vacation.end });
  const totalDays = allDays.length;
  
  // Count required vacation days (excluding weekends)
  const requiredDays = differenceInBusinessDays(vacation.end, vacation.start) + 1;
  
  // Count gained free days (weekends)
  const gainedDays = allDays.filter(day => isWeekend(day)).length;
  
  // Calculate efficiency score (gained free days / required vacation days)
  const score = gainedDays / requiredDays;
  
  return {
    ...vacation,
    efficiency: {
      requiredDays,
      gainedDays,
      score,
    }
  };
}

export function calculateVacationsEfficiency(vacations: VacationPlan[]): VacationPlan[] {
  return vacations.map(calculateVacationEfficiency);
} 