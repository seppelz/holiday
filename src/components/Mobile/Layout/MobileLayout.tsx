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
        <div role="region" aria-label="Einstellungen">
          {stateSelector}
          {vacationCounter}
        </div>
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

      {/* Fixed Footer */}
      <div 
        className="flex-none"
        role="contentinfo"
      >
        {/* Navigation */}
        {viewTabs}
        {/* Action Bar */}
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