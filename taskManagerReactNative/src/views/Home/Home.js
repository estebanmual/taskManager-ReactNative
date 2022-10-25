import React, {useContext} from 'react';
import {Text, Button} from 'react-native';

import Header from '../../components/Header/Header';

import SessionContext from '../../context/session/sessionContext';

const Home = props => {
  const {navigation} = props;
  const {logOut} = useContext(SessionContext);
  const cerrarSesion = () => {
    logOut();
  };
  return (
    <>
      <Header />
      <Button title="Cerrar sesión" onPress={() => cerrarSesion()} />
    </>
  );
};

export default Home;
