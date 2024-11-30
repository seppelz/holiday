import React from 'react';
import { format, isWeekend, isSameDay, isWithinInterval } from 'date-fns';
import { de } from 'date-fns/locale';
import { Holiday } from '../../types/holiday';
import { VacationPlan } from '../../types/vacationPlan';
import { GermanState } from '../../types/germanState';

interface CalendarProps {
  state: GermanState;
  secondState?: GermanState | null;
  holidays: Holiday[];
  secondStateHolidays?: Holiday[];
  bridgeDays: Date[];
  secondStateBridgeDays?: Date[];
  vacationPlans: VacationPlan[];
  secondStateVacationPlans?: VacationPlan[];
}

// Stärkere Farben für besseren Kontrast
const colors = {
  person1: {
    holiday: 'bg-red-500',
    bridge: 'bg-orange-400',
    school: 'bg-indigo-500',
    vacation: 'bg-green-500'
  },
  person2: {
    holiday: 'bg-purple-500',
    bridge: 'bg-teal-400',
    school: 'bg-emerald-500',
    vacation: 'bg-blue-500'
  }
};

export const Calendar: React.FC<CalendarProps> = ({
  holidays = [],
  secondStateHolidays = [],
  bridgeDays = [],
  secondStateBridgeDays = [],
  vacationPlans = [],
  secondStateVacationPlans = []
}) => {
  // Helper function to get the days of a month
  const getDaysInMonth = (month: number, year: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // Get all months for the current year
  const getMonthsData = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push({
        name: format(new Date(2025, i, 1), 'MMMM', { locale: de }),
        days: getDaysInMonth(i, 2025)
      });
    }
    return months;
  };

  const months = getMonthsData();

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
        return date >= holidayStart && date <= holidayEnd;
      }
      return false;
    });
  };

  const getDayClasses = (date: Date) => {
    const baseClasses = 'relative text-center transition-all duration-200 flex items-center justify-center h-5 w-5 text-[10px] group rounded-sm';
    const isWeekendDay = isWeekend(date);
    const isFirstStateHoliday = holidays.find(h => isSameDay(date, h.date));
    const isSecondStateHoliday = secondStateHolidays.find(h => isSameDay(date, h.date));
    const isFirstStateBridgeDay = bridgeDays.some(d => isSameDay(date, d));
    const isSecondStateBridgeDay = secondStateBridgeDays.some(d => isSameDay(date, d));
    const isFirstStateSchoolHoliday = isInSchoolHolidays(date, holidays);
    const isSecondStateSchoolHoliday = isInSchoolHolidays(date, secondStateHolidays);
    const isFirstStateVacation = isInVacation(date, vacationPlans);
    const isSecondStateVacation = isInVacation(date, secondStateVacationPlans);

    const classes = [baseClasses];

    // Weekday text color
    classes.push(isWeekendDay ? 'text-gray-500' : 'text-gray-900');

    // Holiday colors
    if (isFirstStateHoliday && isSecondStateHoliday) {
      classes.push('bg-gradient-to-br from-red-500 to-purple-500 text-white');
    } else if (isFirstStateHoliday) {
      classes.push(colors.person1.holiday + ' text-white');
    } else if (isSecondStateHoliday) {
      classes.push(colors.person2.holiday + ' text-white');
    }

    // Bridge day colors
    if (isFirstStateBridgeDay && isSecondStateBridgeDay) {
      classes.push('bg-gradient-to-br from-orange-400 to-teal-400');
    } else if (isFirstStateBridgeDay) {
      classes.push(colors.person1.bridge);
    } else if (isSecondStateBridgeDay) {
      classes.push(colors.person2.bridge);
    }

    // School holiday colors
    if (isFirstStateSchoolHoliday && isSecondStateSchoolHoliday) {
      classes.push('bg-gradient-to-br from-indigo-500 to-emerald-500 text-white');
    } else if (isFirstStateSchoolHoliday) {
      classes.push(colors.person1.school + ' text-white');
    } else if (isSecondStateSchoolHoliday) {
      classes.push(colors.person2.school + ' text-white');
    }

    // Vacation colors
    if (isFirstStateVacation && isSecondStateVacation) {
      classes.push('bg-gradient-to-br from-green-500 to-blue-500 text-white');
    } else if (isFirstStateVacation) {
      classes.push(colors.person1.vacation);
    } else if (isSecondStateVacation) {
      classes.push(colors.person2.vacation);
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

    // Check bridge days
    if (bridgeDays.some(d => isSameDay(date, d))) {
      info.details.push('Brückentag Person 1');
    }
    if (secondStateBridgeDays.some(d => isSameDay(date, d))) {
      info.details.push('Brückentag Person 2');
    }

    // Check school holidays
    if (isInSchoolHolidays(date, holidays)) {
      info.details.push('Schulferien Person 1');
    }
    if (isInSchoolHolidays(date, secondStateHolidays)) {
      info.details.push('Schulferien Person 2');
    }

    // Check vacations
    if (isInVacation(date, vacationPlans)) {
      info.details.push('Urlaub Person 1');
    }
    if (isInVacation(date, secondStateVacationPlans)) {
      info.details.push('Urlaub Person 2');
    }

    info.title = info.details.join(' | ');
    return info;
  };

  return (
    <div className="bg-white/80 rounded-xl shadow-lg backdrop-blur-sm p-2">
      <div className="grid grid-cols-4 gap-2">
        {months.map((month, monthIndex) => (
          <div key={month.name} className="bg-white/60 rounded-lg overflow-hidden">
            <h3 className="text-[11px] font-medium text-gray-900 py-1 text-center border-b bg-white/60">
              {month.name} {monthIndex === 0 && '2025'}
            </h3>
            <div className="p-1">
              <div className="grid grid-cols-7 gap-[1px]">
                {/* Weekday headers */}
                {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
                  <div key={day} className="w-5 mx-auto text-[9px] font-medium text-gray-700 h-5 flex items-center justify-center">
                    {day}
                  </div>
                ))}

                {/* Empty cells for days before month starts */}
                {Array.from({ length: month.days[0].getDay() || 7 }).map((_, i) => (
                  <div key={`empty-${i}`} className="w-5 mx-auto h-5" />
                ))}

                {/* Calendar days */}
                {month.days.map((date, i) => {
                  const dayInfo = getDayInfo(date);
                  return (
                    <div key={i} className={`w-5 mx-auto ${getDayClasses(date)}`}>
                      {format(date, 'd')}
                      {/* Tooltip */}
                      {dayInfo.title && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-[9px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
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
        ))}
      </div>
    </div>
  );
};

export default Calendar; 