import React from 'react';
import { render, screen } from '@testing-library/react';
import { MainLayout } from './MainLayout';
import { PersonContext } from '../contexts/PersonContext';

describe('MainLayout', () => {
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

  it('renders without crashing', () => {
    render(
      <PersonContext.Provider value={mockPersonContext}>
        <MainLayout {...defaultProps} />
      </PersonContext.Provider>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  // Add more tests as needed
}); 