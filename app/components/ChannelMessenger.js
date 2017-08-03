import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

export default class ChannelMessenger extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(e) {
    if (e.nativeEvent.keyCode !== 13) {
      return;
    }
    e.preventDefault();
    this.props.submit();
    this.i.value = '';
  }

  render() {
    return (
      <MessageBox>
        <Form ref={(c) => (this.form = c)}>
          <Message
            name="message"
            type="submit"
            placeholder="Anything to say?"
            ref={(c) => (this.input = c)}
            onChange={this.props.change}
            onKeyPress={this.submit}
            innerRef={(x) => (this.i = x)}
          />
        </Form>
      </MessageBox>
    );
  }
}

const MessageBox = styled.div`
  border-radius: 8px;
  height: 36px;
  width: 95%;
  border: solid 2px #F2F2F2;
  background-color: transprent;
  padding: 5px 8px;
  display: flex;
  align-content: center;
  bottom: 10px;
  position: absolute;
  `;

const Message = styled.textarea`
  width: 100%;
  resize: none;
  font-size: 14px;
  font-weight: 300;

  &:focus {
    outline: 0;
  }
  `;

const Form = styled.form`
  width: 100%;
`;

const Send = styled.img`
  float: right;
  cursor: pointer;
  &:active {
    transform: scale(0.96);
  }
  `;

ChannelMessenger.propTypes = {
  submit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};
