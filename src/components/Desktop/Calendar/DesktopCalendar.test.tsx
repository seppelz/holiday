import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DesktopCalendar } from './DesktopCalendar';

describe('DesktopCalendar', () => {
  const mockOnDateSelect = jest.fn();
  const defaultProps = {
    isSelectingVacation: false,
    onDateSelect: mockOnDateSelect,
    month: new Date(),
    startDate: null,
    endDate: null,
    holidays: [],
    bridgeDays: [],
    disabledDates: [],
    tabIndex: 0,
    activePersonId: 1 as 1 | 2 | undefined,
    onShowRecommendations: () => {},
    secondStateHolidays: [],
    secondStateBridgeDays: [],
    getDateVacationInfo: () => ({
      person1Vacation: false,
      person2Vacation: false,
      isSharedVacation: false
    })
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