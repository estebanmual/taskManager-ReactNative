import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import Login from './views/Login/Login';

const Stack = createStackNavigator();

// Tema de la aplicación
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};
console.log(theme);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
