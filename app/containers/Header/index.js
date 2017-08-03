import React, { Component, PropTypes } from 'react';
import styled, { keyframes } from 'styled-components';
import { Popover, PopoverContent } from 'reactstrap';

import Nav from '../Nav';
import Profile from '../../components/Profile';

const bonfire = require('../../../images/bonfire.svg');
const profile = require('../../../images/profile.svg');

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  render() {
    return (
      <Bar>
        <Nav />
        <Icon src={profile} alt="profi" onClick={this.toggle} id="hey" />
        <Popover
          placement="bottom right"
          isOpen={this.state.popoverOpen}
          target="hey"
          toggle={this.toggle}
        >
          <PopoverContent>
            <Div>
              <Profile logout={this.props.logout} />
            </Div>
          </PopoverContent>
        </Popover>
      </Bar>
    );
  }
}

const Fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Bar = styled.div`
  width: 100%;
  height: 80px;
  background: transparent url(${bonfire}) no-repeat 3%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  `;

const Icon = styled.img`
  height: 40px;
  width: auto;
  margin: 3% 5%;
  cursor: pointer;
`;

const Div = styled.div`
  background: #fff;
  max-width: 240px;
  min-width: 180px;
  min-height: 220px;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0px 5px 26px #DCDCDC;
  animation: ${Fade} 0.15s linear;
  margin: 35px -30px;
  z-index: 100;
`;

Header.propTypes = {
  logout: PropTypes.func.isRequired,
};
