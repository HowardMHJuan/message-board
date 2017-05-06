import React, { Component } from 'react';
import './MessageApp.css';
import CommentContainer from './CommentContainer';

class MessageApp extends Component {
  constructor() {
    super();
    this.state = {
      login: false,
      name: '',
    };
  }
  componentDidMount = () => {
    this.props.FB.Event.subscribe('auth.statusChange', this.statusChangeCallback);
  }
  didLogin = () => {
    this.props.FB.api('/me', (res) => {
      this.setState({
        login: true,
        name: res.name,
      });
    });
  }
  didNotLogin = () => {
    this.props.setState({
      login: false,
      name: '',
    });
  }
  statusChangeCallback = (response) => {
    if (response.status === 'connected') {
      this.didLogin();
    } else {
      this.didNotLogin();
    }
  }
  checkLoginState = () => {
    this.props.FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    });
  }
  loginSection = () => {
    if(this.state.login === false) {
      return (
        <div className="fb-login-button"
          data-max-rows="1"
          data-size="medium"
          data-button-type="continue_with"
          data-show-faces="false"
          data-auto-logout-link="false"
          data-use-continue-as="true"
        />
      );
    } else {
      return (
        <a className="btn cyan">Hi, {this.state.name}</a>
      );
    }
  }
  render = () => {
    return (
      <div className="App">
        <div className="login-section">{this.loginSection()}</div>
        <div className="App-header">
          <p>Message Board</p>
        </div>
        <div className="App-content">
          <CommentContainer name={this.state.name} login={this.state.login} Materialize={this.props.Materialize}/>
        </div>
      </div>
    );
  }
}

export default MessageApp;
