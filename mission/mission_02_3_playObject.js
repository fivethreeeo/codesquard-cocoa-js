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

const { missionData1 } = require('./data/missionData1'); // Q1 데이터
const { missionData2 } = require('./data/missionData2'); // Q2 데이터

// **** Q1. 숫자타입으로만 구성된 요소를 뽑아 배열만들기 ****
//
//  1) 객체를 순환
//          -> value가 숫자타입이면 -> key를 numberValue 배열에 추가
//          -> value가 객체타입이면 -> 1)함수를 다시 호출(재귀)
//          -> value가 숫자,객체가 아니면  -> 종료..
//  2) 결과 출력

function getNumberElements(data) {
  const numberValue = [];

  // 객체 순회
  function iterateObj(obj) {
    for (let key in obj) {
      const value = obj[key];

      // value가 숫자이면 key를 배열에 푸시
      if (typeof value === 'number') numberValue.push(key);

      // value가 객체이면 다시 함수 호출 (재귀)
      const objectToString = Object.prototype.toString.call(value);
      if (objectToString === '[object Object]') iterateObj(value);
    }
  }
  iterateObj(data);

  console.log(`Q1. 객체에서 숫자타입 구성요소 뽑아 만든 배열: `, numberValue);
}

// **** Q2. type이 sk인, name으로 구성된 배열만들기 ****
//
//  1) 최상단 배열의 내부 객체를 순회 (가장 상위 객체 1)
//          -> type: 'sk' 이면 -> name을 nameValue 배열에 추가
//          -> childnode 배열의 길이가 0 보다 클 때 -> 1)함수를 다시 호출(재귀))
//  2) 결과 출력

function getNameWithTypeSk(data) {
  const nameValue = [];

  // 배열 순회
  function iterateArr(arr) {
    arr.forEach((obj) => {
      const { type, name, childnode } = obj;

      //type: 'sk' 이면 -> name을 nameValue 배열에 추가
      if (type === 'sk') nameValue.push(name);

      //childnode 배열의 길이가 0 보다 클 때 -> 1)함수를 다시 호출(재귀)
      if (childnode.length > 0) iterateArr(childnode);
    });
  }
  iterateArr(data);

  console.log(`Q2. type이 sk인, name으로 구성된 배열: `, nameValue);
}

// testCase : 테스트
function testCase() {
  getNumberElements(missionData1);
  getNameWithTypeSk(missionData2);
}
testCase();
