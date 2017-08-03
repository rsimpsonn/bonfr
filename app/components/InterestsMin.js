import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import $ from 'jquery';

import BubbleMin from './BubbleMin';

export default class InterestsMin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };

    this.bubbles = this.bubbles.bind(this);
    this.add = this.add.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: 'http://52.66.73.127/bonfire/bon-lara/public/api/interests',
      method: 'GET',
      dataType: 'JSON',
    }).then((data) => {
      this.setState({
        interests: data[0].data,
      });
    });
  }

  bubbles() {
    return this.state.interests.map((interest) =>
      <BubbleMin
        id={interest.interestId}
        add={this.add}
        interest={interest.name}
      />
    );
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

  render() {
    return (
      <Section>
        {this.state.interests && this.bubbles()}
      </Section>
    );
  }
}

const Section = styled.div`
  max-height: 100px;
  overflow-y: scroll;
  display: flex;
  flex-flow: row wrap;
  `;
