import React, {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';

import {TextInput} from 'react-native-paper';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

import {globalStyles, theme} from '../../styles/globalStyles';

const NewTask = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      mode: 'date',
      display: 'default',
      onChange: onChange,
    });
  };
  return (
    <View style={styles.viewContainer}>
      <View style={styles.container}>
        <View style={globalStyles.inputContainer}>
          <TextInput mode="outlined" label="Title" style={globalStyles.input} />
          <TextInput
            label="Description"
            mode="outlined"
            style={[globalStyles.input, {height: 100}]}
            multiline={true}
            numberOfLines={4}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  container: {
    width: '85%',
    backgroundColor: theme.colors.background,
    alignSelf: 'center',
    paddingTop: 20,
  },
  modalContainer: {
    height: '50%',
    width: '85%',
    alignSelf: 'center',
  },
});

export default NewTask;
