import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import Cookies from 'js-cookie';

import Interests from '../components/Interests';
import Fade from '../components/Fade';

const backarrow = require('../../images/backarrow.svg');
const arrow = require('../../images/arrow.svg');

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      email: '',
      confirm: '',
      interests: false,
      fade: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkValues = this.checkValues.bind(this);
    this.submit = this.submit.bind(this);
    this.toggleInterests = this.toggleInterests.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  checkValues() {
    if (
      this.state.confirm.length > 0 &&
      this.state.confirm !== this.state.password
    ) {
      this.setState({
        error: 'Passwords do not match',
      });
      return false;
    } else if (
      this.state.email.length > 0 &&
      this.state.email.substring(this.state.email.indexOf('@')) !==
        '@sagehillschool.org'
    ) {
      this.setState({
        error: 'That is not a valid Sage Hill email',
      });
      return false;
    }
    this.setState({
      error: '',
    });
    return true;
  }

  toggleFade() {
    this.setState({
      fade: true,
    });
  }

  submit() {
    if (!this.checkValues()) {
      throw new 'Invalid Credentials'();
    } else {
      $.ajax({
        url: 'http://52.66.73.127/bonfire/bon-lara/public/api/signup',
        method: 'POST',
        dataType: 'JSON',
        data: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          username: this.state.username,
          campus_id: 1,
        },
      }).then((data) => {
        Cookies.set('token', data);
        this.props.signUp();
      });
    }
  }

  toggleInterests() {
    /* if (!this.checkValues()) {
      throw new 'Invalid Credentials'();
    } else { */
    $.ajax({
      url: 'http://52.66.73.127/bonfire/bon-lara/public/api/signup',
      method: 'POST',
      dataType: 'JSON',
      data: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        username: this.state.username,
        campus_id: 1,
      },
    }).then((data) => {
      Cookies.set('token', data);
    });
    // }
    this.setState({
      interests: !this.state.interests,
    });
  }

  render() {
    setTimeout(this.checkValues, 1000);
    return (
      <div>
        {!this.state.interests &&
          <div>
            <Arrow src={backarrow} onClick={this.props.signUp} />
            <Flex>
              <Title>Sign Up</Title>
              <Under>Start joining groups across your campus!</Under>
              <form>
                <Flex>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    onChange={this.handleChange}
                  />
                  <Input
                    type="text"
                    name="email"
                    placeholder="Sage Hill Email"
                    onChange={this.handleChange}
                  />
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.handleChange}
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                  <Input
                    type="password"
                    name="confirm"
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                  />
                  {this.state.error.length > 0 &&
                    <Under>
                      <red>{this.state.error}</red>
                    </Under>}
                  <Arrow
                    src={arrow}
                    type="submit"
                    onClick={this.toggleInterests}
                  />
                </Flex>
              </form>
            </Flex>
          </div>}
        {this.state.interests &&
          <div>
            <Interests back={this.toggleInterests} next={this.props.signUp} />
          </div>}
      </div>
    );
  }
}

const Title = styled.h1`
  color: #212121;
  font-weight: 400;
  text-align: center;
  margin: 80px 0 10px;
`;

const Under = styled.p`
  color: #DCDCDC;
  text-align: center;

  >red {
    color: #FF7070;
    font-weight: 700;
  }
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 14px;
  border: solid #F2F2F2 2px;
  margin: 10px;
  text-align: center;
  max-width: 240px;

  &:focus {
    outline: 0;
  }
  `;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Arrow = styled.img`
  cursor: pointer;
  margin: 20px;

  &:active {
    transform: scale(0.96);
  }

  &:focus {
    outline: 0;
  }
`;

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
};
