import "./App.css";
import { useEffect, useState } from "react";
import Todo from "./todo/Todo";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    oprn: false,
    message: "",
    severity: "",
  });
  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    axios("/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function completeTodo(todoId) {
    axios
      .put(`/todos/${todoId}`, { complete: true })
      .then((response) => {
        setTodos(todos.filter((t) => t.id !== todoId));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function createTodo() {
    axios
      .post("/todos", {
        title: newTodoTitle,
      })
      .then((response) => {
        setTodos([...todos, response.data]);
        setSnackbarState({
          open: true,
          message: "Todo created",
          severity: "success",
        });
      })
      .catch((err) => {
        console.log(err.message);
        setSnackbarState({
          open: true,
          message: "Error creating todo",
          severity: "error",
        });
      });
  }

  function deleteTodo(todoId) {
    axios
      .delete(`/todos/${todoId}`)
      .then((response) => {
        setTodos(todos.filter((t) => t.id !== todoId));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function snackbarClose() {
    setSnackbarState({ open: false, message: "", severity: "" });
  }

  function toggleCreate() {
    setShowCreate(!showCreate);
  }

  function handleTitleChange(e) {
    setNewTodoTitle(e.target.value);
  }

  return (
    <div className="App">
      <div id="app-container">
        <div id="header">
          <h1>My Todos</h1>
          {showCreate ? (
            <div id="create-button">
              <Button variant="contained" size="small" onClick={toggleCreate}>
                Close
              </Button>
            </div>
          ) : (
            <div id="create-button">
              <Button variant="contained" size="small" onClick={toggleCreate}>
                Add Todo
              </Button>
            </div>
          )}
        </div>
        {showCreate && (
          <div id="create-todo">
            <TextField
              id="standard-basic"
              label="new todo"
              variant="outlined"
              size="small"
              fullWidth
              value={newTodoTitle}
              onChange={handleTitleChange}
            />
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={createTodo}
              disabled={newTodoTitle.length === 0}
            >
              Create
            </Button>
          </div>
        )}
        <div id="todos">
          {todos.map((t) => {
            return (
              <Todo key={t._id} title={t.title} handleComplete={completeTodo} />
            );
          })}
        </div>
        <Snackbar
          open={snackbarState.open}
          autoHideDuration={3000}
          onClose={snackbarClose}
          message={snackbarState.message}
          severity={snackbarState.severity}
        />
      </div>
    </div>
  );
}

export default App;
