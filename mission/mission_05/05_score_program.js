'use strict';

/*
  Check List

    - [o] 평균 구하기
    - [o] 표쥰편차 구하기
    - [o] 함수 재사용
    - [o] 객체 단위 프로그램
    - [x] 70-80점 사이의 비율 구하기

    - [o] 비동기 사용자 입력
    - [o] 과목별로 출력
    - [o] 퀵소트로 점수 정렬
      - 05_quick_sort.js에 퀵소트 구현
      - 여기선 sort() 메서드 사용

  - 표준편차 공식
    편차 = 개별 값 - 평균 값
    제곱합(ss) = 편차의 제곱 값들의 합
    평균제곱(ms) = 제곱합의 평균(분산)
    표쥰편차 = 평균제곱의 제곱근
*/

class ScoreProgram {
  constructor() {
    this.scoreSet = {};
  }

  enterScore(userInput) {
    userInput.forEach((input) => {
      const split = input.split(',');
      const subjectName = split.splice(0, 1);
      this.scoreSet[subjectName] = split.map((score) => Number(score));
    });
  }

  getCount(subject) {
    const count = this.scoreSet[subject].length;

    return count;
  }

  getMean(subject) {
    const count = this.getCount(subject);
    const totalScore = this.scoreSet[subject].reduce((sum, curr) => sum + curr);
    const mean = (totalScore / count).toFixed(2);

    return mean;
  }

  getDeviation(subject) {
    const mean = this.getMean(subject);
    const scores = this.scoreSet[subject];
    const deviation = scores.map((score) => (score - mean).toFixed(2));

    return deviation;
  }

  getDispersion(subject) {
    const count = this.getCount(subject);
    const deviation = this.getDeviation(subject);
    const disperson =
      deviation.reduce((sum, deviation) => Math.pow(deviation, 2) + sum, 0) /
      count;

    return disperson;
  }

  getStandardDeviation(subject) {
    const disperson = this.getDispersion(subject);
    const standardDeviation = Math.sqrt(disperson);

    return standardDeviation;
  }

  sortScore(subject) {
    const result = this.scoreSet[subject].sort((a, b) => a - b);

    return result;
  }
}

function testUserData() {
  const userData = [
    'math,89.23,82.03,71.56,78.82,85.05,84.44,67.53,71.70,77.97,73.77,84.25,67.01,73.78,64.19,89.89,90.32,73.21,75.35,83.22,74.01',
    'physics,80,90,60,70,50,50,80,70,70,70,80,60,70,60,80,90,70,70,80,70',
  ];

  const score = new ScoreProgram();
  console.log(`
testUserData-----------------------------------------------
`);
  score.enterScore(userData);
  console.log(`입력된 과목      : ${Object.keys(score.scoreSet)}`);
  console.log(`math 평균        : ${score.getMean('math')}`);
  console.log(`math 표준편차    : ${score.getStandardDeviation('math')}`);
  console.log(`math 정렬        : ${score.sortScore('math')}`);
  console.log(`physics 평균     : ${score.getMean('physics')}`);
  console.log(`physics 표준편차 : ${score.getStandardDeviation('physics')}`);
  console.log(`physics 정렬     : ${score.sortScore('physics')}`);
}
//testUserData();

function testNodeInput() {
  const score = new ScoreProgram();

  const doReadline = (printResult) => {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log(`
testNodeInput--------입력받기----------------------------------
`);
    console.log('과목명, 점수를 입력해주세요. 예시) math, 80, 90, 70, ...');
    console.log('입력을 종료하시려면 "quit"를 입력해주세요.');

    const lines = [];

    rl.on('line', function (line) {
      switch (line) {
        case 'quit':
          console.log('입력을 완료했습니다.');
          rl.close();
        default:
          lines.push(`${line}`);
      }
    });

    rl.on('close', function () {
      printResult(lines);
      process.exit();
    });
  };

  function calculateScore(lines) {
    score.enterScore(lines);
    console.log(`
testNodeInput--------결과출력----------------------------------
`);
    console.log(`입력된 과목      : ${Object.keys(score.scoreSet)}`);
    console.log(`math 평균        : ${score.getMean('math')}`);
    console.log(`math 표준편차    : ${score.getStandardDeviation('math')}`);
    console.log(`math 정렬        : ${score.sortScore('math')}`);
    console.log(`physics 평균     : ${score.getMean('physics')}`);
    console.log(`physics 표준편차 : ${score.getStandardDeviation('physics')}`);
    console.log(`physics 정렬     : ${score.sortScore('physics')}`);
  }

  doReadline(calculateScore);
}

testNodeInput();
// 두 줄 입력하기
// line1: math,89.23,82.03,71.56,78.82,85.05,84.44,67.53,71.70,77.97,73.77,84.25,67.01,73.78,64.19,89.89,90.32,73.21,75.35,83.22,74.01
// line2: physics,80,90,60,70,50,50,80,70,70,70,80,60,70,60,80,90,70,70,80,70
