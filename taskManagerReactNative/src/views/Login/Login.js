import React, {useState, useContext} from 'react';
import {Text, View} from 'react-native';

import {Button, TextInput} from 'react-native-paper';
import {useValidation} from 'react-native-form-validator';

import {colors, globalStyles} from '../../styles/globalStyles';
import SessionContext from '../../context/session/sessionContext';

const Login = props => {
  const {navigation} = props;
  const {login, loading} = useContext(SessionContext);

  //Form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  //Form validations
  const {validate, isFieldInError, getErrorsInField, isFormValid} =
    useValidation({
      state: {username, password},
    });

  /**
   * If the field is in error, return the error message.
   * @returns An array of Text components.
   */
  const errorMessage = field => {
    if (isFieldInError(field)) {
      return getErrorsInField(field).map((errormessage, index) => (
        <Text key={index} style={globalStyles.errorText}>
          {errormessage}
        </Text>
      ));
    }
  };

  /**
   * If the form is valid, then set the username and password to an object, then call the login
   * function with the userInfo object and the navigation object.
   */
  const onSubmit = () => {
    validate({
      username: {required: true},
      password: {required: true},
    });
    if (isFormValid()) {
      const userInfo = {
        username,
        password,
      };
      loading();
      setUsername('');
      setPassword('');
      setTimeout(() => {
        login(userInfo, navigation);
      }, 1000);
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
          value={username}
          style={globalStyles.input}
          error={isFieldInError('username')}
        />
        {errorMessage('password')}
        <TextInput
          mode="outlined"
          label="Password"
          secureTextEntry={secureTextEntry}
          onChangeText={text => setPassword(text)}
          value={password}
          style={globalStyles.input}
          error={isFieldInError('username')}
          right={
            <TextInput.Icon
              name={secureTextEntry ? 'eye' : 'eye-off'}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            />
          }
        />
      </View>

      <Button
        mode="contained"
        color={colors.primary}
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
