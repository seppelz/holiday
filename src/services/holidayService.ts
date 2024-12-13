import { Holiday, SingleDayHoliday, MultiDayHoliday } from '../types/holiday';
import { GermanState } from '../types/GermanState';
import { holidays } from '../data/holidays';
import { parseDateString } from '../utils/dateUtils';

const isValidDate = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};

const capitalizeHolidayName = (name: string): string => {
  // Split by spaces and capitalize each word
  return name.split(' ').map(word => {
    // Special handling for state abbreviations and specific words
    if (word === 'baden-württemberg') return 'Baden-Württemberg';
    if (word === 'nordrhein-westfalen') return 'Nordrhein-Westfalen';
    if (word === 'rheinland-pfalz') return 'Rheinland-Pfalz';
    if (word === 'sachsen-anhalt') return 'Sachsen-Anhalt';
    if (word === 'mecklenburg-vorpommern') return 'Mecklenburg-Vorpommern';
    if (word === '(beweglicher') return '(Beweglicher';
    if (word === 'ferientag)') return 'Ferientag)';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

const getHolidaysForYear = (year: number, stateCode: GermanState) => {
  const allHolidays = holidays.publicHolidays[year]?.ALL || [];
  const stateHolidays = holidays.publicHolidays[year]?.[stateCode] || [];
  
  return {
    school: holidays.schoolHolidays[year]?.[stateCode] || [],
    public: [
      ...allHolidays.map(h => ({ ...h, state: stateCode })),
      ...stateHolidays.map(h => ({ ...h, state: stateCode }))
    ]
  };
};

export const holidayService = {
  async getSchoolHolidays(stateCode: GermanState | null): Promise<MultiDayHoliday[]> {
    if (!stateCode) return [];
    
    try {
      const holidays2025 = getHolidaysForYear(2025, stateCode).school;
      
      return holidays2025
        .map(holiday => {
          const start = parseDateString(holiday.start);
          const end = holiday.end ? parseDateString(holiday.end) : start;
          
          if (!isValidDate(start) || !isValidDate(end)) {
            console.error('Invalid school holiday dates:', holiday);
            return null;
          }
          
          const holidayObj: MultiDayHoliday = {
            ...holiday,
            name: capitalizeHolidayName(holiday.name), // Capitalize the holiday name
            date: start,
            endDate: end,
            type: 'school',
            state: stateCode
          };
          
          return holidayObj;
        })
        .filter((h): h is MultiDayHoliday => h !== null);
    } catch (error) {
      console.error('Error getting school holidays:', error);
      return [];
    }
  },

  async getPublicHolidays(stateCode: GermanState | null): Promise<SingleDayHoliday[]> {
    if (!stateCode) return [];
    
    try {
      const holidays2025 = getHolidaysForYear(2025, stateCode).public;
      
      return holidays2025
        .map(holiday => {
          const date = parseDateString(holiday.start);
          
          if (!isValidDate(date)) {
            console.error('Invalid public holiday date:', holiday);
            return null;
          }
          
          const holidayObj: SingleDayHoliday = {
            ...holiday,
            date,
            type: 'public',
            state: stateCode
          };
          
          return holidayObj;
        })
        .filter((h): h is SingleDayHoliday => h !== null);
    } catch (error) {
      console.error('Error getting public holidays:', error);
      return [];
    }
  }
};