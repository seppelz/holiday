import React from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { VacationPlan } from '../../../types/vacation';

interface MobilePlanningViewProps {
  vacationPlans: VacationPlan[];
  onRemoveVacation: (id: string) => void;
  availableVacationDays: number;
  personId: 1 | 2;
}

export const MobilePlanningView: React.FC<MobilePlanningViewProps> = ({
  vacationPlans,
  onRemoveVacation,
  availableVacationDays,
  personId
}) => {
  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Available Days */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-500">Verfügbare Urlaubstage</div>
          <div className="text-2xl font-medium text-gray-900">
            {availableVacationDays} {availableVacationDays === 1 ? 'Tag' : 'Tage'}
          </div>
        </div>

        {/* Vacation List */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Geplante Urlaube</h2>
          {vacationPlans.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Noch keine Urlaube geplant
            </div>
          ) : (
            <div className="space-y-3">
              {vacationPlans.map((vacation) => {
                const days = Math.ceil(
                  (vacation.end.getTime() - vacation.start.getTime()) / (1000 * 60 * 60 * 24)
                ) + 1;

                return (
                  <div
                    key={vacation.id}
                    className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm relative"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium text-gray-900">
                          {format(vacation.start, 'd. MMMM', { locale: de })} - {format(vacation.end, 'd. MMMM yyyy', { locale: de })}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {days} {days === 1 ? 'Tag' : 'Tage'}
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveVacation(vacation.id)}
                        className="p-2 -mt-2 -mr-2 text-gray-400 active:bg-gray-100 rounded-full touch-manipulation"
                        aria-label="Urlaub löschen"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      </div>
    </div>
  );
}; 