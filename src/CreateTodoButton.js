import React from 'react';

function CreateTodoButton({ setOpenModal }) {
  return (
    <button
      className="create-todo-button"
      onClick={() => setOpenModal(true)}
    >
      +
    </button>
  );
}

export { CreateTodoButton };
