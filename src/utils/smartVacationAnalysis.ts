import { VacationPlan, BridgeDayRecommendation } from '../types/vacationPlan';
import { Holiday } from '../types/holiday';
import { bridgeDayService } from '../services/bridgeDayService';
import { GermanState } from '../types/germanState';
import { 
  addDays, 
  differenceInDays,
  eachDayOfInterval,
  getMonth,
  isWithinInterval,
  isSameDay,
  isWeekend,
  format,
  subDays
} from 'date-fns';

export interface VacationPattern {
  type: 'duration' | 'seasonal' | 'efficiency' | 'coordination';
  value: number;
  description: string;
  recommendation?: string;
}

export interface SmartAnalysis {
  patterns: VacationPattern[];
  recommendations: string[];
  combinationOpportunities: {
    description: string;
    gainedDays: number;
    requiredDays: number;
    dates: Date[];
    efficiency: number;
  }[];
}

function analyzeDurationPattern(vacations: VacationPlan[]): VacationPattern[] {
  const patterns: VacationPattern[] = [];
  
  // Group vacations by duration
  const durationGroups = vacations.reduce((acc, vacation) => {
    const duration = differenceInDays(vacation.end, vacation.start) + 1;
    const group = duration <= 3 ? 'short' : duration <= 7 ? 'medium' : 'long';
    acc[group] = (acc[group] || []).concat(vacation);
    return acc;
  }, {} as Record<string, VacationPlan[]>);

  // Analyze efficiency by duration
  Object.entries(durationGroups).forEach(([length, plans]) => {
    const avgEfficiency = plans.reduce((sum, plan) => 
      sum + (plan.efficiency?.score || 0), 0) / plans.length;

    patterns.push({
      type: 'duration',
      value: avgEfficiency,
      description: `${length} vacations (${plans.length}x) - ${Math.round(avgEfficiency * 100)}% efficiency`,
      recommendation: avgEfficiency < 0.4 ? 
        `Consider extending your ${length} vacations to include more weekends` : undefined
    });
  });

  return patterns;
}

function analyzeSeasonalDistribution(vacations: VacationPlan[]): VacationPattern[] {
  const seasonalDays = new Array(12).fill(0);
  
  vacations.forEach(vacation => {
    const days = eachDayOfInterval({ start: vacation.start, end: vacation.end });
    days.forEach(day => {
      seasonalDays[getMonth(day)]++;
    });
  });

  // Find significant imbalances
  const totalDays = seasonalDays.reduce((a, b) => a + b, 0);
  const avgDaysPerMonth = totalDays / 12;
  
  return seasonalDays.map((days, month) => ({
    type: 'seasonal',
    value: days / avgDaysPerMonth,
    description: `Month ${month + 1}: ${days} days (${Math.round(days / avgDaysPerMonth * 100)}% of average)`,
    recommendation: days > avgDaysPerMonth * 2 ?
      `Consider spreading out vacations from month ${month + 1}` : undefined
  }));
}

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

export function analyzeVacationSmart(
  vacations: VacationPlan[],
  holidays: Holiday[],
  person2Vacations?: VacationPlan[]
): SmartAnalysis {
  const durationPatterns = analyzeDurationPattern(vacations);
  const seasonalPatterns = analyzeSeasonalDistribution(vacations);
  const combinations = findVacationCombinationOpportunities(vacations, holidays);

  // Generate smart recommendations
  const recommendations: string[] = [
    ...durationPatterns
      .filter(p => p.recommendation)
      .map(p => p.recommendation!),
    ...seasonalPatterns
      .filter(p => p.recommendation)
      .map(p => p.recommendation!)
  ];

  // Add combination opportunities to recommendations
  if (combinations.length > 0) {
    const bestCombo = combinations[0];
    recommendations.push(
      `Best opportunity: ${bestCombo.description} (${Math.round(bestCombo.efficiency * 100)}% efficiency)`
    );
  }

  // Add coordination recommendations if person2 exists
  if (person2Vacations?.length) {
    const person2Months = new Set(person2Vacations.map(v => getMonth(v.start)));
    const person1Months = new Set(vacations.map(v => getMonth(v.start)));
    
    const uniqueMonths = [...person2Months].filter(m => !person1Months.has(m));
    if (uniqueMonths.length > 0) {
      recommendations.push(
        `Consider coordinating: Person 2 has vacations in months ${uniqueMonths.map(m => m + 1).join(', ')}`
      );
    }
  }

  return {
    patterns: [...durationPatterns, ...seasonalPatterns],
    recommendations,
    combinationOpportunities: combinations
  };
}

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

export function analyzeVacationEfficiency(
  vacations: VacationPlan[],
  holidays: Holiday[],
  schoolHolidays: Holiday[],
  state: GermanState
): VacationAnalysis {
  const bridgeDayOpportunities = findVacationCombinationOpportunities(vacations, holidays, state);
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