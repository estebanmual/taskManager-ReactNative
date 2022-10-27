import React, {useState, useContext, useEffect} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

import {TextInput, Button} from 'react-native-paper';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

import {globalStyles, theme} from '../../styles/globalStyles';
import TasksContext from '../../context/tasks/tasksContext';
import SessionContext from '../../context/session/sessionContext';
import {generarId} from '../../helpers';

const TaskInformation = props => {
  const {addTask} = useContext(TasksContext);
  const {userInformation} = useContext(SessionContext);
  console.log(props);
  const {navigation, route} = props;

  // Inputs formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());

  const [editable, setEditable] = useState(true);

  useEffect(() => {
    if (route.params.task) {
      setTitle(route.params.task.title);
      setDescription(route.params.task.description);
      setDate(new Date(route.params.task.date));
      setEditable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cambiar fecha cuando se selecciona en el calendario
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  // Abrir calendario
  const showDatePicker = () => {
    if (editable) {
      DateTimePickerAndroid.open({
        value: date,
        mode: 'date',
        display: 'default',
        onChange: onChange,
      });
    }
  };

  // Guardar nueva tarea
  const saveTask = () => {
    const task = {title, description, date};
    addTask({...task, id: generarId(), done: false}, userInformation.username);
    navigation.goBack();
  };

  return (
    <View style={styles.viewContainer}>
      <View style={styles.container}>
        <View style={globalStyles.inputContainer}>
          <TextInput
            mode="outlined"
            label="Title"
            style={globalStyles.input}
            onChangeText={text => setTitle(text)}
            value={title}
            editable={editable}
          />
          <TextInput
            label="Description"
            mode="outlined"
            style={[globalStyles.input, {height: 100}]}
            multiline={true}
            numberOfLines={4}
            onChangeText={text => setDescription(text)}
            value={description}
            editable={editable}
          />
          <Pressable onPress={showDatePicker}>
            <TextInput
              mode="outlined"
              label="Date"
              style={globalStyles.input}
              editable={false}
              value={date.toLocaleDateString()}
            />
          </Pressable>
        </View>
        {editable ? (
          <Button
            mode="contained"
            style={globalStyles.button}
            theme={theme}
            uppercase={false}
            onPress={() => saveTask()}>
            <Text style={globalStyles.buttonText}>Save Task</Text>
          </Button>
        ) : (
          <Button
            mode="contained"
            style={globalStyles.button}
            color={theme.colors.error}
            uppercase={false}
            onPress={() => saveTask()}>
            <Text style={globalStyles.buttonText}>Delete Task</Text>
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: theme.colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: theme.colors.background,
    alignSelf: 'center',
  },
});

export default TaskInformation;
