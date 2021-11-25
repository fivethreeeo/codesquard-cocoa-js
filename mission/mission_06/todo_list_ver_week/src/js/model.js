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
        1637772390084: { status: 'notYet', content: '비동기 학습하기' },
        1637772390522: { status: 'done', content: '디버깅 학습하기' },
        1637772391715: {
          status: 'done',
          content: 'JavaScript map APIs 학습하기',
        },
      },
      '2021-11-25': {
        1637772027295: { status: 'notYet', content: '마스터즈 가고 싶다..' },
        1637772027486: { status: 'done', content: '정규 표현식 학습' },
        1637772027655: { status: 'notYet', content: '클래스 상속 학습' },
      },
      '2021-11-26': {
        1637772394423: { status: 'notYet', content: 'mvc 학습' },
        1637772394592: { status: 'done', content: '클로저 학습하기' },
        1637772394761: { status: 'notYet', content: '마스터즈 가기..' },
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
