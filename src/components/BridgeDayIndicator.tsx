import React, { useState } from 'react';
import { BridgeDayRecommendation } from '../types/vacationPlan';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface BridgeDayIndicatorProps {
  recommendation: BridgeDayRecommendation;
}

export const BridgeDayIndicator: React.FC<BridgeDayIndicatorProps> = ({ recommendation }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-6 h-6 rounded-full flex items-center justify-center
          ${recommendation.isOptimal 
            ? 'animate-pulse bg-gradient-to-r from-amber-400 to-amber-500' 
            : 'bg-amber-200'
          }
          hover:shadow-lg transition-all duration-200
          ${isOpen ? 'ring-2 ring-amber-400' : ''}
        `}
      >
        <svg 
          className="w-4 h-4 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-72 bg-white rounded-lg shadow-xl border border-amber-100 p-4">
          <div className="flex flex-col gap-2">
            <div className="font-medium text-gray-900">
              {recommendation.description}
            </div>
            
            <div className="text-sm text-gray-600">
              Benötigte Urlaubstage: <span className="font-medium text-amber-600">{recommendation.requiredVacationDays}</span>
            </div>
            
            <div className="text-sm text-gray-600">
              Gewonnene freie Tage: <span className="font-medium text-emerald-600">{recommendation.gainedFreeDays}</span>
            </div>
            
            <div className="text-sm text-gray-600">
              Effizienz: <span className="font-medium text-blue-600">
                {(recommendation.efficiency * 100).toFixed(0)}%
              </span>
            </div>

            <div className="mt-2 p-2 bg-amber-50 rounded-md">
              <div className="text-sm font-medium text-amber-800 mb-1">Empfohlene Urlaubstage:</div>
              <div className="flex flex-wrap gap-1">
                {recommendation.dates.map((date, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-white rounded text-xs text-amber-700 border border-amber-200"
                  >
                    {format(date, 'E, d. MMM', { locale: de })}
                  </span>
                ))}
              </div>
            </div>

            {recommendation.isOptimal && (
              <div className="mt-1 text-xs text-emerald-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Optimale Empfehlung
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 