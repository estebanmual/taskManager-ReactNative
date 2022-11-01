import React, {useReducer} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import TasksReducer from './tasksReducer';
import TasksContext from './tasksContext';
import {bubbleSortByDate} from '../../helpers';

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
        const orderTasks = bubbleSortByDate(tasksParsed);
        await AsyncStorage.setItem(
          `tasks-${username}`,
          JSON.stringify(orderTasks),
        );
        dispatch({
          type: 'ADD_TASK',
          payload: {
            tasks: orderTasks,
          },
        });
      } else {
        await AsyncStorage.setItem(`tasks-${username}`, JSON.stringify([task]));
        dispatch({
          type: 'ADD_TASK',
          payload: {
            tasks: [task],
          },
        });
      }
    } catch (error) {
      console.log(error);
      return;
    }
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
        const orderTasks = bubbleSortByDate(newTasks);
        await AsyncStorage.setItem(
          `tasks-${username}`,
          JSON.stringify(orderTasks),
        );
        dispatch({
          type: 'UPDATE_TASK',
          payload: {
            tasks: orderTasks,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id, username) => {
    // Eliminar la tarea del AsyncStorage
    try {
      const tasks = await AsyncStorage.getItem(`tasks-${username}`);
      if (tasks) {
        const tasksParsed = JSON.parse(tasks);
        const newTasks = tasksParsed.filter(item => item.id !== id);
        await AsyncStorage.setItem(
          `tasks-${username}`,
          JSON.stringify(newTasks),
        );
      }
    } catch (error) {
      console.log(error);
    }

    // Eliminar la tarea del state
    dispatch({
      type: 'DELETE_TASK',
      payload: {
        id,
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
        deleteTask,
      }}>
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksState;
