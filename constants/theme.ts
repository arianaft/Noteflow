import { useColorScheme } from 'react-native';

// Paleta de colores
export const colors = {
  // Colores principales
  primary: '#6366F1',
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',

  // Colores por tipo de nota
  note: '#6366F1',
  checklist: '#10B981',
  idea: '#F59E0B',

  // Colores de fondo para IdeaNote
  ideaColors: [
    '#FEF3C7',
    '#D1FAE5',
    '#DBEAFE',
    '#FCE7F3',
    '#EDE9FE',
    '#FEE2E2',
  ],

  // Neutros modo claro
  light: {
    background: '#FFFFFF',
    surface: '#F9FAFB',
    border: '#E5E7EB',
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
  },

  // Neutros modo oscuro
  dark: {
    background: '#111827',
    surface: '#1F2937',
    border: '#374151',
    textPrimary: '#F9FAFB',
    textSecondary: '#9CA3AF',
    textMuted: '#6B7280',
  },
};

// Escala tipográfica
export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

// Espaciados base
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Bordes
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Hook para usar el tema según modo oscuro/claro
export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    isDark,
    colors: {
      ...colors,
      background: isDark ? colors.dark.background : colors.light.background,
      surface: isDark ? colors.dark.surface : colors.light.surface,
      border: isDark ? colors.dark.border : colors.light.border,
      textPrimary: isDark ? colors.dark.textPrimary : colors.light.textPrimary,
      textSecondary: isDark ? colors.dark.textSecondary : colors.light.textSecondary,
      textMuted: isDark ? colors.dark.textMuted : colors.light.textMuted,
    },
    typography,
    spacing,
    borderRadius,
  };
};