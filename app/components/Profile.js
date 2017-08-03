import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import $ from 'jquery';

import Interest from './Interest';
import AddInterest from './AddInterest';
import LogOut from './LogOut';
import Dropzone from 'react-dropzone';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(Cookies.get('token')),
    };

    this.interests = this.interests.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: `http://52.66.73.127/bonfire/bon-lara/public/api/user-profile-with-interest/${this
        .state.user.userId}`,
      method: 'GET',
      dataType: 'JSON',
      headers: {
        Authorization: `Bearer ${this.state.user.userToken}`,
      },
    }).then((data) => this.setState({ user: data[0] }));
  }

  interests() {
    return this.state.user.data.interests.map((interest) =>
      <Interest
        remove={() => this.remove(interest.interestId)}
        interest={interest.name.toLowerCase()}
      />
    );
  }

  remove(id) {
    $.ajax({
      url:
        'http://52.66.73.127/bonfire/bon-lara/public/api/user-interest/remove-interest',
      method: 'POST',
      dataType: 'JSON',
      headers: {
        Authorization: `Bearer ${this.state.user.userToken}`,
      },
      data: {
        interest_id: id,
      },
    }).then((data) => console.log(data));
  }

  render() {
    return (
      <div>
        {this.state.user.data &&
          <div>
            <Flex>
              <ProfilePic
                src={this.state.user.data.profile_picture}
                alt="profile"
              />
              <Title><strong>{this.state.user.data.name}</strong></Title>
            </Flex>
            <Title>Interests</Title>
            <InterestFlex>
              {this.state.user && this.interests()}
            </InterestFlex>
            <AddInterest />
            <LogOut log={this.props.logout} />
          </div>}
      </div>
    );
  }
}

const ProfilePic = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 0 10px;
  cursor: pointer;
`;

const Title = styled.p`
  margin: 10px 5px;
  font-size: 12px;
  text-align: center;
  >strong {
    font-size: 14px;
    font-weight: 400;
  }
  `;

const InterestFlex = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const Flex = styled.div`
  display: flex;
  margin: 10px 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

Profile.propTypes = {
  logout: PropTypes.func.isRequired,
};
