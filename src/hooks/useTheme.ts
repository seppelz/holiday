import { theme, Theme } from '../theme';

export const useTheme = (): Theme => {
  // In the future, we could add theme switching logic here
  return theme;
};

// Helper function to combine theme classes
export const cx = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
}; 