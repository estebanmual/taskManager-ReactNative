import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

// Vistas
import Login from './src/views/Login/Login';
import SignUp from './src/views/SignUp/SignUp';

const Stack = createStackNavigator();

const App = () => {
  const theme = {
    ...DefaultTheme,
  };
  console.log(theme);
  return (
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
  );
};

export default App;
