import React, { Component, PropTypes } from 'react';
import styled, { keyframes } from 'styled-components';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Dropzone from 'react-dropzone';

import { Scrollbars } from 'react-custom-scrollbars';
import ChannelMessage from './ChannelMessage';
import ChannelMessenger from './ChannelMessenger';
import Loading from './Loading';

export default class ChannelFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(Cookies.get('token')),
      message: '',
      id: this.props.id,
      noPosts: false,
    };

    this.addMessage = this.addMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.messages = this.messages.bind(this);
    this.updateFeed = this.updateFeed.bind(this);
  }

  componentDidMount() {
    this.updateFeed(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    this.updateFeed(nextProps.id);
    this.setState({
      id: nextProps.id,
    });
  }

  updateFeed(id) {
    this.setState({
      loading: true,
    });
    $.ajax({
      url:
        'http://52.66.73.127/bonfire/bon-lara/public/api/get-all-channel-feeds',
      method: 'POST',
      dataType: 'JSON',
      data: {
        channel_id: id,
      },
      headers: {
        Authorization: `Bearer ${this.state.user.userToken}`,
      },
    })
      .then((data) => {
        console.log(data[0].data[0].values);
        this.setState({
          loading: false,
          messages: data[0].data[0].values.reverse(),
        });
        this.scroll.scrollToBottom();
      })
      .catch(() => this.setState({ messages: [], loading: false }));
  }

  addMessage() {
    this.setState({
      loading: true,
    });
    $.ajax({
      url: 'http://52.66.73.127/bonfire/bon-lara/public/api/create-new-feed',
      method: 'POST',
      dataType: 'JSON',
      data: {
        description: this.state.message,
        group_id: this.props.groupId,
        channel_id: this.state.id,
      },
      headers: {
        Authorization: `Bearer ${this.state.user.userToken}`,
      },
    }).then((data) => this.updateFeed(this.props.id));
  }

  messages() {
    return this.state.messages.map((msg) => <ChannelMessage message={msg} />);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;

    this.setState({
      message: value,
    });
  }

  render() {
    return (
      <div>
        {this.state.loading && <Loading />}
        {!this.state.loading &&
          <Container>
            <Drop
              disableClick
              onDrop={(accepted) => {
                this.setState({
                  loading: true,
                });
                console.log(accepted);
                const data = new FormData();
                data.append('group_id', this.props.groupId);
                data.append('description', 'Shared a file');
                data.append('channel_id', this.props.id);
                data.append('attachment', accepted[0]);
                console.log(data);
                $.ajax({
                  url:
                    'http://52.66.73.127/bonfire/bon-lara/public/api/create-new-feed',
                  method: 'POST',
                  data,
                  contentType: false,
                  processData: false,
                  headers: {
                    Authorization: `Bearer ${this.state.user.userToken}`,
                  },
                }).then((data) => this.updateFeed(this.props.id));
              }}
            >
              <Scrollbars style={{ height: 466 }} ref={(c) => (this.scroll = c)}>
                {this.state.messages && this.messages()}
              </Scrollbars>
              <ChannelMessenger
                change={this.handleChange}
                submit={this.addMessage}
              />
            </Drop>
          </Container>}
      </div>
    );
  }
}

ChannelFeed.propTypes = {
  id: PropTypes.number.isRequired,
  groupId: PropTypes.number.isRequired,
};

const grow = keyframes`
  from {
    transform: scale(1.00);
  }
  65% {
    transform: scale(0.8);
  }
  to {
    transform: scale(1.00);
  }
`;

const Container = styled.div`
  margin: -15px 0 0;
`;

const Load = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${grow} 0.5s ease-in-out infinite;
`;

const Drop = styled(Dropzone)`
  height: 600px;
  width: 1000px;
  border: transparent;
`;
