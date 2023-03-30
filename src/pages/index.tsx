import TodoList from "@/Components/TodoList";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { TodoType } from "../types/todo";
import axios from "axios";
import { getTodosAPI } from "@/lib/api/todo";

interface IProps {
  todos: TodoType[];
}

const app: NextPage = ({ todos }) => {
  // 그냥 todos 쓰면 에러나는 이유는 TodoList 컴포넌트가 props로 todos를 받이골 되어 있지 않기 때문에 이러한 에러가 발생
  // TodoList가 props로 todos를 받을 수 있게 Todolist에서 설정
  return <TodoList todos={todos} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await getTodosAPI();

    console.log(data);

    return { props: { todos: data } };
  } catch (e) {
    console.log(e);
    return { props: { todos: [] } };
  }
};

export default app;
