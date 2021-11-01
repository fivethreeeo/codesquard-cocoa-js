/*

  ==============================
  20211101
  Day 01
  ==============================

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
    getCircle()
    getCircle()
    getArea('circle',2)
    getArea('rect',2,3)
    printExecutionSequence()  //printExecutionSequence가 불려지면, 함수 호출된 순서를 출력한다.
    > 계산수행순서 : circle, circle, circle, rect

  3. printExecutionSequence 함수 수정
    - 수행순서 뿐 아니라, 함수의 결과까지 순서대로 같이 출력하는 기능을 만들어보자.

  ==============================

  ** 고민 **

  1. switch문과 if문 중 뭐가 더 좋은 코드인지.
  2. saveExecutionSequence 함수를 getArea에 넣으면 훨씬 간결해지는데, 이럴 경우 getTrapezoid, getCircle, getRect 함수를 직접 호출했을 때 log가 저장이 안됨
  3. 학습 포인트에 늘 동일한 입력값에 동일한 출력을 보장해야한다고 함. saveExecutionSequence, printExecutionSequence 함수의 return값을 꼭 지정해야하나..?

*/

'use-strict';

let logArr = []; // log를 모으는 배열

// Get Area
function getArea(shape, ...size) {
  result = 0;
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
  return result;
}

// Rect
function getRect(width, height) {
  result = width * height;
  saveExecutionSequence('rect', result);
  return result;
}

// Trapezoid
function getTrapezoid(shortBase, longBase, height) {
  result = ((shortBase + longBase) * height) / 2;
  saveExecutionSequence('trapezoid', result);
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
    for (let i = radius1; i < radius2 + 1; i++) {
      result += i * i * PI;
    }
  }
  saveExecutionSequence('circle', result);
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
  getCircle();
  getCircle();
  getArea('circle', 2);
  getArea('rect', 2, 3);
  getArea('trapezoid', 20, 30, 10);
  getArea('circle', 1, 10);
  printExecutionSequence();
}

testCase();
