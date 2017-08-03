import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';

export default class LogOut extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    Cookies.remove('token');
    this.props.log();
  }

  render() {
    return (
      <Logout onClick={this.logout}>
        <LogoutText>Log Out</LogoutText>
      </Logout>
    );
  }
}

const Logout = styled.button`
  margin: 20px 0px 0px;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FF8E8E;
  padding: 11px 14px 10px 14px;

  &:focus {
    outline: 0;
  }

  &:active {
    transform: scale(0.96);
  }
    `;

const LogoutText = styled.p`
  margin: -6px 0px;
  font-size: 12px;
  font-weight: 400;
  color: #7B2020;
  `;

LogOut.propTypes = {
  log: PropTypes.func.isRequired,
};
