import React from 'react';
import { Calendar } from '../components/Calendar/Calendar';
import { usePersonContext } from '../contexts/PersonContext';
import { GermanState } from '../types/GermanState';
import { useBridgeDays } from '../hooks/useBridgeDays';

export function CalendarPage() {
  const { persons } = usePersonContext();
  const { holidays, bridgeDays, isLoading: isFirstStateLoading } = useBridgeDays(persons.person1.selectedState);
  const { 
    holidays: secondStateHolidays, 
    bridgeDays: secondStateBridgeDays, 
    isLoading: isSecondStateLoading 
  } = useBridgeDays(persons.person2?.selectedState || null);

  const isLoading = isFirstStateLoading || (persons.person2 && isSecondStateLoading);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Lade Feiertage...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Calendar
        state={persons.person1.selectedState}
        secondState={persons.person2?.selectedState || null}
        holidays={holidays}
        secondStateHolidays={secondStateHolidays}
        bridgeDays={bridgeDays}
        secondStateBridgeDays={secondStateBridgeDays}
        vacationPlans={persons.person1.vacationPlans}
        secondStateVacationPlans={persons.person2?.vacationPlans || []}
      />
    </div>
  );
}

export default CalendarPage; 