import React, {useReducer} from 'react';

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
  const logIn = () => {
    dispatch({
      type: 'LOG_IN',
    });
  };

  return (
    <SessionContext.Provider
      value={{
        userInformation: state.userInformation,
        isLoading: state.isLoading,
        logIn,
      }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionState;
