import { useEffect } from "react";
import Footer from "./components/Footer";
import TodoApp from "./components/TodoApp";
import { useDispatch } from "react-redux";
import { getAllData } from "./store/todoSlice";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);
  return (
    <>
      <TodoApp />
      <Footer />
    </>
  );
}
