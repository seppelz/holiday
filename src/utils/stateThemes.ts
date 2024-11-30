import { GermanState } from '../types/germanState';

interface StateTheme {
  gradient: string;
  pattern?: string;
  accentColor?: string;
}

export const stateThemes: Record<GermanState, StateTheme> = {
  [GermanState.BE]: {
    gradient: 'from-rose-100 to-indigo-100',
    pattern: 'M0 20L20 0L40 20L20 40zM-10 30L10 10L30 30L10 50z',
    accentColor: 'rgb(99, 102, 241)'
  },
  [GermanState.BW]: {
    gradient: 'from-yellow-50 to-amber-100',
    pattern: 'M0 20L20 0L40 20L20 40z',
    accentColor: 'rgb(245, 158, 11)'
  },
  [GermanState.BY]: {
    gradient: 'from-blue-100 to-emerald-100',
    pattern: 'M0 20L20 0L40 20L20 40z',
    accentColor: 'rgb(16, 185, 129)'
  },
  [GermanState.BB]: {
    gradient: 'from-red-50 to-orange-100',
    pattern: 'M0 10L10 0L20 10L10 20z',
    accentColor: 'rgb(249, 115, 22)'
  },
  [GermanState.HB]: {
    gradient: 'from-blue-50 to-sky-100',
    pattern: 'M0 0L20 20L40 0M0 40L20 20L40 40',
    accentColor: 'rgb(14, 165, 233)'
  },
  [GermanState.HH]: {
    gradient: 'from-red-100 to-rose-100',
    pattern: 'M20 0L40 20L20 40L0 20Z',
    accentColor: 'rgb(225, 29, 72)'
  },
  [GermanState.HE]: {
    gradient: 'from-green-50 to-emerald-100',
    pattern: 'M0 20h40M20 0v40',
    accentColor: 'rgb(16, 185, 129)'
  },
  [GermanState.MV]: {
    gradient: 'from-blue-50 to-cyan-100',
    pattern: 'M0 0L40 40M40 0L0 40',
    accentColor: 'rgb(6, 182, 212)'
  },
  [GermanState.NI]: {
    gradient: 'from-yellow-100 to-lime-100',
    pattern: 'M0 20L20 0L40 20M0 20L20 40L40 20',
    accentColor: 'rgb(132, 204, 22)'
  },
  [GermanState.NW]: {
    gradient: 'from-green-100 to-teal-100',
    pattern: 'M0 0L20 20L40 0M0 40L20 20L40 40',
    accentColor: 'rgb(20, 184, 166)'
  },
  [GermanState.RP]: {
    gradient: 'from-purple-100 to-violet-100',
    pattern: 'M0 20C20 20 20 0 40 0M0 40C20 40 20 20 40 20',
    accentColor: 'rgb(139, 92, 246)'
  },
  [GermanState.SL]: {
    gradient: 'from-indigo-100 to-blue-100',
    pattern: 'M0 0C20 0 20 20 40 20M0 20C20 20 20 40 40 40',
    accentColor: 'rgb(99, 102, 241)'
  },
  [GermanState.SN]: {
    gradient: 'from-green-100 to-lime-100',
    pattern: 'M20 0C0 20 0 40 20 40C40 40 40 20 20 0',
    accentColor: 'rgb(132, 204, 22)'
  },
  [GermanState.ST]: {
    gradient: 'from-yellow-100 to-amber-100',
    pattern: 'M0 20L20 0L40 20L20 40Z',
    accentColor: 'rgb(245, 158, 11)'
  },
  [GermanState.SH]: {
    gradient: 'from-blue-100 to-sky-100',
    pattern: 'M0 20H40M20 0V40',
    accentColor: 'rgb(14, 165, 233)'
  },
  [GermanState.TH]: {
    gradient: 'from-green-100 to-emerald-100',
    pattern: 'M0 20L20 0L40 20M0 20L20 40L40 20',
    accentColor: 'rgb(16, 185, 129)'
  }
}; 