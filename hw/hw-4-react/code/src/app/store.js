import { useCallback, useState } from 'react';

import { getTodosByLS, addTodoByLS, completeTodoByLS } from '../utils/local-storage';

export const useStore = () => {
    const [todos, setTodos] = useState([]);

    const init = useCallback(() => {
        const todos = getTodosByLS();

        setTodos(todos);
    }, []);

    const addTodo = useCallback((title) => {
        const newTodo = {
            title,
            completed: false,
            id: Date.now()
        };

        setTodos((todos) => [newTodo, ...todos]);
        addTodoByLS(newTodo);
    }, []);

    const completeTodo = useCallback((id) => {
        setTodos(
            (todos) => todos.map(
                (todo) => todo.id === id
                    ? {
                        ...todo,
                        completed: !todo.completed
                    }
                    : todo
            )
        );

        completeTodoByLS(id);
    }, []);

    const removeTodo = useCallback((id) => {
        setTodos((todos) => todos.filter((todo) => todo.id !== id));
    }, []);

    return {
        todos,
        init,
        addTodo,
        completeTodo,
        removeTodo
    };
};
