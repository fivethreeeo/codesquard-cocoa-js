// 2021. 12. 29

/*
  1. 배열 거르기
  - 전에는 숫자 검사를 할 때, 문자열을 전부 쪼갠 후 isNaN 체크 해서 숫자를 삭제했음
  - 정규표현식을 활용하자!
*/
{
  const peoples = ['crong!@#', 'honux5', 'sarah#', 'hea3d', 'zello', '5lucas'];

  const filterId = (array) => {
    const regexr = /[^A-Za-z0-9]/;
    const exceptSpecial = array.filter((value) => !regexr.test(value));
    const exceptNumber = exceptSpecial.map((value) => value.replace(/[0-9]/g, ''));
    return exceptNumber;
  };

  console.log(filterId(peoples));
}

/*
  2. 평균 구하기
  - 전에는 시작 전에 grades를 깊은 복사를 하고 복사된 값으로 풀이를 했는데 왜 그랬는지 잘 모르겠음.
  - 최대값 찾는 로직을 전에는 오름차순 sort -> 제일 끝에 값 반환 / 지금은 Math.max
  - 중복되는 부분을 함수화 -> getMean
*/
{
  const grades = [
    [88, 76, 77],
    [33, 44, 44],
    [90, 100, 94],
    [30, 44, 98],
  ];

  const getMean = (array) => array.reduce((a, c) => a + c) / array.length;

  const Allmean = grades.map((grade) => Math.round(getMean(grade)));

  const BestGrades = grades.map((grade) => Math.max(...grade));
  const BestGradeMean = getMean(BestGrades);

  console.log(Allmean);
  console.log(BestGradeMean);
}

/*
  3. 배열 만들기

  - 기본적인 로직은 이전 풀이랑 같았다. 숫자일 때 push, object일 때 재귀
  - 이번엔 type을 도출하는 함수를 따로 만들어서 사용함

  - 전에는 for...in문 -> 객체 순회
  - 이번엔 Object.entries -> 배열로 변환 후 순회

  - if문 대신 &&연산자 사용
  - 전에 어떻게 풀었는지 전혀 기억이 안났는데 비슷한 로직으로 풀어서 신기

*/
{
  const data = {
    debug: 'on',
    window: {
      title: 'Sample Konfabulator Widget',
      name: 'main_window',
      width: 500,
      height: 500,
    },
    image: {
      src: 'Images/Sun.png',
      name: 'sun1',
      hOffset: 250,
      vOffset: 250,
      alignment: 'center',
    },
    text: {
      data: 'Click Here',
      size: 36,
      style: 'bold',
      name: 'text1',
      hOffset: 250,
      vOffset: 100,
      alignment: 'center',
      onMouseUp: 'sun1.opacity = (sun1.opacity / 100) * 90;',
    },
  };

  const getType = (target) => Object.prototype.toString.call(target).slice(8, -1);

  const iterateData = (object, result) => {
    Object.entries(object).forEach((value) => {
      getType(value[1]) === 'Number' && result.push(value[0]);
      getType(value[1]) === 'Object' && iterateData(value[1], result);
    });

    return result;
  };

  console.log(iterateData(data, []));
}

/*
  4. 배열 결과 출력

  - 기본적인 로직은 이전 풀이랑 같았다. type:sk -> push, childnode에 값 있으면 -> 재귀
  - if문 대신 &&연산자 사용
  - 전에는 결과 배열을 함수의 최상단 변수로 빼서 작성했는데,
    이번엔 함수의 인자로 넣어서 리턴하게 함
*/

{
  const data = [
    {
      id: 1,
      name: 'Yong',
      phone: '010-0000-0000',
      type: 'sk',
      childnode: [
        {
          id: 11,
          name: 'echo',
          phone: '010-0000-1111',
          type: 'kt',
          childnode: [
            {
              id: 115,
              name: 'hary',
              phone: '211-1111-0000',
              type: 'sk',
              childnode: [
                {
                  id: 1159,
                  name: 'pobi',
                  phone: '010-444-000',
                  type: 'kt',
                  childnode: [
                    {
                      id: 11592,
                      name: 'cherry',
                      phone: '111-222-0000',
                      type: 'lg',
                      childnode: [],
                    },
                    {
                      id: 11595,
                      name: 'solvin',
                      phone: '010-000-3333',
                      type: 'sk',
                      childnode: [],
                    },
                  ],
                },
              ],
            },
            {
              id: 116,
              name: 'kim',
              phone: '444-111-0200',
              type: 'kt',
              childnode: [
                {
                  id: 1168,
                  name: 'hani',
                  phone: '010-222-0000',
                  type: 'sk',
                  childnode: [
                    {
                      id: 11689,
                      name: 'ho',
                      phone: '010-000-0000',
                      type: 'kt',
                      childnode: [
                        {
                          id: 116890,
                          name: 'wonsuk',
                          phone: '010-000-0000',
                          type: 'kt',
                          childnode: [],
                        },
                        {
                          id: 1168901,
                          name: 'chulsu',
                          phone: '010-0000-0000',
                          type: 'sk',
                          childnode: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 117,
              name: 'hong',
              phone: '010-0000-0000',
              type: 'lg',
              childnode: [],
            },
          ],
        },
      ],
    },
  ];

  const iterateData = (data, result) => {
    data.forEach((obj) => {
      const { type, name, childnode } = obj;

      type === 'sk' && result.push(name);
      childnode.length !== 0 && iterateData(childnode, result);
    });

    return result;
  };

  console.log(iterateData(data, []));
}
