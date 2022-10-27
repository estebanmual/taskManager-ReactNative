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
  const addTask = async (task, username) => {
    // Guardar la tarea en el AsyncStorage
    try {
      const tasks = await AsyncStorage.getItem(`tasks-${username}`);
      if (tasks) {
        const tasksParsed = JSON.parse(tasks);
        tasksParsed.push(task);
        await AsyncStorage.setItem(
          `tasks-${username}`,
          JSON.stringify(tasksParsed),
        );
      } else {
        await AsyncStorage.setItem(`tasks-${username}`, JSON.stringify([task]));
      }
    } catch (error) {
      console.log(error);
    }

    // Agregar la tarea al state
    dispatch({
      type: 'ADD_TASK',
      payload: {
        task,
      },
    });
  };

  const loadTasks = async username => {
    // Cargar las tareas del AsyncStorage
    try {
      const tasks = await AsyncStorage.getItem(`tasks-${username}`);
      if (tasks) {
        dispatch({
          type: 'LOAD_TASKS',
          payload: {
            tasks: JSON.parse(tasks),
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (task, username) => {
    // Guardar la tarea en el AsyncStorage
    try {
      const tasks = await AsyncStorage.getItem(`tasks-${username}`);
      if (tasks) {
        const tasksParsed = JSON.parse(tasks);
        const newTasks = tasksParsed.map(item => {
          if (item.id === task.id) {
            return task;
          }
          return item;
        });
        await AsyncStorage.setItem(
          `tasks-${username}`,
          JSON.stringify(newTasks),
        );
      }
    } catch (error) {
      console.log(error);
    }

    // Agregar la tarea al state
    dispatch({
      type: 'UPDATE_TASK',
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
        loadTasks,
        updateTask,
      }}>
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksState;
