import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { PersonManager } from './PersonManager'
import { usePersonStorage } from '../../hooks/usePersonStorage'
import { GermanState } from '../../types/GermanState'

// Mock des usePersonStorage hooks
jest.mock('../../hooks/usePersonStorage')
const mockUsePersonStorage = usePersonStorage as jest.MockedFunction<typeof usePersonStorage>

describe('PersonManager', () => {
  const mockSavePersons = jest.fn()
  const mockLoadPersons = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockUsePersonStorage.mockReturnValue({
      savePersons: mockSavePersons,
      loadPersons: mockLoadPersons,
      clearPersons: jest.fn()
    })
  })

  it('should render initial state with Person 1', () => {
    mockLoadPersons.mockReturnValue(null)
    render(<PersonManager />)

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
    render(<PersonManager />)

    expect(screen.getByLabelText('Bundesland')).toHaveValue('HH')
    expect(screen.getByLabelText('Urlaubstage')).toHaveValue(25)
  })

  it('should add Person 2 when clicking add button', async () => {
    mockLoadPersons.mockReturnValue(null)
    render(<PersonManager />)

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
    render(<PersonManager />)

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
    render(<PersonManager />)

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
    render(<PersonManager />)

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
    render(<PersonManager />)

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