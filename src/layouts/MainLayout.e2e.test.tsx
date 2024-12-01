import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MainLayout } from './MainLayout';

// Import the same mocks from the unit tests
jest.mock('@react-spring/web', () => ({
  useSpring: () => [{ y: 0 }, { start: jest.fn() }],
  animated: {
    div: ({ children, style, ...props }: React.PropsWithChildren<{ style?: React.CSSProperties }>) => (
      <div data-testid="animated-div" style={{ ...style }} {...props}>
        {children}
      </div>
    ),
  },
}));

const mockVibrate = jest.fn();
Object.defineProperty(navigator, 'vibrate', { value: mockVibrate });

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('MainLayout End-to-End Flows', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  const renderWithChildren = () => {
    return render(
      <MainLayout>
        <div data-testid="test-content">Test Content</div>
      </MainLayout>
    );
  };

  describe('First Time User Experience', () => {
    it('shows tutorial steps in sequence', async () => {
      renderWithChildren();
      
      // Welcome step
      expect(screen.getByRole('heading', { name: 'Willkommen!' })).toBeInTheDocument();
      await userEvent.click(screen.getByText('Weiter'));
      
      // State selection step
      expect(screen.getByRole('heading', { name: 'Bundesland wählen' })).toBeInTheDocument();
      await userEvent.click(screen.getByText('Weiter'));
      
      // Vacation days step
      expect(screen.getByRole('heading', { name: 'Urlaubstage' })).toBeInTheDocument();
      await userEvent.click(screen.getByText('Weiter'));
      
      // Add vacation step
      expect(screen.getByRole('heading', { name: 'Urlaub planen' })).toBeInTheDocument();
      await userEvent.click(screen.getByText('Weiter'));
      
      // Legend step
      expect(screen.getByRole('heading', { name: 'Legende' })).toBeInTheDocument();
      await userEvent.click(screen.getByText('Fertig'));
      
      // Tutorial should be closed
      expect(screen.queryByRole('heading', { name: 'Legende' })).not.toBeInTheDocument();
    });

    it('allows skipping the tutorial', async () => {
      renderWithChildren();
      
      expect(screen.getByRole('heading', { name: 'Willkommen!' })).toBeInTheDocument();
      await userEvent.click(screen.getByText('Überspringen'));
      
      expect(screen.queryByRole('heading', { name: 'Willkommen!' })).not.toBeInTheDocument();
    });
  });

  describe('Mobile Interaction', () => {
    it('toggles legend on swipe', async () => {
      renderWithChildren();
      
      // Skip tutorial
      await userEvent.click(screen.getByText('Überspringen'));
      
      // Get legend handle
      const legendHandle = screen.getAllByTestId('animated-div')[1];
      
      // Swipe up
      fireEvent.touchStart(legendHandle, { touches: [{ clientY: 500 }] });
      fireEvent.touchMove(legendHandle, { touches: [{ clientY: 300 }] });
      fireEvent.touchEnd(legendHandle);
      
      // Should trigger haptic feedback
      await waitFor(() => {
        expect(mockVibrate).toHaveBeenCalled();
      });
      
      // Legend content should be visible
      expect(screen.getByText('Feiertage')).toBeInTheDocument();
      expect(screen.getByText('Brückentage')).toBeInTheDocument();
      expect(screen.getByText('Schulferien')).toBeInTheDocument();
      expect(screen.getByText('Urlaub')).toBeInTheDocument();
    });

    it('toggles controls on button press', async () => {
      renderWithChildren();
      
      // Skip tutorial
      await userEvent.click(screen.getByText('Überspringen'));
      
      // Toggle controls
      const toggleButton = screen.getByLabelText('Toggle Controls');
      await userEvent.click(toggleButton);
      
      // Controls should be hidden
      const animatedDiv = screen.getAllByTestId('animated-div')[0];
      expect(animatedDiv).toHaveStyle({ height: '0px' });
      
      // Toggle controls back
      await userEvent.click(toggleButton);
      
      // Controls should be visible
      expect(animatedDiv).toHaveStyle({ height: 'auto' });
    });
  });

  describe('Network Conditions', () => {
    let originalFetch: typeof global.fetch;

    beforeEach(() => {
      originalFetch = global.fetch;
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ holidays: [] })
      }) as jest.Mock;
    });

    afterEach(() => {
      global.fetch = originalFetch;
    });

    it('handles slow network gracefully', async () => {
      // Simulate slow network
      global.fetch = jest.fn().mockImplementation(() =>
        new Promise(resolve =>
          setTimeout(() => resolve({
            ok: true,
            json: () => Promise.resolve({ holidays: [] })
          }), 2000)
        )
      ) as jest.Mock;

      renderWithChildren();
      
      // Skip tutorial
      await userEvent.click(screen.getByText('Überspringen'));
      
      // Should show loading state
      expect(screen.getAllByRole('combobox')[0]).toBeInTheDocument();
      
      // Wait for data to load
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      }, { timeout: 3000 });
    });

    it('handles offline mode gracefully', async () => {
      // Simulate offline
      const originalOnline = window.navigator.onLine;
      Object.defineProperty(window.navigator, 'onLine', {
        value: false,
        configurable: true
      });

      renderWithChildren();
      
      // Skip tutorial
      await userEvent.click(screen.getByText('Überspringen'));
      
      // Add vacation button should be disabled
      await waitFor(() => {
        const addButton = screen.getByLabelText('Urlaub für Person 1 planen');
        expect(addButton).toHaveClass('opacity-50');
        expect(addButton).toHaveClass('cursor-not-allowed');
      });
      
      // Restore online status
      Object.defineProperty(window.navigator, 'onLine', {
        value: originalOnline,
        configurable: true
      });
    });

    it('handles API errors gracefully', async () => {
      // Simulate API error
      global.fetch = jest.fn().mockRejectedValue(new Error('API Error'));

      renderWithChildren();
      
      // Skip tutorial
      await userEvent.click(screen.getByText('Überspringen'));
      
      // Should show error state
      await waitFor(() => {
        const addButton = screen.getByLabelText('Urlaub für Person 1 planen');
        expect(addButton).toHaveClass('opacity-50');
        expect(addButton).toHaveClass('cursor-not-allowed');
      });
    });
  });

  describe('Vacation Planning', () => {
    it('allows adding and removing vacation plans', async () => {
      renderWithChildren();
      
      // Skip tutorial
      await userEvent.click(screen.getByText('Überspringen'));
      
      // Add vacation
      await userEvent.click(screen.getByLabelText('Urlaub für Person 1 planen'));
      
      // Fill vacation form
      await userEvent.type(screen.getByLabelText('Von'), '2025-08-01');
      await userEvent.type(screen.getByLabelText('Bis'), '2025-08-05');
      await userEvent.click(screen.getByText('Speichern'));
      
      // Verify vacation is added
      const vacationText = await screen.findByRole('listitem', { name: /1\.8\. - 5\.8\./ });
      expect(vacationText).toBeInTheDocument();
      
      // Remove vacation
      const removeButton = screen.getByLabelText('Urlaub löschen');
      await userEvent.click(removeButton);
      
      // Verify vacation is removed
      expect(vacationText).not.toBeInTheDocument();
    });

    it('calculates remaining vacation days correctly', async () => {
      renderWithChildren();
      
      // Skip tutorial
      await userEvent.click(screen.getByText('Überspringen'));
      
      // Initial days should be 30
      const remainingDays = await screen.findByRole('status', { name: /verbleibend: 30/i });
      expect(remainingDays).toBeInTheDocument();
      
      // Add 5-day vacation
      await userEvent.click(screen.getByLabelText('Urlaub für Person 1 planen'));
      await userEvent.type(screen.getByLabelText('Von'), '2025-08-01');
      await userEvent.type(screen.getByLabelText('Bis'), '2025-08-05');
      await userEvent.click(screen.getByText('Speichern'));
      
      // Should show 25 days remaining
      const updatedDays = await screen.findByRole('status', { name: /verbleibend: 25/i });
      expect(updatedDays).toBeInTheDocument();
    });
  });
});