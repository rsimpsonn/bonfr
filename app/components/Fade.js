import React, { PropTypes } from 'react';
import styled, { keyframes } from 'styled-components';

const Fade = (props) =>
  <BackgroundFade {...props}>
    {props.children}
  </BackgroundFade>;

const BackgroundFade = styled.div`
  background: linear-gradient(270deg, #02A8F3, #E3FFC2);
  height: 100%;
  width: 100%;
  animation: ${Opacity} 2s linear;
  opacity: 0;
`;

const Opacity = keyframes`
  from {
    opacity: 0;
  }
  65% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

Fade.defaultProps = {
  children: null,
};

Fade.propTypes = {
  children: PropTypes.node,
};

export default Fade;
