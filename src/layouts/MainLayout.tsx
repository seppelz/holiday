import React, { useState, useRef, useEffect } from 'react';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import { usePersonContext } from '../contexts/PersonContext';
import { VacationPicker } from '../components/VacationPicker';
import { GermanState, stateNames } from '../types/GermanState';
import { useBridgeDays } from '../hooks/useBridgeDays';
import { VacationPlan } from '../types/vacationPlan';
import { VacationList } from '../components/VacationList';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { persons, updatePerson, addVacationPlan, updateVacationPlan, deleteVacationPlan } = usePersonContext();
  const [isSelectingVacation, setIsSelectingVacation] = useState<{ personId: 1 | 2 } | null>(null);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [isPersonControlsOpen, setIsPersonControlsOpen] = useState(true);
  const legendSheetRef = useRef<HTMLDivElement>(null);
  const { holidays: person1Holidays, bridgeDays: person1BridgeDays } = useBridgeDays(persons.person1.selectedState);
  const { holidays: person2Holidays, bridgeDays: person2BridgeDays } = useBridgeDays(persons.person2?.selectedState || null);

  // Handle legend swipe
  const bindLegend = useDrag(
    ({ movement: [, my], last, cancel }) => {
      if (my < -50) {
        setIsLegendOpen(true);
        if (navigator.vibrate) {
          navigator.vibrate(10);
        }
        cancel();
      } else if (my > 50) {
        setIsLegendOpen(false);
        if (navigator.vibrate) {
          navigator.vibrate(10);
        }
        cancel();
      }
      if (last) {
        setIsLegendOpen(false);
      }
    },
    { axis: 'y', bounds: { top: 0, bottom: 300 } }
  );

  // Handle controls toggle
  const [controlsSpring, controlsApi] = useSpring(() => ({
    height: isPersonControlsOpen ? 'auto' : 0,
    config: { tension: 200, friction: 20 }
  }));

  useEffect(() => {
    controlsApi.start({
      height: isPersonControlsOpen ? 'auto' : 0,
      immediate: false
    });
  }, [isPersonControlsOpen]);

  const handleVacationSelect = (plan: Omit<VacationPlan, 'id' | 'personId'>) => {
    if (!isSelectingVacation) return;
    
    addVacationPlan(isSelectingVacation.personId, {
      ...plan,
      isVisible: true
    });
    setIsSelectingVacation(null);
  };

  const handleToggleVacationVisibility = (personId: 1 | 2, planId: string) => {
    const person = personId === 1 ? persons.person1 : persons.person2;
    const plan = person?.vacationPlans.find(p => p.id === planId);
    if (plan) {
      updateVacationPlan(personId, planId, { ...plan, isVisible: !plan.isVisible });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50">
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-teal-100">
        <div className="max-w-full mx-2">
          {/* Header */}
          <div className="flex items-center gap-4 h-12">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7">
                <img src="/favicon.svg" alt="Logo" className="w-full h-full" />
              </div>
              <span className="text-lg font-medium text-teal-950">Ferienplaner</span>
            </div>

            {/* Person 1 Controls */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-500">1.</span>
              <div className="flex items-center gap-2">
                <select
                  value={persons.person1.selectedState}
                  onChange={(e) => {
                    updatePerson(1, { selectedState: e.target.value as GermanState });
                  }}
                  className="px-2 py-1 bg-white/80 border-0 rounded-full text-sm text-gray-900
                    shadow-sm hover:bg-white/90 transition-all cursor-pointer
                    focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-0 focus:outline-none
                    appearance-none bg-no-repeat bg-right pr-8"
                  style={{ backgroundSize: '1.5rem 1.5rem' }}
                >
                  {Object.entries(GermanState).map(([key, value]) => (
                    <option key={key} value={value}>
                      {stateNames[value as GermanState]}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={persons.person1.availableVacationDays}
                  onChange={(e) => updatePerson(1, { availableVacationDays: parseInt(e.target.value) || 0 })}
                  className="w-14 px-1 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  min="0"
                  max="365"
                />
                <span className="text-sm text-gray-600">Urlaubstage</span>
                <span className="text-gray-400">|</span>
                <span className="text-sm text-gray-600">Verbleibend:</span>
                <span className="font-medium text-emerald-600">
                  {persons.person1.availableVacationDays -
                    persons.person1.vacationPlans.reduce((total, plan) => {
                      const days = Math.ceil((plan.end.getTime() - plan.start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                      return total + days;
                    }, 0)}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsSelectingVacation({ personId: 1 })}
                    className="px-3 py-1 text-sm text-white rounded-full bg-emerald-500 hover:bg-emerald-600"
                    disabled={isSelectingVacation !== null}
                  >
                    {isSelectingVacation?.personId === 1 ? 'Urlaubsauswahl läuft...' : '+ Urlaub planen'}
                  </button>
                  <VacationList
                    vacations={persons.person1.vacationPlans}
                    onToggleVisibility={(id) => handleToggleVacationVisibility(1, id)}
                    onRemove={(id) => deleteVacationPlan(1, id)}
                  />
                </div>
              </div>
            </div>

            {/* Add Person 2 Button or Person 2 Controls */}
            {!persons.person2 ? (
              <button
                onClick={() => updatePerson(2, { selectedState: persons.person1.selectedState })}
                className="px-2 py-1 text-sm text-white bg-cyan-500 hover:bg-cyan-600 rounded-full transition-colors"
                title="Zweite Person hinzufügen"
              >
                2.
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <select
                    value={persons.person2.selectedState}
                    onChange={(e) => {
                      updatePerson(2, { selectedState: e.target.value as GermanState });
                    }}
                    className="px-2 py-1 bg-white/80 border-0 rounded-full text-sm text-gray-900
                      shadow-sm hover:bg-white/90 transition-all cursor-pointer
                      focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-0 focus:outline-none
                      appearance-none bg-no-repeat bg-right pr-8"
                    style={{ backgroundSize: '1.5rem 1.5rem' }}
                  >
                    {Object.entries(GermanState).map(([key, value]) => (
                      <option key={key} value={value}>
                        {stateNames[value as GermanState]}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={persons.person2.availableVacationDays}
                    onChange={(e) => updatePerson(2, { availableVacationDays: parseInt(e.target.value) || 0 })}
                    className="w-14 px-1 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    min="0"
                    max="365"
                  />
                  <span className="text-sm text-gray-600">Urlaubstage</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-sm text-gray-600">Verbleibend:</span>
                  <span className="font-medium text-cyan-600">
                    {persons.person2.availableVacationDays -
                      persons.person2.vacationPlans.reduce((total, plan) => {
                        const days = Math.ceil((plan.end.getTime() - plan.start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                        return total + days;
                      }, 0)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsSelectingVacation({ personId: 2 })}
                      className="px-3 py-1 text-sm text-white rounded-full bg-cyan-500 hover:bg-cyan-600"
                      disabled={isSelectingVacation !== null}
                    >
                      {isSelectingVacation?.personId === 2 ? 'Urlaubsauswahl läuft...' : '+ Urlaub planen'}
                    </button>
                    <VacationList
                      vacations={persons.person2.vacationPlans}
                      onToggleVisibility={(id) => handleToggleVacationVisibility(2, id)}
                      onRemove={(id) => deleteVacationPlan(2, id)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="hidden md:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 border border-gray-200 rounded" />
                <span>Feiertage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-400 border border-gray-200 rounded" />
                <span>Brückentage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-500 border border-gray-200 rounded" />
                <span>Schulferien</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 border border-gray-200 rounded" />
                <span>Urlaub</span>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setIsLegendOpen(!isLegendOpen)}
                className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-full"
                aria-label="Toggle Legend"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => setIsPersonControlsOpen(!isPersonControlsOpen)}
                className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-full"
                aria-label="Toggle Controls"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Person Controls - Only for Person 2 */}
          <animated.div className="overflow-hidden" style={controlsSpring} data-testid="animated-div">
            {persons.person2 && (
              <div className="py-2">
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">2.</span>
                    <select
                      value={persons.person2.selectedState}
                      onChange={(e) => {
                        updatePerson(2, { selectedState: e.target.value as GermanState });
                      }}
                      className="px-3 py-1.5 bg-white/80 border-0 rounded-full text-sm text-gray-900
                        shadow-sm hover:bg-white/90 transition-all cursor-pointer
                        focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-0 focus:outline-none
                        appearance-none bg-no-repeat bg-right pr-8"
                      style={{ backgroundSize: '1.5rem 1.5rem' }}
                    >
                      {Object.entries(GermanState).map(([key, value]) => (
                        <option key={key} value={value}>
                          {stateNames[value as GermanState]}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={persons.person2.availableVacationDays}
                      onChange={(e) => updatePerson(2, { availableVacationDays: parseInt(e.target.value) || 0 })}
                      className="w-16 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      min="0"
                      max="365"
                    />
                    <span className="text-sm text-gray-600">Urlaubstage</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-sm text-gray-600">Verbleibend:</span>
                    <span className="font-medium text-cyan-600">
                      {persons.person2.availableVacationDays -
                        persons.person2.vacationPlans.reduce((total, plan) => {
                          const days = Math.ceil((plan.end.getTime() - plan.start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                          return total + days;
                        }, 0)}
                    </span>
                    <button
                      onClick={() => setIsSelectingVacation({ personId: 2 })}
                      className="px-3 py-1 text-sm text-white rounded-full bg-cyan-500 hover:bg-cyan-600"
                      disabled={isSelectingVacation !== null}
                    >
                      {isSelectingVacation?.personId === 2 ? 'Urlaubsauswahl läuft...' : '+ Urlaub planen'}
                    </button>
                    <VacationList
                      vacations={persons.person2.vacationPlans}
                      onToggleVisibility={(id) => handleToggleVacationVisibility(2, id)}
                      onRemove={(id) => deleteVacationPlan(2, id)}
                    />
                  </div>
                </div>
              </div>
            )}
          </animated.div>
        </div>
      </nav>

      {/* Main content */}
      <main className="container mx-auto p-4">
        {children}
      </main>

      {/* VacationPicker Modal */}
      {isSelectingVacation && (
        <VacationPicker
          personId={isSelectingVacation.personId}
          holidays={isSelectingVacation.personId === 1 ? person1Holidays : (person2Holidays || [])}
          bridgeDays={isSelectingVacation.personId === 1 ? person1BridgeDays : (person2BridgeDays || [])}
          onSubmit={handleVacationSelect}
          onClose={() => setIsSelectingVacation(null)}
          existingVacations={isSelectingVacation.personId === 1 ? persons.person1.vacationPlans : (persons.person2?.vacationPlans || [])}
        />
      )}

      <animated.div
        ref={legendSheetRef}
        {...bindLegend()}
        className="md:hidden bg-white shadow-lg rounded-t-xl"
        style={{
          position: 'fixed',
          bottom: -300,
          left: 0,
          right: 0,
          height: 300,
          zIndex: 40
        }}
        data-testid="animated-div"
        id="legend-handle"
      >
        <div className="h-1.5 w-12 bg-gray-300 rounded-full mx-auto my-2" />
        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100%-20px)]">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Person 1 - {persons.person1.selectedState}</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 border border-gray-200 rounded" />
                <span>Feiertage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-400 border border-gray-200 rounded" />
                <span>Brückentage</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-500 border border-gray-200 rounded" />
                <span>Schulferien</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 border border-gray-200 rounded" />
                <span>Urlaub</span>
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

interface CalendarProps {
  isSelectingVacation?: boolean;
  onVacationSelect?: (start: Date, end: Date) => void;
  personId?: 1 | 2;
}

export default MainLayout; 