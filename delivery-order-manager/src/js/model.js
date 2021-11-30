import { getFullDate } from './util.js';

/**
 * Admin Model
 * 역할 : 점포 데이터 관리
 */

export default class AdminModel {
  constructor(store) {
    this.name = store.name;
    this.menu = store.menu;
    this.status = 'open';
    this.orders = {};
    this.report = {
      date: getFullDate(),
      openTime: null,
      closeTime: null,
      orderCount: null,
      failedOrderCount: null,
      sales: null,
      orderTransaction: null,
    };
  }
}
