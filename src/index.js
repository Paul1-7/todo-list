import { TodoList } from '../classes' // by default find the file index.js
import { createTodo } from '../js/components'
import './styles.css'

export const todoList = new TodoList()

/* todoList.todos.forEach(createTodo) it´s other valid form, if is one parameter   */

todoList.todos.forEach(todo => createTodo(todo))
