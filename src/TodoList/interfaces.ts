import { ApiClient } from "../ApiClient";

interface AddTodoProps {
    apiClient: ApiClient,
    callbackSetLoading: (bool: boolean) => void,
    callbackHandleGetTodos: () => void,
    loading: boolean
}

export type { AddTodoProps };
