import React, { useState } from 'react';
import { MobileLayout } from '../Layout/MobileLayout';
import { MobileHeader } from '../Layout/MobileHeader';
import { MobileActionBar } from '../ActionBar/MobileActionBar';
import { MobileViewTabs } from '../Navigation/MobileViewTabs';
import { MobileStateSelector } from '../Layout/MobileStateSelector';
import { MobileVacationDaysCounter } from '../Layout/MobileVacationDaysCounter';
import { MobileHolidaysView } from '../Views/MobileHolidaysView';
import { MobileSchoolHolidaysView } from '../Views/MobileSchoolHolidaysView';
import { MobilePlanningView } from '../Views/MobilePlanningView';
import { MobileCalendarView } from '../Views/MobileCalendarView';
import { MobileBridgeDaysView } from '../Views/MobileBridgeDaysView';
import { Holiday, BridgeDay } from '../../../types/holiday';
import { GermanState } from '../../../types/GermanState';
import { VacationPlan } from '../../../types/vacationPlan';

type ViewType = 'holidays' | 'school' | 'bridge' | 'planning' | 'calendar';

interface MobileContainerProps {
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
}

export const MobileContainer: React.FC<MobileContainerProps> = ({
  personId,
  selectedState,
  onStateChange,
  holidays,
  bridgeDays,
  vacationPlans,
  onAddVacation,
  onRemoveVacation,
  onPersonSwitch,
  availableVacationDays,
  onAvailableDaysChange,
  otherPersonVacations
}) => {
  const [activeView, setActiveView] = useState<ViewType>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get accent color based on person
  const accentColor = personId === 1 ? '#10b981' : '#06b6d4';
  
  // Handle view changes
  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
  };

  // Handle holiday selection
  const handleHolidaySelect = (date: Date) => {
    setSelectedDate(date);
    setActiveView('calendar');
  };

  // Filter holidays by type for different views
  const publicHolidays = holidays.filter(h => h.type === 'public');
  const schoolHolidays = holidays.filter(h => h.type === 'school');

  // Render current view
  const renderCurrentView = () => {
    switch (activeView) {
      case 'holidays':
        return (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <MobileHolidaysView
                holidays={publicHolidays}
                personId={personId}
                onHolidaySelect={handleHolidaySelect}
              />
            </div>
          </div>
        );
      case 'school':
        return (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <MobileSchoolHolidaysView
                schoolHolidays={schoolHolidays}
                personId={personId}
                onHolidaySelect={handleHolidaySelect}
              />
            </div>
          </div>
        );
      case 'bridge':
        return (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <MobileBridgeDaysView
                holidays={holidays}
                vacations={vacationPlans}
                onSelectBridgeDay={onAddVacation}
                personId={personId}
                state={selectedState}
                availableVacationDays={availableVacationDays}
              />
            </div>
          </div>
        );
      case 'planning':
        return (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <MobilePlanningView
                vacationPlans={vacationPlans}
                onRemoveVacation={onRemoveVacation}
                availableVacationDays={availableVacationDays}
                personId={personId}
                holidays={holidays}
                otherPersonVacations={otherPersonVacations}
              />
            </div>
          </div>
        );
      case 'calendar':
      default:
        return (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <MobileCalendarView
                holidays={holidays}
                bridgeDays={bridgeDays}
                vacationPlans={vacationPlans}
                onAddVacation={onAddVacation}
                onRemoveVacation={onRemoveVacation}
                personId={personId}
                otherPersonVacations={otherPersonVacations}
                initialDate={selectedDate}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <MobileLayout
      header={
        <MobileHeader
          title={`Holiday Planner ${personId === 2 ? "Person 2" : "Ich"}`}
          onPersonSwitch={onPersonSwitch}
          accentColor={accentColor}
        />
      }
      stateSelector={
        <MobileStateSelector
          value={selectedState}
          onChange={onStateChange}
          accentColor={accentColor}
        />
      }
      vacationCounter={
        <MobileVacationDaysCounter
          availableVacationDays={availableVacationDays}
          onAvailableDaysChange={onAvailableDaysChange}
          vacationPlans={vacationPlans}
          accentColor={accentColor}
          holidays={holidays}
          otherPersonVacations={otherPersonVacations}
        />
      }
      viewTabs={
        <MobileViewTabs
          activeView={activeView}
          onViewChange={handleViewChange}
          accentColor={accentColor}
          vacationPlans={vacationPlans}
        />
      }
      actionBar={
        <MobileActionBar
          onPersonSwitch={onPersonSwitch}
          accentColor={accentColor}
        />
      }
    >
      {renderCurrentView()}
    </MobileLayout>
  );
}; 