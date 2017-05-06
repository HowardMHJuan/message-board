import React, { Component } from 'react';
import './Reply.css';

class Reply extends Component {
  getTime = () => {
    const time = new Date(this.props.time);
    const year = time.getFullYear();
    const month = time.getMonth();
    const date = time.getDate();
    const hour = time.getHours();
    const minute = time.getMinutes();
    return `replied at ${year}/${month}/${date} ${hour}:${minute}`;
  }
  render = () => {
    return (
      <div className="Reply">
        <div className="row reply-name">
          <p className="col s2 offset-s4" id="reply-name">{this.props.name}</p>
          <p className="col s3" id="reply-time">{this.getTime()}</p>
        </div>
        <div className="row reply-content">
          <p className="col s5 offset-s4" id="reply-content">{this.props.content}</p>
        </div>
      </div>
    );
  }
}

export default Reply;
