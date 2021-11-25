import { stampTime, getDateOfWeek } from './util.js';

/**
 * TODO CONTROLLER
 * - 사용자 입력을 받고 view, model로 요청하는 역할
 */

export default class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init = () => {
    this.view.renderUserName(this.model.userName);
    this.view.renderDateDesc();
    this.view.renderDateList(getDateOfWeek());
    this.setDoneCount(this.model.doneCount);
    this.view.renderTodoList(this.getTodoList());

    this.view.addBtnEl.addEventListener('click', this.formHandler);
    this.view.dateListEl.addEventListener('click', this.dateHandler);
    this.view.todoListEl.addEventListener('click', (e) => {
      const targetElClass = e.target.classList;
      targetElClass.contains('deleteBtn') && this.deleteBtnHandler(e);
      targetElClass.contains('editBtn') && this.editBtnHandler(e);
      targetElClass.contains('checkbox') && this.checkboxHandler(e);
    });

    this.view.clearInput();
  };

  getInputData = () => this.view.todoInputEl.value;

  dateHandler = (e) => {
    if (e.target === e.currentTarget) return;

    const currDate = this.model.datePoint;
    const clickedDate = e.target.parentNode.className.substring(2, 12);
    if (currDate === clickedDate) return;

    this.view.focusOutDate(currDate);
    this.view.focusDate(clickedDate);
    this.model.datePoint = clickedDate;

    this.view.renderTodoList(this.getTodoList());
  };

  formHandler = (e) => {
    e.preventDefault();

    if (this.view.todoInputEl.value === '') {
      alert('내용을 입력하세요.');
      this.view.clearInput();
      return;
    }

    const key = stampTime();
    const date = this.model.datePoint;
    const content = this.getInputData();

    this.model.addData(key, date, content);
    this.view.renderTodoItem(this.getItemLiteral(key, content));
    this.view.renderNotYetCount(this.view.getNotYetCount(this.model.datePoint));
    this.view.clearInput();
  };

  getItemLiteral = (key, content, status = '', checked = '') => `
  <li id="${key}" class="item ${status}"><input type="checkbox" class="checkbox" ${checked} /><span class="content">${content}</span><button class="editBtn">변경</button><button class="deleteBtn">삭제</button></li>
  `;

  getTodoList = () => {
    let listLiteralEl = ``;
    const date = this.model.datePoint;
    const obj = this.model.todoStorage[date];

    for (let key in obj) {
      const status = obj[key].status;
      const content = obj[key].content;
      let checked;
      if (status === 'done') checked = 'checked';
      listLiteralEl += `${this.getItemLiteral(key, content, checked, checked)}`;
    }

    return listLiteralEl;
  };

  setDoneCount = (count) => {
    let _count = count;
    const obj = this.model.todoStorage;

    for (let key in obj) {
      const innerObj = obj[key];
      for (let key in innerObj) {
        innerObj[key].status === 'done' && _count++;
      }
    }
    this.model.updateDoneCount(_count);
    this.view.renderDoneCount(_count);
    return _count;
  };

  checkboxHandler = (e) => {
    const parentEl = e.target.parentNode;
    const itemId = parentEl.getAttribute('id');

    parentEl.classList.toggle('checked');
    this.model.updateStatus(itemId, this.model.datePoint);
    this.itemCountHandler(parentEl);
  };

  itemCountHandler = (parentEl) => {
    if (parentEl.classList.contains('checked')) {
      this.model.doneCount++;
    } else {
      this.model.doneCount--;
    }
    this.view.renderDoneCount(this.model.doneCount);
    this.view.renderNotYetCount(this.view.getNotYetCount(this.model.datePoint));
  };

  deleteBtnHandler = (e) => {
    const parentEl = e.target.parentNode;
    const itemId = parentEl.getAttribute('id');

    parentEl.remove();
    this.model.deleteData(itemId, this.model.datePoint);
    this.view.renderNotYetCount(this.view.getNotYetCount(this.model.datePoint));
    this.setDoneCount(0);
  };

  editBtnHandler = (e) => {
    console.log('변경 노노..');
  };
}
