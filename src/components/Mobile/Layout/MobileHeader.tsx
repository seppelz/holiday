import React from 'react';

interface MobileHeaderProps {
  title: string;
  leftAction?: {
    icon: React.ReactNode;
    onClick: () => void;
    label: string;
  };
  rightAction?: {
    icon: React.ReactNode;
    onClick: () => void;
    label: string;
  };
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  leftAction,
  rightAction
}) => {
  return (
    <div className="px-4 py-3 flex items-center justify-between">
      {/* Left Action */}
      <div className="w-10">
        {leftAction && (
          <button
            onClick={leftAction.onClick}
            className="p-2 -ml-2 text-gray-600 active:bg-gray-100 rounded-full touch-manipulation"
            aria-label={leftAction.label}
          >
            {leftAction.icon}
          </button>
        )}
      </div>

      {/* Title */}
      <h1 className="text-lg font-medium text-gray-900 truncate max-w-[60%]">
        {title}
      </h1>

      {/* Right Action */}
      <div className="w-10">
        {rightAction && (
          <button
            onClick={rightAction.onClick}
            className="p-2 -mr-2 text-gray-600 active:bg-gray-100 rounded-full touch-manipulation"
            aria-label={rightAction.label}
          >
            {rightAction.icon}
          </button>
        )}
      </div>
    </div>
  );
}; 