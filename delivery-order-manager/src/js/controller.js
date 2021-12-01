import { stampTime, getRandomMilliSecond } from './util.js';

/**
 * Admin Controller
 * 역할 :
 */
export default class AdminController {
  constructor(Model, OrderGenerator, StoreView, OrderView) {
    this.model = Model;
    this.orderGenerator = OrderGenerator;
    this.storeView = StoreView;
    this.orderView = OrderView;
    this.timeoutId;
  }

  setEventListener() {
    this.storeView.storeStatusEl.addEventListener('click', (e) => {
      const btnName = e.target.getAttribute('name');
      btnName && this.storeStatusBtnHandler(e, btnName);
    });
    this.storeView.menuListEl.addEventListener('click', (e) => {
      const btnName = e.target.getAttribute('name');
      btnName && this.storeMenuBtnHandler(e, btnName);
    });
  }

  storeStatusBtnHandler(e, btnName) {
    if (this.model.status === btnName) return;

    this.storeView.printNotice(
      `점포 상태 변경: ${this.model.status} -> ${btnName}`,
      'important'
    );

    this.model.status = btnName;
    this.storeView.renderStoreStatus();

    if (!(btnName === 'open')) {
      this.clearOrderTimer();
      return;
    }
    this.setOrderTimer();
  }

  storeMenuBtnHandler(e, btnName) {
    const menuItemEl = e.target.parentNode;
    const menuBtnEl = e.target;
    const menuStatusEl = menuItemEl.children[1];
    const menuNameEl = menuItemEl.children[0].textContent;
    const menuIndex = menuItemEl.className.substring(6);

    this.storeView.renderMenuItem(
      btnName,
      menuIndex,
      menuNameEl,
      menuStatusEl,
      menuBtnEl
    );
  }

  // 주문 랜덤 생성
  setOrderTimer() {
    this.timeoutId = setTimeout(() => {
      this.setOrderTimer();
    }, getRandomMilliSecond(1, 5));
  }

  clearOrderTimer() {
    clearTimeout(this.timeoutId);
  }
}
