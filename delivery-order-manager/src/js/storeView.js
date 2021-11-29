import { currentTime } from './util.js';

/**
 * Store View
 * 역할 : 점포 관리 영역 ui 출력
 *
 * Model에서 받거나, View 내부에서 처리 가능한 것은
 * Controller 없이 직접 처리
 */

export default class AdminStoreView {
  constructor(Model) {
    this.model = Model;
    this.storeNameEl = document.querySelector('.store-view__name');
    this.clockEl = document.querySelector('.store-view__clock');
  }

  renderStoreName() {
    this.storeNameEl.textContent = this.model.name;
  }

  renderClock() {
    setInterval(() => {
      this.clockEl.textContent = currentTime();
    }, 1000);
  }
}
