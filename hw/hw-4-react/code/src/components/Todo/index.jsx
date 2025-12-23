import styles from './index.module.css';

export const TodoCard = ({ todo, onComplete }) => {
    const { id, title, completed } = todo;

    const handleComplete = () => {
        onComplete(id);
    };

    return (
        <label id={`todo-${id}`} className={styles.todo}>
            <input
                type="checkbox"
                checked={completed}
                name={`todo-input-${id}`}
                onChange={handleComplete}
            />
            <span>{title}</span>
        </label>
    );
};