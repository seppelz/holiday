import React from 'react';
import { GermanState, stateNames } from '../types/GermanState';

interface StateSelectorProps {
  value: string;
  onChange: (value: GermanState) => void;
  label: string;
  personId: 1 | 2;
}

export const StateSelector = React.forwardRef<HTMLSelectElement, StateSelectorProps>(
  ({ value, onChange, label, personId }, ref) => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-900">{label}</span>
      <select
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value as GermanState)}
        className={`px-2 py-1 bg-white/80 border-0 rounded-full text-sm text-gray-900
          shadow-sm hover:bg-white/90 transition-all cursor-pointer
          focus:ring-4 focus:ring-offset-2 focus:outline-none
          appearance-none bg-no-repeat bg-right pr-8 ${
            personId === 1 
              ? 'focus:ring-emerald-500/50' 
              : 'focus:ring-cyan-500/50'
          }`}
      >
        <option value="">Bundesland wählen</option>
        {Object.entries(GermanState).map(([key, value]) => (
          <option key={key} value={value}>{stateNames[value as GermanState]}</option>
        ))}
      </select>
    </div>
  )
); 