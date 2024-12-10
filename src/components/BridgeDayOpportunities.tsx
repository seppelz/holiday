import React, { useState } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { BridgeDayRecommendation } from '../types/vacationPlan';
import { holidayColors } from '../constants/colors';
import { BridgeDayOpportunitiesModal } from './BridgeDayOpportunitiesModal';

interface BridgeDayOpportunitiesProps {
  opportunities: BridgeDayRecommendation[];
  personId: 1 | 2;
  onSelect?: (dates: Date[]) => void;
}

export const BridgeDayOpportunities: React.FC<BridgeDayOpportunitiesProps> = ({
  opportunities,
  personId,
  onSelect
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const colors = personId === 1 ? holidayColors.person1.ui : holidayColors.person2.ui;

  if (opportunities.length === 0) {
    return (
      <div className="text-sm text-gray-500 text-center py-4">
        Keine Brückentage verfügbar
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2">
        {opportunities.slice(0, 5).map((opportunity, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${opportunity.isOptimal ? colors.bg : 'bg-gray-50'} 
              ${onSelect ? 'cursor-pointer hover:bg-opacity-75' : ''}`}
            onClick={() => onSelect?.(opportunity.dates)}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm font-medium text-gray-700">
                  {format(opportunity.dates[0], 'd. MMMM yyyy', { locale: de })}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {opportunity.description}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${colors.text}`}>
                  +{opportunity.gainedFreeDays} Tage frei
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {opportunity.requiredVacationDays} Urlaubstag
                </div>
              </div>
            </div>
            
            {opportunity.isOptimal && (
              <div className="mt-2 text-xs">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 ${colors.bg} ${colors.text}`}>
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Optimale Effizienz
                </span>
              </div>
            )}
          </div>
        ))}
        
        {opportunities.length > 5 && (
          <div className="text-center pt-2">
            <button
              className={`text-sm ${colors.text} hover:underline focus:outline-none`}
              onClick={() => setIsModalOpen(true)}
            >
              {opportunities.length - 5} weitere Möglichkeiten anzeigen
            </button>
          </div>
        )}
      </div>

      <BridgeDayOpportunitiesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        opportunities={opportunities}
        personId={personId}
        onSelect={onSelect}
      />
    </>
  );
}; 