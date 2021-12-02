import { currentTime, priceToString } from './util.js';

/**
 * Store View
 * 역할 : 점포 관리 영역 ui 출력
 *
 * Controller에서 받은 요청 처리
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
    this.menu.forEach((item, index) => {
      const listItemEl = this.createMenuItem(item[1], item[2], item[0], index);
      this.menuListEl.innerHTML += listItemEl;
    });

    this.printNotice('메뉴 리스트 생성');
  }

  renderMenuItem(btnName, nameEl, statusEl, btnEl) {
    if (btnName === 'menuOn') {
      btnEl.setAttribute('name', 'menuOff');
      statusEl.classList.remove('store-view__menu-status--off');
      statusEl.textContent = 'on';
      this.printNotice(`메뉴 상태 변경: ${nameEl} off -> on`);
      return;
    }
    btnEl.setAttribute('name', 'menuOn');
    statusEl.classList.add('store-view__menu-status--off');
    statusEl.textContent = 'off';
    this.printNotice(`메뉴 상태 변경: ${nameEl} on -> off`);
  }

  createMenuItem = (menu, price, status, index) =>
    `<li class="index_${index}">
      <span class="store-view__menu">${menu} (${priceToString(price)})</span>
      <span class="store-view__menu-status ${
        status === `off` ? `store-view__menu-status--off` : ``
      }">${status}</span>
      <button name="${
        status === `on` ? `menuOff` : `menuOn`
      }" class="store-view__menu-btn">ON/OFF</button>
    </li>`;

  printNotice(message, category = 'common') {
    const messageEl = document.createElement('p');
    messageEl.classList.add(category);
    messageEl.innerHTML = `[${currentTime()}] ${message}`;
    this.noticeWindowEl.append(messageEl);
    this.noticeWindowEl.scrollTop = this.noticeWindowEl.scrollHeight;
  }
}
