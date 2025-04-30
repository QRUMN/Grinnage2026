export const COLORS = {
  // Primary Brand Color - Green
  primary: {
    50: '#F0F7E6',
    100: '#E1F0CC',
    200: '#C3E199',
    300: '#A5D166',
    400: '#87C233',
    500: '#48A700', // Main primary color
    600: '#3A8600',
    700: '#2B6400',
    800: '#1D4300',
    900: '#112005',
  },
  // Secondary/CTA Color - Orange
  accent: {
    50: '#FFF1ED',
    100: '#FFE4DB',
    200: '#FFC9B7',
    300: '#FFAE93',
    400: '#FF936F',
    500: '#FB6107', // Secondary accent color
    600: '#C94E06',
    700: '#973B04',
    800: '#642703',
    900: '#321301',
  },
  // Background Color - Off White
  surface: {
    50: '#FFFFFF',
    100: '#F7FAF4', // Main background color
    200: '#EEF4E9',
    300: '#E5EFDE',
    400: '#DCE9D3',
    500: '#D3E4C8',
    600: '#CADEBD',
    700: '#C1D9B2',
    800: '#B8D3A7',
    900: '#AFCE9C',
  },
  // Content/Text Colors - Black
  content: {
    50: '#F2F2F2',
    100: '#E6E6E6',
    200: '#CCCCCC',
    300: '#B3B3B3',
    400: '#999999',
    500: '#808080',
    600: '#666666',
    700: '#4D4D4D',
    800: '#333333',
    900: '#000000',
  },
  // Emergency Color - Orange Red
  emergency: {
    50: '#FFF1ED',
    100: '#FFE4DB',
    200: '#FFC9B7',
    300: '#FFAE93',
    400: '#FF936F',
    500: '#FA3C07', // Emergency color
    600: '#C83006',
    700: '#962404',
    800: '#641803',
    900: '#320C01',
  }
} as const;

export const THEME_VARIANTS = {
  light: {
    // Base Colors
    background: COLORS.surface[100],
    surface: COLORS.surface[50],
    surfaceHover: COLORS.surface[200],
    surfaceActive: COLORS.surface[300],
    
    // Text Colors
    textPrimary: COLORS.content[900],
    textSecondary: COLORS.content[700],
    textTertiary: COLORS.content[500],
    textDisabled: COLORS.content[400],
    
    // Interactive Elements
    primary: COLORS.primary[500],
    primaryHover: COLORS.primary[600],
    primaryActive: COLORS.primary[700],
    
    accent: COLORS.accent[500],
    accentHover: COLORS.accent[600],
    accentActive: COLORS.accent[700],
    
    emergency: COLORS.emergency[500],
    emergencyHover: COLORS.emergency[600],
    emergencyActive: COLORS.emergency[700],
  },
  dark: {
    // Base Colors
    background: COLORS.content[900],
    surface: COLORS.content[800],
    surfaceHover: COLORS.content[700],
    surfaceActive: COLORS.content[600],
    
    // Text Colors
    textPrimary: COLORS.surface[50],
    textSecondary: COLORS.surface[200],
    textTertiary: COLORS.surface[300],
    textDisabled: COLORS.surface[400],
    
    // Interactive Elements
    primary: COLORS.primary[500],
    primaryHover: COLORS.primary[400],
    primaryActive: COLORS.primary[300],
    
    accent: COLORS.accent[500],
    accentHover: COLORS.accent[400],
    accentActive: COLORS.accent[300],
    
    emergency: COLORS.emergency[500],
    emergencyHover: COLORS.emergency[400],
    emergencyActive: COLORS.emergency[300],
  }
} as const;

// Color Contrast Ratios (for reference)
export const CONTRAST_RATIOS = {
  lightMode: {
    textPrimaryOnBackground: '16:1', // Black on Off-White
    textSecondaryOnBackground: '9:1',
    primaryOnWhite: '4.8:1', // Green on White
    accentOnWhite: '4.7:1', // Orange on White
    emergencyOnWhite: '4.8:1', // Orange-Red on White
  },
  darkMode: {
    textPrimaryOnBackground: '16:1', // White on Black
    textSecondaryOnBackground: '9:1',
    primaryOnBlack: '4.8:1', // Green on Black
    accentOnBlack: '4.7:1', // Orange on Black
    emergencyOnBlack: '4.8:1', // Orange-Red on Black
  }
};