export enum GermanState {
  BW = 'BW',
  BY = 'BY',
  BE = 'BE',
  BB = 'BB',
  HB = 'HB',
  HH = 'HH',
  HE = 'HE',
  MV = 'MV',
  NI = 'NI',
  NW = 'NW',
  RP = 'RP',
  SL = 'SL',
  SN = 'SN',
  ST = 'ST',
  SH = 'SH',
  TH = 'TH'
}

export const stateNames: Record<GermanState, string> = {
  [GermanState.BW]: 'Baden-Württemberg',
  [GermanState.BY]: 'Bayern',
  [GermanState.BE]: 'Berlin',
  [GermanState.BB]: 'Brandenburg',
  [GermanState.HB]: 'Bremen',
  [GermanState.HH]: 'Hamburg',
  [GermanState.HE]: 'Hessen',
  [GermanState.MV]: 'Mecklenburg-Vorpommern',
  [GermanState.NI]: 'Niedersachsen',
  [GermanState.NW]: 'Nordrhein-Westfalen',
  [GermanState.RP]: 'Rheinland-Pfalz',
  [GermanState.SL]: 'Saarland',
  [GermanState.SN]: 'Sachsen',
  [GermanState.ST]: 'Sachsen-Anhalt',
  [GermanState.SH]: 'Schleswig-Holstein',
  [GermanState.TH]: 'Thüringen'
}; 