//IMPORTANT THING BELOW !!
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
  return res.data;
});
export const handleCheckTodo = createAsyncThunk(
  "handleCheck/todo",
  async (payload) => {
    const res = await axios.put(
      "http://localhost:8000/todos/api/" + payload.id,
      payload.updatedObj
    );
    return res.data;
  }
);
export const deleteCompletedTodoAction = createAsyncThunk(
  "deleteCompleted/todos",
  async (completedTodos, { dispatch }) => {
    await axios
      .put("http://localhost:8000/todos/api/delete/completed", completedTodos)
      .then(() => dispatch(getAllData()));
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
    });
    builder.addCase(getAllData.fulfilled, (state, { payload }) => {
      state.todos = payload;
      state.loading = false;
    });
    builder.addCase(getAllData.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(postTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postTodo.fulfilled, (state, { payload }) => {
      state.todos = [...state.todos, payload];
      state.loading = false;
    });
    builder.addCase(handleCheckTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleCheckTodo.fulfilled, (state, { payload }) => {
      state.todos = [
        ...state.todos.map((item) => {
          if (item._id == payload._id) {
            return payload;
          }
          return item;
        }),
      ];
      state.loading = false;
    });
    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todos = [...state.todos.filter((q) => q._id !== action.meta.arg)];
      state.loading = false;
    });
  },
});
export default todoSlice.reducer;
export const { getTabAction } = todoSlice.actions;

//second way update IMPORTANT !!
// export const handleCheckTodo = createAsyncThunk(
//   "handleCheck/todo",
//   async (payload, { dispatch }) => {
//     await axios.put(
//       "http://localhost:8000/todos/api/" + payload.id,
//       payload.updatedObj
//     )
//     dispatch(getAllData());
//   }
// );
// UP then REMEMBER !!
