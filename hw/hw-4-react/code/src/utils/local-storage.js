const LOCAL_STORAGE_TODOS_KEY = 'todos';

export const addTodoByLS = (todo) => {
    const rawTodos = localStorage.getItem(LOCAL_STORAGE_TODOS_KEY);

    if (!rawTodos) {
        const todos = [todo];
        const value = JSON.stringify(todos);

        localStorage.setItem(LOCAL_STORAGE_TODOS_KEY, value);
    } else {
        const todos = JSON.parse(rawTodos);

        todos.unshift(todo);

        const value = JSON.stringify(todos);

        localStorage.setItem(LOCAL_STORAGE_TODOS_KEY, value);
    }
};

export const getTodosByLS = () => {
    const rawTodos = localStorage.getItem(LOCAL_STORAGE_TODOS_KEY);

    if (!rawTodos) {
        const value = JSON.stringify([]);

        localStorage.setItem(LOCAL_STORAGE_TODOS_KEY, value);

        return [];
    } else {
        return JSON.parse(rawTodos);
    }
};

export const completeTodoByLS = (id) => {
    const rawTodos = localStorage.getItem(LOCAL_STORAGE_TODOS_KEY);

    if (!rawTodos) {
        throw new Error('TODOS_NOT_FOUND');
    }

    const todos = JSON.parse(rawTodos);
    
    for (const todo of todos) {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
    }

    const value = JSON.stringify(todos);

    localStorage.setItem(LOCAL_STORAGE_TODOS_KEY, value);  
};
