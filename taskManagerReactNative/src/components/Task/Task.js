import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Checkbox} from 'react-native-paper';

import TasksContext from '../../context/tasks/tasksContext';
import {theme} from '../../styles/globalStyles';
import {formatearFecha} from '../../helpers';

const Task = props => {
  const {task, username} = props;
  const {updateTask} = useContext(TasksContext);

  const [checked, setChecked] = useState(task.done);

  const handleDoneTask = () => {
    setChecked(!checked);
    updateTask({...task, done: !task.done}, username);
  };
  return (
    <View style={styles.taskContainer}>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => handleDoneTask()}
        color={theme.colors.primary}
      />
      <View style={styles.informationContainer}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <Text style={styles.date}>{formatearFecha(task.date)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    backgroundColor: theme.colors.background,
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
});

export default Task;
