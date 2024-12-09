import { PersonInfo } from '../types/person'
import { calculateVacationEfficiency } from '../utils/vacationEfficiency'

const STORAGE_KEY = 'holiday-planner-persons'
const DB_NAME = 'holiday-planner-db'
const STORE_NAME = 'persons'

const isValidDate = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};

export const usePersonStorage = () => {
  // Initialize IndexedDB
  const initDB = async (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
    });
  };

  // Save to IndexedDB with localStorage fallback
  const savePersons = async (persons: PersonInfo) => {
    const dataToSave = {
      ...persons,
      person2: persons.person2 ? {
        ...persons.person2,
        vacationPlans: persons.person2.vacationPlans || []
      } : null
    };

    try {
      // Try IndexedDB first
      const db = await initDB();
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      await new Promise((resolve, reject) => {
        const request = store.put(dataToSave, STORAGE_KEY);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      // Fallback to localStorage
      console.warn('IndexedDB failed, falling back to localStorage:', error);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
        // Set cookie with proper SameSite attribute
        document.cookie = `${STORAGE_KEY}=${JSON.stringify(dataToSave)}; SameSite=Lax; Secure; max-age=${30 * 24 * 60 * 60}`;
      } catch (error) {
        console.error('Storage failed:', error);
      }
    }
  };

  // Load from IndexedDB with localStorage fallback
  const loadPersons = async (): Promise<PersonInfo | null> => {
    try {
      // Try IndexedDB first
      const db = await initDB();
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const data = await new Promise<PersonInfo>((resolve, reject) => {
        const request = store.get(STORAGE_KEY);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });

      if (!data) {
        // Try localStorage if no data in IndexedDB
        const localData = localStorage.getItem(STORAGE_KEY);
        if (!localData) return null;
        return processStoredData(JSON.parse(localData));
      }

      return processStoredData(data);
    } catch (error) {
      // Final fallback to localStorage
      console.warn('IndexedDB failed, trying localStorage:', error);
      try {
        const localData = localStorage.getItem(STORAGE_KEY);
        if (!localData) return null;
        return processStoredData(JSON.parse(localData));
      } catch (error) {
        console.error('Failed to load data:', error);
        return null;
      }
    }
  };

  // Process stored data (convert dates, calculate efficiency)
  const processStoredData = (persons: PersonInfo): PersonInfo => {
    const processVacationPlans = (plans: any[] = []) => {
      return plans
        .map(plan => {
          try {
            const start = new Date(plan.start);
            const end = new Date(plan.end);
            
            if (!isValidDate(start) || !isValidDate(end)) {
              console.error('Invalid dates in vacation plan:', { plan });
              return null;
            }
            
            const planWithDates = { ...plan, start, end };
            return calculateVacationEfficiency(planWithDates);
          } catch (error) {
            console.error('Error processing vacation plan:', error, plan);
            return null;
          }
        })
        .filter((plan): plan is NonNullable<typeof plan> => plan !== null);
    };

    return {
      ...persons,
      person1: {
        ...persons.person1,
        vacationPlans: processVacationPlans(persons.person1.vacationPlans)
      },
      person2: persons.person2 ? {
        ...persons.person2,
        vacationPlans: processVacationPlans(persons.person2.vacationPlans)
      } : null
    };
  };

  // Clear all storage
  const clearPersons = async () => {
    try {
      const db = await initDB();
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      await new Promise((resolve, reject) => {
        const request = store.delete(STORAGE_KEY);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.warn('IndexedDB clear failed, trying localStorage:', error);
    }
    localStorage.removeItem(STORAGE_KEY);
  };

  return { 
    savePersons, 
    loadPersons, 
    clearPersons,
    // Add a sync method to ensure data is consistent between storages
    syncStorage: async () => {
      const data = await loadPersons();
      if (data) {
        await savePersons(data);
      }
    }
  };
}; 