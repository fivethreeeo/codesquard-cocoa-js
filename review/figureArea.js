/*
  2021. 12. 18

  [프로그래밍 순서]
    1) 예외처리 -> 예외 시 메시지출력 & 종료
    2) 입력한 내용을 바탕으로 알맞은 figure를 구함. getFigure
    3) figured에 맞춰 알맞은 함수 호출. getRect, getCircle ...
    4) 실행된 figure를 로그 저장. saveExecution

  [예외처리]
    1) 도형 이름이 정확하지 않을 때
    2) 길이 값을 입력하지 않았을 때
    3) 길이 값이 자연수가 아닐 때

  [노트]
    1) 구조 변경
      - 이전 풀이는 사용자 입력이 circle일 경우, getCircle를 호출하고, getCircle 안에서 매개변수에 따라 getCircles를 또 호출하는 구조이다.
      - 이럴 경우, 메인 함수 getArea만 보고는 getCircles까지 가는 로직을 정확하게 이해하기 어렵다.
      - 중간에 사용자 입력에 맞춰 정확한 figure를 구하는 과정을 추가했다. 그리고 그 figure에 맞춰 필요한 함수를 바로 출력할 수 있도록 수정했다.
      - 메인 함수 getArea만 봐도 전체 구조를 더 잘 파악할 수 있도록 변경했다.

    2) 예외처리 추가
      - 기존보다 더 넓은 범위의 예외처리를 추가했다.

    3) switch문 -> if문 변경
      - 개인적으로 if문이 더 간결하고 가독성이 뛰어난 것 같아서 변경했다.
      - 문 안에서 특별한 로직이 있는게 아니라 한 줄짜리 간단한 식이라 {}, break, case 등을 더 써야하는 switch문이 더 복잡한 것 같다.
      - if문으로 한 줄로 간단하게 처리가 가능하다.

    4)
      - Math.PI
      - Math.pow(숫자, 제곱)
*/

const logs = [];

const getArea = (figureInput, ...values) => {
  if (!isValidArgs(figureInput, values)) return;

  const figure = getFigure(figureInput, values);
  let area;

  if (figure === 'rect') area = getRect(...values);
  if (figure === 'trapezoid') area = getTrapezoid(...values);
  if (figure === 'circle') area = getCircle(...values);
  if (figure === 'circles') area = getCircles(...values);

  saveExecution(figure);
  console.log(area);
};

const getFigure = (figure, values) => {
  if (figure === 'circle' && values.length > 1) return 'circles';
  return figure;
};

const getRect = (length1, length2) => length1 * length2;

const getTrapezoid = (top, bottom, height) => ((top + bottom) * height) / 2;

const getCircle = (radius) => Math.pow(radius, 2) * Math.PI;

const getCircles = (firstRadius, lastRadius) => {
  let total = 0;
  for (let i = firstRadius; i <= lastRadius; i++) {
    total += Math.pow(i, 2) * Math.PI;
  }
  return total;
};

const saveExecution = (figure) => logs.push(figure);

const printExecutionSequence = () => console.log(`계산수행순서: ${logs}`);

const isValidArgs = (figure, values) => {
  const figures = ['circle', 'rect', 'trapezoid'];

  if (!figures.includes(figure)) {
    console.log('도형의 이름을 바르게 입력하세요.');
    return false;
  }
  if (!values.length) {
    console.log('길이 값을 입력하세요.');
    return false;
  }
  if (
    values.some((value) => value <= 0) ||
    values.some((value) => value % 1 !== 0)
  ) {
    console.log('길이 값은 자연수를 입력하세요.');
    return false;
  }
  if (figure === 'circle' && values[0] > values[1]) {
    console.log('시작 반지름이 종료 반지름보다 클 수 없습니다.');
    return false;
  }

  return true;
};

getArea('rect', 10, 10);
getArea('trapezoid', 10, 15, 12);
getArea('circle', 10);
getArea('circle', 1, 10);
printExecutionSequence();
