import React, {useState, useContext} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

import {TextInput, Button} from 'react-native-paper';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

import {globalStyles, theme} from '../../styles/globalStyles';
import TasksContext from '../../context/tasks/tasksContext';
import SessionContext from '../../context/session/sessionContext';
import {generarId} from '../../helpers';

const NewTask = props => {
  const {addTask} = useContext(TasksContext);
  const {userInformation} = useContext(SessionContext);

  const {navigation} = props;

  // Inputs formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());

  // Cambiar fecha cuando se selecciona en el calendario
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  // Abrir calendario
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      mode: 'date',
      display: 'default',
      onChange: onChange,
    });
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
          />
          <TextInput
            label="Description"
            mode="outlined"
            style={[globalStyles.input, {height: 100}]}
            multiline={true}
            numberOfLines={4}
            onChangeText={text => setDescription(text)}
            value={description}
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
        <Button
          mode="contained"
          style={globalStyles.button}
          theme={theme}
          onPress={() => saveTask()}>
          <Text style={globalStyles.buttonText}>Save Task</Text>
        </Button>
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

export default NewTask;
