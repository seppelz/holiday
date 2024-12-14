import { StateInfo } from './types/StateInfo';
import { berlin } from './states/berlin';
import { badenWuerttemberg } from './states/baden-wuerttemberg';
import { bayern } from './states/bayern';
import { brandenburg } from './states/brandenburg';
import { bremen } from './states/bremen';
import { hamburg } from './states/hamburg';
import { hessen } from './states/hessen';
import { mecklenburgVorpommern } from './states/mecklenburg-vorpommern';
import { niedersachsen } from './states/niedersachsen';
import { nordrheinWestfalen } from './states/nordrhein-westfalen';
import { rheinlandPfalz } from './states/rheinland-pfalz';
import { saarland } from './states/saarland';
import { sachsen } from './states/sachsen';
import { sachsenAnhalt } from './states/sachsen-anhalt';
import { schleswigHolstein } from './states/schleswig-holstein';
import { thueringen } from './states/thueringen';

export const stateData: Record<string, StateInfo> = {
  'berlin': berlin,
  'baden-wuerttemberg': badenWuerttemberg,
  'bayern': bayern,
  'brandenburg': brandenburg,
  'bremen': bremen,
  'hamburg': hamburg,
  'hessen': hessen,
  'mecklenburg-vorpommern': mecklenburgVorpommern,
  'niedersachsen': niedersachsen,
  'nordrhein-westfalen': nordrheinWestfalen,
  'rheinland-pfalz': rheinlandPfalz,
  'saarland': saarland,
  'sachsen': sachsen,
  'sachsen-anhalt': sachsenAnhalt,
  'schleswig-holstein': schleswigHolstein,
  'thueringen': thueringen,
};

export const getStateIdFromUrl = (urlStateId: string): string => {
  return urlStateId.toLowerCase();
};

export const getUrlFromStateId = (stateId: string): string => {
  return stateId.toLowerCase();
};

export const getStateInfo = (stateId: string): StateInfo | undefined => {
  const normalizedStateId = getStateIdFromUrl(stateId);
  return stateData[normalizedStateId];
};

export const getAllStates = (): string[] => {
  return Object.keys(stateData);
}; 