import React, {useContext} from 'react';
import {Text, Button, Image} from 'react-native';

import Header from '../../components/Header/Header';

import SessionContext from '../../context/session/sessionContext';

const Home = props => {
  const {navigation} = props;

  return (
    <>
      <Header navigation={navigation} />
      <Image source={require('../../assets/images/home.png')} />
    </>
  );
};

export default Home;
