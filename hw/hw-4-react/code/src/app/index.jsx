import './styles/reset.css';
import './styles/index.css';

import { Header, TodoForm, TodoList } from '../components';

import { useStore } from './store';
import { useEffect } from 'react';

export const App = () => {
    const { todos, init, addTodo, completeTodo } = useStore();

    useEffect(() => {
        init();
    }, [init]);

    return (
        <main className="page">
            <div className="todo-list">
                <Header />
                <TodoForm onAddTodo={addTodo} />
                <TodoList todos={todos} onComplete={completeTodo} />
            </div>
        </main>
    );
};

export default App;
