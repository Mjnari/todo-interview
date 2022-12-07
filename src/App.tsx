import { useEffect, useState } from 'react';
import { ApiClient, ToDo } from './ApiClient';
import './App.css';

const apiClient = new ApiClient(false);

function App() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [label, setLabel] = useState('');

  function handleGetToDos() {
    apiClient
      .getToDos()
      .then((fetchedTodos) => setTodos(fetchedTodos))
      .catch(console.error);
  }

  useEffect(() => {
    handleGetToDos();
  }, [setTodos]);

  async function handleAddToDoClick(newLabel: string) {
    await apiClient.addTodo(newLabel);
    handleGetToDos();
  }

  async function handleToggleDone(id: string) {
    await apiClient.toggleDone(id);
    handleGetToDos();
  }

  return (
    <>
      <h1>To Do List</h1>

      <div className="add-todo-container">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Buy groceries"
        />
        <button onClick={() => handleAddToDoClick(label)}>Add ToDo</button>
      </div>

      {todos.map((todo) => (
        <div key={todo.id} className="todo-item">
          <label
            style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
          >
            {todo.label}
          </label>
          <button onClick={() => handleToggleDone(todo.id)}>
            Mark {todo.done ? 'Undone' : 'Done'}
          </button>
        </div>
      ))}
    </>
  );
}

export default App;
