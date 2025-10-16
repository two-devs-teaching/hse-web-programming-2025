export const initSpeechRecognition = (trigger, target) => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'ru-RU';

        const onStart = () => {
            trigger.classList.add('recording');
            trigger.disabled = true;
        };

        const onEnd = () => {
            trigger.classList.remove('recording');
            trigger.disabled = false;
        };

        trigger.addEventListener('click', (event) => {
            event.preventDefault();

            recognition.start();

            onStart();
        });

        recognition.addEventListener('result', (event) => {
            const transcript = event.results[0][0].transcript;

            target.value = transcript;

            onEnd();
        });

        recognition.addEventListener('error', (event) => {
            alert('Ошибка голосового ввода: ' + event.error);

            onEnd();
        });

        recognition.addEventListener('end', () => {
            onEnd();
        });

    } else {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();

            alert('Ваш браузер не поддерживает голосовой ввод');
        });
    }
};
