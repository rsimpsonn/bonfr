import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Header from '../Header';
import LoginForm from '../../components/LoginForm';
import SignUp from '../../containers/SignUp';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: Cookies.get('token'),
      signUp: Cookies.get('signup'),
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signUpdate = this.signUpdate.bind(this);
  }
  static propTypes = {
    children: React.PropTypes.node,
  };

  handleLogin() {
    this.setState({
      loggedIn: Cookies.get('token'),
    });
  }

  signUp() {
    Cookies.set('signup', 'true');
    this.setState({
      signUp: Cookies.get('signup'),
    });
  }

  signUpdate() {
    Cookies.remove('signup');
    this.setState({
      signUp: Cookies.get('signup'),
      loggedIn: Cookies.get('token'),
    });
  }

  render() {
    return (
      <div>
        {this.state.loggedIn &&
          <div>
            <Header logout={this.handleLogin} />
            <div className="content">
              {this.props.children}
            </div>
          </div>}
        {this.state.signUp && <SignUp signUp={this.signUpdate} />}
        {!this.state.loggedIn &&
          !this.state.signUp &&
          <div>
            <LoginForm onLogin={this.handleLogin} signUp={this.signUp} />
          </div>}
      </div>
    );
  }
}
