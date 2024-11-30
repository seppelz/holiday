import React, { useState, useEffect } from 'react';
import { addMonths, isBefore, isAfter, startOfMonth } from 'date-fns';
import { GermanState } from '../types/germanState';
import { VacationPlan } from '../types/holiday';

interface VacationFormProps {
  state: GermanState;
  onSubmit: (plan: Omit<VacationPlan, 'id'>) => void;
  onClose: () => void;
}

export const VacationForm: React.FC<VacationFormProps> = ({
  state,
  onSubmit,
  onClose
}) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [endDateMin, setEndDateMin] = useState<string>('');

  // When start date changes, update end date minimum and default month view
  useEffect(() => {
    if (startDate) {
      setEndDateMin(startDate);
      if (!endDate || isBefore(new Date(endDate), new Date(startDate))) {
        setEndDate('');
      }
    }
  }, [startDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate) {
      onSubmit({
        start: new Date(startDate),
        end: new Date(endDate),
        state,
        isVisible: true
      });
      onClose();
    }
  };

  return (
    <div className="py-3 border-t">
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Von</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Bis</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={endDateMin}
            className="px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex gap-2 self-end">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            className="px-4 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Hinzufügen
          </button>
        </div>
      </form>
    </div>
  );
}; 