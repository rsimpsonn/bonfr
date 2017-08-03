import React, { Component, PropTypes } from 'react';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import $ from 'jquery';

import GroupCard from './GroupCard';

export default class ForYou extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(Cookies.get('token')),
    };

    this.filterGroups = this.filterGroups.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: 'http://52.66.73.127/bonfire/bon-lara/public/api/groups',
      method: 'GET',
      dataType: 'JSON',
      headers: {
        Authorization: `Bearer ${this.state.user.userToken}`,
      },
    }).then((data) => {
      this.setState({
        allGroups: data[0].data,
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
    this.filterGroups();
  }

  filterGroups(type) {
    const forYou = [];
    for (let i = 0; i < this.state.allGroups.length; i++) {
      if (this.state.allGroups[i].interests !== undefined) {
        for (let k = 0; k < this.state.allGroups[i].interests.length; k++) {
          if (
            this.state.interests.findIndex(
              (j) => j.name === this.state.allGroups[i].interests[k].name
            ) !== -1 &&
            forYou.indexOf(this.state.allGroups[i]) === -1 &&
            this.state.allGroups[i].isDiscovery === 1
          ) {
            console.log(this.state.interests);
            forYou.push(this.state.allGroups[i]);
          }
        }
      }
    }
    if (type === 'bool') {
      return forYou.length > 0;
    }
    const gr = forYou.map((g) => <GroupCard group={g} />);
    gr.splice(0, 0, <Groups>For You</Groups>);
    return gr;
  }

  render() {
    return (
      <Flex>
        {this.state.interests &&
          this.state.allGroups &&
          <div>
            {this.filterGroups('bool') && this.filterGroups(1)}
          </div>}
      </Flex>
    );
  }
}

const Flex = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`;

const Groups = styled.h2`
  font-weight: 400;
  font-size: 22px;
  margin: 20px 40px 0px;
  text-align: left;
  `;
