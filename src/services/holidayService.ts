import { Holiday } from '../types/holiday';
import { GermanState } from '../types/GermanState';
import { schoolHolidays2025 } from '../data/schoolHolidays2025';

// Static public holidays data for 2025
const publicHolidays2025: Record<GermanState, Array<{ name: string; date: string }>> = {
  BW: [
    { name: 'Neujahr', date: '2025-01-01' },
    { name: 'Heilige Drei Könige', date: '2025-01-06' },
    { name: 'Karfreitag', date: '2025-04-18' },
    { name: 'Ostermontag', date: '2025-04-21' },
    { name: 'Tag der Arbeit', date: '2025-05-01' },
    { name: 'Christi Himmelfahrt', date: '2025-05-29' },
    { name: 'Pfingstmontag', date: '2025-06-09' },
    { name: 'Fronleichnam', date: '2025-06-19' },
    { name: 'Tag der Deutschen Einheit', date: '2025-10-03' },
    { name: 'Allerheiligen', date: '2025-11-01' },
    { name: '1. Weihnachtstag', date: '2025-12-25' },
    { name: '2. Weihnachtstag', date: '2025-12-26' }
  ],
  BY: [
    { name: 'Neujahr', date: '2025-01-01' },
    { name: 'Heilige Drei Könige', date: '2025-01-06' },
    { name: 'Karfreitag', date: '2025-04-18' },
    { name: 'Ostermontag', date: '2025-04-21' },
    { name: 'Tag der Arbeit', date: '2025-05-01' },
    { name: 'Christi Himmelfahrt', date: '2025-05-29' },
    { name: 'Pfingstmontag', date: '2025-06-09' },
    { name: 'Fronleichnam', date: '2025-06-19' },
    { name: 'Mariä Himmelfahrt', date: '2025-08-15' },
    { name: 'Tag der Deutschen Einheit', date: '2025-10-03' },
    { name: 'Allerheiligen', date: '2025-11-01' },
    { name: '1. Weihnachtstag', date: '2025-12-25' },
    { name: '2. Weihnachtstag', date: '2025-12-26' }
  ],
  BE: [
    { name: 'Neujahr', date: '2025-01-01' },
    { name: 'Internationaler Frauentag', date: '2025-03-08' },
    { name: 'Karfreitag', date: '2025-04-18' },
    { name: 'Ostermontag', date: '2025-04-21' },
    { name: 'Tag der Arbeit', date: '2025-05-01' },
    { name: 'Christi Himmelfahrt', date: '2025-05-29' },
    { name: 'Pfingstmontag', date: '2025-06-09' },
    { name: 'Tag der Deutschen Einheit', date: '2025-10-03' },
    { name: '1. Weihnachtstag', date: '2025-12-25' },
    { name: '2. Weihnachtstag', date: '2025-12-26' }
  ],
  BB: [
    { name: 'Neujahr', date: '2025-01-01' },
    { name: 'Karfreitag', date: '2025-04-18' },
    { name: 'Ostermontag', date: '2025-04-21' },
    { name: 'Tag der Arbeit', date: '2025-05-01' },
    { name: 'Christi Himmelfahrt', date: '2025-05-29' },
    { name: 'Pfingstmontag', date: '2025-06-09' },
    { name: 'Tag der Deutschen Einheit', date: '2025-10-03' },
    { name: '1. Weihnachtstag', date: '2025-12-25' },
    { name: '2. Weihnachtstag', date: '2025-12-26' }
  ],
  HB: [
    { name: 'Neujahr', date: '2025-01-01' },
    { name: 'Karfreitag', date: '2025-04-18' },
    { name: 'Ostermontag', date: '2025-04-21' },
    { name: 'Tag der Arbeit', date: '2025-05-01' },
    { name: 'Christi Himmelfahrt', date: '2025-05-29' },
    { name: 'Pfingstmontag', date: '2025-06-09' },
    { name: 'Tag der Deutschen Einheit', date: '2025-10-03' },
    { name: 'Reformationstag', date: '2025-10-31' },
    { name: '1. Weihnachtstag', date: '2025-12-25' },
    { name: '2. Weihnachtstag', date: '2025-12-26' }
  ],
  HH: [
    { name: 'Neujahr', date: '2025-01-01' },
    { name: 'Karfreitag', date: '2025-04-18' },
    { name: 'Ostermontag', date: '2025-04-21' },
    { name: 'Tag der Arbeit', date: '2025-05-01' },
    { name: 'Christi Himmelfahrt', date: '2025-05-29' },
    { name: 'Pfingstmontag', date: '2025-06-09' },
    { name: 'Tag der Deutschen Einheit', date: '2025-10-03' },
    { name: '1. Weihnachtstag', date: '2025-12-25' },
    { name: '2. Weihnachtstag', date: '2025-12-26' }
  ],
  HE: [
    { name: 'Neujahr', date: '2025-01-01' },
    { name: 'Karfreitag', date: '2025-04-18' },
    { name: 'Ostermontag', date: '2025-04-21' },
    { name: 'Tag der Arbeit', date: '2025-05-01' },
    { name: 'Christi Himmelfahrt', date: '2025-05-29' },
    { name: 'Pfingstmontag', date: '2025-06-09' },
    { name: 'Fronleichnam', date: '2025-06-19' },
    { name: 'Tag der Deutschen Einheit', date: '2025-10-03' },
    { name: '1. Weihnachtstag', date: '2025-12-25' },
    { name: '2. Weihnachtstag', date: '2025-12-26' }
  ],
  MV: [
    { name: 'Neujahr', date: '2025-01-01' },
    { name: 'Karfreitag', date: '2025-04-18' },
    { name: 'Ostermontag', date: '2025-04-21' },
    { name: 'Tag der Arbeit', date: '2025-05-01' },
    { name: 'Christi Himmelfahrt', date: '2025-05-29' },
    { name: 'Pfingstmontag', date: '2025-06-09' },
    { name: 'Tag der Deutschen Einheit', date: '2025-10-03' },
    { name: 'Reformationstag', date: '2025-10-31' },
    { name: '1. Weihnachtstag', date: '2025-12-25' },
    { name: '2. Weihnachtstag', date: '2025-12-26' }
  ],
  NI: [
    { name: 'Neujahr', date: '2025-01-01' },
    { name: 'Karfreitag', date: '2025-04-18' },
    { name: 'Ostermontag', date: '2025-04-21' },
    { name: 'Tag der Arbeit', date: '2025-05-01' },
    { name: 'Christi Himmelfahrt', date: '2025-05-29' },
    { name: 'Pfingstmontag', date: '2025-06-09' },
    { name: 'Tag der Deutschen Einheit', date: '2025-10-03' },
    { name: 'Reformationstag', date: '2025-10-31' },
    { name: '1. Weihnachtstag', date: '2025-12-25' },
    { name: '2. Weihnachtstag', date: '2025-12-26' }
  ],
  NW: [
    { name: 'Neujahr', date: '2025-01-01' },
    { name: 'Karfreitag', date: '2025-04-18' },
    { name: 'Ostermontag', date: '2025-04-21' },
    { name: 'Tag der Arbeit', date: '2025-05-01' },
    { name: 'Christi Himmelfahrt', date: '2025-05-29' },
    { name: 'Pfingstmontag', date: '2025-06-09' },
    { name: 'Fronleichnam', date: '2025-06-19' },
    { name: 'Tag der Deutschen Einheit', date: '2025-10-03' },
    { name: 'Allerheiligen', date: '2025-11-01' },
    { name: '1. Weihnachtstag', date: '2025-12-25' },
    { name: '2. Weihnachtstag', date: '2025-12-26' }
  ],
  RP: [
    { name: 'Neujahr', date: '2025-01-01' },
    { name: 'Karfreitag', date: '2025-04-18' },
    { name: 'Ostermontag', date: '2025-04-21' },
    { name: 'Tag der Arbeit', date: '2025-05-01' },
    { name: 'Christi Himmelfahrt', date: '2025-05-29' },
    { name: 'Pfingstmontag', date: '2025-06-09' },
    { name: 'Fronleichnam', date: '2025-06-19' },
    { name: 'Tag der Deutschen Einheit', date: '2025-10-03' },
    { name: 'Allerheiligen', date: '2025-11-01' },
    { name: '1. Weihnachtstag', date: '2025-12-25' },
    { name: '2. Weihnachtstag', date: '2025-12-26' }
  ],
  SL: [
    { name: 'Neujahr', date: '2025-01-01' },
    { name: 'Karfreitag', date: '2025-04-18' },
    { name: 'Ostermontag', date: '2025-04-21' },
    { name: 'Tag der Arbeit', date: '2025-05-01' },
    { name: 'Christi Himmelfahrt', date: '2025-05-29' },
    { name: 'Pfingstmontag', date: '2025-06-09' },
    { name: 'Fronleichnam', date: '2025-06-19' },
    { name: 'Mariä Himmelfahrt', date: '2025-08-15' },
    { name: 'Tag der Deutschen Einheit', date: '2025-10-03' },
    { name: 'Allerheiligen', date: '2025-11-01' },
    { name: '1. Weihnachtstag', date: '2025-12-25' },
    { name: '2. Weihnachtstag', date: '2025-12-26' }
  ],
  SN: [
    { name: 'Neujahr', date: '2025-01-01' },
    { name: 'Karfreitag', date: '2025-04-18' },
    { name: 'Ostermontag', date: '2025-04-21' },
    { name: 'Tag der Arbeit', date: '2025-05-01' },
    { name: 'Christi Himmelfahrt', date: '2025-05-29' },
    { name: 'Pfingstmontag', date: '2025-06-09' },
    { name: 'Tag der Deutschen Einheit', date: '2025-10-03' },
    { name: 'Reformationstag', date: '2025-10-31' },
    { name: 'Buß- und Bettag', date: '2025-11-19' },
    { name: '1. Weihnachtstag', date: '2025-12-25' },
    { name: '2. Weihnachtstag', date: '2025-12-26' }
  ],
  ST: [
    { name: 'Neujahr', date: '2025-01-01' },
    { name: 'Heilige Drei Könige', date: '2025-01-06' },
    { name: 'Karfreitag', date: '2025-04-18' },
    { name: 'Ostermontag', date: '2025-04-21' },
    { name: 'Tag der Arbeit', date: '2025-05-01' },
    { name: 'Christi Himmelfahrt', date: '2025-05-29' },
    { name: 'Pfingstmontag', date: '2025-06-09' },
    { name: 'Tag der Deutschen Einheit', date: '2025-10-03' },
    { name: 'Reformationstag', date: '2025-10-31' },
    { name: '1. Weihnachtstag', date: '2025-12-25' },
    { name: '2. Weihnachtstag', date: '2025-12-26' }
  ],
  SH: [
    { name: 'Neujahr', date: '2025-01-01' },
    { name: 'Karfreitag', date: '2025-04-18' },
    { name: 'Ostermontag', date: '2025-04-21' },
    { name: 'Tag der Arbeit', date: '2025-05-01' },
    { name: 'Christi Himmelfahrt', date: '2025-05-29' },
    { name: 'Pfingstmontag', date: '2025-06-09' },
    { name: 'Tag der Deutschen Einheit', date: '2025-10-03' },
    { name: '1. Weihnachtstag', date: '2025-12-25' },
    { name: '2. Weihnachtstag', date: '2025-12-26' }
  ],
  TH: [
    { name: 'Neujahr', date: '2025-01-01' },
    { name: 'Karfreitag', date: '2025-04-18' },
    { name: 'Ostermontag', date: '2025-04-21' },
    { name: 'Tag der Arbeit', date: '2025-05-01' },
    { name: 'Christi Himmelfahrt', date: '2025-05-29' },
    { name: 'Pfingstmontag', date: '2025-06-09' },
    { name: 'Tag der Deutschen Einheit', date: '2025-10-03' },
    { name: 'Reformationstag', date: '2025-10-31' },
    { name: '1. Weihnachtstag', date: '2025-12-25' },
    { name: '2. Weihnachtstag', date: '2025-12-26' }
  ]
};

export const holidayService = {
  async getSchoolHolidays(stateCode: string): Promise<Holiday[]> {
    try {
      const stateHolidays = schoolHolidays2025[stateCode as keyof typeof schoolHolidays2025] || [];
      
      return stateHolidays.map(holiday => ({
        date: new Date(holiday.start),
        endDate: new Date(holiday.end),
        name: holiday.name,
        type: 'regional' as const,
        state: stateCode as GermanState
      }));
    } catch (error) {
      console.error('Error getting school holidays:', error);
      return [];
    }
  },

  async getPublicHolidays(state: GermanState): Promise<Holiday[]> {
    try {
      const stateHolidays = publicHolidays2025[state] || [];
      
      return stateHolidays.map(holiday => ({
        date: new Date(holiday.date),
        name: holiday.name,
        type: 'public' as const,
        state: state
      }));
    } catch (error) {
      console.error('Error getting public holidays:', error);
      return [];
    }
  }
}; 