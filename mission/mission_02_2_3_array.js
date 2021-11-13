'use-strict';

// **** 2-2-3. 평균 구하기 ****

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
  console.log(`각 학생의 평균 점수(반올림):`, averages);
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

  console.log(`모든 학생의 최고 점수의 평균 점수:`, average);
}

// testCase : 테스트
function testCase() {
  getAverageEachStudent(grades);
  getAverageEachBest(grades);
}
testCase();
