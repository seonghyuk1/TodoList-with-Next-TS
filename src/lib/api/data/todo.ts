import { readFileSync, writeFileSync } from "fs";
import { TodoType } from "@/types/todo";

const getList = () => {
  const todosBuffer = readFileSync("src/data/todos.json");
  const todosString = todosBuffer.toString();

  if (!todosString) {
    return [];
  }

  const todos: TodoType[] = JSON.parse(todosString);
  return todos;
};

const exist = ({ id }: { id: number }) => {
  const todos = getList();
  // some 함수 일치하는 id가 있다면 true를 리턴, id가 없다면 false를 리턴
  const todo = todos.some((todo) => todo.id === id);
  return todo;
};

// 투두리스트 저장하기
const write = async (todos: TodoType[]) => {
  writeFileSync("src/data/todos.json", JSON.stringify(todos));
};

export default { getList, exist, write };
