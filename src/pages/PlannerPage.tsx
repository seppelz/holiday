import React from 'react';
import Calendar from '../components/Calendar/Calendar';
import { useStateContext } from '../layouts/MainLayout';
import { useBridgeDays } from '../hooks/useBridgeDays';
import { GermanState } from '../types/germanState';

export function PlannerPage() {
  const { selectedStates } = useStateContext();
  const { holidays, bridgeDays, isLoading: isFirstStateLoading } = useBridgeDays(selectedStates.first);
  const { 
    holidays: secondStateHolidays, 
    bridgeDays: secondStateBridgeDays, 
    isLoading: isSecondStateLoading 
  } = useBridgeDays(selectedStates.second || GermanState.BE);

  const isLoading = isFirstStateLoading || (selectedStates.second && isSecondStateLoading);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Lade Feiertage...</div>
      </div>
    );
  }

  return (
    <Calendar
      state={selectedStates.first}
      secondState={selectedStates.second}
      holidays={holidays}
      secondStateHolidays={selectedStates.second ? secondStateHolidays : []}
      bridgeDays={bridgeDays}
      secondStateBridgeDays={selectedStates.second ? secondStateBridgeDays : []}
    />
  );
}

export default PlannerPage; 