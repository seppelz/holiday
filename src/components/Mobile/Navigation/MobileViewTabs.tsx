import React from 'react';
import { VacationPlan } from '../../../types/vacationPlan';

type ViewType = 'holidays' | 'school' | 'bridge' | 'planning' | 'calendar';

interface MobileViewTabsProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  accentColor: string;
  vacationPlans: VacationPlan[];
}

export const MobileViewTabs: React.FC<MobileViewTabsProps> = ({
  activeView,
  onViewChange,
  accentColor,
  vacationPlans
}) => {
  const topTabs: { id: ViewType; label: string; icon: JSX.Element }[] = [
    {
      id: 'holidays',
      label: 'Feiertage',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      )
    },
    {
      id: 'school',
      label: 'Schulferien',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
          />
        </svg>
      )
    },
    {
      id: 'bridge',
      label: 'Brückentage',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" 
          />
        </svg>
      )
    }
  ];

  const bottomTabs: { id: ViewType; label: string; icon: JSX.Element }[] = [
    {
      id: 'planning',
      label: 'Planung',
      icon: (
        <div className="relative">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
            />
          </svg>
          {vacationPlans.length > 0 && (
            <div 
              className="absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center rounded-full text-[10px] font-medium text-white px-1"
              style={{ backgroundColor: accentColor }}
            >
              {vacationPlans.length}
            </div>
          )}
        </div>
      )
    },
    {
      id: 'calendar',
      label: 'Kalender',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      )
    }
  ];

  const renderTabRow = (tabs: typeof topTabs) => (
    <div className="flex justify-around">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onViewChange(tab.id)}
          className={`flex-1 flex flex-col items-center py-2 px-2 transition-colors
            ${activeView === tab.id
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700'
            }`}
          style={{
            color: activeView === tab.id ? accentColor : undefined
          }}
        >
          {tab.icon}
          <span className="text-xs mt-1 whitespace-nowrap">{tab.label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col border-t border-gray-200 bg-white">
      {renderTabRow(topTabs)}
      <div className="border-t border-gray-200" />
      {renderTabRow(bottomTabs)}
    </div>
  );
}; 