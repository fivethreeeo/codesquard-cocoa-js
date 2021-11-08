##### 최초작성일 : 2021. 11. 8.<br><br>

# Block Scope

[Scope, Function Scope, Block Scope](#scope-function-scope-block-scope)

<br><br>

## **Scope, Function Scope, Block Scope**

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

</br>

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

### var vs let, const

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
  console.log(v); // v is not defined
  if (p) {
    let v = 'blue';
    console.log(v); // blue
  } else {
    let v = 'red';
    console.log(v);
  }
  console.log(v); // v is not defined
}
hasValue(10);
```

## 1-2. 상세

### 1) 블록 스코프는 let, const에 대해서만.

```js
console.log(a); // undifined
if (true) {
  var a = 10;
  if (true) {
    var a = 20;
    console.log(a); // 20
  }
  console.log(a); // 20
}
console.log(a); // 20
```

```js
console.log(a); // ReferenceError: a is not defined
if (true) {
  let a = 10;
  if (true) {
    const a = 20;
    console.log(a); // 20
  }
  console.log(a); // 10
}
console.log(a); // ReferenceError: a is not defined

// const가 호이스팅이 안된다면, 10 출력해야함
// ReferenceError: Cannot access 'a' before initialization
// const a 가 호이스팅이 됐지만, undifined를 할당하지 않았기에 위의 에러가 나타난다.
```

### 2) Hoisting ?

모든 데이터는 셋 중 하나
값. 식. 문
값과 식은 동일한 것으로 간주

- statement.

  - 문. statement. if문, for문, while문, switch-case문.
  - 결과 리턴 x, 그 안의 구문을 실행하고 끝이다.
  - 문 자체가 하나의 block-scope

- expression.
  - 식. expression. 값이 될 수 있는 경우
  - 값으로 표현
  - (10+20)
  - 'abc' + 'def'

```js
if (true) {
  let a = 10;
  if (true) {
    console.log(a);
    const a = 20;
  }
  console.log(a);
}
console.log(a);

// 호이스팅이 된다면...
//a: undefined

// 호이스팅이 안된다면...
//a: 10
```

- TDZ : Temporal Dead Zone (임시사각지대)

  - let 또는 const로 변수를 선언한 위치에 오기 전까지는 이 변수를 호출할 수 없다.
  - 그 영역을 TDZ라고 한다.

- 호이스팅?
  - var : 변수명만 위로 끌어올리고 / undefined를 할당한다.
  - let, const : 변수명만 위로 끌어올리고 / 끝. 값 할당x
  - var, let, const 다 호이스팅 한다.

### 3) this ?

```js
var value = 0;
var obj = {
  value: 1,
  setValue: function () {
    this.value = 2; // this: obj
    (function () {
      this.value = 3; //this: window / 그냥 단순 함수를 실행한 것일 뿐 / 전역 value = 3
    })();
  },
};
obj.setValue();
console.log(value); // 3
console.log(obj.value); // 2
// console.log(global.value); // node 환경에서 this가 가리키는 객체
```

왜 다르게 나올까?

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

- 블록 스코프의 this는 바로 밖의 this를 그대로 쓴다.
- this 바인딩을 하지 않는다.

### 4) 모든 `문` 형태에 적용.

```js
var sum = 0;
for (let i = 1; i <= 10; i++) {
  sum += i;
}
console.log(sum); // 55
console.log(i); // ReferenceError: i is not defined
```

- for문은 예외로 () 안에 선언한 내용이 {} 에 갖힌다.
- for문의 본래 취지를 위해서.

```js
{
  let a = 2;
  if (a > 1) {
    let b = a * 3;
    console.log(b); // ReferenceError: b is not defined
  } else {
    let b = a / 3;
    console.log(b);
  }
  console.log(b); // ReferenceError: b is not defined
}
console.log(a); // ReferenceError: a is not defined
```

```js
if (Math.random() < 0.5) {
  let j = 0;
  console.log(j); // 0
} else {
  let j = 1;
  console.log(j); // 1
}
console.log(j); // ReferenceError: j is not defined
```

```js
let a = Math.ceil(Math.random() * 3);
switch (a) {
  case 1: {
    let b = 10;
    console.log(a + b);
    break;
  }
  case 2: {
    let b = 20;
    console.log(a + b);
    break;
  }
  case 3: {
    let b = 30;
    console.log(a + b);
    break;
  }
}
console.log(a, b);
```
