import React, { Component } from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import EmojiConverter from 'emoji-js';
import $ from 'jquery';

import GroupEmojis, { replaceAll } from '../../GroupEmojis';

const emoji = new EmojiConverter();
emoji.addAliases(GroupEmojis());

const home = require('../../../images/home.svg');

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.getUserGroups = this.getUserGroups.bind(this);
    this.isMember = this.isMember.bind(this);
    this.nodes = this.nodes.bind(this);

    this.state = {
      groups: this.getUserGroups(),
      user: JSON.parse(Cookies.get('token')),
    };
  }

  getUserGroups() {
    const userGroups = [];
    $.ajax({
      url: 'http://52.66.73.127/bonfire/bon-lara/public/api/groups',
      method: 'GET',
      dataType: 'JSON',
      headers: {
        Authorization: `Bearer ${JSON.parse(Cookies.get('token')).userToken}`,
      },
    }).then((data) => {
      const groups = data[0].data;
      for (let i = 0; i < groups.length; i++) {
        if (
          groups[i].groupCreator.userId ===
          JSON.parse(Cookies.get('token')).userId
        ) {
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

  nodes() {
    return this.state.groups.map((group) =>
      <div>
        <A
          href={`/${group.groupId}`.toLowerCase()}
          key={group.groupName.toString()}
        >
          <P groupName={group.groupName} key={group.groupName.toString()}>
            <Text>
              {group.groupName.substring(0, 1)}
            </Text>
            <SurfaceArea>
              <Emoji>
                {emoji.replace_colons(
                  `:${replaceAll(group.groupName.toLowerCase())}:`
                ).length === 2
                  ? emoji.replace_colons(
                      `:${replaceAll(group.groupName.toLowerCase())}:`
                    )
                  : group.groupName.substring(0, 1)}
              </Emoji>
            </SurfaceArea>
          </P>
        </A>
      </div>
    );
  }

  render() {
    return (
      <Nodes>
        <a href="/">
          <Home src={home} alt="Home" />
        </a>
        {this.state.groups && this.nodes()}
      </Nodes>
    );
  }
}

const Nodes = styled.div`
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: space-between;
  align-items: center;
`;

const P = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: #02A8F3;
  margin: 10px 10px 5px;
  cursor: pointer;
  z-index: 1;
  position: relative;

  &:focus {
    outline: 0;
  }

  &:hover {
    background: transparent;
  }

  &:active {
    transform: scale(0.96);
  }
`;

const Text = styled.p`
  font-size: 20px;
  color: #fff;
  margin: 0;
  text-decoration: none;
  `;

const A = styled.a`
  text-decoration: none;
  `;

const Home = styled.img`
  margin: 10px;
  cursor: pointer;
  `;

const Emoji = styled.p`
  font-size: 30px;
  font-weight: 700;
  color: #02A8F3;
  margin: 0;
  margin-left: auto;
  margin-right: auto;
`;

const SurfaceArea = styled.div`
  position: absolute;
  opacity: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -32px 0 0 -5px;

  &:hover {
    opacity: 1;
  }
  `;
