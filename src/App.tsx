import { useEffect, useState } from 'react';
import { ApiClient, ToDo } from './ApiClient';
import './App.css';

const apiClient = new ApiClient(true);

function App() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [label, setLabel] = useState('');
  const [loadingList, setLoadingList] = useState(true);

  function handleGetToDos() {
    apiClient
      .getToDos()
      .then((fetchedTodos) => {
        setTodos(fetchedTodos)
        setLoadingList(false);
      })
      .catch(console.error);
  }

  useEffect(() => {
    handleGetToDos();
  }, [setTodos]);

  async function handleAddToDoClick(newLabel: string) {
    setLoadingList(true);
    await apiClient.addTodo(newLabel);
    handleGetToDos();
  }

  async function handleToggleDone(id: string) {
    setLoadingList(true);
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
        {loadingList
          ? <span>Loading...</span>
          : <button onClick={() => handleAddToDoClick(label)}>Add ToDo</button>
        }
      </div>

      {loadingList
        ? <p>Loading...</p>
        : (
          todos.map((todo) => (
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
          )))
      }
    </>
  );
}

export default App;
