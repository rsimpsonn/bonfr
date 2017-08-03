import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import styled from 'styled-components';

import Event from './Event';

export default class GroupEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(Cookies.get('token')),
    };

    this.events = this.events.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: 'http://52.66.73.127/bonfire/bon-lara/public/api/get-group-events',
      method: 'POST',
      dataType: 'JSON',
      data: {
        group_id: this.props.id,
      },
      headers: {
        Authorization: `Bearer ${this.state.user.userToken}`,
      },
    })
      .then((data) => {
        this.setState({
          allEvents: data[0].data,
        });
      })
      .catch(() => this.setState((allEvents: '')));
  }

  events() {
    return this.state.allEvents.map((event) =>
      <Event description={event.eventTitle} date={event.eventStartDate} />
    );
  }

  render() {
    return (
      <Sect>
        {this.state.allEvents && this.events()}
      </Sect>
    );
  }
}

const Sect = styled.div`
  margin: 10px 0;
`;

GroupEvents.propTypes = {
  id: PropTypes.number.isRequired,
};
