import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  console.log("button");

  return (
    <button
      type={props.type || "button"}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

// 얘는 함수를 props로 받고 있어서 불변인데, 왜 재렌더링이 될까?
// App은 어찌되었든 일반적인 js 함수처럼 실행된다. 다만 사용자에 의해 호출되는게 아니라 React에 의해 호출된다.
// 이 때, 모든 코드가 다시 실행된다는 것. 즉, Button에 props로 전달하는 함수도 완전히 새로워진다.(물론 기능은 같지만)
// React.memo
// 만약, 원시값(boolean, string 등)을 사용했다면 props.new === props.prev 형태로 비교되기 때문에, 변화가 없다고 생각하지만,
// 함수는 포인터가 변하기 때문에(새로운 객체가 생성되기 때문에) 저게 작동하지 않는다. 따라서 배열 등도 마찬가지.
// 따라서, React.memo만 해줄게 아니라, props로 들어오는 함수에도 useCallback을 적용해줘야한다.
export default React.memo(Button);
