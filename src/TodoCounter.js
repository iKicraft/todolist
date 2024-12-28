import './App.css';

function ToDoCounter({ total, completed }) {
    return (
        <h1 className="todo-counter">
            {completed === total
                ? "¡Felicidades! Has completado todas tus tareas 🎉"
                : `Has completado ${completed} de ${total} TODOs`}
        </h1>
    );
}

export { ToDoCounter };
