import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  todos: [],
  activeTab: "all",
};
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      const maxId = state.todos.reduce(
        (acc, todo) => (todo.id > acc ? todo.id : todo.id),
        0
      );
      state.todos = [
        ...state.todos,
        { id: maxId + 1, todo: payload, completed: false },
      ];
    },
    handleCheckTodo: (state, { payload }) => {
      const findObj = state.todos.find((q) => q.id == payload);
      findObj.completed = !findObj.completed;
    },
    removeTodoAction: (state, { payload }) => {
      state.todos = [...state.todos.filter((q) => q.id != payload)];
    },
    clearCompletedTodoAction: (state) => {
      state.todos = [...state.todos.filter((q) => !q.completed)];
    },
    getTabAction: (state, { payload }) => {
      if (payload.toLowerCase() === "all") {
        return { ...state, activeTab: "all" };
      } else if (payload.toLowerCase() === "active") {
        return { ...state, activeTab: "active" };
      } else if (payload.toLowerCase() === "completed") {
        return { ...state, activeTab: "completed" };
      }
      return state;
    },
  },
});

export default todoSlice.reducer;

export const {
  addTodo,
  handleCheckTodo,
  removeTodoAction,
  clearCompletedTodoAction,
  getTabAction,
} = todoSlice.actions;
