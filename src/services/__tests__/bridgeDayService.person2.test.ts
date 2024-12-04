import { bridgeDayService } from '../bridgeDayService';
import { Holiday } from '../../types/holiday';
import { GermanState } from '../../types/germanState';

describe('bridgeDayService - Person 2 Scenarios', () => {
  describe('different states calculations', () => {
    it('should calculate bridge days correctly for two different states', () => {
      // Setup holidays for Berlin (has Frauentag) and Bayern (has Heilige Drei Könige)
      const berlinHolidays: Holiday[] = [
        {
          date: new Date('2024-03-08'), // Friday (Frauentag)
          name: 'Internationaler Frauentag',
          type: 'public',
          state: 'BE' as GermanState
        }
      ];

      const bayernHolidays: Holiday[] = [
        {
          date: new Date('2024-01-06'), // Saturday (Heilige Drei Könige)
          name: 'Heilige Drei Könige',
          type: 'public',
          state: 'BY' as GermanState
        }
      ];

      const berlinBridgeDays = bridgeDayService.calculateBridgeDays(berlinHolidays, 'BE' as GermanState);
      const bayernBridgeDays = bridgeDayService.calculateBridgeDays(bayernHolidays, 'BY' as GermanState);

      // Verify Berlin bridge days (Thursday before Friday holiday)
      expect(berlinBridgeDays).toHaveLength(1);
      expect(berlinBridgeDays[0].date).toEqual(new Date('2024-03-07')); // Thursday before Frauentag
      expect(berlinBridgeDays[0].pattern).toBe('HOLIDAY_BRIDGE_NORMAL');

      // Bayern should have no bridge days since holiday is on weekend
      expect(bayernBridgeDays).toHaveLength(0);
    });

    it('should handle overlapping holidays between states', () => {
      // Setup holidays for both states including a shared holiday (Tag der Arbeit)
      const holidays: Holiday[] = [
        {
          date: new Date('2024-05-01'), // Tag der Arbeit (nationwide)
          name: 'Tag der Arbeit',
          type: 'public',
          state: 'BE' as GermanState
        },
        {
          date: new Date('2024-05-01'), // Same holiday for Bayern
          name: 'Tag der Arbeit',
          type: 'public',
          state: 'BY' as GermanState
        }
      ];

      const berlinBridgeDays = bridgeDayService.calculateBridgeDays(holidays.filter(h => h.state === 'BE'), 'BE' as GermanState);
      const bayernBridgeDays = bridgeDayService.calculateBridgeDays(holidays.filter(h => h.state === 'BY'), 'BY' as GermanState);

      // Both states should have the same bridge day opportunities
      expect(berlinBridgeDays).toHaveLength(1);
      expect(bayernBridgeDays).toHaveLength(1);
      expect(berlinBridgeDays[0].date).toEqual(bayernBridgeDays[0].date);
    });

    it('should calculate correct efficiency for each state', () => {
      // Setup a Thursday holiday in shoulder season (May) for both states
      const berlinHoliday: Holiday = {
        date: new Date('2024-05-09'), // Thursday
        name: 'Test Holiday Berlin',
        type: 'public',
        state: 'BE' as GermanState
      };

      const bayernHoliday: Holiday = {
        date: new Date('2024-05-09'), // Same day
        name: 'Test Holiday Bayern',
        type: 'public',
        state: 'BY' as GermanState
      };

      const berlinBridgeDays = bridgeDayService.calculateBridgeDays([berlinHoliday], 'BE' as GermanState);
      const bayernBridgeDays = bridgeDayService.calculateBridgeDays([bayernHoliday], 'BY' as GermanState);

      // Both should have same efficiency due to same date and season
      expect(berlinBridgeDays[0].efficiency).toEqual(bayernBridgeDays[0].efficiency);
      expect(berlinBridgeDays[0].efficiency).toBeGreaterThan(4.0); // Should have shoulder season bonus
      expect(berlinBridgeDays[0].pattern).toBe('HOLIDAY_BRIDGE_WEEKEND'); // Friday bridge day after Thursday holiday
    });

    it('should identify optimal patterns for both states', () => {
      // Setup Christmas holidays for both states
      const holidays: Holiday[] = [
        {
          date: new Date('2024-12-25'), // 1. Weihnachtstag
          name: '1. Weihnachtstag',
          type: 'public',
          state: 'BE' as GermanState
        },
        {
          date: new Date('2024-12-26'), // 2. Weihnachtstag
          name: '2. Weihnachtstag',
          type: 'public',
          state: 'BE' as GermanState
        },
        {
          date: new Date('2024-12-25'), // 1. Weihnachtstag Bayern
          name: '1. Weihnachtstag',
          type: 'public',
          state: 'BY' as GermanState
        },
        {
          date: new Date('2024-12-26'), // 2. Weihnachtstag Bayern
          name: '2. Weihnachtstag',
          type: 'public',
          state: 'BY' as GermanState
        }
      ];

      const berlinBridgeDays = bridgeDayService.calculateBridgeDays(
        holidays.filter(h => h.state === 'BE'),
        'BE' as GermanState
      );
      const bayernBridgeDays = bridgeDayService.calculateBridgeDays(
        holidays.filter(h => h.state === 'BY'),
        'BY' as GermanState
      );

      // Both states should identify the same optimal pattern
      expect(berlinBridgeDays[0].pattern).toBe('HOLIDAY_BRIDGE_HOLIDAY');
      expect(bayernBridgeDays[0].pattern).toBe('HOLIDAY_BRIDGE_HOLIDAY');
      expect(berlinBridgeDays[0].efficiency).toEqual(bayernBridgeDays[0].efficiency);
    });
  });
}); 