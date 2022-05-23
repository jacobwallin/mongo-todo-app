import React from "react";
import PropTypes from "prop-types";

function Todo(props) {
  return <div>{props.title}</div>;
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  handleComplete: PropTypes.func.isRequired,
};

export default Todo;
