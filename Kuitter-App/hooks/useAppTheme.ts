import { useTheme, themes } from '@/context/ThemeContext';

// This hook combines theme context with common style properties
export function useAppTheme() {
  const { theme, toggleTheme, isDark } = useTheme();
  const colors = themes[theme].colors;

  // Common style properties that can be reused across screens
  const commonStyles = {
    screenBackground: colors.background,
    text: {
      color: colors.text,
    },
    textSecondary: {
      color: colors.textSecondary,
    },
    surface: {
      backgroundColor: colors.surface,
    },
    surfaceActive: {
      backgroundColor: colors.surfaceActive,
    },
    border: {
      borderColor: colors.border,
    },
    primary: {
      backgroundColor: colors.primary,
    },
  };

  return {
    theme,
    toggleTheme,
    isDark,
    colors,
    commonStyles,
  };
}