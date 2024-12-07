import { VacationPlan } from '../types/vacationPlan';
import { Holiday } from '../types/holiday';
import { format, differenceInDays, eachDayOfInterval, isWeekend, isSameDay, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { de } from 'date-fns/locale';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

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

  private static createICSFile(events: ICSEvent[]): string {
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

  private static async downloadPDF(pdf: jsPDF, filename: string) {
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

  private static createHRDocument(
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

  private static createCelebrationDocument(
    vacationPlans: VacationPlan[],
    personId: 1 | 2,
    holidays: Holiday[],
    otherPersonHolidays: Holiday[]
  ): jsPDF {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const stats = this.calculateVacationStats(vacationPlans, holidays);

    // Header with title
    pdf.setFontSize(24);
    pdf.text('Urlaubsplanung 2025', 105, 20, { align: 'center' });
    
    // Efficiency score under the title
    const efficiencyPercentage = Math.round((stats.efficiency - 1) * 100);
    pdf.setFontSize(14);
    pdf.text(`${efficiencyPercentage}% mehr freie Tage!`, 105, 30, { align: 'center' });

    // Calculate shared holidays
    const sharedHolidays = holidays.filter(h1 => 
      h1.type === 'public' && 
      otherPersonHolidays.some(h2 => 
        h2.type === 'public' && 
        isSameDay(new Date(h1.date), new Date(h2.date))
      )
    );

    // Show shared holidays info if any exist
    if (sharedHolidays.length > 0) {
      pdf.setFontSize(12);
      pdf.text(`${sharedHolidays.length} gemeinsame Feiertage gefunden!`, 105, 38, { align: 'center' });
    }

    // Stats Overview in a compact table
    pdf.setFontSize(12);
    const statsTable = [
      ['Urlaubstage', 'Wochenenden', 'Feiertage', 'Gesamt'],
      [
        `${stats.workDays}`,
        `${stats.weekendDays}`,
        `${stats.holidayDays}`,
        `${stats.totalDays}`
      ]
    ];

    (pdf as any).autoTable({
      startY: 45,
      head: [statsTable[0]],
      body: [statsTable[1]],
      theme: 'grid',
      headStyles: { 
        fillColor: [100, 149, 237],
        fontSize: 10
      },
      styles: {
        fontSize: 12,
        cellPadding: 3,
      }
    });

    // Detailed Vacation Plans
    let currentY = (pdf as any).lastAutoTable.finalY + 15;

    // Helper function to add a vacation block
    const addVacationBlock = (vacation: VacationPlan, isOtherPerson: boolean = false) => {
      const days = eachDayOfInterval({ start: vacation.start, end: vacation.end });
      const totalDays = days.length;
      let workDays = 0;
      let weekendDays = 0;
      let holidayDays = 0;
      const relevantHolidays = isOtherPerson ? otherPersonHolidays : holidays;

      days.forEach(date => {
        if (isWeekend(date)) {
          weekendDays++;
        } else if (relevantHolidays.some(h => h.type === 'public' && isSameDay(new Date(h.date), date))) {
          holidayDays++;
        } else {
          workDays++;
        }
      });

      // Check if this vacation overlaps with the other person's vacations
      const otherVacations = isOtherPerson ? vacationPlans : [];
      let sharedDays = 0;
      days.forEach(date => {
        if (otherVacations.some(v => 
          v.isVisible && isWithinInterval(date, { start: v.start, end: v.end })
        )) {
          sharedDays++;
        }
      });

      const blockHeight = sharedDays > 0 ? 40 : 35;
      if (currentY + blockHeight > 270) {
        pdf.addPage();
        currentY = 20;
      }

      // Vacation period header
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(
        `${format(vacation.start, 'd. MMMM', { locale: de })} - ${format(vacation.end, 'd. MMMM yyyy', { locale: de })}`,
        20,
        currentY
      );
      
      // Vacation details
      pdf.setFontSize(10);
      pdf.text(`Person ${isOtherPerson ? (personId === 1 ? '2' : '1') : personId}`, 20, currentY + 7);
      pdf.text(`Urlaubstage: ${workDays}`, 20, currentY + 14);
      pdf.text(`Wochenenden: ${weekendDays}`, 80, currentY + 14);
      pdf.text(`Feiertage: ${holidayDays}`, 140, currentY + 14);
      
      if (vacation.efficiency) {
        const efficiencyPercent = Math.round((vacation.efficiency.gainedDays / vacation.efficiency.requiredDays) * 100);
        pdf.text(`Effizienz: ${efficiencyPercent}%`, 20, currentY + 21);
      }

      if (sharedDays > 0) {
        pdf.setTextColor(255, 0, 0);
        pdf.text(`❤️ ${sharedDays} gemeinsame Tage`, 20, currentY + 28);
        pdf.setTextColor(0, 0, 0);
      }

      currentY += blockHeight;
    };

    // Add vacation blocks for both persons
    pdf.setFontSize(14);
    pdf.text('Urlaubsübersicht', 20, currentY);
    currentY += 10;

    const sortedVacations = [...vacationPlans].sort((a, b) => a.start.getTime() - b.start.getTime());
    
    sortedVacations.forEach(vacation => {
      if (vacation.isVisible) {
        addVacationBlock(vacation);
      }
    });

    // Add a small spacing between the two persons' vacations
    currentY += 5;

    // Add other person's vacations if available
    const otherPersonVacations = sortedVacations.filter(v => v.personId !== personId);
    if (otherPersonVacations.length > 0) {
      otherPersonVacations.forEach(vacation => {
        if (vacation.isVisible) {
          addVacationBlock(vacation, true);
        }
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
    vacationPlans: VacationPlan[],
    holidays: Holiday[],
    personId: 1 | 2,
    type: 'ics' | 'hr' | 'celebration',
    otherPersonHolidays?: Holiday[]
  ) {
    switch (type) {
      case 'ics':
        const icsContent = this.exportToICS(vacationPlans, holidays, personId);
        this.downloadFile(icsContent, 'urlaub.ics', 'text/calendar');
        break;
      case 'hr':
        const hrPdf = this.createHRDocument(vacationPlans, personId, holidays);
        hrPdf.save('urlaubsantrag.pdf');
        break;
      case 'celebration':
        const celebrationPdf = this.createCelebrationDocument(vacationPlans, personId, holidays, otherPersonHolidays || []);
        celebrationPdf.save('urlaubsplanung.pdf');
        break;
    }
  }
} 