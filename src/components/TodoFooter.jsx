import { useDispatch, useSelector } from "react-redux"
import { clearTodoAction } from "../store/todoSlice"

export default function TodoFooter() {
    const dispatch = useDispatch()
    const { todos } = useSelector(state => state.todoReducer)
    const unCompletedTodo = todos.filter(q => !q.completed).length
    const clearTodo = () => {
        dispatch(clearTodoAction())
    }
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{unCompletedTodo}</strong>
                items left
            </span>

            <ul className="filters">
                <li>
                    <a href="#/" className="selected">All</a>
                </li>
                <li>
                    <a href="#/">Active</a>
                </li>
                <li>
                    <a href="#/">Completed</a>
                </li>
            </ul>

            <button className="clear-completed" onClick={clearTodo}>
                Clear completed
            </button>
        </footer>
    )
}