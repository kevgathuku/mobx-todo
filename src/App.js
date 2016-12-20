import React, { Component } from 'react';
import {observer} from 'mobx-react';
import TodoView from './TodoView';

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
              <button className="button button-primary" onClick={ this.onNewTodo }>Load Remote Todo</button>
            </div>
          </div>
          <small> (double-click a todo to edit)</small>
        </div>
    );
  }

  onNewTodo = () => {
    this.props.store.addTodo(prompt('Enter a new todo:','coffee plz'));
  }
})

export default TodoList;
