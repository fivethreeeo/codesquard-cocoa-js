/**
 * Order View
 * 역할 : 주문 관리 영역 ui 출력
 *
 * Controller에서 받은 요청 처리
 */

export default class AdminOrderView {
  constructor(Model) {
    this.model = Model;
    this.orderListEl = document.querySelector('.order-view__order-cards');
    this.waitingCountEl = document.querySelector('.waiting');
    this.preparingCountEl = document.querySelector('.preparing');
    this.readyCountEl = document.querySelector('.ready');
    this.deliveringCountEl = document.querySelector('.delivering');
    this.completedCountEl = document.querySelector('.completed');
  }

  renderOrderCard(cardEl) {
    this.orderListEl.insertAdjacentHTML('beforeend', cardEl);
  }

  renderWaitingCount() {
    const count = this.getOrderStatusCount('접수대기');
    this.waitingCountEl.textContent = count;
  }

  renderPreparingCount() {
    const count = this.getOrderStatusCount('메뉴 준비 중');
    this.preparingCountEl.textContent = count;
  }

  renderReadyCount() {
    const count = this.getOrderStatusCount('배달 대기 중');
    this.readyCountEl.textContent = count;
  }

  renderDeliveringCount() {
    const count = this.getOrderStatusCount('배달 중');
    this.deliveringCountEl.textContent = count;
  }

  renderCompletedCount() {
    const count = this.getOrderStatusCount('배달 완료');
    this.completedCountEl.textContent = count;
  }

  getOrderStatusCount(status) {
    let count = 0;
    for (let id in this.model.orderList) {
      this.model.orderList[id].status === status && count++;
    }
    return count;
  }

  renderOverallStatusCount() {
    this.renderWaitingCount();
    this.renderPreparingCount();
    this.renderReadyCount();
    this.renderDeliveringCount();
    this.renderCompletedCount();
  }

  renderOrderCardBtn(btnEl, label) {
    btnEl.setAttribute('name', label);
    btnEl.textContent = label;

    if (label === 'startDelivery') {
      btnEl.classList.add('disabled');
    }
    if (label === 'completeDelivery') {
      btnEl.classList.remove('disabled');
    }
  }

  renderOrderCardStatus(btnEl, label) {
    const statusEl = btnEl.parentNode.querySelector('.order-card__status');
    statusEl.textContent = label;
  }
}
