import React, { Component } from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';

import Announcement from './Announcement';
import Nav from '../containers/Nav';

export default class AnnouncementFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(Cookies.get('token')),
    };

    this.announcements = this.announcements.bind(this);
    this.isMember = this.isMember.bind(this);
  }

  componentDidMount() {
    const userGroups = [];
    $.ajax({
      url: 'http://52.66.73.127/bonfire/bon-lara/public/api/get-home-feeds',
      method: 'GET',
      dataType: 'JSON',
      headers: {
        Authorization: `Bearer ${this.state.user.userToken}`,
      },
    }).then((data) => {
      this.setState({
        announcements: data[0].data,
      });
    });
    $.ajax({
      url: `http://52.66.73.127/bonfire/bon-lara/public/api/user-profile-with-interest/${this
        .state.user.userId}`,
      method: 'GET',
      dataType: 'JSON',
      headers: {
        Authorization: `Bearer ${this.state.user.userToken}`,
      },
    }).then((data) => {
      this.setState({ interests: data[0].data.interests });
    });
    $.ajax({
      url: 'http://52.66.73.127/bonfire/bon-lara/public/api/groups',
      method: 'GET',
      dataType: 'JSON',
      headers: {
        Authorization: `Bearer ${this.state.user.userToken}`,
      },
    }).then((data) => {
      const groups = data[0].data;
      for (let i = 0; i < groups.length; i++) {
        if (groups[i].groupCreator.userId === this.state.user.userId) {
          userGroups.push(groups[i]);
        } else if (this.isMember(groups[i].group_members)) {
          userGroups.push(groups[i]);
        }
      }
      this.setState({
        groups: userGroups,
      });
    });
  }

  announcements() {
    const filteredAnnouncements = [];
    const ordered = [];
    for (let i = 0; i < this.state.announcements.length; i++) {
      for (let l = 0; l < this.state.announcements[i].interests.length; l++) {
        for (let k = 0; k < this.state.interests.length; k++) {
          if (
            this.state.announcements[i].interests[l].name ===
              this.state.interests[k].name &&
            filteredAnnouncements.indexOf(this.state.announcements[i]) === -1
          ) {
            filteredAnnouncements.push(this.state.announcements[i]);
          }
        }
      }
    }
    for (let i = 0; i < this.state.announcements.length; i++) {
      for (let k = 0; k < this.state.groups.length; k++) {
        if (
          this.state.announcements[i].groupDetails.groupId ===
          this.state.groups[k].groupId
        ) {
          if (
            filteredAnnouncements.indexOf(this.state.announcements[i]) === -1
          ) {
            filteredAnnouncements.push(this.state.announcements[i]);
          }
        }
      }
    }
    for (let i = 0; i < this.state.announcements.length; i++) {
      if (filteredAnnouncements.indexOf(this.state.announcements[i])) {
        ordered.push(this.state.announcements[i]);
      }
    }
    return filteredAnnouncements.map((a) => <Announcement message={a} />);
  }

  isMember(members) {
    if (members === undefined) {
      return false;
    }
    for (let i = 0; i < members.length; i++) {
      if (members[i].userId === this.state.user.userId) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <div>
        {this.state.announcements &&
          this.state.interests &&
          this.state.groups &&
          this.announcements()}
      </div>
    );
  }
}
