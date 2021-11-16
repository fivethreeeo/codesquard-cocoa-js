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
      - 여기선 sort() 메서드 사용

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

// **** 점수 계산 프로그램 ****
class ScoreProgram {
  constructor() {
    this.scoreSet = {};
  }

  // 사용자 입력 추가
  enterScoreNode() {
    return new Promise((resolve) => {
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      // 입력 값 저장
      const inputSet = [];

      console.log('과목명, 점수를 입력해주세요. -> math, 80, 90, 70, ...');
      console.log('입력을 종료하시려면 "quit"를 입력해주세요.');

      rl.setPrompt('> ');
      rl.prompt();
      rl.on('line', function (line) {
        switch (line) {
          case 'quit':
            console.log('입력을 완료했습니다.');
            console.log(inputSet);
            rl.close();
          default:
            console.log('입력 내용: ', line);
            inputSet.push(`${line}`);
            console.log(inputSet);
            rl.prompt();
        }
      });
      rl.on('close', function () {
        process.exit();
      });

      resolve(inputSet);
    });
  }

  // 기존 데이터 추가
  enterScore(input) {
    const split = input.split(', ');
    const subjectName = split.splice(0, 1);
    this.scoreSet[subjectName] = split.map((score) => Number(score));
  }

  // 점수 개수
  getCount(subject) {
    const count = this.scoreSet[subject].length;

    return count;
  }

  // 평균
  getMean(subject) {
    const count = this.getCount(subject);
    const totalScore = this.scoreSet[subject].reduce((sum, curr) => sum + curr);
    const mean = (totalScore / count).toFixed(2);

    return mean;
  }

  // 편차
  getDeviation(subject) {
    const mean = this.getMean(subject);
    const scores = this.scoreSet[subject];
    const deviation = scores.map((score) => (score - mean).toFixed(2));

    return deviation;
  }

  // 분산(평균제곱)
  getDispersion(subject) {
    const count = this.getCount(subject);
    const deviation = this.getDeviation(subject);
    const disperson =
      deviation.reduce((sum, deviation) => deviation ** 2 + sum, 0) / count;

    return disperson;
  }

  // 표준편차
  getStandardDeviation(subject) {
    const disperson = this.getDispersion(subject);
    const standardDeviation = Math.sqrt(disperson);

    return standardDeviation;
  }

  // 오름차순 정렬
  sortScore(subject) {
    const result = this.scoreSet[subject].sort((a, b) => a - b);

    return result;
  }
}

function gogo() {
  const goScore = new ScoreProgram();
  goScore.enterScoreNode();
  goScore.enterScore(userInput1);
  goScore.enterScore(userInput2);
  console.log(goScore.scoreSet);
  console.log(`math 평균: ${goScore.getMean('math')}`);
  console.log(`math 표준편차: ${goScore.getStandardDeviation('math')}`);
  console.log(`physics 평균: ${goScore.getMean('physics')}`);
  console.log(`physics 표준편차: ${goScore.getStandardDeviation('physics')}`);
  console.log(`math 정렬: ${goScore.sortScore('math')}`);
  console.log(`physics 정렬: ${goScore.sortScore('physics')}`);
  console.log(goScore.scoreSet);
}

gogo();
