import React, { Component } from 'react';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import Comment from './Comment';

class CommentContainer extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      commentContent: '',
    };
  }
  catchStatus = (response) => {
    if (response.ok) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
  componentWillMount = () => {
    fetch('/api/comments')
      .then(this.catchStatus)
      .then(response => response.json())
      .then((data) => {
        this.setState({comments: data});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  handleInputChange = (e) => {
    this.setState({commentContent: e.target.value});
  }
  addComment = () => {
    let comments = this.state.comments;
    let comment = {
      name: this.props.name,
      time: new Date(),
      content: this.state.commentContent,
      replies: [],
    };
    comments.push(comment);
    this.setState({
      comments: comments,
      commentContent: '',      
    })
    fetch('/api/comments', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
  }
  addReply = (commentId, replyContent) => {
    let reply = {
      name: this.props.name,
      time: new Date(),
      content: replyContent,
    };
    let comments = this.state.comments;
    comments[commentId].replies.push(reply);
    this.setState({
      comments: comments,
    })
    fetch(`/api/comments/${commentId}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reply),
    });
  }
  handleSend = () => {
    if(this.state.commentContent.trim().length === 0) {
      alert('Comment cannot be blank!');
    } else {
      this.addComment();
    }
  }
  render = () => {
    return (
      <div className="CommentContainer">
        {this.state.comments.map((comment, i) => <Comment 
          commentId={i}
          name={comment.name}
          time={comment.time}
          content={comment.content}
          replies={comment.replies}
          addReply={this.addReply}
        />)}
        <input 
          type="text"
          placeholder="Add a comment..."
          value={this.state.commentContent} 
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSend}>SEND</button>
      </div>
    );
  }
}

export default CommentContainer;
