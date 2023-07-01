import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

// slice에 액션을 보내서 사용한다.
const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      // RTK와 createSlice를 쓰면 알아서 변경된 것만 덮어 쓴다!
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// RTK는 자동으로 action 객체를 만든다.
// 아래 방식으로 접근해서 리듀서를 실행시키면 해당 action이 만들어진다는 뜻! {type: toggle...}
// 그래서 일반 Redux와는 다르게 액션 객체를 직접 생성하지 않아도 되고, 액션 식별자를 관리하지 않아도 됨.
// counterSlice.actions.toggleCounter
// 따라서, 아래 코드는 couterSlice의 모든 액션을 담고 있는 객체를 의미한다.
export const counterActions = counterSlice.actions;

// reducer를 export 해서 store에서 사용하기 편하게 만들어주자.
export default counterSlice.reducer;
