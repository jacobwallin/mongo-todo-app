import "./App.css";
import { useEffect, useState } from "react";
import Todo from "./todo/Todo";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    oprn: false,
    message: "",
    severity: "success",
  });
  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    axios("/todos")
      .then((response) => {
        setTodos(response.data.filter((t) => t.completed === false));
        setCompletedTodos(response.data.filter((t) => t.completed === true));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function completeTodo(todoId) {
    // set todo as completed
    setTodos(
      todos.map((t) => {
        if (t._id === todoId) {
          return { ...t, completed: true };
        }
        return t;
      })
    );
    axios
      .put(`/todos/${todoId}`, { completed: true })
      .then((response) => {
        const completedTodo = todos.find((t) => t._id === todoId);
        if (completeTodo) {
          setTodos(todos.filter((t) => t._id !== completedTodo._id));
          setCompletedTodos([
            { ...completedTodo, completed: true },
            ...completedTodos,
          ]);
        }

        setSnackbarState({
          open: true,
          message: "Todo completed",
          severity: "success",
        });
      })
      .catch((err) => {
        console.log(err.message);
        setSnackbarState({
          open: true,
          message: "Error completing todo",
          severity: "warning",
        });
        // reset todo to be incomplete in state if request fails
        setTodos(
          todos.map((t) => {
            if (t._id === todoId) {
              return { ...t, completed: false };
            }
            return t;
          })
        );
      });
  }

  function createTodo(e) {
    e.preventDefault();
    axios
      .post("/todos", {
        title: newTodoTitle,
      })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodoTitle("");
        setShowCreate(false);
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
          severity: "warning",
        });
      });
  }

  function deleteTodo(todoId) {
    axios
      .delete(`/todos/${todoId}`)
      .then((response) => {
        setTodos(todos.filter((t) => t._id !== todoId));
        setSnackbarState({
          open: true,
          message: "Todo deleted",
          severity: "success",
        });
      })
      .catch((err) => {
        console.log(err.message);
        setSnackbarState({
          open: true,
          message: "Error deleting",
          severity: "warning",
        });
      });
  }

  function snackbarClose() {
    setSnackbarState({ open: false, message: "", severity: "success" });
  }

  function toggleCreate() {
    setShowCreate(!showCreate);
  }

  function toggleShowCompleted() {
    setShowCompleted(!showCompleted);
  }

  function handleTitleChange(e) {
    setNewTodoTitle(e.target.value);
  }

  return (
    <div className="App">
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={3000}
        onClose={snackbarClose}
      >
        <Alert severity={snackbarState.severity}>{snackbarState.message}</Alert>
      </Snackbar>
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
          <form id="create-todo" onSubmit={createTodo}>
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
              disabled={newTodoTitle.length === 0}
              type="submit"
            >
              Create
            </Button>
          </form>
        )}
        <div className="todos">
          {todos.map((t) => {
            return (
              <Todo
                key={t._id}
                id={t._id}
                title={t.title}
                completed={t.completed}
                handleComplete={completeTodo}
                handleDelete={deleteTodo}
              />
            );
          })}
        </div>
        <Button variant="text" size="small" onClick={toggleShowCompleted}>
          {showCompleted ? "Hide Completed" : "Show Completed"}
        </Button>
        {showCompleted && (
          <div className="todos">
            {completedTodos.map((t) => {
              return (
                <Todo
                  key={t._id}
                  id={t._id}
                  title={t.title}
                  completed={t.completed}
                  handleComplete={completeTodo}
                  handleDelete={deleteTodo}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
