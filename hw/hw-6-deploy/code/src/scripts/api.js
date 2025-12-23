const API_URL = 'http://localhost:3001/api/todos';

export const getTodos = async () => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result);
    }

    return result;
};

export const addTodo = async (title) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ title }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result);
    }

    return result;
};

export const completeTodo = async (todo) => {
    const { id, completed } = todo;

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ completed: !completed }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result);
    }

    return result;
};

export const deleteTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result);
    }

    return result;
};
