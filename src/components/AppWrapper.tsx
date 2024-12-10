import React from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { MobileContainer } from './Mobile/Container/MobileContainer';
import { Holiday, BridgeDay } from '../types/holiday';
import { GermanState } from '../types/GermanState';
import { VacationPlan } from '../types/vacationPlan';
import { InstallPrompt } from './Mobile/PWA/InstallPrompt';
import { UpdateNotification } from './Mobile/PWA/UpdateNotification';

interface AppWrapperProps {
  children: React.ReactNode;
  mobileProps?: {
    personId: 1 | 2;
    selectedState: GermanState;
    onStateChange: (state: GermanState) => void;
    holidays: Holiday[];
    bridgeDays: BridgeDay[];
    vacationPlans: VacationPlan[];
    onAddVacation: (start: Date, end: Date) => void;
    onRemoveVacation: (id: string) => void;
    onPersonSwitch: () => void;
    availableVacationDays: number;
    onAvailableDaysChange: (days: number) => void;
    otherPersonVacations: VacationPlan[];
  };
}

export const AppWrapper: React.FC<AppWrapperProps> = ({
  children,
  mobileProps,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      {isMobile && mobileProps ? (
        <MobileContainer
          personId={mobileProps.personId}
          selectedState={mobileProps.selectedState}
          onStateChange={mobileProps.onStateChange}
          holidays={mobileProps.holidays}
          bridgeDays={mobileProps.bridgeDays}
          vacationPlans={mobileProps.vacationPlans}
          onAddVacation={mobileProps.onAddVacation}
          onRemoveVacation={mobileProps.onRemoveVacation}
          onPersonSwitch={mobileProps.onPersonSwitch}
          availableVacationDays={mobileProps.availableVacationDays}
          onAvailableDaysChange={mobileProps.onAvailableDaysChange}
          otherPersonVacations={mobileProps.otherPersonVacations}
        />
      ) : (
        <div className="min-h-screen bg-gray-50">
          <div className="w-full">
            {children}
          </div>
        </div>
      )}
      <InstallPrompt />
      <UpdateNotification />
    </>
  );
}; 