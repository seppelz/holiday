import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { VacationPlan } from '../../../types/vacationPlan';
import { Holiday } from '../../../types/holiday';
import { isWeekend, isSameDay, eachDayOfInterval } from 'date-fns';

interface MobileVacationDaysCounterProps {
  availableVacationDays: number;
  onAvailableDaysChange: (days: number) => void;
  vacationPlans: VacationPlan[];
  accentColor: string;
  holidays: Holiday[];
  otherPersonVacations: VacationPlan[];
}

export const MobileVacationDaysCounter: React.FC<MobileVacationDaysCounterProps> = ({
  availableVacationDays,
  onAvailableDaysChange,
  vacationPlans,
  accentColor,
  holidays,
  otherPersonVacations
}) => {
  const [announcement, setAnnouncement] = useState('');
  const [inputValue, setInputValue] = useState(availableVacationDays.toString());

  // Memoize vacation days calculation - only count workdays (excluding weekends and holidays)
  const usedVacationDays = useMemo(() => {
    return vacationPlans.reduce((total, vacation) => {
      if (!vacation.isVisible) return total;
      
      // Get all days in the vacation period
      const allDays = eachDayOfInterval({ start: vacation.start, end: vacation.end });
      
      // Count only workdays (excluding weekends and public holidays)
      const requiredDays = allDays.reduce((count, d) => {
        if (isWeekend(d)) return count;
        const isPublicHoliday = holidays.some(h => 
          h.type === 'public' && isSameDay(new Date(h.date), d)
        );
        return isPublicHoliday ? count : count + 1;
      }, 0);

      return total + requiredDays;
    }, 0);
  }, [vacationPlans, holidays]);

  // Memoize input handlers
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    const numValue = parseInt(value) || 0;
    if (numValue >= 0 && numValue <= 365) {
      onAvailableDaysChange(numValue);
      setAnnouncement(`Verfügbare Urlaubstage auf ${numValue} gesetzt`);
    }
  }, [onAvailableDaysChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const currentValue = parseInt(inputValue) || 0;
    
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (currentValue < 365) {
          const newValue = currentValue + 1;
          setInputValue(newValue.toString());
          onAvailableDaysChange(newValue);
          setAnnouncement(`Verfügbare Urlaubstage auf ${newValue} erhöht`);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (currentValue > 0) {
          const newValue = currentValue - 1;
          setInputValue(newValue.toString());
          onAvailableDaysChange(newValue);
          setAnnouncement(`Verfügbare Urlaubstage auf ${newValue} reduziert`);
        }
        break;
      case 'Home':
        e.preventDefault();
        setInputValue('0');
        onAvailableDaysChange(0);
        setAnnouncement('Verfügbare Urlaubstage auf 0 gesetzt');
        break;
      case 'End':
        e.preventDefault();
        setInputValue('365');
        onAvailableDaysChange(365);
        setAnnouncement('Verfügbare Urlaubstage auf 365 gesetzt');
        break;
    }
  }, [inputValue, onAvailableDaysChange]);

  const handleBlur = useCallback(() => {
    const numValue = parseInt(inputValue) || 0;
    const validValue = Math.max(0, Math.min(365, numValue));
    setInputValue(validValue.toString());
    if (numValue !== validValue) {
      onAvailableDaysChange(validValue);
      setAnnouncement(`Verfügbare Urlaubstage auf ${validValue} angepasst`);
    }
  }, [inputValue, onAvailableDaysChange]);

  // Clear announcements after they're read
  useEffect(() => {
    if (announcement) {
      const timer = setTimeout(() => setAnnouncement(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [announcement]);

  return (
    <div 
      className="bg-white border-b border-gray-200 px-4 py-3"
      role="region"
      aria-label="Urlaubstage-Zähler"
    >
      {/* Screen reader announcements */}
      <div 
        className="sr-only" 
        role="status" 
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div 
            className="text-sm font-medium text-gray-900"
            id="vacation-days-label"
          >
            Verfügbare Urlaubstage
          </div>
          <div 
            className="text-sm text-gray-500"
            role="status"
            aria-live="polite"
          >
            {usedVacationDays} von {availableVacationDays} Tagen verwendet
          </div>
        </div>
        <div className="relative">
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="w-16 px-2 py-1 text-right border border-gray-300 rounded-md
              focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ '--tw-ring-color': accentColor + '4D' } as React.CSSProperties}
            min="0"
            max="365"
            aria-labelledby="vacation-days-label"
            aria-describedby="vacation-days-hint"
            role="spinbutton"
            aria-valuemin={0}
            aria-valuemax={365}
            aria-valuenow={parseInt(inputValue) || 0}
          />
          <div id="vacation-days-hint" className="sr-only">
            Benutze die Pfeiltasten nach oben und unten um die Anzahl der Urlaubstage anzupassen
          </div>
        </div>
      </div>
    </div>
  );
}; 