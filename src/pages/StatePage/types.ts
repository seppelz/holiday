export interface HolidayDetails {
  description: string;
  traditions?: string[];
  locations?: string[];
  culturalSignificance?: string;
  familyActivities?: string[];
}

export interface StatePageHoliday {
  name: string;
  date?: string;
  start?: string;
  end?: string;
  type: 'public' | 'school';
  isRegional?: boolean;
  details?: HolidayDetails;
}

export interface SeasonalTradition {
  season: string;
  description: string;
}

export interface VacationDestination {
  name: string;
  description: string;
  attractions: string[];
  activities: string[];
}

export interface RegionalSpecialty {
  title: string;
  description: string;
  icon: string;
}

export interface RegionalCategory {
  title: string;
  icon: string;
  items: RegionalSpecialty[];
}

export interface StateInfo {
  fullName: string;
  capital: string;
  description: string;
  keyFacts: {
    population: number;
    area: number;
    gdp?: number;
    unemployment?: number;
    averageIncome?: number;
    economicStrength: string[];
  };
  holidays: StatePageHoliday[];
  schoolHolidays: StatePageHoliday[];
  seasonalTraditions: {
    season: string;
    description: string;
  }[];
  vacationDestinations?: {
    name: string;
    description: string;
    attractions: string[];
    activities: string[];
  }[];
  regionalSpecialties: RegionalCategory[];
} 