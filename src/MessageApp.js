import React, { Component } from 'react';
import './MessageApp.css';
import CommentContainer from './CommentContainer';

class MessageApp extends Component {
  constructor() {
    super();
    this.state = {
      name: 'H',
    };
  }
  render = () => {
    return (
      <div className="App">
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
