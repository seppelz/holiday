import React, { useRef } from 'react';
import { format, addMonths, isValid } from 'date-fns';
import { de } from 'date-fns/locale';
import { CalendarGrid } from '../../Calendar/CalendarGrid';
import { BaseVacationPickerProps, useVacationPicker } from '../../Shared/BaseVacationPicker';

export const DesktopVacationPicker: React.FC<BaseVacationPickerProps> = (props) => {
  const {
    state,
    today,
    handleStartDateChange,
    handleEndDateChange,
    handleDateSelect,
    handleMonthChange,
    toggleCalendar,
    getVacationDays,
    handleSubmit
  } = useVacationPicker(props);

  const startInputRef = useRef<HTMLInputElement>(null);

  // Autofocus on mount
  React.useEffect(() => {
    startInputRef.current?.focus();
  }, []);

  const getButtonColor = () => {
    return props.personId === 1 
      ? 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500'
      : 'bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Urlaub planen für Person {props.personId}
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleCalendar}
                className="text-gray-600 hover:text-gray-900"
                aria-label={state.showCalendar ? "Kalender ausblenden" : "Kalender einblenden"}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={state.showCalendar 
                      ? "M6 18L18 6M6 6l12 12" 
                      : "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"} 
                  />
                </svg>
              </button>
              <button
                onClick={props.onClose}
                className="text-gray-400 hover:text-gray-500"
                aria-label="Schließen"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                Von
              </label>
              <input
                type="date"
                id="start-date"
                ref={startInputRef}
                value={state.startDate && isValid(state.startDate) ? format(state.startDate, 'yyyy-MM-dd') : ''}
                onChange={(e) => handleStartDateChange(e.target.value)}
                min={format(today, 'yyyy-MM-dd')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  focus:border-teal-500 focus:ring-teal-500 
                  disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
                aria-describedby="start-date-description"
                tabIndex={1}
              />
              <p id="start-date-description" className="mt-1 text-xs text-gray-500">
                Wähle ein Datum in der Zukunft
              </p>
            </div>

            {/* End Date */}
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
                Bis
              </label>
              <input
                type="date"
                id="end-date"
                value={state.endDate && isValid(state.endDate) ? format(state.endDate, 'yyyy-MM-dd') : ''}
                onChange={(e) => handleEndDateChange(e.target.value)}
                min={state.startDate ? format(state.startDate, 'yyyy-MM-dd') : format(today, 'yyyy-MM-dd')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  focus:border-teal-500 focus:ring-teal-500 
                  disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
                disabled={!state.startDate}
                aria-describedby="end-date-description"
                tabIndex={2}
              />
              <p id="end-date-description" className="mt-1 text-xs text-gray-500">
                {state.startDate ? 'Wähle ein Datum nach dem Startdatum' : 'Wähle zuerst ein Startdatum'}
              </p>
            </div>
          </div>

          {/* Calendar */}
          {state.showCalendar && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <button
                  type="button"
                  onClick={() => handleMonthChange(-2)}
                  className="p-2 hover:bg-gray-200 rounded-full"
                  aria-label="Vorherige Monate"
                  tabIndex={4}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-sm font-medium">
                  {format(state.currentMonth, 'MMMM yyyy', { locale: de })} - {format(addMonths(state.currentMonth, 1), 'MMMM yyyy', { locale: de })}
                </span>
                <button
                  type="button"
                  onClick={() => handleMonthChange(2)}
                  className="p-2 hover:bg-gray-200 rounded-full"
                  aria-label="Nächste Monate"
                  tabIndex={5}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[0, 1].map((offset) => {
                  const monthDate = addMonths(state.currentMonth, offset);
                  return (
                    <CalendarGrid
                      key={monthDate.getTime()}
                      month={monthDate}
                      startDate={state.startDate}
                      endDate={state.endDate}
                      onDateSelect={handleDateSelect}
                      holidays={props.holidays}
                      bridgeDays={props.bridgeDays}
                      disabledDates={props.existingVacations.map(v => ({ start: v.start, end: v.end }))}
                      tabIndex={6 + offset}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Summary */}
          {state.startDate && state.endDate && isValid(state.startDate) && isValid(state.endDate) && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">{getVacationDays()}</span> {getVacationDays() === 1 ? 'Tag' : 'Tage'} Urlaub
                <span className="mx-2">|</span>
                {format(state.startDate, 'd. MMMM yyyy', { locale: de })} - {format(state.endDate, 'd. MMMM yyyy', { locale: de })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={props.onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg 
                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              tabIndex={3}
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={!state.startDate || !state.endDate || !isValid(state.startDate) || !isValid(state.endDate)}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                ${state.startDate && state.endDate ? getButtonColor() : 'bg-gray-300'}`}
              tabIndex={3}
            >
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 