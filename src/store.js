import {
  action,
  autorun,
  extendObservable
} from 'mobx';

class ObservableTodoStore {
  constructor() {
    extendObservable(this, {
      todos: [],
      pendingRequests: 0,
      get completedTodosCount() {
        return this.todos.filter(
          todo => todo.completed === true
        ).length;
      },
      get firstIncompleteTodo() {
        return this.todos.find(todo => todo.completed === false);
      },
      get report() {
        if (this.todos.length === 0) {
          return "Add a Todo Below";
        } else if (this.completedTodosCount === this.todos.length) {
          return "All Todos are Complete. Add another below";
        }
        // return the first incomplete todo item rather than the first item
        return `Next todo: "${this.firstIncompleteTodo.task}". ` +
          `Progress: ${this.completedTodosCount}/${this.todos.length}`;
      },
      addTodo: action(function(task) {
        this.todos.push({
          task: task,
          completed: false,
          assignee: null
        });
      }),
      incrementPendingRequests: action(function() {
        this.pendingRequests = this.pendingRequests + 1;
      }),
      decrementPendingRequests: action(function() {
        this.pendingRequests = this.pendingRequests - 1;
      }),
    })
    autorun(() => console.log(this.report));
  }
}

export default new ObservableTodoStore();
