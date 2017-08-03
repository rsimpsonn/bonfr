import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

import GroupForm from '../components/GroupForm';

export default class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      ready: true,
    });
  }

  render() {
    return (
      <Background>
        {this.state.ready === false &&
          <Flex>
            <Header>Ready to start a new group?</Header>
            <Button onClick={this.toggle}>
              <ButText>Get Started</ButText>
            </Button>
          </Flex>}

        {this.state.ready === true && <GroupForm />}
      </Background>
    );
  }
}

const Gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
  `;

const FadeIn = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  `;

const Background = styled.div`
  background: linear-gradient(270deg, #E3FFC2, #02A8F3, #6725D0, #FF3372);
  background-size: 600% 600%;
  animation: ${Gradient} 80s linear infinite;
  `;

const Header = styled.h1`
  font-size: 50px;
  font-weight: 300;
  margin: 200px 160px 20px;
  text-align: center;
  animation: ${FadeIn} 2s linear;
  `;

const Button = styled.button`
  border-radius: 14px;
  border: solid;
  border-color: #fff;
  border-width: 2px;
  background: transparent;
  margin: 60px 60px 144px;
  animation: ${FadeIn} 2s linear;
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:active {
    transform: scale(0.96);
  }
  `;

const ButText = styled.p`
  color: #fff;
  font-weight: 300;
  font-size: 20px;
  margin: 5px 10px;
  `;
