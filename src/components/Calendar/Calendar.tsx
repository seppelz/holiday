import React, { useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { DesktopCalendar } from '../Desktop/Calendar/DesktopCalendar';
import { MobileCalendar } from '../Mobile/Calendar/MobileCalendar';
import { BaseCalendarProps } from '../Shared/Calendar/BaseCalendar';
import { GermanState } from '../../types/GermanState';
import { Holiday } from '../../types/holiday';
import { VacationPlan } from '../../types/vacationPlan';
import { differenceInDays, isWithinInterval } from 'date-fns';

interface CalendarProps {
  state: GermanState;
  secondState: GermanState | null;
  holidays: Holiday[];
  secondStateHolidays: Holiday[];
  bridgeDays: Date[];
  secondStateBridgeDays: Date[];
  vacationPlans: VacationPlan[];
  secondStateVacationPlans: VacationPlan[];
  onVacationSelect?: (start: Date, end: Date) => void;
  onAddVacation?: (plan: Omit<VacationPlan, 'id' | 'personId'>) => void;
  onDeleteVacation?: (personId: 1 | 2, index: number) => void;
  vacationCount?: { person1: number; person2: number };
  personId?: 1 | 2;
  isSelectingVacation?: boolean;
  onVacationSelectComplete?: () => void;
}

export const Calendar: React.FC<CalendarProps> = (props) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [currentMonth] = useState<Date>(new Date(2025, 0, 1));
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  // Function to check if a date has matching vacations
  const getDateVacationInfo = (date: Date) => {
    const person1Vacation = props.vacationPlans.some(vp => 
      vp.isVisible && isWithinInterval(date, { start: vp.start, end: vp.end })
    );
    const person2Vacation = props.secondStateVacationPlans.some(vp => 
      vp.isVisible && isWithinInterval(date, { start: vp.start, end: vp.end })
    );
    
    return {
      person1Vacation,
      person2Vacation,
      isSharedVacation: person1Vacation && person2Vacation
    };
  };

  const handleDateSelect = (date: Date) => {
    if (!props.isSelectingVacation) return;

    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else {
      const start = selectedStartDate < date ? selectedStartDate : date;
      const end = selectedStartDate < date ? date : selectedStartDate;
      setSelectedEndDate(date);

      if (props.onAddVacation) {
        const days = differenceInDays(end, start) + 1;
        if (days > 0) {
          props.onAddVacation({
            start,
            end,
            isVisible: true
          });
        }
      } else if (props.onVacationSelect) {
        props.onVacationSelect(start, end);
      }

      setTimeout(() => {
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        if (props.onVacationSelectComplete) {
          props.onVacationSelectComplete();
        }
      }, 500);
    }
  };

  const baseCalendarProps: BaseCalendarProps = {
    month: currentMonth,
    startDate: selectedStartDate,
    endDate: selectedEndDate,
    onDateSelect: handleDateSelect,
    holidays: props.holidays,
    secondStateHolidays: props.secondStateHolidays,
    bridgeDays: props.bridgeDays,
    secondStateBridgeDays: props.secondStateBridgeDays,
    getDateVacationInfo,
    activePersonId: props.personId,
    tabIndex: 0,
    isSelectingVacation: props.isSelectingVacation,
    onDeleteVacation: props.onDeleteVacation,
    vacationCount: props.vacationCount
  };

  return isMobile ? (
    <MobileCalendar {...baseCalendarProps} />
  ) : (
    <DesktopCalendar {...baseCalendarProps} />
  );
};

export default Calendar; 