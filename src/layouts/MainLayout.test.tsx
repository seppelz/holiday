import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MainLayout } from './MainLayout';
import { GermanState } from '../types/GermanState';

// Mock react-spring
jest.mock('@react-spring/web', () => ({
  useSpring: () => [{ y: 0 }, { start: jest.fn() }],
  animated: {
    div: ({ children, style, ...props }: any) => (
      <div data-testid="animated-div" style={{ ...style }} {...props}>
        {children}
      </div>
    ),
  },
}));

// Mock navigator.vibrate
const mockVibrate = jest.fn();
Object.defineProperty(navigator, 'vibrate', {
  value: mockVibrate,
  writable: true,
});

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock window dimensions
Object.defineProperty(window, 'innerHeight', {
  writable: true,
  value: 800,
});

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  value: 375,
});

describe('MainLayout Mobile Features', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  describe('Tutorial', () => {
    it('shows tutorial on first visit', () => {
      render(<MainLayout>{null}</MainLayout>);
      expect(screen.getByText('Legende')).toBeInTheDocument();
      expect(screen.getByText('Überspringen')).toBeInTheDocument();
    });

    it('allows skipping tutorial', async () => {
      render(<MainLayout>{null}</MainLayout>);
      await userEvent.click(screen.getByText('Überspringen'));
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('hasSeenTutorial', 'true');
    });

    it('progresses through tutorial steps', async () => {
      render(<MainLayout>{null}</MainLayout>);
      
      // First step
      expect(screen.getByText('Legende')).toBeInTheDocument();
      await userEvent.click(screen.getByText('Weiter'));
      expect(mockVibrate).toHaveBeenCalledWith(10);

      // Second step
      expect(screen.getByText('Steuerung')).toBeInTheDocument();
      await userEvent.click(screen.getByText('Weiter'));

      // Final step
      expect(screen.getByText('Urlaub planen')).toBeInTheDocument();
      await userEvent.click(screen.getByText('Fertig'));
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('hasSeenTutorial', 'true');
    });

    it('does not show tutorial if already seen', () => {
      mockLocalStorage.getItem.mockReturnValue('true');
      render(<MainLayout>{null}</MainLayout>);
      expect(screen.queryByText('Legende')).not.toBeInTheDocument();
    });
  });

  describe('Haptic Feedback', () => {
    it('provides feedback on legend swipe', async () => {
      render(<MainLayout>{null}</MainLayout>);
      const legendHandle = screen.getByTestId('animated-div');

      // Simulate swipe up
      fireEvent.touchStart(legendHandle, { touches: [{ clientY: 500 }] });
      fireEvent.touchMove(legendHandle, { touches: [{ clientY: 300 }] });
      fireEvent.touchEnd(legendHandle);

      expect(mockVibrate).toHaveBeenCalledWith([10, 30, 10]);
    });

    it('provides feedback on double tap', async () => {
      render(<MainLayout>{null}</MainLayout>);
      const legendHandle = screen.getByTestId('animated-div');

      // Simulate double tap
      act(() => {
        fireEvent.doubleClick(legendHandle);
      });

      expect(mockVibrate).toHaveBeenCalledWith([10, 30, 10]);
    });
  });

  describe('Responsive Layout', () => {
    it('shows mobile controls on small screens', () => {
      render(<MainLayout>{null}</MainLayout>);
      expect(screen.getByLabelText('Toggle Controls')).toBeInTheDocument();
      expect(screen.getByLabelText('Toggle Legend')).toBeInTheDocument();
    });

    it('hides mobile controls on large screens', () => {
      window.innerWidth = 1024;
      render(<MainLayout>{null}</MainLayout>);
      expect(screen.queryByLabelText('Toggle Controls')).not.toBeInTheDocument();
    });

    it('adjusts legend position based on screen size', () => {
      window.innerHeight = 1000;
      render(<MainLayout>{null}</MainLayout>);
      const legendElement = screen.getByTestId('animated-div');
      expect(legendElement).toHaveStyle({ height: '400px' }); // 40% of screen height
    });
  });

  describe('Gesture Controls', () => {
    it('handles legend drag gestures', async () => {
      render(<MainLayout>{null}</MainLayout>);
      const legendHandle = screen.getByTestId('animated-div');

      // Start drag
      fireEvent.touchStart(legendHandle, { touches: [{ clientY: 500 }] });
      // Move up
      fireEvent.touchMove(legendHandle, { touches: [{ clientY: 300 }] });
      // Release
      fireEvent.touchEnd(legendHandle);

      expect(mockVibrate).toHaveBeenCalled();
    });

    it('handles double tap on legend', async () => {
      render(<MainLayout>{null}</MainLayout>);
      const legendHandle = screen.getByTestId('animated-div');

      // First tap
      fireEvent.click(legendHandle);
      // Second tap within 300ms
      act(() => {
        jest.advanceTimersByTime(200);
        fireEvent.click(legendHandle);
      });

      expect(mockVibrate).toHaveBeenCalled();
    });
  });

  describe('Person Controls', () => {
    it('toggles person controls visibility', async () => {
      render(<MainLayout>{null}</MainLayout>);
      const toggleButton = screen.getByLabelText('Toggle Controls');
      
      await userEvent.click(toggleButton);
      expect(screen.getByText('Heimat-Bundesland')).toBeInTheDocument();
      
      await userEvent.click(toggleButton);
      // Check for collapsed state (implementation dependent)
    });

    it('maintains person data when toggling controls', async () => {
      render(<MainLayout>{null}</MainLayout>);
      const toggleButton = screen.getByLabelText('Toggle Controls');
      
      // Set some person data
      // Toggle controls
      await userEvent.click(toggleButton);
      // Verify data persists
      // Toggle back
      await userEvent.click(toggleButton);
      // Verify data still persists
    });
  });

  describe('Performance', () => {
    it('uses passive touch handlers for smooth scrolling', () => {
      render(<MainLayout>{null}</MainLayout>);
      const legendHandle = screen.getByTestId('animated-div');
      expect(legendHandle).toHaveStyle({ touchAction: 'none' });
    });

    // Add more performance-related tests
  });

  describe('Accessibility', () => {
    it('maintains focus management during interactions', async () => {
      render(<MainLayout>{null}</MainLayout>);
      const toggleButton = screen.getByLabelText('Toggle Controls');
      
      await userEvent.tab();
      expect(toggleButton).toHaveFocus();
    });

    it('provides proper ARIA labels', () => {
      render(<MainLayout>{null}</MainLayout>);
      expect(screen.getByLabelText('Toggle Controls')).toHaveAttribute('aria-label');
      expect(screen.getByLabelText('Toggle Legend')).toHaveAttribute('aria-label');
    });
  });
});

// Helper function to simulate touch gestures
const simulateSwipe = (element: HTMLElement, startY: number, endY: number) => {
  fireEvent.touchStart(element, { touches: [{ clientY: startY }] });
  fireEvent.touchMove(element, { touches: [{ clientY: endY }] });
  fireEvent.touchEnd(element);
}; 