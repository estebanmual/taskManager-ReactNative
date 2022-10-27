import React, {useReducer} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import TasksReducer from './tasksReducer';
import TasksContext from './tasksContext';

const TasksState = props => {
  // Crear el state inicial
  const initialState = {
    tasks: [],
  };

  // useReducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(TasksReducer, initialState);

  // Actions
  const addTask = async task => {
    // Guardar la tarea en el AsyncStorage
    console.log(state);
    // Agregar la tarea al state
    dispatch({
      type: 'ADD_TASK',
      payload: {
        task,
      },
    });
  };

  return (
    <TasksContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
      }}>
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksState;
