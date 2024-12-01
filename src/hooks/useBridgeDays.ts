import { useState, useEffect } from 'react';
import { Holiday } from '../types/holiday';
import { GermanState } from '../types/GermanState';
import { bridgeDayService } from '../services/bridgeDayService';
import { holidayService } from '../services/holidayService';

export function useBridgeDays(state: GermanState | null) {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [bridgeDays, setBridgeDays] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      setIsLoading(true);
      try {
        if (!state) {
          setHolidays([]);
          setBridgeDays([]);
          return;
        }

        const [publicHolidays, schoolHolidays] = await Promise.all([
          holidayService.getPublicHolidays(state),
          holidayService.getSchoolHolidays(state.toString())
        ]);
        
        const allHolidays = [...publicHolidays, ...schoolHolidays];
        setHolidays(allHolidays);
        
        // Calculate bridge days from public holidays only
        const calculatedBridgeDays = bridgeDayService.calculateBridgeDays(publicHolidays, state);
        setBridgeDays(calculatedBridgeDays.map(bd => bd.date));
      } catch (error) {
        console.error('Error fetching holidays:', error);
        setHolidays([]);
        setBridgeDays([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHolidays();
  }, [state]);

  return { holidays, bridgeDays, isLoading };
} 