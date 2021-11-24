// 사용자 요청 받기
// 사용자 입력을 받는 역할
// 처리한 내용을 view로 전달
// 버튼 클릭 - 추가, 삭제, 수정, 각종 날짜 버튼
export default class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {}

  getInputData() {
    const inputData = this.view.todoInputEl.value;
    return inputData;
  }

  dateHandler() {
    // 날짜 클릭 시, 해당 날짜로 포커스, todolist 해당 날짜 로 업데이트
    // 이미 그 날짜면 event 막기
  }

  formHandler() {
    // 추가하기 클릭 시
    // model에 list 업데이트
    // list 만들기 -> 변경, 삭제 버튼 넣어서
  }
}
