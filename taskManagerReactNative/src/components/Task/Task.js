import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

import {Checkbox} from 'react-native-paper';

import TasksContext from '../../context/tasks/tasksContext';
import {theme} from '../../styles/globalStyles';
import {formatearFecha} from '../../helpers';

const Task = props => {
  const {task, username, navigate} = props;
  const {updateTask} = useContext(TasksContext);

  const [checked, setChecked] = useState(task.done);

  const expiredTask = new Date(task.date) < new Date();

  const handleDoneTask = () => {
    setChecked(!checked);
    updateTask({...task, done: !task.done}, username);
  };

  const openTaskDetails = () => {
    navigate('TaskInformation', {task, headerTitle: 'Task Details'});
  };

  return (
    <Pressable onLongPress={() => openTaskDetails()}>
      <View style={styles.taskContainer}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => handleDoneTask()}
          color={theme.colors.primary}
        />
        <View style={styles.informationContainer}>
          <Text
            style={[
              styles.title,
              expiredTask && styles.expiredTask,
              checked && styles.completedTask,
            ]}>
            {task.title}
          </Text>
          <Text
            style={[
              styles.description,
              expiredTask && styles.expiredTask,
              checked && styles.completedTask,
            ]}>
            {task.description}
          </Text>
          <Text
            style={[
              styles.date,
              expiredTask && styles.expiredTask,
              checked && styles.completedTask,
            ]}>
            {formatearFecha(task.date)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '95%',
    backgroundColor: '#FFF',
    borderRadius: theme.roundness,
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 1,
  },
  informationContainer: {
    marginLeft: 10,
  },
  title: {
    ...theme.fonts.regular,
    fontSize: 20,
    color: theme.colors.text,
  },
  description: {
    ...theme.fonts.regular,
    fontSize: 16,
    opacity: 0.8,
    color: theme.colors.text,
  },
  date: {
    ...theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.primary,
  },
  expiredTask: {
    color: theme.colors.error,
  },
  completedTask: {
    color: theme.colors.completed,
  },
});

export default Task;
