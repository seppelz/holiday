import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { PersonManager } from './PersonManager'
import { PersonContext, PersonProvider } from '../../contexts/PersonContext'
import { GermanState } from '../../types/GermanState'
import { PersonInfo } from '../../types/person'

// Mock the notification context
jest.mock('../../contexts/NotificationContext', () => ({
  useNotification: () => ({
    showNotification: jest.fn()
  }),
  NotificationProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

type MockPersonContextType = {
  persons: PersonInfo;
  isLoading: boolean;
  error: Error | null;
  updatePerson: jest.Mock;
  addVacationPlan: jest.Mock;
  updateVacationPlan: jest.Mock;
  deleteVacationPlan: jest.Mock;
  clearPersons: jest.Mock;
};

const mockPersonContext: MockPersonContextType = {
  persons: {
    person1: {
      id: 1,
      selectedState: GermanState.BE,
      availableVacationDays: 30,
      vacationPlans: []
    },
    person2: null
  } as PersonInfo,
  isLoading: false,
  error: null,
  updatePerson: jest.fn(),
  addVacationPlan: jest.fn(),
  updateVacationPlan: jest.fn(),
  deleteVacationPlan: jest.fn(),
  clearPersons: jest.fn()
};

const renderWithContext = (ui: React.ReactElement, contextValue = mockPersonContext) => {
  return render(
    <PersonContext.Provider value={contextValue}>
      {ui}
    </PersonContext.Provider>
  )
}

describe('PersonManager', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state', () => {
    renderWithContext(<PersonManager />, { ...mockPersonContext, isLoading: true })
    const loadingSpinner = screen.getByTestId('loading-spinner')
    expect(loadingSpinner).toBeInTheDocument()
    expect(loadingSpinner).toHaveClass('animate-spin')
  })

  it('renders error state', () => {
    const testError = new Error('Test error')
    renderWithContext(<PersonManager />, { ...mockPersonContext, error: testError })
    expect(screen.getByText('Fehler beim Laden der Daten')).toBeInTheDocument()
    expect(screen.getByText('Test error')).toBeInTheDocument()
  })

  it('renders Person 1 by default', () => {
    renderWithContext(<PersonManager />)
    expect(screen.getByText('Person 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Bundesland')).toHaveValue('BE')
    expect(screen.getByLabelText('Urlaubstage')).toHaveValue(30)
  })

  it('handles adding Person 2', async () => {
    const updatePerson = jest.fn()
    renderWithContext(<PersonManager />, { ...mockPersonContext, updatePerson })

    const addButton = screen.getByText('Person 2 hinzufügen')
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(updatePerson).toHaveBeenCalledWith(2, expect.objectContaining({
        id: 2,
        selectedState: GermanState.BE,
        availableVacationDays: 30,
        vacationPlans: []
      }))
    })
  })

  it('handles removing Person 2', async () => {
    const updatePerson = jest.fn()
    const contextWithPerson2: MockPersonContextType = {
      ...mockPersonContext,
      updatePerson,
      persons: {
        ...mockPersonContext.persons,
        person2: {
          id: 2 as const,
          selectedState: GermanState.BE,
          availableVacationDays: 30,
          vacationPlans: []
        }
      } as PersonInfo
    }

    renderWithContext(<PersonManager />, contextWithPerson2)

    const removeButton = screen.getByText('Entfernen')
    fireEvent.click(removeButton)

    await waitFor(() => {
      expect(updatePerson).toHaveBeenCalledWith(2, null)
    })
  })

  it('handles updating vacation days', async () => {
    const updatePerson = jest.fn()
    renderWithContext(<PersonManager />, { ...mockPersonContext, updatePerson })

    const input = screen.getByLabelText('Urlaubstage')
    fireEvent.change(input, { target: { value: '25' } })

    await waitFor(() => {
      expect(updatePerson).toHaveBeenCalledWith(1, { availableVacationDays: 25 })
    })
  })

  it('handles updating state selection', async () => {
    const updatePerson = jest.fn()
    renderWithContext(<PersonManager />, { ...mockPersonContext, updatePerson })

    const select = screen.getByLabelText('Bundesland')
    fireEvent.change(select, { target: { value: GermanState.BY } })

    await waitFor(() => {
      expect(updatePerson).toHaveBeenCalledWith(1, { selectedState: GermanState.BY })
    })
  })

  it('handles clearing all data', async () => {
    const clearPersons = jest.fn()
    const originalLocation = window.location
    const mockLocation = { 
      ...originalLocation,
      reload: jest.fn()
    }
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true
    })

    renderWithContext(<PersonManager />, { ...mockPersonContext, clearPersons })

    const clearButton = screen.getByText('Alle Daten zurücksetzen')
    fireEvent.click(clearButton)

    await waitFor(() => {
      expect(clearPersons).toHaveBeenCalled()
      expect(mockLocation.reload).toHaveBeenCalled()
    })

    // Restore original location
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true
    })
  })

  it('handles errors when updating vacation days', async () => {
    const updatePerson = jest.fn().mockRejectedValue(new Error('Update failed'))
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    renderWithContext(<PersonManager />, { ...mockPersonContext, updatePerson })

    const input = screen.getByLabelText('Urlaubstage')
    fireEvent.change(input, { target: { value: '25' } })

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to update vacation days:',
        expect.any(Error)
      )
    })

    consoleSpy.mockRestore()
  })

  it('handles errors when updating state', async () => {
    const updatePerson = jest.fn().mockRejectedValue(new Error('Update failed'))
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    renderWithContext(<PersonManager />, { ...mockPersonContext, updatePerson })

    const select = screen.getByLabelText('Bundesland')
    fireEvent.change(select, { target: { value: GermanState.BY } })

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to update state:',
        expect.any(Error)
      )
    })

    consoleSpy.mockRestore()
  })

  it('handles errors when clearing data', async () => {
    const clearPersons = jest.fn().mockRejectedValue(new Error('Clear failed'))
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    renderWithContext(<PersonManager />, { ...mockPersonContext, clearPersons })

    const clearButton = screen.getByText('Alle Daten zurücksetzen')
    fireEvent.click(clearButton)

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to clear persons:',
        expect.any(Error)
      )
    })

    consoleSpy.mockRestore()
  })
}) 