import React from 'react';
import {View, StyleSheet} from 'react-native';

import {TextInput} from 'react-native-paper';

import {globalStyles, theme} from '../../styles/globalStyles';

const NewTask = () => {
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
});

export default NewTask;
