import { GermanState } from './GermanState';
import { VacationPlan } from './vacationPlan';

export interface Person {
  id: 1 | 2;  // Entweder Person 1 oder Person 2
  selectedState: GermanState;
  availableVacationDays: number;
  vacationPlans: VacationPlan[];
}

export interface PersonInfo {
  person1: Person;
  person2: Person | null;
} 