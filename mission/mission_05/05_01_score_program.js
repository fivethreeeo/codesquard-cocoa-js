'use strict';

/*
  - [o] 평균 구하기
  - [o] 표쥰편차 구하기
  - [o] 함수 재사용
  - [o] 객체 단위 프로그램
  - [x] 70-80점 사이의 비율 구하기
  - [x] 부동소수점 오류 해결

  - 표준편차 공식
    편차 = 개별 값 - 평균 값
    제곱합(ss) = 편차의 제곱 값들의 합
    평균제곱(ms) = 제곱합의 평균(분산)
    표쥰편차 = 평균제곱의 제곱근
*/

// 사용자 입력 값 -> '과목명, 점수 ...'
const userInput1 =
  'math, 89.23, 82.03, 71.56, 78.82, 85.05, 84.44, 67.53, 71.70, 77.97, 73.77, 84.25, 67.01, 73.78, 64.19, 89.89, 90.32, 73.21, 75.35, 83.22, 74.01';
const userInput2 =
  'physics, 80, 90, 60, 70, 50, 50, 80, 70, 70, 70, 80, 60, 70, 60, 80, 90, 70, 70, 80, 70';

// 점수 계산 프로그램
class ScoreProgram {
  constructor() {
    this.scoreSet = {};
  }

  // userInput(과목,점수)을 받아 scoreSet에 추가하기
  enterScore(input) {
    const split = input.split(', ');
    const subjectName = split.splice(0, 1);
    this.scoreSet[subjectName] = split.map((score) => Number(score));
  }

  // 과목 점수 개수 구하기
  getCount(subject) {
    return this.scoreSet[subject].length;
  }

  // 과목 점수 평균 구하기
  getMean(subject) {
    const count = this.getCount(subject);
    const totalScore = this.scoreSet[subject].reduce((sum, curr) => sum + curr);
    const mean = totalScore / count;

    return mean;
  }

  // 편차합 테스트 -> 편차합 = 0 인지
  isDeviationSum0(scores, mean) {
    const deviation = scores
      .map((score) => score - mean)
      .reduce((a, c) => a + c);

    return deviation ? true : false;
  }

  // 과목 점수 표준편차 구하기
  getStandardDeviation(subject) {
    const count = this.getCount(subject);
    const mean = this.getMean(subject);

    console.log(this.isDeviationSum0(this.scoreSet[subject], mean)); //편차합 = 0 ?

    const meanSquare = // 평균제곱
      this.scoreSet[subject].reduce(
        (sum, score) => (score - mean) ** 2 + sum,
        0
      ) / count;

    const standardDeviation = Math.sqrt(meanSquare);

    return standardDeviation;
  }
}

function testCase() {
  const scoreSet = {};
  enterScores1(userInput1, scoreSet);
  enterScores1(userInput2, scoreSet);
  console.log(scoreSet);
}

const goScore = new ScoreProgram();
goScore.enterScore(userInput1);
goScore.enterScore(userInput2);
console.log(goScore.scoreSet);
console.log(goScore.getMean('math'));
console.log(goScore.getStandardDeviation('math'));
console.log(goScore.getMean('physics'));
console.log(goScore.getStandardDeviation('physics'));
