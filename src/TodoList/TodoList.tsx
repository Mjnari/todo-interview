import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { ApiClient, ToDo } from '../ApiClient';
import { AddTodo } from './AddTodo';
import { TodoItems } from './TodoItems';

const apiClient = new ApiClient(true);

function TodoList() {
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

  function callbackSetTodos(todos: ToDo[]) {
    setTodos(todos);
  }

  return (
    <>
      <h1>To Do List</h1>
      <AddTodo apiClient={apiClient} callbackSetLoading={callbackSetLoading} callbackHandleGetTodos={handleGetTodos} loading={loading} />

      {loading
        ? <p>Loading...</p>
        : null
      }

      <TodoItems
        apiClient={apiClient}
        callbackSetTodos={callbackSetTodos}
        callbackSetLoading={callbackSetLoading}
        callbackHandleGetTodos={handleGetTodos}
        loading={loading}
        todos={todos}
      />
    </>
  )
}

export { TodoList };
