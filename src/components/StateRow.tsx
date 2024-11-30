import React from 'react';
import { GermanState } from '../types/germanState';
import { StateSelect } from './StateSelect';
import { VacationForm } from './VacationForm';
import { Holiday, VacationPlan } from '../types/holiday';

interface StateRowProps {
  state: GermanState | null;
  onStateChange: (state: GermanState | null) => void;
  availableVacationDays: number;
  onVacationDaysChange: (days: number) => void;
  remainingDays: number;
  showVacationForm: boolean;
  onToggleVacationForm: () => void;
  onVacationSubmit: (plan: Omit<VacationPlan, 'id'>) => void;
  isFirst?: boolean;
}

export const StateRow: React.FC<StateRowProps> = ({
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
                    className="w-16 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    min="0"
                    max="365"
                  />
                  <span className="text-sm text-gray-600">Urlaubstage</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-gray-600">|</span>
                <span className="text-gray-600">Verbleibend:</span>
                <span className="font-semibold text-indigo-600">{remainingDays}</span>
              </div>
            </div>

            {/* Add Vacation Button */}
            <button
              onClick={onToggleVacationForm}
              className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors ml-4"
            >
              + Urlaub planen
            </button>

            {/* Legend */}
            <div className="flex items-center gap-4 text-sm ml-auto">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-100 border border-gray-200 rounded"></div>
                <span className="text-sm">Feiertage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-100 border border-gray-200 rounded"></div>
                <span className="text-sm">Brückentage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-100 border border-gray-200 rounded"></div>
                <span className="text-sm">Schulferien</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Vacation Form */}
      {showVacationForm && state && (
        <VacationForm
          state={state}
          onSubmit={onVacationSubmit}
          onClose={onToggleVacationForm}
        />
      )}
    </div>
  );
}; 