import React, { PropTypes, Component } from 'react';
import styled from 'styled-components';

export default class Announcement extends Component {
  constructor(props) {
    super(props);

    this.interests = this.interests.bind(this);
  }

  interests() {
    return this.props.message.interests.map((interest) =>
      <Bubble>{interest.name}</Bubble>
    );
  }

  render() {
    console.log(this.props.message);
    return (
      <Banner>
        <Profile
          src={this.props.message.feedCreator.profile_picture}
          alt="profile"
        />
        <Flex>
          <Name>{this.props.message.feedCreator.name}</Name>
          <Message>{this.props.message.description}</Message>
          {this.props.message.groupDetails &&
            this.props.message.groupDetails.groupName.length > 0 &&
            <Bubble>
              {this.props.message.groupDetails.groupName}
            </Bubble>}
          {this.interests()}
        </Flex>
      </Banner>
    );
  }
}

const Profile = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 20px 20px;
  background: #fff;
  flex: 0 0 50px;
  `;

const Message = styled.p`
  color: white;
  margin: 0 20px 2px;
  font-weight: 300;
  `;

const Name = styled.h1`
  font-size: 16px;
  margin: 0 0 2px 20px;
`;

const Banner = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 0 20px;
  `;

const Flex = styled.div`
  display: column;
  flex-direction: column;
`;

const Bubble = styled.button`
  border-radius: 20px;
  border: solid 2px #fff;
  padding: 2px 10px;
  background: transparent;
  font-size: 12px;
  color: #fff;
  font-weight: 700;
  margin: 5px -10px 5px 18px;
  &:focus {
    outline: 0;
  }
`;

Announcement.propTypes = {
  message: PropTypes.object.isRequired,
};
