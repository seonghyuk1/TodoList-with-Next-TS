export type TodoType = {
  id: number;
  text: string;
  // color엔 값을 지정하여 color 속성을 더 명확히 함
  color: "red" | "orange" | "yellow" | "green" | "blue" | "navy";
  checked: boolean;
};
