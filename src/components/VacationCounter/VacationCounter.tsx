import React from 'react';
import { Holiday, BridgeDay } from '../../types/holiday';
import { differenceInBusinessDays } from 'date-fns';
import { useStateContext } from '../../layouts/MainLayout';

interface VacationCounterProps {
  holidays: Holiday[];
  totalVacationDays?: number;
}

export const VacationCounter: React.FC<VacationCounterProps> = ({
  holidays,
  totalVacationDays = 30
}) => {
  const { vacationPlans } = useStateContext();

  // Calculate used vacation days
  const usedVacationDays = vacationPlans.reduce((total, plan) => {
    const workingDays = differenceInBusinessDays(plan.end, plan.start) + 1;
    
    // Subtract holidays that fall within the vacation period
    const holidaysInPeriod = holidays.filter(holiday => {
      const holidayDate = new Date(holiday.date);
      return holidayDate >= plan.start && holidayDate <= plan.end;
    }).length;

    return total + (workingDays - holidaysInPeriod);
  }, 0);

  // Calculate bridge days
  const bridgeDays = holidays.filter((h): h is BridgeDay => h.type === 'bridge');
  const bridgeDayCount = bridgeDays.reduce((total, day) => total + day.requiredVacationDays, 0);

  // Calculate remaining days
  const remainingDays = totalVacationDays - usedVacationDays - bridgeDayCount;

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Urlaubstage Übersicht</h3>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-600">{usedVacationDays}</div>
          <div className="text-sm text-gray-600">Geplante Tage</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-600">{bridgeDayCount}</div>
          <div className="text-sm text-gray-600">Brückentage</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-600">{remainingDays}</div>
          <div className="text-sm text-gray-600">Verbleibend</div>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all"
          style={{ width: `${(usedVacationDays / totalVacationDays) * 100}%` }}
        />
      </div>

      <div className="text-sm text-gray-600 text-center">
        {totalVacationDays} Urlaubstage gesamt
      </div>
    </div>
  );
}; 