import React from 'react';
import ReactDOM from 'react-dom';
import MessageApp from './MessageApp';
import './index.css';

ReactDOM.render(
  <MessageApp FB={window.FB} Materialize={window.Materialize}/>,
  document.getElementById('root')
);
