import React from 'react';
import {ScrollView, Text, View} from 'react-native';

import {Button, TextInput} from 'react-native-paper';

import {colors, globalStyles} from '../../styles/globalStyles';

const Login = props => {
  const {navigation} = props;
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
          <TextInput
            mode="outlined"
            label="Name"
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
            label="Lastname"
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
