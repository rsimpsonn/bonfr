import React, { Component } from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import $ from 'jquery';
import InterestsMin from './InterestsMin';

export default class GroupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accepted: undefined,
      success: false,
      user: JSON.parse(Cookies.get('token')),
      file: '',
    };

    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  submit() {
    const data = new FormData();
    data.append('name', this.state.name);
    data.append('description', this.state.description);
    data.append('is_private', this.state.checked ? 1 : 0);
    data.append('image', this.state.file);
    data.append('interests', this.interests.state.list);
    console.log(this.state.file);
    $.ajax({
      url: 'http://52.66.73.127/bonfire/bon-lara/public/api/groups/create',
      method: 'POST',
      data,
      contentType: false,
      processData: false,
      headers: {
        Authorization: `Bearer ${this.state.user.userToken}`,
      },
    }).then((data) => {
      console.log(data);
      this.setState({
        success: true,
      });
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox'
      ? target.checked ? 1 : 0
      : target.value;
    const name = target.name;

    console.log(value);

    this.setState({
      [name]: value,
    });
  }

  handleImageChange(file) {
    // const fd = new FormData(this.imageForm);
    // console.log(fd);
    // console.log(file);
    this.setState({ file: this.fileUpload.files[0] });
  }
  render() {
    return (
      <div>
        {!this.state.success &&
          <Flex>
            <Title
              placeholder="Your Group's Name"
              name="name"
              onChange={this.handleChange}
            />
            <Sub
              placeholder="Short Description"
              name="description"
              onChange={this.handleChange}
            />
            <label htmlFor="check">
              Will your group be private?
              <Title
                name="check"
                type="checkbox"
                onChange={this.handleChange}
              />
            </label>
            <SubmitText>Upload a cover photo</SubmitText>
            {/*
              <form encType="multipart/form-data" ref={(c) => (this.imageForm = c)}>
                <input
                  type="file"
                  name="file"
                  ref={(c) => (this.fileUpload = c)}
                  onChange={this.handleImageChange}
                />
              </form>
              */} 
            <input
              type="file"
              name="file"
              ref={(c) => (this.fileUpload = c)}
              onChange={this.handleImageChange}
            />
            {this.state.image && <Cover src={this.state.image} />}
            <SubmitText>What does your group do?</SubmitText>
            <Scroll>
              <InterestsMin
                ref={(c) => {
                  this.interests = c;
                }}
              />
            </Scroll>
            <Submit onClick={this.submit}>
              <SubmitText>Create your group</SubmitText>
            </Submit>
          </Flex>}
        {this.state.success &&
          <Flex>
            <SuccessText>
              Your group has been created succesfully and will join Bonfire upon
              approval.
            </SuccessText>
          </Flex>}
      </div>
    );
  }
}

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;

    `;

const Title = styled.input`
  font-size: 50px;
  color: #fff;
  margin: 0 10px;

  &:focus {
    outline: 0;
  }
  `;

const Sub = styled.textarea`
  border-radius: 5px;
  border: solid 2px;
  padding: 10px;
  font-size: 14px;
  color: #fff;
  margin: 20px 0;
  width: 500px;
  resize: none;
  height: 80px;
  &:focus {
    outline: 0;
  }
  `;

const CoverPhoto = styled.input`
    border-radius: 14px;
    margin: 10px 0;

    &:focus {
      outline: 0;
    }
    `;

const Submit = styled.button`
          margin: 0px 0px;
          display: flex;
          color: #fff;
          cursor: pointer;
          opacity: 0.8;

          &:focus {
            outline: 0;
          }

          &:hover {
            opacity: 1;
          }

            `;

const SubmitText = styled.p`
          font-weight: 300;
          color: #fff;
          margin: 30px 0 0;
          `;

const SuccessText = styled.p`
  font-size: 32px;
  font-weight: 300;
  color: #fff;
  text-align: center;
  margin: 150px 100px;
`;

const Cover = styled.img`
  height: auto;
  width: ${376 / 2}px;
  border: solid 5px #fff;
  border-radius: 8px;
  margin: 20px 0;
`;

const Scroll = styled.div`
  max-height: 100px;
  background: white;
  border-radius: 8px;
  margin: 20px 0 10px;
`;
