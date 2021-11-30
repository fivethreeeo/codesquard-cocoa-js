import { currentTime } from './util.js';

/**
 * Store View
 * 역할 : 점포 관리 영역 ui 출력
 *
 * Model에서 받거나, View 내부에서 처리 가능한 것은 Controller 없이 직접 처리
 */

export default class AdminStoreView {
  constructor(Model) {
    this.model = Model;
    this.menu = Model.menu;
    this.storeNameEl = document.querySelector('.store-view__name');
    this.clockEl = document.querySelector('.store-view__clock');
    this.storeStatusEl = document.querySelector('.store-view__store-status');
    this.storeStatusMarkEl = document.querySelector('.store-view__status-mark');
    this.menuListEl = document.querySelector('.store-view__menu-list');
    this.noticeWindowEl = document.querySelector('.store-view__notice-window');
  }

  renderStoreName() {
    this.storeNameEl.textContent = this.model.name;
  }

  renderClock() {
    this.clockEl.textContent = `현재시각: ${currentTime()}`;
    setInterval(() => {
      this.clockEl.textContent = `현재시각: ${currentTime()}`;
    }, 1000);
  }

  renderStoreStatus() {
    this.storeStatusMarkEl.textContent = this.model.status;
  }

  renderMenuList() {
    this.menu.forEach((item) => {
      const listItemEl = this.createMenuItem(item[1], item[2], item[0]);
      this.menuListEl.innerHTML += listItemEl;
    });

    this.printNotice('메뉴 리스트 생성');
  }

  createMenuItem = (menu, price, status) =>
    `<li>
      <span class="store-view__menu">${menu} (${price})</span>
      <span class="store-view__menu-status ${
        status === `off` ? `store-view__menu-status--off` : ``
      }">${status}</span>
      <button name="${
        status === `on` ? `menuOn` : `menuOff`
      }" class="store-view__menu-btn">ON/OFF</button>
    </li>`;

  printNotice(message, category = 'common') {
    const messageEl = document.createElement('p');
    messageEl.classList.add(category);
    messageEl.textContent = `[${currentTime()}] ${message}`;
    this.noticeWindowEl.append(messageEl);
  }
}
