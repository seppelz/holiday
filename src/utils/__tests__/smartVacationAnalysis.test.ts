import { findVacationCombinationOpportunities } from '../smartVacationAnalysis';
import { Holiday } from '../../types/holiday';
import { VacationPlan } from '../../types/vacationPlan';
import { GermanState } from '../../types/germanState';

describe('smartVacationAnalysis', () => {
  const state = 'BE' as GermanState;

  describe('findVacationCombinationOpportunities', () => {
    it('should find opportunities for January holidays', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2025-01-01'),
          name: 'Neujahr',
          type: 'public',
          state
        }
      ];

      const vacations: VacationPlan[] = [];
      const opportunities = findVacationCombinationOpportunities(vacations, holidays, state);

      // Should find opportunities in January
      expect(opportunities.some(o => 
        o.dates[0].getMonth() === 0
      )).toBe(true);
    });

    it('should find opportunities for Christmas holidays', () => {
      const holidays: Holiday[] = [
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

      const vacations: VacationPlan[] = [];
      const opportunities = findVacationCombinationOpportunities(vacations, holidays, state);

      // Find the Christmas opportunity
      const christmasOpportunity = opportunities.find(o => 
        o.dates[0].getMonth() === 11 // December
      );

      expect(christmasOpportunity).toBeDefined();
      expect(christmasOpportunity?.gainedDays).toBeGreaterThan(2);
    });

    it('should find opportunities for May holidays', () => {
      const holidays: Holiday[] = [
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
        }
      ];

      const vacations: VacationPlan[] = [];
      const opportunities = findVacationCombinationOpportunities(vacations, holidays, state);

      // Should find opportunities for both holidays
      const mayOpportunities = opportunities.filter(o => 
        o.dates[0].getMonth() === 4 // May is 4 (0-based)
      );

      expect(mayOpportunities.length).toBeGreaterThan(1);
    });

    it('should not suggest days that are already taken', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2025-05-01'),
          name: 'Tag der Arbeit',
          type: 'public',
          state
        }
      ];

      const vacations: VacationPlan[] = [
        {
          id: '1',
          start: new Date('2025-05-02'),
          end: new Date('2025-05-02'),
          isVisible: true,
          personId: 1
        }
      ];

      const opportunities = findVacationCombinationOpportunities(vacations, holidays, state);

      // Should not suggest May 2 as it's already taken
      expect(opportunities.some(o => 
        o.dates.some(d => d.getTime() === new Date('2025-05-02').getTime())
      )).toBe(false);
    });

    it('should generate recommendations for a specific state', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2025-05-01'),
          name: 'Tag der Arbeit',
          type: 'public',
          state: 'BE' as GermanState
        },
        {
          date: new Date('2025-12-25'),
          name: '1. Weihnachtstag',
          type: 'public',
          state: 'BE' as GermanState
        },
        {
          date: new Date('2025-12-26'),
          name: '2. Weihnachtstag',
          type: 'public',
          state: 'BE' as GermanState
        }
      ];

      const vacations: VacationPlan[] = [];
      const opportunities = findVacationCombinationOpportunities(vacations, holidays, 'BE' as GermanState);

      // Should find at least one recommendation for each holiday period
      const mayRecommendations = opportunities.filter(o => o.dates[0].getMonth() === 4);
      const decemberRecommendations = opportunities.filter(o => o.dates[0].getMonth() === 11);

      expect(mayRecommendations.length).toBeGreaterThan(0);
      expect(decemberRecommendations.length).toBeGreaterThan(0);
      
      // Verify recommendation format
      opportunities.forEach(o => {
        expect(o.description).toBeDefined();
        expect(o.gainedDays).toBeGreaterThan(0);
        expect(o.requiredDays).toBeGreaterThan(0);
        expect(o.dates.length).toBeGreaterThan(0);
        expect(o.efficiency).toBeGreaterThan(0);
      });
    });
  });
}); 