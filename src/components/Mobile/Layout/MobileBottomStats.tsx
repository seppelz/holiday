import React from 'react';
import { Holiday } from '../../../types/holiday';
import { VacationPlan } from '../../../types/vacationPlan';
import { isWeekend, isSameDay } from 'date-fns';

interface MobileBottomStatsProps {
  vacationPlans: VacationPlan[];
  holidays: Holiday[];
  personId: 1 | 2;
}

export const MobileBottomStats: React.FC<MobileBottomStatsProps> = ({
  vacationPlans,
  holidays,
  personId
}) => {
  // Calculate total free days
  const totalFreeDays = vacationPlans.reduce((total, vacation) => {
    if (!vacation.isVisible) return total;
    if (!vacation.efficiency) return total;
    return total + vacation.efficiency.gainedDays;
  }, 0);

  // Calculate used vacation days
  const usedVacationDays = vacationPlans.reduce((total, vacation) => {
    if (!vacation.isVisible) return total;
    if (!vacation.efficiency) return total;
    return total + vacation.efficiency.requiredDays;
  }, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Freie Tage insgesamt:</span>
        <span className={`text-sm font-medium ${
          personId === 1 ? 'text-emerald-600' : 'text-cyan-600'
        }`}>
          {totalFreeDays}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Urlaubstage:</span>
        <span className={`text-sm font-medium ${
          personId === 1 ? 'text-emerald-600' : 'text-cyan-600'
        }`}>
          {usedVacationDays}
        </span>
      </div>
    </div>
  );
};
