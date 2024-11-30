import { GermanState } from './germanState';

export interface Holiday {
  date: Date;
  name: string;
  type: 'public' | 'regional' | 'bridge';
  state: GermanState;
  endDate?: Date;
  requiredVacationDays?: number;
}

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

export interface BridgeDay extends Holiday {
  type: 'bridge';
  connectedHolidays: Holiday[];
  requiredVacationDays: number;
  totalDaysOff: number;
  efficiency: number;
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