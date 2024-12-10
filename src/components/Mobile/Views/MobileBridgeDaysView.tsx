import React from 'react';
import { format, isWithinInterval } from 'date-fns';
import { de } from 'date-fns/locale';
import { Holiday } from '../../../types/holiday';
import { VacationPlan } from '../../../types/vacationPlan';
import { GermanState } from '../../../types/GermanState';
import { analyzeVacationOpportunities, VacationRecommendation } from '../../../utils/smartVacationAnalysis';

interface MobileBridgeDaysViewProps {
  holidays: Holiday[];
  vacations: VacationPlan[];
  onSelectBridgeDay: (start: Date, end: Date) => void;
  personId: 1 | 2;
  state: GermanState;
  availableVacationDays: number;
}

export const MobileBridgeDaysView: React.FC<MobileBridgeDaysViewProps> = ({
  holidays,
  vacations,
  onSelectBridgeDay,
  personId,
  state,
  availableVacationDays
}) => {
  // Calculate used vacation days
  const usedDays = vacations.reduce((sum, v) => sum + (v.efficiency?.requiredDays || 0), 0);
  const remainingDays = availableVacationDays - usedDays;

  // Get recommendations using the same logic as desktop
  const combinations = analyzeVacationOpportunities(
    holidays,
    state
  );

  const bestCombinations = combinations
    .filter((c) => c.requiredDays <= remainingDays)
    .sort((a, b) => (b.gainedDays / b.requiredDays) - (a.gainedDays / a.requiredDays))
    .filter(rec => !vacations.some(vacation => 
      isWithinInterval(rec.startDate, { start: vacation.start, end: vacation.end }) ||
      isWithinInterval(rec.endDate, { start: vacation.start, end: vacation.end })
    ));

  const handleRecommendationClick = (combo: VacationRecommendation) => {
    if (combo.startDate && combo.endDate) {
      onSelectBridgeDay(combo.startDate, combo.endDate);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-2 py-2">
      {/* Bridge Day Recommendations */}
      {bestCombinations.length > 0 ? (
        <section>
          <h2 className="text-sm font-medium text-gray-700 mb-2 px-2">
            Brückentag-Empfehlungen
          </h2>
          <div className="space-y-1">
            {bestCombinations.map((combo, index) => (
              <button
                key={index}
                onClick={() => handleRecommendationClick(combo)}
                className={`w-full px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200
                  active:bg-gray-50 transition-colors touch-manipulation
                  ${combo.gainedDays / combo.requiredDays >= 2 ? 'bg-emerald-50' : ''}`}
              >
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-medium text-gray-900">
                      {format(combo.startDate, 'd.M.')} - {format(combo.endDate, 'd.M.yy', { locale: de })}
                    </span>
                    <span className="text-gray-600">
                      • {combo.requiredDays}d={combo.gainedDays}d
                    </span>
                    <span className="text-emerald-600 font-medium">
                      • {(combo.gainedDays / combo.requiredDays).toFixed(1)}x
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <div className="text-center py-4 text-sm text-gray-500">
          Keine Brückentag-Empfehlungen verfügbar
        </div>
      )}
    </div>
  );
}; 