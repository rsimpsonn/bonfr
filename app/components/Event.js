import React, { PropTypes } from 'react';
import styled from 'styled-components';

import CalendarIcon from './CalendarIcon';

function parseTime(date) {
  const time = date.substring(11);
  let AMorPM = '';
  let UStime = '';
  if (Number(time.substring(0, 2)) > 11) {
    AMorPM = 'PM';
  } else {
    AMorPM = 'AM';
  }
  if (Number(time.substring(0, 2)) > 12) {
    UStime = Number(time.substring(0, 2) % 12);
  }
  if (Number(time.substring(0, 2)) < 12) {
    UStime = Number(time.substring(0, 2));
  }
  return `${UStime}:${time.substring(3, 5)} ${AMorPM}`;
}

const Event = (props) =>
  <Pad>
    <CalendarIcon date={props.date} />
    <Desc>{parseTime(props.date)}<red>{props.description}</red></Desc>
  </Pad>;

const Desc = styled.p`
  font-size: 12px;
  margin: 0;
  color: black;

  >red {
    color: #ADADAD;
    margin: 0 6px 0 6px;
  }
  `;

const Pad = styled.div`
  margin: 0 0 25px;
  `;
Event.propTypes = {
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default Event;
