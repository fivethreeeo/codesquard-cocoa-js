'use-strict';

// **** Q1. doFactorial(n): 1 ~ n까지의 factorial값을 배열로 반환 ****

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

  console.log(`Q1. 1~${n}까지의 팩토리얼 값 반환 배열:`, factorialArr);
}

// **** Q2. filterId() : 조건에 만족하는 id로 변환한 배열 반환 (특수기호Id x,숫자 x, 2버전) ****

//  1) peoples 배열을 순회 -> 특수문자 포함 여부 체크 -> 특수문자 포함 요소 제거
//  2) 특수문자 제거된 배열을 순회 -> 요소를 word단위로 분리
//     -> word가 숫자면 word 제거 -> 요소로 합침 -> 배열에 담아 반환

const peoples = ['crong!@#', 'honux5', 'sarah#', 'hea3d', 'zello', '5lucas'];

// ver1 - 고차함수 사용
function filterIdver1(peoples) {
  const specialChecked = peoples.filter((people) => !checkSpecial(people));
  const numberChecked = [];
  specialChecked.forEach((people) => {
    people = Array.from(people)
      .filter((word) => !checkNumber(word))
      .join('');
    numberChecked.push(people);
  });
  console.log(`Q2. ver1 특수기호 Id 제거, 숫자 제거한 배열:`, numberChecked);
}

// ver2 - for문 사용
function filterIdver2(peoples) {
  const specialChecked = [];
  for (i = 0; i < peoples.length; i++) {
    checkSpecial(peoples[i]) || specialChecked.push(peoples[i]);
  }

  const numberChecked = [];
  for (i = 0; i < specialChecked.length; i++) {
    const separateWords = Array.from(specialChecked[i]);
    let stringWords = [];

    for (k = 0; k < separateWords.length; k++) {
      checkNumber(separateWords[k]) || stringWords.push(separateWords[k]);
    }
    numberChecked.push(stringWords.join(''));
  }

  console.log(`Q2. ver2 특수기호 Id 제거, 숫자 제거한 배열:`, numberChecked);
}

// 특수 기호 체크
function checkSpecial(str) {
  const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  if (!special_pattern.test(str)) {
    return false;
  }
  return true;
}

// 숫자 체크
function checkNumber(str) {
  // 숫자면 true
  if (!isNaN(str)) {
    return true;
  }
  // 숫자가 아니면 false
  return false;
}

// **** Q3. 각 학생의 평균점수(1), 모든 학생의 최고 점수의 평균 점수(2) 구하기 ****

const grades = [
  [88, 76, 77],
  [33, 44, 44],
  [90, 100, 94],
  [30, 44, 98],
];

// (1) 각 학생의 평균점수 구하기
function getAverageEachStudent(grades) {
  const _grades = JSON.parse(JSON.stringify(grades));

  const averages = _grades.map((scores) => {
    let average = scores.reduce((a, b) => a + b) / scores.length;
    return Math.round(average * 10) / 10;
  });
  console.log(`Q3. 각 학생의 평균 점수(반올림):`, averages);
}

// (2) 모든 학생의 최고 점수의 평균 구하기
function getAverageEachBest(grades) {
  const _grades = JSON.parse(JSON.stringify(grades));

  const bestScores = _grades.map((scores) => {
    return scores
      .sort((a, b) => b - a)
      .slice(0, 1)
      .toString();
  });

  const average =
    bestScores.reduce((a, b) => Number(a) + Number(b)) / bestScores.length;

  console.log(`Q3. 모든 학생의 최고 점수의 평균 점수:`, average);
}

// **** Q4. myReduce메서드 만들기 ****

// testCase : 테스트
function testCase() {
  doFactorial(4);
  filterIdver1(peoples);
  filterIdver2(peoples);
  getAverageEachStudent(grades);
  getAverageEachBest(grades);
}
testCase();
