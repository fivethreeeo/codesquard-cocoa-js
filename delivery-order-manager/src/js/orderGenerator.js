import { stampTime, getRandomNumber, currentTime } from './util.js';

/**
 * Order Generator
 * 역할 : 해당 점포의 주문을 랜덤 생성
 *
 * Controller에서 랜덤으로 요청
 * 주문 내용 - id, 주문상태, 생성시간, 주문메뉴, 주문메뉴개수, 주문총가격
 */

export default class OrderGenerator {
  constructor(Model) {
    this.status = Model.status;
    this.menu = Model.menu;
  }

  createOrder() {
    const orderMenu = this.getMenu();
    const order = {
      id: stampTime(),
      createdTime: currentTime(),
      completedTime: null,
      status: '접수대기',
      menu: orderMenu,
      menuCount: this.getTotalItemCount(orderMenu),
      price: this.getTotalPrice(orderMenu),
    };
    return order;
  }

  // 1~5개 랜덤 메뉴 구하기
  getMenu() {
    const availableMenu = this.getAvailableMenu();
    const orderCountedMenu = this.setMenuOrderCount(availableMenu);
    const orderMenu = orderCountedMenu.filter((menuItem) => menuItem[2]);

    return orderMenu;
  }

  setMenuOrderCount(availableMenu) {
    const availableMenuLength = availableMenu.length;
    const maxCount = 5;
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

  getTotalItemCount(orderMenu) {
    const count = orderMenu.reduce((count, menu) => count + menu[2], 0);
    return count;
  }

  getTotalPrice(orderMenu) {
    const totalPrice = orderMenu.reduce((price, menu) => price + menu[1] * menu[2], 0);

    return totalPrice;
  }
}
