import React, { useMemo } from 'react';
import { format, isWithinInterval, differenceInDays, addDays } from 'date-fns';
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

  const getVacationDetails = (vacation: VacationPlan) => {
    // Calculate total days
    const totalDays = differenceInDays(vacation.end, vacation.start) + 1;
    
    // Calculate matching days with other person
    let matchingDays = 0;
    let currentDate = new Date(vacation.start);
    while (currentDate <= vacation.end) {
      if (otherPersonVacations.some(otherVacation => 
        isWithinInterval(currentDate, { start: otherVacation.start, end: otherVacation.end })
      )) {
        matchingDays++;
      }
      currentDate = addDays(currentDate, 1);
    }

    // Calculate efficiency
    const stats = vacation.efficiency || { requiredDays: 0, gainedDays: 0 };
    const efficiency = stats.requiredDays > 0 
      ? Math.round((stats.gainedDays / stats.requiredDays) * 100) 
      : 0;

    return {
      totalDays,
      matchingDays,
      requiredDays: stats.requiredDays,
      gainedDays: stats.gainedDays,
      efficiency
    };
  };

  const totalStats = useMemo(() => {
    return vacationPlans.reduce((acc, vacation) => {
      const details = getVacationDetails(vacation);
      return {
        totalDays: acc.totalDays + details.totalDays,
        requiredDays: acc.requiredDays + details.requiredDays,
        gainedDays: acc.gainedDays + details.gainedDays,
        sharedDays: acc.sharedDays + details.matchingDays
      };
    }, { totalDays: 0, requiredDays: 0, gainedDays: 0, sharedDays: 0 });
  }, [vacationPlans, otherPersonVacations]);

  return (
    <div className="mx-auto p-2">
      {/* Compact Header Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className={`text-base font-medium ${colors.text}`}>
            Person {personId}
          </h2>
          <span className="text-sm font-medium">
            {availableVacationDays - totalStats.requiredDays}/{availableVacationDays} Tage übrig
          </span>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <span>📊</span>
            <span>{Math.round((totalStats.gainedDays / totalStats.requiredDays) * 100 || 0)}% Effizienz</span>
          </div>
          {totalStats.sharedDays > 0 && (
            <div className="flex items-center gap-1">
              <span>❤️</span>
              <span>{totalStats.sharedDays} gemeinsam</span>
            </div>
          )}
        </div>
      </div>

      {/* Compact Vacation List */}
      {vacationPlans.length === 0 ? (
        <div className="text-center py-4 text-sm text-gray-500">
          Noch keine Urlaube geplant
        </div>
      ) : (
        <div className="space-y-2">
          {vacationPlans.map((vacation) => {
            const details = getVacationDetails(vacation);
            const hasSharedDays = details.matchingDays > 0;

            return (
              <div
                key={vacation.id}
                className={`rounded-lg border shadow-sm overflow-hidden ${
                  vacation.isVisible ? colors.bg : 'bg-white'
                }`}
              >
                <div className="px-3 py-2 bg-white flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {format(vacation.start, 'd.MM.', { locale: de })} - {format(vacation.end, 'd.MM.yy', { locale: de })}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600 mt-0.5">
                      <span className="flex items-center gap-0.5">
                        <span>📊</span>
                        {details.requiredDays} {details.requiredDays === 1 ? 'Tag' : 'Tage'} Urlaub = {details.gainedDays} {details.gainedDays === 1 ? 'Tag' : 'Tage'} frei
                      </span>
                      {hasSharedDays && (
                        <span className="flex items-center gap-0.5 text-yellow-600">
                          <span>❤️</span>
                          {details.matchingDays}d
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveVacation(vacation.id)}
                    className="p-1 text-gray-400 hover:text-red-500 rounded-full transition-colors ml-2"
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
        </div>
      )}
    </div>
  );
}; 