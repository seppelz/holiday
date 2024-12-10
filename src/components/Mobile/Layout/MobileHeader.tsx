import React from 'react';

interface MobileHeaderProps {
  title?: string;
  onPersonSwitch: () => void;
  personId: 1 | 2;
  onTutorialOpen: () => void;
  onExportOpen: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title = 'Holiday Planner',
  onPersonSwitch,
  personId,
  onTutorialOpen,
  onExportOpen
}) => {
  const accentColor = personId === 1 ? '#10b981' : '#06b6d4';
  
  return (
    <header className="flex items-center justify-between px-4 py-2" role="banner">
      <h1 className="text-lg font-medium text-gray-900">{title}</h1>
      <div className="flex items-center gap-2">
        {/* Export Button */}
        <button
          onClick={onExportOpen}
          className="p-2 rounded-full transition-colors hover:bg-gray-100"
          aria-label="Exportieren"
          type="button"
        >
          <svg 
            className="w-5 h-5 text-gray-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
            />
          </svg>
        </button>

        {/* Tutorial Button */}
        <button
          onClick={onTutorialOpen}
          className="p-2 rounded-full transition-colors hover:bg-gray-100"
          aria-label="Tutorial öffnen"
          type="button"
        >
          <svg 
            className="w-5 h-5 text-gray-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </button>

        {/* Person Switcher */}
        <button
          onClick={onPersonSwitch}
          className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors`}
          style={{ 
            backgroundColor: accentColor + '15',
            color: accentColor 
          }}
          aria-label={`Zu Person ${personId === 1 ? '2' : '1'} wechseln`}
          type="button"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
            />
          </svg>
          <span className="text-xs font-medium">
            P{personId}
          </span>
        </button>
      </div>
    </header>
  );
}; 