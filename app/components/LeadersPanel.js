import React, { Component, PropTypes } from 'react';
import styled, { keyframes } from 'styled-components';
import { Popover, PopoverContent } from 'reactstrap';

import EventForm from './EventForm';
import MessageForm from './MessageForm';
import GroupSettingsForm from './GroupSettingsForm';

const Rob = require('../../images/robot.svg');
const Speak = require('../../images/speaker.svg');
const Date = require('../../images/date.svg');
const Pin = require('../../images/pin.svg');

export default class LeadersPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventPopover: false,
      messagePopover: false,
      settingsPopover: false,
    };

    this.toggleEvent = this.toggleEvent.bind(this);
    this.toggleMessage = this.toggleMessage.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
  }

  toggleEvent() {
    this.setState({
      eventPopover: !this.state.eventPopover,
    });
  }

  toggleMessage() {
    this.setState({
      messagePopover: !this.state.messagePopover,
    });
  }

  toggleSettings() {
    this.setState({
      settingsPopover: !this.state.settingsPopover,
    });
  }

  render() {
    return (
      <FlexHelp>
        <Flex>
          <Button kind="turq" onClick={this.props.bot}>
            <img src={Rob} alt="bot" />
          </Button>
          <Text>Your Bot</Text>
        </Flex>
        <Flex>
          <Button kind="blue" onClick={this.toggleEvent} id="event">
            <img src={Date} alt="announce" />
          </Button>
          <Text>Add Event</Text>
        </Flex>
        <Flex>
          <Button kind="yellow" onClick={this.toggleMessage} id="message">
            <img src={Speak} alt="announce" />
          </Button>
          <Text>Add Message</Text>
        </Flex>
        <Flex>
          <Button onClick={this.toggleSettings} id="settings">
            <img src={Pin} alt="announce" />
          </Button>
          <Text>Settings</Text>
        </Flex>
        <Popover
          placement="top"
          isOpen={this.state.eventPopover}
          target="event"
          toggle={this.toggleEvent}
        >
          <PopoverContent>
            <Div>
              <EventForm group={this.props.group} />
            </Div>
          </PopoverContent>
        </Popover>
        <Popover
          placement="top"
          isOpen={this.state.messagePopover}
          target="message"
          toggle={this.toggleMessage}
        >
          <PopoverContent>
            <Div>
              <MessageForm group={this.props.group} />
            </Div>
          </PopoverContent>
        </Popover>
        <Popover
          placement="top"
          isOpen={this.state.settingsPopover}
          target="settings"
          toggle={this.toggleSettings}
        >
          <PopoverContent>
            <Div>
              <GroupSettingsForm group={this.props.group} />
            </Div>
          </PopoverContent>
        </Popover>
      </FlexHelp>
    );
  }
}

LeadersPanel.propTypes = {
  bot: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
};

const Button = styled.button`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: inline;
  margin: 0px 25px;
  cursor: pointer;
   &:active {
     transform: scale(0.96);
   }

   &:hover {
     background-color: #02A8F3;
   }

   &:focus {
     outline: 0;
   }

  ${(props) => {
    if (props.kind === 'turq') {
      return `
        background-color: #89FFE4;
        `;
    }

    if (props.kind === 'blue') {
      return `
        background-color: #9BC9FF;
      `;
    }
    if (props.kind === 'yellow') {
      return `
        background-color: #FFE800;
      `;
    }
    return `
      background-color: #FF7070;
    `;
  }}
  `;

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    `;

const Text = styled.p`
  font-size: 12px;
  margin: 3px;
  text-align: center;
  color: #ADADAD;
  `;

const FlexHelp = styled.div`
    display: flex;
    flex-direction: row;
    `;

const Div = styled.div`
      background: #fff;
      max-width: 240px;
      border-radius: 15px;
      padding: 10px;
      box-shadow: 0px 5px 26px #DCDCDC;
      animation: ${Fade} 0.15s linear;
      margin: 35px -30px;
      z-index: 100;
    `;
const Fade = keyframes`
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    `;
