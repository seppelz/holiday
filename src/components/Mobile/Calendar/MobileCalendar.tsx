import React from 'react';
import { format, isWeekend, isSameDay, isWithinInterval, isBefore, startOfDay } from 'date-fns';
import { de } from 'date-fns/locale';
import { BaseCalendarProps, useCalendar } from '../../Shared/Calendar/BaseCalendar';
import { holidayColors } from '../../../constants/colors';
import { Holiday } from '../../../types/holiday';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { VacationPlan } from '../../../types/vacationPlan';

interface MobileCalendarProps extends BaseCalendarProps {
  personId: 1 | 2;
  onMonthChange?: (direction: 1 | -1) => void;
  vacationPlans?: VacationPlan[];
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

  const isDateInVacation = (date: Date) => {
    return props.vacationPlans?.some(vacation => 
      vacation.isVisible && isWithinInterval(date, { start: vacation.start, end: vacation.end })
    );
  };

  const getHolidayType = (date: Date): { type: Holiday['type'] | 'vacation' | null; holiday: Holiday | null } => {
    // Check for vacations first
    if (isDateInVacation(date)) {
      return { type: 'vacation', holiday: null };
    }

    // Then check for bridge days
    const isBridgeDay = props.bridgeDays?.some(bd => {
      const bridgeDate = new Date(bd.date);
      return isSameDay(bridgeDate, date);
    });
    if (isBridgeDay) {
      return { type: 'bridge', holiday: null };
    }

    // Then check for holidays
    const holiday = props.holidays?.find(h => {
      const holidayDate = new Date(h.date);
      if (h.endDate) {
        const endDate = new Date(h.endDate);
        return isWithinInterval(date, { start: holidayDate, end: endDate });
      }
      return isSameDay(holidayDate, date);
    });

    return holiday ? { type: holiday.type, holiday } : { type: null, holiday: null };
  };

  const getDateClasses = (date: Date) => {
    const isDisabled = isDateDisabled(date);
    const isSelected = isDateInRange(date);
    const { type, holiday } = getHolidayType(date);
    const isWeekendDay = isWeekend(date);
    const isToday = isSameDay(date, today);
    const isCurrentMonth = date.getMonth() === props.month.getMonth();
    const vacationInfo = props.getDateVacationInfo(date);

    const baseClasses = "flex flex-col items-center justify-center w-12 h-14 text-sm transition-colors touch-manipulation";
    const cursorClasses = props.isSelectingVacation && !isDisabled ? "cursor-pointer active:bg-gray-50" : "cursor-default";
    const textColorClass = !isCurrentMonth ? "text-gray-400" : isDisabled ? "text-gray-300" : "text-gray-900";
    
    if (isDisabled) {
      return `${baseClasses} ${textColorClass} ${cursorClasses}`;
    }

    if (isSelected) {
      const personColor = props.personId === 1 ? 'emerald' : 'cyan';
      return `${baseClasses} bg-${personColor}-200 text-gray-900 active:bg-${personColor}-300 ${cursorClasses}`;
    }

    if (type === 'vacation') {
      if (vacationInfo.isSharedVacation) {
        return `${baseClasses} bg-gradient-to-br from-emerald-100 to-cyan-100 text-gray-900 ${cursorClasses}`;
      }
      return `${baseClasses} ${holidayColors[props.personId === 1 ? 'person1' : 'person2'].vacation} text-gray-900 ${cursorClasses}`;
    }

    if (type === 'public') {
      return `${baseClasses} ${holidayColors[props.personId === 1 ? 'person1' : 'person2'].holiday} text-white ${cursorClasses}`;
    }

    if (type === 'bridge') {
      return `${baseClasses} ${holidayColors[props.personId === 1 ? 'person1' : 'person2'].bridge} text-white ${cursorClasses}`;
    }

    if (type === 'regional' || type === 'school') {
      return `${baseClasses} ${holidayColors[props.personId === 1 ? 'person1' : 'person2'].school} text-white ${cursorClasses}`;
    }

    if (isWeekendDay) {
      return `${baseClasses} ${textColorClass} active:bg-gray-100 ${cursorClasses}`;
    }

    return `${baseClasses} ${textColorClass} active:bg-gray-100 ${cursorClasses}`;
  };

  // Generate calendar grid
  const weeks: Date[][] = [];
  const firstDay = new Date(props.month.getFullYear(), props.month.getMonth(), 1);
  const lastDay = new Date(props.month.getFullYear(), props.month.getMonth() + 1, 0);
  
  // Fill in days from previous month
  const firstDayOfWeek = firstDay.getDay() || 7; // Convert Sunday (0) to 7
  const prevMonthDays = [];
  for (let i = firstDayOfWeek - 1; i > 0; i--) {
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
  const remainingDays = 7 - ((prevMonthDays.length + currentMonthDays.length) % 7);
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
                const vacationInfo = props.getDateVacationInfo(date);

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
                      {vacationInfo.isSharedVacation && (
                        <div className="absolute top-0.5 right-0.5 text-[10px] text-yellow-600">
                          ❤️
                        </div>
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