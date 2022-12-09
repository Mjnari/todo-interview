import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { ApiClient, ToDo } from '../ApiClient';
import { AddTodo } from './AddTodo';

const apiClient = new ApiClient(true);

function TodoList() {
  const dragItem = useRef<any>();
  const dragOverItem = useRef<any>();

  const [todos, setTodos] = useState<ToDo[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Gets the Todos from ApiClient.
   * If successful then removes loading status.
   * If failed then logs error.
   */
  function handleGetTodos() {
    apiClient
      .getToDos()
      .then((fetchedTodos) => {
        setTodos(fetchedTodos)
        setLoading(false);
      })
      .catch(console.error);
  }

  /**
   * On initial component mount, get the Todos.
   */
  useEffect(() => {
    handleGetTodos();
  }, [setTodos]);

  /**
   * Callback which enables us to pass the setLoading hook to child components.
   * @param bool Boolean for what to set loading to
   */
  function callbackSetLoading(bool: boolean) {
    setLoading(bool);
  }

  /**
   * Handles when Mark Done/Undone is clicked. Sets loading to true, calls the apiClient
   * function, then gets the new Todos.
   * @param id Id of the Todo that should be marked done.
   */
  async function handleToggleDone(id: string) {
    setLoading(true);
    await apiClient.toggleDone(id);
    handleGetTodos();
  }

  /**
   * Handles the initial click for dragging the Todo
   * @param e Event which is unused
   * @param position The index of the dragged Todo
   */
  const dragStart = (e: any, position: number) => {
    dragItem.current = position;
  };

  /**
   * Handles the movement of a dragged Todo before it is released
   * @param e Event which is unused
   * @param position The index of the dragged Todo
   */
  const dragEnter = (e: any, position: number) => {
    dragOverItem.current = position;
  };

  /**
   * Handles the switching of the objects when the dragged object is released.
   */
  async function drop() {
    const copyTodos = [...todos];
    const todoContent = copyTodos[dragItem.current];
    copyTodos.splice(dragItem.current, 1);
    copyTodos.splice(dragOverItem.current, 0, todoContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTodos(copyTodos);
    setLoading(true);
    await apiClient.updateTodoOrder(todos);
    setLoading(false);
  };

  return (
    <>
      <h1>To Do List</h1>

      <AddTodo apiClient={apiClient} callbackSetLoading={callbackSetLoading} callbackHandleGetTodos={handleGetTodos} loading={loading} />

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
  )
}

export { TodoList };
