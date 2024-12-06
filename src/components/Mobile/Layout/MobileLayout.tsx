import React from 'react';

interface MobileLayoutProps {
  header: React.ReactNode;
  stateSelector: React.ReactNode;
  vacationCounter: React.ReactNode;
  viewTabs: React.ReactNode;
  actionBar: React.ReactNode;
  children: React.ReactNode;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  header,
  stateSelector,
  vacationCounter,
  viewTabs,
  actionBar,
  children
}) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="flex-none">
        {header}
        {stateSelector}
        {vacationCounter}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>

      {/* Fixed Footer */}
      <div className="flex-none">
        {viewTabs}
        {actionBar}
      </div>
    </div>
  );
}; 