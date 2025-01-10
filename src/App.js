import './App.css';
import { ToDoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';
import { Modal } from './Modal';
import React from 'react';

function useLocalStorage(itemName, initialValue) {
  const localStorageItem = localStorage.getItem(itemName);
  let parsedItems;
  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItems = initialValue;
  } else {
    parsedItems = JSON.parse(localStorageItem);
  }

  const [item, setItem] = React.useState(parsedItems);

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };
  return [item, saveItem];
}

function App() {

  const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);
  const [searchValue, setsearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false); 
  const [newTodoValue, setNewTodoValue] = React.useState(''); 

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  const searchedTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchValue.toLowerCase())
  );

  const completeTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(todo => todo.text === text);
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(todo => todo.text === text);
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const addTodo = () => {
    if (newTodoValue.trim().length > 0) {
      const newTodos = [...todos];
      newTodos.push({ text: newTodoValue, completed: false });
      saveTodos(newTodos);
      setOpenModal(false); // Cerrar modal
      setNewTodoValue(''); // Limpiar input
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Cerrar el modal
    setNewTodoValue(''); // Limpiar el valor del input
  };

  return (
    <>
      
      <div className="FormularioPrincipal">
        
        <ToDoCounter completed={completedTodos} total={totalTodos} />

        <TodoSearch searchValue={searchValue} setsearchValue={setsearchValue} />

        <TodoList>
          {searchedTodos.map((todo) => (
            <TodoItem
              key={todo.text}
              text={todo.text}
              completed={todo.completed}
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
          ))}
        </TodoList>

        <CreateTodoButton setOpenModal={setOpenModal} />

        {openModal && (
          <Modal>
            <div className="ModalContent">
              <h2>Agregar nueva tarea</h2>
              <textarea
                value={newTodoValue}
                onChange={(e) => setNewTodoValue(e.target.value)}
                placeholder="Escribe tu nueva tarea..."
              />
              <div className="ModalActions">
                <button onClick={handleCloseModal} className="ModalCloseButton">
                  Cerrar
                </button>
                <button onClick={addTodo} className="ModalSaveButton">
                  Guardar
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}

export default App;
