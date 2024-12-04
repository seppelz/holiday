import React from 'react';
import { render, screen } from '@testing-library/react';
import { VacationList } from './VacationList';
import { VacationPlan } from '../types/vacationPlan';
import { Holiday } from '../types/holiday';
import { GermanState } from '../types/germanState';

describe('VacationList', () => {
  const state = 'BE' as GermanState;
  const mockVacations: VacationPlan[] = [];
  const mockHolidays: Holiday[] = [
    {
      date: new Date('2025-12-25'), // Christmas
      name: '1. Weihnachtstag',
      type: 'public',
      state
    },
    {
      date: new Date('2025-12-26'),
      name: '2. Weihnachtstag',
      type: 'public',
      state
    }
  ];
  const mockBridgeDays: Holiday[] = [
    {
      date: new Date('2025-12-24'),
      name: 'Bridge Day before Christmas',
      type: 'bridge',
      state
    }
  ];

  it('renders bridge day recommendations beyond June 2025', () => {
    render(
      <VacationList
        vacations={mockVacations}
        holidays={mockHolidays}
        bridgeDays={mockBridgeDays}
        onToggleVisibility={() => {}}
        onRemove={() => {}}
        onAddVacation={() => {}}
      />
    );

    // Check if December 2025 bridge day recommendation is shown
    expect(screen.getByText(/24\.12\. - 26\.12\.25/)).toBeInTheDocument();
  });

  it('correctly combines holidays and bridge days for recommendations', () => {
    const holidays: Holiday[] = [
      {
        date: new Date('2025-10-03'), // Tag der Deutschen Einheit
        name: 'Tag der Deutschen Einheit',
        type: 'public',
        state
      }
    ];
    const bridgeDays: Holiday[] = [
      {
        date: new Date('2025-10-02'),
        name: 'Bridge Day before Tag der Deutschen Einheit',
        type: 'bridge',
        state
      }
    ];

    render(
      <VacationList
        vacations={mockVacations}
        holidays={holidays}
        bridgeDays={bridgeDays}
        onToggleVisibility={() => {}}
        onRemove={() => {}}
        onAddVacation={() => {}}
      />
    );

    // Check if October 2025 bridge day recommendation is shown
    expect(screen.getByText(/2\.10\. - 3\.10\.25/)).toBeInTheDocument();
  });

  it('shows correct efficiency for bridge day recommendations', () => {
    render(
      <VacationList
        vacations={mockVacations}
        holidays={mockHolidays}
        bridgeDays={mockBridgeDays}
        onToggleVisibility={() => {}}
        onRemove={() => {}}
        onAddVacation={() => {}}
      />
    );

    // Christmas bridge day should show high efficiency (4 days off for 1 vacation day)
    const recommendation = screen.getByText(/24\.12\. - 26\.12\.25/);
    const efficiencyText = recommendation.parentElement?.textContent;
    expect(efficiencyText).toMatch(/\+300%/); // Expecting at least 300% efficiency
  });

  it('filters recommendations based on remaining vacation days', () => {
    render(
      <VacationList
        vacations={mockVacations}
        holidays={mockHolidays}
        bridgeDays={mockBridgeDays}
        onToggleVisibility={() => {}}
        onRemove={() => {}}
        onAddVacation={() => {}}
        availableVacationDays={1} // Only 1 day available
      />
    );

    // Should still show the Christmas recommendation as it only requires 1 day
    expect(screen.getByText(/24\.12\. - 26\.12\.25/)).toBeInTheDocument();
  });
}); 