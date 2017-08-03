import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import Cookies from 'js-cookie';

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
      user: JSON.parse(Cookies.get('token')),
    };

    this.channels = this.channels.bind(this);
    this.toChannel = this.toChannel.bind(this);
    this.selection = this.selection.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      console.log(data);
      const groupChannels = [];
      for (let i = 0; i < data[0].data.length; i++) {
        if (data[0].data[i].groupId === this.props.group.groupId) {
          groupChannels.push(data[0].data[i]);
        }
      }
      this.setState({
        groupChannels,
      });
    });
  }

  selection(func) {
    this.setState({
      selected: true,
      send: func,
    });
  }

  toChannel(link, id) {
    console.log('hey');
    $.ajax({
      url: 'http://52.66.73.127/bonfire/bon-lara/public/api/create-new-feed',
      method: 'POST',
      dataType: 'JSON',
      data: {
        description: `${link} ${this.state.message}`,
        group_id: this.props.group.groupId,
        channel_id: id,
      },
      headers: {
        Authorization: `Bearer ${this.state.user.userToken}`,
      },
    }).then((data) => console.log(data));
  }

  channels(url) {
    return this.state.groupChannels.map((channel) =>
      <FullArticle
        color="#9BC9FF"
        onClick={() => {
          this.selection(() => {
            this.toChannel(url, channel.channelId);
          });
        }}
      >
        {channel.channelName}
      </FullArticle>
    );
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;

    this.setState({
      message: value,
    });
    console.log(this.state.message);
  }
  render() {
    return (
      <div>
        {!this.state.selected &&
          <PostCard>
            <PostHeading>{this.props.post.title}</PostHeading>
            <PostText>{this.props.post.text.substring(0, 500)}</PostText>
            <FullArticle>
              <URL href={this.props.post.url} target="_blank">
                Read full article
              </URL>
            </FullArticle>
            {this.state.groupChannels &&
              this.channels(
                `${this.props.post.url} ${this.props.post.title};;`
              )}
          </PostCard>}
        {this.state.selected &&
          <PostCard>
            <PostHeading>Add a Message</PostHeading>
            <TextArea
              placeholder="Add a channel message to your attached article"
              onChange={this.handleChange}
            />
            <FullArticle onClick={this.state.send}>Send</FullArticle>
          </PostCard>}
      </div>
    );
  }
}

const PostCard = styled.div`
  padding: 5px 15px;
  border-radius: 8px;
  box-shadow: 0 0 20px #DCDCDC;
  margin: 0 0 15px;
  overflow: hidden;
`;

const PostHeading = styled.h2`
  font-size: 14px;
`;

const PostText = styled.p`
  font-size: 12px;
`;

const URL = styled.a`
  color: white;
  text-decoration: none;
  font-size: 12px;
`;

const FullArticle = styled.button`
  background: #66ADFF;
  border-radius: 10px;
  padding: 5px 10px;
  color: #fff;
  float: right;
  margin: 5px 10px;
  font-size: 12px;
  cursor: pointer;

  &:active {
    transform: scale(0.96);
  }

  &:focus {
    outline: 0;
  }

  ${(props) => `
    background: ${props.color}`}
`;

const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  font-size: 14px;
  &:focus {
    outline: 0;
  }
`;

Post.propTypes = {
  post: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
};
