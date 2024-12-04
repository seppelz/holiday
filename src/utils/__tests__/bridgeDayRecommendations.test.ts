import { findVacationCombinationOpportunities } from '../smartVacationAnalysis';
import { Holiday } from '../../types/holiday';
import { VacationPlan } from '../../types/vacationPlan';
import { GermanState } from '../../types/germanState';

describe('Bridge Day Recommendations 2025 - Berlin', () => {
  const state = 'BE' as GermanState;
  const berlinHolidays2025: Holiday[] = [
    // January
    {
      date: new Date('2025-01-01'),
      name: 'Neujahr',
      type: 'public',
      state
    },
    // March
    {
      date: new Date('2025-03-08'),
      name: 'Internationaler Frauentag',
      type: 'public',
      state
    },
    // April
    {
      date: new Date('2025-04-18'),
      name: 'Karfreitag',
      type: 'public',
      state
    },
    {
      date: new Date('2025-04-21'),
      name: 'Ostermontag',
      type: 'public',
      state
    },
    // May
    {
      date: new Date('2025-05-01'),
      name: 'Tag der Arbeit',
      type: 'public',
      state
    },
    {
      date: new Date('2025-05-29'),
      name: 'Christi Himmelfahrt',
      type: 'public',
      state
    },
    // June
    {
      date: new Date('2025-06-09'),
      name: 'Pfingstmontag',
      type: 'public',
      state
    },
    // October
    {
      date: new Date('2025-10-03'),
      name: 'Tag der Deutschen Einheit',
      type: 'public',
      state
    },
    // December
    {
      date: new Date('2025-12-25'),
      name: '1. Weihnachtstag',
      type: 'public',
      state
    },
    {
      date: new Date('2025-12-26'),
      name: '2. Weihnachtstag',
      type: 'public',
      state
    }
  ];

  it('should find opportunities for all months with public holidays', () => {
    const vacations: VacationPlan[] = []; // No existing vacations
    const opportunities = findVacationCombinationOpportunities(vacations, berlinHolidays2025, state);

    // Log all opportunities for debugging
    console.log('All opportunities:', opportunities.map(o => ({
      month: o.dates[0].getMonth() + 1,
      start: o.dates[0].toISOString().split('T')[0],
      end: o.dates[o.dates.length - 1].toISOString().split('T')[0],
      efficiency: o.efficiency,
      requiredDays: o.requiredDays,
      gainedDays: o.gainedDays
    })));

    // Check for opportunities in each month with holidays
    const monthsWithOpportunities = new Set(opportunities.map(o => o.dates[0].getMonth() + 1));
    
    // Expected months with bridge day opportunities
    const expectedMonths = new Set([1, 3, 4, 5, 6, 10, 12]);
    
    expect(monthsWithOpportunities).toEqual(expectedMonths);
  });

  it('should find specific bridge day opportunities for each holiday', () => {
    const vacations: VacationPlan[] = [];
    const opportunities = findVacationCombinationOpportunities(vacations, berlinHolidays2025, state);

    // March - Internationaler Frauentag (March 8, 2025 - Saturday)
    const marchOpportunities = opportunities.filter(o => o.dates[0].getMonth() === 2);
    expect(marchOpportunities.length).toBeGreaterThan(0);
    console.log('March opportunities:', marchOpportunities);

    // April - Easter (April 18-21, 2025)
    const aprilOpportunities = opportunities.filter(o => o.dates[0].getMonth() === 3);
    expect(aprilOpportunities.length).toBeGreaterThan(0);
    console.log('April opportunities:', aprilOpportunities);

    // October - Tag der Deutschen Einheit (October 3, 2025 - Friday)
    const octoberOpportunities = opportunities.filter(o => o.dates[0].getMonth() === 9);
    expect(octoberOpportunities.length).toBeGreaterThan(0);
    console.log('October opportunities:', octoberOpportunities);

    // December - Christmas (December 25-26, 2025)
    const decemberOpportunities = opportunities.filter(o => o.dates[0].getMonth() === 11);
    expect(decemberOpportunities.length).toBeGreaterThan(0);
    console.log('December opportunities:', decemberOpportunities);
  });

  it('should calculate correct efficiency for each opportunity', () => {
    const vacations: VacationPlan[] = [];
    const opportunities = findVacationCombinationOpportunities(vacations, berlinHolidays2025, state);

    opportunities.forEach(o => {
      // Calculate expected efficiency
      const workdays = o.requiredDays;
      const totalDays = o.gainedDays;
      const calculatedEfficiency = totalDays / workdays;

      console.log(`Opportunity ${o.dates[0].toISOString().split('T')[0]}:`, {
        workdays,
        totalDays,
        calculatedEfficiency,
        actualEfficiency: o.efficiency,
        description: o.description
      });

      // The actual efficiency might be higher due to bonuses, but should never be lower
      expect(o.efficiency).toBeGreaterThanOrEqual(calculatedEfficiency);
    });
  });

  it('should handle weekends correctly', () => {
    const vacations: VacationPlan[] = [];
    const opportunities = findVacationCombinationOpportunities(vacations, berlinHolidays2025, state);

    opportunities.forEach(o => {
      const dates = o.dates;
      const weekendDays = dates.filter(d => d.getDay() === 0 || d.getDay() === 6).length;
      const totalDays = dates.length;
      const workdays = o.requiredDays;

      console.log(`Opportunity ${dates[0].toISOString().split('T')[0]}:`, {
        totalDays,
        weekendDays,
        workdays,
        dates: dates.map(d => d.toISOString().split('T')[0])
      });

      // Verify that weekends are counted correctly in the total days
      expect(totalDays).toBeGreaterThanOrEqual(weekendDays + workdays);
    });
  });

  it('should not count public holidays as required vacation days', () => {
    const vacations: VacationPlan[] = [];
    const opportunities = findVacationCombinationOpportunities(vacations, berlinHolidays2025, state);

    opportunities.forEach(o => {
      const dates = o.dates;
      const publicHolidayDays = dates.filter(d => 
        berlinHolidays2025.some(h => 
          h.date.getTime() === d.getTime()
        )
      ).length;

      console.log(`Opportunity ${dates[0].toISOString().split('T')[0]}:`, {
        totalDays: dates.length,
        publicHolidayDays,
        requiredVacationDays: o.requiredDays,
        dates: dates.map(d => d.toISOString().split('T')[0])
      });

      // Verify that public holidays are not counted as required vacation days
      expect(dates.length - publicHolidayDays).toBeGreaterThanOrEqual(o.requiredDays);
    });
  });
}); 