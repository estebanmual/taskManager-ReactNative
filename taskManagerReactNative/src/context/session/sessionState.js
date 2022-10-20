import React, {useReducer} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import SessionReducer from './sessionReducer';
import SessionContext from './sessionContext';

const SessionState = props => {
  // Crear el state inicial
  const initialState = {
    userInformation: {},
    isLoading: true,
  };

  // useReducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(SessionReducer, initialState);

  // Actions
  const logIn = () => {
    dispatch({
      type: 'LOG_IN',
    });
  };

  const signUp = async userInformation => {
    await AsyncStorage.setItem(
      `user-${userInformation.username}`,
      JSON.stringify(userInformation),
    );
    await AsyncStorage.setItem('userLogged', userInformation.username);
    dispatch({
      type: 'SIGN_UP',
      payload: {userInformation},
    });
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
      dispatch({
        type: 'LOGGED_USER',
        payload: {userInformation: {}},
      });
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('userLogged');
    dispatch({
      type: 'LOG_OUT',
      payload: {userInformation: {}},
    });
  };

  return (
    <SessionContext.Provider
      value={{
        userInformation: state.userInformation,
        isLoading: state.isLoading,
        logIn,
        signUp,
        loggedUser,
        logOut,
      }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionState;
