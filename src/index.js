import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './App';
import observableTodoStore from './store';
import './index.css';

ReactDOM.render(
  <TodoList store={ observableTodoStore } />,
  document.getElementById('root')
);
