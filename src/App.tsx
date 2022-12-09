import { useEffect, useState, useRef } from 'react';
import { ApiClient, ToDo } from './ApiClient';
import './App.css';

const apiClient = new ApiClient(true);

function App() {
  const dragItem = useRef<any>();
  const dragOverItem = useRef<any>();
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [label, setLabel] = useState('');
  const [loading, setLoading] = useState(true);

  function handleGetToDos() {
    apiClient
      .getToDos()
      .then((fetchedTodos) => {
        setTodos(fetchedTodos)
        setLoading(false);
      })
      .catch(console.error);
  }

  useEffect(() => {
    handleGetToDos();
  }, [setTodos]);

  async function handleAddToDoClick(newLabel: string) {
    setLoading(true);
    await apiClient.addTodo(newLabel);
    handleGetToDos();
  }

  async function handleToggleDone(id: string) {
    setLoading(true);
    await apiClient.toggleDone(id);
    handleGetToDos();
  }

  const dragStart = (e: any, position: any) => {
    dragItem.current = position;
  };

  const dragEnter = (e: any, position: any) => {
    dragOverItem.current = position;
  };

  async function drop() {
    const copyListItems = [...todos];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTodos(copyListItems);
    setLoading(true);
    await apiClient.updateTodoOrder(todos);
    setLoading(false);
  };

  return (
    <>
      <h1>To Do List</h1>

      <div className="add-todo-container">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Buy groceries"
        />
        {loading
          ? <span>Loading...</span>
          : <button onClick={() => handleAddToDoClick(label)}>Add ToDo</button>
        }
      </div>

      {loading
        ? <p>Loading...</p>
        : (
          todos.map((todo, index) => (
            <div
              key={todo.id}
              className="todo-item"
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={drop}
              draggable
            >
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
