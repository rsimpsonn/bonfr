import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';

import Button from '../../images/addinterest.svg';

export default class AddInterest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(Cookies.get('token')),
    };
  }

  render() {
    return (
      <div>
        <a href="/interests">
          <CircleButton onClick={this.toggle} src={Button} alt="add" />
        </a>
      </div>
    );
  }
}

const CircleButton = styled.img`
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin: 3px 0px;

  &:focus {
    outline: 0;
  }

  &:active {
    transform: scale(0.96);
  }
`;

AddInterest.propTypes = {
  refresh: PropTypes.func.isRequired,
};
