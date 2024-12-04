import { renderHook } from '@testing-library/react'
import { usePersonStorage } from './usePersonStorage'
import { GermanState } from '../types/GermanState'
import { PersonInfo } from '../types/person'

// Mock js-cookie
const mockGet = jest.fn()
const mockSet = jest.fn()
const mockRemove = jest.fn()

jest.mock('js-cookie', () => ({
  get: (...args: any[]) => mockGet(...args),
  set: (...args: any[]) => mockSet(...args),
  remove: (...args: any[]) => mockRemove(...args)
}))

describe('usePersonStorage', () => {
  const mockPersonInfo: PersonInfo = {
    person1: {
      id: 1 as const,
      selectedState: GermanState.BE,
      availableVacationDays: 30,
      vacationPlans: [{
        id: '1',
        personId: 1 as const,
        start: new Date('2024-01-01'),
        end: new Date('2024-01-05'),
        isVisible: true,
        efficiency: {
          requiredDays: 3,
          gainedDays: 5,
          score: 1.67,
          bridgeDayBenefit: {
            dates: [new Date('2024-01-02')],
            description: 'Brückentag'
          }
        }
      }]
    },
    person2: null
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should save persons to cookies', () => {
    const { result } = renderHook(() => usePersonStorage())
    result.current.savePersons(mockPersonInfo)

    expect(mockSet).toHaveBeenCalledWith(
      'holiday-planner-persons',
      JSON.stringify(mockPersonInfo),
      { expires: 30 }
    )
  })

  it('should load persons from cookies', () => {
    mockGet.mockReturnValueOnce(JSON.stringify(mockPersonInfo))
    const { result } = renderHook(() => usePersonStorage())
    
    const loaded = result.current.loadPersons()
    expect(loaded).toEqual(mockPersonInfo)
    expect(loaded?.person1.vacationPlans[0].start).toBeInstanceOf(Date)
    expect(loaded?.person1.vacationPlans[0].efficiency?.bridgeDayBenefit?.dates[0]).toBeInstanceOf(Date)
  })

  it('should handle missing cookie data', () => {
    mockGet.mockReturnValueOnce(undefined)
    const { result } = renderHook(() => usePersonStorage())
    
    expect(result.current.loadPersons()).toBeNull()
  })

  it('should handle invalid JSON data', () => {
    mockGet.mockReturnValueOnce('invalid json')
    const { result } = renderHook(() => usePersonStorage())
    
    expect(result.current.loadPersons()).toBeNull()
  })

  it('should clear persons from cookies', () => {
    const { result } = renderHook(() => usePersonStorage())
    result.current.clearPersons()

    expect(mockRemove).toHaveBeenCalledWith('holiday-planner-persons')
  })

  it('should handle person2 data correctly when present', () => {
    const mockWithPerson2: PersonInfo = {
      ...mockPersonInfo,
      person2: {
        id: 2 as const,
        selectedState: GermanState.HH,
        availableVacationDays: 25,
        vacationPlans: [{
          id: '2',
          personId: 2 as const,
          start: new Date('2024-02-01'),
          end: new Date('2024-02-05'),
          isVisible: true
        }]
      }
    }

    mockGet.mockReturnValueOnce(JSON.stringify(mockWithPerson2))
    const { result } = renderHook(() => usePersonStorage())
    
    const loaded = result.current.loadPersons()
    expect(loaded?.person2?.vacationPlans[0].start).toBeInstanceOf(Date)
    expect(loaded?.person2?.selectedState).toBe(GermanState.HH)
  })
}) 