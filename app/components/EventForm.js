import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import Cookies from 'js-cookie';

export default class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(Cookies.get('token')),
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit() {
    $.ajax({
      url: 'http://52.66.73.127/bonfire/bon-lara/public/api/events/create',
      method: 'POST',
      dataType: 'JSON',
      data: {
        name: this.state.name,
        title: this.state.title,
        start_date: this.state.eventDate + this.state.time,
        end_date: this.state.eventDate + this.state.time,
        group_id: this.props.group.groupId,
      },
      headers: {
        Authorization: `Bearer ${this.state.user.userToken}`,
      },
    }).then((data) => console.log(data));
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <Title>Add an event</Title>
        <Input placeholder="Name" name="name" onChange={this.handleChange} />
        <Input
          placeholder="01/01/2017"
          type="date"
          name="eventDate"
          onChange={this.handleChange}
        />
        <Input
          placeholder="8:00 AM"
          type="time"
          name="time"
          onChange={this.handleChange}
        />
        <Desc
          placeholder="Description"
          name="title"
          onChange={this.handleChange}
        />
        <Submit onClick={this.submit}><SubmitText>Submit</SubmitText></Submit>
      </div>
    );
  }
}

const Input = styled.input`
  border-radius: 8px;
  padding: 8px;
  border: solid #F2F2F2 2px;
  margin: 5px;

  &:focus {
    outline: 0;
  }
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

EventForm.propTypes = {
  group: PropTypes.object.isRequired,
};
