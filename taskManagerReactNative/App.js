import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ActivityIndicator, Provider as PaperProvider} from 'react-native-paper';

// Vistas
import Login from './src/views/Login/Login';
import SignUp from './src/views/SignUp/SignUp';
import Home from './src/views/Home/Home';

import {theme} from './src/styles/globalStyles';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInformation, setUserInformation] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {userInformation === null ? (
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
        ) : (
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
