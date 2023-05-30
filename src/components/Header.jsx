import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "../store/todoSlice"

export default function Header() {
  const dispatch = useDispatch()
  const [todo, setTodo] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addTodo(todo))
    setTodo('')
  }
  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" autoFocus value={todo} onChange={(e) => setTodo(e.target.value)} />
      </form>
    </header>
  )
}