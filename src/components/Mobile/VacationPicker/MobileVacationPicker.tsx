import React from 'react';
import { format, addMonths, isValid } from 'date-fns';
import { de } from 'date-fns/locale';
import { CalendarGrid } from '../../Calendar/CalendarGrid';
import { BaseVacationPickerProps, useVacationPicker } from '../../Shared/BaseVacationPicker';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';

export const MobileVacationPicker: React.FC<BaseVacationPickerProps> = (props) => {
  const {
    state,
    today,
    handleStartDateChange,
    handleEndDateChange,
    handleDateSelect,
    handleMonthChange,
    getVacationDays,
    handleSubmit
  } = useVacationPicker(props);

  // Animation for swipe gestures
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  // Handle month swipe
  const bind = useDrag(
    ({ movement: [mx], last, cancel, direction: [xDir] }) => {
      if (Math.abs(mx) > 50) {
        handleMonthChange(xDir > 0 ? -2 : 2);
        if (navigator.vibrate) {
          navigator.vibrate(10);
        }
        cancel();
      }
      if (last) {
        api.start({ x: 0 });
      } else {
        api.start({ x: mx, immediate: true });
      }
    },
    { axis: 'x', bounds: { left: -100, right: 100 } }
  );

  const getButtonColor = () => {
    return props.personId === 1 
      ? 'bg-emerald-500 active:bg-emerald-600'
      : 'bg-cyan-500 active:bg-cyan-600';
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={props.onClose}
            className="p-2 -ml-2 text-gray-600 active:bg-gray-100 rounded-full"
            aria-label="Zurück"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-medium">Urlaub planen</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* Date Inputs */}
        <form className="px-4 pb-4 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="start-date-mobile" className="block text-sm font-medium text-gray-700">
                Von
              </label>
              <input
                type="date"
                id="start-date-mobile"
                value={state.startDate && isValid(state.startDate) ? format(state.startDate, 'yyyy-MM-dd') : ''}
                onChange={(e) => handleStartDateChange(e.target.value)}
                min={format(today, 'yyyy-MM-dd')}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                  focus:border-teal-500 focus:ring-teal-500 text-sm"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="end-date-mobile" className="block text-sm font-medium text-gray-700">
                Bis
              </label>
              <input
                type="date"
                id="end-date-mobile"
                value={state.endDate && isValid(state.endDate) ? format(state.endDate, 'yyyy-MM-dd') : ''}
                onChange={(e) => handleEndDateChange(e.target.value)}
                min={state.startDate ? format(state.startDate, 'yyyy-MM-dd') : format(today, 'yyyy-MM-dd')}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                  focus:border-teal-500 focus:ring-teal-500 text-sm"
                required
                disabled={!state.startDate}
              />
            </div>
          </div>
        </form>
      </div>

      {/* Calendar */}
      <div className="flex-1 overflow-auto">
        <animated.div
          {...bind()}
          style={{ x }}
          className="p-4 touch-pan-y"
        >
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={() => handleMonthChange(-2)}
              className="p-2 active:bg-gray-100 rounded-full"
              aria-label="Vorherige Monate"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm font-medium">
              {format(state.currentMonth, 'MMMM yyyy', { locale: de })}
            </span>
            <button
              type="button"
              onClick={() => handleMonthChange(2)}
              className="p-2 active:bg-gray-100 rounded-full"
              aria-label="Nächste Monate"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
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
                />
              );
            })}
          </div>
        </animated.div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t p-4 space-y-2">
        {state.startDate && state.endDate && isValid(state.startDate) && isValid(state.endDate) && (
          <div className="text-sm text-gray-600 text-center">
            <span className="font-medium text-gray-900">{getVacationDays()}</span> {getVacationDays() === 1 ? 'Tag' : 'Tage'} Urlaub
            <span className="mx-2">|</span>
            {format(state.startDate, 'd. MMM', { locale: de })} - {format(state.endDate, 'd. MMM', { locale: de })}
          </div>
        )}
        
        <div className="flex gap-3">
          <button
            type="button"
            onClick={props.onClose}
            className="flex-1 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg 
              active:bg-gray-200"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSubmit}
            disabled={!state.startDate || !state.endDate || !isValid(state.startDate) || !isValid(state.endDate)}
            className={`flex-1 py-2.5 text-sm font-medium text-white rounded-lg 
              disabled:opacity-50 disabled:cursor-not-allowed
              ${state.startDate && state.endDate ? getButtonColor() : 'bg-gray-300'}`}
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
}; 