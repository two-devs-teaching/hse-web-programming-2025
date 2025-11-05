import { TodoCard } from '../Todo';
import styles from './index.module.css';

export const TodoList = ({ todos, onComplete }) => {
    return (
        <ul className={styles.todoList}>
            {todos.map((todo) => (
                <li key={todo.id}>
                    <TodoCard todo={todo} onComplete={onComplete} />
                </li>
            ))}
        </ul>
    );
};