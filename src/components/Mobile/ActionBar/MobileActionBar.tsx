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
    <div className="bg-white border-t border-gray-200 py-2 px-4">
      <button
        onClick={onPersonSwitch}
        className="w-full py-2 px-4 rounded-lg text-white text-sm font-medium transition-colors"
        style={{ backgroundColor: accentColor }}
      >
        Person wechseln
      </button>
    </div>
  );
}; 