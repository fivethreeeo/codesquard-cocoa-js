/*
  (7, 'Carmelo Anthony');
  (1, 'Trevor Ariza');
  (9, 'Kent Bazemore');
  (20, 'Avery Bradley');
  (2, 'Wayne Ellington');
  (31, 'Dwight Howard');
  (6, 'LeBron James');
  (10, 'DeAndre Jordan');
  (11, 'Malik Monk');
*/

'use-strict';

class hashMap {
  constructor(size) {
    this.tableSize = size;
    this.hashTable = [];
    this.makeEmpty(this.hashTable, this.tableSize);
  }

  // ** arr의 length만큼 '-'값 넣기
  makeEmpty(arr, length) {
    for (let i = 0; i < length; i++) {
      arr[i] = '-';
    }
  }

  // ** 해시 값 만들기
  doHash(key, tableSize) {
    return key % tableSize;
  }

  // ** put(String key, String value) 키-값을 추가한다.
  put(key, value) {
    const hash = this.doHash(key, this.tableSize);

    // 빈 값이면 -> 값 넣기
    if (this.hashTable[hash] === '-') {
      this.hashTable[hash] = [key, value];
      return this.hashTable;
    }

    // 값이 있으면 -> 이중 배열 여부 체크
    (function checkCollision(arr, _key, _value) {
      if (arr[2] === undefined) {
        // 이중 배열이 없으면 -> 값 넣기
        arr[2] = [_key, _value];
      } else {
        // 이중 배열이 있으면 -> 재귀 함수 호출
        checkCollision(arr[2], _key, _value);
      }
    })(this.hashTable[hash], key, value);

    return this.hashTable;
  }

  // ** remove(String key) 해당 키에 있는 값을 삭제한다.
  remove(key) {
    const hash = this.doHash(key, this.tableSize);

    // 값이 없을 때(빈 값일 때) -> 빈 값 메시지
    if (this.hashTable[hash] === '-') {
      console.log(`${key} 는 일치하는 값이 없습니다.`);
      return this.hashTable;
    }

    //값이 있을 때 -> 해시 테이블 배열 순회
    (function iterateHashTable(outerArr, arr) {
      if (arr[0] === key) {
        arr.splice(0, 2);
        //outerArr[hash] = outerArr[hash].flat();
        // 배열 해체 해야하는데..

        return;
      }
      iterateHashTable(arr, arr[2]);
    })(this.hashTable, this.hashTable[hash]);

    return;
  }

  // containsKey(String) 해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.
  containKey(key) {
    const hash = this.doHash(key, this.tableSize);
    const status = this.hashTable.find((v, index) => index === hash) !== '-';
    return status;
  }

  // get(String) 해당 키와 매치되는 값을 찾아서 리턴한다. 없다면 false 리턴
  get(key) {
    const hash = this.doHash(key, this.tableSize);
    const value = this.hashTable.find((v, index) => index === hash);
    if (value !== '-') {
      return value[1];
    }
    return false;
  }

  // isEmpty() 비어있는 맵인지 Bool 결과를 리턴한다.
  isEmpty() {
    if (this.hashTable.find((value) => value !== '-') === undefined) {
      return true;
    }
    return false;
  }

  // keys() 전체 키 목록을 [String] 배열로 리턴한다.
  keys() {
    const keys = this.hashTable
      .filter((value) => value !== '-')
      .map((value) => value[0]);
    return keys;
  }

  // replace(String key, String value) 키-값으로 기존 값을 대체한다.
  replace(key, value) {
    const hash = this.doHash(key, this.tableSize);
    this.hashTable[hash] = value;
    return this.hashTable;
  }

  // size() 전체 아이템 개수를 리턴한다.
  size() {
    const itemSize = this.hashTable.filter((value) => value !== '-').length;
    return itemSize;
  }

  // clear() 전체 맵을 빈 값('-')을 가진 배열로 초기화.
  clear() {
    this.makeEmpty(this.hashTable, this.tableSize);
    return this.hashTable;
  }
}

function testCase() {
  const rosterLakers = new hashMap(10); // hashMap length: 10

  rosterLakers.put(7, 'Carmelo Anthony');
  rosterLakers.put(10, 'DeAndre Jordan');
  rosterLakers.put(11, 'Malik Monk');
  rosterLakers.put(1, 'Trevor Ariza');
  rosterLakers.put(31, 'Dwight Howard');
  rosterLakers.put(3, 'Anthony Davis');

  console.log(rosterLakers.hashTable);
  rosterLakers.remove(11);
  console.log(rosterLakers.hashTable);
  //rosterLakers.remove(3);

  // console.log(rosterLakers.containKey(7)); // false
  // console.log(rosterLakers.containKey(3)); // true

  // console.log(rosterLakers.get(11)); // Malik Monk
  // console.log(rosterLakers.keys()); // [ 10, 11, 3 ]

  // console.log(rosterLakers.isEmpty()); // false
  // console.log(rosterLakers.size()); // 3
  // console.log(rosterLakers.clear()); // ['-', '-',...]
}
testCase();
