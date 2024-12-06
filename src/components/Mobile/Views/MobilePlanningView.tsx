import React, { useMemo } from 'react';
import { format, isWithinInterval } from 'date-fns';
import { de } from 'date-fns/locale';
import { Holiday } from '../../../types/holiday';
import { VacationPlan } from '../../../types/vacationPlan';
import { holidayColors } from '../../../constants/colors';

interface MobilePlanningViewProps {
  vacationPlans: VacationPlan[];
  onRemoveVacation: (id: string) => void;
  availableVacationDays: number;
  personId: 1 | 2;
  holidays: Holiday[];
  otherPersonVacations: VacationPlan[];
}

export const MobilePlanningView: React.FC<MobilePlanningViewProps> = ({
  vacationPlans,
  onRemoveVacation,
  availableVacationDays,
  personId,
  holidays = [],
  otherPersonVacations = []
}) => {
  const colors = personId === 1 ? holidayColors.person1.ui : holidayColors.person2.ui;

  const getMatchingDays = (vacation: VacationPlan) => {
    if (!otherPersonVacations?.length) return 0;
    
    const matchingVacations = otherPersonVacations.filter(otherVacation =>
      (vacation.start <= otherVacation.end && vacation.end >= otherVacation.start)
    );
    
    if (matchingVacations.length === 0) return 0;
    
    let matchingDays = 0;
    for (let current = new Date(vacation.start); current <= vacation.end; current.setDate(current.getDate() + 1)) {
      if (matchingVacations.some(mv => isWithinInterval(current, { start: mv.start, end: mv.end }))) {
        matchingDays++;
      }
    }
    return matchingDays;
  };

  const totalStats = useMemo(() => {
    return vacationPlans.reduce((acc, vacation) => {
      const stats = vacation.efficiency || { requiredDays: 0, gainedDays: 0 };
      const matchingDays = getMatchingDays(vacation);
      return {
        requiredDays: acc.requiredDays + stats.requiredDays,
        gainedDays: acc.gainedDays + stats.gainedDays,
        sharedDays: acc.sharedDays + matchingDays
      };
    }, { requiredDays: 0, gainedDays: 0, sharedDays: 0 });
  }, [vacationPlans, otherPersonVacations]);

  return (
    <div className="max-w-lg mx-auto p-4">
      {/* Vacation List */}
      {vacationPlans.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Noch keine Urlaube geplant
        </div>
      ) : (
        <div className="space-y-3">
          {vacationPlans.map((vacation) => {
            const stats = vacation.efficiency || { requiredDays: 0, gainedDays: 0 };
            const matchingDays = getMatchingDays(vacation);

            return (
              <div
                key={vacation.id}
                className={`rounded-lg p-3 border border-gray-200 shadow-sm relative ${
                  vacation.isVisible ? holidayColors[personId === 1 ? 'person1' : 'person2'].vacation : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-gray-900">
                      {format(new Date(vacation.start), 'd.M.')} - {format(new Date(vacation.end), 'd.M.yy', { locale: de })}
                    </span>
                    <span className="text-gray-600">
                      • {stats.requiredDays}d={stats.gainedDays}d
                    </span>
                    {matchingDays > 0 && (
                      <span className="text-yellow-600 font-medium">
                        • {matchingDays}d gem.
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onRemoveVacation(vacation.id)}
                    className="p-1.5 text-gray-400 active:bg-gray-100 rounded-full touch-manipulation"
                    aria-label="Urlaub löschen"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Total Statistics */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Freie Tage insgesamt:</span>
                <span className={`font-medium ${colors.text}`}>
                  {totalStats.requiredDays}d Urlaub = {totalStats.gainedDays}d frei
                  {totalStats.requiredDays > 0 && (
                    <span className="text-gray-500">
                      {' '}({Math.round((totalStats.gainedDays / totalStats.requiredDays) * 100)}% Effizienz)
                    </span>
                  )}
                </span>
              </div>
              {totalStats.sharedDays > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Gemeinsame Tage:</span>
                  <span className="font-medium text-yellow-600">
                    {totalStats.sharedDays} Tage
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 