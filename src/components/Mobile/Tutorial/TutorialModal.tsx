import React, { useState } from 'react';
import { GermanState, stateNames } from '../../../types/GermanState';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStateSelect?: (state: GermanState) => void;
  onVacationDaysSet?: (days: number) => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onClose,
  onStateSelect,
  onVacationDaysSet
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedState, setSelectedState] = useState<GermanState | null>(null);
  const [vacationDays, setVacationDays] = useState<number>(30);

  if (!isOpen) return null;

  const germanStates: { label: string; value: GermanState }[] = [
    { label: stateNames[GermanState.BW], value: GermanState.BW },
    { label: stateNames[GermanState.BY], value: GermanState.BY },
    { label: stateNames[GermanState.BE], value: GermanState.BE },
    { label: stateNames[GermanState.BB], value: GermanState.BB },
    { label: stateNames[GermanState.HB], value: GermanState.HB },
    { label: stateNames[GermanState.HH], value: GermanState.HH },
    { label: stateNames[GermanState.HE], value: GermanState.HE },
    { label: stateNames[GermanState.MV], value: GermanState.MV },
    { label: stateNames[GermanState.NI], value: GermanState.NI },
    { label: stateNames[GermanState.NW], value: GermanState.NW },
    { label: stateNames[GermanState.RP], value: GermanState.RP },
    { label: stateNames[GermanState.SL], value: GermanState.SL },
    { label: stateNames[GermanState.SN], value: GermanState.SN },
    { label: stateNames[GermanState.ST], value: GermanState.ST },
    { label: stateNames[GermanState.SH], value: GermanState.SH },
    { label: stateNames[GermanState.TH], value: GermanState.TH }
  ];

  const handleNext = () => {
    if (currentStep === 0 && selectedState) {
      onStateSelect?.(selectedState);
      setCurrentStep(1);
    } else if (currentStep === 1) {
      onVacationDaysSet?.(vacationDays);
      setCurrentStep(2);
    }
  };

  const handleFinish = () => {
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🗺️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Willkommen bei Holiday Planner!
                </h3>
                <p className="text-gray-600">
                  Wählen Sie zuerst Ihr Bundesland aus, um die relevanten Feiertage zu sehen.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 max-h-[50vh] overflow-y-auto">
                {germanStates.map((state) => (
                  <button
                    key={state.value}
                    onClick={() => setSelectedState(state.value)}
                    className={`p-3 rounded-lg text-left transition-colors ${
                      selectedState === state.value
                        ? 'bg-indigo-100 text-indigo-700 font-medium'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {state.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">📅</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Wie viele Urlaubstage haben Sie?
                </h3>
                <p className="text-gray-600">
                  Geben Sie die Anzahl Ihrer jährlichen Urlaubstage an.
                </p>
              </div>
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => setVacationDays(Math.max(0, vacationDays - 1))}
                  className="w-12 h-12 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center text-xl hover:bg-gray-200"
                >
                  -
                </button>
                <div className="text-3xl font-semibold text-gray-900 w-16 text-center">
                  {vacationDays}
                </div>
                <button
                  onClick={() => setVacationDays(Math.min(100, vacationDays + 1))}
                  className="w-12 h-12 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center text-xl hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-500 text-center mt-4">
                Der Durchschnitt in Deutschland liegt bei 30 Tagen
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">✨</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Perfekt, Sie können jetzt loslegen!
                </h3>
                <p className="text-gray-600 mb-4">
                  Hier sind die wichtigsten Funktionen:
                </p>
              </div>
              <div className="space-y-3">
                {[
                  {
                    icon: "📆",
                    title: "Urlaub planen",
                    description: "Tippen Sie auf '+ Urlaub planen' und wählen Sie die Urlaubstage aus"
                  },
                  {
                    icon: "🌉",
                    title: "Brückentage nutzen",
                    description: "Sehen Sie Empfehlungen für effiziente Urlaubsplanung"
                  },
                  {
                    icon: "👥",
                    title: "Gemeinsam planen",
                    description: "Planen Sie Urlaub für mehrere Personen"
                  },
                  {
                    icon: "📤",
                    title: "Exportieren",
                    description: "Speichern Sie Ihren Plan als PDF oder fügen Sie ihn Ihrem Kalender hinzu"
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl">{feature.icon}</div>
                    <div>
                      <h4 className="font-medium text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full h-full max-w-lg bg-white md:h-auto md:rounded-2xl md:max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {currentStep === 0 ? 'Willkommen!' : 
             currentStep === 1 ? 'Urlaubstage' : 
             'Übersicht'}
          </h2>
          {currentStep < 2 && (
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="Schließen"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        {renderStep()}

        {/* Fixed Footer */}
        <div className="p-4 border-t">
          <button
            onClick={currentStep < 2 ? handleNext : handleFinish}
            disabled={currentStep === 0 && !selectedState}
            className={`w-full px-4 py-2 text-sm font-medium text-white rounded-full transition-colors
              ${currentStep === 0 && !selectedState
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {currentStep === 0 ? 'Weiter zu den Urlaubstagen' :
             currentStep === 1 ? 'Weiter zur Übersicht' :
             'Los geht\'s!'}
          </button>
        </div>
      </div>
    </div>
  );
};