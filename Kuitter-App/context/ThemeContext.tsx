import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Load saved theme preference
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme as Theme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export const themes = {
  dark: {
    colors: {
      primary: '#D4AF37',
      background: ['#131836', '#0A0A1A'],
      surface: 'rgba(255, 255, 255, 0.05)',
      surfaceActive: 'rgba(58, 58, 140, 0.3)',
      text: '#FFFFFF',
      textSecondary: '#E0E0E0',
      border: 'rgba(255, 255, 255, 0.1)',
      error: '#FF3B30',
      success: '#4CAF50',
    },
  },
  light: {
    colors: {
      primary: '#9B7B1B',
      background: ['#F5F5F5', '#FFFFFF'],
      surface: 'rgba(0, 0, 0, 0.05)',
      surfaceActive: 'rgba(155, 123, 27, 0.1)',
      text: '#000000',
      textSecondary: '#666666',
      border: 'rgba(0, 0, 0, 0.1)',
      error: '#D32F2F',
      success: '#388E3C',
    },
  },
};