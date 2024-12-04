import { GermanState } from './germanState';

export type HolidayType = 'public' | 'regional' | 'bridge' | 'school';

export interface BaseHoliday {
  name: string;
  state: GermanState;
}

export interface SingleDayHoliday extends BaseHoliday {
  date: Date;
  type: 'public' | 'regional' | 'bridge';
  endDate?: never;
}

export interface MultiDayHoliday extends BaseHoliday {
  date: Date;
  endDate: Date;
  type: 'school';
}

export type Holiday = SingleDayHoliday | MultiDayHoliday;

export interface VacationPlan {
  start: Date;
  end: Date;
  id: string;
  state: GermanState;
  isVisible?: boolean;
}

export interface StateVacationInfo {
  state: GermanState;
  availableVacationDays: number;
  vacationPlans: VacationPlan[];
}

export interface BridgeDay extends SingleDayHoliday {
  type: 'bridge';
  connectedHolidays: Holiday[];
  requiredVacationDays: number;
  totalDaysOff: number;
  efficiency: number;
  pattern: string;
  periodStart: Date;
  periodEnd: Date;
}

export interface VacationPeriod {
  startDate: Date;
  endDate: Date;
  holidays: Holiday[];
  bridgeDays: BridgeDay[];
  requiredVacationDays: number;
  totalDaysOff: number;
  efficiency: number;
}

// Raw data interfaces for the holidays.json/ts file
export interface RawHolidayDate {
  start: string;
  end?: string;
}

export interface RawSchoolHoliday extends RawHolidayDate {
  name: string;
}

export interface RawPublicHoliday extends RawHolidayDate {
  name: string;
  nationwide?: boolean;
}

export interface HolidayData {
  schoolHolidays: Record<number, Record<GermanState, RawSchoolHoliday[]>>;
  publicHolidays: Record<number, Record<GermanState | 'ALL', RawPublicHoliday[]>>;
}