import React, { useState } from 'react';
import { GermanState } from '../types/GermanState';
import { VacationPlan } from '../types/vacationPlan';
import { format } from 'date-fns';

interface VacationFormProps {
  personId: 1 | 2;
  state: GermanState;
  onSubmit: (plan: Omit<VacationPlan, 'id' | 'personId'>) => void;
  onClose: () => void;
}

export const VacationForm: React.FC<VacationFormProps> = ({
  personId,
  state,
  onSubmit,
  onClose
}) => {
  const [startDate, setStartDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      start: new Date(startDate),
      end: new Date(endDate),
      isVisible: true
    });
  };

  const getButtonColor = () => {
    return personId === 1 
      ? 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500'
      : 'bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Urlaub planen für Person {personId} ({state})
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div>
        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
          Von
        </label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          required
        />
      </div>

      <div>
        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
          Bis
        </label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${getButtonColor()}`}
        >
          Speichern
        </button>
      </div>
    </form>
  );
}; 