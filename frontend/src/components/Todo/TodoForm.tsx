import React, { useState, useContext } from "react";

import { addTodo } from "../../actions";
import { Store } from "../../store/Store";

import "./TodoForm.scss";

export const TodoForm = () => {
  const { dispatch }: any = useContext(Store);
  const [todo, setTodo] = useState("");

  const handleTodoInput = (event: any) => {
    setTodo(event.target.value);
  };

  const handleTodoSubmit = (event: any) => {
    event.preventDefault();
    todo.trim().length > 0 && addTodo(todo, dispatch);
    setTodo("");
  };

  return (
    <form onSubmit={handleTodoSubmit} className="todo-form">
      <input type="text" value={todo} onChange={handleTodoInput} />
      <button type="submit">Add Todo</button>
    </form>
  );
};
