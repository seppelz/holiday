import React, { useMemo, useState } from 'react';
import { format, eachDayOfInterval, isWeekend, differenceInBusinessDays, isSameDay, differenceInDays, isWithinInterval, addDays, subDays } from 'date-fns';
import { de } from 'date-fns/locale';
import { VacationPlan } from '../types/vacationPlan';
import { Holiday } from '../types/holiday';
import { holidayColors, gradientColors } from '../constants/colors';
import { findVacationCombinationOpportunities, VacationCombination } from '../utils/smartVacationAnalysis';
import { GermanState } from '../types/germanState';

interface VacationListProps {
  vacations: VacationPlan[];
  otherPersonVacations?: VacationPlan[];
  onToggleVisibility: (id: string) => void;
  onRemove: (id: string) => void;
  personId?: 1 | 2;
  holidays?: Holiday[];
  bridgeDays?: Holiday[];
  onAddVacation?: (start: Date, end: Date) => void;
  availableVacationDays?: number;
  state: GermanState;
}

const isValidDate = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};

const calculateVacationStats = (vacation: VacationPlan, holidays: Holiday[]) => {
  try {
    // Validate dates first
    if (!isValidDate(vacation.start) || !isValidDate(vacation.end)) {
      console.error('Invalid vacation dates:', {
        start: vacation.start,
        end: vacation.end
      });
      return { requiredDays: 0, gainedDays: 0 };
    }

    // Get all days in the interval
    const allDays = eachDayOfInterval({ start: vacation.start, end: vacation.end });
    
    // Count workdays that aren't public holidays
    const requiredDays = allDays.reduce((count, d) => {
      // Skip weekends
      if (isWeekend(d)) return count;
      
      // Skip public holidays
      const isPublicHoliday = holidays.some(h => 
        h.type === 'public' && isSameDay(h.date, d)
      );
      
      return isPublicHoliday ? count : count + 1;
    }, 0);

    // Find connected free days before the vacation
    let startDate = subDays(vacation.start, 1);
    while (
      isWeekend(startDate) || 
      holidays.some(h => h.type === 'public' && isSameDay(h.date, startDate))
    ) {
      startDate = subDays(startDate, 1);
    }
    startDate = addDays(startDate, 1); // Move back to first free day

    // Find connected free days after the vacation
    let endDate = addDays(vacation.end, 1);
    while (
      isWeekend(endDate) || 
      holidays.some(h => h.type === 'public' && isSameDay(h.date, endDate))
    ) {
      endDate = addDays(endDate, 1);
    }
    endDate = subDays(endDate, 1); // Move back to last free day
    
    // Gained days include all connected free days
    const gainedDays = differenceInDays(endDate, startDate) + 1;
    
    return { requiredDays, gainedDays };
  } catch (error) {
    console.error('Error calculating vacation stats:', error);
    return { requiredDays: 0, gainedDays: 0 };
  }
};

const getVacationBackgroundClass = (
  vacation: VacationPlan,
  holidays: Holiday[],
  otherPersonVacations: VacationPlan[] = [],
  isVisible: boolean,
  colors: any
) => {
  if (!isVisible) return 'bg-gray-50';

  const days = eachDayOfInterval({ start: vacation.start, end: vacation.end });
  
  // Check for different types of holidays
  const hasPublicHoliday = days.some(d => 
    holidays.some(h => h.type === 'public' && isSameDay(h.date, d))
  );
  const hasBridgeDay = days.some(d => 
    holidays.some(h => h.type === 'bridge' && isSameDay(h.date, d))
  );
  const hasSchoolHoliday = days.some(d => 
    holidays.some(h => h.type === 'regional' && isSameDay(h.date, d))
  );
  const hasOtherPersonVacation = days.some(d =>
    otherPersonVacations.some(v => v.isVisible && isWithinInterval(d, { start: v.start, end: v.end }))
  );

  // Return appropriate gradient based on combinations
  if (hasOtherPersonVacation) {
    return gradientColors.shared.vacation;
  }
  if (hasPublicHoliday) {
    return gradientColors.shared.holiday;
  }
  if (hasBridgeDay) {
    return gradientColors.shared.bridge;
  }
  if (hasSchoolHoliday) {
    return gradientColors.shared.school;
  }

  return colors.vacation;
};

export const VacationList: React.FC<VacationListProps> = ({
  vacations,
  otherPersonVacations = [],
  onToggleVisibility,
  onRemove,
  personId = 1,
  holidays = [],
  bridgeDays = [],
  onAddVacation,
  availableVacationDays = 30,
  state,
}) => {
  console.log('VacationList render:', {
    vacationsCount: vacations.length,
    holidays: holidays.length,
    bridgeDays: bridgeDays.length
  });

  const colors = personId === 1 ? holidayColors.person1.ui : holidayColors.person2.ui;

  // Calculate vacation stats for each vacation once
  const vacationStats = useMemo(() => {
    return vacations.reduce((acc, vacation) => {
      // Calculate stats for this vacation
      const days = eachDayOfInterval({ start: vacation.start, end: vacation.end });
      const workdays = days.filter(d => {
        if (isWeekend(d)) return false;
        const isHoliday = holidays.some(h => 
          h.type === 'public' && isSameDay(h.date, d)
        );
        return !isHoliday;
      });
      
      acc[vacation.id] = {
        requiredDays: workdays.length,
        gainedDays: days.length
      };
      return acc;
    }, {} as Record<string, { requiredDays: number; gainedDays: number }>);
  }, [vacations, holidays]);

  // Calculate total stats from individual stats
  const stats = useMemo(() => {
    return vacations
      .filter(v => v.isVisible)
      .reduce((acc, vacation) => {
        const stats = vacationStats[vacation.id];
        return {
          requiredDays: acc.requiredDays + stats.requiredDays,
          gainedDays: acc.gainedDays + stats.gainedDays
        };
      }, { requiredDays: 0, gainedDays: 0 });
  }, [vacations, vacationStats]);

  const remainingDays = availableVacationDays - stats.requiredDays;

  // Find bridge day opportunities using smart analysis
  const allHolidays = useMemo(() => {
    // Include both holidays and bridge days for opportunity calculation
    // Ensure all dates are properly converted to Date objects and belong to the current state
    return [...(holidays || []), ...(bridgeDays || [])]
      .filter(h => {
        // Handle nationwide holidays
        if ('nationwide' in h && h.nationwide) return true;
        // Handle state-specific holidays
        if ('state' in h) {
          // Accept holidays for the current state
          return true; // The holidays are already filtered by state in the service
        }
        return false;
      })
      .map(h => ({
        ...h,
        date: h.date instanceof Date ? h.date : new Date(h.date)
      }));
  }, [holidays, bridgeDays]);

  const combinations = findVacationCombinationOpportunities(
    vacations, 
    allHolidays,
    state
  );
  const bestCombinations = combinations
    .filter((c: VacationCombination) => {
      // Validate dates before including in the list
      if (!c.dates || !Array.isArray(c.dates) || c.dates.length === 0) {
        console.error('Invalid combination dates:', c);
        return false;
      }
      if (!c.dates.every(isValidDate)) {
        console.error('Invalid dates in combination:', c.dates);
        return false;
      }
      // Only show combinations that require less than or equal to remaining days
      if (c.requiredDays > remainingDays) {
        return false;
      }
      // Check if any date in the combination overlaps with existing vacations
      return !vacations.some(vacation => 
        c.dates.some(date => 
          isWithinInterval(date, { start: vacation.start, end: vacation.end })
        )
      );
    })
    .sort((a, b) => a.dates[0].getTime() - b.dates[0].getTime())
    .slice(0, 10); // Show top 10 recommendations

  console.log('Filtered combinations:', bestCombinations.length);

  // Enhance combinations with bridge day information
  const enhancedCombinations = useMemo(() => bestCombinations.map(combo => {
    // Check if this combination includes any bridge days
    const includesBridgeDay = combo.dates.some(date => 
      bridgeDays?.some(bd => isSameDay(bd.date instanceof Date ? bd.date : new Date(bd.date), date))
    );
    
    return {
      ...combo,
      includesBridgeDay
    };
  }), [bestCombinations, bridgeDays]);

  // Log combinations for debugging
  console.log('Enhanced combinations:', {
    total: enhancedCombinations.length,
    dates: enhancedCombinations.map(c => ({
      start: format(c.dates[0], 'yyyy-MM-dd'),
      end: format(c.dates[c.dates.length - 1], 'yyyy-MM-dd'),
      efficiency: c.efficiency,
      includesBridgeDay: c.includesBridgeDay,
      month: c.dates[0].getMonth() + 1
    }))
  });

  const getMatchingDays = (vacation: VacationPlan) => {
    const matchingVacations = otherPersonVacations.filter(otherVacation =>
      (vacation.start <= otherVacation.end && vacation.end >= otherVacation.start)
    );
    
    if (matchingVacations.length === 0) return 0;
    
    let matchingDays = 0;
    for (let current = new Date(vacation.start); current <= vacation.end; current.setDate(current.getDate() + 1)) {
      if (matchingVacations.some(mv => isWithinInterval(current, { start: mv.start, end: mv.end }))) {
        matchingDays++;
      }
    }
    return matchingDays;
  };

  return (
    <div className="space-y-4">
      {/* Bridge Day Opportunities */}
      {enhancedCombinations.length > 0 && (
        <div>
          <h4 className={`text-xs font-medium mb-2 ${colors.text}`}>
            Brückentag-Möglichkeiten
          </h4>
          <div className="space-y-1">
            {enhancedCombinations.map((combo, index) => {
              // Validate dates before rendering
              if (!combo.dates.every(isValidDate)) {
                console.error('Invalid bridge day dates:', combo.dates);
                return null;
              }

              return (
                <button
                  key={index}
                  className={`recommendation-item w-full text-left py-1.5 cursor-pointer transition-colors
                    ${(combo.gainedDays / combo.requiredDays >= 2 || combo.includesBridgeDay)
                      ? colors.bg 
                      : 'hover:bg-gray-50'}
                    focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      personId === 1 ? 'focus:ring-emerald-500' : 'focus:ring-cyan-500'
                    }`}
                  onClick={() => {
                    onAddVacation?.(combo.dates[0], combo.dates[combo.dates.length - 1]);
                    // Focus back to the first recommendation after a short delay
                    setTimeout(() => {
                      const firstRecommendation = document.querySelector(`[data-person="${personId}"] .recommendation-item`) as HTMLElement;
                      if (firstRecommendation) {
                        firstRecommendation.focus();
                      }
                    }, 100);
                  }}
                  onKeyDown={(e) => {
                    switch (e.key) {
                      case 'ArrowUp':
                        e.preventDefault();
                        const prev = e.currentTarget.previousElementSibling as HTMLElement;
                        if (prev?.classList.contains('recommendation-item')) {
                          prev.focus();
                        }
                        break;
                      case 'ArrowDown':
                        e.preventDefault();
                        const next = e.currentTarget.nextElementSibling as HTMLElement;
                        if (next?.classList.contains('recommendation-item')) {
                          next.focus();
                        }
                        break;
                      case 'Tab':
                        // Let the default tab behavior work
                        break;
                      default:
                        // Handle other keys as before
                        break;
                    }
                  }}
                  role="button"
                  aria-label={`Brückentag-Empfehlung: ${format(combo.dates[0], 'd.M.', { locale: de })} - ${format(combo.dates[combo.dates.length - 1], 'd.M.yy', { locale: de })}`}
                  tabIndex={0}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-700">
                      {format(combo.dates[0], 'd.M.', { locale: de })} - {format(combo.dates[combo.dates.length - 1], 'd.M.yy', { locale: de })}
                      <span className="ml-2 text-gray-500">
                        ({combo.requiredDays}d = {combo.gainedDays}d, +{Math.round((combo.gainedDays / combo.requiredDays - 1) * 100)}%)
                        {combo.includesBridgeDay && <span className="ml-1 text-orange-500">• Brückentag</span>}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Vacation List */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className={`text-xs font-medium ${colors.text}`}>
            Geplante Urlaube
          </h4>
          <span className="text-xs text-gray-500">
            {stats.requiredDays} von {availableVacationDays} Urlaubstagen
          </span>
        </div>
        {vacations.length === 0 ? (
          <div className="text-xs text-gray-500">
            Keine Urlaube geplant
          </div>
        ) : (
          <>
            <div className="space-y-1">
              {vacations.map(vacation => {
                // Validate dates before rendering
                if (!isValidDate(vacation.start) || !isValidDate(vacation.end)) {
                  console.error('Invalid vacation dates:', {
                    id: vacation.id,
                    start: vacation.start,
                    end: vacation.end
                  });
                  return null;
                }

                const matchingDays = getMatchingDays(vacation);
                const stats = vacationStats[vacation.id];
                const hasHolidays = eachDayOfInterval({ start: vacation.start, end: vacation.end })
                  .some(d => holidays.some(h => isSameDay(h.date, d)));

                return (
                  <div
                    key={vacation.id}
                    className={`flex items-center justify-between py-1.5 transition-colors ${
                      vacation.isVisible ? holidayColors[personId === 1 ? 'person1' : 'person2'].vacation : 'bg-gray-50'
                    }`}
                  >
                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={vacation.isVisible}
                        onChange={() => onToggleVisibility(vacation.id)}
                      />
                      <div className={`w-7 h-4 rounded-full peer bg-gray-200 ${colors.checked} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all`}></div>
                    </label>

                    {/* Vacation Info */}
                    <div className="flex-1 ml-2">
                      <div className="text-xs font-medium">
                        {format(vacation.start, 'd.M.', { locale: de })} - {format(vacation.end, 'd.M.yy', { locale: de })}
                        <span className="ml-1 text-gray-500">
                          ({stats.requiredDays}d Urlaub = {stats.gainedDays}d frei
                          {matchingDays > 0 && <span className="text-yellow-600"> • {matchingDays}d gemeinsam</span>})
                        </span>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => onRemove(vacation.id)}
                      className="ml-2 p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                      title="Löschen"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Total Days Summary */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Freie Tage insgesamt:</span>
                <span className={`font-medium ${colors.text}`}>
                  {stats.requiredDays}d Urlaub = {stats.gainedDays}d frei ({Math.round((stats.gainedDays / stats.requiredDays) * 100)}% Effizienz)
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 