import {StyleSheet} from 'react-native';

// colores de la aplicación
const colors = {
  primary: '#6391E7',
  secondary: '#474F61',
  error: '#DB222A',
};

// estilos globales
const globalStyles = StyleSheet.create({
  inputContainer: {
    marginTop: 60,
  },
  input: {
    height: 60,
    fontSize: 20,
    marginBottom: 15,
  },
  button: {
    height: 60,
    justifyContent: 'center',
    marginTop: 35,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
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
    fontFamily: 'Poppins-Regular',
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
    fontFamily: 'Poppins-Regular',
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

export {colors, globalStyles};
