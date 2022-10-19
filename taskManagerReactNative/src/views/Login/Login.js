import React from 'react';
import {Text, View} from 'react-native';

import {Button, TextInput} from 'react-native-paper';

import {colors, globalStyles} from '../../styles/globalStyles';

const Login = props => {
  const {navigation} = props;
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
        <TextInput
          mode="outlined"
          label="Username"
          style={globalStyles.input}
          theme={{
            colors: {
              primary: colors.primary,
              text: colors.secondary,
              placeholder: colors.primary,
            },
            roundness: 10,
          }}
        />
        <TextInput
          mode="outlined"
          label="Password"
          secureTextEntry={true}
          style={globalStyles.input}
          theme={{
            colors: {
              primary: colors.primary,
              text: colors.secondary,
              placeholder: colors.primary,
            },
            roundness: 10,
          }}
        />
      </View>

      <Button
        mode="contained"
        color={colors.primary}
        theme={{roundness: 10}}
        style={globalStyles.button}
        uppercase={false}>
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
