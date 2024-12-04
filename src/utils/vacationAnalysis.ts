import { VacationPlan, BridgeDayRecommendation } from '../types/vacationPlan';
import { Holiday } from '../types/holiday';
import { 
  addDays, 
  differenceInBusinessDays, 
  eachDayOfInterval, 
  isWeekend,
  isSameDay,
  subDays
} from 'date-fns';

export interface VacationAnalysis {
  bridgeDayOpportunities: BridgeDayRecommendation[];
  schoolHolidayOverlaps: {
    total: number;
    percentage: number;
    recommendations: string[];
  };
  efficiency: {
    score: number;
    recommendations: string[];
  };
}

export function findBridgeDayOpportunities(
  holidays: Holiday[],
  existingVacations: VacationPlan[],
  startDate: Date = new Date(2025, 0, 1),
  endDate: Date = new Date(2025, 11, 31)
): BridgeDayRecommendation[] {
  const opportunities: BridgeDayRecommendation[] = [];

  // Look at each holiday
  holidays.forEach(holiday => {
    const holidayDate = new Date(holiday.date);
    if (holidayDate < startDate || holidayDate > endDate) return;

    // Check days before and after the holiday
    [-1, 1].forEach(offset => {
      const bridgeDate = offset === 1 ? addDays(holidayDate, 1) : subDays(holidayDate, 1);
      
      // Skip if it's a weekend or another holiday
      if (isWeekend(bridgeDate) || 
          holidays.some(h => isSameDay(new Date(h.date), bridgeDate)) ||
          existingVacations.some(v => 
            isSameDay(v.start, bridgeDate) || isSameDay(v.end, bridgeDate)
          )) {
        return;
      }

      // Calculate efficiency
      const requiredDays = 1; // Bridge day
      const gainedDays = offset === 1 
        ? isWeekend(addDays(bridgeDate, 1)) ? 3 : 1  // Include weekend after
        : isWeekend(subDays(bridgeDate, 1)) ? 3 : 1; // Include weekend before

      opportunities.push({
        dates: [bridgeDate],
        requiredVacationDays: requiredDays,
        gainedFreeDays: gainedDays,
        efficiency: gainedDays / requiredDays,
        description: `Brückentag ${offset === 1 ? 'nach' : 'vor'} ${holiday.name}`,
        isOptimal: gainedDays >= 3
      });
    });
  });

  // Sort by efficiency and mark best options
  return opportunities.sort((a, b) => b.efficiency - a.efficiency);
}

export function analyzeSchoolHolidayOverlap(
  vacations: VacationPlan[],
  schoolHolidays: Holiday[]
): { overlappingDays: number; percentage: number } {
  let totalVacationDays = 0;
  let overlappingDays = 0;

  vacations.forEach(vacation => {
    const vacationDays = eachDayOfInterval({ start: vacation.start, end: vacation.end });
    totalVacationDays += vacationDays.length;

    vacationDays.forEach(day => {
      if (schoolHolidays.some(holiday => 
        isSameDay(new Date(holiday.date), day)
      )) {
        overlappingDays++;
      }
    });
  });

  return {
    overlappingDays,
    percentage: totalVacationDays > 0 ? (overlappingDays / totalVacationDays) * 100 : 0
  };
}

export function analyzeVacationEfficiency(
  vacations: VacationPlan[],
  holidays: Holiday[],
  schoolHolidays: Holiday[]
): VacationAnalysis {
  const bridgeDayOpportunities = findBridgeDayOpportunities(holidays, vacations);
  const schoolOverlap = analyzeSchoolHolidayOverlap(vacations, schoolHolidays);
  
  // Calculate overall efficiency
  const totalRequiredDays = vacations.reduce((sum, v) => sum + (v.efficiency?.requiredDays || 0), 0);
  const totalGainedDays = vacations.reduce((sum, v) => sum + (v.efficiency?.gainedDays || 0), 0);
  const efficiencyScore = totalRequiredDays > 0 ? totalGainedDays / totalRequiredDays : 0;

  // Generate recommendations
  const recommendations: string[] = [];
  
  if (bridgeDayOpportunities.length > 0) {
    recommendations.push(`${bridgeDayOpportunities.length} Brückentag-Möglichkeiten gefunden`);
  }
  
  if (efficiencyScore < 0.4) {
    recommendations.push('Versuche mehr Wochenenden in deine Urlaubsplanung einzubeziehen');
  }

  if (schoolOverlap.percentage < 30) {
    recommendations.push('Prüfe Schulferien für familienfreundliche Urlaubszeiten');
  }

  return {
    bridgeDayOpportunities,
    schoolHolidayOverlaps: {
      total: schoolOverlap.overlappingDays,
      percentage: schoolOverlap.percentage,
      recommendations: []
    },
    efficiency: {
      score: efficiencyScore,
      recommendations
    }
  };
} 