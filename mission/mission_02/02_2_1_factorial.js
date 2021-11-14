'use-strict';

// **** 2-2-1. Factorial 함수 만들기 ****

//  1) 1~n 숫자 배열 생성
//  2) 팩토리얼 값을 담을 배열 생성
//  3) 팩토리얼 계산 -> 배열에 담아 반환

function doFactorial(n) {
  const initArr = [...Array(n)].map((v, index) => index + 1);
  const factorialArr = [];
  initArr.reduce((accumulator, curr) => {
    factorialArr.push(accumulator * curr);
    return accumulator * curr;
  }, 1);

  console.log(`1~${n}까지의 팩토리얼 값 반환 배열:`, factorialArr);
}

// testCase : 테스트
function testCase() {
  doFactorial(4);
}
testCase();
