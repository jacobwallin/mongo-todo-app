import "./App.css";
import { useEffect, useState } from "react";
import Todo from "./todo/Todo";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

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

  function createTodo(title) {
    axios
      .post("/todos", {
        title,
      })
      .then((response) => {
        setTodos([...todos, response.data]);
      })
      .catch((err) => {
        console.log(err.message);
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

  return (
    <div className="App">
      <div id="app-container">
        <div id="header">
          <h1>My Todos</h1>
          <div id="create-button">
            <Button variant="contained" color="success" size="small">
              Add Todo
            </Button>
          </div>
        </div>
        <div id="todos">
          {todos.map((t) => {
            return (
              <Todo key={t._id} title={t.title} handleComplete={completeTodo} />
            );
          })}
        </div>
        {/* <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      /> */}
      </div>
    </div>
  );
}

export default App;
