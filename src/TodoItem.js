import './App.css';

function TodoItem(props){
    return (
      <li className={`todo-item ${props.completed ? 'completed' : ''}`}>
        <span
          onClick={props.onComplete}
        >✅</span>
          <p>{props.text}</p>
        <span
          onClick={props.onDelete}
        >❌</span>
      </li>
    );
  }

  export { TodoItem };