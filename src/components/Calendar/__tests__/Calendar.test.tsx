import React from 'react';
import { render } from '@testing-library/react';
import { Calendar } from '../Calendar';
import { PersonContext } from '../../../contexts/PersonContext';
import { GermanState } from '../../../types/GermanState';
import { BridgeDay, Holiday } from '../../../types/holiday';

describe('Calendar', () => {
  const mockBridgeDays: BridgeDay[] = [{
    name: 'Bridge day test',
    date: new Date('2025-05-02'),
    type: 'bridge',
    state: GermanState.BE,
    connectedHolidays: [],
    requiredVacationDays: 1,
    totalDaysOff: 4,
    efficiency: 4,
    pattern: '1d = 4d',
    periodStart: new Date('2025-05-01'),
    periodEnd: new Date('2025-05-04')
  }];

  const mockPersonContext = {
    persons: {
      person1: {
        id: 1 as const,
        selectedState: GermanState.BE,
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
    clearVacationPlans: jest.fn()
  };

  it('renders without crashing', () => {
    render(
      <PersonContext.Provider value={mockPersonContext}>
        <Calendar
          state={GermanState.BE}
          secondState={null}
          holidays={[]}
          secondStateHolidays={[]}
          bridgeDays={mockBridgeDays}
          secondStateBridgeDays={[]}
          vacationPlans={[]}
          secondStateVacationPlans={[]}
          onVacationSelect={() => {}}
        />
      </PersonContext.Provider>
    );
  });
}); 