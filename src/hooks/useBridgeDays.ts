import { useState, useEffect, useMemo } from 'react';
import { Holiday, BridgeDay } from '../types/holiday';
import { GermanState } from '../types/GermanState';
import { bridgeDayService } from '../services/bridgeDayService';
import { holidayService } from '../services/holidayService';
import { isSameDay } from 'date-fns';

// Cache for bridge day calculations
const bridgeDayCache: Record<GermanState, {
  holidays: Holiday[];
  bridgeDays: BridgeDay[];
  timestamp: number;
}> = {} as any;

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function useBridgeDays(state: GermanState | null) {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [bridgeDays, setBridgeDays] = useState<BridgeDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize the state to prevent unnecessary re-fetches
  const memoizedState = useMemo(() => state, [state]);

  useEffect(() => {
    const fetchHolidays = async () => {
      setIsLoading(true);
      try {
        if (!memoizedState) {
          setHolidays([]);
          setBridgeDays([]);
          setIsLoading(false);
          return;
        }

        const now = Date.now();

        // Check cache
        if (bridgeDayCache[memoizedState] && 
            (now - bridgeDayCache[memoizedState].timestamp) < CACHE_DURATION) {
          setHolidays(bridgeDayCache[memoizedState].holidays);
          setBridgeDays(bridgeDayCache[memoizedState].bridgeDays);
          setIsLoading(false);
          return;
        }

        // Fetch new data
        const [publicHolidays, schoolHolidays] = await Promise.all([
          holidayService.getPublicHolidays(memoizedState),
          holidayService.getSchoolHolidays(memoizedState)
        ]);
        
        // Combine holidays, ensuring no duplicates by date and name
        const allHolidays: Holiday[] = [...publicHolidays];
        schoolHolidays.forEach(holiday => {
          const exists = allHolidays.some(h => 
            isSameDay(new Date(h.date), new Date(holiday.date)) && 
            h.name === holiday.name
          );
          if (!exists) allHolidays.push(holiday);
        });

        // Calculate bridge days from public holidays only
        const calculatedBridgeDays = bridgeDayService.calculateBridgeDays(publicHolidays, memoizedState);

        // Update cache
        bridgeDayCache[memoizedState] = {
          holidays: allHolidays,
          bridgeDays: calculatedBridgeDays,
          timestamp: now
        };

        setHolidays(allHolidays);
        setBridgeDays(calculatedBridgeDays);
      } catch (error) {
        console.error('Error fetching holidays:', error);
        setHolidays([]);
        setBridgeDays([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHolidays();
  }, [memoizedState]);

  // Memoize the return value to prevent unnecessary re-renders
  const result = useMemo(() => ({
    holidays,
    bridgeDays,
    isLoading
  }), [holidays, bridgeDays, isLoading]);

  return result;
} 