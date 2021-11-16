##### 최초작성일 : 2021. 11. 8.<br><br>

# 반복문 내에서의 함수 실행과 상수

[반복문 내부에서의 함수 실행](#반복문-내부에서의-함수-실행)  
[반복문 내부에서의 상수](#반복문-내부에서의-상수)

<br><br>

## 반복문 내부에서의 함수 실행

- `렉시컬 스코프`

  - 자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 함수를 어디에 정의했는지에 따라 상위 스코프를 결정한다.

```js
var funcs = [];
for (var i = 0; i < 10; i++) {
  funcs.push(function () {
    console.log(i);
  });
}
funcs.forEach(function (f) {
  f();
});

// --[실행 결과]--
//
// 10
```

- `funcs[0] ~[9]` 전부 -> `function () {console.log(i)}`
- for문 종료 후 `i = 10`
- 실행 컨택스트는 함수를 실행할 때 열린다.
- 따라서 forEach로 실행했을 때 `f()`가 실행, 실행 컨택스트가 열린다.
- `i`를 찾아서 `console.log(i)` 출력 된다.

</br>
</br>

- 위의 문제 해결 방법 1 : **`함수를 즉시 실행`**

```js
var funcs = [];
for (var i = 0; i < 10; i++) {
  funcs.push(
    (function (i) {
      return function () {
        console.log(i);
      };
    })(i)
  );
}
funcs.forEach(function (f) {
  f();
});
```

- i 값이 하나하나 살아있게 만들어줘야한다.
- 나중에 읽어오는게 아니라 처음부터 읽어서 넣어주면 된다.
- 함수를 반환하는 즉시 실행 함수를 만들어버린다.
- 클로저로 i를 들고있다가 즉시 실행 함수로 넘김

</br>
</br>

- 위의 문제 해결 방법 2 : **`let`**

```js
let funcs = [];
for (let i = 0; i < 10; i++) {
  funcs.push(function () {
    console.log(i);
  });
}
funcs.forEach(function (f) {
  f();
});
```

- let인 경우 블록 스코프가 생성.
- {} 마다 i 값을 별로도 가지고 있음.

</br>

## 반복문 내부에서의 상수

- `for in` 예외

```js
var obj = {
  prop1: 1,
  prop2: 2,
  prop3: 3,
};
for (const prop in obj) {
  // 내부 {} 이 계속 생성. {} 안의 const라 가능
  console.log(prop);
}

for (const i = 0; i < 5; i++) {
  // TypeError: Assignment to constant variable.
  console.log(i);
}
```

<br><br>

---

### **Reference**

- [Javascript ES6+ 제대로 알아보기 - 초급](https://www.inflearn.com/course/ecmascript-6-flow/)
