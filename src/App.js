import React, { Component } from 'react';
import {observer} from 'mobx-react';
import request from 'superagent';
import TodoView from './TodoView';

// Returns a random integer between min (included) and max (excluded)
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const TodoList = observer(class TodoList extends Component {
  render() {
    const store = this.props.store;
    return (
      <div className="container">
        <div className="u-full-width">
          <h5> { store.report } </h5>
          <ol>
          { store.todos.map(
            (todo, idx) => <TodoView todo={ todo } key={ idx } />
          ) }
          </ol>
          { store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null }
          </div>
          <div className="row">
            <div className="two columns">
              <button className="button button-primary" onClick={ this.onNewTodo }>New Todo</button>
            </div>
            <div className="two columns">
              <button className="button button-primary" onClick={ this.addRemoteTodo }>Load Remote Todo</button>
            </div>
          </div>
          <small> (double-click a todo to edit)</small>
        </div>
    );
  }

  onNewTodo = () => {
    this.props.store.addTodo(prompt('Enter a new todo:','moar coffee'));
  }

  addRemoteTodo = () => {
    const store = this.props.store;
    const todoId = getRandomInt(1, 200);
    store.incrementPendingRequests();
    request
      .get(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      .end((err, res) => {
        store.decrementPendingRequests();
        if (!err) return store.addTodo(res.body.title);
        return store.addTodo('Random Todo ' + Math.random());
      });
  }
})

export default TodoList;
