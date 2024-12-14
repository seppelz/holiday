export interface HolidayDetails {
  description: string;
  traditions?: string[];
  culturalSignificance?: string;
  locations?: string[];
}

export interface Holiday {
  name: string;
  date?: string;
  start?: string;
  end?: string;
  type: 'public' | 'school' | 'optional';
  details?: HolidayDetails;
  isRegional?: boolean;
  nationwide?: boolean;
}

export interface SeasonalTradition {
  season: string;
  description: string;
}

export interface RawPublicHoliday {
  name: string;
  date?: string;
  start?: string;
  end?: string;
  nationwide?: boolean;
}

export interface RawSchoolHoliday {
  name: string;
  start: string;
  end: string;
} 