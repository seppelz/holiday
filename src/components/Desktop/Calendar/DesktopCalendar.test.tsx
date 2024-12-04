import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { DesktopCalendar } from './DesktopCalendar';
import { addDays, startOfMonth } from 'date-fns';

describe('DesktopCalendar', () => {
  const defaultProps = {
    month: new Date(2025, 0, 1), // January 2025
    startDate: null,
    endDate: null,
    onDateSelect: jest.fn(),
    holidays: [],
    bridgeDays: [],
    disabledDates: [],
    tabIndex: 0,
    isSelectingVacation: false
  };

  const getDateCell = (day: number) => {
    const cells = screen.getAllByRole('button');
    return cells.find(cell => {
      const label = cell.getAttribute('aria-label');
      return label === `${day}. Januar 2025`;
    });
  };

  it('should allow date selection when isSelectingVacation is true', () => {
    const onDateSelect = jest.fn();
    const startDate = startOfMonth(new Date(2025, 0, 1)); // Jan 1, 2025
    const endDate = addDays(startDate, 5); // Jan 6, 2025

    render(
      <DesktopCalendar
        {...defaultProps}
        isSelectingVacation={true}
        onDateSelect={onDateSelect}
      />
    );

    // Find and click on Jan 1, 2025
    const startDateCell = getDateCell(1);
    expect(startDateCell).toBeTruthy();
    fireEvent.click(startDateCell!);
    expect(onDateSelect).toHaveBeenCalledWith(startDate);

    // Find and click on Jan 6, 2025
    const endDateCell = getDateCell(6);
    expect(endDateCell).toBeTruthy();
    fireEvent.click(endDateCell!);
    expect(onDateSelect).toHaveBeenCalledWith(endDate);
  });

  it('should not allow date selection when isSelectingVacation is false', () => {
    const onDateSelect = jest.fn();

    render(
      <DesktopCalendar
        {...defaultProps}
        isSelectingVacation={false}
        onDateSelect={onDateSelect}
      />
    );

    // Try to click on Jan 1, 2025
    const dateCell = getDateCell(1);
    expect(dateCell).toBeTruthy();
    fireEvent.click(dateCell!);
    expect(onDateSelect).not.toHaveBeenCalled();
  });

  it('should show hover state when hovering over dates during selection', () => {
    render(
      <DesktopCalendar
        {...defaultProps}
        isSelectingVacation={true}
      />
    );

    const dateCell = getDateCell(1);
    expect(dateCell).toBeTruthy();
    fireEvent.mouseEnter(dateCell!);

    // Check if the date cell has the hover class
    expect(dateCell!.className).toContain('bg-gray-100');
  });

  it('should show selection range when start date is selected', () => {
    const startDate = startOfMonth(new Date(2025, 0, 1)); // Jan 1, 2025

    render(
      <DesktopCalendar
        {...defaultProps}
        isSelectingVacation={true}
        startDate={startDate}
      />
    );

    // Check if start date has the selected class
    const startDateCell = getDateCell(1);
    expect(startDateCell).toBeTruthy();
    expect(startDateCell!.className).toContain('bg-emerald-500');
  });

  it('should handle date range selection correctly', () => {
    const onDateSelect = jest.fn();
    const startDate = startOfMonth(new Date(2025, 0, 1)); // Jan 1, 2025
    const endDate = addDays(startDate, 5); // Jan 6, 2025
    
    render(
      <DesktopCalendar
        {...defaultProps}
        isSelectingVacation={true}
        onDateSelect={onDateSelect}
        startDate={startDate}
        endDate={endDate}
      />
    );

    // Verify that dates in between have the range class
    const middleDate = getDateCell(3);
    expect(middleDate).toBeTruthy();
    expect(middleDate!.className).toContain('bg-emerald-100');

    // Start a new selection
    const newStartDateCell = getDateCell(10);
    expect(newStartDateCell).toBeTruthy();
    fireEvent.click(newStartDateCell!);
    expect(onDateSelect).toHaveBeenCalledWith(addDays(startDate, 9));
  });

  it('should handle selecting end date before start date', () => {
    const onDateSelect = jest.fn();
    const startDate = addDays(startOfMonth(new Date(2025, 0, 1)), 5); // Jan 6, 2025
    
    render(
      <DesktopCalendar
        {...defaultProps}
        isSelectingVacation={true}
        onDateSelect={onDateSelect}
        startDate={startDate}
      />
    );

    // Click on Jan 1, 2025 which is before the start date
    const newStartDateCell = getDateCell(1);
    expect(newStartDateCell).toBeTruthy();
    fireEvent.click(newStartDateCell!);
    expect(onDateSelect).toHaveBeenCalledWith(startOfMonth(new Date(2025, 0, 1)));
  });
}); 