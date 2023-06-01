import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTodo } from "../store/todoSlice";
export default function Header() {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      todo,
      completed: false,
    };
    dispatch(postTodo(obj));
    setTodo("");
  };
  return (
    <>
      {/* {loading && <h1>LOADING</h1>} */}(
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
    </>
  );
}
