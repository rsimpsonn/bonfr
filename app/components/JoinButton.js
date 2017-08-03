import React, { Component, PropTypes } from 'react';
import styled, { keyframes } from 'styled-components';
import Cookies from 'js-cookie';

const Join = require('../../images/joinbutton.svg');
const Joined = require('../../images/joined.svg');
const Req = require('../../images/request.svg');

export default class JoinButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joined: this.isMember(),
    };

    this.handleChange = this.handleChange.bind(this);
    this.isMember = this.isMember.bind(this);
  }

  handleChange() {
    this.setState({
      joined: true,
    });
    this.props.join();
  }

  isMember() {
    if (this.props.creatorId === JSON.parse(Cookies.get('token')).userId) {
      return true;
    }
    if (this.props.members === undefined) {
      return false;
    }
    for (let i = 0; i < this.props.members.length; i++) {
      if (
        this.props.members[i].userId === JSON.parse(Cookies.get('token')).userId
      ) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <div>
        {!this.state.joined &&
          <div>
            {this.props.private === 0 &&
              <JoinHere onClick={this.handleChange} />}
            {this.props.private === 1 && <Request />}
          </div>}
        {this.state.joined && <AlreadyJoined />}
      </div>
    );
  }
}

const Flip = keyframes`
  from {
    transform: rotate(90deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Request = styled.button`
width: 90px;
height: 25px;
background: transparent url(${Req}) no-repeat center;
margin: 10px;
border-radius: 4px;
float: right;
position: absolute;
bottom: 0;
right: 0;
cursor: pointer;

&:focus {
  outline: 0;
}
`;

const JoinHere = styled.button`
  width: 70px;
  height: 25px;
  background: transparent url(${Join}) no-repeat center;
  margin: 10px;
  border-radius: 4px;
  float: right;
  position: absolute;
  bottom: 0;
  right: 0;

  &:focus {
    outline: 0;
  }
  `;

const AlreadyJoined = styled.button`
  height: 25px;
  width: 25px;
  background: transparent url(${Joined}) no-repeat center;
  margin: 10px;
  border-radius: 50%;
  float: right;
  animation: ${Flip} 0.75s ease-out;
  position: absolute;
  bottom: 0;
  right: 0;

  &:focus {
    outline: 0;
  }
  `;

JoinButton.propTypes = {
  members: PropTypes.array.isRequired,
  private: PropTypes.number.isRequired,
  creatorId: PropTypes.number.isRequired,
  join: PropTypes.func.isRequired,
};
