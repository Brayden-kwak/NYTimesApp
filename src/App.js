import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';

import HomeIcon from 'react-native-vector-icons/Foundation';
import FeedIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './pages/HomeScreen';
import ScriptScreen from './pages/ScriptScreen';
import NewsDetail from './pages/NewsDetail';
import Header from './pages/Header';
import DetailHeader from './pages/DetailHeader';

import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './utils/reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              borderRadius: 30,
              backgroundColor: 'black',
              height: 90,
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
          }}>
          <Tab.Screen
            name="홈"
            component={HomeScreen}
            options={{
              tabBarIcon: ({color}) => (
                <HomeIcon
                  name="home"
                  size={28}
                  color={color}
                  style={styles.iconStyle}
                />
              ),
              header: props => <Header {...props} />,
            }}
          />
          <Tab.Screen
            name="newsDetail"
            component={NewsDetail}
            options={{
              tabBarButton: () => null,
              tabBarStyle: {display: 'none'},
              header: props => <DetailHeader {...props} />,
            }}
          />
          <Tab.Screen
            name="스크랩"
            component={ScriptScreen}
            options={{
              tabBarIcon: ({color}) => (
                <FeedIcon
                  name="newspaper-variant-outline"
                  size={28}
                  color={color}
                  style={styles.iconStyle}
                />
              ),
              header: props => <Header {...props} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    marginTop: 10,
  },
});

export default App;
