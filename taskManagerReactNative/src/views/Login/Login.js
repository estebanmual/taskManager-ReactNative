import React from 'react';
import {Text, View} from 'react-native';

import {Button, TextInput} from 'react-native-paper';

import {colors} from '../../styles/globalStyles';

const Login = () => {
  return (
    <>
      <View>
        <Text>
          <Text>Welcome,</Text>
          {'\n'}
          Glad to see you!
        </Text>
      </View>
      <View>
        <TextInput
          mode="outlined"
          label="Email"
          activeOutlineColor={colors.primary}
        />
        <TextInput
          mode="outlined"
          label="Password"
          activeOutlineColor={colors.primary}
        />
      </View>

      <Button mode="contained" color={colors.primary}>
        Login
      </Button>

      <Text>
        Don't have an account?
        <Text>Sign up now</Text>
      </Text>
    </>
  );
};

export default Login;
