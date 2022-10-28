import {StyleSheet} from 'react-native';
import {DefaultTheme} from 'react-native-paper';

// Colores de la aplicación
const colors = {
  primary: '#6391E7',
  secondary: '#474F61',
  error: '#DB222A',
  surface: '#F5F6F8',
  background: '#F5F6F8',
  text: '#474F61',
  completed: '#7AC74F',
};

// Tema de la aplicación
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    text: colors.text,
    placeholder: colors.primary,
    error: colors.error,
    surface: colors.surface,
    background: colors.background,
    completed: colors.completed,
  },
  fonts: {
    light: {
      fontFamily: 'Poppins-Light',
      fontWeight: 'normal',
    },
    regular: {
      fontFamily: 'Poppins-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Poppins-Medium',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Poppins-Thin',
      fontWeight: 'normal',
    },
  },
  roundness: 10,
};

// Estilos globales
const globalStyles = StyleSheet.create({
  headerStyle: {
    backgroundColor: theme.colors.surface,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    ...theme.fonts.medium,
    fontSize: 20,
  },

  inputContainer: {
    backgroundColor: theme.colors.surface,
  },
  input: {
    height: 60,
    fontSize: 20,
    marginBottom: 15,
    lineHeight: 60,
    backgroundColor: theme.colors.surface,
  },
  button: {
    height: 60,
    justifyContent: 'center',
    marginTop: 35,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: theme.fonts.medium.fontFamily,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
  registrationContainer: {
    flex: 1,
    paddingHorizontal: 50,
    backgroundColor: theme.colors.surface,
  },
  registrationTitleContainer: {
    alignItems: 'center',
    marginVertical: 50,
  },
  registrationTitleText: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: '400',
    fontFamily: theme.fonts.medium.fontFamily,
    color: colors.secondary,
  },
  registrationTitleSpan: {
    color: colors.primary,
    fontWeight: '600',
  },
  registrationFooterText: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '400',
    fontFamily: theme.fonts.medium.fontFamily,
    color: colors.secondary,
    marginVertical: 60,
  },
  registrationFooterTextSpan: {
    fontWeight: '600',
  },
  errorText: {
    color: colors.error,
  },
  subtitle: {
    ...theme.fonts.medium,
    fontSize: 24,
    color: theme.colors.primary,
    marginLeft: '2.5%',
  },
});

export {colors, globalStyles, theme};
