import Data from "@/lib/api/data";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    try {
      const todoId = Number(req.query.id);
      const todo = Data.todo.exist({ id: todoId });
      if (!todo) {
        res.statusCode = 404;
        res.end();
      }

      const todos = Data.todo.getList();
      const ChangedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });

      // 동적으로 첫 번째 인자로 받은 경로에 데이터를 저장
      Data.todo.write(ChangedTodos);
      res.statusCode = 200;
      res.end();
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      res.send(e);
    }
  }

  if (req.method === "DELETE") {
    try {
      const todoId = Number(req.query.id);
      const todo = Data.todo.exist({ id: todoId });
      if (!todo) {
        res.statusCode = 404;
        res.end();
      }

      const todos = Data.todo.getList();
      const filteredTodos = todos.filter((todo) => todo.id !== todoId);
      Data.todo.write(filteredTodos);
      res.statusCode = 200;
      res.end();
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      res.send(e);
    }
  }

  res.statusCode = 405;
  return res.end();
};

// import Data from "@/lib/api/data";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "PUT") {
//     try {
//       console.log(req.query);
//       res.statusCode = 200;
//       return res.end();
//     } catch (e) {
//       console.log(e);
//       res.statusCode = 500;
//       res.send(e);
//     }
//   }

//   //   if (req.method === "DELETE") {
//   //     try {
//   //       const todoId = Number(req.query.id);
//   //       const todo = Data.todo.exist({ id: todoId });
//   //       if (!todo) {
//   //         res.statusCode = 404;
//   //         res.end();
//   //       }

//   //       const todos = Data.todo.getList();
//   //       const filteredTodos = todos.filter((todo) => todo.id !== todoId);
//   //       Data.todo.write(filteredTodos);
//   //       res.statusCode = 200;
//   //       res.end();
//   //     } catch (e) {
//   //       console.log(e);
//   //       res.statusCode = 500;
//   //       res.send(e);
//   //     }
//   //   }
//   res.statusCode = 405;
//   return res.end();
// };
