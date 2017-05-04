import React, { Component } from 'react';

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
        <p>{this.props.name}</p>
        <p>{this.getTime()}</p>
        <p>{this.props.content}</p>
      </div>
    );
  }
}

export default Reply;
