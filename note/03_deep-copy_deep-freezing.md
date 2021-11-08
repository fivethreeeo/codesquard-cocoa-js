##### 최초작성일 : 2021. 11. 8.<br><br>

# Deep Freeze, Deep Copy, 깊은 복사, 얕은 복사

[참조타입 데이터를 immutuble하게 만드는 방법](#참조타입-데이터를-immutuble하게-만드는-방법)  
[Deep Freezing, Deep Copy](#deep-freezing--deep-copy)  
[완벽한 깊은 복사](#완벽한-깊은-복사)

<br><br>

## `const`

- constant variable: 상수 변수
  - 모순인데 모순이 아니다.
  - 어떤 값이 상수다 -> 애초부터 상수가 아니라 값을 지정한 이후부터 상수다.

</br>

## 참조타입 데이터를 immutuble하게 만드는 방법

- `Object.freeze()`, `Object.defineProperty()`

```js
const OBJ = {
  prop1: 1,
  prop2: 2,
};
OBJ.prop1 = 3;
console.log(OBJ.prop1); // 3
OBJ = 10; // TypeError: Assignment to constant variable.
```

- OBJ 자체에 접근한게 아닌 내부 프로퍼티에 접근한 것
- 프로퍼티는 OBJ와는 별개의 공간에 저장되어 있음
- 참조형 데이터를 상수변수에 할당할 경우 내부 프로퍼티는 상수가 아니다.

</br>

- 해결방안 1 : `Object.defineProperty()`

```js
const OBJ1 = {};
Object.defineProperty(OBJ1, 'prop1', {
  value: 1,
  writable: false,
  configurable: false,
});
OBJ1.prop1 = 2; // 재할당이 안되지만 무시하고 넘어감
OBJ1.prop2 = 222; // prop1만 immutuble된 상태라서 할당 가능
console.log(OBJ1); // { prop2: 222, prop1: 1 }
console.log(OBJ1.prop1); // 1
```

</br>

- 해결방안 2 : `Object.freeze()`

```js
const OBJ2 = {
  prop1: 1,
};
console.log(OBJ2); // { prop1: 2 }

Object.freeze(OBJ2);

OBJ2.prop2 = 22; // 새로은 프로퍼티 생성이 안되지만 무시하고 넘어감.
OBJ2.prop1 = 3; // 재할당이 안되지만 무시하고 넘어감.
console.log(OBJ2); // { prop1: 2 }
```

</br>

- 여전히 남는 문제 : `nested Object의 경우...`

```js
const OBJ = {
  prop1: 1,
  prop2: [2, 3, 4],
  prop3: { a: 1, b: 2 },
};
Object.freeze(OBJ); // depth1 으로 freeze
OBJ.prop1 = 3; // 재할당 안됌
OBJ.prop2.push(5); // 가능
OBJ.prop3.b = 3; // 가능

console.log(OBJ);
// {
//   prop1: 1,
//   prop2: [ 2, 3, 4, 5 ],
//   prop3: { a: 1, b: 3 }
// }

Object.freeze(OBJ.prop2); // prop2를 freeze
OBJ.prop2.push(6); // TypeError: Cannot add property 4, object is not extensible
console.log(OBJ);
// {
//   prop1: 1,
//   prop2: [ 2, 3, 4, 5 ],
//   prop3: { a: 1, b: 3 }
// }
```

<br>

## Deep Freezing & Deep Copy

- `Deep Freezing`

  1. Obj 자체를 얼린다.
  2. Obj 내부의 프로퍼티를 순회하면서, 혹시 참조형이면, 1)반복 -> 재귀

- `Deep Copy`

  1. Obj의 프로퍼티들을 복사 (depth 1단계)
  2. Obj의 프로퍼티를 순회하면서, 혹시 참조형이면, 1)반복 -> 재귀

- 깊은 복사를 해야만 `immutable` 하다.

```js
var a = {
  a: 1,
  b: [1, 2, 3],
  c: { d: 1, e: 2 },
};

var b = Object.assign({}, a); // 얉은 복사
b.c = Object.assign({}, a.c); // 깊은 복사
b.a = 22;
b.b[0] = 11; // 같은 메모리를 참조하는 중임
b.c.d = 11; // 다른 메모리를 참조
console.log(a); // { a: 1, b: [ 11, 2, 3 ], c: { d: 1, e: 2 } }
console.log(b); // { a: 22, b: [ 11, 2, 3 ], c: { d: 1, e: 2 } }
```

- `Object.assign()` , `spread Operation` 은 depth1 까지만 깊은 복사를 한다.

<br>

## 완벽한 깊은 복사

1. 재귀적으로 깊은 복사를 수행

2. `Lodash`의 `cloneDeep` 함수 사용

   - 자바스크립트 고차함수 집합 및 함수형 라이브러리이다.
   - Lodash의 cloneDeep 함수를 사용하면, 완벽하게 깊은 복사를 할 수 있다.

3. `JSON.parse()`, `JSON.stringify()` 함수 사용

   - JSON.stringify 함수를 이용해서, Object 전체를 문자열로 변환 후, 다시 JSON.parse 함수를 이용해서 문자열을 Object 형태로 변환한다.
   - 그러면 문자열로 변환하는 순간 참조 값이 끊기기 때문에 새로운 Object로 만들어 사용할 수 있다.
   - 하지만 JSON 함수는 엄청나게 리소스를 잡아먹는 함수인 만큼, 성능이 좋지 않은 부분을 고려해야 한다.

<br><br>

---

### **Reference**

- [Javascript ES6+ 제대로 알아보기 - 초급](https://www.inflearn.com/course/ecmascript-6-flow/)
- https://webisfree.com/2020-02-17/[%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8]-%EA%B0%9D%EC%B2%B4%EB%A5%BC-%EC%83%88%EB%A1%9C%EC%9A%B4-%EA%B0%9D%EC%B2%B4%EB%A1%9C-%EB%B3%B5%EC%82%AC-clone%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95
