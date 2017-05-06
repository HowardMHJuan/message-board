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
  componentWillMount = () => {
    console.log(this.props.FB);
    // window.fbAsyncInit = function() {
    //   FB.init({
    //     appId      : '283614538764595',
    //     cookie     : true,
    //     xfbml      : true,
    //     version    : 'v2.8'
    //   });
    //   FB.AppEvents.logPageView();
    // };
    // (function(d, s, id) {
    //   var js, fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) return;
    //   js = d.createElement(s); js.id = id;
    //   js.src = "//connect.facebook.net/en_US/sdk.js";
    //   fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));
    // console.log(FB);
    // this.FB = FB;
  }
  componentDidMount = () => {
    this.props.FB.Event.subscribe('auth.statusChange', this.statusChangeCallback);
  }
  // testAPI: function() {
  //   console.log('Welcome!  Fetching your information.... ');
  //   FB.api('/me', function(response) {
  //   console.log('Successful login for: ' + response.name);
  //   document.getElementById('status').innerHTML =
  //     'Thanks for logging in, ' + response.name + '!';
  //   });
  // },
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
        <p>Hi, {this.state.name}</p>
      );
    }
  }
  render = () => {
    return (
      <div className="App">
        <div className="login-section">{this.loginSection()}</div>
        <div className="App-header">
          <h1>Message Board</h1>
        </div>
        <div className="App-content">
          <CommentContainer name={this.state.name}/>
        </div>
        <p className="App-footer">
          &copy; <a href="https://github.com/HowardMHJuan">HOWARD M.H. JUAN</a> 2017
        </p>
      </div>
    );
  }
}

export default MessageApp;
