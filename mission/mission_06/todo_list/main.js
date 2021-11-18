'use-strict';

const $userName = document.querySelector('.userName');
const $today = document.querySelector('.today');
const $todoInput = document.querySelector('.todoInput');
const $addBtn = document.querySelector('.addBtn');
const $list = document.querySelector('.list');

class TodoManager {
  constructor(userName) {
    this.userName = userName;
    this.todoList = {};
    this.itemKeyNumber = 1; // start from 1
    this.currentInput = null;

    $todoInput.addEventListener('input', this.onInput);
    $addBtn.addEventListener('click', this.addListItem);
  }

  printName = () => ($userName.textContent = this.userName);

  printToday = () => {
    const today = new Date();
    const weekWords = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const dayOfWeek = weekWords[new Date().getDay()];
    const result = `${month}/${day} - ${dayOfWeek}`;

    $today.textContent = result;
  };

  onInput = (event) => {
    this.currentInput = event.target.value;
    return this.currentInput;
  };

  addListItem = (event) => {
    event.preventDefault();

    if (this.isInputEmpty()) {
      alert('내용을 입력하세요');
      this.clearInput();
      return;
    }

    const itemKey = this.itemKeyNumber;
    $list.appendChild(this.makeListItem(this.currentInput, itemKey));
    this.todoList[`item${itemKey}`] = {
      content: this.currentInput,
    };
    this.itemKeyNumber++;
    this.clearInput();
  };

  isInputEmpty = () => (this.currentInput ? false : true);

  clearInput = () => {
    this.currentInput = null;
    $todoInput.value = null;
    $todoInput.focus();
  };

  deleteItem = (event) => {
    const listItem = event.target.parentNode;
    const itemClassName = listItem.className.substring(9);
    delete this.todoList[itemClassName];
    listItem.remove();
    $todoInput.focus();
  };

  toggleChecked = (event) => {
    const listItem = event.target.parentNode;
    listItem.classList.toggle('checked');
  };

  makeChild = (parent, ...child) => {
    child.forEach((element) => {
      parent.appendChild(element);
    });
    return parent;
  };

  makeListItem(currentInput, itemKey) {
    const $listItem = document.createElement('li');
    const $checkBox = document.createElement('input');
    const $content = document.createElement('span');
    const $deleteBtn = document.createElement('button');

    $listItem.className = `listItem item${itemKey}`;
    $checkBox.className = 'checkBox';
    $content.className = 'content';
    $deleteBtn.className = 'deleteBtn';

    this.makeChild($listItem, $checkBox, $content, $deleteBtn);

    $checkBox.type = 'checkbox';
    $deleteBtn.textContent = '지우기';
    $content.textContent = currentInput;

    $checkBox.addEventListener('click', this.toggleChecked);
    $deleteBtn.addEventListener('click', this.deleteItem);

    return $listItem;
  }
}

const yellowTodo = new TodoManager('Yellow');
yellowTodo.printName();
yellowTodo.printToday();
yellowTodo.clearInput();
