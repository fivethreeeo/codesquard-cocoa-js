/*
  20211101
  Day 01

  ** [미션] 다각형의 넓이 구하기 **

  1.다음처럼 동작하는 getArea함수를 만든다.
    - getArea 함수를 사용하면, 모든 넓이 값을 얻을 수 있다.

        getArea('circle', 10);
        > 원의 넓이 값출력
        getArea('rect', 10,15);
        > 사각형의 넓이값출력
        getArea('trapezoid', 10,15,12);
        > 사다리꼴의 넓이값출력
        getArea('circle', 1, n);
        > 반지름이 1부터 n까지 1씩 증가하면서, n개까지의 원의 넓이의 모든 합을 출력.

  2. printExecutionSequence 함수만들기.
    - 프로그래밍에서 로깅(logging)은 프로그램의 수행과정이나 결과를 기록하는 것을 말한다.
    - 지금까지 호출된 함수가 무엇인지 알려주는 printExecutionSequence함수를 만들자.

  3. printExecutionSequence 함수 수정
    - 수행순서 뿐 아니라, 함수의 결과까지 순서대로 같이 출력하는 기능을 만들어보자.


  ** [풀이] **
  - getArea() 을 통해서만 넓이 값을 구하는 것으로 한정. 예) getRect() 단일로 호출 x
  - 기능 별로 함수 최대한 쪼개기
  - 함수 선언으로만 작성
  - getArea() 호출 시 도형 오기입 안내 메시지
*/

'use-strict';

let logArr = []; // log를 모으는 배열

// Get Area
function getArea(shape, ...size) {
  switch (shape) {
    case 'rect':
      getRect(...size);
      break;
    case 'trapezoid':
      getTrapezoid(...size);
      break;
    case 'circle':
      getCircle(...size);
      break;
    default:
      console.log('도형을 정확하게 입력해주세요.');
      return false;
  }
  saveExecutionSequence(shape, result);
  return result;
}

// Rect
function getRect(width, height) {
  result = width * height;
  return result;
}

// Trapezoid
function getTrapezoid(shortBase, longBase, height) {
  result = ((shortBase + longBase) * height) / 2;
  return result;
}

// Single Circle or Sum Circles
function getCircle(radius1, radius2 = 'empty') {
  const PI = Math.PI;

  if (radius2 === 'empty') {
    // single
    result = radius1 * radius1 * PI;
  } else {
    // multiple
    result = 0;
    for (let i = radius1; i < radius2 + 1; i++) {
      result += i * i * PI;
    }
  }
  return result;
}

// Save Log
function saveExecutionSequence(shape, result) {
  logArr.push(`${shape}, ${result}`);
}

// Print Log
function printExecutionSequence() {
  const printLog = logArr.join(' / ');
  console.log(printLog);
}

function testCase() {
  logArr = [];
  getArea('circle', 0);
  getArea('circle', 1, 10);
  getArea('rect', 10, 20);
  getArea('trapezoid', 10, 20, 50);
  printExecutionSequence();
  console.log(logArr);
  return logArr;
}

testCase();
