import React from 'react';
import { format, isWeekend, isSameDay, isWithinInterval } from 'date-fns';
import { de } from 'date-fns/locale';
import { Holiday } from '../../types/holiday';
import { VacationPlan } from '../../types/vacationPlan';
import { holidayColors, gradientColors } from '../../constants/colors';

interface MonthCalendarProps {
  month: Date;
  state: string;
  secondState: string | null;
  holidays: Holiday[];
  secondStateHolidays: Holiday[];
  bridgeDays: Date[];
  secondStateBridgeDays: Date[];
  vacationPlans: VacationPlan[];
  secondStateVacationPlans: VacationPlan[];
}

export const MonthCalendar: React.FC<MonthCalendarProps> = ({
  month,
  holidays,
  secondStateHolidays,
  bridgeDays,
  secondStateBridgeDays,
  vacationPlans,
  secondStateVacationPlans
}) => {
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

  const isInVacation = (date: Date, plans: VacationPlan[]) => {
    return plans.some(plan => 
      plan.isVisible && 
      isWithinInterval(date, { start: new Date(plan.start), end: new Date(plan.end) })
    );
  };

  const isInSchoolHolidays = (date: Date, holidayList: Holiday[]) => {
    return holidayList.some(holiday => {
      if (holiday.type === 'regional' && holiday.endDate) {
        const holidayStart = new Date(holiday.date);
        const holidayEnd = new Date(holiday.endDate);
        return isWithinInterval(date, { start: holidayStart, end: holidayEnd });
      }
      return false;
    });
  };

  const getDayClasses = (date: Date) => {
    const baseClasses = 'w-6 h-6 flex items-center justify-center text-xs select-none';
    const classes = [baseClasses];
    const isWeekendDay = isWeekend(date);
    const isFirstStateHoliday = holidays.find(h => isSameDay(date, h.date));
    const isSecondStateHoliday = secondStateHolidays.find(h => isSameDay(date, h.date));
    const isFirstStateBridgeDay = bridgeDays.some(d => isSameDay(date, d));
    const isSecondStateBridgeDay = secondStateBridgeDays.some(d => isSameDay(date, d));
    const isFirstStateSchoolHoliday = isInSchoolHolidays(date, holidays);
    const isSecondStateSchoolHoliday = isInSchoolHolidays(date, secondStateHolidays);
    const isFirstStateVacation = isInVacation(date, vacationPlans);
    const isSecondStateVacation = isInVacation(date, secondStateVacationPlans);

    // Weekday text color
    classes.push(isWeekendDay ? 'text-gray-500' : 'text-gray-900');

    // Holiday colors
    if (isFirstStateHoliday && isSecondStateHoliday) {
      classes.push(gradientColors.shared.holiday + ' text-white');
    } else if (isFirstStateHoliday) {
      classes.push(holidayColors.person1.holiday + ' text-white');
    } else if (isSecondStateHoliday) {
      classes.push(holidayColors.person2.holiday + ' text-white');
    }

    // Bridge day colors
    if (isFirstStateBridgeDay && isSecondStateBridgeDay) {
      classes.push(gradientColors.shared.bridge + ' text-white');
    } else if (isFirstStateBridgeDay) {
      classes.push(holidayColors.person1.bridge);
    } else if (isSecondStateBridgeDay) {
      classes.push(holidayColors.person2.bridge);
    }

    // School holiday colors - Apply person-specific colors
    if (isFirstStateSchoolHoliday && isSecondStateSchoolHoliday) {
      classes.push(gradientColors.shared.school + ' text-white');
    } else if (isFirstStateSchoolHoliday) {
      classes.push(holidayColors.person1.school + ' text-white');
    } else if (isSecondStateSchoolHoliday) {
      classes.push(holidayColors.person2.school + ' text-white');
    }

    // Vacation colors
    if (isFirstStateVacation && isSecondStateVacation) {
      classes.push(gradientColors.shared.vacation + ' text-white');
    } else if (isFirstStateVacation) {
      classes.push(holidayColors.person1.vacation);
    } else if (isSecondStateVacation) {
      classes.push(holidayColors.person2.vacation);
    }

    return classes.join(' ');
  };

  const getDayInfo = (date: Date): { title: string; details: string[] } => {
    const info: { title: string; details: string[] } = { title: '', details: [] };
    
    // Check holidays
    const firstStateHoliday = holidays.find(h => isSameDay(new Date(h.date), date));
    const secondStateHoliday = secondStateHolidays.find(h => isSameDay(new Date(h.date), date));
    
    if (firstStateHoliday) {
      info.details.push(firstStateHoliday.name);
    }
    if (secondStateHoliday && secondStateHoliday.name !== firstStateHoliday?.name) {
      info.details.push(secondStateHoliday.name);
    }

    if (bridgeDays.some(d => isSameDay(date, d))) {
      info.details.push('Brückentag Person 1');
    }
    if (secondStateBridgeDays.some(d => isSameDay(date, d))) {
      info.details.push('Brückentag Person 2');
    }

    if (isInSchoolHolidays(date, holidays)) {
      info.details.push('Schulferien Person 1');
    }
    if (isInSchoolHolidays(date, secondStateHolidays)) {
      info.details.push('Schulferien Person 2');
    }

    if (isInVacation(date, vacationPlans)) {
      info.details.push('Urlaub Person 1');
    }
    if (isInVacation(date, secondStateVacationPlans)) {
      info.details.push('Urlaub Person 2');
    }

    info.title = info.details.join(' | ');
    return info;
  };

  const days = getDaysInMonth(month);
  const firstDayOffset = days[0].getDay() || 7; // Convert Sunday (0) to 7

  return (
    <div className="bg-white/80 rounded-lg shadow-sm overflow-hidden select-none">
      <h3 className="text-xs font-medium text-gray-900 py-1 text-center border-b bg-white/60">
        {format(month, 'MMMM', { locale: de })} {month.getMonth() === 0 && '2025'}
      </h3>
      <div className="p-1">
        <div className="grid grid-cols-7 gap-px">
          {/* Weekday headers */}
          {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
            <div key={day} className="text-[10px] font-medium text-gray-700 h-6 flex items-center justify-center w-6 mx-auto">
              {day}
            </div>
          ))}

          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDayOffset - 1 }).map((_, i) => (
            <div key={`empty-${i}`} className="h-6 w-6 mx-auto" />
          ))}

          {/* Calendar days */}
          {days.map((date) => {
            const dayInfo = getDayInfo(date);
            return (
              <div
                key={date.getTime()}
                className={getDayClasses(date)}
                title={dayInfo.title}
              >
                {format(date, 'd')}
                {dayInfo.title && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {dayInfo.details.map((detail, index) => (
                      <div key={index}>{detail}</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonthCalendar; 