import React, { useContext, useRef } from "react";

import styles from "./NewTodo.module.css";
import { TodosContext } from "../store/todos-context";

const NewTodo: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  // 어떤 ref에 들어갈지를 명시하기 위해서 useRef의 제네릭을 확장해서 사용한다!
  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    // ? 와 !
    // ?는 있다면, !는 있어야만
    // 따라서 ?는 string | undefined이지만, !는 string이 된다.
    const enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      return;
    }

    todosCtx.addTodo(enteredText);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <label htmlFor="text">Todo Text</label>
      <input type="text" id="text" ref={todoTextInputRef} />
      <button>Add</button>
    </form>
  );
};

export default NewTodo;
