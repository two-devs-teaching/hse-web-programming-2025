import styles from './index.module.css';

export const Header = () => {
    return (
        <header className={styles.header}>
            <img className={styles.logotype} src="/favicon.png" alt="" />
            <h1 className={styles.title}>Todo Today</h1>
        </header>
    );
};
