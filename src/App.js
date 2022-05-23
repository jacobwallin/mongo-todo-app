import "./App.css";
import { useEffect, useState } from "react";
import Todo from "./Todo";

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
      <Todo title="mow the lawn" />
    </div>
  );
}

export default App;
