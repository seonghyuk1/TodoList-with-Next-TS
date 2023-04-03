import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import { TodoType } from "../types/todo";

import TrashCanIcon from "../public/statics/svg/trash.svg";
import CheckIcon from "../public/statics//svg/check.svg";

import { checkTodoAPI, deleteTodoAPI } from "../lib/api/todo";

// 인터페이스를 활용하여 타입 지정
// export를 하지 않는 타입에 대해서는 interface를 사용하는 것을 선호 : 그렇기에 props 타입에 대해선 interface를 사용
interface IProps {
  todos: TodoType[];
}

// className 활용 스타일링
const Container = styled.div`
  width: 100%;

  .todo-num {
    margin-left: 12px;
  }

  /*  상단 스타일링 */
  .todo-list-header {
    padding: 12px;
    position: relative;
    border-bottom: 1px solid ${palette.gray};
    .todo-list-last-todo {
      font-size: 14px;
      span {
        margin-left: 8px;
      }
    }

    .todo-list-header-colors {
      display: flex;
      .todo-list-header-color-num {
        display: flex;
        margin-right: 8px;
        p {
          font-size: 14px;
          line-height: 16px;
          margin: 0;
          margin-left: 6px;
        }

        .todo-list-header-round-color {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }
      }
    }
  }
  .bg-blue {
    background-color: ${palette.blue};
  }
  .bg-green {
    background-color: ${palette.green};
  }
  .bg-navy {
    background-color: ${palette.navy};
  }
  .bg-orange {
    background-color: ${palette.orange};
  }
  .bg-red {
    background-color: ${palette.red};
  }
  .bg-yellow {
    background-color: ${palette.yellow};
  }

  /* 하단 왼쪽 스타일링 */
  .todo-list {
    .todo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 52px;
      border-bottom: 1px solid ${palette.gray};

      .todo-left-side {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        .todo-color-block {
          width: 12px;
          height: 100%;
        }

        .checked-todo-text {
          color: ${palette.gray};
          text-decoration: line-through;
        }

        .todo-text {
          margin-left: 12px;
          font-size: 16px;
        }
      }
    }
  }

  // checked가 false일 때 체크박스 생성
  // checked가 true 일 때 체크표시와 쓰레기통 표시
  .todo-right-side {
    display: flex;
    margin-right: 12px;
    svg {
      &:first-child {
        margin-right: 16px;
      }
    }

    .todo-trash-can {
      width: 24px;
      height: 24px;
      path {
        fill: ${palette.deep_red};
      }
    }
    .todo-check-mark {
      fill: ${palette.deep_green};
      width: 24px;
      height: 24px;
    }
    .todo-button {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid ${palette.gray};
      background-color: transparent;
      outline: none;
      margin-right: 10px;
    }
  }
`;

const TodoList: React.FC<IProps> = ({ todos }) => {
  const [localTodos, setLocalTodos] = useState(todos);

  // // * 객체 별 색 카운트
  // ! useMemo는 특정 결과값을 재사용하고 싶을 때 사용하고, useCallback은 특정 함수를 새로 만들지 않고 재사용 하고 싶을 때
  // const getTodoColorNums = useCallback(() => {
  //   let red = 0;
  //   let orange = 0;
  //   let yellow = 0;
  //   let green = 0;
  //   let blue = 0;
  //   let navy = 0;
  //   localTodos.forEach((todo) => {
  //     if (todo.color === "red") {
  //       red += 1;
  //     }

  //     if (todo.color === "orange") {
  //       orange += 1;
  //     }

  //     if (todo.color === "yellow") {
  //       yellow += 1;
  //     }

  //     if (todo.color === "green") {
  //       green += 1;
  //     }

  //     if (todo.color === "blue") {
  //       blue += 1;
  //     }

  //     if (todo.color === "navy") {
  //       navy += 1;
  //     }
  //   });
  //   return {
  //     red,
  //     orange,
  //     yellow,
  //     green,
  //     blue,
  //     navy,
  //   };
  // }, [localTodos]);

  //* 객체의 문자열 인덱스 사용을 위한 타입
  type ObjectIndexType = {
    [key: string]: number | undefined;
  };

  //* 색깔 객체 구하기 2
  const todoColorNums = useMemo(() => {
    const colors: ObjectIndexType = {};
    localTodos.forEach((todo) => {
      const value = colors[todo.color];
      if (!value) {
        //* 존재하지않던 key라면
        colors[`${todo.color}`] = 1;
      } else {
        //* 존재하는 키라면
        colors[`${todo.color}`] = value + 1;
      }
    });
    return colors;
  }, [localTodos]);

  // ? useMemo와 useCallback을 사용하는 게 꼭 좋은 것만은 아님
  // ? 값의 변화를 비교 하게 되고, 배열을 생성하여 사용하는 만큼 메모리를 사용하기 때문에 이러한 비용이 재연산하는 비용보다 클 수 있기 때문

  // ? 재계산 방지를 통한 성능 개선, useMemo와 useCallback

  // * 투두 체크하기
  const checkTodo = async (id: number) => {
    try {
      await checkTodoAPI(id);

      // 체크 할 때 바뀐 todo를 state를 통해 할당
      const newTodos = localTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }

        return todo;
      });
      setLocalTodos(newTodos);
    } catch (e) {
      console.log(e);
    }
  };

  // * 투두 삭제하기
  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoAPI(id);
      const newTodos = localTodos.filter((todo) => todo.id !== id);
      setLocalTodos(newTodos);

      console.log("삭제 완료");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container>
        <div className="todo-list-header">
          <p className="todo-list-last-todo">
            남은 할 일<span>{localTodos.length}개</span>
          </p>

          <div className="todo-list-header-colors">
            {Object.keys(todoColorNums).map((color, index) => (
              <div className="todo-list-header-color-num" key={index}>
                <div className={`todo-list-header-round-color bg-${color}`} />
                <p>{todoColorNums[color]}개</p>
              </div>
            ))}
          </div>
        </div>

        <ul className="todo-list">
          {Array.from(localTodos).map((todo) => (
            <li className="todo-item" key={todo.id}>
              <div className="todo-left-side">
                {/* 백틱을 사용하여 배경색 맞추기  */}
                <div className={`todo-color-block bg-${todo.color}`} />
                {/* true일 때 빗금처리  */}
                <p className={`todo-text ${todo.checked ? "checked-todo-text" : ""}`}>{todo.text}</p>
              </div>

              <div className="todo-right-side">
                {todo.checked && (
                  <>
                    <TrashCanIcon
                      className="todo-trash-can"
                      onClick={() => {
                        deleteTodo(todo.id);
                      }}
                    />

                    <CheckIcon
                      className="todo-check-mark"
                      onClick={() => {
                        checkTodo(todo.id);
                      }}
                    />
                  </>
                )}

                {!todo.checked && (
                  <button
                    type="button"
                    className="todo-button"
                    onClick={() => {
                      checkTodo(todo.id);
                    }}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
};

export default TodoList;
