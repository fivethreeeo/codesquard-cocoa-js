import { getYearMonth, getDateOfWeek, getWeekOfMonth } from './util.js';

// ui를 보여주는 역할
// 사용자 입력을 받지 않고 자체적으로 ui를 그리는 부분들 포함(날짜 관련)
// Model에 의존
export default class TodoView {
  constructor(model) {
    this.model = model;
    this.userNameEl = document.querySelector('.userName');
    this.doneCountEl = document.querySelector('.doneCount');
    this.todoStorageEl = document.querySelector('.todoStorage');
    this.todoInputEl = document.querySelector('.todoInput');
    this.addBtnEl = document.querySelector('.addBtn');
    this.dateListEl = document.querySelector('.dateList');
    this.yearMonthEl = document.querySelector('.yearMonth');
    this.weekOfMonthEl = document.querySelector('.weekOfMonth');
  }

  renderUserName() {}

  renderDoneCount() {}

  renderTodoList() {}

  renderDoneList() {}

  renderYearMonth() {
    this.yearMonthEl.textContent = getYearMonth();
  }

  renderWeekOfMonth() {
    this.weekOfMonthEl.textContent = getWeekOfMonth();
  }

  renderDateList(dateOfWeek) {
    dateOfWeek.forEach((element) => {
      const day = element[0];
      const date = element[1];
      this.dateListEl.insertAdjacentHTML(
        'beforeend',
        this.getDateItemLiteral(day, date)
      );
    });
    this.focusToday();
  }

  clearInput() {}

  focusToday() {
    const todayDate = new Date().getDate();
    const todayItem = document.querySelector(`.date_${todayDate}`);
    todayItem.classList.add('today', 'selected');
  }

  getDateItemLiteral = (day, date) =>
    `<li class="date_${date}"><span class="day">${day}</span><span class="itemCount">(5)</span><span class="date">${date}</span></li>`;

  initializeView() {
    this.renderYearMonth();
    this.renderWeekOfMonth();
    this.todoStorageEl.textContent = 'todolist';
    this.renderDateList(getDateOfWeek());
  }
}
