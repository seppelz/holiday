import { Holiday } from '../types/holiday';
import { BridgeDayRecommendation } from '../types/vacationPlan';
import { addDays, differenceInBusinessDays, isWeekend, isSameDay } from 'date-fns';

export class BridgeDayAnalyzer {
  private holidays: Holiday[];
  private maxVacationDays: number;

  constructor(holidays: Holiday[], maxVacationDays: number = 2) {
    this.holidays = holidays;
    this.maxVacationDays = maxVacationDays;
  }

  public analyzeYear(year: number): BridgeDayRecommendation[] {
    const recommendations: BridgeDayRecommendation[] = [];
    const yearHolidays = this.holidays.filter(h => new Date(h.date).getFullYear() === year);

    // Analysiere jede Kombination von Feiertagen
    for (let i = 0; i < yearHolidays.length; i++) {
      const holiday1 = yearHolidays[i];
      const date1 = new Date(holiday1.date);

      // Einzelner Feiertag Analyse
      this.analyzeSingleHoliday(date1, holiday1.name).forEach(rec => 
        recommendations.push(rec)
      );

      // Kombinationen von zwei Feiertagen
      for (let j = i + 1; j < yearHolidays.length; j++) {
        const holiday2 = yearHolidays[j];
        const date2 = new Date(holiday2.date);

        this.analyzeHolidayPair(date1, date2, holiday1.name, holiday2.name).forEach(rec =>
          recommendations.push(rec)
        );
      }
    }

    // Markiere die effizientesten Optionen
    this.markOptimalRecommendations(recommendations);

    return recommendations;
  }

  private analyzeSingleHoliday(holidayDate: Date, holidayName: string): BridgeDayRecommendation[] {
    const recommendations: BridgeDayRecommendation[] = [];
    
    // Prüfe Tage vor und nach dem Feiertag
    [-2, -1, 1, 2].forEach(offset => {
      const targetDate = addDays(holidayDate, offset);
      if (!isWeekend(targetDate) && !this.isHoliday(targetDate)) {
        const rec = this.calculateBridgeDayEfficiency(
          [targetDate],
          holidayDate,
          `Brückentag ${offset < 0 ? 'vor' : 'nach'} ${holidayName}`
        );
        if (rec) recommendations.push(rec);
      }
    });

    return recommendations;
  }

  private analyzeHolidayPair(
    date1: Date,
    date2: Date,
    name1: string,
    name2: string
  ): BridgeDayRecommendation[] {
    const recommendations: BridgeDayRecommendation[] = [];
    const daysBetween = differenceInBusinessDays(date2, date1);

    if (daysBetween <= this.maxVacationDays && daysBetween > 0) {
      const bridgeDays: Date[] = [];
      let currentDate = addDays(date1, 1);

      while (currentDate < date2) {
        if (!isWeekend(currentDate) && !this.isHoliday(currentDate)) {
          bridgeDays.push(currentDate);
        }
        currentDate = addDays(currentDate, 1);
      }

      if (bridgeDays.length <= this.maxVacationDays) {
        const rec = this.calculateBridgeDayEfficiency(
          bridgeDays,
          date1,
          `Brückentage zwischen ${name1} und ${name2}`
        );
        if (rec) recommendations.push(rec);
      }
    }

    return recommendations;
  }

  private calculateBridgeDayEfficiency(
    bridgeDays: Date[],
    referenceDate: Date,
    description: string
  ): BridgeDayRecommendation | null {
    if (bridgeDays.length > this.maxVacationDays) return null;

    const requiredVacationDays = bridgeDays.length;
    let gainedFreeDays = bridgeDays.length;

    // Zähle Wochenenden und Feiertage im Zeitraum
    let currentDate = bridgeDays[0];
    const endDate = bridgeDays[bridgeDays.length - 1];

    while (currentDate <= endDate) {
      if (isWeekend(currentDate) || this.isHoliday(currentDate)) {
        gainedFreeDays++;
      }
      currentDate = addDays(currentDate, 1);
    }

    const efficiency = gainedFreeDays / requiredVacationDays;

    return {
      dates: bridgeDays,
      requiredVacationDays,
      gainedFreeDays,
      efficiency,
      description,
      isOptimal: false // Wird später gesetzt
    };
  }

  private isHoliday(date: Date): boolean {
    return this.holidays.some(holiday => isSameDay(new Date(holiday.date), date));
  }

  private markOptimalRecommendations(recommendations: BridgeDayRecommendation[]): void {
    // Sortiere nach Effizienz
    recommendations.sort((a, b) => b.efficiency - a.efficiency);

    // Markiere die Top 25% als optimal
    const optimalCount = Math.ceil(recommendations.length * 0.25);
    recommendations.slice(0, optimalCount).forEach(rec => {
      rec.isOptimal = true;
    });
  }
} 