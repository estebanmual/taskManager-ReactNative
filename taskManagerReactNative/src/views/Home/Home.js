import React, {useContext} from 'react';
import {Text, Button} from 'react-native';

import SessionContext from '../../context/session/sessionContext';

const Home = props => {
  const {navigation} = props;
  const {userInformation, logOut} = useContext(SessionContext);

  console.log(userInformation);
  const cerrarSesion = () => {
    logOut();
    navigation.navigate('Login');
  };
  return (
    <>
      <Text>
        {userInformation === {} || userInformation === undefined
          ? null
          : userInformation.name}
      </Text>
      <Button title="Cerrar sesión" onPress={() => cerrarSesion()} />
    </>
  );
};

export default Home;
