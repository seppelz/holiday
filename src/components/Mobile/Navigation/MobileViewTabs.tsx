import React from 'react';

type ViewType = 'holidays' | 'planning' | 'calendar';

interface MobileViewTabsProps {
  activeView: ViewType;
  onChange: (view: ViewType) => void;
}

export const MobileViewTabs: React.FC<MobileViewTabsProps> = ({
  activeView,
  onChange
}) => {
  const views: Array<{
    id: ViewType;
    label: string;
    icon: React.ReactNode;
  }> = [
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
    },
    {
      id: 'planning',
      label: 'Planung',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
          />
        </svg>
      )
    },
    {
      id: 'holidays',
      label: 'Feiertage',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" 
          />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white border-b">
      <div className="px-1">
        <nav className="flex -mb-px" aria-label="Tabs">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => onChange(view.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 py-4 px-1
                border-b-2 font-medium text-sm transition-colors touch-manipulation
                ${activeView === view.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 active:text-gray-700 active:border-gray-300'
                }
              `}
              aria-current={activeView === view.id ? 'page' : undefined}
            >
              {view.icon}
              <span className="truncate">{view.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}; 