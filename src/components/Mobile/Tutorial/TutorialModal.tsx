import React from 'react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const tutorialSteps = [
    {
      title: "Bundesland auswählen",
      description: "Wählen Sie zuerst Ihr Bundesland aus, um die relevanten Feiertage zu sehen.",
      icon: "🗺️"
    },
    {
      title: "Urlaubstage festlegen",
      description: "Geben Sie die Anzahl Ihrer verfügbaren Urlaubstage an.",
      icon: "📅"
    },
    {
      title: "Urlaub planen",
      description: "Tippen Sie auf '+ Urlaub planen' und wählen Sie Start- und Enddatum Ihres Urlaubs.",
      icon: "✨"
    },
    {
      title: "Brückentage nutzen",
      description: "Nutzen Sie die Empfehlungen für Brückentage, um Ihren Urlaub effizient zu planen.",
      icon: "🌉"
    },
    {
      title: "Gemeinsam planen",
      description: "Wechseln Sie zwischen Person 1 und 2, um Urlaub für mehrere Personen zu planen.",
      icon: "👥"
    },
    {
      title: "Urlaub exportieren",
      description: "Exportieren Sie Ihren Urlaubsplan als PDF oder fügen Sie ihn Ihrem Kalender hinzu.",
      icon: "📤"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full h-full max-w-lg bg-white md:h-auto md:rounded-2xl md:max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Wie funktioniert Holiday Planner?
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-500 transition-colors"
            aria-label="Schließen"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {tutorialSteps.map((step, index) => (
              <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl">{step.icon}</div>
                <div>
                  <h3 className="font-medium text-gray-900">{step.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors"
          >
            Alles klar, los geht's!
          </button>
        </div>
      </div>
    </div>
  );
}; 