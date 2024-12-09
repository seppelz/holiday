import React, { useState, useEffect } from 'react';

export const UpdateNotification: React.FC = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setShowUpdatePrompt(true);
    };

    // Listen for our custom update events
    window.addEventListener('swUpdated', handleUpdate);
    window.addEventListener('swControllerChange', handleUpdate);

    return () => {
      window.removeEventListener('swUpdated', handleUpdate);
      window.removeEventListener('swControllerChange', handleUpdate);
    };
  }, []);

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