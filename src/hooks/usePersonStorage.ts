import Cookies from 'js-cookie'
import { PersonInfo } from '../types/person'
import { calculateVacationEfficiency } from '../utils/vacationEfficiency'

const PERSON_STORAGE_KEY = 'holiday-planner-persons'

const isValidDate = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};

export const usePersonStorage = () => {
  const savePersons = (persons: PersonInfo) => {
    const dataToSave = {
      ...persons,
      person2: persons.person2 ? {
        ...persons.person2,
        vacationPlans: persons.person2.vacationPlans || []
      } : null
    };
    
    Cookies.set(PERSON_STORAGE_KEY, JSON.stringify(dataToSave), { expires: 30 })
  }

  const loadPersons = (): PersonInfo | null => {
    const stored = Cookies.get(PERSON_STORAGE_KEY)
    if (!stored) return null

    try {
      const persons = JSON.parse(stored) as PersonInfo
      
      // Convert date strings back to Date objects and ensure efficiency is calculated
      if (persons.person1.vacationPlans) {
        persons.person1.vacationPlans = persons.person1.vacationPlans
          .map(plan => {
            try {
              const start = new Date(plan.start);
              const end = new Date(plan.end);
              
              // Validate the dates
              if (!isValidDate(start) || !isValidDate(end)) {
                console.error('Invalid dates in vacation plan:', { plan });
                return null;
              }
              
              const planWithDates = {
                ...plan,
                start,
                end
              };
              
              return calculateVacationEfficiency(planWithDates);
            } catch (error) {
              console.error('Error processing vacation plan:', error, plan);
              return null;
            }
          })
          .filter((plan): plan is NonNullable<typeof plan> => plan !== null);
      }
      
      if (persons.person2?.vacationPlans) {
        persons.person2.vacationPlans = persons.person2.vacationPlans
          .map(plan => {
            try {
              const start = new Date(plan.start);
              const end = new Date(plan.end);
              
              // Validate the dates
              if (!isValidDate(start) || !isValidDate(end)) {
                console.error('Invalid dates in vacation plan:', { plan });
                return null;
              }
              
              const planWithDates = {
                ...plan,
                start,
                end
              };
              
              return calculateVacationEfficiency(planWithDates);
            } catch (error) {
              console.error('Error processing vacation plan:', error, plan);
              return null;
            }
          })
          .filter((plan): plan is NonNullable<typeof plan> => plan !== null);
      }
      
      return persons;
    } catch (error) {
      console.error('Error parsing stored persons:', error)
      return null
    }
  }

  const clearPersons = () => {
    Cookies.remove(PERSON_STORAGE_KEY)
  }

  return { savePersons, loadPersons, clearPersons }
} 