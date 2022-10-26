import React, {useContext} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

import {Avatar} from 'react-native-paper';

import UserInformationForm from '../../components/UserInformationForm/UserInformationForm';
import SessionContext from '../../context/session/sessionContext';
import {avatarImages} from '../../helpers/images';
import {theme} from '../../styles/globalStyles';

const Profile = props => {
  const {navigation} = props;
  const {userInformation} = useContext(SessionContext);

  if (userInformation) {
    return (
      <ScrollView
        style={styles.viewContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={65}
              source={avatarImages[userInformation.avatarNumber + 1]}
            />
          </View>
          <View style={styles.formContainer}>
            <UserInformationForm navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: theme.colors.background,
  },
  container: {
    width: '85%',
    backgroundColor: theme.colors.background,
    alignSelf: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  formContainer: {
    marginBottom: 20,
    backgroundColor: theme.colors.background,
  },
});

export default Profile;
