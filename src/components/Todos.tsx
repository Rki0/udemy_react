import React, { useContext } from "react";

// import Todo from "../models/todo"; // class는 타입 명시로도 사용할 수 있다.
import TodoItem from "./TodoItem";

import styles from "./Todos.module.css";
import { TodosContext } from "../store/todos-context";

// FC = Funtion Component 를 통해 함수 컴포넌트라는 것을 명시
// 이를 통해 children같이 props에 딸려 들어오는 속성들을 받아올 수 있음. 만약 안하면 props. 입력해도 children이 자동으로 안 뜸.
// FC는 제네릭 타입인데, 여기에 추가적으로 설정을 해서 내부적으로 이를 활용할 수 있게 만들자.
// FC 옆에 <>로 만들어둔 제네릭은 FC가 제공하는 타입과 합쳐져서 사용될 것이다. 이제 props. 입력하면 items도 나오는 것을 확인할 수 있다.
const Todos: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  return (
    <ul className={styles.todos}>
      {todosCtx.items.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          // bind를 통해서 TodoItem에서 onRemoveTodo의 파라미터 타입을 설정하지 않아도 되게끔 했다.
          onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};

export default Todos;
