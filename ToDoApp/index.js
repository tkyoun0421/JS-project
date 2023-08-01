"use strict"

const todoBtnAddEl = document.querySelector('.todo_btn--add')
const containerEl = document.querySelector('.container')

let todos = []

todoBtnAddEl.addEventListener('click', createNewTodo)

function createNewTodo() {
  const item = {
    id: new Date().getTime(),
    text: "",
    complete: false
  }
  todos.unshift(item)
  
  const { itemEl, inputEl } = createTodoElement(item)
  containerEl.prepend(itemEl)
  
}

function createTodoElement(item) {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  const checkboxEl = document.createElement('input')
  checkboxEl.type = 'checkbox'
  checkboxEl.checked = item.complete

  if (item.complete) {
    itemEl.classList.add('complete')
  }

  const inputEl = document.createElement('input')
  inputEl.type = 'text'
  inputEl.value = item.text
  inputEl.setAttribute('disabled', '')

  const formUtilEl = document.createElement('div')
  formUtilEl.classList.add('form-util')

  const todoBtnModifyEl = document.createElement('button')
  todoBtnModifyEl.classList.add('todo_btn--modify')
  todoBtnModifyEl.innerHTML = `
    <i class="fa-solid fa-pencil"></i>
  `

  const todoBtnDeleteEl = document.createElement('button')
  todoBtnDeleteEl.classList.add('todo_btn--delete')
  todoBtnDeleteEl.innerHTML = `
    <i class="fa-solid fa-circle-minus"></i>
  `

  formUtilEl.append(todoBtnModifyEl)
  formUtilEl.append(todoBtnDeleteEl)

  itemEl.append(checkboxEl)
  itemEl.append(inputEl)
  itemEl.append(formUtilEl)

  return { itemEl, inputEl, todoBtnModifyEl, todoBtnDeleteEl }
}