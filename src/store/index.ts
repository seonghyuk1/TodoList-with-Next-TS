import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import todo from "./todo";
import { configureStore } from "@reduxjs/toolkit";
// import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}

// combineReducers를 사용하여 하나로 모음
// todo의 createSlice를 생성한 reducer를 combine을 통해 모아줌
const rootReducer = combineReducers({
  todo: todo.reducer,
});

// 합쳪진 리듀서에 타입이 '__NEXT_REDUX_WRAPPER_HYDRATE__'인 리듀서를 추가
// Hydrate는 서버에서 생성된 리덕스 스토어를 클라이언트에서 사용할 수 있도록 전달
const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // 이전상태
      ...action.payload, // 하이드레이션 적용
    };

    if (state.count) nextState.count = state.count;
    return nextState;
  }
  return rootReducer(state, action);
};

// 스토어 타입
export type RootState = ReturnType<typeof rootReducer>;

const initStore = () => {
  // return createStore(reducer, bindMiddleware([]));
  return configureStore({
    reducer,
    devTools: true,
  });
};

// App 컴포넌트에서 wrapper로 사용하기 위해 next-redux-wrapper에서 createWrapper를 import하여 wrapper를 만듦
export const wrapper = createWrapper(initStore);
