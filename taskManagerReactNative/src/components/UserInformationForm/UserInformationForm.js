import React, {useState, useContext, useEffect} from 'react';
import {View, Text} from 'react-native';

import {Button, TextInput} from 'react-native-paper';
import {useValidation} from 'react-native-form-validator';

import {colors, globalStyles} from '../../styles/globalStyles';
import SessionContext from '../../context/session/sessionContext';

const UserInformationForm = props => {
  const {navigation} = props;
  const {signUp, userInformation, logOut} = useContext(SessionContext);

  //Inputs del formulario
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [canEdit, setCanEdit] = useState(true);

  // SignUp o Editar perfil
  useEffect(() => {
    if (userInformation) {
      setName(userInformation.name);
      setLastname(userInformation.lastname);
      setUsername(userInformation.username);
      setPassword(userInformation.password);
      setCity(userInformation.city);
      setCanEdit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const logOutHandler = () => {
    setTimeout(() => {
      logOut(navigation);
    }, 2000);
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
      const userInformation = {
        name,
        lastname,
        username,
        password,
        city,
      };
      userInformation.avatarNumber = Math.floor(Math.random() * 50) + 1;
      signUp(userInformation);
      setName('');
      setLastname('');
      setUsername('');
      setPassword('');
      setCity('');
      navigation.navigate('Home');
    }
  };

  return (
    <>
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
          disabled={!canEdit}
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
          disabled={!canEdit}
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
          disabled={!canEdit}
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
          disabled={!canEdit}
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
          disabled={!canEdit}
        />
      </View>
      {userInformation ? (
        <Button
          mode="contained"
          color={colors.error}
          style={globalStyles.button}
          uppercase={false}
          onPress={() => logOutHandler()}>
          <Text style={globalStyles.buttonText}>Log Out</Text>
        </Button>
      ) : (
        <Button
          mode="contained"
          color={colors.primary}
          style={globalStyles.button}
          uppercase={false}
          onPress={() => onSubmit()}>
          <Text style={globalStyles.buttonText}>Sign Up</Text>
        </Button>
      )}
    </>
  );
};

export default UserInformationForm;
