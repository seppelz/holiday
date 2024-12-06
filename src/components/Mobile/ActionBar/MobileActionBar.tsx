import React from 'react';

interface ActionItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
  disabled?: boolean;
}

interface MobileActionBarProps {
  actions: ActionItem[];
  position?: 'top' | 'bottom';
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({
  actions,
  position = 'bottom'
}) => {
  const positionClasses = position === 'top' 
    ? 'top-0 border-b' 
    : 'bottom-0 border-t';

  return (
    <div className={`fixed left-0 right-0 ${positionClasses} bg-white z-30 px-2 py-1`}>
      <div className="flex items-center justify-around">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            disabled={action.disabled}
            className={`
              flex flex-col items-center p-2 min-w-[72px]
              ${action.disabled ? 'opacity-50' : 'active:bg-gray-100'}
              rounded-lg touch-manipulation
            `}
            style={{ color: action.color }}
          >
            <div className="mb-1">
              {action.icon}
            </div>
            <span className="text-xs font-medium truncate max-w-[80px]">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}; 