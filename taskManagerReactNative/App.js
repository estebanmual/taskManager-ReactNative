import 'react-native-gesture-handler';
import React, {useEffect, useState, useContext} from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ActivityIndicator, Provider as PaperProvider} from 'react-native-paper';

// Vistas
import Login from './src/views/Login/Login';
import SignUp from './src/views/SignUp/SignUp';
import Home from './src/views/Home/Home';

import {theme} from './src/styles/globalStyles';
import SessionState from './src/context/session/sessionState';
import SessionContext from './src/context/session/sessionContext';

const Stack = createStackNavigator();

function App() {
  const {logIn, isLoading} = useContext(SessionContext);

  useEffect(() => {
    setTimeout(() => logIn(), 500);
  }, []);

  /* if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  } */
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default () => {
  return (
    <SessionState>
      <App />
    </SessionState>
  );
};
