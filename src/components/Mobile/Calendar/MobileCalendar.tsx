import React from 'react';
import { format, isWeekend, isSameDay, isWithinInterval, isBefore, startOfDay, addMonths } from 'date-fns';
import { de } from 'date-fns/locale';
import { BaseCalendarProps, useCalendar } from '../../Shared/Calendar/BaseCalendar';
import { holidayColors } from '../../../constants/colors';
import { Holiday } from '../../../types/holiday';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

interface MobileCalendarProps extends BaseCalendarProps {
  personId: 1 | 2;
  onMonthChange?: (direction: 1 | -1) => void;
}

export const MobileCalendar: React.FC<MobileCalendarProps> = (props) => {
  const {
    state,
    handleDateHover,
    handleDateSelect,
    handleMouseLeave
  } = useCalendar(props);

  const today = startOfDay(new Date());

  // Animation for swipe gestures
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  // Handle month swipe
  const bind = useDrag(
    ({ movement: [mx], last, cancel, direction: [xDir] }) => {
      if (last) {
        if (Math.abs(mx) > 50) {
          props.onMonthChange?.(xDir > 0 ? -1 : 1);
          if (navigator.vibrate) {
            navigator.vibrate(10);
          }
        }
        api.start({ x: 0 });
      } else {
        api.start({ x: mx, immediate: true });
      }
    },
    { axis: 'x', bounds: { left: -100, right: 100 } }
  );

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
    const { type, holiday } = getHolidayType(date);
    const isWeekendDay = isWeekend(date);
    const isToday = isSameDay(date, today);

    const baseClasses = "flex flex-col items-center justify-center w-12 h-14 text-sm transition-colors touch-manipulation";
    const cursorClasses = props.isSelectingVacation && !isDisabled ? "cursor-pointer active:bg-gray-50" : "cursor-default";
    
    if (isDisabled) {
      return `${baseClasses} text-gray-300 ${cursorClasses}`;
    }

    if (isSelected) {
      const personColor = props.personId === 1 ? 'emerald' : 'cyan';
      return `${baseClasses} bg-${personColor}-500 text-white active:bg-${personColor}-600 ${cursorClasses}`;
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
      return `${baseClasses} text-gray-500 active:bg-gray-100 ${cursorClasses}`;
    }

    return `${baseClasses} text-gray-900 active:bg-gray-100 ${cursorClasses}`;
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
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4 px-4">
        <button
          onClick={() => props.onMonthChange?.(-1)}
          className="p-2 -ml-2 text-gray-600 active:bg-gray-100 rounded-full touch-manipulation"
          aria-label="Vorheriger Monat"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-lg font-medium text-gray-900">
          {format(props.month, 'MMMM yyyy', { locale: de })}
        </div>

        <button
          onClick={() => props.onMonthChange?.(1)}
          className="p-2 -mr-2 text-gray-600 active:bg-gray-100 rounded-full touch-manipulation"
          aria-label="Nächster Monat"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <animated.div
        {...bind()}
        style={{ x }}
        className="touch-pan-x"
      >
        <div className="grid grid-cols-7 bg-gray-100 rounded-lg overflow-hidden">
          {/* Weekday headers */}
          {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
            <div
              key={day}
              className="bg-white py-2 text-xs font-medium text-gray-500 text-center border-b"
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
                const isToday = isSameDay(date, today);

                return (
                  <div
                    key={dayIndex}
                    className="relative bg-white border-b border-r last:border-r-0"
                    onTouchStart={() => !isDisabled && handleDateHover(date)}
                    onClick={() => !isDisabled && handleDateSelect(date)}
                    role="button"
                    aria-disabled={isDisabled}
                    title={holiday?.name}
                  >
                    <div className={getDateClasses(date)}>
                      <span className={`
                        ${isToday ? 'font-bold' : ''}
                        ${!isSameDay(date, props.month) ? 'text-gray-400' : ''}
                      `}>
                        {format(date, 'd')}
                      </span>
                      {holiday && (
                        <span className="text-[10px] text-gray-500 truncate max-w-[40px]">
                          {holiday.name}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </animated.div>

      {/* Swipe Hint */}
      <div className="text-center text-sm text-gray-500 mt-4">
        ← Wischen zum Monatswechsel →
      </div>
    </div>
  );
}; 