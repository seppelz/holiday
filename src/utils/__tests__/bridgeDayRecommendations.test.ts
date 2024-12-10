import { findBridgeDayOpportunities } from '../vacationAnalysis';
import { GermanState } from '../../types/GermanState';
import { Holiday } from '../../types/holiday';
import { BridgeDayRecommendation } from '../../types/vacationPlan';

describe('Bridge Day Recommendations 2025 - Berlin', () => {
  const state = GermanState.BE;
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

  const opportunities = findBridgeDayOpportunities(berlinHolidays2025, [], new Date('2025-01-01'), new Date('2025-12-31'));

  // Update the test cases to use proper types
  console.log('All opportunities:', opportunities.map((o: BridgeDayRecommendation) => ({
    dates: o.dates.map(d => d.toISOString().split('T')[0]),
    efficiency: o.efficiency,
    description: o.description
  })));

  const monthsWithOpportunities = new Set(opportunities.map((o: BridgeDayRecommendation) => o.dates[0].getMonth() + 1));
  console.log('Months with opportunities:', Array.from(monthsWithOpportunities).sort((a, b) => a - b));

  // March opportunities
  const marchOpportunities = opportunities.filter((o: BridgeDayRecommendation) => o.dates[0].getMonth() === 2);
  console.log('March opportunities:', marchOpportunities.length);

  // April opportunities
  const aprilOpportunities = opportunities.filter((o: BridgeDayRecommendation) => o.dates[0].getMonth() === 3);
  console.log('April opportunities:', aprilOpportunities.length);

  // October opportunities
  const octoberOpportunities = opportunities.filter((o: BridgeDayRecommendation) => o.dates[0].getMonth() === 9);
  console.log('October opportunities:', octoberOpportunities.length);

  // December opportunities
  const decemberOpportunities = opportunities.filter((o: BridgeDayRecommendation) => o.dates[0].getMonth() === 11);
  console.log('December opportunities:', decemberOpportunities.length);

  // Check required vacation days
  opportunities.forEach((o: BridgeDayRecommendation) => {
    expect(o.requiredVacationDays).toBeGreaterThan(0);
    expect(o.gainedFreeDays).toBeGreaterThan(o.requiredVacationDays);
  });

  // Check weekend handling
  opportunities.forEach((o: BridgeDayRecommendation) => {
    const dates = o.dates;
    const weekendDays = dates.filter(d => d.getDay() === 0 || d.getDay() === 6).length;
    
    console.log('Bridge day opportunity:', {
      dates: dates.map(d => d.toISOString().split('T')[0]),
      weekendDays,
      requiredDays: o.requiredVacationDays,
      gainedDays: o.gainedFreeDays
    });
  });
}); 