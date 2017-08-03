import React, { PropTypes } from 'react';
import styled from 'styled-components';

function parseMonth(date) {
  if (date.substring(5, 7) === '01') {
    return 'JAN';
  } else if (date.substring(5, 7) === '02') {
    return 'FEB';
  } else if (date.substring(5, 7) === '03') {
    return 'MAR';
  } else if (date.substring(5, 7) === '04') {
    return 'APR';
  } else if (date.substring(5, 7) === '05') {
    return 'MAY';
  } else if (date.substring(5, 7) === '06') {
    return 'JUNE';
  } else if (date.substring(5, 7) === '07') {
    return 'JULY';
  } else if (date.substring(5, 7) === '08') {
    return 'AUG';
  } else if (date.substring(5, 7) === '09') {
    return 'SEPT';
  } else if (date.substring(5, 7) === '10') {
    return 'OCT';
  } else if (date.substring(5, 7) === '11') {
    return 'NOV';
  } else if (date.substring(5, 7) === '12') {
    return 'DEC';
  }
  return null;
}

function parseDay(date) {
  if (date.substring(8, 9) === '0') {
    return date.substring(9, 10);
  }
  return date.substring(8, 10);
}

const CalendarIcon = (props) =>
  <Icon>
    <Month>{parseMonth(props.date)}</Month>
    <Day>{parseDay(props.date)}</Day>
  </Icon>;

const Icon = styled.div`
  border-radius: 10px;
  border-top: solid #FF7070 12px;
  background: white;
  box-shadow: 0px 0px 16px #DCDCDC;
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-direction: column;
  float: left;
  margin: 0 20px 0 8px;
  `;

const Month = styled.h1`
  font-size: 8px;
  text-align: center;
  margin-top: -11px;
  font-weight: 300;
`;

const Day = styled.p`
  margin: 0;
  transform: translateY(-4px);
  text-align: center;
  color: black;
  `;

CalendarIcon.propTypes = {
  date: PropTypes.string.isRequired,
};

export default CalendarIcon;
