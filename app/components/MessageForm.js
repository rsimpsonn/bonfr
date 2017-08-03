import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import Cookies from 'js-cookie';

import InterestsMin from './InterestsMin';

export default class MessageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(Cookies.get('token')),
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;

    this.setState({
      message: value,
    });
  }

  submit() {
    $.ajax({
      url: 'http://52.66.73.127/bonfire/bon-lara/public/api/create-new-feed',
      method: 'POST',
      dataType: 'JSON',
      data: {
        description: this.state.message,
        group_id: this.props.group.groupId,
        channel_id: 19,
        interests: this.interests.state.list,
        is_campus_feed: 1,
      },
      headers: {
        Authorization: `Bearer ${this.state.user.userToken}`,
      },
    }).then((data) => console.log(data));
  }

  render() {
    return (
      <div>
        <Title>Add a message</Title>
        <Desc placeholder="Message" onChange={this.handleChange} />
        <Title>Add Interests</Title>
        <InterestsMin ref={(c) => (this.interests = c)} />
        <Submit onClick={this.submit}><SubmitText>Submit</SubmitText></Submit>
      </div>
    );
  }
}

const Title = styled.h3`
    margin: 0px 5px 5px;
    text-align: left;
    font-size: 28px;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 400;
    color: #212121;
    `;

const Desc = styled.textarea`
    border-radius: 8px;
    padding: 8px;
    border: solid #F2F2F2 2px;
    margin: 5px;
    resize: none;

    &:focus {
      outline: 0;
    }
    `;

const Submit = styled.button`
    margin: 6px 0px 0px;
    border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #55DEEA;
    padding: 8px 14px 8px 14px;

    &:focus {
      outline: 0;
    }

    &:active {
      transform: scale(0.96);
    }
      `;

const SubmitText = styled.p`
    margin: 0;
    color: #fff;
    font-size: 12px;
    `;

MessageForm.propTypes = {
  group: PropTypes.object.isRequired,
};
