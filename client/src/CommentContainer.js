import React, { Component } from 'react';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import Comment from './Comment';
import './CommentContainer.css';

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
    const comment = {
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
    const reply = {
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
    if(this.props.login === false) {
      this.props.Materialize.toast('Please login first', 4000);
    } else if(this.state.commentContent.trim().length === 0) {
      this.props.Materialize.toast('Comment cannot be blank', 4000);
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
          Materialize={this.props.Materialize}
        />)}
        <div className="row">
          <form className="col s12">
            <div className="input-field col s6 offset-s3">
              <textarea 
                id="comment"
                className="materialize-textarea"
                type="text"
                value={this.state.commentContent} 
                onChange={this.handleInputChange}
              />
              <label htmlFor="comment">Add a comment...</label>
            </div>
            <a className="waves-effect waves-teal btn-flat col s1" onClick={this.handleSend}>Post</a>
          </form>
        </div>
      </div>
    );
  }
}

export default CommentContainer;
