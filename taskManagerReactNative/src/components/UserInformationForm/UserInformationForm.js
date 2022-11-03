import React, {useState, useContext, useEffect} from 'react';
import {View, Text} from 'react-native';

import {Button, TextInput} from 'react-native-paper';
import {useValidation} from 'react-native-form-validator';

import {theme, globalStyles} from '../../styles/globalStyles';
import SessionContext from '../../context/session/sessionContext';

const UserInformationForm = props => {
  const {navigation} = props;
  const {signUp, userInformation, logOut, loading} = useContext(SessionContext);

  //Form inputs
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [canEdit, setCanEdit] = useState(true);

  /*
    Setting the state of the form to the userInformation object.
    With this we will declare if we are signing up or editing
  */
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

  //Form validations
  const {validate, isFieldInError, getErrorsInField, isFormValid} =
    useValidation({
      state: {name, lastname, username, password, city},
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
   * When the user clicks the logout button, the loading function is called, and after 1 second, the
   * logout function is called.
   */
  const logOutHandler = () => {
    loading();
    setTimeout(() => {
      logOut(navigation);
    }, 1000);
  };

  /**
   * The function onSubmit() is called when the user presses the submit button. It validates the form
   * and if the form is valid, it creates a userInformation object with the user's information and a
   * random avatar number. Then it calls the signUp() function and navigates to the Home screen.
   */
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

      /* Clearing the form after the user submits it. */
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
          editable={canEdit}
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
          editable={canEdit}
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
          editable={canEdit}
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
          editable={canEdit}
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
          editable={canEdit}
        />
      </View>
      {userInformation ? (
        <Button
          mode="contained"
          color={theme.colors.error}
          style={globalStyles.button}
          uppercase={false}
          onPress={() => logOutHandler()}>
          <Text style={globalStyles.buttonText}>Log Out</Text>
        </Button>
      ) : (
        <Button
          mode="contained"
          theme={theme}
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
