import React from 'react';

interface MobileHeaderProps {
  title?: string;
  onPersonSwitch: () => void;
  accentColor: string;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title = 'Holiday Planner',
  onPersonSwitch,
  accentColor
}) => {
  return (
    <header className="flex items-center justify-between px-4 py-2" role="banner">
      <h1 className="text-lg font-medium text-gray-900">{title}</h1>
      <button
        onClick={onPersonSwitch}
        className={`p-2 rounded-full transition-colors`}
        style={{ color: accentColor }}
        aria-label="Person wechseln"
        type="button"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
          role="img"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
          />
        </svg>
      </button>
    </header>
  );
}; 