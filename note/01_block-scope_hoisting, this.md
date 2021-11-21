##### 최초작성일 : 2021. 11. 8.<br><br>

# Block Scope, Hoisting

[Statement vs Expression](#statement-vs-expression)  
[Scope, Function Scope, Block Scope 개념](#scope-function-scope-block-scope-개념)  
[var vs let, const](#var-vs-let-const)  
[let, const 또한 hoisting 한다, TDZ](#let-const-또한-hoisting-한다-tdz)  
[this](#this)

<br><br>

## Statement vs Expression

- 모든 데이터는 셋 중 하나 -> `값, 식, 문`
- `값`과 `식`은 동일한 것으로 간주

- **statement**

  - 문. if문, for문, while문, switch-case문 등
  - 문 자체가 하나의 `block-scope`
  - 결과 리턴 x, 그 안의 구문을 실행하고 끝이다.

- **expression**

  - 식. 값이 될 수 있는 경우
  - 값으로 표현
  - `(10+20)`
  - `'abc' + 'def'`

</br>

## Scope, Function Scope, Block Scope 개념

**Scope :**

- 범위, 유효공간, 허용공간, 허용범위 등...

</br>

**Function Scope :**

- 함수에 의해서 생기는 변수의 유효 범위 -> `var`
- es5까지는 함수에 의해서만 변수의 유효 범위 생성이 가능했다.

</br>

**Block Scope :**

- Block에 의해 생기는 변수의 유효범위 -> `let, const`
- { } 에 의해서 변수의 유효범위가 결정된다.
- 자신의 범위에 없으면 그 위의 범위에서 찾는다.
- 선언된 적이 없는 변수를 참조하려고 할 때 `ReferenceError` 발생한다.

</br>
</br>

```js
// 'let' in Block Scope
// 'let' 변수의 유효범위가 블록 스코프로 제한 된다.

{
  let a = 10;
  {
    let a = 20;
    console.log(a); // 20
  }
  console.log(a); // 10
}
console.log(a); // ReferenceError: a is not defined
```

```js
// 'var' in Function Scope
// 'var' 변수의 유효범위가 함수 스코프로 제한 된다.

(function () {
  var a = 10;
  (function () {
    var a = 20;
    console.log(a); // 20
  })();
  console.log(a); // 10
})();
console.log(a); // ReferenceError: a is not defined
```

</br>

## `var` vs `let, const`

- var는 블록 스코프에 영향을 받지 않는다.

```js
function hasValue(p) {
  console.log(v); // undefined (var hoisting & assignment 'undefined')
  if (p) {
    var v = 'blue';
    console.log(v); // blue
  } else {
    var v = 'red';
    console.log(v);
  }
  console.log(v); // blue
}
hasValue(10);
```

```js
function hasValue(p) {
  console.log(v); // ReferenceError: v is not defined
  if (p) {
    let v = 'blue';
    console.log(v); // blue
  } else {
    let v = 'red';
    console.log(v);
  }
  console.log(v); // ReferenceError: v is not defined
}
hasValue(10);
```

</br>

## `let`, `const` 또한 `hoisting` 한다, TDZ

- let, const는 블록 스코프 내에서 호이스팅한다.
- 변수 선언을 호이스팅 하지만 어떠한 값도 할당하지 않는다.
- 호이스팅?
  - var : 변수명만 위로 끌어올리고 / undefined를 할당한다.
  - let, const : 변수명만 위로 끌어올리고 / 끝. 값 할당x
  - 결국 -> var, let, const 다 호이스팅 한다.

```js
if (true) {
  let a = 10;
  if (true) {
    console.log(a); // ReferenceError: Cannot access 'a' before initialization
    const a = 20;
  }
  console.log(a); // 10
}
console.log(a); // ReferenceError: a is not defined

// 'const a = 20'이 호이스팅이 안된다면,
// 상위 스코프의 'let a = 10'을 받아와 10을 출력해야 한다.

// 스코프 상관없이 전부 호이스팅이 됐다면,
// let a , const a가 중복되어
// Uncaught SyntaxError: Identifier 'a' has already been declared 가 나왔어야 함.

// 하지만 -> ReferenceError: Cannot access 'a' before initialization
// 블록 스코프 범위에서 const a 가 호이스팅이 됐지만, 어떠한 값도 할당하지 않았기에 위의 에러가 난다.
```

> TDZ: 임시사각지대
>
> - let 또는 const로 변수를 선언한 위치에 오기 전까지는 이 변수를 호출할 수 없다.
> - 그 영역을 TDZ라고 한다.
> - 위의 예제에서는 console.log(a) 와 const a = 20 사이가 TDZ 다.

</br>

## this

- this가 가리키는 건 그때그때 다르다.

```js
var value = 0;
var obj = {
  value: 1,
  setValue: function () {
    this.value = 2; // this: obj
    (function () {
      this.value = 3; //this: window(브라우저) / 그냥 단순 함수를 실행한 것일 뿐 / 전역 value = 3
    })();
  },
};
obj.setValue();
console.log(value); // 3
console.log(obj.value); // 2
// console.log(global.value); // node 환경에서 this가 가리키는 객체
```

</br>

- 위의 문제를 해결하기 위한 방법 1 : `this를 변수에 할당`

```js
var value = 0;
var obj = {
  value: 1,
  setValue: function () {
    var self = this; // this: obj -> self: obj
    self.value = 2;
    (function () {
      self.value = 3; // self: obj
    })();
  },
};
obj.setValue();
console.log(value); // 0
console.log(obj.value); // 3
```

</br>

- 위의 문제를 해결하기 위한 방법 2 : `call(this)`
- 함수를 실행하기 전에 미리 this를 정해서 넘겨줌

```js
var value = 0;
var obj = {
  value: 1,
  setValue: function () {
    this.value = 2;
    (function () {
      this.value = 3;
    }.call(this)); // a 함수를 실행할 때 this는 얘로 해라
  },
};
obj.setValue();
console.log(value); // 0
console.log(obj.value); // 3
```

</br>

- 위의 문제를 해결하기 위한 방법 3 : `블록 스코프 { }`
- 블록 스코프의 this는 상위 스코프의 this를 그대로 쓴다.
- 블록 스코프는 this 바인딩을 하지 않는다.

```js
let value = 0;
let obj = {
  value: 1,
  setValue: function () {
    this.value = 2;
    {
      this.value = 3;
    }
  },
};
obj.setValue();
console.log(value); // 0
console.log(obj.value); // 3
```

<br><br>

---

### **Reference**

- [Javascript ES6+ 제대로 알아보기 - 초급](https://www.inflearn.com/course/ecmascript-6-flow/)
