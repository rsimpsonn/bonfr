import React, { Component, PropTypes } from 'react';
import styled, { keyframes } from 'styled-components';
import $ from 'jquery';
import Cookies from 'js-cookie';

import ChannelFeed from './ChannelFeed';

export default class ChannelCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(Cookies.get('token')),
    };

    this.handleChannelChange = this.handleChannelChange.bind(this);
    this.restOfChannels = this.restOfChannels.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: 'http://52.66.73.127/bonfire/bon-lara/public/api/get-channels',
      method: 'GET',
      dataType: 'JSON',
      headers: {
        Authorization: `Bearer ${this.state.user.userToken}`,
      },
    }).then((data) => {
      const groupChannels = [];
      for (let i = 0; i < data[0].data.length; i++) {
        if (data[0].data[i].groupId === this.props.groupId) {
          groupChannels.push(data[0].data[i]);
        }
      }
      this.setState({
        groupChannels,
      });
    });
  }

  handleChannelChange(event) {
    const target = event.target;
    const copy = this.state.groupChannels;
    const index = this.state.groupChannels.findIndex(
      (i) => Number(i.channelId) === Number(target.id)
    );
    const first = this.state.groupChannels[0];

    copy[0] = this.state.groupChannels[index];
    copy[index] = first;

    this.setState({
      groupChannels: copy,
    });
  }

  restOfChannels() {
    const hiddenChannels = [];
    for (let i = 1; i < this.state.groupChannels.length; i++) {
      hiddenChannels.push(this.state.groupChannels[i]);
    }
    return hiddenChannels.map((channel) =>
      <Channel
        type="text"
        id={channel.channelId}
        onClick={this.handleChannelChange}
      >
        {channel.channelName}
      </Channel>
    );
  }

  render() {
    return (
      <div>
        <Channels>
          <ChannelTitle>
            <Tag onClick={this.handleButtonChange}>#</Tag>
            {this.state.groupChannels &&
              this.state.groupChannels.length > 0 &&
              <Title>{this.state.groupChannels[0].channelName}</Title>}
            {this.state.groupChannels &&
              this.state.groupChannels.length === 0 &&
              <Center>
                <Text>There are no channels to display!</Text>
              </Center>}
            {this.state.groupChannels && this.restOfChannels()}
          </ChannelTitle>
          <Pad>
            {this.state.groupChannels &&
              this.state.groupChannels.length > 0 &&
              <ChannelFeed
                id={this.state.groupChannels[0].channelId}
                groupId={this.props.groupId}
              />}
          </Pad>
        </Channels>
      </div>
    );
  }
}

const fadeIn = keyframes`
  from {
    border-color: #55DEEA;
    background: #fff;
  }
  to {
    border-color: transparent;
    background: #02A8F3;
  }
  `;

const Channels = styled.div`
  height: 570px;
  min-width: 900px;
  /box-shadow: 0px 5px 26px #DCDCDC;
  background: transparent;
  width: 600px;
  border-radius: 15px;
  padding: 0;
  transition: background 3s, border-color 2s;
  position: relative;
  overflow: hidden;

  ${(props) => {
    if (props.kind === 'open') {
      return `
        background: #02A8F3;
        border-color: transparent;
        animation: ${fadeIn} 0.3s ease-out;
      `;
    }
    return null;
  }};
  `;

const Tag = styled.h1`
    margin-bottom: 0;
    font-weight: 300;
    margin: 0 0 0 25px;
    color: black;
    font-size: 15px;
    cursor: pointer;
    `;

const Title = styled.h1`
        cursor: pointer;
        font-weight: 400;
        color: #000;
        margin: 0 10px;
        `;

const Pad = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  flex-direction: column;
  `;

const Channel = styled.h1`
    margin: 0 20px;
    font-weight: 300;
    font-size: 25px;
    cursor: pointer;
    color: black;
    `;

const Text = styled.h2`
  margin: 0 20px;
`;

const ChannelTitle = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  height: 50px;
  padding: 30px 0 30px;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

ChannelCard.propTypes = {
  groupId: PropTypes.number.isRequired,
};
