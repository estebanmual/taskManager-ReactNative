import React, {useContext, useEffect} from 'react';
import {Image, Text} from 'react-native';

import {FAB} from 'react-native-paper';

import Header from '../../components/Header/Header';
import Task from '../../components/Task/Task';
import TasksContext from '../../context/tasks/tasksContext';
import SessionContext from '../../context/session/sessionContext';
import {globalStyles} from '../../styles/globalStyles';

const Home = props => {
  const {navigation} = props;
  const {tasks, loadTasks} = useContext(TasksContext);
  const {userInformation} = useContext(SessionContext);

  useEffect(() => {
    if (userInformation) {
      loadTasks(userInformation.username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInformation]);

  return (
    <>
      <Header navigation={navigation} />
      <Image source={require('../../assets/images/home.png')} />
      {tasks.length === 0 ? <Text>No tasks</Text> : <Text>Tasks</Text>}
      {tasks.length > 0 &&
        tasks.map(task => (
          <Task key={task.id} task={task} username={userInformation.username} />
        ))}
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
