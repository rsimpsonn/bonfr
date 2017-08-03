import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

export default class BubbleMin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      selected: !this.state.selected,
    });
    this.props.add(this.props.id);
  }

  render() {
    return (
      <div>
        {!this.state.selected &&
          <Bubble onClick={this.toggle}>{this.props.interest}</Bubble>}
        {this.state.selected &&
          <Bubble color="#FF3372" onClick={this.toggle}>
            {this.props.interest}
          </Bubble>}
      </div>
    );
  }
}

const Bubble = styled.button`
  color: #fff;
  background: #FF97B7;
  border-radius: 14px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
  margin: 5px;

  &:active {
    transform: scale(0.96);
  }

  &:focus {
    outline: 0;
  }

  ${(props) => `
    background: ${props.color}`}
`;

BubbleMin.propTypes = {
  interest: PropTypes.string.isRequired,
  add: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
