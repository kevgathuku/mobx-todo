import {
  autorun,
  extendObservable
} from 'mobx';

class ObservableTodoStore {
  constructor() {
    autorun(() => console.log(this.report));
    extendObservable(this, {
      todos: [],
      pendingRequests: 0,
      get completedTodosCount() {
        return this.todos.filter(
          todo => todo.completed === true
        ).length;
      },
      // TODO: Refactor this to show the next incomplete TODO
      get report() {
        if (this.todos.length === 0)
          return "Add a Todo Below";
        return `Next todo: "${this.todos[0].task}". ` +
          `Progress: ${this.completedTodosCount}/${this.todos.length}`;
      }
    })
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    });
  }
}

export default new ObservableTodoStore();
