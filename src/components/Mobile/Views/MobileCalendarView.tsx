import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MobileCalendar } from '../Calendar/MobileCalendar';
import { Holiday, BridgeDay } from '../../../types/holiday';
import { VacationPlan } from '../../../types/vacationPlan';
import { isWithinInterval, isSameDay, min, max, addDays, isBefore, differenceInDays } from 'date-fns';

interface MobileCalendarViewProps {
  holidays: Holiday[];
  bridgeDays: BridgeDay[];
  vacationPlans: VacationPlan[];
  onAddVacation: (start: Date, end: Date) => void;
  onRemoveVacation: (id: string) => void;
  personId: 1 | 2;
  otherPersonVacations: VacationPlan[];
  initialDate?: Date | null;
}

export const MobileCalendarView: React.FC<MobileCalendarViewProps> = ({
  holidays,
  bridgeDays,
  vacationPlans,
  onAddVacation,
  onRemoveVacation,
  personId,
  otherPersonVacations = [],
  initialDate = null
}) => {
  const [month, setMonth] = useState(() => initialDate || new Date(2025, 0, 1));
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Update month when initialDate changes
  useEffect(() => {
    if (initialDate) {
      setMonth(initialDate);
    }
  }, [initialDate]);

  // Memoize expensive date operations
  const isDateRangeFullyContained = useCallback((start: Date, end: Date) => {
    return vacationPlans.some(vacation =>
      vacation.isVisible && 
      isWithinInterval(start, { start: vacation.start, end: vacation.end }) &&
      isWithinInterval(end, { start: vacation.start, end: vacation.end })
    );
  }, [vacationPlans]);

  const findOverlappingVacations = useCallback((start: Date, end: Date) => {
    return vacationPlans.filter(vacation =>
      vacation.isVisible && (
        isWithinInterval(start, { start: vacation.start, end: vacation.end }) ||
        isWithinInterval(end, { start: vacation.start, end: vacation.end }) ||
        isWithinInterval(vacation.start, { start, end }) ||
        isWithinInterval(vacation.end, { start, end }) ||
        differenceInDays(vacation.start, end) <= 2 ||
        differenceInDays(start, vacation.end) <= 2
      )
    );
  }, [vacationPlans]);

  const getDateVacationInfo = useCallback((date: Date) => {
    const person1Vacation = personId === 1 && vacationPlans.some(vacation =>
      vacation.isVisible && isWithinInterval(date, { start: vacation.start, end: vacation.end })
    );
    const person2Vacation = personId === 2 && vacationPlans.some(vacation =>
      vacation.isVisible && isWithinInterval(date, { start: vacation.start, end: vacation.end })
    );
    const isSharedVacation = otherPersonVacations.some(otherVacation =>
      isWithinInterval(date, { start: otherVacation.start, end: otherVacation.end }) &&
      vacationPlans.some(vacation =>
        vacation.isVisible && isWithinInterval(date, { start: vacation.start, end: vacation.end })
      )
    );

    return {
      person1Vacation,
      person2Vacation,
      isSharedVacation
    };
  }, [personId, vacationPlans, otherPersonVacations]);

  const handleDateSelect = useCallback((date: Date) => {
    if (!startDate) {
      setStartDate(date);
      setFeedbackMessage(null);
    } else if (!endDate) {
      const start = isBefore(startDate, date) ? startDate : date;
      const end = isBefore(startDate, date) ? date : startDate;

      // Check if the selected range is fully contained in an existing vacation
      if (isDateRangeFullyContained(start, end)) {
        setFeedbackMessage('Urlaub bereits vorhanden');
        setStartDate(null);
        return;
      }

      // Find any overlapping or adjacent vacations
      const overlappingVacations = findOverlappingVacations(start, end);

      if (overlappingVacations.length > 0) {
        setFeedbackMessage('Urlaub wird zusammengeführt');
      }

      // Remove overlapping vacations
      overlappingVacations.forEach(vacation => {
        onRemoveVacation(vacation.id);
      });

      // Create the new vacation that includes all dates
      const allDates = [
        ...overlappingVacations.map(v => [v.start, v.end]).flat(),
        start,
        end
      ];
      const mergedStart = min(allDates);
      const mergedEnd = max(allDates);

      onAddVacation(mergedStart, mergedEnd);

      // Reset selection
      setStartDate(null);
      setEndDate(null);

      // Clear feedback message after a delay
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
    } else {
      setStartDate(date);
      setEndDate(null);
      setFeedbackMessage(null);
    }
  }, [startDate, endDate, isDateRangeFullyContained, findOverlappingVacations, onRemoveVacation, onAddVacation]);

  const handleMonthChange = useCallback((direction: 1 | -1) => {
    setMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
  }, []);

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="max-w-lg mx-auto p-4 flex flex-col h-full">
        <div className="flex-1 min-h-0 overflow-auto">
          <div className="max-h-[calc(100dvh-16rem)]">
            <MobileCalendar
              month={month}
              holidays={holidays}
              bridgeDays={bridgeDays}
              startDate={startDate}
              endDate={endDate}
              onDateSelect={handleDateSelect}
              disabledDates={[]}
              personId={personId}
              onMonthChange={handleMonthChange}
              isSelectingVacation={true}
              getDateVacationInfo={getDateVacationInfo}
              tabIndex={0}
              recommendedDates={{
                person1: [],
                person2: []
              }}
              vacationPlans={vacationPlans}
              initialDate={initialDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 