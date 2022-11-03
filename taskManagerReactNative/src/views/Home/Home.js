import React, {useContext, useEffect} from 'react';
import {Text, ScrollView, View} from 'react-native';

import {FAB} from 'react-native-paper';

import Header from '../../components/Header/Header';
import Weather from '../../components/Weather/Weather';
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

  if (userInformation) {
    return (
      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header navigation={navigation} />
          <Weather />
          <Text style={globalStyles.subtitle}>
            {tasks.length === 0 ? 'No tasks' : 'Tasks'}
          </Text>
          <View style={{marginBottom: 15}}>
            {tasks.map(task => (
              <Task
                key={task.id}
                task={task}
                username={userInformation.username}
                navigate={navigation.navigate}
              />
            ))}
          </View>
        </ScrollView>
        <FAB
          style={globalStyles.fab}
          icon="plus"
          color={'#FFF'}
          onPress={() =>
            navigation.navigate('TaskInformation', {headerTitle: 'New Task'})
          }
        />
      </>
    );
  }
  return null;
};

export default Home;
