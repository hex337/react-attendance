import React, { Component } from 'react';

import {
  Text,
  View
} from 'react-native';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default class MemberScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member_id: '',
      member: null
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('member').firstName + ' ' + navigation.getParam('member').lastName
    };
  };

  render() {
    const { navigation } = this.props;
    const member = navigation.getParam('member', null);

    const GET_MEMBER = gql`
    {
      members(id: "${member.id}") {
        id
        firstName
        lastName
        belt {
          id
          name
        }
      }
    }
    `;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        { member &&
          <Text>Member Screen for {member.firstName} {member.lastName}.</Text>
        }
      </View>
    );
  }
}
