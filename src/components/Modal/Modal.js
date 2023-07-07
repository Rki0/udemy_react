import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import "./Modal.css";

// enter과 exit의 시간을 다르게 만들 수도 있다.
const animationTiming = {
  enter: 400,
  exit: 1000,
};

const modal = (props) => {
  // {(state) => {
  //     const cssClasses = [
  //       "Modal",
  //       state === "entering"
  //         ? "ModalOpen"
  //         : state === "exiting"
  //         ? "ModalClosed"
  //         : null,
  //     ];

  // CSSTransition은 state callback function이 아니라 일반 JSX 코드를 입력한다.
  return (
    <CSSTransition
      in={props.show}
      timeout={animationTiming}
      mountOnEnter
      unmountOnExit
      //   classNames="fade-slide" // 상태에 따라 하위 컴포넌트 중 최상위 태그에 추가될 className을 입력한다. ...-enter, -exit, -enter-active 이런 식으로 들어감.
      // 아니면 객체를 넣어서 css에 직접 입력하지 않고 생성할 수도 있음.
      classNames={{
        enter: "",
        enterActive: "ModalOpen",
        exit: "",
        exitActive: "ModalClosed",
      }}
    >
      <div className="Modal">
        <h1>A Modal</h1>
        <button className="Button" onClick={props.closed}>
          Dismiss
        </button>
      </div>
    </CSSTransition>
  );
};

export default modal;
