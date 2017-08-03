import React, { PropTypes, Component } from 'react';
import styled from 'styled-components';
import Linkify from 'react-linkify';

export default class ChannelMessage extends Component {
  constructor(props) {
    super(props);

    this.renderLink = this.renderLink.bind(this);
    this.parseTime = this.parseTime.bind(this);
  }

  renderLink(message) {
    let url = '';
    if (message.indexOf('https') === 0 && message.indexOf(';;') !== -1) {
      url = message.substring(message.indexOf('https'), message.indexOf(' '));
    } else if (message.indexOf('http') === 0 && message.indexOf(';;') !== -1) {
      url = message.substring(message.indexOf('http'), message.indexOf(' '));
    } else {
      return (
        <Linkify
          properties={{
            target: '_blank',
            style: {
              textDecoration: 'none',
              fontWeight: 300,
              color: '#ADADAD',
            },
          }}
        >
          <M>{message}</M>
        </Linkify>
      );
    }

    return (
      <div>
        <div>
          <M>
            {message
              .replace(url, '')
              .substring(message.replace(url, '').indexOf(';;') + 3)}
          </M>
        </div>
        <Pad>
          <Link href={url} target="_blank">
            {message
              .replace(url, '')
              .substring(0, message.replace(url, '').indexOf(';;'))}
          </Link>
        </Pad>
      </div>
    );
  }

  parseTime(date) {
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

  render() {
    console.log(this.props.message);
    return (
      <Box>
        <UpFlex>
          <Profile src={this.props.message.feedCreator.profile_picture} />
          <Container>
            <Message>
              <b>{this.props.message.feedCreator.name}</b>
              <small>
                {this.parseTime(this.props.message.createdAt)}
              </small>
            </Message>
            {this.renderLink(this.props.message.description)}
            {this.props.message.is_attachment === 1 &&
              <Image src={this.props.message.attachment_link} />}
          </Container>
        </UpFlex>
        <div />
      </Box>
    );
  }
}

const Container = styled.div`
  width: 900px;
  margin: 0 0 0 -35px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;
const Message = styled.p`
  font-size: 12px;
  margin: 0;
  float: right;
  width: 94%;
  word-break: break-all;

  >b {
    font-size: 14px;
  }

  >small {
    display: inline;
    color: #ADADAD;
    margin: 0 0 0 10px;
    font-size: 12px;
  }
  `;

const UpFlex = styled.div`
  display: flex;
  flex-direction: row;
`;

const M = styled.p`
font-size: 14px;
margin: 0 0 10px;
float: right;
width: 94%;
font-weight: 300;
  `;

const Profile = styled.img`
  background: #DCDCDC;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  margin: 0;
  `;

const Box = styled.div`
  margin: 0px 10px 11px;
  overflow: hidden;
  `;

const Link = styled.a`
  text-decoration: none;
  color: #fff;
  background: #FF3372;
  padding: 5px 10px;
  border-radius: 16px;
  font-size: 14px;
  margin: 20px 52px;
`;

const Pad = styled.div`
  margin:  10px 0;
  &:active {
    transform: scale(0.99);
  }
`;

const Image = styled.img`
  max-width: 350px;
  max-height: 250px;
  border: 2px white solid;
  border-radius: 8px;
  margin: 5px 45px;
`;

ChannelMessage.propTypes = {
  message: PropTypes.object.isRequired,
};
