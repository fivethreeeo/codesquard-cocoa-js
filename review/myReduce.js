/*
  2021. 12. 28

  - 코코아 과정에서 우선순위에 밀려 풀어보지 못했음

  [노트]
  - 초깃값, 현재값, 인덱스, 배열 4가지 인자를 정확하게 반환해야하는데
    초깃값 부여 여부에 따라 로직이 조금 바뀌는 부분에서 forEach로 한 번에 만들어보려고 많은 고민을 했음.

  - 하지만 안되서 초깃값 여부로 나눠서 로직을 만듬.
*/

const myReduce = (array, callback, initialValue) => {
  if (initialValue) {
    array.forEach((value, index) => {
      initialValue = callback(initialValue, value, index, array);
    });
  }

  if (!initialValue) {
    initialValue = array[0];
    for (let index = 1; index < array.length; index++) {
      initialValue = callback(initialValue, array[index], index, array);
    }
  }

  return initialValue;
};

numbers = [1, 2, 3, 4, 5];

const result1 = numbers.reduce((acc, curr) => acc + curr);
const result2 = myReduce(numbers, (acc, curr) => acc + curr);

const result3 = numbers.reduce((acc, curr) => acc * curr);
const result4 = myReduce(numbers, (acc, curr) => acc * curr);

const result5 = numbers.reduce((acc, curr) => acc + curr, 10);
const result6 = myReduce(numbers, (acc, curr) => acc + curr, 10);

console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);
console.log(result5);
console.log(result6);
