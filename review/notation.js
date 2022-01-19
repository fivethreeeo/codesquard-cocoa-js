/*
  2021. 12. 19

  [프로그래밍 순서]
    1) 예외처리 -> 에러 메시지 & 종료
    2) 게임에서 말해야 할 총 숫자를 배열로 구함. totalNumbers
    3) totalNumbers의 숫자들을 n진수로 변환. convertedNumbers
    4) convertedNumbers를 한 글자씩 분리. allAnswers
    5) allAnswers에서 filter로 내 순서만 찾아 배열로 구함. myAnswer

  [예외처리]
    1) 변경할 진수가 2~16이 아닐 경우
    2) 내 차례 순번이 참가자 수 보다 클 경우

  [노트]
    1) 구조 변경
      - 스프레드 연산자로 기존 메소드, 함수 로직을 대체. split...
      - 기존 for문을 사용한 로직을 스프레드 연산자로 대체.
      - 가독성을 더 좋게 바꿈

    2)
      - parseInt(30, 8) // 8진수의 30을 10진수 숫자로 변환
      - (30).toString(2) // 10진수 숫자 30을 2진수 숫자로 변환
      - Array.prototype.keys()
        - 배열의 각 인덱스를 키 값으로 가지는 새로운 Array Iterator를 반환
        - 빈 인덱스를 무시하지 않음.
        - Iterator기 때문에 스프레드 연산자 사용 가능
        - Array.from()
      - Array.keys()
      - Object.keys()
      - const arr = Array.from({ length: totalCount }, (v, i) => i);
*/

const playNotationGame = (notation, numberCount, playerCount, myTurn) => {
  if (!isVaildArgs(notation, playerCount, myTurn)) return;

  const totalCount = numberCount * playerCount;
  const totalNumbers = [...Array(totalCount).keys()];
  const convertedNumbers = convertNumber(totalNumbers, notation);

  const allAnswers = [...convertedNumbers.join('')];
  const myAnswer = getPlayerAnswer(allAnswers, playerCount, myTurn);

  printResult(allAnswers, myAnswer);
};

const convertNumber = (numbers, notation) => numbers.map((number) => number.toString(notation));

const getPlayerAnswer = (allAnswers, playerCount, playerTurn) => {
  const playerFirstIndex = playerTurn - 1;
  return allAnswers.filter((n, index) => index % playerCount === playerFirstIndex);
};

const printResult = (allAnswers, myAnswer) =>
  console.log(`\nallAnswers: ${allAnswers}` + `\nmyAnswer: ${myAnswer}`);

const isVaildArgs = (notation, playerCount, myTurn) => {
  if (notation < 1 || notation > 17) {
    console.log('진수는 2~16 중에 입력하세요.');
    return false;
  }
  if (myTurn <= 0 || myTurn > playerCount) {
    console.log('내 차례가 올바르지 않습니다.');
    return false;
  }
  return true;
};

playNotationGame(2, 3, 3, 2);
