import React, { createContext, useContext, useState } from 'react';
import { GermanState } from '../types/GermanState';
import { Person, PersonInfo } from '../types/person';
import { VacationPlan } from '../types/vacationPlan';
import { usePersonStorage } from '../hooks/usePersonStorage';

interface PersonContextType {
  persons: PersonInfo;
  updatePerson: (personId: 1 | 2, updates: Partial<Person>) => void;
  addVacationPlan: (personId: 1 | 2, plan: Omit<VacationPlan, 'id' | 'personId'>) => void;
  updateVacationPlan: (personId: 1 | 2, planId: string, updates: Partial<Omit<VacationPlan, 'id' | 'personId'>>) => void;
  deleteVacationPlan: (personId: 1 | 2, planId: string) => void;
}

export const PersonContext = createContext<PersonContextType | null>(null);

export const usePersonContext = () => {
  const context = useContext(PersonContext);
  if (!context) {
    throw new Error('usePersonContext must be used within a PersonProvider');
  }
  return context;
};

export const PersonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { savePersons, loadPersons } = usePersonStorage();
  const [persons, setPersons] = useState<PersonInfo>(() => {
    const savedPersons = loadPersons();
    return savedPersons || {
      person1: {
        id: 1,
        selectedState: GermanState.BE,
        availableVacationDays: 30,
        vacationPlans: []
      },
      person2: null
    };
  });

  const updatePerson = (personId: 1 | 2, updates: Partial<Person>) => {
    setPersons(prev => ({
      ...prev,
      [`person${personId}`]: {
        ...prev[`person${personId}`],
        ...updates
      } as Person
    }));
    savePersons(persons);
  };

  const addVacationPlan = (personId: 1 | 2, plan: Omit<VacationPlan, 'id' | 'personId'>) => {
    setPersons(prev => ({
      ...prev,
      [`person${personId}`]: {
        ...prev[`person${personId}`],
        vacationPlans: [
          ...(prev[`person${personId}`]?.vacationPlans || []),
          {
            ...plan,
            id: Math.random().toString(36).substr(2, 9),
            personId
          }
        ]
      } as Person
    }));
    savePersons(persons);
  };

  const updateVacationPlan = (
    personId: 1 | 2,
    planId: string,
    updates: Partial<Omit<VacationPlan, 'id' | 'personId'>>
  ) => {
    setPersons(prev => ({
      ...prev,
      [`person${personId}`]: {
        ...prev[`person${personId}`],
        vacationPlans: prev[`person${personId}`]?.vacationPlans.map(plan =>
          plan.id === planId ? { ...plan, ...updates } : plan
        )
      } as Person
    }));
    savePersons(persons);
  };

  const deleteVacationPlan = (personId: 1 | 2, planId: string) => {
    setPersons(prev => ({
      ...prev,
      [`person${personId}`]: {
        ...prev[`person${personId}`],
        vacationPlans: prev[`person${personId}`]?.vacationPlans.filter(plan => plan.id !== planId)
      } as Person
    }));
    savePersons(persons);
  };

  return (
    <PersonContext.Provider
      value={{
        persons,
        updatePerson,
        addVacationPlan,
        updateVacationPlan,
        deleteVacationPlan
      }}
    >
      {children}
    </PersonContext.Provider>
  );
}; 