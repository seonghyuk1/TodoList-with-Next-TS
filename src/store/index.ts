import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import todo from "./todo";
// import { configureStore } from "@reduxjs/toolkit";

// combineReducers를 사용하여 하나로 모음
const rootReducer = combineReducers({
  todo,
});

// 합쳪진 리듀서에 타입이 '__NEXT_REDUX_WRAPPER_HYDRATE__'인 리듀서를 추가
// Hydrate는 서버에서 생성된 리덕스 스토어를 클라이언트에서 사용할 수 있도록 전달
const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return rootReducer(state, action);
};

// 스토어 타입
export type RootState = ReturnType<typeof rootReducer>;

// * 미들웨어 적용을 위한 스토어 enhancer
// 리덕스에서 미들웨어는 액션이 디스패치 되어 리듀서에서 처리하기 전에 사전에 지정된 작업들을 의미
// 리덕스 데브툴 확장 프로그램을 사용하기 위해 미들웨어에 리덕스 데브툴을 사용하도록 하는 코드
const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

// 리듀서와 미들웨어로 리덕스 스토어를 만들어 리턴

const initStore = () => {
  return createStore(reducer, bindMiddleware([]));
};

// App 컴포넌트에서 wrapper로 사용하기 위해 next-redux-wrapper에서 createWrapper를 import하여 wrapper를 만듦
export const wrapper = createWrapper(initStore, {
  debug: true,
});

// import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
// import { HYDRATE, createWrapper } from "next-redux-wrapper";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import todo from "./todo";

// const rootReducer = combineReducers({
//   todo: todo.reducer,
// });

// const reducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     };
//     if (state.count) nextState.count = state.count;
//     return nextState;
//   }
//   return rootReducer(state, action);
// };

// //* 스토어의 타입
// export type RootState = ReturnType<typeof rootReducer>;

// //* 타입 지원되는 커스텀 useSelector 만들기
// export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

// const initStore = () => {
//   return configureStore({
//     reducer,
//     devTools: true,
//   });
// };

// export const wrapper = createWrapper(initStore);
