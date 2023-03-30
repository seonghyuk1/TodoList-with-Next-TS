import { TodoType } from "../../types/todo";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import Data from "../../lib/api/data";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const todosBuffer = fs.readFileSync("src/data/todos.json");
      const todosString = todosBuffer.toString();

      if (!todosString) {
        res.statusCode = 200;
        res.send([]);
      }

      const todos: TodoType[] = JSON.parse(todosString);
      res.statusCode = 200;
      return res.send(todos);
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      res.send(e);
    }
  } else {
    res.end();
  }

  if (req.method === "POST") {
    //* 값을 받았는지 확인
    const { text, color } = req.body;
    if (!text || !color) {
      res.statusCode = 400;
      return res.send("text 혹은 color 가 없습니다.");
    }

    const todos = Data.todo.getList();
    console.log(todos);
    let todoId: number;
    if (todos.length > 0) {
      //* 마지막 투두 id + 1
      todoId = todos[todos.length - 1].id + 1;
    } else {
      todoId = 1;
    }
    const newTodo = {
      id: todoId,
      text,
      color,
      checked: false,
    };

    Data.todo.write([...todos, newTodo]);
    res.statusCode = 200;
    res.end();
  }
};

// import { TodoType } from "@/types/todo";
// import { NextApiRequest, NextApiResponse } from "next";
// import fs from "fs";
// import Data from "../../../lib/api/data";

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "GET") {
//     try {
//       const todos = new Promise<TodoType[]>((resolve, reject) => {
//         fs.readFile("src/data/todos.json", (err, data) => {
//           if (err) {
//             return reject(err.message);
//           }

//           const todosData = data.toString();

//           if (!todosData) {
//             return resolve([]);
//           }

//           const todos = JSON.parse(data.toString());
//           return resolve(todos);
//         });
//       });

//       res.statusCode = 200;
//       return res.send(todos);
//     } catch (e) {
//       console.log(e);
//       res.statusCode = 500;
//       res.send(e);
//     }
//   }

//   if (req.method === "POST") {
//     //* 값을 받았는지 확인
//     const { text, color } = req.body;
//     if (!text || !color) {
//       res.statusCode = 400;
//       return res.send("text 혹은 color 가 없습니다.");
//     }

//     const todos = Data.todo.getList();
//     console.log(todos);
//     let todoId: number;
//     if (todos.length > 0) {
//       //* 마지막 투두 id + 1
//       todoId = todos[todos.length - 1].id + 1;
//     } else {
//       todoId = 1;
//     }
//     const newTodo = {
//       id: todoId,
//       text,
//       color,
//       checked: false,
//     };

//     Data.todo.write([...todos, newTodo]);
//     res.statusCode = 200;
//     res.end();
//   }

//   // res.statusCode = 405;
//   // return res.end();
// };

// // import { NextApiRequest, NextApiResponse } from "next";
// // import Data from "@/lib/api/data";

// // export default (req: NextApiRequest, res: NextApiResponse) => {
// //   if (req.method === "GET") {
// //     try {
// //       const todos = Data.todo.getList();

// //       res.statusCode = 200;
// //       return res.send(todos);
// //     } catch (e) {
// //       console.log(e);
// //       res.statusCode = 500;
// //       res.send(e);
// //     }
// //   }
// // };
