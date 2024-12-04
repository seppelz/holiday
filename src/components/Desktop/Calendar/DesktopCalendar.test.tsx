import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DesktopCalendar } from './DesktopCalendar';

describe('DesktopCalendar', () => {
  const mockOnDateSelect = jest.fn();
  const defaultProps = {
    isSelectingVacation: true,
    onDateSelect: mockOnDateSelect,
    month: new Date('2025-01-01'),
    startDate: null,
    endDate: null,
    holidays: [],
    bridgeDays: [],
    disabledDates: [],
    tabIndex: 0,
    secondStateHolidays: [],
    secondStateBridgeDays: [],
    getDateVacationInfo: () => ({
      person1Vacation: false,
      person2Vacation: false,
      isSharedVacation: false
    }),
    state: 'BE' as const,
    secondState: null,
    onVacationSelectComplete: () => {},
    onDeleteVacation: () => {},
    vacationCount: { person1: 0, person2: 0 },
    onStartVacationSelect: () => {},
    recommendedDates: {
      person1: [],
      person2: []
    },
    activePersonId: 1,
    onShowRecommendations: () => {}
  };

  it('renders calendar with correct month', () => {
    render(<DesktopCalendar {...defaultProps} />);
    expect(screen.getByText('Januar 2025')).toBeInTheDocument();
  });

  it('handles date selection', () => {
    render(<DesktopCalendar {...defaultProps} />);
    const dateButton = screen.getByText('15');
    fireEvent.click(dateButton);
    expect(mockOnDateSelect).toHaveBeenCalled();
  });

  // Add more tests as needed, using defaultProps and overriding as necessary
}); 