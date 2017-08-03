import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

export default class NewsCard extends Component {
  constructor(props) {
    super(props);

    this.addTodo = this.addTodo.bind(this);
  }

  addTodo() {}

  render() {
    return (
      <Card>
        {this.props.children}
      </Card>
    );
  }
}

const Card = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 5px;
  overflow-y: scroll;
  flex: 0 0 300px;
`;

NewsCard.propTypes = {
  children: PropTypes.node.isRequired,
};
