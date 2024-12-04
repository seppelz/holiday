import React from 'react';
import { format, isWeekend, isSameDay, isWithinInterval, isBefore, startOfDay } from 'date-fns';
import { de } from 'date-fns/locale';
import { BaseCalendarProps, useCalendar } from '../../Shared/Calendar/BaseCalendar';
import { holidayColors } from '../../../constants/colors';
import { Holiday } from '../../../types/holiday';

export const MobileCalendar: React.FC<BaseCalendarProps> = (props) => {
  const {
    state,
    handleDateHover,
    handleDateSelect,
    handleMouseLeave
  } = useCalendar(props);

  const today = startOfDay(new Date());

  const isDateDisabled = (date: Date) => {
    if (isBefore(date, today)) return true;
    
    return props.disabledDates?.some(range => 
      isWithinInterval(date, { start: range.start, end: range.end })
    );
  };

  const isDateInRange = (date: Date) => {
    if (!props.startDate || !props.endDate) return false;
    return isWithinInterval(date, { 
      start: props.startDate < props.endDate ? props.startDate : props.endDate,
      end: props.startDate < props.endDate ? props.endDate : props.startDate
    });
  };

  const getHolidayType = (date: Date): { type: Holiday['type'] | null; holiday: Holiday | null } => {
    // First check for bridge days as they should take precedence
    const isBridgeDay = props.bridgeDays.some(d => isSameDay(new Date(d), date));
    if (isBridgeDay) {
      return { type: 'bridge', holiday: null };
    }

    // Then check for holidays
    const holiday = props.holidays.find(h => {
      if (h.endDate) {
        return isWithinInterval(date, { 
          start: new Date(h.date), 
          end: new Date(h.endDate) 
        });
      }
      return isSameDay(new Date(h.date), date);
    });

    return holiday ? { type: holiday.type, holiday } : { type: null, holiday: null };
  };

  const getDateClasses = (date: Date) => {
    const isDisabled = isDateDisabled(date);
    const isSelected = isDateInRange(date);
    const { type } = getHolidayType(date);
    const isWeekendDay = isWeekend(date);

    const baseClasses = "flex items-center justify-center w-10 h-10 rounded-full text-sm transition-colors";
    const cursorClasses = props.isSelectingVacation && !isDisabled ? "cursor-pointer" : "cursor-default";
    
    if (isDisabled) {
      return `${baseClasses} text-gray-300 ${cursorClasses}`;
    }

    if (isSelected) {
      return `${baseClasses} bg-emerald-500 text-white hover:bg-emerald-600 ${cursorClasses}`;
    }

    if (type === 'public') {
      return `${baseClasses} ${holidayColors[props.personId === 1 ? 'person1' : 'person2'].holiday} ${cursorClasses}`;
    }

    if (type === 'bridge') {
      return `${baseClasses} ${holidayColors[props.personId === 1 ? 'person1' : 'person2'].bridge} ${cursorClasses}`;
    }

    if (type === 'regional') {
      return `${baseClasses} ${holidayColors[props.personId === 1 ? 'person1' : 'person2'].school} ${cursorClasses}`;
    }

    if (isWeekendDay) {
      return `${baseClasses} text-gray-500 hover:bg-gray-100 ${cursorClasses}`;
    }

    return `${baseClasses} text-gray-900 hover:bg-gray-100 ${cursorClasses}`;
  };

  // Generate calendar grid
  const weeks: Date[][] = [];
  const firstDay = new Date(props.month.getFullYear(), props.month.getMonth(), 1);
  const lastDay = new Date(props.month.getFullYear(), props.month.getMonth() + 1, 0);
  
  // Fill in days from previous month
  const firstDayOfWeek = firstDay.getDay();
  const prevMonthDays = [];
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(firstDay);
    date.setDate(date.getDate() - i);
    prevMonthDays.push(date);
  }
  
  // Fill in days of current month
  const currentMonthDays = [];
  for (let date = new Date(firstDay); date <= lastDay; date.setDate(date.getDate() + 1)) {
    currentMonthDays.push(new Date(date));
  }
  
  // Fill in days from next month
  const remainingDays = 7 - (currentMonthDays.length + prevMonthDays.length) % 7;
  const nextMonthDays = [];
  if (remainingDays < 7) {
    const lastDate = new Date(lastDay);
    for (let i = 1; i <= remainingDays; i++) {
      lastDate.setDate(lastDate.getDate() + 1);
      nextMonthDays.push(new Date(lastDate));
    }
  }
  
  // Combine all days
  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  
  // Split into weeks
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  return (
    <div className="select-none">
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-900">
          {format(props.month, 'MMMM yyyy', { locale: de })}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        {/* Weekday headers */}
        {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
          <div
            key={day}
            className="bg-white p-2 text-xs font-medium text-gray-500 text-center"
          >
            {day}
          </div>
        ))}
        
        {/* Calendar grid */}
        {weeks.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((date, dayIndex) => {
              const isDisabled = isDateDisabled(date);
              const { holiday } = getHolidayType(date);

              return (
                <div
                  key={dayIndex}
                  className="relative bg-white"
                  onMouseEnter={() => !isDisabled && handleDateHover(date)}
                  onClick={() => !isDisabled && handleDateSelect(date)}
                  tabIndex={props.tabIndex}
                  role="button"
                  aria-disabled={isDisabled}
                  title={holiday?.name}
                >
                  <div className={getDateClasses(date)}>
                    {format(date, 'd')}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}; 