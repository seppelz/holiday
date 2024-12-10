import { VacationPlan } from '../types/vacationPlan';
import { Holiday } from '../types/holiday';
import { format, differenceInDays, eachDayOfInterval, isWeekend, isSameDay, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { de } from 'date-fns/locale';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { GermanState, stateNames } from '../types/GermanState';

interface ICSEvent {
  start: Date;
  end: Date;
  summary: string;
  description?: string;
  categories?: string[];
}

export class ExportService {
  private static formatICSDate(date: Date): string {
    return format(date, "yyyyMMdd'T'HHmmss'Z'");
  }

  private static createICSEvent(event: ICSEvent): string {
    const lines: string[] = [
      'BEGIN:VEVENT',
      `DTSTART:${this.formatICSDate(event.start)}`,
      `DTEND:${this.formatICSDate(event.end)}`,
      `SUMMARY:${event.summary}`,
      `UID:${Math.random().toString(36).substring(2)}@holiday-planner.app`
    ];

    if (event.description) {
      lines.push(`DESCRIPTION:${event.description}`);
    }

    if (event.categories && event.categories.length > 0) {
      lines.push(`CATEGORIES:${event.categories.join(',')}`);
    }

    lines.push('END:VEVENT');
    return lines.join('\r\n');
  }

  static createICSFile(events: ICSEvent[]): string {
    const header = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Holiday Planner//NONSGML v1.0//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ].join('\r\n');

    const footer = 'END:VCALENDAR';

    const eventStrings = events.map(event => this.createICSEvent(event));
    return `${header}\r\n${eventStrings.join('\r\n')}\r\n${footer}`;
  }

  private static calculateVacationStats(vacationPlans: VacationPlan[], holidays: Holiday[]) {
    let totalDays = 0;
    let workDays = 0;
    let weekendDays = 0;
    let holidayDays = 0;

    vacationPlans.forEach(vacation => {
      if (!vacation.isVisible) return;

      const days = eachDayOfInterval({ start: vacation.start, end: vacation.end });
      totalDays += days.length;

      days.forEach(date => {
        if (isWeekend(date)) {
          weekendDays++;
        } else if (holidays.some(h => h.type === 'public' && isSameDay(new Date(h.date), date))) {
          holidayDays++;
        } else {
          workDays++;
        }
      });
    });

    return {
      totalDays,
      workDays,
      weekendDays,
      holidayDays,
      efficiency: totalDays / workDays
    };
  }

  static async downloadPDF(pdf: jsPDF, filename: string) {
    pdf.save(filename);
  }

  private static createPDFWithFont(): jsPDF {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      filters: ["ASCIIHexEncode"]
    });

    // Add the font that supports German characters
    pdf.addFont('/fonts/Helvetica.ttf', 'Helvetica', 'normal');
    pdf.setFont('Helvetica');
    
    return pdf;
  }

  static createHRDocument(
    vacationPlans: VacationPlan[],
    personId: 1 | 2,
    holidays: Holiday[]
  ): jsPDF {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const stats = this.calculateVacationStats(vacationPlans, holidays);

    // Header
    pdf.setFontSize(20);
    pdf.text('Urlaubsantrag', 105, 20, { align: 'center' });

    // Personal Info
    pdf.setFontSize(12);
    pdf.text(`Person: ${personId}`, 20, 40);
    pdf.text(`Verfügbare Urlaubstage: ${stats.workDays}`, 20, 50);

    // Vacation Table
    const tableData = vacationPlans
      .filter(v => v.isVisible)
      .map(vacation => [
        format(vacation.start, 'dd.MM.yyyy', { locale: de }),
        format(vacation.end, 'dd.MM.yyyy', { locale: de }),
        `${differenceInDays(vacation.end, vacation.start) + 1} Tage`
      ]);

    (pdf as any).autoTable({
      startY: 60,
      head: [['Von', 'Bis', 'Dauer']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [66, 139, 202] },
      styles: {
        font: 'helvetica'
      }
    });

    // Signature fields
    const finalY = (pdf as any).lastAutoTable.finalY + 20;
    pdf.text('Unterschrift Mitarbeiter:', 20, finalY);
    pdf.text('_____________________', 20, finalY + 10);
    pdf.text('Unterschrift Vorgesetzter:', 120, finalY);
    pdf.text('_____________________', 120, finalY + 10);

    return pdf;
  }

  static createCelebrationDocument(
    vacationPlans: VacationPlan[],
    personId: 1 | 2,
    holidays: Holiday[],
    otherPersonVacations: VacationPlan[],
    otherPersonHolidays: Holiday[],
    options: {
      person1State: GermanState;
      person2State?: GermanState;
      showSharedAnalysis: boolean;
    }
  ): jsPDF {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Header with title
    pdf.setFontSize(24);
    pdf.text('Urlaubsplanung 2025', 105, 20, { align: 'center' });

    let currentY = 30;

    // Show state information
    pdf.setFontSize(12);
    pdf.text(`Person 1: ${stateNames[options.person1State]}`, 20, currentY);
    if (options.showSharedAnalysis && options.person2State) {
      pdf.text(`Person 2: ${stateNames[options.person2State]}`, 120, currentY);
    }
    currentY += 15;

    // Person 1 Vacation Table
    pdf.setFontSize(14);
    pdf.text('Urlaub Person 1', 105, currentY, { align: 'center' });
    currentY += 10;

    const person1Vacations = vacationPlans
      .filter(v => v.isVisible)
      .sort((a, b) => a.start.getTime() - b.start.getTime());

    if (person1Vacations.length > 0) {
      (pdf as any).autoTable({
        startY: currentY,
        head: [['Von', 'Bis', 'Dauer']],
        body: person1Vacations.map(vacation => [
          format(vacation.start, 'dd.MM.yyyy', { locale: de }),
          format(vacation.end, 'dd.MM.yyyy', { locale: de }),
          `${differenceInDays(vacation.end, vacation.start) + 1} Tage`
        ]),
        theme: 'grid',
        headStyles: { fillColor: [46, 204, 113] }, // Green for Person 1
        styles: { fontSize: 10 }
      });
      currentY = (pdf as any).lastAutoTable.finalY + 15;
    } else {
      pdf.setFontSize(10);
      pdf.text('Keine Urlaubstage geplant', 20, currentY);
      currentY += 15;
    }

    // Person 2 Vacation Table (if exists)
    if (options.showSharedAnalysis && otherPersonVacations.length > 0) {
      pdf.setFontSize(14);
      pdf.text('Urlaub Person 2', 105, currentY, { align: 'center' });
      currentY += 10;

      const person2Vacations = otherPersonVacations
        .filter(v => v.isVisible)
        .sort((a, b) => a.start.getTime() - b.start.getTime());

      if (person2Vacations.length > 0) {
        (pdf as any).autoTable({
          startY: currentY,
          head: [['Von', 'Bis', 'Dauer']],
          body: person2Vacations.map(vacation => [
            format(vacation.start, 'dd.MM.yyyy', { locale: de }),
            format(vacation.end, 'dd.MM.yyyy', { locale: de }),
            `${differenceInDays(vacation.end, vacation.start) + 1} Tage`
          ]),
          theme: 'grid',
          headStyles: { fillColor: [52, 152, 219] }, // Blue for Person 2
          styles: { fontSize: 10 }
        });
        currentY = (pdf as any).lastAutoTable.finalY + 15;
      } else {
        pdf.setFontSize(10);
        pdf.text('Keine Urlaubstage geplant', 20, currentY);
        currentY += 15;
      }
    }

    // Shared Vacation Periods
    if (options.showSharedAnalysis) {
      pdf.setFontSize(14);
      pdf.text('Gemeinsame Urlaubszeiten', 105, currentY, { align: 'center' });
      currentY += 10;

      const sharedPeriods = vacationPlans.reduce((periods: any[], vacation) => {
        if (!vacation.isVisible) return periods;
        
        otherPersonVacations.forEach(otherVacation => {
          if (!otherVacation.isVisible) return;
          
          const start = new Date(Math.max(vacation.start.getTime(), otherVacation.start.getTime()));
          const end = new Date(Math.min(vacation.end.getTime(), otherVacation.end.getTime()));
          
          if (start <= end) {
            periods.push({ start, end });
          }
        });
        
        return periods;
      }, []).sort((a: any, b: any) => a.start.getTime() - b.start.getTime());

      if (sharedPeriods.length > 0) {
        (pdf as any).autoTable({
          startY: currentY,
          head: [['Von', 'Bis', 'Dauer']],
          body: sharedPeriods.map(period => [
            format(period.start, 'dd.MM.yyyy', { locale: de }),
            format(period.end, 'dd.MM.yyyy', { locale: de }),
            `${differenceInDays(period.end, period.start) + 1} Tage`
          ]),
          theme: 'grid',
          headStyles: { fillColor: [255, 99, 132] }, // Pink for shared time
          styles: { fontSize: 10 }
        });
        currentY = (pdf as any).lastAutoTable.finalY + 15;
      } else {
        pdf.setFontSize(10);
        pdf.text('Keine gemeinsamen Urlaubszeiten', 20, currentY);
        currentY += 15;
      }
    }

    // Statistics Section
    pdf.setFontSize(16);
    pdf.text('Urlaubsstatistik', 105, currentY, { align: 'center' });
    currentY += 15;

    // Person 1 Statistics
    const stats1 = this.calculateVacationStats(vacationPlans, holidays);
    pdf.setFontSize(12);
    pdf.text('Person 1:', 20, currentY);
    currentY += 10;

    (pdf as any).autoTable({
      startY: currentY,
      head: [['Urlaubstage', 'Wochenenden', 'Feiertage', 'Gesamt']],
      body: [[
        `${stats1.workDays}`,
        `${stats1.weekendDays}`,
        `${stats1.holidayDays}`,
        `${stats1.totalDays}`
      ]],
      theme: 'grid',
      headStyles: { fillColor: [46, 204, 113] },
      styles: { fontSize: 10 }
    });
    currentY = (pdf as any).lastAutoTable.finalY + 15;

    // Person 2 Statistics
    if (options.showSharedAnalysis) {
      const stats2 = this.calculateVacationStats(otherPersonVacations, otherPersonHolidays);
      pdf.setFontSize(12);
      pdf.text('Person 2:', 20, currentY);
      currentY += 10;

      (pdf as any).autoTable({
        startY: currentY,
        head: [['Urlaubstage', 'Wochenenden', 'Feiertage', 'Gesamt']],
        body: [[
          `${stats2.workDays}`,
          `${stats2.weekendDays}`,
          `${stats2.holidayDays}`,
          `${stats2.totalDays}`
        ]],
        theme: 'grid',
        headStyles: { fillColor: [52, 152, 219] },
        styles: { fontSize: 10 }
      });
    }

    return pdf;
  }

  static exportToICS(
    vacationPlans: VacationPlan[],
    holidays: Holiday[],
    personId: 1 | 2
  ): string {
    const events: ICSEvent[] = vacationPlans
      .filter(vacation => vacation.isVisible)
      .map(vacation => ({
        start: vacation.start,
        end: vacation.end,
        summary: `Urlaub Person ${personId}`,
        description: vacation.efficiency ? 
          `Urlaubstage: ${vacation.efficiency.requiredDays}, Freie Tage: ${vacation.efficiency.gainedDays}` : 
          undefined,
        categories: ['Urlaub']
      }));

    return this.createICSFile(events);
  }

  private static downloadFile(content: string, filename: string, type: string) {
    const blob = new Blob([content], { type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static async exportVacationPlan(
    vacations: VacationPlan[],
    holidays: Holiday[],
    personId: 1 | 2,
    type: 'ics' | 'hr' | 'celebration',
    otherPersonVacations: VacationPlan[] = [],
    options?: {
      person1State?: GermanState;
      person2State?: GermanState;
    }
  ) {
    switch (type) {
      case 'ics':
        const icsContent = this.exportToICS(vacations, holidays, personId);
        this.downloadFile(icsContent, 'urlaub.ics', 'text/calendar');
        break;
      case 'hr':
        const hrPdf = this.createHRDocument(vacations, personId, holidays);
        hrPdf.save('urlaubsantrag.pdf');
        break;
      case 'celebration':
        const celebrationPdf = this.createCelebrationDocument(
          vacations,
          personId,
          holidays,
          otherPersonVacations,
          [],
          {
            person1State: personId === 1 ? GermanState.BE : GermanState.BE,
            showSharedAnalysis: false
          }
        );
        celebrationPdf.save('urlaubsplanung.pdf');
        break;
    }
  }
} 