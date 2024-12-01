import React, { useState, useEffect } from 'react';
import { Holiday } from '../../types/holiday';
import { VacationPlan } from '../../types/vacationPlan';
import { GermanState } from '../../types/GermanState';
import { MonthCalendar } from './MonthCalendar';

interface CalendarProps {
  state: GermanState;
  secondState: GermanState | null;
  holidays: Holiday[];
  secondStateHolidays: Holiday[];
  bridgeDays: Date[];
  secondStateBridgeDays: Date[];
  vacationPlans: VacationPlan[];
  secondStateVacationPlans: VacationPlan[];
}

export const Calendar: React.FC<CalendarProps> = ({
  state,
  secondState,
  holidays,
  secondStateHolidays = [],
  bridgeDays,
  secondStateBridgeDays = [],
  vacationPlans,
  secondStateVacationPlans = []
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate months per row based on screen width
  const monthsPerRow = screenWidth >= 1024 ? 4 : 1;

  // Generate months for the year
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2025, i, 1);
    return date;
  });

  // Split months into rows
  const monthRows = months.reduce((rows: Date[][], month: Date, index: number) => {
    if (index % monthsPerRow === 0) {
      rows.push([month]);
    } else {
      rows[rows.length - 1].push(month);
    }
    return rows;
  }, []);

  return (
    <div className="space-y-2">
      {monthRows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-1 lg:grid-cols-4 gap-1">
          {row.map((month) => (
            <MonthCalendar
              key={month.getTime()}
              month={month}
              state={state}
              secondState={secondState}
              holidays={holidays}
              secondStateHolidays={secondStateHolidays}
              bridgeDays={bridgeDays}
              secondStateBridgeDays={secondStateBridgeDays}
              vacationPlans={vacationPlans}
              secondStateVacationPlans={secondStateVacationPlans}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calendar; 