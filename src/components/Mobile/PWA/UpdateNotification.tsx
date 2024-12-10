import React, { useState, useEffect } from 'react';

export const UpdateNotification: React.FC = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);

  useEffect(() => {
    // Add a delay before checking for updates on initial load
    const initialDelay = setTimeout(() => {
      const handleUpdate = () => {
        const now = Date.now();
        // Only show update if it's been at least 1 hour since the last one
        if (now - lastUpdateTime > 3600000) {
          setShowUpdatePrompt(true);
          setLastUpdateTime(now);
        }
      };

      // Only listen for the actual update event
      window.addEventListener('swUpdated', handleUpdate);

      return () => {
        window.removeEventListener('swUpdated', handleUpdate);
      };
    }, 5000); // 5 second delay on startup

    return () => clearTimeout(initialDelay);
  }, [lastUpdateTime]);

  const handleUpdate = () => {
    // Reload the page to activate the new service worker
    window.location.reload();
  };

  if (!showUpdatePrompt) return null;

  return (
    <div className="fixed top-0 left-0 right-0 p-4 bg-indigo-600 text-white shadow-lg z-50">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="flex-1 mr-4">
          <p className="text-sm font-medium">
            Neue Version verfügbar
          </p>
          <p className="text-xs opacity-90 mt-0.5">
            Aktualisiere jetzt für neue Funktionen und Verbesserungen
          </p>
        </div>
        <button
          onClick={handleUpdate}
          className="px-3 py-1.5 text-xs bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
        >
          Aktualisieren
        </button>
      </div>
    </div>
  );
}; 