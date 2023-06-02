const express = require("express");

const { todoController } = require("../controllers/todo");

const todoRoutes = express.Router();

todoRoutes.get("/", todoController.getAll);

todoRoutes.get("/:id", todoController.getById);

todoRoutes.post("/", todoController.add);

todoRoutes.delete("/:id", todoController.deleteById);

todoRoutes.put("/:id", todoController.updateById);

todoRoutes.put("/delete/completed", todoController.deleteMany);

module.exports = {
  todoRoutes,
};
