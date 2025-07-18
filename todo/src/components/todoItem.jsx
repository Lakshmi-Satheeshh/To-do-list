import React from 'react';

const TodoItem = ({ todo, onEdit, onDelete }) => {
  return (
    <li style={{ marginBottom: '10px' }}>
      <span style={{ marginRight: '10px' }}>{todo.text}</span>
      <button onClick={() => onEdit(todo._id, todo.text)} style={{ marginRight: '5px' }}>
        Edit
      </button>
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </li>
  );
};

export default TodoItem;