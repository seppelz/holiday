import React, { useEffect, useState } from 'react'
import { usePersonContext } from '../../contexts/PersonContext'
import { GermanState, stateNames } from '../../types/GermanState'

export const PersonManager: React.FC = () => {
  const { 
    persons, 
    updatePerson, 
    clearPersons,
    isLoading,
    error 
  } = usePersonContext();

  const addPerson2 = async () => {
    try {
      await updatePerson(2, {
        id: 2,
        selectedState: GermanState.BE,
        availableVacationDays: 30,
        vacationPlans: []
      });
    } catch (error) {
      console.error('Failed to add Person 2:', error);
    }
  };

  const removePerson2 = async () => {
    try {
      await updatePerson(2, null as any);
    } catch (error) {
      console.error('Failed to remove Person 2:', error);
    }
  };

  const updateVacationDays = async (personId: 1 | 2, days: number) => {
    try {
      await updatePerson(personId, { availableVacationDays: days });
    } catch (error) {
      console.error('Failed to update vacation days:', error);
    }
  };

  const updateState = async (personId: 1 | 2, state: GermanState) => {
    try {
      await updatePerson(personId, { selectedState: state });
    } catch (error) {
      console.error('Failed to update state:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div 
          className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
          data-testid="loading-spinner"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-medium">Fehler beim Laden der Daten</h3>
        <p className="text-red-600 text-sm mt-1">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 text-sm text-red-600 hover:text-red-800 border border-red-600 hover:border-red-800 rounded"
        >
          Neu laden
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={async () => {
            try {
              await clearPersons();
              window.location.reload();
            } catch (error) {
              console.error('Failed to clear persons:', error);
            }
          }}
          className="px-4 py-2 text-sm text-red-600 hover:text-red-800 border border-red-600 hover:border-red-800 rounded"
        >
          Alle Daten zurücksetzen
        </button>
      </div>
      {/* Person 1 */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Person 1</h3>
        <div className="space-y-2">
          <div>
            <label 
              htmlFor="person1-state"
              className="block text-sm font-medium text-gray-700"
            >
              Bundesland
            </label>
            <select
              id="person1-state"
              value={persons.person1.selectedState}
              onChange={(e) => updateState(1, e.target.value as GermanState)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              {Object.values(GermanState).map((state: GermanState) => (
                <option key={state} value={state}>{stateNames[state]}</option>
              ))}
            </select>
          </div>
          <div>
            <label 
              htmlFor="person1-vacation"
              className="block text-sm font-medium text-gray-700"
            >
              Urlaubstage
            </label>
            <input
              id="person1-vacation"
              type="number"
              value={persons.person1.availableVacationDays}
              onChange={(e) => updateVacationDays(1, parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Person 2 */}
      {persons.person2 ? (
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Person 2</h3>
            <button
              onClick={removePerson2}
              className="text-red-600 hover:text-red-800"
            >
              Entfernen
            </button>
          </div>
          <div className="space-y-2">
            <div>
              <label 
                htmlFor="person2-state"
                className="block text-sm font-medium text-gray-700"
              >
                Bundesland
              </label>
              <select
                id="person2-state"
                value={persons.person2.selectedState}
                onChange={(e) => updateState(2, e.target.value as GermanState)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                {Object.values(GermanState).map((state: GermanState) => (
                  <option key={state} value={state}>{stateNames[state]}</option>
                ))}
              </select>
            </div>
            <div>
              <label 
                htmlFor="person2-vacation"
                className="block text-sm font-medium text-gray-700"
              >
                Urlaubstage
              </label>
              <input
                id="person2-vacation"
                type="number"
                value={persons.person2.availableVacationDays}
                onChange={(e) => updateVacationDays(2, parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={addPerson2}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
        >
          Person 2 hinzufügen
        </button>
      )}
    </div>
  )
} 