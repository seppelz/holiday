import React from 'react';

interface ShortcutGroup {
  title: string;
  shortcuts: {
    keys: string[];
    description: string;
  }[];
}

interface KeyboardShortcutsHelperProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsHelper: React.FC<KeyboardShortcutsHelperProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcutGroups: ShortcutGroup[] = [
    {
      title: 'Navigation',
      shortcuts: [
        { keys: ['?'], description: 'Zeige/Verstecke Tastaturkürzel' },
        { keys: ['Esc'], description: 'Schließe Dialoge' },
      ],
    },
    {
      title: 'Urlaub planen',
      shortcuts: [
        { keys: ['n'], description: 'Neuen Urlaub für Person 1 planen' },
        { keys: ['m'], description: 'Neuen Urlaub für Person 2 planen' },
        { keys: ['q'], description: 'Empfehlungen für Person 1 anzeigen' },
        { keys: ['w'], description: 'Empfehlungen für Person 2 anzeigen' },
        { keys: ['1', '2', '3'], description: 'Urlaub 1-3 von Person 1 löschen' },
        { keys: ['4'], description: 'Urlaub 4 oder letzten Urlaub von Person 1 löschen' },
        { keys: ['5', '6', '7'], description: 'Urlaub 1-3 von Person 2 löschen' },
        { keys: ['8'], description: 'Urlaub 4 oder letzten Urlaub von Person 2 löschen' },
        { keys: ['p'], description: 'Person 2 ein-/ausblenden' },
      ],
    },
    {
      title: 'Kalender Navigation',
      shortcuts: [
        { keys: ['←', '→'], description: 'Vorheriger/Nächster Tag' },
        { keys: ['↑', '↓'], description: 'Vorherige/Nächste Woche' },
        { keys: ['Enter'], description: 'Tag auswählen' },
      ],
    },
  ];

  const renderKey = (key: string) => (
    <kbd
      className="px-2 py-1 text-sm font-semibold bg-gray-100 border border-gray-300 rounded-md shadow-sm"
    >
      {key}
    </kbd>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Tastaturkürzel</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="Schließen"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-8">
            {shortcutGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-medium text-gray-900 mb-3">{group.title}</h3>
                <div className="space-y-3">
                  {group.shortcuts.map((shortcut) => (
                    <div
                      key={shortcut.description}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-600">{shortcut.description}</span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, index) => (
                          <React.Fragment key={key}>
                            {index > 0 && <span className="text-gray-400 mx-1">oder</span>}
                            {renderKey(key)}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-500">
              Drücke <kbd className="px-2 py-1 text-sm font-semibold bg-gray-100 border border-gray-300 rounded-md">?</kbd> um 
              diese Übersicht jederzeit anzuzeigen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 