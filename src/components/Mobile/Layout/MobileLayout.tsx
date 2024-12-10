import React from 'react';
import { MobileEfficiencyScore } from './MobileEfficiencyScore';

interface MobileLayoutProps {
  header: React.ReactNode;
  stateSelector: React.ReactNode;
  vacationCounter: React.ReactNode;
  viewTabs: React.ReactNode;
  actionBar: React.ReactNode;
  children: React.ReactNode;
  efficiency?: number;
  personId: 1 | 2;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  header,
  stateSelector,
  vacationCounter,
  viewTabs,
  actionBar,
  children,
  efficiency,
  personId
}) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Skip Link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-blue-600"
      >
        Zum Hauptinhalt springen
      </a>

      {/* Fixed Header Section */}
      <div 
        className="flex-none"
        role="banner"
      >
        {header}
        
        {/* Efficiency Score */}
        {efficiency !== undefined && (
          <MobileEfficiencyScore efficiency={efficiency} personId={personId} />
        )}

        <div 
          role="region" 
          aria-label="Einstellungen"
          className="flex flex-col gap-2 px-4 py-3 border-t border-gray-200 bg-gray-50"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              {stateSelector}
            </div>
            <div className="flex-1">
              {vacationCounter}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Moved up */}
      <div className="flex-none border-t border-gray-200">
        {viewTabs}
      </div>

      {/* Main Content */}
      <main 
        id="main-content"
        className="flex-1 overflow-hidden"
        role="main"
        aria-label="Hauptinhalt"
      >
        {children}
      </main>

      {/* Fixed Footer - Only Export Button */}
      <div 
        className="flex-none"
        role="contentinfo"
      >
        {actionBar}
      </div>

      {/* Landmark navigation for screen readers */}
      <nav className="sr-only" aria-label="Seitenstruktur">
        <ul>
          <li><a href="#main-content">Hauptinhalt</a></li>
          <li><a href="#settings">Einstellungen</a></li>
          <li><a href="#navigation">Navigation</a></li>
          <li><a href="#actions">Aktionen</a></li>
        </ul>
      </nav>
    </div>
  );
}; 