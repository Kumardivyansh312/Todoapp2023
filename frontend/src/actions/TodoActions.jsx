export const addTodo = (todo, dispatch) => {
  dispatch({
    type: "ADD_TODO",
    todoText: todo,
  });
};

export const addUser = (val, dispatch) => {
  dispatch({
    type: "ADD_USER",
    value: val,
  });
};

export const removeTodo = (todoId, dispatch) => {
  dispatch({
    type: "REMOVE_TODO",
    todoId,
  });
};

export const editTag = (todoId, tag, dispatch) => {
  dispatch({
    type: "EDIT_TODO_TAG",
    todoId,
    tag,
  });
};
