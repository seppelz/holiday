import React from 'react';
import { render, screen } from '@testing-library/react';
import { MainLayout } from './MainLayout';
import { PersonContext } from '../contexts/PersonContext';
import { GermanState } from '../types/GermanState';

describe('MainLayout', () => {
  const mockPersonContext = {
    persons: {
      person1: {
        id: 1 as 1,
        selectedState: GermanState.BE,
        availableVacationDays: 30,
        vacationPlans: []
      },
      person2: null
    },
    isLoading: false,
    error: null,
    updatePerson: jest.fn(),
    addVacationPlan: jest.fn(),
    updateVacationPlan: jest.fn(),
    removeVacationPlan: jest.fn(),
    deleteVacationPlan: jest.fn(),
    clearPersons: jest.fn()
  };

  it('renders without crashing', () => {
    render(
      <PersonContext.Provider value={mockPersonContext}>
        <MainLayout />
      </PersonContext.Provider>
    );
    // Test for something that should be in the layout, like the header
    expect(screen.getByText('Urlaub')).toBeInTheDocument();
  });

  // Add more tests as needed
}); 