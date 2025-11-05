import { useState, useRef, useCallback, useEffect } from 'react';

export const useForm = (submit) => {
    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (!value) {
            return;
        }

        submit?.(value);
    };

    return {
        value,
        setValue,
        onChange,
        onSubmit
    };
};

export const useSpeechRecognition = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isSupported, setIsSupported] = useState(false);

    const recognitionRef = useRef(null);

    useEffect(() => {
        const supported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

        setIsSupported(supported);

        if (supported) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            recognitionRef.current = new SpeechRecognition();
            
            const recognition = recognitionRef.current;

            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'ru-RU';
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, []);

    const startRecognition = useCallback((onResult, onError) => {
        if (!isSupported) {
            alert('Ваш браузер не поддерживает голосовой ввод');

            return;
        }

        if (!recognitionRef.current || isRecording) {
            return;
        }

        const recognition = recognitionRef.current;

        const handleResult = (event) => {
            const transcript = event.results[0][0].transcript;

            setIsRecording(false);

            if (onResult) {
                onResult?.(transcript);
            }
        };

        const handleError = (event) => {
            setIsRecording(false);

            const errorMessage = 'Ошибка голосового ввода: ' + event.error;

            alert(errorMessage);

            if (onError) {
                onError?.(event.error);
            }
        };

        const handleEnd = () => {
            setIsRecording(false);
        };

        recognition.removeEventListener('result', handleResult);
        recognition.removeEventListener('error', handleError);
        recognition.removeEventListener('end', handleEnd);

        recognition.addEventListener('result', handleResult);
        recognition.addEventListener('error', handleError);
        recognition.addEventListener('end', handleEnd);

        try {
            recognition.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Failed to start speech recognition:', error);
            setIsRecording(false);
        }
    }, [isSupported, isRecording]);

    const stopRecognition = useCallback(() => {
        if (recognitionRef.current && isRecording) {
            recognitionRef.current.stop();
            setIsRecording(false);
        }
    }, [isRecording]);

    return {
        isRecording,
        isSupported,
        startRecognition,
        stopRecognition
    };
};
