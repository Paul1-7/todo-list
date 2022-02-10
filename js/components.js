import { Todo } from '../classes'
import { todoList } from '../src/index'

const divTodoList = document.querySelector('.todo-list')
const txtInput = document.querySelector('.new-todo')
const btnClearCompleted = document.querySelector('.clear-completed')
const filters = document.querySelector('.filters')
const allFilters = document.querySelectorAll('.filtro')

export const createTodo = todo => {
  const htmlTodo = `<li class="${todo.completed ? 'completed' : ''}" data-id="${
    todo.id
  }">
  <div class="view">
    <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}>
    <label>${todo.task}</label>
    <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
  </li>`

  const div = document.createElement('div')
  div.innerHTML = htmlTodo

  divTodoList.append(div.firstElementChild)

  // return div
}

txtInput.addEventListener('keyup', event => {
  if (event.keyCode === 13 && txtInput.value.length > 0) {
    const newTodo = new Todo(txtInput.value)
    todoList.newTodo(newTodo)
    createTodo(newTodo)

    txtInput.value = ''
  }
})

divTodoList.addEventListener('click', event => {
  const elementName = event.target.localName
  const todoElement = event.target.parentElement.parentElement
  const idElement = Number(todoElement.dataset.id)
  if (elementName.includes('input')) {
    todoList.checkCompleted(idElement)
    todoElement.classList.toggle('completed')
  } else if (elementName.includes('button')) {
    todoList.deleteTodo(idElement)
    divTodoList.removeChild(todoElement)
  }
})

btnClearCompleted.addEventListener('click', () => {
  todoList.deleteCompleted()
  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const element = divTodoList.children[i]
    if (element.classList.contains('completed')) {
      divTodoList.removeChild(element)
    }
  }
})

filters.addEventListener('click', event => {
  const filter = event.target

  if (!filter.text) return

  allFilters.forEach(item => item.classList.remove('selected'))
  filter.classList.add('selected')

  for (const todo of divTodoList.children) {
    todo.classList.remove('hidden')
    const completed = todo.classList.contains('completed')

    switch (filter.text) {
      case 'Completados':
        if (!completed) {
          todo.classList.add('hidden')
        }
        break
      case 'Pendientes':
        if (completed) {
          todo.classList.add('hidden')
        }
    }
  }
})
