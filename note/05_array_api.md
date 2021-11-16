##### 최초작성일 : 2021. 8. 31.<br><br>

# Array APIs

[questions](#questions)  
[notes](#notes)  
[Reference](#reference)

<br><br>

## Questions

### Q1. make a string out of an array

```js
{
  const fruits = ['apple', 'banana', 'orange'];

  const answer = fruits.join();

  console.log(answer);
  // apple,banana,orange
}
```

<br>

### Q2. make an array out of a string

```js
{
  const fruits = '🍎, 🥝, 🍌, 🍒';

  const answer = fruits.split(',');

  console.log(answer);
  // [ '🍎', ' 🥝', ' 🍌', ' 🍒' ]
```

<br>

### Q3. make this array look like this: [5, 4, 3, 2, 1]

```js
{
  const array = [1, 2, 3, 4, 5];

  const answer = array.reverse();

  console.log(answer);
  // [5, 4, 3, 2, 1]
}
```

<br>

### Q4. make new array without the first two elements

```js
{
  const array = [1, 2, 3, 4, 5];

  const answer1 = array.splice(2, 3);

  console.log(answer1);
  // [ 3, 4, 5 ]

  console.log(array); // [1, 2] , 오리지널 배열에도 영향
}
```

```js
{
  const array = [1, 2, 3, 4, 5];

  const answer2 = array.slice(2);

  console.log(answer2);
  // [ 3, 4, 5 ]

  console.log(array); // [1, 2, 3, 4, 5] , 오리지널 배열에도 영향 X
}
```

<br>

### Q5 ~ Q11 Data

```js
class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}
const students = [
  new Student('A', 29, true, 45),
  new Student('B', 28, false, 80),
  new Student('C', 30, true, 90),
  new Student('D', 40, false, 66),
  new Student('E', 18, true, 88),
];
```

<br>

### Q5. find a student with the score 90

```js
{
  const answer = students.find((student) => student.score === 90);

  console.log(answer);
  // Student { name: 'C', age: 30, enrolled: true, score: 90 }
}
```

<br>

### Q6. make an array of enrolled students

```js
{
  const answer = students.filter((student) => student.enrolled === true);

  console.log(answer);
  // [
  //    Student { name: 'A', age: 29, enrolled: true, score: 45 },
  //    Student { name: 'C', age: 30, enrolled: true, score: 90 },
  //    Student { name: 'E', age: 18, enrolled: true, score: 88 }
  // ]
}
```

<br>

### Q7. make an array containing only the students' scores

```js
// result should be: [45, 80, 90, 66, 88]
{
  const answer = students.map((student) => student.score);

  console.log(answer);
  // [ 45, 80, 90, 66, 88 ]
}
```

<br>

### Q8. check if there is a student with the score lower than 50

```js
{
  const answer1 = students.some((student) => student.score < 50);

  console.log(answer1);
  // true; 50점 미만인 학생이 1명이라도 있으면 true
}
```

```js
{
  const answer2 = students.every((student) => student.score >= 50);

  console.log(answer2);
  // false; 50점 미만인 학생이 1명이라도 있으면 false.
}
```

<br>

### Q9. compute students' average score

```js
{
  const answer =
    students.reduce((sum, student) => sum + student.score, 0) / students.length;

  console.log(answer);
  // 73.8
}
```

<br>

### Q10. make a string containing all the scores

```js
// result should be: '45, 80, 90, 66, 88'
{
  const answer = students.map((student) => student.score).join(', ');

  console.log(answer);
  //45, 80, 90, 66, 88
}
```

<br>

### Q11. do Q10 sorted in ascending order

```js
// result should be: '45, 66, 80, 88, 90'
{
  const answer = students
    .map((student) => student.score)
    .sort((a, b) => a - b)
    .join(', ');

  console.log(answer);
  //45, 66, 80, 88, 90
}
```

<br><br>

## Notes

`join(separator?: string): string;`

- Adds all the elements of an array separated by the specified separator string.

<br>

`split(separator: string | RegExp, limit?: number): string[]`

- Split a string into substrings using the specified separator and return them as an array.

<br>

`reverse(): T[];`

- Reverses the elements in an array in place.
- This method mutates the array and returns a reference to the same array.

<br>

`splice(start: number, deleteCount?: number): T[];`

- Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

<br>

`splice(start: number, deleteCount: number, ...items: T[]): T[];`

- Inserts new elements at the start of an array, and returns the new length of the array.
  <br>

`slice(start?: number, end?: number): T[];`

- Returns a copy of a section of an array.
- For both start and end, a negative index can be used to indicate an offset from the end of the array.

<br>

`find(predicate: (value: number, index: number, obj: Int8Array) => boolean, thisArg?: any): number | undefined;`

- Returns the value of the first element in the array where predicate is true, and undefined
- immediately returns that element value. Otherwise, find returns undefined.
- true인 값을 반환, true인 값을 못찾았다면 undefined 반환

<br>

`filter(predicate: (value: number, index: number, array: Int8Array) => any, thisArg?: any): Int8Array;`

- Returns the elements of an array that meet the condition specified in a callback function.
- the predicate function one time for each element in the array.

<br>

`map(callbackfn: (value: number, index: number, array: Int8Array) => number, thisArg?: any): Int8Array;`

- Calls a defined callback function on each element of an array, and returns an array that contains the results.

<br>

`reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T, initialValue: T): T;`

<br>

`sort(compareFn?: (a: number, b: number) => number): this;`

- Sorts an array.
- `sort((a, b) => b - a)` => 반대로

<br><br>

---

### **Reference**

- [자바스크립트 기초 강의 (ES5+), 드림코딩 by 엘리](https://www.youtube.com/playlist?list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2)
