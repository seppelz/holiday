import React, { useEffect, useState } from 'react'
import { usePersonStorage } from '../../hooks/usePersonStorage'
import { PersonInfo } from '../../types/person'
import { GermanState, stateNames } from '../../types/GermanState'

export const PersonManager: React.FC = () => {
  const { savePersons, loadPersons } = usePersonStorage()
  const [persons, setPersons] = useState<PersonInfo>({
    person1: {
      id: 1,
      selectedState: GermanState.BE,
      availableVacationDays: 30,
      vacationPlans: []
    },
    person2: null
  })

  // Lade gespeicherte Daten beim Start
  useEffect(() => {
    const savedPersons = loadPersons()
    if (savedPersons) {
      setPersons(savedPersons)
    }
  }, [])

  // Speichere Änderungen automatisch
  useEffect(() => {
    savePersons(persons)
  }, [persons])

  const addPerson2 = () => {
    setPersons(prev => ({
      ...prev,
      person2: {
        id: 2,
        selectedState: GermanState.BE,
        availableVacationDays: 30,
        vacationPlans: []
      }
    }))
  }

  const removePerson2 = () => {
    setPersons(prev => ({
      ...prev,
      person2: null
    }))
  }

  const updateVacationDays = (personId: 1 | 2, days: number) => {
    setPersons(prev => {
      if (personId === 1) {
        return {
          ...prev,
          person1: {
            ...prev.person1,
            availableVacationDays: days
          }
        }
      } else if (prev.person2) {
        return {
          ...prev,
          person2: {
            ...prev.person2,
            availableVacationDays: days
          }
        }
      }
      return prev
    })
  }

  const updateState = (personId: 1 | 2, state: GermanState) => {
    setPersons(prev => {
      if (personId === 1) {
        return {
          ...prev,
          person1: {
            ...prev.person1,
            selectedState: state
          }
        }
      } else if (prev.person2) {
        return {
          ...prev,
          person2: {
            ...prev.person2,
            selectedState: state
          }
        }
      }
      return prev
    })
  }

  return (
    <div className="space-y-4">
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
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800"
        >
          Person 2 hinzufügen
        </button>
      )}
    </div>
  )
} 