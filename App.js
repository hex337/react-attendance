import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import ApolloClient from 'apollo-boost';
import {
  ApolloProvider
} from 'react-apollo';

import ClassScreen from './screens/ClassScreen';
import ClassesScreen from './screens/ClassesScreen';
import MemberScreen from './screens/MemberScreen';
import MembersScreen from './screens/MembersScreen';

const client = new ApolloClient({
  uri: 'http://localhost:4000/api/graphql'
});

const ClassStack = createStackNavigator({
  Classes: ClassesScreen,
  Class: ClassScreen
});

const MemberStack = createStackNavigator({
  Members: MembersScreen,
  Member: MemberScreen
});

const AttendanceApp = createBottomTabNavigator({
  Classes: ClassStack,
  Members: MemberStack,
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Class' || routeName === 'Classes') {
        iconName = `ios-list${focused ? '' : '-outline'}`;
      }
      else if (routeName === 'Member' || routeName === 'Members') {
        iconName = `ios-people${focused ? '' : '-outline'}`;
      }

      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
    headerTitleStyle: { textAlign: 'center' }
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'grey'
  }
}
);

function ApolloWrapper(CMP) {
  return class extends Component {
    render() {
      return (
        <ApolloProvider client={client}>
          <CMP {...this.props}/>
        </ApolloProvider>
      );
    }
  };
}

export default ApolloWrapper(AttendanceApp);
