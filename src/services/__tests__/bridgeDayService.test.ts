import { bridgeDayService } from '../bridgeDayService';
import { Holiday, GermanState } from '../../types/holiday';

describe('bridgeDayService', () => {
  describe('calculateBridgeDays', () => {
    it('should find a bridge day for Friday after Thursday holiday', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2024-05-09T12:00:00+02:00'),
          name: 'Christi Himmelfahrt',
          type: 'public'
        }
      ];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays);
      expect(bridgeDays).toHaveLength(1);
      expect(bridgeDays[0]).toMatchObject({
        type: 'bridge',
        requiredVacationDays: 1,
        totalDaysOff: 4, // Thu-Sun
        efficiency: 4,
      });
    });

    it('should find a bridge day for Tuesday after Monday holiday', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2024-06-10T12:00:00+02:00'),
          name: 'Pfingstmontag',
          type: 'public'
        }
      ];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays);
      expect(bridgeDays).toHaveLength(1);
      expect(bridgeDays[0]).toMatchObject({
        type: 'bridge',
        requiredVacationDays: 1,
        totalDaysOff: 4, // Sat-Tue
        efficiency: 4,
      });
    });

    it('should find bridge days around Wednesday holiday', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2024-05-01T12:00:00+02:00'),
          name: 'Tag der Arbeit',
          type: 'public'
        }
      ];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays);
      expect(bridgeDays).toHaveLength(2);
      expect(bridgeDays[0]).toMatchObject({
        type: 'bridge',
        requiredVacationDays: 2,
        totalDaysOff: 5, // Mon-Fri
        efficiency: 2.5,
      });
      expect(bridgeDays[1]).toMatchObject({
        type: 'bridge',
        requiredVacationDays: 2,
        totalDaysOff: 5, // Wed-Sun
        efficiency: 2.5,
      });
    });

    it('should merge connected bridge days', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2024-05-30T12:00:00+02:00'),
          name: 'Fronleichnam',
          type: 'public'
        },
        {
          date: new Date('2024-06-03T12:00:00+02:00'),
          name: 'Pfingstmontag',
          type: 'public'
        }
      ];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays);
      expect(bridgeDays).toHaveLength(1);
      expect(bridgeDays[0]).toMatchObject({
        type: 'bridge',
        requiredVacationDays: 1,
        totalDaysOff: 6, // Thu-Tue
        efficiency: 6,
      });
    });

    it('should not create bridge days for holidays too far apart', () => {
      const holidays: Holiday[] = [
        {
          date: new Date('2024-05-01T12:00:00+02:00'),
          name: 'Tag der Arbeit',
          type: 'public'
        },
        {
          date: new Date('2024-05-20T12:00:00+02:00'),
          name: 'Pfingstmontag',
          type: 'public'
        }
      ];

      const bridgeDays = bridgeDayService.calculateBridgeDays(holidays);
      expect(bridgeDays).toHaveLength(0);
    });

    describe('Regional Holidays', () => {
      it('should handle regional holidays based on state', () => {
        // Real example from 2024 calendar
        const holidays: Holiday[] = [
          {
            date: new Date('2024-05-30T12:00:00+02:00'),
            name: 'Fronleichnam',
            type: 'regional',
            region: 'BW' as GermanState
          },
          {
            date: new Date('2024-06-03T12:00:00+02:00'),
            name: 'Pfingstmontag',
            type: 'public'
          }
        ];

        // Baden-Württemberg gets all holidays
        const bwBridgeDays = bridgeDayService.calculateBridgeDays(holidays, 'BW' as GermanState);
        expect(bwBridgeDays).toHaveLength(1);
        expect(bwBridgeDays[0]).toMatchObject({
          type: 'bridge',
          requiredVacationDays: 1,
          totalDaysOff: 6, // Thu-Tue (Fronleichnam + Pfingstmontag)
          efficiency: 6,
        });

        // Berlin only gets public holidays
        const beBridgeDays = bridgeDayService.calculateBridgeDays(holidays, 'BE' as GermanState);
        expect(beBridgeDays).toHaveLength(1);
        expect(beBridgeDays[0]).toMatchObject({
          type: 'bridge',
          requiredVacationDays: 1,
          totalDaysOff: 4, // Sat-Tue (around Pfingstmontag)
          efficiency: 4,
        });
      });
    });
  });
}); 