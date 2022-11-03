import React, {useReducer} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import SessionReducer from './sessionReducer';
import SessionContext from './sessionContext';

const SessionState = props => {
  /* The initial state of the application. */
  const initialState = {
    userInformation: null,
    isLoading: true,
  };

  const [state, dispatch] = useReducer(SessionReducer, initialState);

  // Actions
  const loading = () => {
    dispatch({
      type: 'LOADING',
    });
  };

  /**
    It gets the user from the AsyncStorage, if it doesn't exist, it alerts the user, if it does exist,
    it checks if the password is correct, if it's not, it alerts the user, if it is, it sets the
    userLogged in the AsyncStorage and navigates to the Home screen.

    @param userInfo - is an object with the username and password of the user.
    @param navigation - is the navigation object that is passed to the component.
    @returns the dispatch function.
   */
  const login = async (userInfo, navigation) => {
    try {
      const user = await AsyncStorage.getItem(`user-${userInfo.username}`);
      const userInformation = JSON.parse(user);
      if (!userInformation) {
        alert('Usuario no encontrado');
        dispatch({
          type: 'LOG_IN',
          payload: {
            userInformation,
          },
        });
        return;
      } else if (userInformation.password !== userInfo.password) {
        alert('Contraseña incorrecta');
        dispatch({
          type: 'LOG_IN',
          payload: {
            userInformation,
          },
        });
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * It takes in a userInformation object, and then it sets the userInformation object to a key in AsyncStorage.

    The key is a string made up of  user-${username} of the userInformation object.
    The value is the userInformation object, but it's been stringified.

    Then, it sets the userLogged key to the username of the userInformation object.

    Then, it dispatches an action to the reducer.
    The action has a type of SIGN_UP, and the payload is the userInformation object.
   */
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

  /**
   * It checks if there is a user logged in, if there is, it gets the user information and stores it in
   * the state, if there isn't, it removes the userLogged key from the AsyncStorage and sets the
   * userInformation to null.
   */
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

  /**
   * It removes the userLogged item from the AsyncStorage and then navigates to the Login screen
   * @returns the dispatch function.
   */
  const logOut = async props => {
    const {navigate} = props;
    try {
      await AsyncStorage.removeItem('userLogged');
      dispatch({
        type: 'LOG_OUT',
        payload: {userInformation: null},
      });
    } catch (error) {
      console.log(error);
      return;
    }
    navigate('Login');
  };

  return (
    <SessionContext.Provider
      value={{
        userInformation: state.userInformation,
        isLoading: state.isLoading,
        loading,
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
