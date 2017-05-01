import React, { Component } from 'react';
import Reply from './Reply';

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      replyContent: '',
    };
  }
  handleInputChange = (e) => {
    this.setState({replyContent: e.target.value});
  }
  handleSend = () => {
    this.props.addReply(this.state.replyContent);
  }
  render = () => {
    return (
      <div className="Comment">
        <p>{this.props.name}</p>
        <p>{this.props.time.getHours()}</p>
        <p>{this.props.content}</p>
        {this.props.replies.map((reply) => <Reply 
          name={reply.name}
          time={reply.time}
          content={reply.content}
        />)}
        <input 
          type="text"
          placeholder="Add a reply..."
          value={this.state.replyContent} 
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSend}>SEND</button>
      </div>
    );
  }
}

export default Comment;
