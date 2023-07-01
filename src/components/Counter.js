import { Component } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { counterActions } from "../store/counter";

import classes from "./Counter.module.css";

// Functional Components with RTK
const Counter = () => {
  // 다중 slice를 사용하게 되면, state.counter로 바로 루트 리듀서(=카운터 리듀서)-상태값 으로 접근하는게 안되므로
  // state.counter.counter로 접근해야한다. 이는 루트 리듀서-카운터 리듀서-상태값 으로 접근하는 것이다.
  const showCounter = useSelector((state) => state.counter.showCounter);
  const counter = useSelector((state) => state.counter.counter);
  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const increaseHandler = () => {
    // RTK는 자동으로 action 생성자를 만들어서 {type: ACTION_TYPE, ...}
    // payload라는 key에 넘겨준 인자를 저장한다. payload는 강제로 정해지는거라 커스텀할 수 없음.
    dispatch(counterActions.increase(10));
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}

      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increment by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>

      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// Functional Components
// const Counter = () => {
//   const showCounter = useSelector((state) => state.showCounter);
//   const counter = useSelector((state) => state.counter);
//   const dispatch = useDispatch();

//   const incrementHandler = () => {
//     // action을 dispatch한다!
//     // 즉, dispatch 안에 있는 것은 action을 의미한다.
//     dispatch({ type: "INCREMENT" });
//   };

//   const increaseHandler = () => {
//     dispatch({ type: "INCREASE", amount: 10 });
//   };

//   const decrementHandler = () => {
//     dispatch({ type: "DECREMENT" });
//   };

//   const toggleCounterHandler = () => {
//     dispatch({ type: "TOGGLE" });
//   };

//   return (
//     <main className={classes.counter}>
//       <h1>Redux Counter</h1>
//       {showCounter && <div className={classes.value}>{counter}</div>}

//       <div>
//         <button onClick={incrementHandler}>Increment</button>
//         <button onClick={increaseHandler}>Increment by 5</button>
//         <button onClick={decrementHandler}>Decrement</button>
//       </div>

//       <button onClick={toggleCounterHandler}>Toggle Counter</button>
//     </main>
//   );
// };

// export default Counter;

// Class Components
// class Counter extends Component {
//   incrementHandler() {
//     this.props.increment();
//   }

//   decrementHandler() {
//     this.props.decrement();
//   }

//   toggleCounterHandler() {}

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>

//         <div>
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>

//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// // redux state를 받는 함수
// // key 값을 Counter 클래스 컴포넌트에서 사용할 수 있음. this.props.key...
// const mapStateToProps = (state) => {
//   return {
//     counter: state.counter,
//   };
// };

// // redux dispatch를 가능하게 만들어주는 함수
// // key 값을 Counter 클래스 컴포넌트에서 사용할 수 있음. this.props.key...
// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch({ type: "INCREMENT" }),
//     decrement: () => dispatch({ type: "DECREMENT" }),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
