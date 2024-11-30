import React from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { VacationPlan } from '../types/holiday';

interface VacationListProps {
  vacations: VacationPlan[];
  onToggleVisibility: (id: string) => void;
  onRemove: (id: string) => void;
}

export const VacationList: React.FC<VacationListProps> = ({
  vacations,
  onToggleVisibility,
  onRemove
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {vacations.map((vacation) => (
        <div
          key={vacation.id}
          className="flex items-center gap-2 bg-white rounded-lg shadow-sm px-3 py-2"
        >
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={vacation.isVisible}
              onChange={() => onToggleVisibility(vacation.id)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>

          <span className="text-sm text-gray-600">
            {format(vacation.start, 'dd.MM.', { locale: de })} - {format(vacation.end, 'dd.MM.yyyy', { locale: de })}
          </span>

          <button
            onClick={() => onRemove(vacation.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}; 