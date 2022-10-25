import React, {useContext} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {longPressHandlerName} from 'react-native-gesture-handler/lib/typescript/handlers/LongPressGestureHandler';

import {Avatar} from 'react-native-paper';

import SessionContext from '../../context/session/sessionContext';
import {avatarImages} from '../../helpers/images';
import {theme} from '../../styles/globalStyles';

const Header = () => {
  const {userInformation} = useContext(SessionContext);

  const pressHandler = () => {
    console.log('Pressed');
  };

  if (userInformation) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Hi, {userInformation.name} 👋</Text>
        <Pressable style={styles.imageContainer} onPress={() => pressHandler()}>
          <Avatar.Image
            size={65}
            source={avatarImages[userInformation.avatarNumber + 1]}
          />
        </Pressable>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  headerText: {
    ...theme.fonts.regular,
    fontSize: 20,
    color: theme.colors.text,
    marginRight: 16,
  },
  imageContainer: {},
});

export default Header;
