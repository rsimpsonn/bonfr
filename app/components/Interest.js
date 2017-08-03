import React, { PropTypes } from 'react';
import styled from 'styled-components';

const Interest = (props) =>
  <Icon>
    <InterestText onClick={props.remove}>#{props.interest}</InterestText>
  </Icon>;

Interest.propTypes = {
  interest: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
};

const Icon = styled.button`
  border-radius: 14px;
  background: #C3E5FF;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3px 6px 3px 0px;

  &:focus {
    outline: 0;
  }
`;

const InterestText = styled.p`
font-size: 12px;
font-weight: 400;
color: #2E485D;
margin: 2px 8px;
`;

export default Interest;
