class Todo {
  // TS에서는 필드의 타입을 먼저 밝히고 사용해야한다. JS에서는 안해도 됨.
  id: string;
  text: string;

  constructor(todoText: string) {
    this.text = todoText;
    this.id = new Date().toISOString();
  }
}

export default Todo;
