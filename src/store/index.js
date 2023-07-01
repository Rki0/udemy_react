// import { createStore } from "redux";

// const initialState = { counter: 0, showCounter: true };

// const counterReducer = (state = initialState, action) => {
//   // reducer는 새로운 값을 병합하는게 아니라, 대체한다(덮어쓴다)는 것을 잊지말자.
//   // 즉, 새로운 값을 넣기 때문에, 변경이 없는 것이라도 입력을 해줘야한다.
//   if (action.type === "INCREMENT") {
//     // 절대 기존의 state(원본 state)를 변경하려고하면 안된다. 여기서 기존, 원본은 초기 state를 의미하는게 아님에 주의.
//     // state.counter++;

//     return { counter: state.counter + 1, showCounter: state.showCounter };
//   }

//   if (action.type === "INCREASE") {
//     return {
//       counter: state.counter + action.amount,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === "DECREMENT") {
//     return { counter: state.counter - 1, showCounter: state.showCounter };
//   }

//   if (action.type === "TOGGLE") {
//     return { counter: state.counter, showCounter: !state.showCounter };
//   }

//   return state;
// };

// const store = createStore(counterReducer);

// export default store;

import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth";
import counterSlice from "./counter";

// 여러 개의 리듀서를 하나의 루트 리듀서로 합쳐주는 configureStore
// Redux나 RTK나 여전히 redux store는 하나만 가지고 있다는 것을 기억하자. Redux의 작동 방식이다!
const store = configureStore({
  reducer: { counter: counterSlice, auth: authSlice },
});

export default store;
