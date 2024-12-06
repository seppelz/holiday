import React from 'react';
import { addMonths } from 'date-fns';
import { MobileCalendar } from '../Calendar/MobileCalendar';
import { Holiday, BridgeDay } from '../../../types/holiday';
import { VacationPlan } from '../../../types/vacation';

interface MobileCalendarViewProps {
  holidays: Holiday[];
  bridgeDays: BridgeDay[];
  vacationPlans: VacationPlan[];
  onAddVacation: (start: Date, end: Date) => void;
  personId: 1 | 2;
}

export const MobileCalendarView: React.FC<MobileCalendarViewProps> = ({
  holidays,
  bridgeDays,
  vacationPlans,
  onAddVacation,
  personId
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = React.useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = React.useState<Date | null>(null);

  const handleDateSelect = (date: Date) => {
    if (!selectedStartDate) {
      setSelectedStartDate(date);
    } else if (!selectedEndDate) {
      if (date < selectedStartDate) {
        setSelectedStartDate(date);
        setSelectedEndDate(selectedStartDate);
      } else {
        setSelectedEndDate(date);
        onAddVacation(selectedStartDate, date);
        // Reset selection after adding vacation
        setSelectedStartDate(null);
        setSelectedEndDate(null);
      }
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  const handleMonthChange = (direction: 1 | -1) => {
    setCurrentMonth(prev => addMonths(prev, direction));
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="max-w-lg mx-auto p-4">
        <MobileCalendar
          month={currentMonth}
          holidays={holidays}
          bridgeDays={bridgeDays}
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          onDateSelect={handleDateSelect}
          disabledDates={vacationPlans.map(v => ({ start: v.start, end: v.end }))}
          personId={personId}
          onMonthChange={handleMonthChange}
          isSelectingVacation={true}
        />

        {/* Selection Hint */}
        <div className="text-center text-sm text-gray-500 mt-4">
          {!selectedStartDate 
            ? 'Tippe auf ein Datum um den Urlaub zu beginnen'
            : !selectedEndDate
              ? 'Wähle das Ende des Urlaubs'
              : 'Urlaub ausgewählt'
          }
        </div>
      </div>
    </div>
  );
}; 