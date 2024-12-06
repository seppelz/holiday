import React from 'react';
import { VacationPlan } from '../../../types/vacationPlan';
import { Holiday } from '../../../types/holiday';

interface MobileVacationDaysCounterProps {
  availableVacationDays: number;
  onAvailableDaysChange: (days: number) => void;
  vacationPlans: VacationPlan[];
  accentColor: string;
  holidays: Holiday[];
  otherPersonVacations: VacationPlan[];
}

export const MobileVacationDaysCounter: React.FC<MobileVacationDaysCounterProps> = ({
  availableVacationDays,
  onAvailableDaysChange,
  vacationPlans,
  accentColor,
  holidays,
  otherPersonVacations
}) => {
  // Calculate used vacation days
  const usedVacationDays = vacationPlans.reduce((total, vacation) => {
    if (!vacation.isVisible) return total;
    const days = Math.ceil((vacation.end.getTime() - vacation.start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return total + days;
  }, 0);

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-gray-900">
            Verfügbare Urlaubstage
          </div>
          <div className="text-sm text-gray-500">
            {usedVacationDays} von {availableVacationDays} Tagen verwendet
          </div>
        </div>
        <input
          type="number"
          value={availableVacationDays}
          onChange={(e) => onAvailableDaysChange(parseInt(e.target.value) || 0)}
          className="w-16 px-2 py-1 text-right border border-gray-300 rounded-md"
          min="0"
          max="365"
        />
      </div>
    </div>
  );
}; 