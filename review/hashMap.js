/*
  2021. 12. 30

  [노트]
  - 해시맵은 목적상 하나의 공간에 하나의 값만 들어가게(연결리스트 없이) 하기 때문에
  모든 메소드를 1개 일 때 값 처리 -> 아니면 순환하는 재귀함수 돌리기 로직으로 처리했다.
  - 대부분 값이 1개 있거나, 비어있기 때문에 성능에는 문제가 없을 것 같다.

  - 재귀 함수의 리턴 값 때문에 굉장히 애먹었다.  재귀함수를 호출했는데, 리턴 값을 왜 안받아올까? 안되서 되게 답답했는데,
  자바스크립트 실행 환경을 조금만 생각해보면 되는 것이었다. 재귀함수는 콜 스택에 계속 함수가 쌓이는데 제일 끝에서 원하는 값이 처리되어서 리턴을 한다고 한들 그게 제일 하단 함수까지 전달될리가 없었다.
  - 리턴으로 처리하지 말고 따로 변수를 선언해서 거기에 값을 넣어서 처리 했다.

  - 이전보다 코드를 더 간결하게 작성한 것 같다. 재귀를 많이 사용.
  - 전엔 재귀가 어려워서 flat()으로 평평하게 하거나, 문자열로 변환한 뒤에 값을 찾았는데, 이번엔 대부분 재귀로 처리했다. flat()이 덩치가 크다고 한다.
*/

class PhoneBook {
  constructor(groupName) {
    this.groupName = groupName;
    this.tableSize = 11;
    this.table = [...Array(this.tableSize)];
  }

  /***** hash *****/
  hash = (string) => {
    const firstChar = string.slice(0, 1);
    const lastChar = string.slice(-1);
    const value = (firstChar.charCodeAt(0) + lastChar.charCodeAt(0)) % this.tableSize;
    return value;
  };

  /***** put *****/
  put = (name, phone) => {
    const hash = this.hash(name);
    const table = this.table;
    const value = [name, phone];

    if (!table[hash]) {
      table[hash] = value;
      return;
    }
    this.iteratePut(table[hash], value);
  };

  iteratePut = (array, value) => {
    if (!array[2]) {
      array.push(value);
      return;
    }
    this.iteratePut(array[2], value);
  };

  /***** remove *****/
  remove = (name) => {
    const table = this.table;
    const hash = this.hash(name);

    if (!table[hash]) return;
    this.iterateRemove(table[hash], name);
    this.flatDoubleBrackets(table, hash);
  };

  iterateRemove = (array, value) => {
    if (array[0] === value) {
      array.splice(0, 2);
      return;
    }
    array[2] && this.iterateRemove(array[2], value);
  };

  flatDoubleBrackets = (array, index) => {
    const length = array[index].length;

    if (length === 2) return;
    if (length === 1) array[index] = array[index].flat();
    if (length === 0 && array.length !== 3) array[index] = undefined;
    if (length === 0 && array.length === 3) array.pop();
    if (length === 3) this.flatDoubleBrackets(array[index], 2);
  };

  /***** containsKey *****/
  containsKey(name) {
    const table = this.table;
    const hash = this.hash(name);
    let status = false;

    if (!table[hash]) {
      return status;
    }

    const iterateKeys = (array) => {
      if (array[0] === name) status = true;
      if (array[2]) iterateKeys(array[2]);
    };
    iterateKeys(table[hash]);

    return status;
  }

  /***** replace *****/
  replace(name, phone) {
    const hash = this.hash(name);
    const table = this.table;

    if (!table[hash]) return;

    const iterateReplace = (table, name, phone) => {
      if (table[0] === name) table[1] = phone;
      if (table[2]) iterateReplace(table[2], name, phone);
    };

    iterateReplace(table[hash], name, phone);
  }

  /***** get *****/
  get = (name) => {
    const table = this.table;
    const hash = this.hash(name);

    if (!table[hash]) {
      return 'No match';
    }

    let result;
    const iterateGet = (array, value) => {
      if (array[0] === value) {
        result = array[1];
        return;
      }
      array[2] && iterateGet(array[2], value);
    };
    iterateGet(table[hash], name);

    return result;
  };

  /***** keys *****/
  keys() {
    const table = this.table;
    const keys = [];

    const iterateKeys = (array) => {
      keys.push(array[0]);
      array[2] && iterateKeys(array[2]);
    };

    table.forEach((value) => value && iterateKeys(value));

    return keys.join(', ');
  }

  /***** size*****/
  size = () => {
    const table = this.table;
    const str = table.reduce((str, value) => (str += JSON.stringify(value)));
    const size = str.match(/\[/gi).length;

    return size;
  };

  /***** isEmpty *****/
  isEmpty = () => this.table.every((value) => !value);

  /***** clear *****/
  clear = () => (this.table = [...Array(this.tableSize)]);
}

const studentContact = new PhoneBook('school');

// put
studentContact.put('Jinny Park', '019-4322-4847');
studentContact.put('Sangbeom Heo', '019-2347-9123');
studentContact.put('Monsu Park', '012-5646-3479');
studentContact.put('Jason Choi', '016-2345-9876');
studentContact.put('Mingook Kim', '013-3344-5566');
studentContact.put('Hoo Yun', '014-2333-4556');
studentContact.put('Bin Sung', '015-4375-2756');
studentContact.put('Singo Choi', '017-2755-7611');
studentContact.put('Jia Song', '017-3478-7619');
studentContact.put('JongGuk Song', '017-3441-1234');
console.log(studentContact.table);
console.log('--- Completed PUT ---\n');

// replace
studentContact.replace('Jia Song', '111-1111-1111');
studentContact.replace('JongGuk Song', '222-2222-2222');
console.log(studentContact.table);
console.log('--- Completed REPLACE ---\n');

// remove
studentContact.remove('aaaaa');
studentContact.remove('Jinny Park');
studentContact.remove('Singo Choi');
studentContact.remove('Hoo Yun');
console.log(studentContact.table);
console.log('--- Completed REMOVE ---\n');

// get
console.log(`Get 'Jinny Park': ${studentContact.get('Jinny Park')}`);
console.log(`Get 'Sangbeom Heo': ${studentContact.get('Sangbeom Heo')}`);
console.log(`Get 'JongGuk Song': ${studentContact.get('JongGuk Song')}`);

// containKey
console.log(`Is contain 'Jia Song'? ${studentContact.containsKey('Jia Song')}`);
console.log(`Is contain 'Jinny Park'? ${studentContact.containsKey('Jinny Park')}`);

// keys
console.log(`Keys: ${studentContact.keys()}`);

// size
console.log(`Size: ${studentContact.size()}`);

// isEmpty, clear
console.log(`Is table empty? ${studentContact.isEmpty()}`);
studentContact.clear();
console.log(`Is table empty? ${studentContact.isEmpty()}`);
