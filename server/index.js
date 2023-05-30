const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
let todos = [];
app.get("/todos/api", (req, res) => {
  res.json(todos);
});
app.get("/todos/api/:id", (req, res) => {
  const findObj = todos.find((q) => q.id == req.params.id);
  if (findObj) {
    res.json(findObj);
  } else
    res.json({
      msg: "Todo Not Found",
    });
});

app.post("/todos/api", (req, res) => {
  todos.push(req.body);
  res.json(todos);
});

app.put("/todos/api/:id", function (req, res) {
  const todoIdx = todos.findIndex((q) => q.id == req.body.id);
  const oldTodo = todos[todoIdx];
  todos[todoIdx] = { ...oldTodo, ...req.body };
  res.json(todos);
});
app.delete("/todos/api/:id", (req, res) => {
  if (req.params.id == 0) {
    todos = todos.filter((q) => !q.completed);
  }
  todos = todos.filter((q) => q.id != req.params.id);
  res.json(todos);
});

app.listen(8000, () => {
  console.log("listening port 8000");
});
