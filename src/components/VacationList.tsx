import React, { useMemo } from 'react';
import { format, eachDayOfInterval, isWeekend, isWithinInterval, isSameDay, addDays, subDays, differenceInDays } from 'date-fns';
import { de } from 'date-fns/locale';
import { VacationPlan } from '../types/vacationPlan';
import { Holiday } from '../types/holiday';
import { holidayColors, gradientColors } from '../constants/colors';
import { analyzeVacationOpportunities, VacationRecommendation } from '../utils/smartVacationAnalysis';
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
  state,
}) => {
  const colors = personId === 1 ? holidayColors.person1.ui : holidayColors.person2.ui;

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

  return (
    <div className="space-y-4">
      {/* Bridge Day Opportunities */}
      {enhancedRecommendations.length > 0 && (
        <div>
          <h4 className={`text-xs font-medium mb-2 ${colors.text}`}>
            Brückentag-Möglichkeiten
          </h4>
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
                  onClick={() => onAddVacation?.(rec.periodStart, rec.periodEnd)}
                  role="button"
                  aria-label={`Brückentag-Empfehlung: ${rec.displayRange}`}
                  tabIndex={0}
                >
                  <div className="text-sm text-gray-700">
                    {rec.displayRange} ({rec.efficiencyDisplay}) ({formatVacationDays(rec.vacationDays)})
                    {rec.includesBridgeDay && <span className="ml-1 text-orange-500">• Brückentag</span>}
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

                return (
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
                        {format(stats.displayStart, 'd.M.', { locale: de })} - {format(stats.displayEnd, 'd.M.yy', { locale: de })}
                        <span className="ml-1 text-gray-500">
                          ({stats.requiredDays}d Urlaub = {stats.gainedDays}d frei
                          {matchingDays > 0 && <span className="text-yellow-600"> • {matchingDays}d gemeinsam</span>})
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
                );
              })}
            </div>

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