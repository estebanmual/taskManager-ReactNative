import React, {useContext} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

import {Avatar} from 'react-native-paper';

import SessionContext from '../../context/session/sessionContext';
import {avatarImages} from '../../helpers/images';
import {theme} from '../../styles/globalStyles';

const Profile = () => {
  const {userInformation} = useContext(SessionContext);

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={65}
        source={avatarImages[userInformation.avatarNumber + 1]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
});

export default Profile;
