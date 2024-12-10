import React from 'react';
import { GermanState, stateNames } from '../../../types/GermanState';

interface MobileStateSelectorProps {
  selectedState: GermanState;
  onStateChange: (state: GermanState) => void;
  personId: 1 | 2;
}

export const MobileStateSelector: React.FC<MobileStateSelectorProps> = ({
  selectedState,
  onStateChange,
  personId
}) => {
  const accentColor = personId === 1 ? '#10b981' : '#06b6d4';
  
  return (
    <div className="w-full" role="region" aria-label="Bundesland-Auswahl">
      <div className="relative">
        <select
          id="state-select"
          value={selectedState}
          onChange={(e) => onStateChange(e.target.value as GermanState)}
          className="w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900
            focus:outline-none focus:ring-2 focus:border-transparent transition-shadow appearance-none"
          style={{ 
            '--tw-ring-color': accentColor + '4D',
            '--tw-ring-opacity': 0.3
          } as React.CSSProperties}
          aria-label="Bundesland auswählen"
        >
          <option value="" disabled>Bundesland wählen</option>
          {Object.entries(GermanState).map(([key, value]) => (
            <option key={key} value={value}>{stateNames[value as GermanState]}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}; 