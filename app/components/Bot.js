import React, { Component, PropTypes } from 'react';
import styled, { keyframes } from 'styled-components';
import EmojiConverter from 'emoji-js';

import convertToHex from '../convertToHex';
import GroupEmojis from '../GroupEmojis';

const emoji = new EmojiConverter();
emoji.addAliases(GroupEmojis());

const B = require('../../images/bot.svg');

export default class Bot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      group: this.props.group,
    };
  }

  render() {
    const e = emoji.replace_colons(
      `:${this.state.group.toLowerCase().replace(' ', '')}:`
    );
    const icon = e.type === String ? emoji.replace_colons(':fire:') : e;
    return (
      <Div>
        <FlexHelp>
          <White
            eye={convertToHex(this.state.group.substring(0, 1))}
            transform="translateY(15px)"
          />
          <Antenna border={convertToHex(this.state.group.substring(1, 2))} />
        </FlexHelp>
        <Robot>
          <Flex>
            <Eye
              eye={convertToHex(this.state.group.substring(0, 1))}
              border={convertToHex(this.state.group.substring(1, 2))}
            >
              <White />
            </Eye>
            <Eye
              eye={convertToHex(this.state.group.substring(0, 1))}
              border={convertToHex(this.state.group.substring(1, 2))}
            >
              <White />
            </Eye>
          </Flex>
          <Em>{icon}</Em>
        </Robot>
      </Div>
    );
  }
}

Bot.propTypes = {
  group: PropTypes.string.isRequired,
};

const hover = keyframes`
from {
  transform: translateY(0px);
}
65% {
  transform: translateY(12px);
}
to {
  transform: translateY(0px);
}
  `;

const Robot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: transparent url(${B}) no-repeat center;
  height: 360px;
  width: 100%;
  `;

const Em = styled.span`
  font-size: 40px;
  text-align: center;
  transform: translateY(50px);
  `;

const Div = styled.div`
  animation: ${hover} 4s ease-in-out infinite;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 30px 30px 60px;
  `;

const Eye = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 30px;

  ${(props) => `
      background: ${props.eye};
      border: solid ${props.border} 8px;
    `}
  `;

const White = styled.div`
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%
  position: absolute;
  z-index: 1;

  ${(props) => `
      background: ${props.eye};
      transform: ${props.transform};
    `}
  `;

const Flex = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    `;

const FlexHelp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  `;

const Antenna = styled.div`
  width: 0;
  height: 0;
  border: solid;
  border-top-width: 0px;
  border-right-width: 5px;
  border-bottom-width: 60px;
  border-left-width: 5px;
  transform: translateY(22.5px);
  position: relative;

  ${(props) => `
    border-color: transparent transparent ${props.border} transparent;
    `}`;
