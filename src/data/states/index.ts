import { StateInfo } from '../../types/StateInfo';
import { baden_wuerttemberg } from './baden-wuerttemberg';
import { bayern } from './bayern';
import { berlin } from './berlin';
import { brandenburg } from './brandenburg';
import { bremen } from './bremen';
import { hamburg } from './hamburg';
import { saarland } from './saarland';
import { sachsen } from './sachsen';
import { sachsen_anhalt } from './sachsen-anhalt';
import { schleswig_holstein } from './schleswig-holstein';
import { thueringen } from './thueringen';

export const states: Record<string, StateInfo> = {
  'BW': baden_wuerttemberg,
  'BY': bayern,
  'BE': berlin,
  'BB': brandenburg,
  'HB': bremen,
  'HH': hamburg,
  'SL': saarland,
  'SN': sachsen,
  'ST': sachsen_anhalt,
  'SH': schleswig_holstein,
  'TH': thueringen
};

// ... existing code ... 