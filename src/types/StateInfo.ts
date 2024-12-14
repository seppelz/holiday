import { Holiday, SeasonalTradition } from './Holiday';

export interface StateInfo {
  fullName: string;
  shortName: string;
  capital: string;
  description: string;
  culturalHighlights: string[];
  keyFacts: {
    population: string;
    area: string;
    founded: string;
    economicStrength: string[];
  };
  holidays: Holiday[];
  schoolHolidays: Holiday[];
  uniqueHolidayInfo: string;
  traditionInfo: string;
  seasonalTraditions: SeasonalTradition[];
} 