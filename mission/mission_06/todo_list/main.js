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
    const weekWords = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const dayOfWeek = weekWords[new Date().getDay()];
    const result = `${month}/${day} - ${dayOfWeek}`;

    this.$today.textContent = result;
  }

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

    this.$list.appendChild(this.makeListItem(this.currentInput));
    this.clearInput();
  };

  isInputEmpty = () => (this.currentInput ? false : true);

  clearInput() {
    this.currentInput = null;
    this.$todoInput.value = null;
    this.$todoInput.focus();
  }

  deleteItem = (event) => {
    const listItem = event.target.parentNode;
    listItem.remove();
    this.$todoInput.focus();
  };

  toggleChecked = (event) => {
    const listItem = event.target.parentNode;
    listItem.classList.toggle('checked');
  };

  makeListItem(currentInput) {
    const $listItem = document.createElement('li');
    const $checkBox = document.createElement('input');
    const $content = document.createElement('span');
    const $deleteBtn = document.createElement('button');

    $listItem.className = 'listItem';
    $checkBox.className = 'checkBox';
    $content.className = 'content';
    $deleteBtn.className = 'deleteBtn';

    $checkBox.type = 'checkbox';
    $content.textContent = currentInput;
    $deleteBtn.textContent = '지우기';

    $listItem.appendChild($checkBox);
    $listItem.appendChild($content);
    $listItem.appendChild($deleteBtn);

    $checkBox.addEventListener('click', this.toggleChecked);
    $deleteBtn.addEventListener('click', this.deleteItem);

    return $listItem;
  }
}

const yellowTodo = new TodoManager('Yellow');
yellowTodo.printName();
yellowTodo.printToday();
yellowTodo.clearInput();
