import React, {useContext} from 'react';
import {Text} from 'react-native';

import SessionContext from '../../context/session/sessionContext';

const Home = () => {
  const {userInformation} = useContext(SessionContext);
  console.log('Usuario' + userInformation);
  return <Text>{userInformation.name}</Text>;
};

export default Home;
