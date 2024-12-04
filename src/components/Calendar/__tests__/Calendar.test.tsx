import React from 'react';
import { render, screen } from '@testing-library/react';
import { Calendar } from '../Calendar';
import { PersonContext } from '../../../contexts/PersonContext';
import { GermanState } from '../../../types/germanState';
import { BridgeDay } from '../../../types/holiday';

describe('Calendar', () => {
  const mockPersonContext = {
    persons: {
      person1: {
        id: 1,
        selectedState: 'BE' as GermanState,
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

  const mockBridgeDays: BridgeDay[] = [
    {
      date: new Date('2025-05-02'),
      type: 'bridge',
      state: 'BE' as GermanState,
      connectedHolidays: [],
      requiredVacationDays: 1,
      totalDaysOff: 4,
      efficiency: 4,
      description: 'Bridge day test',
      isOptimal: true
    }
  ];

  it('renders calendar with correct state', () => {
    render(
      <PersonContext.Provider value={mockPersonContext}>
        <Calendar
          state={'BE' as GermanState}
          holidays={[]}
          bridgeDays={mockBridgeDays}
          onVacationSelect={() => {}}
        />
      </PersonContext.Provider>
    );

    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });

  // Add more tests as needed
}); 