import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoType } from "../types/todo";

// ? 3. 항상 npm-module-or-app/reducer/ACTION_TYPE 형태의 action 타입을 가져야함
export const INIT_TODO_LIST = "todo/INIT_TODO_LIST";

// ? 2. 항상 모듈의 action 생성자들을 함수형태로 export 해야함
export const setTodo = (payload: TodoType[]) => {
  // 후에 액션을 dispatch를 통하여 실행하면 액션 생성자는 파라미터를 받아 액션 객체 형태로 만들어줌
  // 형태는 타입과 페이로드
  return {
    type: INIT_TODO_LIST,
    payload,
  };
};

interface TodoReduxState {
  todos: TodoType[];
}

//* 초기상태
const initialState: TodoReduxState = {
  todos: [],
};

//? 1. 항상 reducer()란 이름의 함수를 export default 해야함
// 생성된 액션 객체는 리듀서로 가게되고 리듀서는 이전 상태와 액션 객체를 파라미터로 받아 새로운 상태를 만들어 반환
// 리듀서는 만들어진 새로운 상태를 스토어로 업데이트하고 컴포넌트는 이 스토어를 구독 중
// 스토어에 변화가 생기게 되면 그 상태를 전달받아 뷰를 변환시킬 수 있게 됨

// pages/index로 부터 온 action의 payload
// 생성된 액션 객체와 이전 상태는 리듀서로 전달되어, 다음과 같은 과정을 수행하게 되어 새로운 상태를 스토어로 업데이트
// export default function reducer(state = initialState, action: any) {
//   switch (action.type) {
//     // case INIT_TODO_LIST:
//     case INIT_TODO_LIST:
//       const newState = { ...state, todos: action.payload };
//       return newState;
//     default:
//       return state;
//   }
// }

const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodo(state, action: PayloadAction<TodoType[]>) {
      state.todos = action.payload;
    },
  },
});

// 아래로 변경
// export const todoActions = { setTodo };
// 액션 생성자들을 모아놓은 것 다른 파일에서 디스패치 할 때 사용하도록 export
export const todoActions = { ...todo.actions };

export default todo;
