import React, { useState, useCallback } from "react";

import Button from "./components/UI/Button/Button";
import "./App.css";
import DemoOutput from "./Demo/DemoOutput";

function App() {
  // state는 초기 렌더링 외에는 갱신만 된다.
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  console.log("APP RUNNING");

  // useCallback을 사용해서 같은 포인터를 가리키는 상태임을 유지시키자.
  // dependency를 넣어서 특정 상황에서만 재생성되도록 하자.
  const toggleParagraphHandler = useCallback(() => {
    // allowToggle을 사용하면서 dependency에 추가하지 않을 때 문제.
    // 함수가 저장되었을 때의 상태를 그대로 사용하기 때문에, 그 당시의 allowToggle 값만을 계속 사용함.
    // 즉, 여기서는 false
    if (allowToggle) {
      setShowParagraph((prevShowParagraph) => !prevShowParagraph);
    }
  }, [allowToggle]);

  const allowToggleHandler = () => {
    setAllowToggle(true);
  };

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button onClick={allowToggleHandler}>Allow Toggle</Button>
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
    </div>
  );
}

export default App;
