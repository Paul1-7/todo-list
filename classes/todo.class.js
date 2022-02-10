export class Todo {
  // with this method recovers the instances of the object
  static fromJson ({ id, task, created, completed }) {
    const tempTodo = new Todo(task)
    tempTodo.id = id
    tempTodo.completed = completed
    tempTodo.created = created
    return tempTodo
  }

  constructor (task) {
    this.task = task
    this.id = new Date().getTime()
    this.created = new Date()
    this.completed = false
  }
}
