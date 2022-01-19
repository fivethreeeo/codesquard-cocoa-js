/*
  2021. 12. 28

  [프로그래밍 순서]
    1) 예외처리 -> 에러 메시지 & 종료
    2) 팩토리얼 값을 구해야할 숫자들을 배열로 변환. factorials > numbers
    3) numbers의 숫자들을 순회하면서 팩토리얼 값으로 변환 해 배열에 push. factorials

  [예외처리]
    1) 자연수

  [노트]
  - same as : [...Array(num)].map((v, i) => i + 1);
*/

const factorials = (num) => {
  if (num <= 0) {
    console.log(`${num}, 자연수를 입력하세요.`);
    return;
  }

  const numbers = Array.from({ length: num }, (v, i) => i + 1);
  const factorials = [];
  numbers.reduce((acc, curr) => {
    const multiple = acc * curr;
    factorials.push(multiple);

    return multiple;
  }, 1);

  console.log(factorials);
};

factorials(10);
