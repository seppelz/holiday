import React from 'react';
import { render, screen } from '@testing-library/react';
import { VacationList } from './VacationList';
import { VacationPlan } from '../types/vacationPlan';
import { Holiday } from '../types/holiday';
import { GermanState } from '../types/germanState';

describe('VacationList', () => {
  const state: GermanState = 'BE';
  const mockVacations: VacationPlan[] = [];

  describe('Christmas 2025', () => {
    const christmasHolidays: Holiday[] = [
      {
        date: new Date('2025-12-25'), // Thursday
        name: '1. Weihnachtstag',
        type: 'public',
        state
      },
      {
        date: new Date('2025-12-26'), // Friday
        name: '2. Weihnachtstag',
        type: 'public',
        state
      }
    ];

    it('should show full Christmas period including weekend', () => {
      render(
        <VacationList
          vacations={mockVacations}
          holidays={christmasHolidays}
          onToggleVisibility={() => {}}
          onRemove={() => {}}
          onAddVacation={() => {}}
          state={state}
        />
      );

      // Should show Dec 24-28 (Wed-Sun) as one period
      expect(screen.getByText(/24\.12\. - 28\.12\.25/)).toBeInTheDocument();
      // Should show 5 days off for 1 vacation day
      const recommendation = screen.getByText(/24\.12\. - 28\.12\.25/);
      expect(recommendation.parentElement?.textContent).toMatch(/1d = 5d/);
    });
  });

  describe('Easter 2025', () => {
    const easterHolidays: Holiday[] = [
      {
        date: new Date('2025-04-18'), // Friday (Karfreitag)
        name: 'Karfreitag',
        type: 'public',
        state
      },
      {
        date: new Date('2025-04-21'), // Monday (Ostermontag)
        name: 'Ostermontag',
        type: 'public',
        state
      }
    ];

    it('should show full Easter period with connected days', () => {
      render(
        <VacationList
          vacations={mockVacations}
          holidays={easterHolidays}
          onToggleVisibility={() => {}}
          onRemove={() => {}}
          onAddVacation={() => {}}
          state={state}
        />
      );

      // Should show Apr 17-21 (Thu-Mon)
      expect(screen.getByText(/17\.4\. - 21\.4\.25/)).toBeInTheDocument();
      // Should show 5 days off for 1 vacation day
      const recommendation = screen.getByText(/17\.4\. - 21\.4\.25/);
      expect(recommendation.parentElement?.textContent).toMatch(/1d = 5d/);
    });
  });

  describe('Tag der Deutschen Einheit 2025', () => {
    const octoberHolidays: Holiday[] = [
      {
        date: new Date('2025-10-03'), // Friday
        name: 'Tag der Deutschen Einheit',
        type: 'public',
        state
      }
    ];

    it('should show period including weekend', () => {
      render(
        <VacationList
          vacations={mockVacations}
          holidays={octoberHolidays}
          onToggleVisibility={() => {}}
          onRemove={() => {}}
          onAddVacation={() => {}}
          state={state}
        />
      );

      // Should show Oct 2-5 (Thu-Sun)
      expect(screen.getByText(/2\.10\. - 5\.10\.25/)).toBeInTheDocument();
      // Should show 4 days off for 1 vacation day
      const recommendation = screen.getByText(/2\.10\. - 5\.10\.25/);
      expect(recommendation.parentElement?.textContent).toMatch(/1d = 4d/);
    });
  });

  describe('Multiple day opportunities', () => {
    const holidays: Holiday[] = [
      {
        date: new Date('2025-05-29'), // Thursday (Christi Himmelfahrt)
        name: 'Christi Himmelfahrt',
        type: 'public',
        state
      }
    ];

    it('should show both single and multi-day options', () => {
      render(
        <VacationList
          vacations={mockVacations}
          holidays={holidays}
          onToggleVisibility={() => {}}
          onRemove={() => {}}
          onAddVacation={() => {}}
          state={state}
        />
      );

      // Should show May 30 (1 day) and May 26-30 (whole week) options
      const recommendations = screen.getAllByRole('button');
      expect(recommendations).toHaveLength(2);
      
      // Single day option (Friday)
      expect(screen.getByText(/30\.5\. - 1\.6\.25/)).toBeInTheDocument(); // Fri-Sun
      
      // Multi-day option (Mon-Fri)
      expect(screen.getByText(/26\.5\. - 1\.6\.25/)).toBeInTheDocument();
    });
  });
}); 