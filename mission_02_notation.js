/*

** [미션 2] 진수 변환기 **

  mission(8, 4, 4, 3) // 8진수, 참가자당 숫자 4개 씩, 참가자 수 4명, 길동이 순서는 3번째

  > 2~16진수까지만 동작

  > 1. n진수로 변환된 숫자들을 출력 ex) 0,1,2,3,4,5,6,7,10,11,12,13,14,15,16,17
  > 2. 1에서 변환된 숫자들을 1자리씩 쪼개서 출력 ex) 0,1,2,3,4,5,6,7,1,0,1,1,1,2,1,3,1,4,1,5,1,6,1,7
  > 3. 2에서 길동이 차례에 어떤 숫자를 말해야 하는지 출력 ex) 2,6,1,1,1,1


** 프로그래밍 순서 **

  1.
  함수 만들기 playNotation(notation, count, playerNumber, gildongTurn) {}
  notation -> n진수
  totalCount = count * playerNumber -> 말할 총 숫자 개수
  gildongTurn -> 길동이 순서(숫자)

  2.
  0 ~ totalCount 순회 -> 숫자를 n진수로 변환
  변환된 숫자들의 배열 notationArray에 push

  3.
  notationArray의 숫자들을 1자리 씩 쪼개서
  allAnswer 배열에 추가

  4.
  allAnswer에서 gildong가 대답할 숫자들 찾기
  gildong의 차례의 대답을 gildongAnswer 배열에 추가

*/

'use-strict';

// playNotation() : 진수 변환기 + 길동이 차례 대답 찾기
function playNotation(notation, count, playerNumber, gildongTurn) {
  if (notation > 1 && notation < 17 === false) {
    console.log('2~16의 숫자를 입력하세요.');
    return;
  }

  const totalCount = count * playerNumber;
  const notationArray = doNotation(totalCount, notation);
  const allAnswer = makeAnswer(notationArray);
  const gildongAnswer = findPlayerAnswer(allAnswer, playerNumber, gildongTurn);
  const result = [
    notation, // 0
    totalCount, // 1
    playerNumber, // 2
    gildongTurn, // 3
    notationArray, // 4
    allAnswer, //5
    gildongAnswer, //6
  ];

  printResult(result);
}

// printResult() : playNotation()의 결과 값 출력.
function printResult(result) {
  console.log(
    `변환할 진수: ${result[0]} / 숫자 개수: ${result[1]} / 참가자 수: ${result[2]} / 길동's 순서: ${result[3]}`
  );
  console.log(`8진수 변환 : ${result[4]}`);
  console.log(`1자리씩 대답: ${result[5]}`);
  console.log(`길동이 차례 대답: ${result[6]}`);
}

// doNotation() : 0~count 숫자를 notation진수로 변환한 배열을 만듬
function doNotation(count, notation) {
  const result = [];
  for (let i = 0; i < count; i++) {
    const num = i.toString(notation);
    result.push(num);
  }
  return result;
}

// makeAnswer() : 받은 내용을 하나의 문자열로 만들고 그것을 다시 1자리씩 분리한 배열을 만듬
function makeAnswer(array) {
  return Array.from(array.join(''));
}

// findPlayerAnswer() : 전체 대답, 참가자 수, 특정 참가자의 차례를 받아서 특정 참가자의 대답을 찾아줌
function findPlayerAnswer(allAnswer, playerNumber, playerTurn) {
  const playerAnswer = [];
  const firstIndex = playerTurn - 1;
  const gap = playerNumber;

  for (let i = 0; i < allAnswer.length; i++) {
    const playerIndex = firstIndex + i * gap;
    const value = allAnswer[playerIndex];
    value && playerAnswer.push(value);
  }
  return playerAnswer;
}

// testCase : 테스트
function testCase() {
  playNotation(8, 4, 4, 3);
}
testCase();
