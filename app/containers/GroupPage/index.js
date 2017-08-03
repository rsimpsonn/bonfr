import React, { Component, PropTypes } from 'react';
import styled, { keyframes } from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import $ from 'jquery';
import Cookies from 'js-cookie';

import GroupEvents from '../../components/GroupEvents';
import ChannelCard from '../../components/ChannelCard';
import LeadersPanel from '../../components/LeadersPanel';
import BotSettings from '../BotSettings';

export default class GroupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leading: true,
      botOpen: false,
      user: JSON.parse(Cookies.get('token')),
    };

    this.toggle = this.toggle.bind(this);
    this.memberCount = this.memberCount.bind(this);
    this.findGroupById = this.findGroupById.bind(this);
    this.isLeader = this.isLeader.bind(this);
    this.members = this.members.bind(this);
    this.isMember = this.isMember.bind(this);
  }

  componentDidMount() {
    this.findGroupById(Number(this.props.id.substring(1)));
  }

  findGroupById(id) {
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
        if (groups[i].groupId === id) {
          this.setState({
            group: groups[i],
          });
        }
      }
    });
  }

  isLeader() {
    if (this.state.group.group_members === undefined) {
      return true;
    }

    if (this.state.group.groupCreator.userId === this.state.user.userId) {
      return true;
    }

    for (let i = 0; i < this.state.group.group_members.length; i++) {
      if (this.state.group.group_members[i].userId === this.state.user.userId) {
        if (this.state.group.group_members[i].isLeader === 1) {
          return true;
        }
      }
    }
    return false;
  }

  toggle() {
    this.setState({
      botOpen: !this.state.botOpen,
    });
  }

  memberCount() {
    if (this.state.group.group_members === undefined) {
      return 1;
    }
    const membercount = this.state.group.group_members.length;
    return membercount;
  }

  members() {
    if (this.state.group.group_members === undefined) {
      return <Member src={this.state.group.groupCreator.profile_picture} />;
    }
    const list = this.state.group.group_members.map((member) =>
      <Member src={member.profile_picture} />
    );
    return list;
  }

  isMember() {
    if (this.state.group.groupCreator.userId === this.state.user.userId) {
      return true;
    }
    if (this.state.group.group_members === undefined) {
      return false;
    }
    for (let i = 0; i < this.state.group.group_members.length; i++) {
      if (this.state.group.group_members[i].userId === this.state.user.userId) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <div>
        {this.state.group &&
          this.isMember() &&
          <div>
            {this.state.botOpen === false &&
              <Screen>
                <Flex color={this.state.light}>
                  <Cover src={this.state.group.groupImage} alt="b" />
                  <Text color={this.state.dark}>
                    <small>
                      {this.state.group.groupName}
                    </small>
                  </Text>
                  <Text color={this.state.dark}>
                    <gray>
                      {this.state.group.groupDescription}
                    </gray>
                  </Text>
                  <Members>
                    {this.memberCount()} members
                  </Members>
                  <div>
                    {this.members()}
                  </div>
                  <Members>
                    Events{' '}
                  </Members>
                  <GroupEvents
                    id={this.state.group.groupId}
                    creatorId={this.state.group.groupCreator.userId}
                  />
                </Flex>
                <ChannelPadding>
                  <ChannelCard groupId={this.state.group.groupId} />
                </ChannelPadding>
              </Screen>}
            {this.state.botOpen === true &&
              <BotSettings group={this.state.group} />}
            <Pad>
              {this.state.group &&
                this.isLeader() &&
                <LeadersPanel group={this.state.group} bot={this.toggle} />}
            </Pad>
          </div>}
      </div>
    );
  }
}

const Cover = styled.img`
  width: 220px;
  height: auto;
  animation-delay: 5s;
  border-radius: 10px;

  >blurred {
    filter: blur(50px);
  }
  `;

const Flex = styled.div`
  width: 250px;
  margin: 0 20px;
  overflow: hidden;

  ${(props) => `
     /background: ${props.color}`}
`;

const Screen = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0 20px;
    `;

const Text = styled.p`
  font-weight: 400;
  text-align: left;
  color: #000;
  margin: 10px 0 -10px 0;

  >small {
    font-size: 18px;
    font-weight: 700;
  }

  >gray {
    font-size: 14px;
    font-weight: 400;
    color: #CECECE;
  }
`;

const Members = styled.h1`
  font-size: 12px;
  color: #212121;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 0;

  ${(props) => `
      color: ${props.color}`}
`;

const ChannelPadding = styled.div`
  width: 80%;
  `;

const Pad = styled.div`
    flex-direction: row;
    display: flex;
    justify-content: center;
    padding: 20px;
  `;

const Member = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 5px 10px 0 0;
`;

GroupPage.propTypes = {
  id: PropTypes.string.isRequired,
};
