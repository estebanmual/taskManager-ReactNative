import React, {useContext} from 'react';
import {Image} from 'react-native';

import {FAB} from 'react-native-paper';

import Header from '../../components/Header/Header';
import SessionContext from '../../context/session/sessionContext';
import {globalStyles} from '../../styles/globalStyles';

const Home = props => {
  const {navigation} = props;

  return (
    <>
      <Header navigation={navigation} />
      <Image source={require('../../assets/images/home.png')} />
      <FAB
        style={globalStyles.fab}
        icon="plus"
        color={'#FFF'}
        onPress={() => navigation.navigate('NewTask')}
      />
    </>
  );
};

export default Home;
