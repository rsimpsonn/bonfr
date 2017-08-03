import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import Cookies from 'js-cookie';

import JoinButton from './JoinButton';

export default class GroupCard extends Component {
  constructor(props) {
    super(props);

    this.joinGroup = this.joinGroup.bind(this);
  }

  joinGroup() {
    $.ajax({
      url: 'http://52.66.73.127/bonfire/bon-lara/public/api/groups/add-member',
      method: 'POST',
      dataType: 'JSON',
      data: {
        group_id: this.props.group.groupId,
        is_leader: 0,
      },
      headers: {
        Authorization: `Bearer ${JSON.parse(Cookies.get('token')).userToken}`,
      },
    }).then((data) => console.log(data));
  }

  render() {
    return (
      <Card>
        <Flex>
          <Cover src={this.props.group.groupImage} alt="cover" />
        </Flex>
        <Text>{this.props.group.groupName}</Text>
        <Under>{this.props.group.groupDescription}</Under>
        <JoinButton
          members={this.props.group.group_members}
          private={this.props.group.isPrivate}
          join={this.joinGroup}
          creatorId={this.props.group.groupCreator.userId}
        />
      </Card>
    );
  }
}

const Card = styled.div`
  width: 180px;
  height: 375px;
  box-shadow: 0px 5px 26px #DCDCDC;
  background: white;
  margin: 25px 0px 25px 45px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  `;

const Cover = styled.img`
  height: 100%;
`;

const Text = styled.p`
  font-size: 14px;
  margin: 12px 8px 0px;
  line-height: 15px;
`;

const Under = styled.p`
  font-size: 12px;
  margin: 4px 6px 4px 8px;
  line-height: 15px;
  color: #BDBDBD;
  font-weight: 300;
  `;

const Flex = styled.div`
    height: 65%;
  `;

GroupCard.propTypes = {
  group: PropTypes.object.isRequired,
};
