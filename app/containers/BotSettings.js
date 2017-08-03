import React, { Component, PropTypes } from 'react';
import styled, { keyframes } from 'styled-components';
import Typing from 'react-typing-animation';
import $ from 'jquery';
import Cookies from 'js-cookie';

import Bot from '../components/Bot';
import NewsCard from '../components/NewsCard';
import Post from '../components/Post';

const webhoseio = require('webhoseio');
const webhose = webhoseio.config({
  token: '77113b8e-0ca1-4be4-a767-2d1024bb4bb9',
});

export default class BotSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: undefined,
      user: JSON.parse(Cookies.get('token')),
    };

    this.query = this.query.bind(this);
    this.posts = this.posts.bind(this);
  }

  componentDidMount() {
    this.query();
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
        if (data[0].data[i].groupId === this.props.group.groupId) {
          groupChannels.push(data[0].data[i]);
        }
      }
      this.setState({
        groupChannels,
      });
    });
  }

  query() {
    webhose
      .query('filterWebContent', {
        q: this.props.group.interests !== undefined
          ? this.props.group.interests.map((interest) => interest.name)
          : ['technology', 'startups'],
        language: 'english',
        size: 20,
        site: ('bleacherreport.com', 'medium.com'),
        sort: 'social.facebook.likes',
      })
      .then((data) => {
        console.log(data);
        this.setState({
          posts: data.posts.slice(0, 10),
        });
      });
  }

  posts() {
    return this.state.posts.map((post) =>
      <Post group={this.props.group} post={post} />
    );
  }

  render() {
    return (
      <Background>
        <Flex>
          <Div>
            <Bot group={this.props.group.groupName} />
          </Div>
          <Div>
            <h3>{this.props.group.groupName} Bot</h3>
            <Typing cursor={null} speed={20}>
              <Title>
                I found a bunch of things relating to{' '}
                {this.props.group.groupName}!
              </Title>
            </Typing>
            <NewsCard>
              {this.state.posts && this.posts()}
            </NewsCard>
          </Div>
        </Flex>
      </Background>
    );
  }
}

BotSettings.propTypes = {
  group: PropTypes.object.isRequired,
};

const Fade = keyframes`
  from {
    opacity: 0.35;
  }
  to {
    opacity: 1;
  }
  `;

const Background = styled.div`
  background: linear-gradient( to right top, #89FFE4, #02A8F3);
  display: flex;
  justify-content: center;
  flex-direction: column;
  /animation: ${Fade} 0.6s ease-in;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  `;

const Div = styled.div`
  width: 45%;
  min-width: 420px;
  `;

const Title = styled.h3`
    margin: -20px 5px 20px;
    text-align: left;
    font-size: 28px;
    font-size: 14px;
    letter-spacing: 0.5px;
    font-weight: 300;
    `;

const FullArticle = styled.button`
  background: #66ADFF;
  border-radius: 10px;
  padding: 5px 10px;
  color: #fff;
  float: right;
  margin: 5px 5px;
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
