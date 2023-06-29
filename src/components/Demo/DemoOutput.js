import React from "react";
import MyParagraph from "./MyParagraph";

const DemoOutput = (props) => {
  console.log("Demo");

  return <MyParagraph>{props.show ? "This is new!" : ""}</MyParagraph>;
};

// props가 변경되지 않는다면 재실행하지 않는다.
// 왜 이걸 모든 컴포넌트에 적용하지 않느냐? 재평가에 필요한 비용이 증가하기 때문
// props를 비교하기 위해 이를 저장할 공간이 필요하기 때문. 물론, 연산도 추가적으로 발생할 것이고.
// memo를 적용한 컴포넌트의 자식 컴포넌트도 영향을 받아서, 재실행이 되지 않는다.
// 따라서, 재평가의 가지를 끊어낼 수 있는 부분에만 이를 적용하도록 노력하자.
// memo는 함수형 컴포넌트에만 적용 가능하다.
export default React.memo(DemoOutput);
