import { Holiday, SingleDayHoliday, MultiDayHoliday } from '../types/holiday';
import { GermanState } from '../types/germanState';
import { holidays } from '../data/holidays';
import { parseDateString } from '../utils/dateUtils';

const isValidDate = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
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
          const end = parseDateString(holiday.end);
          
          if (!isValidDate(start) || !isValidDate(end)) {
            console.error('Invalid school holiday dates:', holiday);
            return null;
          }
          
          const holidayObj: MultiDayHoliday = {
            ...holiday,
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