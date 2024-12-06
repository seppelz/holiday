import React, { useState, useEffect, useMemo, useRef } from 'react';
import { usePersonContext } from '../contexts/PersonContext';
import { VacationList } from '../components/VacationList';
import { GermanState, stateNames } from '../types/GermanState';
import { VacationDaysInput } from '../components/VacationDaysInput';
import { HomePage } from '../pages/HomePage';
import { KeyboardShortcutsHelper } from '../components/KeyboardShortcutsHelper';
import { useBridgeDays } from '../hooks/useBridgeDays';
import { eachDayOfInterval, isSameDay, isWithinInterval, isWeekend, subDays, addDays, differenceInDays } from 'date-fns';
import { Holiday } from '../types/holiday';
import { VacationPlan } from '../types/vacationPlan';
import { VacationEfficiencyInsights } from '../components/VacationEfficiencyInsights';
import { AppWrapper } from '../components/AppWrapper';

const StateSelector: React.FC<{
  value: GermanState;
  onChange: (value: GermanState) => void;
  label: string;
  personId: 1 | 2;
  ref?: React.RefObject<HTMLSelectElement>;
}> = React.forwardRef(({ value, onChange, label, personId }, ref) => (
  <div className="flex items-center gap-2">
    <span className="text-sm font-medium text-gray-900">{label}</span>
    <select
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value as GermanState)}
      className={`px-2 py-1 bg-white/80 border-0 rounded-full text-sm text-gray-900
        shadow-sm hover:bg-white/90 transition-all cursor-pointer
        focus:ring-4 focus:ring-offset-2 focus:outline-none
        appearance-none bg-no-repeat bg-right pr-8 ${
          personId === 1 
            ? 'focus:ring-emerald-500/50' 
            : 'focus:ring-cyan-500/50'
        }`}
    >
      <option value="">Bundesland wählen</option>
      {Object.entries(GermanState).map(([key, value]) => (
        <option key={key} value={value}>{stateNames[value as GermanState]}</option>
      ))}
    </select>
  </div>
));

export const MainLayout: React.FC = () => {
  const [isSelectingVacation, setIsSelectingVacation] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState<1 | 2 | undefined>(undefined);
  const [showSecondPerson, setShowSecondPerson] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const { persons, updatePerson } = usePersonContext();
  
  // Add refs for focusing elements
  const person2StateRef = useRef<HTMLSelectElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const vacationListRef = useRef<HTMLDivElement>(null);

  // Move hook calls outside of conditional rendering
  const person1BridgeDays = useBridgeDays(persons.person1?.selectedState || null);
  const person2BridgeDays = useBridgeDays(persons.person2?.selectedState || null);

  // Add keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle shortcuts if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case '?':
          e.preventDefault();
          setShowKeyboardShortcuts(prev => !prev);
          break;
        case 'p':
          e.preventDefault();
          setShowSecondPerson(prev => {
            // Focus state selection after a short delay to allow for DOM update
            if (!prev) {
              setTimeout(() => {
                person2StateRef.current?.focus();
              }, 100);
            }
            return !prev;
          });
          break;
        case 'n':
          e.preventDefault();
          if (!isSelectingVacation) {
            setSelectedPersonId(1);
            setIsSelectingVacation(true);
            // Focus January 1st after a short delay
            setTimeout(() => {
              const jan1Button = calendarRef.current?.querySelector('[data-date="2025-01-01"]') as HTMLButtonElement;
              if (jan1Button) {
                jan1Button.focus();
              }
            }, 100);
          }
          break;
        case 'm':
          e.preventDefault();
          if (!isSelectingVacation) {
            setShowSecondPerson(true); // Ensure Person 2 is visible
            setSelectedPersonId(2);
            setIsSelectingVacation(true);
            // Focus January 1st after a short delay
            setTimeout(() => {
              const jan1Button = calendarRef.current?.querySelector('[data-date="2025-01-01"]') as HTMLButtonElement;
              if (jan1Button) {
                jan1Button.focus();
              }
            }, 100);
          }
          break;
        case 'q':
        case 'w':
          e.preventDefault();
          const personId = e.key === 'q' ? 1 : 2;
          if (personId === 2 && !showSecondPerson) {
            setShowSecondPerson(true);
          }
          // Focus the first recommendation in the vacation list
          setTimeout(() => {
            const sidebarSection = vacationListRef.current?.querySelector(`[data-person="${personId}"]`);
            const firstRecommendation = sidebarSection?.querySelector('.recommendation-item') as HTMLElement;
            if (firstRecommendation) {
              firstRecommendation.focus();
            }
          }, 100);
          break;
        case 'Escape':
          e.preventDefault();
          // Close keyboard shortcuts if open
          if (showKeyboardShortcuts) {
            setShowKeyboardShortcuts(false);
          }
          // Cancel vacation selection if active
          if (isSelectingVacation) {
            setIsSelectingVacation(false);
            setSelectedPersonId(undefined);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showKeyboardShortcuts, isSelectingVacation, selectedPersonId]);

  // Memoize holiday data to prevent unnecessary re-renders
  const holidayData = useMemo(() => {
    return {
      person1: {
        holidays: person1BridgeDays.holidays || [],
        bridgeDays: person1BridgeDays.bridgeDays || []
      },
      person2: {
        holidays: person2BridgeDays.holidays || [],
        bridgeDays: person2BridgeDays.bridgeDays || []
      }
    };
  }, [person1BridgeDays, person2BridgeDays]);

  const renderPersonConfig = (personId: 1 | 2) => {
    const person = personId === 1 ? persons.person1 : persons.person2;
    
    if (personId === 2 && !showSecondPerson) return null;

    return (
      <div className="flex items-center justify-between gap-4 p-2">
        {/* State Selection */}
        <div className="flex items-center gap-2">
          <StateSelector
            value={person?.selectedState || ''}
            onChange={(value) => updatePerson(personId, { selectedState: value })}
            label={`Person ${personId}`}
            personId={personId}
            ref={personId === 2 ? person2StateRef : undefined}
          />
        </div>

        {/* Vacation Days Input and Add Button */}
        {person?.selectedState && (
          <>
            <div className="flex items-center gap-4">
              <div className={`text-sm font-medium ${
                personId === 1 ? 'text-emerald-600' : 'text-cyan-600'
              }`}>
                <VacationDaysInput
                  value={person.availableVacationDays}
                  onChange={(days) => updatePerson(personId, { availableVacationDays: days })}
                  personId={personId}
                />
                Urlaubstage
              </div>
            </div>

            {/* Add Vacation Button */}
            <button
              onClick={() => {
                setSelectedPersonId(personId);
                setIsSelectingVacation(true);
                // Focus January 1st after a short delay when clicking the button
                setTimeout(() => {
                  const jan1Button = calendarRef.current?.querySelector('[data-date="2025-01-01"]') as HTMLButtonElement;
                  if (jan1Button) {
                    jan1Button.focus();
                  }
                }, 100);
              }}
              className={`px-3 py-1 text-sm font-medium text-white rounded-full transition-colors ${
                personId === 1
                  ? 'bg-emerald-500 hover:bg-emerald-600'
                  : 'bg-cyan-500 hover:bg-cyan-600'
              }`}
            >
              + Urlaub planen
            </button>
          </>
        )}
      </div>
    );
  };

  const handleStartVacationSelection = (personId: 1 | 2) => {
    if (personId === 2 && !showSecondPerson) {
      setShowSecondPerson(true);
      // If person2 doesn't exist yet, initialize it
      if (!persons.person2) {
        updatePerson(2, {
          selectedState: persons.person1.selectedState,
          availableVacationDays: 30,
          vacationPlans: []
        });
      }
    }
    setIsSelectingVacation(true);
    setSelectedPersonId(personId);
  };

  const handleVacationSelectComplete = () => {
    setIsSelectingVacation(false);
    setSelectedPersonId(undefined);
  };

  const toggleSecondPerson = () => {
    if (showSecondPerson) {
      updatePerson(2, { selectedState: undefined });
      setShowSecondPerson(false);
    } else {
      setShowSecondPerson(true);
      // If person2 doesn't exist yet, initialize it
      if (!persons.person2) {
        updatePerson(2, {
          selectedState: persons.person1.selectedState,
          availableVacationDays: 30,
          vacationPlans: []
        });
      }
    }
  };

  const renderLegend = (personId: 1 | 2) => {
    const colors = {
      holiday: personId === 1 ? '#EF4444' : '#A855F7',     // red-500 : purple-500
      bridge: personId === 1 ? '#FB923C' : '#EC4899',      // orange-400 : pink-400
      school: personId === 1 ? '#6366F1' : '#EAB308',      // indigo-500 : yellow-500
      vacation: personId === 1 ? '#22C55E' : '#3B82F6'     // green-500 : blue-500
    };

    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: colors.holiday }} />
          <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: colors.bridge }} />
          <span className="text-xs text-gray-600">Feiertage & Brücken</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: colors.school }} />
          <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: colors.vacation }} />
          <span className="text-xs text-gray-600">Schule & Urlaub</span>
        </div>
      </div>
    );
  };

  const renderSidebarContent = (personId: 1 | 2) => {
    const person = personId === 1 ? persons.person1 : persons.person2;
    const { holidays: sidebarHolidays, bridgeDays } = personId === 1 ? person1BridgeDays : person2BridgeDays;
    
    if (personId === 2 && !showSecondPerson) return null;

    const handleVacationAdd = (start: Date, end: Date) => {
      const person = personId === 2 ? persons.person2 : persons.person1;
      if (!person) return;

      const newVacation: VacationPlan = {
        id: Math.random().toString(36).substr(2, 9),
        start,
        end,
        isVisible: true,
        personId,
        state: person.selectedState
      };

      updatePerson(personId, {
        vacationPlans: [...(person.vacationPlans || []), newVacation]
      });
    };

    return (
      <div className="space-y-3" data-person={personId}>
        {/* Person Header with Legend */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="font-medium text-gray-900">{personId === 1 ? 'Ich' : 'Person 2'}</h3>
            {renderLegend(personId)}
          </div>
        </div>

        {/* Selection Info */}
        {isSelectingVacation && selectedPersonId === personId && (
          <div className={`${
            personId === 1 ? 'bg-green-50 text-green-800' : 'bg-blue-50 text-blue-800'
          } p-2 rounded-lg text-xs`}>
            Bitte wählen Sie das Startdatum Ihres Urlaubs
          </div>
        )}

        {/* Vacation List with Recommendations */}
        <div ref={vacationListRef} data-person={personId} className="focus-within:outline-none">
          <VacationList
            vacations={person?.vacationPlans || []}
            otherPersonVacations={personId === 1 ? persons.person2?.vacationPlans : persons.person1?.vacationPlans}
            holidays={[...(sidebarHolidays || []), ...(bridgeDays || [])]}
            bridgeDays={bridgeDays || []}
            onToggleVisibility={(id) => {
              const updatedPlans = person?.vacationPlans.map(plan =>
                plan.id === id ? { ...plan, isVisible: !plan.isVisible } : plan
              );
              if (updatedPlans) {
                updatePerson(personId, { vacationPlans: updatedPlans });
              }
            }}
            onRemove={(id) => {
              const updatedPlans = person?.vacationPlans.filter(plan => plan.id !== id);
              if (updatedPlans) {
                updatePerson(personId, { vacationPlans: updatedPlans });
              }
            }}
            personId={personId}
            availableVacationDays={person?.availableVacationDays || 30}
            onAddVacation={handleVacationAdd}
            state={person?.selectedState || ''}
          />
        </div>
      </div>
    );
  };

  return (
    <AppWrapper
      mobileProps={persons.person1?.selectedState ? {
        personId: selectedPersonId || 1,
        selectedState: persons.person1.selectedState,
        onStateChange: (value) => updatePerson(selectedPersonId || 1, { selectedState: value }),
        holidays: selectedPersonId === 2 ? holidayData.person2.holidays : holidayData.person1.holidays,
        bridgeDays: selectedPersonId === 2 ? holidayData.person2.bridgeDays : holidayData.person1.bridgeDays,
        vacationPlans: (selectedPersonId === 2 ? persons.person2?.vacationPlans : persons.person1.vacationPlans) || [],
        onAddVacation: (start: Date, end: Date) => {
          const person = selectedPersonId === 2 ? persons.person2 : persons.person1;
          if (!person) return;

          // Calculate vacation efficiency
          const allDays = eachDayOfInterval({ start, end });
          const requiredDays = allDays.reduce((count, d) => {
            if (isWeekend(d)) return count;
            const isPublicHoliday = holidayData[selectedPersonId === 2 ? 'person2' : 'person1'].holidays.some(h => 
              h.type === 'public' && isSameDay(new Date(h.date), d)
            );
            return isPublicHoliday ? count : count + 1;
          }, 0);

          // Calculate gained days including surrounding weekends/holidays
          let displayStart = start;
          let displayEnd = end;

          // Look backwards for connected free days
          let currentDay = subDays(start, 1);
          while (isWeekend(currentDay) || holidayData[selectedPersonId === 2 ? 'person2' : 'person1'].holidays.some(h => 
            h.type === 'public' && isSameDay(new Date(h.date), currentDay)
          )) {
            displayStart = currentDay;
            currentDay = subDays(currentDay, 1);
          }

          // Look forwards for connected free days
          currentDay = addDays(end, 1);
          while (isWeekend(currentDay) || holidayData[selectedPersonId === 2 ? 'person2' : 'person1'].holidays.some(h => 
            h.type === 'public' && isSameDay(new Date(h.date), currentDay)
          )) {
            displayEnd = currentDay;
            currentDay = addDays(currentDay, 1);
          }

          const gainedDays = differenceInDays(displayEnd, displayStart) + 1;

          const newVacation: VacationPlan = {
            id: Math.random().toString(36).substr(2, 9),
            start,
            end,
            isVisible: true,
            personId: selectedPersonId || 1,
            state: person.selectedState,
            efficiency: {
              requiredDays,
              gainedDays,
              score: gainedDays / requiredDays
            }
          };

          updatePerson(selectedPersonId || 1, {
            vacationPlans: [...(person.vacationPlans || []), newVacation]
          });
        },
        onRemoveVacation: (id) => {
          const person = selectedPersonId === 2 ? persons.person2 : persons.person1;
          const updatedPlans = person?.vacationPlans.filter(plan => plan.id !== id);
          if (updatedPlans) {
            updatePerson(selectedPersonId || 1, { vacationPlans: updatedPlans });
          }
        },
        onPersonSwitch: () => {
          setShowSecondPerson(true);
          const nextPersonId = selectedPersonId === 1 ? 2 : 1;
          setSelectedPersonId(nextPersonId);
          
          // Initialize person 2 if not already initialized
          if (nextPersonId === 2 && !persons.person2?.selectedState) {
            updatePerson(2, {
              selectedState: persons.person1.selectedState,
              availableVacationDays: 30,
              vacationPlans: []
            });
          }
        },
        availableVacationDays: selectedPersonId === 2 ? persons.person2?.availableVacationDays || 30 : persons.person1.availableVacationDays || 30,
        onAvailableDaysChange: (days: number) => {
          updatePerson(selectedPersonId || 1, { availableVacationDays: days });
        },
        otherPersonVacations: selectedPersonId === 2 ? persons.person1?.vacationPlans || [] : persons.person2?.vacationPlans || []
      } : undefined}
    >
      <div className="h-screen bg-gray-50 flex flex-col">
        <KeyboardShortcutsHelper
          isOpen={showKeyboardShortcuts}
          onClose={() => setShowKeyboardShortcuts(false)}
        />
        
        {/* Header */}
        <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b z-50">
          <div className="max-w-full mx-4 h-12 flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2 min-w-[80px]">
              <div className="w-7 h-7">
                <img src="/favicon.svg" alt="Logo" className="w-full h-full" />
              </div>
              <span className="text-lg font-medium text-gray-900">
                Urlaub {selectedPersonId === 2 ? "Person 2" : "Ich"}
              </span>
            </div>

            {/* Person 1 Config */}
            {renderPersonConfig(1)}

            {/* Year */}
            <div className="text-sm font-medium text-gray-600">2025</div>

            {/* Two Person Toggle */}
            <button
              onClick={toggleSecondPerson}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors border ${
                showSecondPerson
                  ? 'bg-blue-500 text-white hover:bg-blue-600 border-transparent'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
              }`}
              title={showSecondPerson ? "Zweite Person deaktivieren" : "Zweite Person aktivieren"}
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={showSecondPerson 
                      ? "M20 12H4" 
                      : "M12 4v16m8-8H4"} 
                  />
                </svg>
                <span>Person 2</span>
              </div>
            </button>

            {/* Person 2 Config */}
            {renderPersonConfig(2)}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 max-w-full mx-4 py-2 flex gap-4 min-h-0">
          {/* Left Sidebar */}
          <aside className="w-80 space-y-2">
            {renderSidebarContent(1)}
            {showSecondPerson && renderSidebarContent(2)}
          </aside>

          {/* Calendar */}
          <div ref={calendarRef} className="flex-1 overflow-auto">
            <HomePage
              isSelectingVacation={isSelectingVacation}
              selectedPersonId={selectedPersonId}
              onVacationSelectComplete={handleVacationSelectComplete}
            />
          </div>
        </main>
      </div>
    </AppWrapper>
  );
}; 