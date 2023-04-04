import TodoList from "@/Components/TodoList";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { TodoType } from "../types/todo";
import { getTodosAPI } from "@/lib/api/todo";
import { wrapper } from "../store";
import { todoActions } from "@/store/todo";

interface IProps {
  todos: TodoType[];
}

const app: NextPage<IProps> = () => {
  // 그냥 todos 쓰면 에러나는 이유는 TodoList 컴포넌트가 props로 todos를 받이골 되어 있지 않기 때문에 이러한 에러가 발생
  // TodoList가 props로 todos를 받을 수 있게 Todolist에서 설정
  return <TodoList todos={[]} />;
};

// 신문법 적용으로 (store) => async ( { ~,~,~}) => 적용
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
  console.log(store);

  try {
    const { data } = await getTodosAPI();
    // 액션 생정자를 넣어 액션을 리턴
    // 우리가 만들었던 setTodo에선 (store/todo.ts) payload로 TodoType[]을 받기로 했음
    // dispatch(action)을 통해 액션 객체를 가지고 디스패치가 실행
    // 디스패치가 발생하면 리듀서에서는 이전 스토어 값과 액션으로 스토어를 업데이트

    store.dispatch(todoActions.setTodo(data));
    return { props: {} };
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
});

export default app;
