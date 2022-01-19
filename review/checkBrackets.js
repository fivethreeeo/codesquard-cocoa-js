/*
  2021. 12. 31

  [노트]
*/

{
  const data1 = '[1,2,[3,4,[5,[6]]]]';
  const data2 = '[1,2,[3,4,[5,[6]]]]]]';
  const data3 = '[[[[1,2,[3,4,[5,[6]]]]';

  const isValid = (stringData) => {
    const regOpen = /\[/g;
    const regClose = /\]/g;

    const countOpen = stringData.match(regOpen).length;
    const countClose = stringData.match(regClose).length;
    const diff = countOpen - countClose;

    if (diff === 0) {
      return true;
    }

    console.log(`Error: ${diff > 0 ? '여는' : '닫는'} 괄호가 ${Math.abs(diff)}개 더 많습니다.`);
    return false;
  };

  const parseData = (data) => {
    console.log(data.split(','));

    // [ 개수 체크하면서 중첩깊이 체크
    // ,로 요소 개수 체크
  };

  const run = (data) => (isValid(data) ? parseData(data) : 0);

  run(data1);
  run(data2);
  run(data3);
}
