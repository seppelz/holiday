import React from 'react';
import { format, isWeekend, isSameDay, isWithinInterval, isBefore, startOfDay } from 'date-fns';
import { de } from 'date-fns/locale';
import { Holiday } from '../../types/holiday';

interface DateRange {
  start: Date;
  end: Date;
}

interface CalendarGridProps {
  month: Date;
  startDate: Date | null;
  endDate: Date | null;
  onDateSelect: (date: Date) => void;
  holidays: Holiday[];
  bridgeDays: Date[];
  disabledDates?: DateRange[];
  tabIndex?: number;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  month,
  startDate,
  endDate,
  onDateSelect,
  holidays,
  bridgeDays,
  disabledDates = [],
  tabIndex = 0
}) => {
  const today = startOfDay(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const days = [];
    while (firstDay.getMonth() === month) {
      days.push(new Date(firstDay));
      firstDay.setDate(firstDay.getDate() + 1);
    }
    return days;
  };

  const isDateDisabled = (date: Date) => {
    if (isBefore(date, today)) return true;
    
    return disabledDates.some(range => 
      isWithinInterval(date, { start: range.start, end: range.end })
    );
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return isWithinInterval(date, { 
      start: startDate < endDate ? startDate : endDate,
      end: startDate < endDate ? endDate : startDate
    });
  };

  const getDayClasses = (date: Date) => {
    const baseClasses = 'w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all';
    const classes = [baseClasses];

    const isDisabled = isDateDisabled(date);
    const isStart = startDate && isSameDay(date, startDate);
    const isEnd = endDate && isSameDay(date, endDate);
    const isInRange = isDateInRange(date);
    const isHoliday = holidays.some(h => isSameDay(new Date(h.date), date));
    const isBridgeDay = bridgeDays.some(d => isSameDay(date, d));
    const isWeekendDay = isWeekend(date);
    const isBooked = disabledDates.some(range => 
      isWithinInterval(date, { start: range.start, end: range.end })
    );

    if (isDisabled) {
      classes.push('text-gray-300 cursor-not-allowed');
      if (isBooked) {
        classes.push('bg-gray-200');
      }
    } else {
      classes.push('cursor-pointer hover:bg-gray-100');
      if (isStart || isEnd) {
        classes.push('bg-emerald-500 text-white');
      } else if (isInRange) {
        classes.push('bg-emerald-100');
      } else if (isHoliday) {
        classes.push('bg-red-100');
      } else if (isBridgeDay) {
        classes.push('bg-orange-100');
      } else if (isWeekendDay) {
        classes.push('text-gray-500');
      }
    }

    return classes.join(' ');
  };

  const days = getDaysInMonth(month);
  const firstDayOffset = days[0].getDay() || 7; // Convert Sunday (0) to 7

  return (
    <div>
      <div className="text-sm font-medium text-gray-900 mb-2 text-center">
        {format(month, 'MMMM yyyy', { locale: de })}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {/* Weekday headers */}
        {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
          <div key={day} className="text-xs font-medium text-gray-500 h-8 flex items-center justify-center">
            {day}
          </div>
        ))}

        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDayOffset - 1 }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Calendar days */}
        {days.map((date) => (
          <div
            key={date.getTime()}
            className={getDayClasses(date)}
            onClick={() => !isDateDisabled(date) && onDateSelect(date)}
            role="button"
            tabIndex={isDateDisabled(date) ? -1 : tabIndex}
            aria-label={format(date, 'd. MMMM yyyy', { locale: de })}
            aria-disabled={isDateDisabled(date)}
          >
            {format(date, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid; 