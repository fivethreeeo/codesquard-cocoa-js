import { getFullDate } from './util.js';

/**
 * TODO MODEL
 * - 데이터 관리 역할
 * - 의존성 x
 */

export default class TodoModel {
  constructor(name) {
    this.userName = name;
    this.datePoint = getFullDate();
    this.doneCount = 0;
    this.todoStorage = {
      '2021-11-24': {
        1637772390084: { status: 'notYet', content: '1' },
        1637772390522: { status: 'done', content: '2' },
        1637772391715: { status: 'done', content: '3' },
      },
      '2021-11-25': {
        1637772027295: { status: 'notYet', content: '111111' },
        1637772027486: { status: 'done', content: '222222' },
        1637772027655: { status: 'notYet', content: '333333' },
      },
      '2021-11-26': {
        1637772394423: { status: 'notYet', content: '111' },
        1637772394592: { status: 'done', content: '222' },
        1637772394761: { status: 'notYet', content: '333' },
      },
    };
  }

  addData(id, date, content) {
    const keys = Object.keys(this.todoStorage);
    if (!keys.includes(date)) {
      this.todoStorage[date] = {};
    }
    this.todoStorage[date][id] = { status: 'notYet', content: content };
  }

  deleteData(itemId, date) {
    delete this.todoStorage[date][itemId];
  }

  updateStatus(itemId, date) {
    const property = this.todoStorage[date][itemId];
    if (property.status === 'notYet') {
      property.status = 'done';
      return;
    }
    property.status = 'notYet';
  }

  updateDoneCount(count) {
    this.doneCount = count;
  }

  updateContent() {}
}
