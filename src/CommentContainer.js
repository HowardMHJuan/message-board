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
    fetch('/comments')
      .then(this.catchStatus)
      .then(response => response.json())
      .then((data) => {
        this.setState({comments: data});
      })
      .catch((error) => {
        // console.error(error);
      });
  }
  handleInputChange = (e) => {
    this.setState({commentContent: e.target.value});
  }
  addComment = () => {
    // let comment = {
    //   name: this.props.name,
    //   time: new Date(),
    //   content: this.state.commentContent,
    //   replies: [],
    // };
    let comments = this.state.comments;
    comments.push({
      name: this.props.name,
      time: new Date(),
      content: this.state.commentContent,
      replies: [],
    });
    this.setState({
      comments: comments,
      commentContent: '',      
    })
    // fetch('/comments', {
    //   method: 'post',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(comment),
    // });
  }
  addReply = (replyContent) => {
    // let reply = {
    //   name: this.props.name,
    //   time: new Date(),
    //   content: replyContent,
    // };
    // this.setState({
    //   comments: this.state.comments.concat(comment),
    // })
    // fetch('/comments/', {
    //   method: 'post',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(comment),
    // });
  }
  handleSend = () => {
    this.addComment();
  }
  render = () => {
    return (
      <div className="CommentContainer">
        {this.state.comments.map((comment) => <Comment 
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
