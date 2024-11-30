import React, { createContext, useContext, useState } from 'react';
import { GermanState } from '../types/germanState';
import { VacationForm } from '../components/VacationForm';
import { StateSelect } from '../components/StateSelect';
import { VacationPlan } from '../types/vacationPlan';
import { Person, PersonInfo } from '../types/person';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface PersonContextType {
  persons: PersonInfo;
  updatePerson: (personId: 1 | 2, updates: Partial<Person>) => void;
  addVacationPlan: (personId: 1 | 2, plan: Omit<VacationPlan, 'id' | 'personId'>) => void;
  updateVacationPlan: (personId: 1 | 2, planId: string, updates: Partial<VacationPlan>) => void;
  removeVacationPlan: (personId: 1 | 2, planId: string) => void;
}

export const PersonContext = createContext<PersonContextType | null>(null);

export const usePersonContext = () => {
  const context = useContext(PersonContext);
  if (!context) {
    throw new Error('usePersonContext must be used within a PersonProvider');
  }
  return context;
};

// Gemeinsame Farbkonstanten für Kalender und Legende
export const holidayColors = {
  person1: {
    holiday: 'bg-red-500',
    bridge: 'bg-orange-400',
    school: 'bg-indigo-500',
    vacation: 'bg-green-500'
  },
  person2: {
    holiday: 'bg-purple-500',
    bridge: 'bg-teal-400',
    school: 'bg-emerald-500',
    vacation: 'bg-blue-500'
  },
  overlap: {
    holiday: 'bg-gradient-to-br from-red-500 to-purple-500',
    bridge: 'bg-gradient-to-br from-orange-400 to-teal-400',
    school: 'bg-gradient-to-br from-indigo-500 to-emerald-500',
    vacation: 'bg-gradient-to-br from-green-500 to-blue-500'
  }
};

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [persons, setPersons] = useState<PersonInfo>({
    person1: {
      id: 1,
      selectedState: GermanState.BE,
      availableVacationDays: 30,
      vacationPlans: []
    },
    person2: null
  });

  const [showVacationForm, setShowVacationForm] = useState<{ personId: 1 | 2 } | null>(null);

  const updatePerson = (personId: 1 | 2, updates: Partial<Person>) => {
    setPersons(prev => {
      if (personId === 1) {
        return {
          ...prev,
          person1: { ...prev.person1, ...updates }
        };
      } else {
        if (!prev.person2 && updates.selectedState) {
          // Erstelle Person 2, wenn sie noch nicht existiert
          return {
            ...prev,
            person2: {
              id: 2,
              selectedState: updates.selectedState,
              availableVacationDays: 30,
              vacationPlans: [],
              ...updates
            }
          };
        } else if (prev.person2) {
          return {
            ...prev,
            person2: { ...prev.person2, ...updates }
          };
        }
        return prev;
      }
    });
  };

  const addVacationPlan = (personId: 1 | 2, plan: Omit<VacationPlan, 'id' | 'personId'>) => {
    const newPlan: VacationPlan = {
      ...plan,
      id: Math.random().toString(36).substr(2, 9),
      personId,
      isVisible: true
    };

    setPersons(prev => {
      const person = personId === 1 ? prev.person1 : prev.person2;
      if (!person) return prev;

      const updatedPerson = {
        ...person,
        vacationPlans: [...person.vacationPlans, newPlan]
      };

      return {
        ...prev,
        [personId === 1 ? 'person1' : 'person2']: updatedPerson
      };
    });

    setShowVacationForm(null);
  };

  const updateVacationPlan = (personId: 1 | 2, planId: string, updates: Partial<VacationPlan>) => {
    setPersons(prev => {
      const person = personId === 1 ? prev.person1 : prev.person2;
      if (!person) return prev;

      const updatedPerson = {
        ...person,
        vacationPlans: person.vacationPlans.map(plan =>
          plan.id === planId ? { ...plan, ...updates } : plan
        )
      };

      return {
        ...prev,
        [personId === 1 ? 'person1' : 'person2']: updatedPerson
      };
    });
  };

  const removeVacationPlan = (personId: 1 | 2, planId: string) => {
    setPersons(prev => {
      const person = personId === 1 ? prev.person1 : prev.person2;
      if (!person) return prev;

      const updatedPerson = {
        ...person,
        vacationPlans: person.vacationPlans.filter(plan => plan.id !== planId)
      };

      return {
        ...prev,
        [personId === 1 ? 'person1' : 'person2']: updatedPerson
      };
    });
  };

  const handleVacationFormSubmit = (personId: 1 | 2, plan: Omit<VacationPlan, 'id' | 'personId'>) => {
    const person = personId === 1 ? persons.person1 : persons.person2;
    if (!person || !person.selectedState) return;

    addVacationPlan(personId, plan);
  };

  const renderLegend = (personId: 1 | 2) => {
    const colors = personId === 1 ? holidayColors.person1 : holidayColors.person2;
    return (
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 ${colors.holiday} border border-gray-200 rounded`}></div>
          <span className="text-sm text-gray-600">Feiertage</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 ${colors.bridge} border border-gray-200 rounded`}></div>
          <span className="text-sm text-gray-600">Brückentage</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 ${colors.school} border border-gray-200 rounded`}></div>
          <span className="text-sm text-gray-600">Schulferien</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 ${colors.vacation} border border-gray-200 rounded`}></div>
          <span className="text-sm text-gray-600">Urlaub</span>
        </div>
      </div>
    );
  };

  const renderOverlapLegend = () => (
    <div className="flex items-center gap-4 text-sm mt-2">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 ${holidayColors.overlap.holiday} border border-gray-200 rounded`}></div>
        <span className="text-sm text-gray-600">Feiertage (beide)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 ${holidayColors.overlap.bridge} border border-gray-200 rounded`}></div>
        <span className="text-sm text-gray-600">Brückentage (beide)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 ${holidayColors.overlap.school} border border-gray-200 rounded`}></div>
        <span className="text-sm text-gray-600">Schulferien (beide)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 ${holidayColors.overlap.vacation} border border-gray-200 rounded`}></div>
        <span className="text-sm text-gray-600">Urlaub (beide)</span>
      </div>
    </div>
  );

  return (
    <PersonContext.Provider 
      value={{ 
        persons, 
        updatePerson, 
        addVacationPlan, 
        updateVacationPlan, 
        removeVacationPlan 
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50">
        {/* Navigation Bar */}
        <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-teal-100">
          <div className="max-w-full mx-2">
            {/* Main Header Row */}
            <div className="flex items-center h-auto min-h-16 gap-4 py-2">
              {/* Logo and Title */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-8 h-8">
                  <img src="/favicon.svg" alt="Logo" className="w-full h-full" />
                </div>
                <span className="text-lg font-medium text-teal-950">Ferienplaner</span>
              </div>

              {/* States and Vacation Plans Container */}
              <div className="flex flex-col gap-3 flex-grow">
                {/* First Person Row */}
                <div className="flex flex-col rounded-lg border-2 border-emerald-300 bg-emerald-50/50 p-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">1.</span>
                      <StateSelect
                        selectedState={persons.person1.selectedState}
                        onStateChange={(state) => state && updatePerson(1, { selectedState: state })}
                        placeholder="Heimat-Bundesland"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={persons.person1.availableVacationDays}
                        onChange={(e) => updatePerson(1, { availableVacationDays: parseInt(e.target.value) || 0 })}
                        className="w-16 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        min="0"
                        max="365"
                      />
                      <span className="text-sm text-gray-600">Urlaubstage</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-gray-600">|</span>
                      <span className="text-gray-600">Verbleibend:</span>
                      <span className="font-semibold text-emerald-600">
                        {persons.person1.availableVacationDays -
                          persons.person1.vacationPlans.reduce((total, plan) => {
                            const days = Math.ceil((plan.end.getTime() - plan.start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                            return total + days;
                          }, 0)}
                      </span>
                    </div>

                    <button
                      onClick={() => setShowVacationForm({ personId: 1 })}
                      className="px-3 py-1 text-sm bg-gradient-to-r from-emerald-400 to-emerald-500 text-white rounded-full 
                        hover:from-emerald-500 hover:to-emerald-600 transition-all shadow-sm hover:shadow 
                        active:shadow-inner active:translate-y-px"
                    >
                      + Urlaub planen
                    </button>

                    {/* Vacation Plans Display */}
                    <div className="flex items-center gap-2">
                      {persons.person1.vacationPlans.map((plan, index) => (
                        <div key={plan.id} className="flex items-center gap-2 bg-emerald-100 px-2 py-1 rounded-full text-sm">
                          <span className="font-medium text-emerald-700">{index + 1}.</span>
                          <span className="text-emerald-900">
                            {format(plan.start, 'd.M.', { locale: de })} - {format(plan.end, 'd.M.', { locale: de })}
                          </span>
                          <button
                            onClick={() => updateVacationPlan(1, plan.id, { isVisible: !plan.isVisible })}
                            className={`p-1 rounded-full transition-colors ${
                              plan.isVisible ? 'bg-emerald-200 text-emerald-700' : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => removeVacationPlan(1, plan.id)}
                            className="p-1 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Legend for Person 1 */}
                    <div className="flex items-center gap-4 text-sm ml-auto">
                      {renderLegend(1)}
                    </div>
                  </div>
                </div>

                {/* Second Person Row */}
                <div className="flex flex-col rounded-lg border-2 border-cyan-300 bg-cyan-50/50 p-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">2.</span>
                      <StateSelect
                        selectedState={persons.person2?.selectedState || null}
                        onStateChange={(state) => state && updatePerson(2, { selectedState: state })}
                        placeholder="2. Bundesland"
                        allowEmpty
                      />
                    </div>

                    {persons.person2 && (
                      <>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={persons.person2.availableVacationDays}
                            onChange={(e) => updatePerson(2, { availableVacationDays: parseInt(e.target.value) || 0 })}
                            className="w-16 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            min="0"
                            max="365"
                          />
                          <span className="text-sm text-gray-600">Urlaubstage</span>
                        </div>

                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-gray-600">|</span>
                          <span className="text-gray-600">Verbleibend:</span>
                          <span className="font-semibold text-cyan-600">
                            {persons.person2.availableVacationDays -
                              persons.person2.vacationPlans.reduce((total, plan) => {
                                const days = Math.ceil((plan.end.getTime() - plan.start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                                return total + days;
                              }, 0)}
                          </span>
                        </div>

                        <button
                          onClick={() => setShowVacationForm({ personId: 2 })}
                          className="px-3 py-1 text-sm bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-full 
                            hover:from-cyan-500 hover:to-cyan-600 transition-all shadow-sm hover:shadow 
                            active:shadow-inner active:translate-y-px"
                        >
                          + Urlaub planen
                        </button>

                        {/* Vacation Plans Display */}
                        <div className="flex items-center gap-2">
                          {persons.person2.vacationPlans.map((plan, index) => (
                            <div key={plan.id} className="flex items-center gap-2 bg-cyan-100 px-2 py-1 rounded-full text-sm">
                              <span className="font-medium text-cyan-700">{index + 1}.</span>
                              <span className="text-cyan-900">
                                {format(plan.start, 'd.M.', { locale: de })} - {format(plan.end, 'd.M.', { locale: de })}
                              </span>
                              <button
                                onClick={() => updateVacationPlan(2, plan.id, { isVisible: !plan.isVisible })}
                                className={`p-1 rounded-full transition-colors ${
                                  plan.isVisible ? 'bg-cyan-200 text-cyan-700' : 'bg-gray-100 text-gray-400'
                                }`}
                              >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => removeVacationPlan(2, plan.id)}
                                className="p-1 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Legend for Person 2 */}
                        <div className="flex items-center gap-4 text-sm ml-auto">
                          {renderLegend(2)}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-full mx-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
            {children}
          </div>
        </main>

        {/* Vacation Form Modal */}
        {showVacationForm && (
          <div className="fixed inset-0 bg-teal-950/20 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/95 p-6 rounded-2xl shadow-xl max-w-md w-full">
              {(() => {
                const person = showVacationForm.personId === 1 ? persons.person1 : persons.person2;
                if (!person || !person.selectedState) return null;

                return (
                  <VacationForm
                    personId={showVacationForm.personId}
                    state={person.selectedState}
                    onSubmit={(plan) => handleVacationFormSubmit(showVacationForm.personId, plan)}
                    onClose={() => setShowVacationForm(null)}
                  />
                );
              })()}
            </div>
          </div>
        )}

        {/* Legend section */}
        <div className="container mx-auto px-4 py-2 space-y-2">
          <div className="flex flex-col gap-4 bg-white/80 rounded-xl p-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Person 1 - {persons.person1.selectedState}</h3>
              {renderLegend(1)}
            </div>
            {persons.person2 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Person 2 - {persons.person2.selectedState}</h3>
                {renderLegend(2)}
              </div>
            )}
            {persons.person2 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Überschneidungen</h3>
                {renderOverlapLegend()}
              </div>
            )}
          </div>
        </div>
      </div>
    </PersonContext.Provider>
  );
};

export default MainLayout; 