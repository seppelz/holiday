import React from 'react';
import { render, screen } from '@testing-library/react';
import { MainLayout } from './MainLayout';
import { PersonContext } from '../contexts/PersonContext';
import { GermanState } from '../types/GermanState';

describe('MainLayout E2E', () => {
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

  it('renders full application layout', () => {
    render(
      <PersonContext.Provider value={mockPersonContext}>
        <MainLayout />
      </PersonContext.Provider>
    );

    // Test for key elements in the layout
    expect(screen.getByText('Urlaub')).toBeInTheDocument();
    expect(screen.getByText('Person 2')).toBeInTheDocument();
    expect(screen.getByText('Export')).toBeInTheDocument();
    expect(screen.getByText('Tutorial')).toBeInTheDocument();
  });

  // Add more E2E tests as needed
});