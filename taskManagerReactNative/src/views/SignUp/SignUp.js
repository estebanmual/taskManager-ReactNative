import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';

import {Button, TextInput} from 'react-native-paper';
import {useValidation} from 'react-native-form-validator';

import {colors, globalStyles} from '../../styles/globalStyles';

const Login = props => {
  const {navigation} = props;

  //Inputs del formulario
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  //Validaciones del formulario
  const {validate, isFieldInError, getErrorsInField, isFormValid} =
    useValidation({
      state: {name, lastname, username, password, city},
    });

  const errorMessage = field => {
    if (isFieldInError(field)) {
      return getErrorsInField(field).map((errormessage, index) => (
        <Text key={index} style={globalStyles.errorText}>
          {errormessage}
        </Text>
      ));
    }
  };

  const onSubmit = () => {
    validate({
      name: {required: true},
      lastname: {required: true},
      username: {required: true},
      password: {required: true},
      city: {required: true},
    });
    if (isFormValid()) {
      console.log('Form is valid');
    } else {
      console.log('Form is invalid');
    }
  };

  return (
    <ScrollView>
      <View style={globalStyles.registrationContainer}>
        <View style={globalStyles.registrationTitleContainer}>
          <Text style={globalStyles.registrationTitleText}>
            <Text style={globalStyles.registrationTitleSpan}>
              Create Account
            </Text>
            {'\n'}
            to get started now!
          </Text>
        </View>
        <View style={globalStyles.inputContainer}>
          {errorMessage('name')}
          <TextInput
            mode="outlined"
            label="Name"
            style={globalStyles.input}
            error={isFieldInError('name')}
            onChangeText={text => {
              setName(text);
            }}
            value={name}
          />
          {errorMessage('lastname')}
          <TextInput
            mode="outlined"
            label="Lastname"
            style={globalStyles.input}
            error={isFieldInError('lastname')}
            onChangeText={text => {
              setLastname(text);
            }}
            value={lastname}
          />
          {errorMessage('username')}
          <TextInput
            mode="outlined"
            label="Username"
            style={globalStyles.input}
            error={isFieldInError('username')}
            onChangeText={text => {
              setUsername(text);
            }}
            value={username}
          />
          {errorMessage('password')}
          <TextInput
            mode="outlined"
            label="Password"
            secureTextEntry={secureTextEntry}
            style={globalStyles.input}
            error={isFieldInError('password')}
            onChangeText={text => {
              setPassword(text);
            }}
            value={password}
            right={
              <TextInput.Icon
                name={secureTextEntry ? 'eye' : 'eye-off'}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              />
            }
          />
          {errorMessage('city')}
          <TextInput
            mode="outlined"
            label="City"
            style={globalStyles.input}
            error={isFieldInError('city')}
            onChangeText={text => {
              setCity(text);
            }}
            value={city}
          />
        </View>

        <Button
          mode="contained"
          color={colors.primary}
          style={globalStyles.button}
          uppercase={false}
          onPress={() => onSubmit()}>
          <Text style={globalStyles.buttonText}>Sign Up</Text>
        </Button>

        <Text style={globalStyles.registrationFooterText}>
          Already have an account?
          <Text
            style={globalStyles.registrationFooterTextSpan}
            onPress={() => navigation.navigate('Login')}>
            {' '}
            Login Now
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Login;
