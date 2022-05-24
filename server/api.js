const router = require("express").Router();
const Todo = require("./model");
const axios = require("axios");

router.get("/", async (req, res, next) => {
  const todos = await Todo.find({ ip: req.ip });

  // seed database for user if there are no todos
  if (todos.length === 0) {
    const mockTodos = await axios.get(process.env.MOCKAROO);

    const newTodos = await Promise.all(
      mockTodos.data.map((t) => {
        const newTodo = new Todo({
          ip: req.ip,
          title: t.title,
          completed: t.completed,
        });

        return newTodo.save();
      })
    );
    res.json(newTodos);
  } else {
    res.json(todos);
  }
});

router.post("/", async (req, res, next) => {
  const { title } = req.body;
  try {
    const newTodo = new Todo({
      ip: req.ip,
      title,
      completed: false,
    });

    await newTodo.save(newTodo);

    res.json(newTodo);
  } catch (error) {
    next(error);
  }
});

router.put("/:todoId", async (req, res, next) => {
  const { completed } = req.body;

  try {
    const todo = await Todo.findById(req.params.todoId);

    todo.completed = completed;

    await todo.save();

    res.json(todo);
  } catch (error) {
    next(error);
  }
});

router.delete("/:todoId", async (req, res, next) => {
  try {
    const deleteCount = await Todo.deleteOne({ _id: req.params.todoId });

    res.json(deleteCount);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
