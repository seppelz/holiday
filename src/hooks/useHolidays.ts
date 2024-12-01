import { useState, useEffect } from 'react';
import { Holiday } from '../types/holiday';
import { holidayService } from '../services/holidayService';
import { usePersonContext } from '../contexts/PersonContext';

export function useHolidays() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { persons } = usePersonContext();

  useEffect(() => {
    const fetchHolidays = async () => {
      setIsLoading(true);
      try {
        const allHolidays: Holiday[] = [];

        // Fetch holidays for person 1
        if (persons.person1.selectedState) {
          const [publicHolidays, schoolHolidays] = await Promise.all([
            holidayService.getPublicHolidays(persons.person1.selectedState),
            holidayService.getSchoolHolidays(persons.person1.selectedState)
          ]);
          allHolidays.push(...publicHolidays, ...schoolHolidays);
        }

        // Fetch holidays for person 2 if exists
        if (persons.person2?.selectedState) {
          const [publicHolidays, schoolHolidays] = await Promise.all([
            holidayService.getPublicHolidays(persons.person2.selectedState),
            holidayService.getSchoolHolidays(persons.person2.selectedState)
          ]);
          allHolidays.push(...publicHolidays, ...schoolHolidays);
        }

        setHolidays(allHolidays);
      } catch (error) {
        console.error('Error fetching holidays:', error);
        setHolidays([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHolidays();
  }, [persons.person1.selectedState, persons.person2?.selectedState]);

  return { holidays, isLoading };
} 