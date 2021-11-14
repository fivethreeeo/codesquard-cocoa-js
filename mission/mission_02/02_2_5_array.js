'use-strict';

// **** 2-2-5. 배열 만들기 ****
//
//   최상단 배열의 내부 객체를 순회 (가장 상위 객체 1)
//   -> type: 'sk' 이면 -> name을 nameValue 배열에 추가
//   -> childnode 배열의 길이가 0 보다 클 때 -> 1)함수를 다시 호출(재귀))

const { missionData2 } = require('./data/missionData2'); // Q2 데이터

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

  console.log(`type이 sk인, name으로 구성된 배열: `, nameValue);
}

// testCase : 테스트
function testCase() {
  getNameWithTypeSk(missionData2);
}
testCase();
