import React, { useMemo } from 'react';
import { format, eachDayOfInterval, isWeekend, isWithinInterval, isSameDay, addDays, subDays, differenceInDays } from 'date-fns';
import { de } from 'date-fns/locale';
import { VacationPlan } from '../types/vacationPlan';
import { GermanState } from '../types/GermanState';
import { Holiday } from '../types/holiday';
import { holidayColors, gradientColors } from '../constants/colors';
import { analyzeVacationOpportunities, VacationRecommendation } from '../utils/smartVacationAnalysis';
import { calculateVacationDays } from '../utils/vacationCalculator';
import { VacationDaysInput } from '../components/VacationDaysInput';

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
  onAvailableDaysChange?: (days: number) => void;
  state: GermanState;
}

const isValidDate = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};

const calculateVacationStats = (vacation: VacationPlan, holidays: Holiday[]) => {
  try {
    if (!isValidDate(vacation.start) || !isValidDate(vacation.end)) {
      console.error('Invalid vacation dates:', {
        start: vacation.start,
        end: vacation.end
      });
      return { requiredDays: 0, gainedDays: 0, displayStart: vacation.start, displayEnd: vacation.end };
    }

    // Calculate required days (workdays that need to be taken off)
    const allDays = eachDayOfInterval({ start: vacation.start, end: vacation.end });
    const requiredDays = allDays.reduce((count, d) => {
      if (isWeekend(d)) return count;
      const isPublicHoliday = holidays.some(h => 
        h.type === 'public' && isSameDay(h.date, d)
      );
      return isPublicHoliday ? count : count + 1;
    }, 0);

    // Find the full free period including surrounding weekends/holidays
    let displayStart = vacation.start;
    let displayEnd = vacation.end;

    // Look backwards for connected free days
    let currentDay = subDays(vacation.start, 1);
    while (isWeekend(currentDay) || holidays.some(h => h.type === 'public' && isSameDay(h.date, currentDay))) {
      displayStart = currentDay;
      currentDay = subDays(currentDay, 1);
    }

    // Look forwards for connected free days
    currentDay = addDays(vacation.end, 1);
    while (isWeekend(currentDay) || holidays.some(h => h.type === 'public' && isSameDay(h.date, currentDay))) {
      displayEnd = currentDay;
      currentDay = addDays(currentDay, 1);
    }

    // Calculate total gained days in the full period
    const gainedDays = differenceInDays(displayEnd, displayStart) + 1;
    
    return { requiredDays, gainedDays, displayStart, displayEnd };
  } catch (error) {
    console.error('Error calculating vacation stats:', error);
    return { 
      requiredDays: 0, 
      gainedDays: 0, 
      displayStart: vacation.start, 
      displayEnd: vacation.end 
    };
  }
};

const formatVacationDays = (vacationDays: Date[]): string => {
  return vacationDays
    .sort((a, b) => a.getTime() - b.getTime())
    .map(d => format(d, 'dd.MM.'))
    .join(' + ');
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
  onAvailableDaysChange,
  state,
}) => {
  const colors = personId === 1 ? holidayColors.person1.ui : holidayColors.person2.ui;
  const { usedDays, gainedDays } = calculateVacationDays(vacations, holidays);
  const isOverLimit = usedDays > availableVacationDays;
  
  // Calculate total efficiency
  const totalStats = vacations.reduce((acc, vacation) => {
    const stats = calculateVacationStats(vacation, holidays);
    return {
      requiredDays: acc.requiredDays + stats.requiredDays,
      gainedDays: acc.gainedDays + stats.gainedDays
    };
  }, { requiredDays: 0, gainedDays: 0 });

  const efficiency = totalStats.requiredDays > 0 ? totalStats.gainedDays / totalStats.requiredDays : 1;

  const vacationStats = useMemo(() => {
    return vacations.reduce((acc, vacation) => {
      const stats = calculateVacationStats(vacation, holidays);
      acc[vacation.id] = stats;
      return acc;
    }, {} as Record<string, { requiredDays: number; gainedDays: number; displayStart: Date; displayEnd: Date }>);
  }, [vacations, holidays]);

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

  const bestCombinations = useMemo(() => {
    if (!holidays || !state) return [];
    
    const recommendations = analyzeVacationOpportunities(holidays, state);
    
    return recommendations.filter(rec => {
      return !vacations.some(vacation => 
        isWithinInterval(rec.startDate, { start: vacation.start, end: vacation.end }) ||
        isWithinInterval(rec.endDate, { start: vacation.start, end: vacation.end })
      );
    });
  }, [holidays, state, vacations]);

  const enhancedRecommendations = useMemo(() => bestCombinations.map(rec => {
    const includesBridgeDay = bridgeDays?.some(bd => 
      isSameDay(bd.date instanceof Date ? bd.date : new Date(bd.date), rec.startDate) ||
      isSameDay(bd.date instanceof Date ? bd.date : new Date(bd.date), rec.endDate)
    );
    
    return {
      ...rec,
      includesBridgeDay
    };
  }), [bestCombinations, bridgeDays]);

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

  const handleRecommendationClick = (rec: VacationRecommendation) => {
    if (onAddVacation && rec.startDate && rec.endDate) {
      onAddVacation(rec.startDate, rec.endDate);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Top Section */}
      <div className="flex-none">
        {/* Vacation Days Input and Progress Combined */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <VacationDaysInput
                value={availableVacationDays}
                onChange={(days) => onAvailableDaysChange?.(days)}
                personId={personId}
              />
              <span className={`text-sm font-medium ${isOverLimit ? 'text-red-600' : colors.text}`}>
                {usedDays} verplant
              </span>
            </div>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${
                  isOverLimit ? 'bg-red-500' : colors.bg.replace('bg-', '')
                }`}
                style={{ width: `${Math.min(100, (usedDays / availableVacationDays) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Lists Section */}
      <div className="flex-1 mt-4 overflow-hidden flex flex-col min-h-0">
        {/* Bridge Day Opportunities */}
        {enhancedRecommendations.length > 0 && (
          <div className="flex flex-col min-h-0">
            <h4 className={`text-xs font-medium mb-2 ${colors.text} flex-none`}>
              Brückentag-Möglichkeiten
            </h4>
            <div className="overflow-y-auto flex-1 pr-2 -mr-2">
              <div className="space-y-1">
                {enhancedRecommendations.map((rec, index) => {
                  if (!isValidDate(rec.startDate) || !isValidDate(rec.endDate)) {
                    console.error('Invalid recommendation dates:', rec);
                    return null;
                  }

                  return (
                    <button
                      key={index}
                      className={`recommendation-item w-full text-left py-1.5 px-2 cursor-pointer transition-colors
                        ${rec.includesBridgeDay ? 'bg-emerald-50' : 'hover:bg-gray-50'}
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
                      onClick={() => handleRecommendationClick(rec)}
                      role="button"
                      aria-label={`Brückentag-Empfehlung: ${rec.displayRange}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm text-gray-700">
                            {rec.displayRange}
                          </div>
                          <div className="text-xs text-gray-500">
                            {rec.efficiencyDisplay}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Planned Vacations */}
        <div className="mt-4 flex-1 overflow-y-auto">
          <h4 className={`text-xs font-medium mb-2 ${colors.text} flex-none`}>
            Geplante Urlaube
          </h4>
          <div className="space-y-2 pr-2 -mr-2">
            {vacations.map((vacation) => (
              <div
                key={vacation.id}
                className={`flex items-center justify-between py-1.5 transition-colors ${
                  vacation.isVisible ? holidayColors[personId === 1 ? 'person1' : 'person2'].vacation : 'bg-gray-50'
                }`}
              >
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={vacation.isVisible}
                    onChange={() => onToggleVisibility(vacation.id)}
                  />
                  <div className={`w-7 h-4 rounded-full peer bg-gray-200 ${colors.checked} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all`}></div>
                </label>

                <div className="flex-1 ml-2">
                  <div className="text-xs font-medium">
                    {format(vacationStats[vacation.id].displayStart, 'd.M.', { locale: de })} - {format(vacationStats[vacation.id].displayEnd, 'd.M.yy', { locale: de })}
                    <span className="ml-1 text-gray-500">
                      ({vacationStats[vacation.id].requiredDays}d Urlaub = {vacationStats[vacation.id].gainedDays}d frei)
                    </span>
                  </div>
                </div>

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
            ))}
            {vacations.length === 0 && (
              <div className="text-xs text-gray-500">
                Noch keine Urlaube geplant
              </div>
            )}
          </div>
        </div>

        {/* Total Free Days Summary - After Planned Vacations */}
        <div className="mt-4 flex-none bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Freie Tage insgesamt</h4>
                <p className="text-xs text-gray-500 mt-0.5">Inklusive Wochenenden & Feiertage</p>
              </div>
              <div className={`text-2xl font-bold ${colors.text}`}>
                {gainedDays}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <span>{usedDays} Urlaubstage</span>
              <span>{gainedDays - usedDays} zusätzliche freie Tage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 