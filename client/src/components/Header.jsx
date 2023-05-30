import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTodo } from "../store/todoSlice";
export default function Header() {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState([]);
  const { todos } = useSelector((state) => state.todoReducer);
  const handleSubmit = (e) => {
    e.preventDefault();
    const maxId = todos.reduce(
      (acc, todo) => (todo.id > acc ? todo.id : todo.id),
      0
    );
    let obj = {
      id: maxId + 1,
      todo,
      completed: false,
    };
    dispatch(postTodo(obj));
    setTodo("");
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </form>
    </header>
  );
}
