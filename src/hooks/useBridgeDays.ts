import { useQuery } from '@tanstack/react-query';
import { bridgeDayService } from '../services/bridgeDayService';
import { holidayService } from '../services/holidayService';
import type { Holiday, BridgeDay, GermanState } from '../types/holiday';

interface UseBridgeDaysOptions {
  state: GermanState;
  year: number;
}

interface UseBridgeDaysResult {
  holidays: Holiday[];
  bridgeDays: BridgeDay[];
  isLoading: boolean;
  error: Error | null;
}

export function useBridgeDays({
  state,
  year,
}: UseBridgeDaysOptions): UseBridgeDaysResult {
  const {
    data: holidays = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['holidays', state, year],
    queryFn: async () => {
      const [schoolHolidays, publicHolidays] = await Promise.all([
        holidayService.getSchoolHolidays(state, year),
        holidayService.getPublicHolidays(state, year),
      ]);
      return [...schoolHolidays, ...publicHolidays];
    },
  });

  // Calculate bridge days
  const bridgeDays = bridgeDayService.calculateBridgeDays(holidays, state);

  return {
    holidays,
    bridgeDays,
    isLoading,
    error: error as Error | null,
  };
} 