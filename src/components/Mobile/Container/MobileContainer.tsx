import React from 'react';
import { MobileLayout } from '../Layout/MobileLayout';
import { MobileHeader } from '../Layout/MobileHeader';
import { MobileActionBar } from '../ActionBar/MobileActionBar';
import { MobileViewTabs } from '../Navigation/MobileViewTabs';
import { MobileStateSelector } from '../Layout/MobileStateSelector';
import { MobileHolidaysView } from '../Views/MobileHolidaysView';
import { MobilePlanningView } from '../Views/MobilePlanningView';
import { MobileCalendarView } from '../Views/MobileCalendarView';
import { Holiday, BridgeDay } from '../../../types/holiday';
import { GermanState } from '../../../types/GermanState';
import { VacationPlan } from '../../../types/vacation';

type ViewType = 'holidays' | 'planning' | 'calendar';

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
  availableVacationDays
}) => {
  const [activeView, setActiveView] = React.useState<ViewType>('calendar');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Get accent color based on person
  const accentColor = personId === 1 ? '#10b981' : '#06b6d4';

  // Handle view changes
  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
  };

  // Render current view
  const renderCurrentView = () => {
    switch (activeView) {
      case 'holidays':
        return (
          <MobileHolidaysView
            holidays={holidays}
            bridgeDays={bridgeDays}
            onSelectBridgeDay={onAddVacation}
            personId={personId}
          />
        );
      case 'planning':
        return (
          <MobilePlanningView
            vacationPlans={vacationPlans}
            onRemoveVacation={onRemoveVacation}
            availableVacationDays={availableVacationDays}
            personId={personId}
          />
        );
      case 'calendar':
      default:
        return (
          <MobileCalendarView
            holidays={holidays}
            bridgeDays={bridgeDays}
            vacationPlans={vacationPlans}
            onAddVacation={onAddVacation}
            personId={personId}
          />
        );
    }
  };

  // Action bar items
  const actions = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      ),
      label: 'Urlaub planen',
      onClick: () => handleViewChange('calendar'),
      color: accentColor
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
          />
        </svg>
      ),
      label: 'Feiertage',
      onClick: () => handleViewChange('holidays'),
      color: accentColor
    }
  ];

  // Add person switch action if needed
  if (personId) {
    actions.push({
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
          />
        </svg>
      ),
      label: `Zu Person ${personId === 1 ? '2' : '1'} wechseln`,
      onClick: onPersonSwitch,
      color: accentColor
    });
  }

  return (
    <MobileLayout
      header={
        <>
          <MobileHeader
            title="Holiday Planner"
            rightAction={{
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              onClick: () => setIsSidebarOpen(true),
              label: "Einstellungen"
            }}
          />
          <MobileViewTabs
            activeView={activeView}
            onChange={handleViewChange}
          />
        </>
      }
      sidebar={
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Einstellungen</h2>
          </div>
          <MobileStateSelector
            selectedState={selectedState}
            onChange={onStateChange}
          />
        </div>
      }
      isSidebarOpen={isSidebarOpen}
      onSidebarClose={() => setIsSidebarOpen(false)}
      footer={<MobileActionBar actions={actions} />}
    >
      {renderCurrentView()}
    </MobileLayout>
  );
}; 