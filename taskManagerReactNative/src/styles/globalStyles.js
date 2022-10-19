import {StyleSheet} from 'react-native';
import {DefaultTheme} from 'react-native-paper';

// Colores de la aplicación
const colors = {
  primary: '#6391E7',
  secondary: '#474F61',
  error: '#DB222A',
};

// Tema de la aplicación
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    text: colors.secondary,
    placeholder: colors.primary,
    error: colors.error,
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
  inputContainer: {
    marginTop: 60,
  },
  input: {
    height: 60,
    fontSize: 20,
    marginBottom: 15,
    lineHeight: 60,
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
  registrationContainer: {
    flex: 1,
    paddingHorizontal: 50,
  },
  registrationTitleContainer: {
    alignItems: 'center',
    marginTop: 70,
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
});

export {colors, globalStyles, theme};
