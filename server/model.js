const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  ip: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
