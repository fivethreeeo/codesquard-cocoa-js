/*
==========================================================

** [미션 2-3 : 객체 다루기] **

  Q1. 숫자타입으로만 구성된 요소를 뽑아 배열만들기
    - 사용할 데이터 : https://gist.github.com/crongro/ade2c3f74417fc202c8097214c965f27

    > ["width", "height", "hOffset", "vOffset", "size", "hOffset", "vOffset"]


  Q2. type이 sk인, name으로 구성된 배열만 출력해본다.
  - 사용할 데이터 https://gist.github.com/crongro/a9a118977f82780441db664d6785efe3

    > ["Yong", "hary", "solvin", "hani", "chulsu"]

==========================================================
*/

'use-strict';

// **** Q1. 숫자타입으로만 구성된 요소를 뽑아 배열만들기 ****

//  1) 객체를 순환 -> value가 숫자타입이면 -> key를 result배열에 추가
//  2) value가 객체이면 -> 프로퍼티 짝으로 이루어진 배열을 만듬
//  3) 배열에서 1번 인덱스 값이 숫자타입이면 0번 인덱스 값을 result배열에 추가

const { missionData1 } = require('./data/missionData1');

function getNumberTypekeys(data) {
  const result = [];

  for (let key in data) {
    if (typeof data[key] === 'number') {
      result.push(key);
    } else if (typeof data[key] === 'object') {
      const entries = Object.entries(data[key]);
      entries.forEach((v, i) => {
        typeof v[1] === 'number' && result.push(v[0]);
      });
    }
  }
  console.log(`Q4. 객체에서 숫자타입 구성요소 뽑아 만든 배열: `, result);
}

// **** Q2. type이 sk인, name으로 구성된 배열만 출력해본다. ****
const { missionData2 } = require('./data/missionData2');
function getNameWithTypeSk(data) {
  console.log(data);
}

// testCase : 테스트
function testCase() {
  getNumberTypekeys(missionData1);
}
testCase();
