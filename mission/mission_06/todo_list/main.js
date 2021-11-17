'use-strict';

class TodoManager {
  constructor(userName) {
    this.userName = userName;
    //this.todoList = [];

    this.$userName = document.querySelector('.userName');
    this.$today = document.querySelector('.today');
    this.$todoInput = document.querySelector('.todoInput');
    this.$addBtn = document.querySelector('.addBtn');
    this.$list = document.querySelector('.list');

    this.currentInput = null;
    this.$todoInput.addEventListener('input', this.onInput);
    this.$addBtn.addEventListener('click', this.addListItem);
  }

  printName() {
    this.$userName.textContent = this.userName;
  }

  printToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const dateString = year + '-' + month + '-' + day;
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = week[new Date().getDay()];
    this.$today.textContent = `${dateString} ${dayOfWeek}`;
  }

  onInput = (event) => {
    this.currentInput = event.target.value;
    return this.currentInput;
  };

  addListItem = (event) => {
    event.preventDefault();

    if (!this.currentInput) {
      alert('내용을 입력하세요');
      this.clearInput();
      return;
    }

    //this.todoList.push(this.currentInput);
    this.$list.appendChild(this.makeListItem(this.currentInput));
    this.clearInput();

    console.log(this.todoList);
  };

  clearInput() {
    this.currentInput = null;
    this.$todoInput.value = null;
    this.$todoInput.focus();
  }

  deleteItem = (event) => {
    const listItem = event.target.parentNode;
    listItem.remove();
  };

  toggleChecked = (event) => {
    const listItem = event.target.parentNode;
    listItem.classList.toggle('checked');
  };

  makeListItem(currentInput) {
    const $listItem = document.createElement('li');
    const $input = document.createElement('input');
    const $content = document.createElement('span');
    const $deleteBtn = document.createElement('button');

    $listItem.className = 'listItem';
    $input.className = 'checkBox';
    $content.className = 'content';
    $deleteBtn.className = 'deleteBtn';

    $input.type = 'checkbox';
    $content.textContent = currentInput;
    $deleteBtn.textContent = '할 일 삭제';

    $listItem.appendChild($input);
    $listItem.appendChild($content);
    $listItem.appendChild($deleteBtn);

    $input.addEventListener('click', this.toggleChecked);
    $deleteBtn.addEventListener('click', this.deleteItem);

    return $listItem;
  }
}

const yellowTodo = new TodoManager('Yellow');
yellowTodo.printName();
yellowTodo.printToday();
yellowTodo.clearInput();
