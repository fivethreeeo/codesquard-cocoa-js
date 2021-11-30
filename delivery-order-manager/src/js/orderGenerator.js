import { stampTime, getRandomNumber, currentTime } from './util.js';

/**
 * Order Operator
 * 역할 : 점포 관리 영역 ui 출력
 *
 */

export default class OrderGenerator {
  constructor(Model) {
    this.status = Model.status;
    this.menu = Model.menu;
  }

  createOrder() {
    const order = {
      id: stampTime(),
      createdTime: currentTime(),
      status: '접수대기',
      price: this.getTotalPrice(this.getMenu()),
      menu: this.getMenu(),
      menuCount: this.getMenu().length,
    };
    return order;
  }

  // 1~10개 랜덤 메뉴 구하기
  getMenu() {
    const availableMenu = this.getAvailableMenu();
    const orderCountedMenu = this.setMenuOrderCount(availableMenu);
    const orderMenu = orderCountedMenu.filter((menuItem) => menuItem[2]);

    return orderMenu;
  }

  setMenuOrderCount(availableMenu) {
    const availableMenuLength = availableMenu.length;
    const maxCount = 10;
    const randomMenuCount = Math.floor(Math.random() * maxCount + 1);
    const orderCountedMenu = JSON.parse(JSON.stringify(availableMenu));

    for (let i = 1; i <= randomMenuCount; i++) {
      const randomIndex = getRandomNumber(0, availableMenuLength);
      orderCountedMenu.forEach((menuItem) => {
        if (menuItem[0] === availableMenu[randomIndex][0]) menuItem[2]++;
      });
    }

    return orderCountedMenu;
  }

  getAvailableMenu() {
    const initialMenuCount = 0;
    const availableMenu = this.menu
      .filter((menuItem) => menuItem[0] === 'on')
      .map((menuItem) => [menuItem[1], menuItem[2], initialMenuCount]);

    return availableMenu;
  }

  getTotalPrice(orderMenu) {
    const totalPrice = orderMenu.reduce((price, menu) => {
      return price + menu[1] * menu[2];
    }, 0);

    return totalPrice;
  }
}
