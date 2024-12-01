import React from 'react';
import { usePersonContext } from '../contexts/PersonContext';
import Calendar from '../components/Calendar/Calendar';
import { useBridgeDays } from '../hooks/useBridgeDays';

interface HomePageProps {
  isSelectingVacation?: boolean;
  onVacationSelectComplete?: () => void;
  selectedPersonId?: 1 | 2 | null;
}

export const HomePage: React.FC<HomePageProps> = ({
  isSelectingVacation = false,
  onVacationSelectComplete,
  selectedPersonId
}) => {
  const { persons, addVacationPlan, deleteVacationPlan } = usePersonContext();
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
    <div className="container mx-auto px-4">
      <Calendar
        state={persons.person1.selectedState}
        secondState={persons.person2?.selectedState || null}
        holidays={person1Holidays}
        secondStateHolidays={person2Holidays || []}
        bridgeDays={person1BridgeDays}
        secondStateBridgeDays={person2BridgeDays || []}
        vacationPlans={persons.person1.vacationPlans}
        secondStateVacationPlans={persons.person2?.vacationPlans || []}
        onAddVacation={(plan) => {
          addVacationPlan(selectedPersonId || 1, plan);
          if (onVacationSelectComplete) {
            onVacationSelectComplete();
          }
        }}
        onDeleteVacation={(personId, index) => {
          const plans = personId === 1 ? persons.person1.vacationPlans : persons.person2?.vacationPlans || [];
          const planId = plans[index]?.id;
          if (planId) {
            deleteVacationPlan(personId, planId);
          }
        }}
        vacationCount={{
          person1: persons.person1.vacationPlans.length,
          person2: persons.person2?.vacationPlans.length || 0
        }}
        personId={selectedPersonId || 1}
        isSelectingVacation={isSelectingVacation}
        onVacationSelectComplete={onVacationSelectComplete}
      />
    </div>
  );
};

export default HomePage; 