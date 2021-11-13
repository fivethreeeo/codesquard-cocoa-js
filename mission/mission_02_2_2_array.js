'use-strict';

// **** 2-2-2. 배열 거르기 ****

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
  console.log(`ver1 특수기호 Id 제거, 숫자 제거한 배열:`, numberChecked);
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

  console.log(`ver2 특수기호 Id 제거, 숫자 제거한 배열:`, numberChecked);
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

// testCase : 테스트
function testCase() {
  filterIdver1(peoples);
  filterIdver2(peoples);
}
testCase();
