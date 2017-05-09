import React, { Component } from 'react';
import Reply from './Reply';
import './Comment.css';

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      displayReply: false,
      replyContent: '',
    };
  }
  handleInputChange = (e) => {
    this.setState({replyContent: e.target.value});
  }
  handleSend = () => {
    if(this.state.replyContent.trim().length === 0) {
      this.props.Materialize.toast('Reply cannot be blank', 4000);
    } else {
      this.props.addReply(this.props.commentId, this.state.replyContent);
      this.setState({replyContent: ''});
      this.toggleReply(true);
    }
  }
  getTime = () => {
    const time = new Date(this.props.time);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const hour = (`0${time.getHours()}`).slice(-2);
    const minute = (`0${time.getMinutes()}`).slice(-2);
    return `commented at ${year}/${month}/${date} ${hour}:${minute}`;
  }
  toggleReply = (f) => {
    if(this.state.displayReply === false){
      this.setState({
        displayReply: true,
      });
    } else if(f === true || this.state.replyContent === '') {
      this.setState({
        displayReply: false,
      });
    }
  }
  handleReply = () => {
    if(this.state.displayReply === true) {
      return (
        <form className="col s12">
          <div className="input-field col s5 offset-s4">
            <textarea 
              id="reply"
              className="materialize-textarea"
              type="text"
              value={this.state.replyContent} 
              onChange={this.handleInputChange}
              onBlur={this.toggleReply}
              autoFocus
            />
            <label htmlFor="reply">Type some reply...</label>
          </div>
          <a className="waves-effect waves-teal btn-flat col s1" onClick={this.handleSend}>Reply</a>
        </form>
      );
    } else {
      return (
        <div className="col s12">
          <a className="waves-effect waves-teal btn-flat col s1 offset-s4" onClick={this.toggleReply}>Reply</a>
        </div>
      );
    }
  }
  render = () => {
    return (
      <div className="Comment">
        <div className="row comment-name">
          <p className="col s2 offset-s3" id="comment-name">{this.props.name}</p>
          <p className="col s3" id="comment-time">{this.getTime()}</p>
        </div>
        <div className="row comment-content">
          <p className="col s6 offset-s3" id="comment-content">{this.props.content}</p>
        </div>
        {this.props.replies.map((reply) => <Reply 
          name={reply.name}
          time={reply.time}
          content={reply.content}
        />)}
        <div className="row">
          {this.handleReply()}
        </div>
      </div>
    );
  }
}

export default Comment;
