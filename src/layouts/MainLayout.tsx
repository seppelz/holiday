import React, { createContext, useContext, useState } from 'react';
import { GermanState } from '../types/germanState';
import { VacationForm } from '../components/VacationForm';
import { StateSelect } from '../components/StateSelect';
import { VacationPlan } from '../types/vacationPlan';

interface StateContextType {
  stateInfo: Record<GermanState, {
    vacationPlans: VacationPlan[];
    availableVacationDays: number;
  }>;
  setStateInfo: React.Dispatch<React.SetStateAction<StateContextType['stateInfo']>>;
  selectedStates: {
    first: GermanState;
    second: GermanState | null;
  };
  setSelectedStates: React.Dispatch<React.SetStateAction<{
    first: GermanState;
    second: GermanState | null;
  }>>;
}

export const StateContext = createContext<StateContextType | null>(null);

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a StateContextProvider');
  }
  return context;
};

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedStates, setSelectedStates] = useState<{
    first: GermanState;
    second: GermanState | null;
  }>({
    first: GermanState.BE,
    second: null
  });

  const [showVacationForm, setShowVacationForm] = useState(false);

  const [stateInfo, setStateInfo] = useState<StateContextType['stateInfo']>(() => {
    const initialStateInfo: StateContextType['stateInfo'] = {} as StateContextType['stateInfo'];
    Object.values(GermanState).forEach(state => {
      initialStateInfo[state] = {
        vacationPlans: [],
        availableVacationDays: 30
      };
    });
    return initialStateInfo;
  });

  const handleVacationSubmit = (plan: Omit<VacationPlan, 'id'>) => {
    const newStateInfo = { ...stateInfo };
    const newPlan: VacationPlan = {
      ...plan,
      id: Math.random().toString(36).substring(2),
      isVisible: true
    };
    newStateInfo[selectedStates.first].vacationPlans.push(newPlan);
    setStateInfo(newStateInfo);
    setShowVacationForm(false);
  };

  return (
    <StateContext.Provider value={{ stateInfo, setStateInfo, selectedStates, setSelectedStates }}>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50">
        <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-indigo-100">
          <div className="max-w-full mx-2">
            {/* Main Header Row */}
            <div className="flex items-center h-16 gap-4">
              {/* Logo and Title */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8">
                  <img src="/favicon.svg" alt="Logo" className="w-full h-full" />
                </div>
                <span className="text-lg font-medium text-indigo-950">Ferienplaner</span>
              </div>

              {/* First State Selection */}
              <div className="flex items-center gap-2">
                <span className="font-medium text-indigo-600">1.</span>
                <StateSelect
                  selectedState={selectedStates.first}
                  onStateChange={(state) => setSelectedStates(prev => ({ ...prev, first: state }))}
                  placeholder="Heimat-Bundesland"
                />
              </div>

              {/* Vacation Planning Section */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowVacationForm(true)}
                  className="px-3 py-1.5 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full 
                    hover:from-emerald-600 hover:to-teal-600 transition-all shadow-sm hover:shadow 
                    active:shadow-inner active:translate-y-px flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Urlaub planen
                </button>
                {/* Vacation Toggles */}
                <div className="flex items-center gap-2">
                  {stateInfo[selectedStates.first].vacationPlans.map((plan, index) => (
                    <div key={plan.id} className="flex items-center gap-1.5 bg-white/80 px-2 py-1 rounded-full shadow-sm">
                      <span className="text-sm font-medium text-indigo-700">{index + 1}</span>
                      <button
                        onClick={() => {
                          const newStateInfo = { ...stateInfo };
                          newStateInfo[selectedStates.first].vacationPlans[index].isVisible = 
                            !newStateInfo[selectedStates.first].vacationPlans[index].isVisible;
                          setStateInfo(newStateInfo);
                        }}
                        className={`w-8 h-5 rounded-full transition-all ${
                          plan.isVisible 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                            : 'bg-gray-200'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${
                          plan.isVisible ? 'translate-x-4' : 'translate-x-0.5'
                        }`} />
                      </button>
                      <button
                        onClick={() => {
                          const newStateInfo = { ...stateInfo };
                          newStateInfo[selectedStates.first].vacationPlans = 
                            newStateInfo[selectedStates.first].vacationPlans.filter((_, i) => i !== index);
                          setStateInfo(newStateInfo);
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Year Display */}
              <span className="text-xl font-medium text-indigo-950">2025</span>

              {/* Second State Section */}
              <div className="flex items-center gap-2">
                <span className="font-medium text-indigo-600">2.</span>
                <StateSelect
                  selectedState={selectedStates.second}
                  onStateChange={(state) => setSelectedStates(prev => ({ ...prev, second: state }))}
                  placeholder="2. Bundesland"
                  allowEmpty
                />
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 ml-auto">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-br from-rose-200 to-red-300 rounded-full shadow-sm"></div>
                  <span className="text-sm text-gray-600">Feiertage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-full shadow-sm"></div>
                  <span className="text-sm text-gray-600">Brückentage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-br from-sky-200 to-blue-300 rounded-full shadow-sm"></div>
                  <span className="text-sm text-gray-600">Schulferien</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-4 px-2">
          {children}
        </main>

        {showVacationForm && (
          <div className="fixed inset-0 bg-indigo-950/20 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/95 p-6 rounded-2xl shadow-xl max-w-md w-full">
              <VacationForm
                onSubmit={handleVacationSubmit}
                onCancel={() => setShowVacationForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </StateContext.Provider>
  );
};

export default MainLayout; 