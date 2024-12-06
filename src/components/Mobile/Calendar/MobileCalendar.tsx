import React, { useMemo, useCallback } from 'react';
import { format, isWeekend, isSameDay, isWithinInterval, isBefore, startOfDay, addDays } from 'date-fns';
import { de } from 'date-fns/locale';
import { BaseCalendarProps, useCalendar } from '../../Shared/Calendar/BaseCalendar';
import { holidayColors } from '../../../constants/colors';
import { Holiday } from '../../../types/holiday';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { VacationPlan } from '../../../types/vacationPlan';

interface MobileCalendarProps extends BaseCalendarProps {
  personId: 1 | 2;
  onMonthChange?: (direction: number) => void;
  vacationPlans?: VacationPlan[];
  month: Date;
  getDateVacationInfo: (date: Date) => { isSharedVacation: boolean };
}

export const MobileCalendar: React.FC<MobileCalendarProps> = (props) => {
  const {
    state,
    handleDateHover,
    handleDateSelect,
    handleMouseLeave
  } = useCalendar(props);

  const today = useMemo(() => startOfDay(new Date()), []);

  // Animation for swipe gestures
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  // Memoize expensive date operations
  const isDateDisabled = useCallback((date: Date) => {
    if (isBefore(date, today)) return true;
    
    return props.disabledDates?.some(range => 
      isWithinInterval(date, { start: range.start, end: range.end })
    );
  }, [today, props.disabledDates]);

  const isDateInRange = useCallback((date: Date) => {
    if (!props.startDate || !props.endDate) return false;
    return isWithinInterval(date, { 
      start: props.startDate < props.endDate ? props.startDate : props.endDate,
      end: props.startDate < props.endDate ? props.endDate : props.startDate
    });
  }, [props.startDate, props.endDate]);

  const isDateInVacation = useCallback((date: Date) => {
    return props.vacationPlans?.some(vacation => 
      vacation.isVisible && isWithinInterval(date, { start: vacation.start, end: vacation.end })
    );
  }, [props.vacationPlans]);

  const getHolidayType = useCallback((date: Date): { type: Holiday['type'] | 'vacation' | null; holiday: Holiday | null } => {
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
  }, [isDateInVacation, props.bridgeDays, props.holidays]);

  // Memoize calendar grid generation
  const { weeks, firstDay, lastDay } = useMemo(() => {
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

    return { weeks, firstDay, lastDay };
  }, [props.month]);

  // Memoize date classes generation
  const getDateClasses = useCallback((date: Date) => {
    const isDisabled = isDateDisabled(date);
    const isSelected = isDateInRange(date);
    const { type } = getHolidayType(date);
    const isWeekendDay = isWeekend(date);
    const isToday = isSameDay(date, today);
    const isCurrentMonth = date.getMonth() === props.month.getMonth();
    const vacationInfo = props.getDateVacationInfo(date);

    const baseClasses = "flex flex-col items-center justify-center w-12 h-11 text-sm transition-colors touch-manipulation";
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
  }, [
    isDateDisabled,
    isDateInRange,
    getHolidayType,
    today,
    props.month,
    props.getDateVacationInfo,
    props.isSelectingVacation,
    props.personId
  ]);

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

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, date: Date) => {
    const isDisabled = isDateDisabled(date);
    if (isDisabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleDateSelect(date);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        const prevDay = addDays(date, -1);
        const prevDayElement = document.querySelector(`[data-date="${format(prevDay, 'yyyy-MM-dd')}"]`) as HTMLElement;
        prevDayElement?.focus();
        break;
      case 'ArrowRight':
        e.preventDefault();
        const nextDay = addDays(date, 1);
        const nextDayElement = document.querySelector(`[data-date="${format(nextDay, 'yyyy-MM-dd')}"]`) as HTMLElement;
        nextDayElement?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevWeek = addDays(date, -7);
        const prevWeekElement = document.querySelector(`[data-date="${format(prevWeek, 'yyyy-MM-dd')}"]`) as HTMLElement;
        prevWeekElement?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        const nextWeek = addDays(date, 7);
        const nextWeekElement = document.querySelector(`[data-date="${format(nextWeek, 'yyyy-MM-dd')}"]`) as HTMLElement;
        nextWeekElement?.focus();
        break;
      case 'Tab':
        // Let the default tab behavior work naturally
        // The tab order will flow to the next focusable element (navigation buttons)
        break;
    }
  };

  return (
    <div className="select-none">
      {/* Month Navigation - Reduced padding and size */}
      <div 
        className="flex items-center justify-between mb-2 px-2"
        role="toolbar"
        aria-label="Monatsnavigation"
      >
        <button
          onClick={() => props.onMonthChange?.(-1)}
          className="p-1.5 text-gray-600 active:bg-gray-100 rounded-full touch-manipulation 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Vorheriger Monat"
          type="button"
          tabIndex={0}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div 
          className="text-base font-medium text-gray-900"
          role="heading"
          aria-level={2}
        >
          {format(props.month, 'MMMM yyyy', { locale: de })}
        </div>

        <button
          onClick={() => props.onMonthChange?.(1)}
          className="p-1.5 text-gray-600 active:bg-gray-100 rounded-full touch-manipulation 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Nächster Monat"
          type="button"
          tabIndex={0}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <animated.div
        {...bind()}
        style={{ x }}
        className="touch-pan-x"
        role="grid"
        aria-label="Kalender"
      >
        <div className="grid grid-cols-7 bg-gray-100 rounded-lg overflow-hidden">
          {/* Weekday headers - Reduced padding */}
          <div className="contents" role="row">
            {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
              <div
                key={day}
                className="bg-white py-1.5 text-xs font-medium text-gray-500 text-center border-b"
                role="columnheader"
                aria-label={day === 'Mo' ? 'Montag' : 
                           day === 'Di' ? 'Dienstag' :
                           day === 'Mi' ? 'Mittwoch' :
                           day === 'Do' ? 'Donnerstag' :
                           day === 'Fr' ? 'Freitag' :
                           day === 'Sa' ? 'Samstag' : 'Sonntag'}
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid - Adjusted cell sizes */}
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} role="row" className="contents">
              {week.map((date, dayIndex) => {
                const isDisabled = isDateDisabled(date);
                const { holiday } = getHolidayType(date);
                const isToday = isSameDay(date, today);
                const vacationInfo = props.getDateVacationInfo(date);
                const isSelected = isDateInRange(date);
                const isCurrentMonth = date.getMonth() === props.month.getMonth();

                const dateLabel = [
                  format(date, 'd. MMMM yyyy', { locale: de }),
                  isToday && 'Heute',
                  holiday?.name,
                  vacationInfo.isSharedVacation && 'Gemeinsamer Urlaub',
                  isDisabled && 'Nicht verfügbar'
                ].filter(Boolean).join(', ');

                return (
                  <div
                    key={dayIndex}
                    className={`relative bg-white border-b border-r last:border-r-0 focus-within:z-10`}
                    data-date={format(date, 'yyyy-MM-dd')}
                  >
                    <button
                      className={`w-full h-11 flex flex-col items-center justify-center ${getDateClasses(date)} 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                        ${!isCurrentMonth ? 'focus:ring-gray-400' : ''}`}
                      onTouchStart={() => !isDisabled && handleDateHover(date)}
                      onClick={() => !isDisabled && handleDateSelect(date)}
                      onKeyDown={(e) => handleKeyDown(e, date)}
                      role="gridcell"
                      aria-disabled={isDisabled}
                      aria-label={dateLabel}
                      aria-selected={isSelected}
                      tabIndex={isDisabled ? -1 : (isCurrentMonth ? 0 : -1)}
                      type="button"
                    >
                      <span className={`
                        ${isToday ? 'font-bold' : ''}
                        ${!isSameDay(date, props.month) ? 'text-gray-400' : ''}
                      `}>
                        {format(date, 'd')}
                      </span>
                      {vacationInfo.isSharedVacation && (
                        <div 
                          className="absolute top-0.5 right-0.5 text-[8px] text-yellow-600"
                          aria-hidden="true"
                        >
                          ❤️
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </animated.div>

      {/* Swipe Hint */}
      <div 
        className="text-center text-xs text-gray-500 mt-2"
        aria-hidden="true"
      >
        ← Wischen zum Monatswechsel →
      </div>
    </div>
  );
}; 