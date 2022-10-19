import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {Button, TextInput} from 'react-native-paper';
import {useValidation} from 'react-native-form-validator';

import {colors, globalStyles} from '../../styles/globalStyles';

const Login = props => {
  const {navigation} = props;

  //Inputs del formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  //Validaciones del formulario
  const {validate, isFieldInError, getErrorsInField, isFormValid} =
    useValidation({
      state: {username, password},
    });

  const errorMessage = field => {
    if (isFieldInError(field)) {
      return getErrorsInField(field).map(errormessage => (
        <Text style={globalStyles.errorText}>{errormessage}</Text>
      ));
    }
  };

  const onSubmit = () => {
    validate({
      username: {required: true},
      password: {required: true},
    });
    if (isFormValid()) {
      console.log('Form is valid');
    } else {
      console.log('Form is invalid');
    }
  };
  return (
    <View style={globalStyles.registrationContainer}>
      <View style={globalStyles.registrationTitleContainer}>
        <Text style={globalStyles.registrationTitleText}>
          <Text style={globalStyles.registrationTitleSpan}>Welcome,</Text>
          {'\n'}
          Glad to see you!
        </Text>
      </View>
      <View style={globalStyles.inputContainer}>
        {errorMessage('username')}
        <TextInput
          mode="outlined"
          label="Username"
          onChangeText={text => {
            setUsername(text);
          }}
          style={globalStyles.input}
          error={isFieldInError('username')}
        />
        {errorMessage('password')}
        <TextInput
          mode="outlined"
          label="Password"
          secureTextEntry={secureTextEntry}
          onChangeText={text => setPassword(text)}
          style={globalStyles.input}
          error={isFieldInError('username')}
          right={
            <TextInput.Icon
              name="eye"
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            />
          }
        />
      </View>

      <Button
        mode="contained"
        color={colors.primary}
        theme={{roundness: 10}}
        style={globalStyles.button}
        uppercase={false}
        onPress={() => onSubmit()}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </Button>

      <Text style={globalStyles.registrationFooterText}>
        Don't have an account?
        <Text
          style={globalStyles.registrationFooterTextSpan}
          onPress={() => navigation.navigate('SignUp')}>
          {' '}
          Sign up now
        </Text>
      </Text>
    </View>
  );
};

export default Login;
