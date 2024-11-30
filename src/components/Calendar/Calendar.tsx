import React from 'react';
import { format, isWeekend, isSameDay, isWithinInterval } from 'date-fns';
import { de } from 'date-fns/locale';
import { VacationPlan } from '../../types/vacationPlan';
import { useStateContext } from '../../layouts/MainLayout';
import { stateThemes } from '../../utils/stateThemes';
import { GermanState } from '../../types/germanState';
import { Holiday } from '../../types/holiday';

// WICHTIG: Diese Props-Definition muss beibehalten werden, da sie die Grundlage für die Kalenderlogik bildet
interface CalendarProps {
  state: GermanState;
  secondState?: GermanState | null;
  holidays: Holiday[];
  secondStateHolidays?: Holiday[];
  bridgeDays: Date[];
  secondStateBridgeDays?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({
  state,
  secondState,
  holidays,
  secondStateHolidays = [],
  bridgeDays = [],
  secondStateBridgeDays = []
}) => {
  const { stateInfo } = useStateContext();
  const firstStateVacations = stateInfo[state].vacationPlans.filter(plan => plan.isVisible);
  const secondStateVacations = secondState ? stateInfo[secondState].vacationPlans.filter(plan => plan.isVisible) : [];

  // WICHTIG: Hier wird das Jahr 2025 fest eingestellt für die Jahresansicht
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2025, i, 1);
    return {
      name: format(date, 'MMMM', { locale: de }),
      days: Array.from(
        { length: new Date(2025, i + 1, 0).getDate() },
        (_, d) => new Date(2025, i, d + 1)
      ),
    };
  });

  // WICHTIG: Diese Hilfsfunktionen prüfen die verschiedenen Tagestypen
  const isHoliday = (date: Date, stateHolidays: Holiday[]) => {
    return stateHolidays.some(holiday => 
      isSameDay(new Date(holiday.date), date) && holiday.type === 'public'
    );
  };

  const isBridgeDay = (date: Date, stateBridgeDays: Date[] = []) => {
    return stateBridgeDays.some(bridgeDay => isSameDay(bridgeDay, date));
  };

  const isSchoolHoliday = (date: Date, stateHolidays: Holiday[]) => {
    return stateHolidays.some(holiday => 
      holiday.type === 'regional' && 
      holiday.endDate && 
      isWithinInterval(date, { start: new Date(holiday.date), end: new Date(holiday.endDate) })
    );
  };

  const isVacation = (date: Date, vacations: VacationPlan[]) => {
    return vacations.some(vacation =>
      isWithinInterval(date, { start: vacation.start, end: vacation.end })
    );
  };

  // WICHTIG: Diese Funktion gibt den Feiertagsnamen zurück
  const getHolidayName = (date: Date, stateHolidays: Holiday[]) => {
    const holiday = stateHolidays.find(h => isSameDay(new Date(h.date), date));
    return holiday ? holiday.name : '';
  };

  // WICHTIG: Diese Funktion bestimmt die CSS-Klassen für jeden Tag
  const getDayClasses = (date: Date) => {
    const baseClasses = 'relative p-1 text-center transition-all duration-200 rounded hover:bg-opacity-75 flex items-center justify-center min-h-[1.75rem]';
    const isWeekendDay = isWeekend(date);
    const isFirstStateHoliday = isHoliday(date, holidays);
    const isFirstStateBridgeDay = isBridgeDay(date, bridgeDays);
    const isFirstStateSchoolHoliday = isSchoolHoliday(date, holidays);
    const isFirstStateVacation = isVacation(date, firstStateVacations);
    
    const isSecondStateHoliday = secondStateHolidays && isHoliday(date, secondStateHolidays);
    const isSecondStateBridgeDay = secondStateBridgeDays && isBridgeDay(date, secondStateBridgeDays);
    const isSecondStateSchoolHoliday = secondStateHolidays && isSchoolHoliday(date, secondStateHolidays);
    const isSecondStateVacation = isVacation(date, secondStateVacations);

    const theme = stateThemes[state];
    const secondTheme = secondState ? stateThemes[secondState] : null;

    let classes = `${baseClasses} `;

    if (isWeekendDay) {
      classes += 'bg-gray-100 text-gray-500 hover:bg-gray-200 ';
    }

    if (isFirstStateHoliday) {
      classes += `bg-red-100 text-red-700 hover:bg-red-200 `;
    } else if (isFirstStateBridgeDay) {
      classes += `bg-amber-100 text-amber-700 hover:bg-amber-200 `;
    } else if (isFirstStateSchoolHoliday) {
      classes += `bg-sky-100 text-sky-700 hover:bg-sky-200 `;
    } else if (isFirstStateVacation) {
      classes += `bg-gradient-to-br ${theme.gradient} shadow-sm `;
    }

    // WICHTIG: Diagonale Teilung für zweites Bundesland
    if (secondState && (isSecondStateHoliday || isSecondStateBridgeDay || isSecondStateSchoolHoliday || isSecondStateVacation)) {
      const secondGradient = secondTheme?.gradient || 'from-indigo-50 to-indigo-100';
      classes += `relative overflow-hidden `;
      if (isSecondStateHoliday) {
        classes += `after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-1/2 after:h-full after:bg-red-100 after:rounded-bl `;
      } else if (isSecondStateBridgeDay) {
        classes += `after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-1/2 after:h-full after:bg-amber-100 after:rounded-bl `;
      } else if (isSecondStateSchoolHoliday) {
        classes += `after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-1/2 after:h-full after:bg-sky-100 after:rounded-bl `;
      } else if (isSecondStateVacation) {
        classes += `after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-1/2 after:h-full after:bg-gradient-to-br after:${secondGradient} after:rounded-bl `;
      }
    }

    return classes;
  };

  // WICHTIG: Hier beginnt das Rendering des Kalenders
  return (
    <div className="grid grid-cols-4 gap-2 max-h-[calc(100vh-15.5rem)] min-h-[calc(100vh-15.5rem)] bg-white/60 backdrop-blur-sm rounded-xl p-3">
      {months.map(month => (
        <div key={month.name} className="bg-gradient-to-br from-white/80 to-white/60 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-indigo-950 mb-1 text-center">
            {month.name} {months.indexOf(month) === 0 && <span className="text-indigo-400">2025</span>}
          </h3>
          <div className="grid grid-cols-7 gap-[2px]">
            {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
              <div key={day} className="text-center font-medium text-indigo-400 mb-1 text-xs">
                {day}
              </div>
            ))}
            {Array.from({ length: new Date(2025, months.indexOf(month), 1).getDay() - 1 }, (_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {month.days.map(date => {
              const firstStateHolidayName = getHolidayName(date, holidays);
              const secondStateHolidayName = secondStateHolidays 
                ? getHolidayName(date, secondStateHolidays)
                : '';

              const isFirstStateHoliday = isHoliday(date, holidays);
              const isFirstStateBridgeDay = isBridgeDay(date, bridgeDays);
              const isFirstStateSchoolHoliday = isSchoolHoliday(date, holidays);
              const isFirstStateVacation = isVacation(date, firstStateVacations);
              const isWeekendDay = isWeekend(date);

              let dayClasses = `relative p-1 text-center transition-all duration-200 rounded hover:shadow-sm 
                flex items-center justify-center min-h-[1.75rem] `;

              if (isWeekendDay) {
                dayClasses += 'bg-gradient-to-br from-gray-100 to-gray-50 text-gray-500 ';
              }

              if (isFirstStateHoliday) {
                dayClasses += 'bg-gradient-to-br from-rose-100 to-red-50 text-rose-700 hover:from-rose-200 hover:to-red-100 ';
              } else if (isFirstStateBridgeDay) {
                dayClasses += 'bg-gradient-to-br from-amber-100 to-yellow-50 text-amber-700 hover:from-amber-200 hover:to-yellow-100 ';
              } else if (isFirstStateSchoolHoliday) {
                dayClasses += 'bg-gradient-to-br from-sky-100 to-blue-50 text-sky-700 hover:from-sky-200 hover:to-blue-100 ';
              } else if (isFirstStateVacation) {
                dayClasses += 'bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-700 hover:from-emerald-200 hover:to-teal-100 ';
              }

              return (
                <div
                  key={date.toISOString()}
                  className={dayClasses}
                  title={[firstStateHolidayName, secondStateHolidayName]
                    .filter(Boolean)
                    .join(' / ')}
                >
                  <span className="relative z-10 text-xs font-medium">{format(date, 'd')}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Calendar; 