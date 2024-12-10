import React from 'react';
import { BridgeDayRecommendation } from '../types/vacationPlan';
import { BridgeDayOpportunities } from './BridgeDayOpportunities';
import { holidayColors } from '../constants/colors';

interface BridgeDayOpportunitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunities: BridgeDayRecommendation[];
  personId: 1 | 2;
  onSelect?: (dates: Date[]) => void;
}

export const BridgeDayOpportunitiesModal: React.FC<BridgeDayOpportunitiesModalProps> = ({
  isOpen,
  onClose,
  opportunities,
  personId,
  onSelect
}) => {
  const colors = personId === 1 ? holidayColors.person1.ui : holidayColors.person2.ui;

  if (!isOpen) return null;

  const handleSelect = (dates: Date[]) => {
    onSelect?.(dates);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className={`text-lg font-medium ${colors.text}`}>
            Alle Brückentag-Möglichkeiten
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
            aria-label="Schließen"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
          <div className="space-y-3">
            {opportunities.map((opportunity, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${opportunity.isOptimal ? colors.bg : 'bg-gray-50'} 
                  cursor-pointer hover:bg-opacity-75 transition-colors`}
                onClick={() => handleSelect(opportunity.dates)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-gray-700">
                      {opportunity.description}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {opportunity.gainedFreeDays} freie Tage für {opportunity.requiredVacationDays} Urlaubstag
                    </div>
                  </div>
                  {opportunity.isOptimal && (
                    <span className={`text-xs ${colors.text}`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 