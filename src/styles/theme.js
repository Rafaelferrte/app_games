import { StyleSheet } from 'react-native';

// ./src/theme.js
export const theme = {
  colors: {
    primary: '#6200ee',
    primaryVariant: '#3700b3',
    secondary: '#03dac6',
    secondaryVariant: '#018786',
    background: '#f5f5f5',
    surface: '#ffffff',
    error: '#b00020',
    text: '#333333',
    textDisabled: '#999999',
    onPrimary: '#ffffff',
    onSecondary: '#000000',
    onBackground: '#333333',
    onSurface: '#333333',
    onError: '#ffffff',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  radius: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: 28,
    },
    body1: {
      fontSize: 16,
      lineHeight: 24,
    },
    body2: {
      fontSize: 14,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
    },
  },
  elevation: {
    low: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
    high: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 8,
    },
  },
};

export const globalStyles = StyleSheet.create({
  // Container base para telas
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.m,
    paddingTop: theme.spacing.m,
  },
  
  // Cabeçalho
  headerTitle: {
    ...theme.typography.h2,
    color: theme.colors.onSurface,
  },
  
  // Inputs
  input: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    borderRadius: theme.radius.s,
    borderWidth: 1,
    borderColor: theme.colors.textDisabled,
    marginBottom: theme.spacing.m,
    ...theme.typography.body1,
    color: theme.colors.onSurface,
  },
  
  // Botões
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.m,
    borderRadius: theme.radius.m,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.elevation.low,
    marginVertical: theme.spacing.s,
  },
  buttonText: {
    ...theme.typography.body1,
    color: theme.colors.onPrimary,
    fontWeight: '600',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  buttonOutlineText: {
    color: theme.colors.primary,
  },
  
  // Cards
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.elevation.low,
  },
  
  // Textos
  textCenter: {
    textAlign: 'center',
  },
  textMuted: {
    color: theme.colors.textDisabled,
  },
  
  // Utilidades
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  mtS: {
    marginTop: theme.spacing.s,
  },
  mtM: {
    marginTop: theme.spacing.m,
  },
  mbS: {
    marginBottom: theme.spacing.s,
  },
  mbM: {
    marginBottom: theme.spacing.m,
  },
});