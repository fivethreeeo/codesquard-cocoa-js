'use-strict';

// **** 2-2-4. 배열 만들기 ****
//
//  객체 순환
//  -> value가 숫자타입이면 -> key를 numberValue 배열에 추가
//  -> value가 객체타입이면 -> 1)함수를 다시 호출(재귀)
//  -> value가 숫자,객체가 아니면  -> 종료..

const { missionData1 } = require('./data/missionData1'); // Q1 데이터

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

// testCase : 테스트
function testCase() {
  getNumberElements(missionData1);
}
testCase();
