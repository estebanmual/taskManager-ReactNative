import React, {useReducer} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import TasksReducer from './tasksReducer';
import TasksContext from './tasksContext';
import {bubbleSortByDate} from '../../helpers';

const TasksState = props => {
  /* Setting the initial state of the tasks array to an empty array. */
  const initialState = {
    tasks: [],
  };

  const [state, dispatch] = useReducer(TasksReducer, initialState);

  // Actions
  /**
   * It adds a task to the AsyncStorage and then dispatches an action to the reducer.
   * @param task - {
   * @param username - string
   * @returns the value of the last expression in the function.
   */
  const addTask = async (task, username) => {
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

  /**
   * This function will load the tasks from the AsyncStorage and dispatch an action to the reducer to
   * update the state.
   */
  const loadTasks = async username => {
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

  /**
   * It takes a task and a username as parameters, gets the tasks from AsyncStorage, maps through the
   * tasks, and if the task id matches the task id passed in, it returns the task, otherwise it returns
   * the item. Then it orders the tasks by date and sets the tasks in AsyncStorage.
   * @param task - object
   * @param username - string
   */
  const updateTask = async (task, username) => {
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

  /**
   * It deletes a task from the AsyncStorage and then dispatches an action to the reducer.
   * @param id - the id of the task to be deleted
   * @param username - the username of the user
   */
  const deleteTask = async (id, username) => {
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
