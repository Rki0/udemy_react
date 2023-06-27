// JSX에서 항상 최상위 태그를 요구하는 문제를 해결하는 방법 1.
// 그냥 하위 태그를 그대로 반환하는 함수를 만들어서 감싸주는 것.
// 그러면 불필요하게 div를 쓰지않아도 된다.
const Wrapper = (props) => {
  return props.children;
};

export default Wrapper;
