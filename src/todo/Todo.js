import React from "react";
import PropTypes from "prop-types";
import "./Todo.css";

function Todo(props) {
  return (
    <div className="todo-wrapper">
      <div className="checkbox-title">
        <input type="checkbox" id="completed" className="completed" />
        {props.title}
      </div>
    </div>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  handleComplete: PropTypes.func.isRequired,
};

export default Todo;
