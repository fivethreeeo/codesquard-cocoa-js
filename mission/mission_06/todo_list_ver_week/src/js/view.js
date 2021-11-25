import { getFullDate, getDateDesc } from './util.js';
/**
 * TODO VIEW
 * - ui를 보여주는 역할
 * - 사용자 입력을 받지 않고 자체적으로 ui를 그리는 부분들 포함(날짜 관련)
 */

export default class TodoView {
  constructor(model) {
    this.model = model;
    this.wrapEl = document.querySelector('.wrap');
    this.userNameEl = document.querySelector('.userName');
    this.doneCountEl = document.querySelector('.doneCount');
    this.todoListEl = document.querySelector('.todoList');
    this.todoInputEl = document.querySelector('.todoInput');
    this.addBtnEl = document.querySelector('.addBtn');
    this.dateListEl = document.querySelector('.dateList');
    this.yearEl = document.querySelector('.year');
    this.monthEl = document.querySelector('.month');
    this.weekOfMonthEl = document.querySelector('.weekOfMonth');
  }

  renderUserName(name) {
    this.userNameEl.textContent = name;
  }

  renderDoneCount(count) {
    this.doneCountEl.textContent = count;
  }

  renderTodoItem(itemLiteral) {
    this.todoListEl.insertAdjacentHTML('beforeend', itemLiteral);
  }

  renderTodoList(listLiteral) {
    this.todoListEl.innerHTML = listLiteral;
  }

  renderDateDesc = () => {
    this.yearEl.textContent = getDateDesc()[0];
    this.monthEl.textContent = getDateDesc()[1];
    this.weekOfMonthEl.textContent = getDateDesc()[3];
  };

  renderNotYetCount = (count) => {
    const date = this.model.datePoint;
    const countEl = document.querySelector(`.d_${date} .notYetCount`);
    countEl.textContent = count;
  };

  renderDateList = (dateOfWeek) => {
    dateOfWeek.forEach((element) => {
      const day = element[0];
      const date = element[1];
      const fullDate = element[2];
      const notYetCount = this.getNotYetCount(fullDate);
      this.dateListEl.insertAdjacentHTML(
        'beforeend',
        this.getDateItemLiteral(day, date, fullDate, notYetCount)
      );
    });
    this.model.datePoint = getFullDate();
    this.addClassToday(this.model.datePoint);
    this.focusDate(this.model.datePoint);
  };

  getDateItemLiteral = (day, date, fullDate, notYetCount = '') =>
    `<li class="d_${fullDate}"><span class="day">${day}</span><span class="notYetCount">${notYetCount}</span><span class="date">${date}</span></li>`;

  getNotYetCount(date) {
    const todoOfDate = this.model.todoStorage[date];
    let count = 0;
    for (let key in todoOfDate) {
      if (todoOfDate[key].status === 'notYet') count++;
    }

    return count;
  }

  addClassToday(date) {
    document.querySelector(`.d_${date}`).classList.add('today');
  }

  focusDate(date) {
    document.querySelector(`.d_${date}`).classList.add('focus');
  }

  focusOutDate(date) {
    document.querySelector(`.d_${date}`).classList.remove('focus');
  }

  clearInput() {
    this.todoInputEl.value = null;
    this.todoInputEl.focus();
  }
}
