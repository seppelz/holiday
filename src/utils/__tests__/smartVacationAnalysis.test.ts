import { analyzeVacationOpportunities } from '../smartVacationAnalysis';
import { Holiday } from '../../types/holiday';
import { GermanState } from '../../types/GermanState';

describe('smartVacationAnalysis', () => {
  const state = 'BE' as GermanState;

  describe('date range formatting', () => {
    it('should format date ranges correctly for single days', () => {
      const holidays: Holiday[] = [{
        date: new Date('2025-04-18'), // Karfreitag
        name: 'Karfreitag',
        type: 'public',
        state
      }];

      const recommendations = analyzeVacationOpportunities(holidays, state);
      
      // Check that single day recommendations show correct date format
      const singleDayRecs = recommendations.filter(r => 
        r.startDate.getTime() === r.endDate.getTime()
      );
      
      singleDayRecs.forEach(rec => {
        expect(rec.displayRange).toMatch(/^\d{1,2}\.\d{1,2}\.\d{2,4}$/);
      });
    });

    it('should format date ranges correctly for multi-day periods', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2025-04-18'), // Karfreitag
          name: 'Karfreitag',
          type: 'public',
          state
        },
        {
          date: new Date('2025-04-21'), // Ostermontag
          name: 'Ostermontag',
          type: 'public',
          state
        }
      ];

      const recommendations = analyzeVacationOpportunities(holidays, state);
      
      // Check that multi-day recommendations show correct range format
      const multiDayRecs = recommendations.filter(r => 
        r.startDate.getTime() !== r.endDate.getTime()
      );
      
      multiDayRecs.forEach(rec => {
        expect(rec.displayRange).toMatch(/^\d{1,2}\.\d{1,2}\. - \d{1,2}\.\d{1,2}\.\d{2,4}$/);
      });
    });
  });

  describe('efficiency calculations', () => {
    it('should calculate efficiency correctly for bridge days', () => {
      const holidays: Holiday[] = [{
        date: new Date('2025-05-01'), // Tag der Arbeit (Thursday)
        name: 'Tag der Arbeit',
        type: 'public',
        state
      }];

      const recommendations = analyzeVacationOpportunities(holidays, state);
      
      // Find the bridge day recommendation (Friday)
      const bridgeDayRec = recommendations.find(r => 
        r.startDate.getTime() === new Date('2025-05-02').getTime()
      );

      expect(bridgeDayRec).toBeDefined();
      expect(bridgeDayRec?.efficiencyDisplay).toBe('1d = 2d, +100%');
    });

    it('should calculate efficiency correctly for extended periods', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2025-04-18'), // Karfreitag
          name: 'Karfreitag',
          type: 'public',
          state
        },
        {
          date: new Date('2025-04-21'), // Ostermontag
          name: 'Ostermontag',
          type: 'public',
          state
        }
      ];

      const recommendations = analyzeVacationOpportunities(holidays, state);
      
      // Find the Easter period recommendation
      const easterPeriodRec = recommendations.find(r => 
        r.startDate.getTime() === new Date('2025-04-17').getTime() &&
        r.endDate.getTime() === new Date('2025-04-22').getTime()
      );

      expect(easterPeriodRec).toBeDefined();
      expect(easterPeriodRec?.efficiencyDisplay).toBe('2d = 6d, +200%');
    });
  });

  describe('duplicate prevention', () => {
    it('should not return overlapping recommendations for Easter period', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2025-04-18'), // Karfreitag
          name: 'Karfreitag',
          type: 'public',
          state
        },
        {
          date: new Date('2025-04-21'), // Ostermontag
          name: 'Ostermontag',
          type: 'public',
          state
        }
      ];

      const recommendations = analyzeVacationOpportunities(holidays, state);
      
      // Get all recommendations that overlap with Easter period
      const easterRecs = recommendations.filter(r => {
        const start = r.startDate.getTime();
        const end = r.endDate.getTime();
        return (start >= new Date('2025-04-17').getTime() && 
                start <= new Date('2025-04-22').getTime()) ||
               (end >= new Date('2025-04-17').getTime() && 
                end <= new Date('2025-04-22').getTime());
      });

      // Should only have one recommendation for the Easter period
      expect(easterRecs).toHaveLength(1);
    });
  });

  describe('year end recommendations', () => {
    it('should handle year transition correctly', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2024-12-25'), // 1. Weihnachtstag
          name: '1. Weihnachtstag',
          type: 'public',
          state
        },
        {
          date: new Date('2024-12-26'), // 2. Weihnachtstag
          name: '2. Weihnachtstag',
          type: 'public',
          state
        },
        {
          date: new Date('2025-01-01'), // Neujahr
          name: 'Neujahr',
          type: 'public',
          state
        }
      ];

      const recommendations = analyzeVacationOpportunities(holidays, state);
      
      // Check year-end recommendations
      recommendations.forEach(rec => {
        if (rec.startDate.getFullYear() !== rec.endDate.getFullYear()) {
          expect(rec.displayRange).toMatch(/\d{1,2}\.\d{1,2}\.24 - \d{1,2}\.\d{1,2}\.25/);
        }
      });
    });
  });
}); 