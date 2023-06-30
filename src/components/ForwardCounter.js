import useCounter from "../hooks/useCounter";
import Card from "./Card";

const ForwardCounter = () => {
  // custom hook에 정의된 state는 이 컴포넌트에 묶인다!
  const counter = useCounter();

  return <Card>{counter}</Card>;
};

export default ForwardCounter;
