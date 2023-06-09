import axios from ".";
import { TodoType } from "../../types/todo";

// 목록 받아오기
export const getTodosAPI = () => axios.get<TodoType[]>("api/todos");

// 투두 체크하기
export const checkTodoAPI = (id: number) => axios.patch(`api/todos/${id}`);

//* 투두 추가하기 API Body
interface AddTodoAPIBody {
  text: string;
  color: TodoType["color"];
}

//* 투두 추가하기 API
export const addTodoAPI = (body: AddTodoAPIBody) =>
  axios.post("api/todos", body).then((res) => {
    console.log(res);
  });

// 투두 삭제하기
export const deleteTodoAPI = (id: number) => axios.delete(`api/todos/${id}`);
