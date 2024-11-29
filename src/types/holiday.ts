export type HolidayType = 'public' | 'regional' | 'bridge';

export enum GermanState {
  BW = 'Baden-Württemberg',
  BY = 'Bayern',
  BE = 'Berlin',
  BB = 'Brandenburg',
  HB = 'Bremen',
  HH = 'Hamburg',
  HE = 'Hessen',
  MV = 'Mecklenburg-Vorpommern',
  NI = 'Niedersachsen',
  NW = 'Nordrhein-Westfalen',
  RP = 'Rheinland-Pfalz',
  SL = 'Saarland',
  SN = 'Sachsen',
  ST = 'Sachsen-Anhalt',
  SH = 'Schleswig-Holstein',
  TH = 'Thüringen'
}

export interface Holiday {
  date: Date;
  name: string;
  type: HolidayType;
  region?: GermanState;
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