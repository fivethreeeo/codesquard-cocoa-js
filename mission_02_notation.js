/*
  ** [미션 2] 진수 변환기 **

  1.T개의 숫자까지 M명이 말한다고 할때 이를 모두 출력하는 프로그램을 만든다.

      solution(2,4,2) //2진수, 4개의 숫자까지, 2명이 말할때
      > ["0", "1", "1", "0", "1", "1", "1", "0", "0", "1", "0", "1", "1", "1", "0", "1", "1", "1"]

  2. 길동이 차례 숫자 맞추기
    - 홍길동의 차례에 어떤 숫자를 말해야 하는지를 알 수 있는 프로그램을 만든다.

  3. n진수까지 되는 프로그램
    - 2진수 뿐 아니라 16진수까지 동작하는 프로그램을 만든다.
    - 파라미터로 진법 n, 미리 구할 숫자의 갯수 t, 게임에 참가하는 인원 m, 길동이의 순서 p 가 주어진다.
*/

/*

순서도

1.
notation -> n진수
count * playerNumber -> 말할 총 숫자 개수
gildongTurn -> 길동이 순서(숫자)

2.
0 ~ totalCount 순회 -> 숫자를 n진수로 변환
변환된 숫자들의 배열 notationArray에 push

3.
notationArray의 숫자들을 1자리 씩 쪼개서
allAnswer 배열에 추가

4.
gildong의 차례 구하기
gildong의 차례의 대답을 gildongAnswer 배열에 추가
*/

'use-strict';

// 진수 변환기 + 길동이 차례 대답 찾기
function playNotation(notation, count, playerNumber, gildongTurn) {
  if (notation > 1 && notation < 17 === false) {
    console.log('2~16의 숫자를 입력하세요.');
    return;
  }

  const totalCount = count * playerNumber;
  const notationArray = doNotation(totalCount, notation); // 2
  const allAnswer = makeAnswer(notationArray); // 3

  // 4
  const gildongAnswer = findPlayerAnswer(allAnswer, playerNumber, gildongTurn);

  // print
  console.log(
    `변환할 진수: ${notation} / 숫자 개수: ${totalCount} / 참가자 수: ${playerNumber} / 길동's 순서: ${gildongTurn}`
  );
  console.log(`8진수 변환 : ${notationArray}`);
  console.log(`1자리씩 대답: ${allAnswer}`);
  console.log(`길동이 차례 대답: ${gildongAnswer}`);
}

// 0~count 숫자를 notation진수로 변환한 배열을 만듬
function doNotation(count, notation) {
  const result = [];
  for (let i = 0; i < count; i++) {
    const num = i.toString(notation);
    result.push(num);
  }
  return result;
}

// 받은 내용을 하나의 문자열로 만들고 그것을 다시 1자리씩 분리한 배열을 만듬
function makeAnswer(array) {
  return Array.from(array.join(''));
}

// 전체 대답, 참가자 수, 특정 참가자의 차례를 받아서 특정 참가자의 대답을 찾아줌
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

// testCase
function testCase() {
  playNotation(8, 4, 4, 3);
}
testCase();
