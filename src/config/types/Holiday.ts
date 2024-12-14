export interface HolidayDetails {
  description: string;
  traditions?: string[];
  culturalSignificance?: string;
  historicalContext?: string;
  locations?: string[];
}

export interface Holiday {
  name: string;
  date: string;
  type: 'public' | 'school' | 'optional';
  period?: string;
  isRegional?: boolean;
  details: HolidayDetails;
}

export interface SeasonalTradition {
  season: string;
  description: string;
} 