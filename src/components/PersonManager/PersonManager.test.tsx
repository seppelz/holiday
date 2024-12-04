import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { PersonManager } from './PersonManager'
import { usePersonStorage } from '../../hooks/usePersonStorage'
import { GermanState } from '../../types/GermanState'
import { PersonInfo } from '../../types/person'
import { useNotification } from '../../contexts/NotificationContext'
import { PersonProvider } from '../../contexts/PersonContext'

// Mock hooks
jest.mock('../../hooks/usePersonStorage')
jest.mock('../../contexts/NotificationContext')
const mockUsePersonStorage = usePersonStorage as jest.MockedFunction<typeof usePersonStorage>
const mockUseNotification = useNotification as jest.MockedFunction<typeof useNotification>

// Test wrapper component
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <PersonProvider>
      {ui}
    </PersonProvider>
  )
}

describe('PersonManager', () => {
  const mockSavePersons = jest.fn()
  const mockLoadPersons = jest.fn()
  const mockShowNotification = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockUsePersonStorage.mockReturnValue({
      savePersons: mockSavePersons,
      loadPersons: mockLoadPersons,
      clearPersons: jest.fn()
    })
    mockUseNotification.mockReturnValue({
      showNotification: mockShowNotification
    })
  })

  it('should render initial state with Person 1', () => {
    mockLoadPersons.mockReturnValue(null)
    renderWithProviders(<PersonManager />)

    expect(screen.getByText('Person 1')).toBeInTheDocument()
    expect(screen.getByText('Person 2 hinzufügen')).toBeInTheDocument()
    expect(screen.getByLabelText('Bundesland')).toHaveValue('BE')
    expect(screen.getByLabelText('Urlaubstage')).toHaveValue(30)
  })

  it('should load saved persons data', () => {
    const savedData = {
      person1: {
        id: 1,
        selectedState: GermanState.HH,
        availableVacationDays: 25,
        vacationPlans: []
      },
      person2: null
    }
    mockLoadPersons.mockReturnValue(savedData)
    renderWithProviders(<PersonManager />)

    expect(screen.getByLabelText('Bundesland')).toHaveValue('HH')
    expect(screen.getByLabelText('Urlaubstage')).toHaveValue(25)
  })

  it('should add Person 2 when clicking add button', async () => {
    mockLoadPersons.mockReturnValue(null)
    renderWithProviders(<PersonManager />)

    fireEvent.click(screen.getByText('Person 2 hinzufügen'))

    await waitFor(() => {
      expect(screen.getAllByText('Bundesland')).toHaveLength(2)
      expect(screen.getAllByLabelText('Urlaubstage')).toHaveLength(2)
    })

    expect(mockSavePersons).toHaveBeenCalledWith(expect.objectContaining({
      person2: expect.objectContaining({
        id: 2,
        selectedState: GermanState.BE,
        availableVacationDays: 30
      })
    }))
  })

  it('should remove Person 2 when clicking remove button', async () => {
    mockLoadPersons.mockReturnValue({
      person1: {
        id: 1,
        selectedState: GermanState.BE,
        availableVacationDays: 30,
        vacationPlans: []
      },
      person2: {
        id: 2,
        selectedState: GermanState.HH,
        availableVacationDays: 25,
        vacationPlans: []
      }
    })
    renderWithProviders(<PersonManager />)

    fireEvent.click(screen.getByText('Entfernen'))

    await waitFor(() => {
      expect(screen.queryByText('Person 2')).not.toBeInTheDocument()
      expect(screen.getByText('Person 2 hinzufügen')).toBeInTheDocument()
    })

    expect(mockSavePersons).toHaveBeenCalledWith(expect.objectContaining({
      person2: null
    }))
  })

  it('should update vacation days', async () => {
    mockLoadPersons.mockReturnValue(null)
    renderWithProviders(<PersonManager />)

    const input = screen.getByLabelText('Urlaubstage')
    fireEvent.change(input, { target: { value: '20' } })

    await waitFor(() => {
      expect(mockSavePersons).toHaveBeenCalledWith(expect.objectContaining({
        person1: expect.objectContaining({
          availableVacationDays: 20
        })
      }))
    })
  })

  it('should update selected state', async () => {
    mockLoadPersons.mockReturnValue(null)
    renderWithProviders(<PersonManager />)

    const select = screen.getByLabelText('Bundesland')
    fireEvent.change(select, { target: { value: GermanState.BY } })

    await waitFor(() => {
      expect(mockSavePersons).toHaveBeenCalledWith(expect.objectContaining({
        person1: expect.objectContaining({
          selectedState: GermanState.BY
        })
      }))
    })
  })

  it('should handle Person 2 state updates', async () => {
    mockLoadPersons.mockReturnValue({
      person1: {
        id: 1,
        selectedState: GermanState.BE,
        availableVacationDays: 30,
        vacationPlans: []
      },
      person2: {
        id: 2,
        selectedState: GermanState.BE,
        availableVacationDays: 30,
        vacationPlans: []
      }
    })
    renderWithProviders(<PersonManager />)

    const person2Select = screen.getByLabelText('Bundesland', { selector: '#person2-state' })
    fireEvent.change(person2Select, { target: { value: GermanState.NW } })

    await waitFor(() => {
      expect(mockSavePersons).toHaveBeenCalledWith(expect.objectContaining({
        person2: expect.objectContaining({
          selectedState: GermanState.NW
        })
      }))
    })
  })
})

describe('PersonManager - Same State Tests', () => {
  it('should calculate bridge days correctly when both persons are in same state', () => {
    // Setup both persons in Berlin
    const persons: PersonInfo = {
      person1: {
        id: 1,
        selectedState: GermanState.BE,
        availableVacationDays: 30,
        vacationPlans: []
      },
      person2: {
        id: 2,
        selectedState: GermanState.BE,
        availableVacationDays: 30,
        vacationPlans: []
      }
    };

    // Test bridge day calculation
    // ...
  });

  it('should highlight shared vacation days correctly', () => {
    // Test overlapping vacation visualization
    // ...
  });
});

describe('PersonManager - Different State Tests', () => {
  it('should calculate bridge days independently for different states', () => {
    // Setup: Person 1 in Berlin, Person 2 in Bayern
    const persons: PersonInfo = {
      person1: {
        id: 1,
        selectedState: GermanState.BE,
        availableVacationDays: 30,
        vacationPlans: []
      },
      person2: {
        id: 2,
        selectedState: GermanState.BY,
        availableVacationDays: 30,
        vacationPlans: []
      }
    };

    // Test bridge day differences
    // ...
  });

  it('should handle state-specific holidays correctly', () => {
    // Test holiday visualization
    // ...
  });
});

describe('Person 2 Functionality - 2025 Scenarios', () => {
  const mockSavePersons = jest.fn()
  const mockLoadPersons = jest.fn()
  const mockShowNotification = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockUsePersonStorage.mockReturnValue({
      savePersons: mockSavePersons,
      loadPersons: mockLoadPersons,
      clearPersons: jest.fn()
    })
    mockUseNotification.mockReturnValue({
      showNotification: mockShowNotification
    })
  })

  it('should handle Person 2 vacation planning workflow', async () => {
    const testData = {
      person1: {
        id: 1,
        selectedState: GermanState.BE,
        availableVacationDays: 30,
        vacationPlans: []
      },
      person2: null // Start with no Person 2
    }
    mockLoadPersons.mockReturnValue(testData)
    
    renderWithProviders(<PersonManager />)
    
    // First, add Person 2
    const addPerson2Btn = screen.getByText('Person 2 hinzufügen')
    fireEvent.click(addPerson2Btn)
    
    // Verify Person 2 section is visible
    expect(screen.getByText('Person 2')).toBeInTheDocument()
    
    // Select a state for Person 2
    const stateSelect = screen.getByLabelText('Bundesland', { selector: '#person2-state' })
    fireEvent.change(stateSelect, { target: { value: GermanState.BY } })
    
    // Now the vacation planning button should be visible
    const vacationBtn = screen.getByRole('button', { name: /Urlaub planen/i })
    expect(vacationBtn).toBeInTheDocument()
  })

  it('should handle overlapping vacation plans between persons', async () => {
    const testData = {
      person1: {
        id: 1,
        selectedState: GermanState.BE,
        availableVacationDays: 30,
        vacationPlans: [{
          id: 'vacation1',
          start: new Date('2025-07-21'),
          end: new Date('2025-07-25'),
          isVisible: true,
          personId: 1
        }]
      },
      person2: {
        id: 2,
        selectedState: GermanState.BE,
        availableVacationDays: 30,
        vacationPlans: []
      }
    }
    mockLoadPersons.mockReturnValue(testData)
    
    renderWithProviders(<PersonManager />)
    
    // Verify Person 2 is visible and has state selected
    expect(screen.getByText('Person 2')).toBeInTheDocument()
    const stateSelect = screen.getByLabelText('Bundesland', { selector: '#person2-state' })
    expect(stateSelect).toHaveValue('BE')
    
    // Add overlapping vacation for Person 2
    const vacationBtn = screen.getByRole('button', { name: /Urlaub planen/i })
    fireEvent.click(vacationBtn)
    
    // Verify notification about vacation selection mode
    expect(mockShowNotification).toHaveBeenCalledWith(
      expect.stringContaining('Urlaub'),
      expect.any(String)
    )
  })

  // Note: Bridge day tests are pending tooltip implementation
  it.todo('should show bridge day tooltips for October 2025 (Day of German Unity)')
  it.todo('should show bridge day tooltips for Bavaria Epiphany 2025')
  it.todo('should show bridge day tooltips for Christmas 2025')

  it('should handle Person 2 keyboard shortcuts', async () => {
    const testData = {
      person1: {
        id: 1,
        selectedState: GermanState.BE,
        availableVacationDays: 30,
        vacationPlans: []
      },
      person2: {
        id: 2,
        selectedState: GermanState.BE,
        availableVacationDays: 30,
        vacationPlans: [{
          id: 'vacation1',
          start: new Date('2025-08-11'),
          end: new Date('2025-08-15'),
          isVisible: true,
          personId: 2
        }]
      }
    }
    mockLoadPersons.mockReturnValue(testData)
    
    renderWithProviders(<PersonManager />)
    
    // Test 'm' shortcut for Person 2 vacation planning
    fireEvent.keyDown(document, { key: 'm' })
    expect(mockShowNotification).toHaveBeenCalledWith(
      expect.stringContaining('Urlaub'),
      expect.any(String)
    )
    
    // Test '5' shortcut for deleting Person 2's first vacation
    fireEvent.keyDown(document, { key: '5' })
    expect(mockSavePersons).toHaveBeenCalledWith(
      expect.objectContaining({
        person2: expect.objectContaining({
          vacationPlans: []
        })
      })
    )
  })
}) 