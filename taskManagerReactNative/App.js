import 'react-native-gesture-handler';
import React, {useEffect, useContext} from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ActivityIndicator, Provider as PaperProvider} from 'react-native-paper';

// Vistas
import Login from './src/views/Login/Login';
import SignUp from './src/views/SignUp/SignUp';
import Home from './src/views/Home/Home';
import Profile from './src/views/Profile/Profile';
import TaskInformation from './src/views/TaskInformation/TaskInformation';

import {theme, globalStyles} from './src/styles/globalStyles';
import SessionState from './src/context/session/sessionState';
import SessionContext from './src/context/session/sessionContext';
import TasksState from './src/context/tasks/tasksState';

const Stack = createStackNavigator();

function App() {
  const {loggedUser, isLoading, userInformation} = useContext(SessionContext);

  useEffect(() => {
    setTimeout(() => {
      loggedUser();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
  return (
    <TasksState>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={userInformation ? 'Home' : 'Login'}>
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
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                headerStyle: globalStyles.headerStyle,
                headerTitleStyle: globalStyles.headerTitleStyle,
                headerTintColor: theme.colors.primary,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="TaskInformation"
              component={TaskInformation}
              options={({route}) => ({
                title: route.params.headerTitle,
                headerStyle: globalStyles.headerStyle,
                headerTitleStyle: globalStyles.headerTitleStyle,
                headerTintColor: theme.colors.primary,
                headerTitleAlign: 'center',
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </TasksState>
  );
}

export default () => {
  return (
    <SessionState>
      <App />
    </SessionState>
  );
};
