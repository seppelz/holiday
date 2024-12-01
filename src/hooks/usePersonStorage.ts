import Cookies from 'js-cookie'
import { PersonInfo } from '../types/person'

const PERSON_STORAGE_KEY = 'holiday-planner-persons'

export const usePersonStorage = () => {
  const savePersons = (persons: PersonInfo) => {
    Cookies.set(PERSON_STORAGE_KEY, JSON.stringify(persons), { expires: 30 }) // 30 Tage
  }

  const loadPersons = (): PersonInfo | null => {
    const stored = Cookies.get(PERSON_STORAGE_KEY)
    if (!stored) return null

    try {
      const persons = JSON.parse(stored) as PersonInfo
      // Konvertiere Datums-Strings zurück zu Date Objekten
      if (persons.person1.vacationPlans) {
        persons.person1.vacationPlans = persons.person1.vacationPlans.map(plan => ({
          ...plan,
          start: new Date(plan.start),
          end: new Date(plan.end),
          efficiency: plan.efficiency ? {
            ...plan.efficiency,
            bridgeDayBenefit: plan.efficiency.bridgeDayBenefit ? {
              ...plan.efficiency.bridgeDayBenefit,
              dates: plan.efficiency.bridgeDayBenefit.dates.map(d => new Date(d))
            } : undefined
          } : undefined
        }))
      }
      
      if (persons.person2?.vacationPlans) {
        persons.person2.vacationPlans = persons.person2.vacationPlans.map(plan => ({
          ...plan,
          start: new Date(plan.start),
          end: new Date(plan.end),
          efficiency: plan.efficiency ? {
            ...plan.efficiency,
            bridgeDayBenefit: plan.efficiency.bridgeDayBenefit ? {
              ...plan.efficiency.bridgeDayBenefit,
              dates: plan.efficiency.bridgeDayBenefit.dates.map(d => new Date(d))
            } : undefined
          } : undefined
        }))
      }
      
      return persons
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