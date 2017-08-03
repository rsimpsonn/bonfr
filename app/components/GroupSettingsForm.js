import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import Cookies from 'js-cookie';

const channeladd = require('../../images/channeladd.svg');

export default class GroupSettingsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(Cookies.get('token')),
      open: false,
      description: this.props.group.groupDescription,
      name: this.props.group.groupName,
      is_private: this.props.group.isPrivate,
    };

    this.addChannel = this.addChannel.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(value);

    this.setState({
      [name]: value,
    });
  }

  addChannel() {
    $.ajax({
      url: 'http://52.66.73.127/bonfire/bon-lara/public/api/create-new-channel',
      method: 'POST',
      dataType: 'JSON',
      data: {
        name: this.state.channelName,
        user_id: this.state.user.userId,
        group_id: this.props.group.groupId,
        campus_id: 1,
      },
      headers: {
        Authorization: `Bearer ${this.state.user.userToken}`,
      },
    }).then((data) => {
      $.ajax({
        url: 'http://52.66.73.127/bonfire/bon-lara/public/api/create-new-feed',
        method: 'POST',
        dataType: 'JSON',
        data: {
          description: 'This is the beginning of conversation in this channel.',
          group_id: this.props.group.groupId,
          channel_id: data[0].data.channelId,
        },
        headers: {
          Authorization: `Bearer ${this.state.user.userToken}`,
        },
      });
    });
  }

  submit() {
    $.ajax({
      url: 'http://52.66.73.127/bonfire/bon-lara/public/api/groups/edit',
      method: 'POST',
      dataType: 'JSON',
      headers: {
        Authorization: `Bearer ${this.state.user.userToken}`,
      },
      data: {
        group_id: this.props.group.groupId,
        name: this.state.name,
        description: this.state.description,
        is_private: Number(this.state.is_private),
      },
    }).then((data) => console.log(data));
  }

  toggleOpen() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    return (
      <div>
        <Title>Your Group</Title>
        <Input
          type="text"
          defaultValue={this.props.group.groupName}
          name="name"
          onChange={this.handleChange}
        />
        <Desc
          placeholder="Description"
          defaultValue={this.props.group.groupDescription}
          name="description"
          onChange={this.handleChange}
        />
        <Priv htmlFor="checkbox" style={{ color: 'black' }}>
          Private
          <In
            type="checkbox"
            id="checkbox"
            defaultChecked={Boolean(this.props.group.isPrivate)}
            name="is_private"
            onChange={this.handleChange}
          />
        </Priv>
        <Title>Channels</Title>
        <Flex>
          {!this.state.open && <ChannelAdd onClick={this.toggleOpen} />}
          {this.state.open &&
            <Row>
              <ChannelInput
                name="channelName"
                placeholder="New Channel"
                onChange={this.handleChange}
              />
              <ChannelAdd onClick={this.addChannel} />
            </Row>}
        </Flex>
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

const Input = styled.input`
      border-radius: 8px;
      font-size: 14px;
      padding: 8px;
      border: solid #F2F2F2 2px;
      margin: 5px;

      &:focus {
        outline: 0;
      }
      `;

const In = styled(Input)`
  margin: 10px 5px 15px;
  `;

const Channel = styled.button`
  background: #02A8F3;
  border-radius: 14px;
  padding: 5px 10px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
`;

const ChannelAdd = styled.button`
  width: 30px;
  height: 30px;
  background: transparent url(${channeladd}) center no-repeat;
  margin: 5px 0;

  &:focus {
    outline: 0;
  }

  &:active {
    transform: scale(0.96);

  }
`;

const ChannelInput = styled.input`
  background: #02A8F3;
  border-radius: 14px;
  padding: 5px 10px;
  width: 170px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  margin: 5px 10px 0 0;

  &:focus {
    outline: 0;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Priv = styled.label`
  margin: 10px 5px;
  font-size: 12px;
  text-transform: uppercase;
`;

GroupSettingsForm.propTypes = {
  group: PropTypes.object.isRequired,
};
