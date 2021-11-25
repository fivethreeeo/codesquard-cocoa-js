<br>

##### demo : https://mansaout.github.io/codesquard-cocoa-js/mission/mission_06/todo_list_ver_week/

<br>

#### 구조

```
|-app.js
|
|---model.js       : todo 데이터 관리 역할, 의존성x
|---view.js        : ui를 출력하는 역할, 사용자 입력 필요없이 model.js에서 받아서 ui출력을 포함
|---controller.js  : 사용자 입력을 받고, view,model에 처리 요청하는 역할
|
|---util.js        : 클래스랑 상관없는 범용적 함수들 모음
```

<br>

#### 주요 기능

- [x] list 추가
- [x] list 삭제
- [ ] list 변경
- [x] 완료한 list 표시 (완료, 미완료 개수 출력)
- [x] 날짜 별로 list 보기 (주 단위로 출력)
- [ ] localStorage로 데이터 관리
