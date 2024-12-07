import React from 'react';
import { VacationPlan } from '../../../types/vacationPlan';
import { Holiday } from '../../../types/holiday';
import { calculateVacationDays } from '../../../utils/vacationCalculator';

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
  const { usedDays, gainedDays } = calculateVacationDays(vacationPlans, holidays);
  const remainingDays = availableVacationDays - usedDays;

  return (
    <div 
      className="px-4 py-3 bg-white shadow-sm border-b border-gray-200"
      role="region" 
      aria-label="Urlaubstage Übersicht"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex-1">
          <label 
            htmlFor="vacation-days-input" 
            className="block text-sm font-medium text-gray-700"
          >
            Urlaubstage pro Jahr
          </label>
          <input
            id="vacation-days-input"
            type="number"
            min="0"
            max="365"
            value={availableVacationDays}
            onChange={(e) => onAvailableDaysChange(Math.max(0, parseInt(e.target.value) || 0))}
            className="mt-1 w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0 transition-shadow"
            style={{ '--tw-ring-color': accentColor + '4D' } as React.CSSProperties}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-3">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-semibold" style={{ color: accentColor }}>
            {usedDays}
          </div>
          <div className="text-xs text-gray-600 mt-1">Genommen</div>
        </div>

        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-semibold" style={{ color: accentColor }}>
            {remainingDays}
          </div>
          <div className="text-xs text-gray-600 mt-1">Übrig</div>
        </div>

        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-semibold" style={{ color: accentColor }}>
            {gainedDays}
          </div>
          <div className="text-xs text-gray-600 mt-1">Bonus Tage</div>
        </div>
      </div>
    </div>
  );
}; 