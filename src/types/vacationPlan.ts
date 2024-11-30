export interface VacationPlan {
  id: string;
  start: Date;
  end: Date;
  description?: string;
  isVisible: boolean;
} 