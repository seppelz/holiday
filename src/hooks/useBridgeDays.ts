import { useState, useEffect } from 'react';
import { Holiday, BridgeDay } from '../types/holiday';
import { GermanState } from '../types/GermanState';
import { bridgeDayService } from '../services/bridgeDayService';
import { holidayService } from '../services/holidayService';
import { isSameDay } from 'date-fns';

export function useBridgeDays(state: GermanState | null) {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [bridgeDays, setBridgeDays] = useState<BridgeDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      setIsLoading(true);
      try {
        if (!state) {
          setHolidays([]);
          setBridgeDays([]);
          setIsLoading(false);
          return;
        }

        const [publicHolidays, schoolHolidays] = await Promise.all([
          holidayService.getPublicHolidays(state),
          holidayService.getSchoolHolidays(state)
        ]);
        
        // Combine holidays, ensuring no duplicates by date and name
        const allHolidays = [...publicHolidays];
        schoolHolidays.forEach(schoolHoliday => {
          const existingHoliday = allHolidays.find(h => 
            isSameDay(h.date, schoolHoliday.date) && h.name === schoolHoliday.name
          );
          if (!existingHoliday) {
            allHolidays.push(schoolHoliday);
          }
        });

        setHolidays(allHolidays);
        
        // Calculate bridge days from public holidays only
        const calculatedBridgeDays = bridgeDayService.calculateBridgeDays(publicHolidays, state);
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
  }, [state]);

  return { holidays, bridgeDays, isLoading };
} 