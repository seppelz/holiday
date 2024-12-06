import React from 'react';

interface MobileActionBarProps {
  onPersonSwitch: () => void;
  accentColor: string;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({
  onPersonSwitch,
  accentColor
}) => {
  return (
    <div 
      className="bg-white border-t border-gray-200 py-2 px-4" 
      role="complementary" 
      aria-label="Aktionsleiste"
    >
      <button
        onClick={onPersonSwitch}
        className="w-full py-2 px-4 rounded-lg text-white text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{ 
          backgroundColor: accentColor,
          '--tw-ring-color': accentColor
        } as React.CSSProperties}
        type="button"
        aria-label="Zwischen Personen wechseln"
      >
        Person wechseln
      </button>
    </div>
  );
}; 