import React, { useState } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { VacationPlan } from '../types/vacationPlan';

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
  const [isExpanded, setIsExpanded] = useState(false);

  if (vacations.length === 0) return null;

  // Show only first two vacations when collapsed
  const displayedVacations = isExpanded ? vacations : vacations.slice(0, 2);
  const hasMore = vacations.length > 2 && !isExpanded;

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-1 max-w-[300px]">
        {displayedVacations.map((vacation) => (
          <div
            key={vacation.id}
            className="flex items-center gap-1 bg-white/80 rounded-full shadow-sm px-2 py-0.5 text-xs"
          >
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={vacation.isVisible}
                onChange={() => onToggleVisibility(vacation.id)}
                className="sr-only peer"
              />
              <div className="w-6 h-3 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-2.5 after:w-2.5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>

            <span className="text-gray-600 whitespace-nowrap">
              {format(vacation.start, 'dd.MM.', { locale: de })} - {format(vacation.end, 'dd.MM.', { locale: de })}
            </span>

            <button
              onClick={() => onRemove(vacation.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Urlaub löschen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
        
        {hasMore && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-0.5 bg-white/80 rounded-full shadow-sm"
            title="Weitere Urlaube anzeigen"
          >
            +{vacations.length - 2}
          </button>
        )}
        
        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-0.5 bg-white/80 rounded-full shadow-sm"
            title="Weniger anzeigen"
          >
            ↑
          </button>
        )}
      </div>
    </div>
  );
}; 