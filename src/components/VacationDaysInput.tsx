import React from 'react';
import { holidayColors } from '../constants/colors';

interface VacationDaysInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  personId: 1 | 2;
}

export const VacationDaysInput: React.FC<VacationDaysInputProps> = ({
  value,
  onChange,
  min = 10, // Changed from 20 to 10
  max = 40, // Reasonable maximum
  personId
}) => {
  const colors = personId === 1 ? holidayColors.person1.ui : holidayColors.person2.ui;

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleDecrement();
    }
  };

  const buttonClasses = `w-4 h-4 flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 ${colors.text} ${colors.hover} ${colors.focus}`;

  const inputClasses = `w-8 text-center text-sm font-medium bg-transparent focus:outline-none focus:ring-1 focus:ring-offset-1 ${colors.text} ${colors.focus}`;

  return (
    <span className="inline-flex items-center mx-1">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className={buttonClasses}
        aria-label="Reduziere Urlaubstage"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const newValue = Math.min(max, Math.max(min, parseInt(e.target.value) || min));
          onChange(newValue);
        }}
        onKeyDown={handleKeyDown}
        className={inputClasses}
        min={min}
        max={max}
        aria-label="Anzahl Urlaubstage"
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className={buttonClasses}
        aria-label="Erhöhe Urlaubstage"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </span>
  );
}; 