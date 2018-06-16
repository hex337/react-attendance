import React, { Component } from 'react';
import moment from 'moment-timezone';

import {
  SectionList,
  Text,
  View
} from 'react-native';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default class ClassesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  static navigationOptions = {
    title: 'Classes',
  };

  _keyExtractor = (item, index) => item.id;

  sectionsFromData(data) {
    meetingsByDate = {};
    sections = [];

    data.meetings.forEach(function(meeting) {
      var mom = moment.tz(meeting.met, "Etc/GMT").tz("America/Los_Angeles");
      meetingWithMoment = meeting;
      meetingWithMoment.met = mom;

      var dateStr = mom.format('ddd MMM Do \'YY');

      if (dateStr in meetingsByDate) {
        meetingsByDate[dateStr].push(meetingWithMoment);
      }
      else {
        meetingsByDate[dateStr] = [meetingWithMoment]
      }
    });

    for (var title in meetingsByDate) {
      sections.push({
        title: title,
        data: meetingsByDate[title]
      });
    }

    return sections;
  }

  _renderMeetingListItem = ({item}) => (
    <View style={{
      flex: 1,
      height: 35,
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignContent: 'stretch',
      flexDirection: 'row',
      padding: 3,
      borderTopWidth: 1,
    }}>
      <Text>{moment.tz(item.met, "Etc/GMT").tz("America/Los_Angeles").format('hh:mm a')} - {item.meetingType.name}</Text>
    </View>
  );

  _renderSectionHeader = ({section: {title}}) => (
    <View style={{
      flex: 1,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      flexDirection: 'row',
      padding: 3,
      backgroundColor: 'lightblue',
      borderTopWidth: 1,
    }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
    </View>
  );

  render() {
    const GET_MEETINGS = gql`
    {
      meetings(limit: 20) {
        id
        met
        meetingType {
          name
        }
      }
    }
    `;

    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch' }}>
        <View style={{ flex: 1 }}>
          <Query query={GET_MEETINGS}>
            {({ loading, error, data }) => {
              if (loading) return <Text>Loading Classes...</Text>;
              if (error) return <Text>Error: {error.message}</Text>;

              var sections = this.sectionsFromData(data);

              return (
                <SectionList
                  sections={sections}
                  extraData={this.state}
                  renderItem={this._renderMeetingListItem}
                  renderSectionHeader={this._renderSectionHeader}
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
