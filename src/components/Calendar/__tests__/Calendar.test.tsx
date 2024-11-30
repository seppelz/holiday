import React from 'react';
import { render, screen } from '@testing-library/react';
import Calendar from '../Calendar';
import { GermanState } from '../../../types/germanState';
import { PersonContext } from '../../../layouts/MainLayout';
import { VacationPlan } from '../../../types/vacationPlan';

describe('Calendar', () => {
  const mockHolidays = [
    {
      date: new Date('2025-01-01'),
      name: 'Neujahr',
      type: 'public' as const,
      state: GermanState.BE
    }
  ];

  const mockBridgeDays = [new Date('2025-05-02')];

  const mockVacationPlans: VacationPlan[] = [
    {
      id: '1',
      personId: 1 as const,
      start: new Date('2025-07-01'),
      end: new Date('2025-07-14'),
      isVisible: true
    }
  ];

  const mockPersonContext = {
    persons: {
      person1: {
        id: 1 as const,
        selectedState: GermanState.BE,
        availableVacationDays: 30,
        vacationPlans: mockVacationPlans
      },
      person2: null
    },
    updatePerson: jest.fn(),
    addVacationPlan: jest.fn(),
    updateVacationPlan: jest.fn(),
    removeVacationPlan: jest.fn()
  };

  it('renders without crashing', () => {
    render(
      <PersonContext.Provider value={mockPersonContext}>
        <Calendar
          state={GermanState.BE}
          holidays={mockHolidays}
          bridgeDays={mockBridgeDays}
          vacationPlans={mockVacationPlans}
          secondStateVacationPlans={[]}
        />
      </PersonContext.Provider>
    );
  });

  it('displays holidays correctly', () => {
    render(
      <PersonContext.Provider value={mockPersonContext}>
        <Calendar
          state={GermanState.BE}
          holidays={mockHolidays}
          bridgeDays={mockBridgeDays}
          vacationPlans={mockVacationPlans}
          secondStateVacationPlans={[]}
        />
      </PersonContext.Provider>
    );

    const day = screen.getByText('1');
    expect(day.parentElement).toHaveClass('bg-red-200');
  });
}); 