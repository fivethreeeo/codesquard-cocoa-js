import { getFullDate } from './util.js';

/**
 * Admin Model
 * 역할 : 점포 데이터 관리
 */

export default class AdminModel {
  constructor(store) {
    this.name = store.name;
    this.menu = store.menu;
    this.status = 'close';
    this.orders = {};
    this.report = {
      date: getFullDate(),
      openingHours: null,
      orderCount: 0,
      failedOrderCount: 0,
      sales: 0,
      orderTransaction: 0,
    };
  }
}
