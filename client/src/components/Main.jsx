import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, handleCheckTodo } from "../store/todoSlice";

export default function Main() {
  const dispatch = useDispatch();
  const { todos, activeTab } = useSelector((state) => state.todoReducer);

  const removeTodo = (id) => {
    dispatch(deleteTodo(id));
  };
  const handleChecked = (id) => {
    const findObj = todos.find((q) => q.id == id);
    console.log(findObj);
    findObj.completed = !findObj.completed;
    dispatch(handleCheckTodo(id, findObj));
  };
  const filteredTodos =
    activeTab === "completed"
      ? todos.filter((q) => q.completed)
      : activeTab === "active"
      ? todos.filter((q) => !q.completed)
      : todos;
  return (
    <section className="main">
      <input className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((item) => (
            <li className={item.completed ? "completed" : ""} key={item.id}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleChecked(item.id)}
                />
                <label>{item.todo}</label>
                <button
                  className="destroy"
                  onClick={() => removeTodo(item.id)}
                ></button>
              </div>
            </li>
          ))
        ) : (
          <li style={{ padding: "30px" }}>Empty</li>
        )}
      </ul>
    </section>
  );
}
