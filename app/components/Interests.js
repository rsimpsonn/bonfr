import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import Cookies from 'js-cookie';

import Bubble from './Bubble';

const backarrow = require('../../images/backarrow.svg');

export default class Interests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interests: undefined,
      list: [],
    };

    this.add = this.add.bind(this);
    this.interests = this.interests.bind(this);
    this.toProfile = this.toProfile.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: 'http://52.66.73.127/bonfire/bon-lara/public/api/interests',
      method: 'GET',
      dataType: 'JSON',
    }).then((data) => {
      this.setState({
        interests: Array(data[0].data),
      });
    });
  }

  toProfile() {
    for (let i = 0; i < this.state.list.length; i++) {
      $.ajax({
        url:
          'http://52.66.73.127/bonfire/bon-lara/public/api/user-interest/add-interest',
        method: 'POST',
        dataType: 'JSON',
        data: {
          interest_id: this.state.list[i],
        },
        headers: {
          Authorization: `Bearer ${JSON.parse(Cookies.get('token')).userToken}`,
        },
      });
    }
    this.props.next();
  }

  add(interest) {
    const copy = this.state.list;
    if (copy.indexOf(interest) === -1) {
      copy.push(interest);
    } else {
      copy.splice(copy.indexOf(interest), 1);
    }
    this.setState({
      list: copy,
    });
  }

  interests() {
    return this.state.interests[0].map((interest) =>
      <Bubble int={interest} add={this.add} />
    );
  }

  render() {
    return (
      <div>
        {this.props.back &&
          <Arrow src={backarrow} alt="back" onClick={this.props.back} />}
        <BigFlex>
          <Title>Select your interests</Title>
          <Sub>
            Your interests will help you discover new groups and can be edited
            later in your profile.
          </Sub>
          <Flex>
            {this.state.interests && this.interests()}
          </Flex>
          <SignUp onClick={this.toProfile}>Add Interests</SignUp>
        </BigFlex>
      </div>
    );
  }
}

const Flex = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 50px;
`;

const Sub = styled.p`
  text-align: center;
  color: #DCDCDC;
  margin: -25px 100px 0;
`;

const Title = styled.p`
  font-size: 32px;
  font-weight: 300;
  text-align: center;
`;

const Arrow = styled.img`
  cursor: pointer;
  margin: 20px 20px 0;

  &:active {
    transform: scale(0.96);
  }

  &:focus {
    outline: 0;
  }
`;

const BigFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SignUp = styled.p`
  text-align: center;
  font-weight: 300;
  font-size: 20px;
  cursor: pointer;
  margin: 10px 0 80px;

  &:active {
    transform: scale(0.96);
  }
`;

Interests.propTypes = {
  back: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};
