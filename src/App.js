import "./App.css";
import { useEffect, useState } from "react";
import Todo from "./todo/Todo";

function App() {
  useEffect(() => {
    // get request for all todos
  }, []);

  function completeTodo() {
    // put request
  }

  function createTodo() {
    // post request
  }

  function deleteTodo() {
    // delete request
  }

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div id="todos">
        <Todo title="mow the lawn" handleComplete={completeTodo} />
        <Todo title="do dishes" handleComplete={completeTodo} />
        <Todo title="homework" handleComplete={completeTodo} />
      </div>
    </div>
  );
}

export default App;
