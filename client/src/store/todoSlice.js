import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  todos: [],
  loading: false,
  activeTab: "all",
};
export const getAllData = createAsyncThunk("fetch/todos", async () => {
  const res = await axios.get("http://localhost:8000/todos/api");
  return res.data;
});
export const postTodo = createAsyncThunk("post/todos", async (obj) => {
  const res = await axios.post("http://localhost:8000/todos/api", obj);
  return res.data;
});
export const deleteTodo = createAsyncThunk("delete/todo", async (id) => {
  const res = await axios.delete("http://localhost:8000/todos/api/" + id);
  console.log(res.data);
  return res.data;
});
export const handleCheckTodo = createAsyncThunk(
  "handleCheck/todo",
  async (id, obj) => {
    const res = await axios.put("http://localhost:8000/todos/api/" + id, obj);
    return res.data;
  }
);
export const clearCompletedTodoAction = createAsyncThunk(
  "deleteCompleted/todos",
  async () => {
    const res = await axios.delete("http://localhost:8000/todos/api/0");
    return res.data;
  }
);
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder.addCase(getAllData.pending, (state) => {
      state.loading = true;
      state.todos = [];
    });
    builder.addCase(getAllData.fulfilled, (state, { payload }) => {
      state.todos = payload;
      state.loading = false;
    });
    builder.addCase(postTodo.fulfilled, (state, { payload }) => {
      state.todos = payload;
      state.loading = false;
    });
    builder.addCase(handleCheckTodo.fulfilled, (state, { payload }) => {
      state.todos = payload;
      state.loading = false;
    });
    builder.addCase(deleteTodo.fulfilled, (state, { payload }) => {
      state.todos = payload;
      state.loading = false;
    });
    builder.addCase(
      clearCompletedTodoAction.fulfilled,
      (state, { payload }) => {
        state.todos = payload;
        state.loading = false;
      }
    );
  },
});
export default todoSlice.reducer;
export const { getTabAction } = todoSlice.actions;
