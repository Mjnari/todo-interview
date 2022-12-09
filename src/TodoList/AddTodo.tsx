import React, { useState } from 'react';
import { AddTodoProps } from './interfaces';

function AddTodo({ apiClient, callbackSetLoading, callbackHandleGetTodos, loading }: AddTodoProps) {
    const [label, setLabel] = useState('');

    async function handleAddToDoClick(newLabel: string) {
        callbackSetLoading(true);
        await apiClient.addTodo(newLabel);
        callbackHandleGetTodos();
    }

    return (
        <div className="add-todo-container">
            <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Buy groceries"
            />
            {loading
                ? <button disabled>Loading...</button>
                : <button onClick={() => handleAddToDoClick(label)}>Add ToDo</button>
            }
        </div>
    );
}

export { AddTodo };
