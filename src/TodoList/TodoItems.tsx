import React, { useRef } from 'react';
import { ToDo } from '../ApiClient';
import { TodoItemsProps } from './interfaces';
import './styles.css';

function TodoItems({
  apiClient,
  callbackSetLoading,
  callbackHandleGetTodos,
  callbackSetTodos,
  loading,
  todos
}: TodoItemsProps) {
  const dragItem = useRef<any>();
  const dragOverItem = useRef<any>();

  /**
   * Handles when Mark Done/Undone is clicked. Sets loading to true, calls the apiClient
   * function, then gets the new Todos.
   * @param id Id of the Todo that should be marked done.
   */
  async function handleToggleDone(id: string) {
    callbackSetLoading(true);
    await apiClient.toggleDone(id);
    callbackHandleGetTodos();
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
    callbackSetTodos(copyTodos);
    callbackSetLoading(true);
    await apiClient.updateTodoOrder(todos);
    callbackSetLoading(false);
  };

  return (
    <ul className="todo-list">
      {
        todos.map((todo: ToDo, index: number) => (
          <li
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
            {loading
              ? <button disabled>Loading...</button>
              : <button onClick={() => handleToggleDone(todo.id)}>
                Mark {todo.done ? 'Undone' : 'Done'}
              </button>
            }
          </li>
        ))
      }
    </ul>
  );
}

export { TodoItems };
