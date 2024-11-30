import { bridgeDayService } from '../bridgeDayService';
import { Holiday } from '../../types/holiday';
import { GermanState } from '../../types/germanState';

describe('bridgeDayService', () => {
  describe('calculateBridgeDays', () => {
    it('should identify a bridge day between a holiday and a weekend', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2024-05-09'),
          name: 'Christi Himmelfahrt',
          type: 'public',
          state: 'BE' as GermanState
        }
      ];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, 'BE' as GermanState);

      expect(bridgeDays).toHaveLength(1);
      expect(bridgeDays[0].date).toEqual(new Date('2024-05-10'));
    });

    it('should identify a bridge day between two holidays', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2024-05-09'),
          name: 'Christi Himmelfahrt',
          type: 'public',
          state: 'BE' as GermanState
        },
        {
          date: new Date('2024-05-11'),
          name: 'Another Holiday',
          type: 'public',
          state: 'BE' as GermanState
        }
      ];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, 'BE' as GermanState);

      expect(bridgeDays).toHaveLength(1);
      expect(bridgeDays[0].date).toEqual(new Date('2024-05-10'));
    });

    it('should identify a bridge day between a holiday and school holidays', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2024-05-09'),
          name: 'Christi Himmelfahrt',
          type: 'public',
          state: 'BE' as GermanState
        },
        {
          date: new Date('2024-05-11'),
          name: 'School Holiday',
          type: 'regional',
          state: 'BE' as GermanState,
          endDate: new Date('2024-05-19')
        }
      ];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, 'BE' as GermanState);

      expect(bridgeDays).toHaveLength(1);
      expect(bridgeDays[0].date).toEqual(new Date('2024-05-10'));
    });

    it('should not identify bridge days when next day is a weekend', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2024-05-10'),
          name: 'Holiday',
          type: 'public',
          state: 'BE' as GermanState
        }
      ];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, 'BE' as GermanState);
      expect(bridgeDays).toHaveLength(0);
    });

    it('should not identify days during school holidays as bridge days', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2024-05-09'),
          name: 'Christi Himmelfahrt',
          type: 'public',
          state: 'BE' as GermanState
        },
        {
          date: new Date('2024-05-08'),
          name: 'School Holiday',
          type: 'regional',
          state: 'BE' as GermanState,
          endDate: new Date('2024-05-12')
        }
      ];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, 'BE' as GermanState);
      expect(bridgeDays).toHaveLength(0);
    });

    it('should identify only one bridge day when multiple opportunities exist', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2024-05-09'),
          name: 'Christi Himmelfahrt',
          type: 'public',
          state: 'BE' as GermanState
        },
        {
          date: new Date('2024-05-11'),
          name: 'Another Holiday',
          type: 'public',
          state: 'BE' as GermanState
        }
      ];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, 'BE' as GermanState);

      expect(bridgeDays).toHaveLength(1);
      expect(bridgeDays[0].date).toEqual(new Date('2024-05-10'));
    });

    it('should not identify bridge days between school holidays and public holidays', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2024-10-31'),
          name: 'School Holiday',
          type: 'regional',
          state: 'BE' as GermanState,
          endDate: new Date('2024-10-31')
        },
        {
          date: new Date('2024-11-01'),
          name: 'Allerheiligen',
          type: 'public',
          state: 'BE' as GermanState
        }
      ];

      const beBridgeDays = bridgeDayService.calculateBridgeDays(holidays, 'BE' as GermanState);
      expect(beBridgeDays).toHaveLength(0);

      const holidays2: Holiday[] = [
        {
          date: new Date('2024-10-31'),
          name: 'School Holiday',
          type: 'regional',
          state: 'BW' as GermanState,
          endDate: new Date('2024-10-31')
        },
        {
          date: new Date('2024-11-01'),
          name: 'Allerheiligen',
          type: 'public',
          state: 'BW' as GermanState
        }
      ];

      const bwBridgeDays = bridgeDayService.calculateBridgeDays(holidays2, 'BW' as GermanState);
      expect(bwBridgeDays).toHaveLength(0);
    });
  });
}); 