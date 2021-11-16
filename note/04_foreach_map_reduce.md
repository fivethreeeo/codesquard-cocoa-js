##### 최초작성일 : 2021. 11. 8.<br><br>

# forEach, map, reduce

[forEach](#foreach)  
[map](#map)  
[reduce](#reduce)

<br><br>

## forEach

- [MDN - Array.prototype.forEach](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- for문 돌리는 것과 같은 개념

<br>

`Array.prototype.forEach(callback[, thisArg])`

- `callback`: `function (currentValue[, index[, originalArray]])`
  - `currentValue`: 현재값
  - `index`: 현재 인덱스
  - `originalArray`: 원본 배열
- `thisArg`: this에 할당할 대상. 생략시 global객체

<br>

```js
const a = [1, 2, 3];
a.forEach(
  function (v, i, arr) {
    console.log(v, i, arr, this);
  },
  [10, 11, 12]
);

// 1 0 [1, 2, 3] [10, 11, 12]
// 2 1 [1, 2, 3] [10, 11, 12]
// 3 2 [1, 2, 3] [10, 11, 12]
```

```js
const a = [1, 2, 3];
a.forEach(
  function (v, i, arr) {
    console.log(this[i]);
  },
  [10, 11, 12]
);

// 10
// 11
// 12
```

<br><br>

## map

- [MDN - Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- for문을 돌려서 새로운 배열을 만드는 개념
- return 필수

<br>

`Array.prototype.map(callback[, thisArg])`

- `callback`: `function (currentValue[, index[, originalArray]])`
  - `currentValue`: 현재값
  - `index`: 현재 인덱스
  - `originalArray`: 원본 배열
- `thisArg`: this에 할당할 대상. 생략시 global객체

```js
const a = [1, 2, 3];
const b = a.map(
  function (v, i, arr) {
    console.log(v, i, arr, this);
    return this[0] + v;
  },
  [10]
);
console.log(b);

// 1 0 [1, 2, 3] [10]
// 2 1 [1, 2, 3] [10]
// 3 2 [1, 2, 3] [10]
// 11, 12, 13
```

<br><br>

## reduce

- [MDN - Array.prototype.reduce](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- for문을 돌려서 최종적으로 다른 무언가를 만드는 개념
- return 필수

`Array.prototype.reduce(callback[, initialValue])`

- `initialValue`: 초기값. 생략시 첫번째 인자가 자동 지정되며,
  이 경우 currentValue는 두번째 인자부터 배정된다.
- `callback`: `function (accumulator, currentValue[, currentIndex[, originalArray]])`

  - `accumulator`: 누적된 계산값
  - `currentValue`: 현재값
  - `currentIndex`: 현재 인덱스
  - `originalArray`: 원본 배열

```js
const arr = [1, 2, 3];
const res = arr.reduce(function (p, c, i, arr) {
  console.log(p, c, i, arr);
  return p + c;
}, 10);
console.log(res);
// 10 1 0 [1, 2, 3] -> 11
// 11 2 1 [1, 2, 3] -> 13
// 13 3 2 [1, 2, 3] -> 16
// [11, 13, 16]
```

```js
const arr = [1, 2, 3];
const res = arr.reduce(function (p, c, i) {
  console.log(p, c, i);
  return p + c;
});
console.log(res);

// 1 2 1 -> return 3
// 3 3 2 -> return 6
// 6
```

```js
const arr = [1, 2, 3, 4];
const str = arr.reduce(function (res, item, index, array) {
  return res + item;
}, '');
console.log(str); // 1234
```

```js
const arr = ['a', 'b', 'c', 'd'];
const str = arr.reduce(function (res, item, index, array) {
  return res + item;
});
console.log(str); // abcd
```

```js
const arr = [10, 20, 30, 40, 50];
const r = arr.reduce(function (p, c) {
  return p + c;
});
console.log(r); // 150
```

```js
const arr = [10, 20, 30, 40, 50];
const r = arr.reduce((p, c) => p + c);
console.log(r); // 150
```

<br><br>

---

### **Reference**

- [Javascript ES6+ 제대로 알아보기 - 초급](https://www.inflearn.com/course/ecmascript-6-flow/)
