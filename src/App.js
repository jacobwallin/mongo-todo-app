import "./App.css";
import { useEffect, useState } from "react";
import Todo from "./todo/Todo";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // get request for all todos
    axios("/todos")
      .then((response) => {
        setTodos(response.data);
        console.log("GOT TODOS:", response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function completeTodo(todoId) {
    // put request
  }

  function createTodo() {
    // post request
  }

  function deleteTodo(todoId) {
    // delete request
  }

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div id="todos">
        {todos.map((t) => {
          return (
            <Todo key={t.id} title={t.title} handleComplete={completeTodo} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
