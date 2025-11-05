import cn from 'classnames';

import { IconMicro } from '../../icons';
import { Button } from '../Button';

import { useForm, useSpeechRecognition } from './hooks';

import styles from './index.module.css';

export const TodoForm = ({ onAddTodo }) => {
    const { value, setValue, onChange, onSubmit } = useForm(onAddTodo);
    const { isRecording, isSupported, startRecognition, stopRecognition } = useSpeechRecognition();

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <input
                className={styles.input}
                value={value}
                onChange={onChange}
                type="text"
            />
            {isSupported && (
                <Button
                    className={cn({ [styles.recording]: isRecording })}
                    aria-label="Voice input"
                    type="button"
                    icon={<IconMicro />}
                    onClick={() => {
                        if (!isRecording) {
                            startRecognition(setValue);
                        } else {
                            stopRecognition();
                        }
                    }}
                />
            )}
            <Button type="submit">
                Add
            </Button>
        </form>
    );
};
