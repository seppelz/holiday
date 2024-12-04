import { bridgeDayService } from '../bridgeDayService';
import { Holiday } from '../../types/holiday';
import { GermanState } from '../../types/germanState';

describe('bridgeDayService', () => {
  const state = 'BE' as GermanState;

  describe('pattern recognition', () => {
    it('should identify HOLIDAY_BRIDGE_WEEKEND pattern', () => {
      // Karfreitag (Thursday) -> Bridge Day (Friday) -> Weekend
      const holidays: Holiday[] = [{
        date: new Date('2025-04-18'), // Thursday (Karfreitag)
        name: 'Karfreitag',
        type: 'public',
        state
      }];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, state);

      expect(bridgeDays).toHaveLength(1);
      expect(bridgeDays[0].pattern).toBe('HOLIDAY_BRIDGE_WEEKEND');
      expect(bridgeDays[0].date).toEqual(new Date('2025-04-19')); // Friday
      expect(bridgeDays[0].efficiency).toBeGreaterThan(4.0); // 4 days off (Thu-Sun) for 1 vacation day
    });

    it('should identify HOLIDAY_BRIDGE_HOLIDAY pattern', () => {
      // Christmas sequence: 1. Weihnachtstag (Wed) -> Bridge Day -> 2. Weihnachtstag (Thu)
      const holidays: Holiday[] = [
        {
          date: new Date('2025-12-25'), // Wednesday (1. Weihnachtstag)
          name: '1. Weihnachtstag',
          type: 'public',
          state
        },
        {
          date: new Date('2025-12-26'), // Thursday (2. Weihnachtstag)
          name: '2. Weihnachtstag',
          type: 'public',
          state
        }
      ];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, state);

      expect(bridgeDays).toHaveLength(1);
      expect(bridgeDays[0].pattern).toBe('HOLIDAY_BRIDGE_HOLIDAY');
      expect(bridgeDays[0].date).toEqual(new Date('2025-12-24')); // Tuesday
      expect(bridgeDays[0].efficiency).toBeGreaterThan(3.0); // Holiday + Bridge + Holiday
    });

    it('should identify WEEKEND_BRIDGE_HOLIDAY pattern', () => {
      // Weekend -> Bridge Day (Monday) -> Pfingstmontag (Monday)
      const holidays: Holiday[] = [{
        date: new Date('2025-06-09'), // Monday (Pfingstmontag)
        name: 'Pfingstmontag',
        type: 'public',
        state
      }];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, state);

      expect(bridgeDays).toHaveLength(1);
      expect(bridgeDays[0].pattern).toBe('HOLIDAY_BRIDGE_NORMAL');
      expect(bridgeDays[0].date).toEqual(new Date('2025-06-10')); // Tuesday
      expect(bridgeDays[0].efficiency).toBeGreaterThan(2.0); // Holiday + Bridge
    });

    it('should identify HOLIDAY_BRIDGE_NORMAL pattern', () => {
      // Tag der Arbeit (Wednesday) -> Bridge Day (Thursday)
      const holidays: Holiday[] = [{
        date: new Date('2025-05-01'), // Wednesday (Tag der Arbeit)
        name: 'Tag der Arbeit',
        type: 'public',
        state
      }];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, state);

      expect(bridgeDays).toHaveLength(1);
      expect(bridgeDays[0].pattern).toBe('HOLIDAY_BRIDGE_NORMAL');
      expect(bridgeDays[0].date).toEqual(new Date('2025-05-02')); // Thursday
      expect(bridgeDays[0].efficiency).toBeGreaterThan(2.0); // Holiday + Bridge
    });
  });

  describe('seasonal factors', () => {
    it('should apply summer peak penalty', () => {
      // Using a Thursday in summer peak season
      const holidays: Holiday[] = [{
        date: new Date('2025-07-24'), // Thursday in summer peak
        name: 'Test Holiday',
        type: 'public',
        state
      }];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, state);

      expect(bridgeDays).toHaveLength(1);
      expect(bridgeDays[0].efficiency).toBeLessThan(4.0); // Should be reduced by summer penalty
    });

    it('should apply shoulder season bonus', () => {
      // Using Tag der Arbeit in May (shoulder season)
      const holidays: Holiday[] = [{
        date: new Date('2025-05-01'),
        name: 'Tag der Arbeit',
        type: 'public',
        state
      }];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, state);

      expect(bridgeDays).toHaveLength(1);
      expect(bridgeDays[0].efficiency).toBeGreaterThan(4.0); // Should be increased by shoulder season bonus
    });

    it('should apply off-peak bonus', () => {
      // Using a Thursday in March (off-peak)
      const holidays: Holiday[] = [{
        date: new Date('2025-03-20'), // Thursday in March
        name: 'Test Holiday',
        type: 'public',
        state
      }];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, state);

      expect(bridgeDays).toHaveLength(1);
      expect(bridgeDays[0].efficiency).toBeGreaterThan(2.0); // Should be increased by off-peak bonus
    });
  });

  describe('school holiday handling', () => {
    it('should skip bridge days during school holidays', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2025-07-24'), // Thursday
          name: 'Test Holiday',
          type: 'public',
          state
        },
        {
          date: new Date('2025-07-01'),
          name: 'Sommerferien Berlin',
          type: 'school',
          state,
          startDate: new Date('2025-07-01'),
          endDate: new Date('2025-08-31')
        }
      ];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, state);
      expect(bridgeDays).toHaveLength(0);
    });
  });

  describe('sorting and efficiency', () => {
    it('should sort bridge days by efficiency', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2024-05-09'), // Thursday in May (shoulder season)
          name: 'Holiday 1',
          type: 'public',
          state
        },
        {
          date: new Date('2024-07-25'), // Thursday in July (peak season)
          name: 'Holiday 2',
          type: 'public',
          state
        }
      ];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, state);
      expect(bridgeDays).toHaveLength(2);
      expect(bridgeDays[0].efficiency).toBeGreaterThan(bridgeDays[1].efficiency);
      expect(bridgeDays[0].date).toEqual(new Date('2024-05-10')); // May date should be first
    });
  });

  describe('future bridge days', () => {
    it('should find bridge days beyond June 2025', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2025-10-03'), // Tag der Deutschen Einheit (Friday)
          name: 'Tag der Deutschen Einheit',
          type: 'public',
          state
        },
        {
          date: new Date('2025-12-25'), // 1. Weihnachtstag (Thursday)
          name: '1. Weihnachtstag',
          type: 'public',
          state
        },
        {
          date: new Date('2025-12-26'), // 2. Weihnachtstag (Friday)
          name: '2. Weihnachtstag',
          type: 'public',
          state
        }
      ];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, state);

      // Should find bridge days in October and December 2025
      expect(bridgeDays).toContainEqual(
        expect.objectContaining({
          date: new Date('2025-10-02'), // Thursday before Tag der Deutschen Einheit
          pattern: expect.any(String)
        })
      );

      expect(bridgeDays).toContainEqual(
        expect.objectContaining({
          date: new Date('2025-12-24'), // Wednesday before Christmas
          pattern: expect.any(String)
        })
      );
    });

    it('should calculate efficiency correctly for late 2025 bridge days', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2025-12-25'), // 1. Weihnachtstag (Thursday)
          name: '1. Weihnachtstag',
          type: 'public',
          state
        },
        {
          date: new Date('2025-12-26'), // 2. Weihnachtstag (Friday)
          name: '2. Weihnachtstag',
          type: 'public',
          state
        }
      ];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, state);
      const christmasBridgeDay = bridgeDays.find(bd => 
        bd.date.getTime() === new Date('2025-12-24').getTime()
      );

      expect(christmasBridgeDay).toBeDefined();
      expect(christmasBridgeDay?.efficiency).toBeGreaterThan(3.0); // 4 days off (Wed-Sat) for 1 vacation day
    });
  });
}); 