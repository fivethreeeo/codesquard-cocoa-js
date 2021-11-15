'use strict';

/*
  Check List

    - [o] 평균 구하기
    - [o] 표쥰편차 구하기
    - [o] 함수 재사용
    - [o] 객체 단위 프로그램
    - [x] 70-80점 사이의 비율 구하기

    - [x] 비동기 사용자 입력
    - [o] 과목별로 출력
    - [o] 퀵소트로 점수 정렬
      - 05_quick_sort.js에 퀵소트 구현
      - 여기선 sort() 메서드 사용 (실제로 퀵소트 알고리즘으로 동작)

  - 표준편차 공식
    편차 = 개별 값 - 평균 값
    제곱합(ss) = 편차의 제곱 값들의 합
    평균제곱(ms) = 제곱합의 평균(분산)
    표쥰편차 = 평균제곱의 제곱근
*/

// 사용자 입력 값
const userInput1 =
  'math, 89.23, 82.03, 71.56, 78.82, 85.05, 84.44, 67.53, 71.70, 77.97, 73.77, 84.25, 67.01, 73.78, 64.19, 89.89, 90.32, 73.21, 75.35, 83.22, 74.01';
const userInput2 =
  'physics, 80, 90, 60, 70, 50, 50, 80, 70, 70, 70, 80, 60, 70, 60, 80, 90, 70, 70, 80, 70';

// 클래스 : 점수 계산 프로그램
class ScoreProgram {
  constructor() {
    this.scoreSet = {};
  }

  // ** node.js로 userInput(과목,점수)을 받아 scoreSet에 추가하기
  enterScoreNode() {
    const readline = require('readline');
    const std = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    std
      .on('line', (line) => {
        console.log(line);
        std.close();
      })
      .on('close', () => process.exit());
  }

  // ** userInput(과목,점수)을 받아 scoreSet에 추가하기
  enterScore(input) {
    const split = input.split(', ');
    const subjectName = split.splice(0, 1);
    this.scoreSet[subjectName] = split.map((score) => Number(score));
  }

  // ** 편차합이 0인지 확인하기
  isDeviationSum0(scores, mean) {
    const deviationSum = scores
      .map((score) => score - mean)
      .reduce((a, c) => a + c);

    if (!deviationSum) {
      return true; // 0
    }
    return false; // 0 아님
  }

  // ** 과목 점수 개수 구하기
  getCount(subject) {
    return this.scoreSet[subject].length;
  }

  // ** 과목 점수 평균 구하기
  getMean(subject) {
    const count = this.getCount(subject);
    const totalScore = this.scoreSet[subject].reduce((sum, curr) => sum + curr);
    const mean = (totalScore / count).toFixed(2);

    return mean;
  }

  // ** 과목 점수 표준편차 구하기
  getStandardDeviation(subject) {
    const count = this.getCount(subject);
    const mean = this.getMean(subject);
    const scores = this.scoreSet[subject];

    // 평균 제곱 = 제곱합의 평균
    const meanSquare =
      scores.reduce((sum, score) => (score - mean) ** 2 + sum, 0) / count;

    // 표준 편차
    const standardDeviation = Math.sqrt(meanSquare);

    return standardDeviation;
  }

  // ** 과목 점수 정렬하기(오름차순)
  sortScore(subject) {
    const result = this.scoreSet[subject].sort((a, b) => a - b);
    return result;
  }
}

function gogo() {
  const goScore = new ScoreProgram();
  goScore.enterScore(userInput1);
  goScore.enterScore(userInput2);
  console.log(goScore.scoreSet);
  console.log(`math 평균: ${goScore.getMean('math')}`);
  console.log(`math 표준편차: ${goScore.getStandardDeviation('math')}`);
  console.log(`math 정렬(오름차순): ${goScore.sortScore('math')}`);
  console.log(`physics 평균: ${goScore.getMean('physics')}`);
  console.log(`physics 표준편차: ${goScore.getStandardDeviation('physics')}`);
  console.log(`physics 정렬(오름차순): ${goScore.sortScore('physics')}`);
}

gogo();
