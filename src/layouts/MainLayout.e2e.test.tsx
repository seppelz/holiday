import React from 'react';
import { render, screen } from '@testing-library/react';
import { MainLayout } from './MainLayout';
import { PersonContext } from '../contexts/PersonContext';

describe('MainLayout E2E', () => {
  const mockPersonContext = {
    persons: {
      person1: {
        id: 1,
        selectedState: 'BE',
        availableVacationDays: 30,
        vacationPlans: []
      },
      person2: null
    },
    updatePerson: jest.fn(),
    addVacationPlan: jest.fn(),
    updateVacationPlan: jest.fn(),
    removeVacationPlan: jest.fn(),
    deleteVacationPlan: jest.fn(),
    clearPersons: jest.fn()
  };

  const defaultProps = {
    children: <div>Test Content</div>
  };

  it('renders full application layout', () => {
    render(
      <PersonContext.Provider value={mockPersonContext}>
        <MainLayout {...defaultProps}>
          <div>Main Content Area</div>
        </MainLayout>
      </PersonContext.Provider>
    );

    expect(screen.getByText('Main Content Area')).toBeInTheDocument();
  });

  // Add more E2E tests as needed
});