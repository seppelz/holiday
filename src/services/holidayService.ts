import { Holiday, GermanState } from '../types/holiday';

export const holidayService = {
  async getSchoolHolidays(state: GermanState, year: number): Promise<Holiday[]> {
    const response = await fetch(`https://ferien-api.de/api/v1/holidays/${state}/${year}`);
    const data = await response.json();
    return data.map((holiday: any) => ({
      date: new Date(holiday.start),
      name: holiday.name,
      type: 'regional',
      region: state
    }));
  },

  async getPublicHolidays(state: GermanState, year: number): Promise<Holiday[]> {
    const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/DE`);
    const data = await response.json();
    return data
      .filter((holiday: any) => holiday.counties?.includes(state))
      .map((holiday: any) => ({
        date: new Date(holiday.date),
        name: holiday.localName,
        type: 'public'
      }));
  }
}; 