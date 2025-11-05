import { TodoList } from '../TodoList';
import styles from './index.module.css';

export const TodoGroup = ({ group, onComplete }) => {
    const { id, title, headless, todos } = group;

    return (
        <section id={`todo-group-${id}`} className={styles.todoGroup}>
            <h2 className={`${styles.todoGroupTitle} ${headless ? styles.visuallyHidden : ''}`}>
                {title}
            </h2>
            <TodoList todos={todos} onComplete={onComplete} />
        </section>
    );
};