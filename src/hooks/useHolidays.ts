import { useState, useEffect, useMemo } from 'react';
import { Holiday } from '../types/holiday';
import { holidayService } from '../services/holidayService';
import { usePersonContext } from '../contexts/PersonContext';
import { GermanState } from '../types/GermanState';

// Cache for holiday data
const holidayCache: Record<GermanState, { 
  public: Holiday[]; 
  school: Holiday[]; 
  timestamp: number;
}> = {} as any;

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function useHolidays() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { persons } = usePersonContext();

  // Memoize the states to prevent unnecessary re-fetches
  const states = useMemo(() => {
    const result: GermanState[] = [];
    if (persons.person1.selectedState) {
      result.push(persons.person1.selectedState);
    }
    if (persons.person2?.selectedState) {
      result.push(persons.person2.selectedState);
    }
    return result;
  }, [persons.person1.selectedState, persons.person2?.selectedState]);

  useEffect(() => {
    const fetchHolidays = async () => {
      setIsLoading(true);
      try {
        const allHolidays: Holiday[] = [];
        const now = Date.now();

        // Helper function to get holidays with caching
        const getHolidaysForState = async (state: GermanState) => {
          // Check cache
          if (holidayCache[state] && (now - holidayCache[state].timestamp) < CACHE_DURATION) {
            return {
              publicHolidays: holidayCache[state].public,
              schoolHolidays: holidayCache[state].school
            };
          }

          // Fetch new data
          const [publicHolidays, schoolHolidays] = await Promise.all([
            holidayService.getPublicHolidays(state),
            holidayService.getSchoolHolidays(state)
          ]);

          // Update cache
          holidayCache[state] = {
            public: publicHolidays,
            school: schoolHolidays,
            timestamp: now
          };

          return { publicHolidays, schoolHolidays };
        };

        // Fetch holidays for all required states
        await Promise.all(states.map(async (state) => {
          const { publicHolidays, schoolHolidays } = await getHolidaysForState(state);
          allHolidays.push(...publicHolidays, ...schoolHolidays);
        }));

        // Remove duplicates based on date and name
        const uniqueHolidays = allHolidays.reduce((acc: Holiday[], holiday) => {
          const exists = acc.some(h => 
            h.date.getTime() === holiday.date.getTime() && 
            h.name === holiday.name
          );
          if (!exists) acc.push(holiday);
          return acc;
        }, []);

        setHolidays(uniqueHolidays);
      } catch (error) {
        console.error('Error fetching holidays:', error);
        setHolidays([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (states.length > 0) {
      fetchHolidays();
    } else {
      setHolidays([]);
      setIsLoading(false);
    }
  }, [states]);

  return { holidays, isLoading };
} 