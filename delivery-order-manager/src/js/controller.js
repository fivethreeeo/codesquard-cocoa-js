import { getRandomMilliSecond, currentTime, priceToString } from './util.js';

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
    this.addHandlerOnStoreStatusBtn();
    this.addHandlerOnStoreMenuBtn();
    this.addHandlerOnOrderCardBtn();
  }

  addHandlerOnStoreStatusBtn() {
    this.storeView.storeStatusEl.addEventListener('click', (e) => {
      const btnName = e.target.getAttribute('name');
      btnName && this.storeStatusBtnHandler(btnName);
    });
  }

  addHandlerOnStoreMenuBtn() {
    this.storeView.menuListEl.addEventListener('click', (e) => {
      const btnName = e.target.getAttribute('name');
      btnName && this.storeMenuBtnHandler(e, btnName);
    });
  }

  addHandlerOnOrderCardBtn() {
    this.orderView.orderListEl.addEventListener('click', (e) => {
      const btnName = e.target.getAttribute('name');
      btnName && this.orderCardBtnHandler(e, btnName);
    });
  }

  storeStatusBtnHandler(btnName) {
    if (this.model.status === btnName) return;

    switch (btnName) {
      case 'break':
        this.clearOrderTimer();
        break;
      case 'open':
        this.setOrderTimer();
        if (!this.model.report.openTime) {
          this.model.report.openTime = currentTime();
        }
        break;
      case 'close':
        if (!this.isOrderAllCompleted()) {
          alert('아직 완료되지 않은 주문이 있습니다.');
          return;
        }
        if (!confirm('정말 영업을 종료하시겠습니까?')) {
          return;
        }
        this.clearOrderTimer();
        const closeTime = currentTime();
        this.updateSalesReport(closeTime);
        break;
    }

    this.storeView.printNotice(`점포 상태 변경: ${this.model.status} -> ${btnName}`, 'important');
    this.model.status = btnName;
    this.storeView.renderStoreStatus();
  }

  isOrderAllCompleted() {
    if (this.orderView.getOrderStatusCount('접수대기') !== 0) return false;
    if (this.orderView.getOrderStatusCount('메뉴 준비 중') !== 0) return false;
    if (this.orderView.getOrderStatusCount('배달 대기 중') !== 0) return false;
    if (this.orderView.getOrderStatusCount('배달 중') !== 0) return false;
    return true;
  }

  setOrderTimer() {
    this.timeoutId = setTimeout(() => {
      const order = this.orderGenerator.createOrder();
      const cardEl = this.createOrderCard(order);

      this.model.orderList[order.id] = order;
      this.orderView.renderOrderCard(cardEl);
      this.orderView.renderWaitingCount();

      this.storeView.printNotice(`주문 처리: [${order.id}] -> ${order.status}`, 'order');

      this.setOrderTimer();
    }, getRandomMilliSecond(1, 5));
  }

  clearOrderTimer() {
    clearTimeout(this.timeoutId);
  }

  updateSalesReport(closeTime) {
    const report = this.model.report;
    report.openTime;
    report.closeTime = closeTime;
    report.orderCount = this.getTotalSalesOrderCount();
    report.sales = this.getTotalSalesPrice();
    this.storeView.printNotice(
      `금일 결산:<br>
      영업 시작 시간: ${report.openTime}<br>
      영업 종료 시간: ${report.closeTime}<br>
      총 주문 수: ${report.orderCount}<br>
      총 매출: ${report.sales}
      `,
      'important'
    );
  }

  getTotalSalesPrice() {
    const orderList = this.model.orderList;
    let totalPrice = 0;
    for (let orderId in orderList) {
      totalPrice += orderList[orderId].price;
    }
    return totalPrice;
  }

  getTotalSalesOrderCount() {
    const orderList = this.model.orderList;
    const totalCount = Object.keys(orderList).length;
    return totalCount;
  }

  storeMenuBtnHandler(e, btnName) {
    const menuItemEl = e.target.parentNode;
    const menuIndex = menuItemEl.className.substring(6);

    this.model.menu[menuIndex][0] = btnName === 'menuOn' ? 'on' : 'off';

    const menuNameEl = menuItemEl.children[0].textContent;
    const menuStatusEl = menuItemEl.children[1];
    const menuBtnEl = e.target;

    this.storeView.renderMenuItem(btnName, menuNameEl, menuStatusEl, menuBtnEl);

    if (this.model.status === 'open' && this.isMenuAllOff()) {
      this.storeStatusBtnHandler('break');
    }
  }

  isMenuAllOff = () => !this.model.menu.some((item) => item[0] === 'on');

  orderCardBtnHandler(e, btnName) {
    const orderId = e.target.parentNode.getAttribute('id');

    switch (btnName) {
      case 'accept':
        this.updateOrderStatusOnModel(orderId, '메뉴 준비 중');
        this.orderView.renderOverallStatusCount();
        this.orderView.renderOrderCardStatus(e.target, '메뉴 준비 중');
        this.orderView.renderOrderCardBtn(e.target, 'callDelivery');
        this.storeView.printNotice(`주문 처리: [${orderId}] -> 메뉴 준비 중`, 'order');
        break;

      case 'callDelivery':
        this.updateOrderStatusOnModel(orderId, '배달 대기 중');
        this.orderView.renderOverallStatusCount();
        this.orderView.renderOrderCardStatus(e.target, '배달 대기 중');
        this.orderView.renderOrderCardBtn(e.target, 'startDelivery');
        this.storeView.printNotice(`주문 처리: [${orderId}] -> 배달 대기 중`, 'order');
        setTimeout(() => {
          this.orderCardBtnHandler(e, 'startDelivery')
        }, getRandomMilliSecond(2, 6));
        break;

      case 'startDelivery':
        this.updateOrderStatusOnModel(orderId, '배달 중');
        this.orderView.renderOverallStatusCount();
        this.orderView.renderOrderCardStatus(e.target, '배달 중');
        this.storeView.printNotice(`주문 처리: [${orderId}] -> 배달 중`, 'order');
        setTimeout(() => {
          this.orderView.renderOrderCardBtn(e.target, 'completeDelivery');
          this.orderCardBtnHandler(e, 'completeDelivery');
        }, getRandomMilliSecond(2, 6));
        break;

      case 'completeDelivery':
        this.updateOrderStatusOnModel(orderId, '배달 완료');
        this.updateCompletedTimeOnModel(orderId);
        this.orderView.renderOverallStatusCount();
        this.orderView.renderOrderCardStatus(e.target, '배달 완료');
        this.orderView.renderOrderCardBtn(e.target, 'deleteCard');
        this.storeView.printNotice(`주문 처리: [${orderId}] -> 배달 완료`, 'order');
        break;

      case 'deleteCard':
        e.target.parentNode.remove();
    }
  }

  updateOrderStatusOnModel(orderId, stringStatus) {
    let order = this.model.orderList[orderId];
    order.status = stringStatus;
  }

  updateCompletedTimeOnModel(orderId) {
    let order = this.model.orderList[orderId];
    order.completedTime = currentTime();
  }

  createOrderCard(order) {
    const menuLiteral = order.menu.map((menu) => `${menu[0]}(${menu[2]})`).join(', ');

    return `<li id="${order.id}" class="order-card">
              <span class="status"><span class="order-card__status">${order.status}</span></span>
              <span class="timer"><span class="order-card__timer">{타이머}</span></span>
              <span class="text">주문번호:<span class="order-card__id"> ${order.id}</span></span>
              <span class="text">주문시간:<span class="order-card__created-time"> ${order.createdTime}</span></span>
              <span class="text">총가격:<span class="order-card__price"> ${priceToString(order.price)}</span></span>
              <span class="text">주문메뉴: ${order.menuCount}개<br><span class="order-card__menu">${menuLiteral}</span></span>
              <button name="accept" class="order-card__btn">accept</button>
            </li>`;
  }
}
