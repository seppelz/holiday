import React from 'react';
import { render, screen } from '@testing-library/react';
import Calendar from '../Calendar';
import { GermanState } from '../../../types/germanState';
import { StateContext } from '../../../layouts/MainLayout';

const mockStateContext = {
  selectedStates: {
    first: GermanState.BE,
    second: null
  },
  setSelectedStates: jest.fn(),
  stateInfo: {
    [GermanState.BE]: {
      availableVacationDays: 30,
      vacationPlans: []
    }
  },
  updateStateInfo: jest.fn()
};

describe('Calendar', () => {
  const mockHolidays = [
    {
      date: new Date('2024-05-01'),
      name: 'Tag der Arbeit',
      type: 'public' as const,
      state: GermanState.BE
    }
  ];

  const mockBridgeDays: Date[] = [];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <StateContext.Provider value={mockStateContext}>
        <Calendar
          state={GermanState.BE}
          holidays={mockHolidays}
          bridgeDays={mockBridgeDays}
        />
      </StateContext.Provider>
    );
  });

  it('displays holidays with correct styling', () => {
    render(
      <StateContext.Provider value={mockStateContext}>
        <Calendar
          state={GermanState.BE}
          holidays={mockHolidays}
          bridgeDays={mockBridgeDays}
        />
      </StateContext.Provider>
    );

    const day = screen.getByText('1');
    expect(day.parentElement).toHaveClass('bg-gradient-to-br');
  });
}); 