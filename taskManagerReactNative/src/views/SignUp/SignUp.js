import React from 'react';
import {ScrollView, Text, View} from 'react-native';

import {globalStyles} from '../../styles/globalStyles';
import UserInformationForm from '../../components/UserInformationForm/UserInformationForm';

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
        <UserInformationForm navigation={navigation} />
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
