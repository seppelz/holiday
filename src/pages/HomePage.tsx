import React from 'react';
import { usePersonContext } from '../contexts/PersonContext';
import Calendar from '../components/Calendar/Calendar';
import { useHolidays } from '../hooks/useHolidays';
import { useBridgeDays } from '../hooks/useBridgeDays';

export const HomePage: React.FC = () => {
  const { persons } = usePersonContext();
  const { holidays: person1Holidays, bridgeDays: person1BridgeDays, isLoading: isFirstStateLoading } = 
    useBridgeDays(persons.person1.selectedState);
  const { 
    holidays: person2Holidays, 
    bridgeDays: person2BridgeDays, 
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
        holidays={person1Holidays}
        secondStateHolidays={person2Holidays}
        bridgeDays={person1BridgeDays}
        secondStateBridgeDays={person2BridgeDays}
        vacationPlans={persons.person1.vacationPlans}
        secondStateVacationPlans={persons.person2?.vacationPlans || []}
      />
    </div>
  );
};

export default HomePage; 