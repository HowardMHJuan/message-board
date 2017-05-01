import React, { Component } from 'react';

class Reply extends Component {
  render = () => {
    return (
      <div className="Reply">
        <p>{this.props.name}</p>
        <p>{this.props.time.getHours()}</p>
        <p>{this.props.content}</p>
      </div>
    );
  }
}

export default Reply;
