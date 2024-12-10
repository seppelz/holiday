import React from 'react';
import { GermanState, stateNames } from '../types/GermanState';

interface StateSelectProps {
  selectedState: GermanState | null;
  onStateChange: (state: GermanState | null) => void;
  placeholder?: string;
  allowEmpty?: boolean;
}

export const StateSelect: React.FC<StateSelectProps> = ({
  selectedState,
  onStateChange,
  placeholder = "Bundesland wählen",
  allowEmpty = false
}) => {
  return (
    <select
      value={selectedState || ''}
      onChange={(e) => onStateChange(e.target.value ? e.target.value as GermanState : null)}
      className="px-3 py-1.5 bg-white/80 border-0 rounded-full text-sm text-indigo-950 
        shadow-sm hover:bg-white/90 transition-all cursor-pointer
        focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-0 focus:outline-none
        appearance-none bg-no-repeat bg-right pr-8 min-w-[200px]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%234338ca' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundSize: '1.5rem 1.5rem'
      }}
    >
      {allowEmpty && (
        <option value="">
          {placeholder}
        </option>
      )}
      {Object.values(GermanState).map(state => (
        <option key={state} value={state}>
          {stateNames[state]}
        </option>
      ))}
    </select>
  );
};

export default StateSelect; 