import React, {useReducer} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import SessionReducer from './sessionReducer';
import SessionContext from './sessionContext';

const SessionState = props => {
  // Crear el state inicial
  const initialState = {
    userInformation: null,
    isLoading: true,
  };

  // useReducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(SessionReducer, initialState);

  // Actions
  const login = async (userInfo, navigation, setPassword, setUsername) => {
    try {
      const user = await AsyncStorage.getItem(`user-${userInfo.username}`);
      const userInformation = JSON.parse(user);
      if (!userInformation) {
        alert('Usuario no encontrado');
        return;
      } else if (userInformation.password !== userInfo.password) {
        alert('Contraseña incorrecta');
        return;
      } else {
        await AsyncStorage.setItem('userLogged', userInformation.username);
        dispatch({
          type: 'LOG_IN',
          payload: {
            userInformation,
          },
        });
        navigation.navigate('Home');
        setPassword('');
        setUsername('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async userInformation => {
    try {
      await AsyncStorage.setItem(
        `user-${userInformation.username}`,
        JSON.stringify(userInformation),
      );
      await AsyncStorage.setItem('userLogged', userInformation.username);
      dispatch({
        type: 'SIGN_UP',
        payload: {userInformation},
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loggedUser = async () => {
    const userLogged = await AsyncStorage.getItem('userLogged');
    if (userLogged) {
      const userInformation = JSON.parse(
        await AsyncStorage.getItem(`user-${userLogged}`),
      );
      dispatch({
        type: 'LOGGED_USER',
        payload: {userInformation},
      });
    } else {
      await AsyncStorage.removeItem('userLogged');
      dispatch({
        type: 'LOGGED_USER',
        payload: {userInformation: null},
      });
    }
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('userLogged');
      dispatch({
        type: 'LOG_OUT',
        payload: {userInformation: null},
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        userInformation: state.userInformation,
        isLoading: state.isLoading,
        login,
        signUp,
        loggedUser,
        logOut,
      }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionState;
