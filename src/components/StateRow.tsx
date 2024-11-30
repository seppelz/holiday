import React from 'react';
import { GermanState } from '../types/germanState';
import { StateSelect } from './StateSelect';
import { VacationForm } from './VacationForm';
import { VacationPlan } from '../types/vacationPlan';

interface StateRowProps {
  personId: 1 | 2;
  state: GermanState | null;
  onStateChange: (state: GermanState | null) => void;
  availableVacationDays: number;
  onVacationDaysChange: (days: number) => void;
  remainingDays: number;
  showVacationForm: boolean;
  onToggleVacationForm: () => void;
  onVacationSubmit: (plan: Omit<VacationPlan, 'id' | 'personId'>) => void;
  isFirst?: boolean;
}

export const StateRow: React.FC<StateRowProps> = ({
  personId,
  state,
  onStateChange,
  availableVacationDays,
  onVacationDaysChange,
  remainingDays,
  showVacationForm,
  onToggleVacationForm,
  onVacationSubmit,
  isFirst = false,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center h-16 gap-4">
        {/* State Selection */}
        <div className="flex-shrink-0 flex items-center">
          <span className="text-sm font-medium text-gray-500 mr-2">{isFirst ? "1." : "2."}</span>
          <StateSelect
            selectedState={state}
            onStateChange={onStateChange}
            placeholder={isFirst ? "Heimat-Bundesland" : "2. Bundesland"}
            allowEmpty={!isFirst}
          />
        </div>

        {state && (
          <>
            {/* Vacation Days Counter */}
            <div className="flex items-center gap-2 ml-4">
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={availableVacationDays}
                    onChange={(e) => onVacationDaysChange(parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    min="0"
                    max="365"
                  />
                  <span className="text-sm text-gray-600">Urlaubstage</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-gray-600">|</span>
                <span className="text-gray-600">Verbleibend:</span>
                <span className="font-semibold text-teal-600">{remainingDays}</span>
              </div>
            </div>

            {/* Add Vacation Button */}
            <button
              onClick={onToggleVacationForm}
              className={`px-3 py-1 text-sm text-white rounded-full transition-all shadow-sm hover:shadow 
                active:shadow-inner active:translate-y-px ${
                  personId === 1
                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600'
                    : 'bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600'
                }`}
            >
              + Urlaub planen
            </button>
          </>
        )}
      </div>

      {/* Vacation Form */}
      {showVacationForm && state && (
        <VacationForm
          personId={personId}
          state={state}
          onSubmit={onVacationSubmit}
          onClose={onToggleVacationForm}
        />
      )}
    </div>
  );
}; 