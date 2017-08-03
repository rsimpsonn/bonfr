import React from 'react';
import styled, { keyframes } from 'styled-components';

const P = require('../../images/bonfire-p.svg');
const Y = require('../../images/bonfire-y.svg');
const S = require('../../images/bonfire-s.svg');

function randomLoad() {
  let url = null;
  const random = Math.floor(Math.random() * 3);
  if (random === 0) {
    url = P;
  }
  if (random === 1) {
    url = Y;
  }
  if (random === 2) {
    url = S;
  }
  return url;
}

const Loading = () => <Load src={randomLoad()} alt="loading" />;

const spin = keyframes`
  from {
    transform: rotate(0deg) translateY(90px) scale(1);
  }
  10% {
    transform: rotate(0deg) translateY(90px) scale(1);
  }
  40% {
    transform: rotate(0deg) translateY(-10px) scale(1);
  }
  80% {
    transform: rotate(360deg) translateY(-10px) scale(1);
  }
  to {
    transform: rotate(360deg) translateY(90px) scale(1, 0.75);
  }
`;

const Load = styled.img`
  margin: 80px 380px;
  width: auto;
  height: 120px;
  animation: ${spin} 1.2s infinite ease-in;
`;

export default Loading;
