import React from 'react';
import { GermanState, stateNames } from '../../../types/GermanState';

interface MobileStateSelectorProps {
  value: GermanState;
  onChange: (state: GermanState) => void;
  accentColor: string;
}

export const MobileStateSelector: React.FC<MobileStateSelectorProps> = ({
  value,
  onChange,
  accentColor
}) => {
  return (
    <div className="px-4 py-2 border-t border-gray-200">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as GermanState)}
        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900
          focus:outline-none focus:ring-2 transition-shadow appearance-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem',
          '--tw-ring-color': accentColor + '4D' // 30% opacity
        } as React.CSSProperties}
      >
        <option value="">Bundesland wählen</option>
        {Object.entries(GermanState).map(([key, value]) => (
          <option key={key} value={value}>{stateNames[value as GermanState]}</option>
        ))}
      </select>
    </div>
  );
}; 