import { ApiClient, ToDo } from "../ApiClient";

interface AddTodoProps {
  apiClient: ApiClient,
  callbackSetLoading: (bool: boolean) => void,
  callbackHandleGetTodos: () => void,
  loading: boolean
}

interface TodoItemsProps {
  apiClient: ApiClient,
  callbackSetLoading: (bool: boolean) => void,
  callbackHandleGetTodos: () => void,
  loading: boolean
  callbackSetTodos: (todos: ToDo[]) => void,
  todos: ToDo[]
}

export type { AddTodoProps, TodoItemsProps };
