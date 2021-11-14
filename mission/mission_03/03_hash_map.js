/*
  - put(String key, String value) 키-값을 추가한다.
      - 해시 값 중복 시 체이닝(Linked List)
  - remove(String key) 해당 키에 있는 값을 삭제한다.
  - containsKey(String) 해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.
  - get(String) 해당 키와 매치되는 값을 찾아서 리턴한다.
  - isEmpty() 비어있는 맵인지 Bool 결과를 리턴한다.
  - keys() 전체 키 목록을 [String] 배열로 리턴한다.
  - replace(String key, String value) 키-값으로 기존 값을 대체한다.
  - size() 전체 아이템 개수를 리턴한다.
  - clear() 전체 맵을 초기화한다.
*/

'use-strict';

// 입력한 사이즈 값을 갖는 인스턴스 생성
class hashMap {
  constructor(size) {
    this.tableSize = size;
    this.hashTable = new Array(size).fill(undefined);
    this.printM(`** 사이즈가 ${size}인 해시맵을 만들었다. **`);
    this.printM(this.hashTable);
  }
  // ** hash 만들기
  getHash = (key) => key % this.tableSize;

  // ** 로그 메시지 출력
  printM = (message) => console.log(message);

  // ** 배열의 depth를 1으로 만듬
  makeDepth1 = (array) => array.join().split(',');

  // ** put(key, value) 키-값 을 추가한다.
  put(key, value) {
    const hash = this.getHash(key);
    let curr = this.hashTable[hash];

    // 테이블이 비었으면
    if (!curr) {
      this.hashTable[hash] = [key, value];
      this.printM(`키-값 추가  : [${key}, ${value}]`);
      return;
    }

    // 테이블에 값이 있으면
    const checkCollision = (arr, _key, _value) => {
      if (arr[0] === _key) {
        this.printM(`추가 실패   : ${key} 와 중복된 값이 있습니다.`);
        return;
      }
      if (!arr[2]) {
        arr[2] = [_key, _value];
        this.printM(`키-값 추가  : [${_key}, ${_value}]`);
        return;
      }
      checkCollision(arr[2], _key, _value);
    };
    checkCollision(this.hashTable[hash], key, value);
  }

  // remove(String key) 해당 키에 있는 값을 삭제한다.
  remove(key) {
    const hash = this.getHash(key);
    let curr = this.hashTable[hash];

    // 테이블이 비었으면
    if (!curr) {
      this.printM(`삭제 실패   : 삭제할 값이 없습니다.`);
      return;
    }

    // 테이블에 값이 있으면
    const checkCollision = (_key, arr, outerArr) => {
      if (arr[0] !== _key) {
        checkCollision(_key, arr[2], arr);
      }
      if (arr[0] === _key) {
        this.printM(`키-값 삭제  : [ ${arr[0]}, ${arr[1]} ]`);
        arr.splice(0, 2);

        //이중배열 정리
        if (outerArr.length === 10 && arr.length === 0) {
          outerArr[hash] = undefined;
          return;
        }

        if (outerArr.length === 10 && arr.length === 1) {
          outerArr[hash] = arr.flat();
          return;
        }

        if (outerArr.length === 3 && arr.length === 0) {
          outerArr.pop();
          return;
        }

        if (outerArr.length === 3 && arr.length === 1) {
          outerArr[2] = arr.flat();
          return;
        }
      }
    };
    checkCollision(key, this.hashTable[hash], this.hashTable);
  }

  // ** containsKey(String) 해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.
  containKey(key) {
    const hash = this.getHash(key, this.tableSize);
    if (!this.hashTable[hash]) {
      this.printM(`키 체크     : ${key} 는 없습니다.`);
      return false;
    }

    const flat = this.makeDepth1(this.hashTable[hash]);
    const status = flat.find((v) => v === `${key}`) ? true : false;
    status
      ? this.printM(`키 체크     : ${key} 는 있습니다.`)
      : this.printM(`키 체크     : ${key} 는 없습니다.`);

    return status;
  }

  // ** get(String) 해당 키와 매치되는 값을 찾아서 리턴한다. 없다면 false 리턴
  get(key) {
    // 키가 있을 때
    // - 값 일치 여부
    // - 값 일치 안하면 내부 배열 순환
    const hash = this.getHash(key, this.tableSize);

    const checkCollision = (arr, _key) => {
      if (arr[0] === _key) {
        this.printM(`키 ${_key}       : ${arr[1]}`);
        return;
      }
      if (!arr[2]) {
        this.printM(`키 ${_key}       : 일치하는 값이 없습니다.`);
        return;
      }
      checkCollision(arr[2], _key);
    };
    checkCollision(this.hashTable[hash], key);
  }

  // ** isEmpty() 비어있는 맵인지 Bool 결과를 리턴한다.
  isEmpty() {
    if (this.hashTable.find((v) => v !== undefined)) {
      this.printM(`비었나?     : 테이블에 값이 있습니다.`);
      return false;
    }
    this.printM(`비었나?     : 테이블이 비었습니다.`);
    return true;
  }

  // ** keys() 전체 키 목록을 [String] 배열로 리턴한다.
  keys() {
    const flatTable = this.makeDepth1(this.hashTable);
    const keys = flatTable.filter((v) => v * 1 >= 0 && v.length > 0);
    keys.length === 0
      ? this.printM(`키 목록     : 키 없음`)
      : this.printM(`키 목록     : ${keys}`);

    return keys;
  }

  // replace(String key, String value) 키-값으로 기존 값을 대체한다.
  replace(key, value) {
    const hash = this.getHash(key, this.tableSize);
    let curr = this.hashTable[hash];

    // 테이블에 값이 없으면
    if (!curr) {
      this.printM(`대체 실패   : 대체할 키-값이 없습니다.`);
      return;
    }

    // 테이블에 값이 있으면
    const checkCollision = (arr, _key, _value) => {
      if (arr[0] === _key) {
        this.printM(
          `키-값 대체  : [ ${_key}, ${_value} ] <- [ ${arr[0]}, ${arr[1]} ]`
        );
        arr[0] = _key;
        arr[1] = _value;
        return;
      }
      if (!arr[2]) {
        this.printM(`대체 실패   : 대체할 키-값이 없습니다.`);
        return;
      }
      checkCollision(arr[2], _key, _value);
    };
    checkCollision(this.hashTable[hash], key, value);
  }

  // ** size() 전체 아이템 개수를 리턴한다.
  size() {
    const flatTable = this.makeDepth1(this.hashTable);
    const size = flatTable.filter((v) => v * 1 >= 0 && v.length > 0).length;

    this.printM(`아이템 개수 : ${size}`);
    return size;
  }

  // ** clear() 전체 맵을 빈 값('-')을 가진 배열로 초기화.
  clear() {
    this.hashTable = new Array(this.tableSize);
    this.printM(
      `초기화      : 테이블을 초기화 했습니다, 사이즈: ${this.tableSize}`
    );
  }
}

function testCase() {
  console.log('------------------- HASHTABLE LOGS -------------------');
  const rosterLakers = new hashMap(10); // 사이즈가 10인 해시맵을 만들었다.
  /*
    [
      undefined, undefined,
      undefined, undefined,
      undefined, undefined,
      undefined, undefined,
      undefined, undefined
    ]
   */

  rosterLakers.isEmpty(); // 비었나?: 테이블이 비었습니다.
  rosterLakers.put(0, 'Russell Westbrook'); // 키-값 추가: [0, Russell Westbrook]
  rosterLakers.put(10, 'DeAndre Jordan'); // 키-값 추가: [10, DeAndre Jordan]
  rosterLakers.isEmpty(); // 비었나?: 테이블에 값이 있습니다.
  rosterLakers.clear(); // 초기화: 테이블을 초기화 했습니다, 사이즈: 10
  rosterLakers.isEmpty(); // 비었나?: 테이블이 비었습니다.

  rosterLakers.put(0, 'Russell Westbrook'); // 키-값 추가: [0, Russell Westbrook]
  rosterLakers.put(10, 'DeAndre Jordan'); // 키-값 추가: [10, DeAndre Jordan]
  rosterLakers.put(20, 'Avery Bradley'); // 키-값 추가: [20, Avery Bradley]
  rosterLakers.put(30, 'Jay Huff'); // 키-값 추가: [30, Jay Huff]
  rosterLakers.put(1, 'Trevor Ariza'); // 키-값 추가: [1, Trevor Ariza]
  rosterLakers.put(11, 'Malik Monk'); // 키-값 추가: [11, Malik Monk]
  rosterLakers.put(2, 'Wayne Ellington'); // 키-값 추가: [2, Wayne Ellington]
  rosterLakers.put(12, 'Kendrick Nunn'); // 키-값 추가: [12, Kendrick Nunn]
  rosterLakers.put(4, 'Rajon Rondo'); // 키-값 추가: [4, Rajon Rondo]
  rosterLakers.put(5, 'Talen Horton-Tucker'); // 키-값 추가: [5, Talen Horton-Tucker]
  rosterLakers.put(15, 'Austin Reaves'); // 키-값 추가: [15, Austin Reaves]
  rosterLakers.put(45, 'Sekou Doumbouya'); // 키-값 추가: [45, Sekou Doumbouya]
  rosterLakers.put(6, 'LeBron James'); // 키-값 추가: [6, LeBron James]
  rosterLakers.put(7, 'Carmelo Anthony'); // 키-값 추가: [7, Carmelo Anthony]
  rosterLakers.put(9, 'Kent Bazemore'); // 키-값 추가: [9, Kent Bazemore]
  rosterLakers.put(39, 'Dwight Howard'); // 키-값 추가: [39, Dwight Howard]

  rosterLakers.put(9, 'Kent Bazemore'); // 추가 실패: 9 와 중복된 값이 있습니다.
  rosterLakers.put(39, 'Dwight Howard'); // 추가 실패: 39 와 중복된 값이 있습니다.

  rosterLakers.containKey(1); // 키 체크: 1 는 있습니다.
  rosterLakers.containKey(8); // 키 체크: 8 는 없습니다.

  rosterLakers.get(10); // 키 10: DeAndre Jordan
  rosterLakers.get(15); // 키 15: Austin Reaves
  rosterLakers.get(19); // 키 19: 일치하는 값이 없습니다.

  rosterLakers.replace(3, 'Black'); // 대체 실패: 대체할 키-값이 없습니다.
  rosterLakers.replace(1, 'Yellow'); // 키-값 대체: [ 1, Yellow ] <- [ 1, Trevor Ariza ]
  rosterLakers.replace(11, 'Blue'); // 키-값 대체: [ 11, Blue ] <- [ 11, Malik Monk ]

  rosterLakers.remove(8); // 삭제 실패: 삭제할 값이 없습니다.
  rosterLakers.remove(4); // 키-값 삭제: [ 4, Rajon Rondo ]
  rosterLakers.remove(1); // 키-값 삭제: [ 1, Yellow ]
  rosterLakers.remove(12); // 키-값 삭제: [ 12, Kendrick Nunn ]
  rosterLakers.remove(15); // 키-값 삭제: [ 15, Austin Reaves ]

  rosterLakers.keys(); // 키 목록: 0,10,20,30,11,2,5,45,6,7,9,39
  rosterLakers.size(); // 아이템 개수: 12
  console.log('------------------- HASHTABLE RESULT -------------------');

  console.log(rosterLakers.hashTable);
  /*
  [
    [ 0, 'Russell Westbrook', [ 10, 'DeAndre Jordan', [20, 'Avery Bradley', [ 30, 'Jay Huff ] ] ] ],
    [ 11, 'Blue' ],
    [ 2, 'Wayne Ellington' ],
    undefined,
    undefined,
    [ 5, 'Talen Horton-Tucker', [ 45, 'Sekou Doumbouya' ] ],
    [ 6, 'LeBron James' ],
    [ 7, 'Carmelo Anthony' ],
    undefined,
    [ 9, 'Kent Bazemore', [ 39, 'Dwight Howard' ] ]
  ]
  */
}

testCase();
