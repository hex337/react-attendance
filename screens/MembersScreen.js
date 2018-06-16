import React, { Component, PureComponent } from 'react';

import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import Search from 'react-native-search-box';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import BeltIcon from '../components/BeltIcon';

class MemberListItem extends PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.member);
  };

  render() {
    const mem = this.props.member;
    const bgColor = this.props.selected ? "lightblue" : "white";
    const rowHeight = 60;

    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'stretch', backgroundColor: bgColor, height: rowHeight }}>
          <View style={{ width: rowHeight, height: rowHeight }}>
            <BeltIcon name={mem.belt.name} id={mem.belt.id} width={rowHeight * 1.2} height={rowHeight} />
          </View>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 16,
            }}>
              {mem.firstName} {mem.lastName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class MembersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  static navigationOptions = {
    title: 'Members',
  };

  _onChangeText = (text) => {
    return new Promise((resolve, reject) => {
      this.setState({query: text});
      resolve();
    });
  };

  _onPressItem = (member) => {
    this.props.navigation.navigate('Member', {
      member: member
    });
  };

  _keyExtractor = (member, ndx) => member.id;

  _renderMemberListItem = ({item}) => (
    <MemberListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!(this.state.selected == item.id)}
      member={item}
    />
  );

  render() {
    const query_string = this.state.query;
    const GET_MEMBERS = gql`
    {
      members(queryString: "${query_string}") {
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
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch' }}>
        <View style={{ }}>
          <Search
            ref="search_box"
            placeholder="Seach"
            onChangeText={this._onChangeText}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Query query={GET_MEMBERS}>
            {({ loading, error, data }) => {
              if (loading) return <Text>Loading Members...</Text>;
              if (error) return <Text>Error: {error.message}</Text>;

              return (
                <FlatList
                  data={data.members}
                  extraData={this.state}
                  renderItem={this._renderMemberListItem}
                  keyExtractor={this._keyExtractor}
                />
              );
            }}
          </Query>
        </View>
      </View>
    );
  }
}
