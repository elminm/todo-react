import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    todos:[]
}
const todoSlice = createSlice({

name:"todos",
initialState,
reducers:{
    addTodo : (state, { payload } )=>{
        const maxId = state.todos.reduce((acc,todo)=>todo.id>acc? todo.id:todo.id,0)
        state.todos = [...state.todos, {todo:payload,id:maxId+1,completed:false}]
    },
    handleCheckTodo:(state, { payload } )=>{
        const findObj = state.todos.find(q=>q.id==payload)
        findObj.completed = !findObj.completed
    },
    removeTodoAction:(state, { payload } )=>{
        state.todos = [...state.todos.filter(q=>q.id!=payload)]
    },
    clearTodoAction:(state)=>{
        state.todos = []
    }   
  }
})

export default todoSlice.reducer

export const {addTodo,handleCheckTodo,removeTodoAction,clearTodoAction} = todoSlice.actions