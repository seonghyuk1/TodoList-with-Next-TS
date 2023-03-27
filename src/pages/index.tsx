import TodoList from "@/Components/TodoList";
import { NextPage } from "next";
import React from "react";
import { TodoType } from "../types/todo";

const todos: TodoType[] = [
  { id: 1, text: "채은이랑 더 현대 가기", color: "red", checked: true },
  { id: 2, text: "배드민턴 한 판 뜨기", color: "orange", checked: false },
  { id: 3, text: "뽀뽀하기", color: "yellow", checked: true },
  { id: 4, text: "잠실에서 벚꽃 보기", color: "blue", checked: false },
  { id: 5, text: "안양천 가기", color: "green", checked: false },
  { id: 5, text: "건조기", color: "navy", checked: false },
];

const app: NextPage = () => {
  // 그냥 todos 쓰면 에러나는 이유는 TodoList 컴포넌트가 props로 todos를 받이골 되어 있지 않기 때문에 이러한 에러가 발생
  // TodoList가 props로 todos를 받을 수 있게 Todolist에서 설정
  return <TodoList todos={todos} />;
};

export default app;
