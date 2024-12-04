import { VacationPlan, BridgeDayRecommendation } from '../types/vacationPlan';
import { Holiday } from '../types/holiday';
import { bridgeDayService } from '../services/bridgeDayService';
import { GermanState } from '../types/germanState';
import { 
  addDays, 
  differenceInDays,
  eachDayOfInterval,
  isWithinInterval,
  format
} from 'date-fns';

export interface VacationCombination {
  description: string;
  gainedDays: number;
  requiredDays: number;
  dates: Date[];
  efficiency: number;
}

export function findVacationCombinationOpportunities(
  vacations: VacationPlan[],
  holidays: Holiday[],
  state: GermanState
): VacationCombination[] {
  // Use bridgeDayService to get bridge days
  const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, state);

  // Convert bridge days to vacation combinations
  return bridgeDays
    .filter(bridgeDay => 
      // Filter out bridge days that overlap with existing vacations
      !vacations.some(v => 
        isWithinInterval(bridgeDay.date, { start: v.start, end: v.end })
      )
    )
    .map(bridgeDay => {
      // Get all connected dates including holidays and weekends
      const startDate = bridgeDay.connectedHolidays?.reduce((earliest, holiday) => 
        holiday.date < earliest ? holiday.date : earliest, bridgeDay.date
      ) || bridgeDay.date;
      
      const endDate = bridgeDay.connectedHolidays?.reduce((latest, holiday) => 
        holiday.date > latest ? holiday.date : latest, bridgeDay.date
      ) || bridgeDay.date;

      // Get all dates in the range
      const allDates = eachDayOfInterval({ start: startDate, end: endDate });

      return {
        description: `${format(startDate, 'dd.MM.')} - ${format(endDate, 'dd.MM.')}: ${bridgeDay.requiredVacationDays}d Urlaub = ${bridgeDay.totalDaysOff}d am Stück frei`,
        gainedDays: bridgeDay.totalDaysOff,
        requiredDays: bridgeDay.requiredVacationDays,
        dates: allDates,
        efficiency: bridgeDay.efficiency
      };
    })
    .sort((a, b) => {
      // Sort by date first
      const dateA = a.dates[0];
      const dateB = b.dates[0];
      return dateA.getTime() - dateB.getTime();
    });
} 