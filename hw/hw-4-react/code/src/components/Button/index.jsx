import cn from 'classnames';

import styles from './index.module.css';

export const Button = ({ className, icon, children, ...props }) => {
    return (
        <button {...props} className={cn(styles.button, className)}>
            {Boolean(icon) && icon}
            {Boolean(children) && children}
        </button>
    );
};