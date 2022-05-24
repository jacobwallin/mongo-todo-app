const router = require("express").Router();
const Todo = require("./model");

router.get("/", async (req, res, next) => {
  const todos = await Todo.find({ ip: req.ip });
  res.json(todos);
});

router.post("/", async (req, res, next) => {
  const { title } = req.body;

  try {
    const newTodo = await new Todo({
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
  const { title, completed } = req.body;

  try {
    const todo = await Todo.findById(req.params.todoId);

    todo.title = title;
    todo.completed = completed;

    await todo.save();

    res.json(todo);
  } catch (error) {
    next(error);
  }
});

router.delete("/:todoId", async (req, res, next) => {
  try {
    const deleteCount = await Todo.deleteOne({ id: req.params.id });

    res.json(deleteCount);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
