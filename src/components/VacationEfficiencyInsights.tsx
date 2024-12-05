import React from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { VacationPlan } from '../types/vacationPlan';
import { holidayColors } from '../constants/colors';
import { Holiday } from '../types/holiday';
import { findVacationCombinationOpportunities, VacationCombination } from '../utils/smartVacationAnalysis';
import { GermanState } from '../types/GermanState';

interface VacationEfficiencyInsightsProps {
  vacations: VacationPlan[];
  personId: 1 | 2;
  availableVacationDays: number;
  holidays: Holiday[];
  onSelectDates?: (dates: Date[]) => void;
  state: GermanState;
}

export const VacationEfficiencyInsights: React.FC<VacationEfficiencyInsightsProps> = ({
  vacations,
  personId,
  availableVacationDays,
  holidays,
  onSelectDates,
  state
}) => {
  const colors = personId === 1 ? holidayColors.person1.ui : holidayColors.person2.ui;
  
  // Calculate used and remaining vacation days
  const usedDays = vacations.reduce((sum, v) => sum + (v.efficiency?.requiredDays || 0), 0);
  const remainingDays = availableVacationDays - usedDays;
  
  // Find bridge day opportunities
  const combinations = findVacationCombinationOpportunities(
    vacations, 
    holidays,
    state
  );
  const bestCombinations = combinations
    .filter((c: VacationCombination) => c.requiredDays <= remainingDays)
    .sort((a: VacationCombination, b: VacationCombination) => 
      (b.gainedDays / b.requiredDays) - (a.gainedDays / a.requiredDays))
    .slice(0, 5);

  return (
    <div className="mt-4">
      {/* Vacation Day Summary */}
      <div className="mb-2 px-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Urlaubstage:</span>
          <span className={`font-medium ${colors.text}`}>
            {usedDays} / {availableVacationDays} ({remainingDays} verfügbar)
          </span>
        </div>
      </div>

      {/* Bridge Day Opportunities */}
      {bestCombinations.length > 0 && (
        <div className="mt-4">
          <h3 className={`text-sm font-medium px-2 mb-2 ${colors.text}`}>
            Brückentag-Möglichkeiten
          </h3>
          <div className="space-y-1">
            {bestCombinations.map((combo: VacationCombination, index: number) => (
              <div
                key={index}
                className={`px-2 py-1.5 cursor-pointer transition-colors
                  ${combo.gainedDays / combo.requiredDays >= 2 
                    ? colors.bg 
                    : 'hover:bg-gray-50'}`}
                onClick={() => onSelectDates?.(combo.dates)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-gray-700">
                      {combo.description}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round((combo.gainedDays / combo.requiredDays - 1) * 100)}% mehr freie Tage
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Opportunities Message */}
      {bestCombinations.length === 0 && remainingDays > 0 && (
        <div className="px-2 text-sm text-gray-500">
          Keine Brückentag-Möglichkeiten verfügbar
        </div>
      )}
    </div>
  );
}; 