import { Todo } from './todo.class'

export class TodoList {
  constructor () {
    this.loadLocalStorage()
  }

  newTodo (todo) {
    this.todos.push(todo)
    this.saveLocalStorage()
  }

  deleteTodo (id) {
    this.todos = this.todos.filter(todo => todo.id !== id)
    this.saveLocalStorage()
  }

  checkCompleted (id) {
    for (const todo of this.todos) {
      if (todo.id === id) {
        todo.completed = !todo.completed
        this.saveLocalStorage()
        break
      }
    }
  }

  deleteCompleted () {
    this.todos = this.todos.filter(todo => !todo.completed)
    this.saveLocalStorage()
  }

  saveLocalStorage () {
    localStorage.setItem('todo', JSON.stringify(this.todos))
  }

  loadLocalStorage () {
    const data = localStorage.getItem('todo')
    this.todos = data ? JSON.parse(data) : []

    this.todos = this.todos.map(todo => Todo.fromJson(todo))
  }
}
