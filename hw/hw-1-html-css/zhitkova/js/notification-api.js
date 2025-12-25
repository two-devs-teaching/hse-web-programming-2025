class NotificationManager {
    constructor() {
        this.permission = null;
        this.init();
    }

    async init() {
        if (!('Notification' in window)) {
            console.warn('Браузер не поддерживает Notification API');
            return false;
        }

        this.permission = Notification.permission;
        
        if (this.permission === 'default') {
            console.log('Разрешение на уведомления ещё не запрошено');
        }
        
        return true;
    }

    async requestPermission() {
        if (!('Notification' in window)) {
            throw new Error('Браузер не поддерживает Notification API');
        }

        try {
            const permission = await Notification.requestPermission();
            this.permission = permission;
            
            if (permission === 'granted') {
                this.showWelcomeNotification();
                return true;
            } else if (permission === 'denied') {
                console.warn('Пользователь отказал в разрешении на уведомления');
                return false;
            }
        } catch (error) {
            console.error('Ошибка при запросе разрешения:', error);
            return false;
        }
    }

    showNotification(title, options = {}) {
        if (!('Notification' in window)) {
            console.warn('Notification API не поддерживается');
            return null;
        }

        if (Notification.permission !== 'granted') {
            console.warn('Нет разрешения на показ уведомлений');
            return null;
        }

        try {
            const defaultOptions = {
                body: '',
                icon: '/favicon.ico',
                badge: '/favicon.ico',
                timestamp: Date.now(),
                requireInteraction: false,
                silent: false,
                tag: 'hospital-dashboard', 
                ...options
            };

            const notification = new Notification(title, defaultOptions);

            notification.onclick = () => {
                window.focus();
                notification.close();

                console.log('Уведомление кликнуто:', title);
            };

            if (!defaultOptions.requireInteraction) {
                setTimeout(() => {
                    notification.close();
                }, 5000);
            }

            return notification;
        } catch (error) {
            console.error('Ошибка при создании уведомления:', error);
            return null;
        }
    }

    showWelcomeNotification() {
        this.showNotification('🏥 Hospital Dashboard', {
            body: 'Спасибо за разрешение! Теперь вы будете получать важные уведомления.',
            icon: 'https://cdn-icons-png.flaticon.com/512/201/201623.png',
            requireInteraction: true
        });
    }
    showNewBranchNotification(branchName) {
        return this.showNotification('🏥 Новый филиал добавлен', {
            body: `Филиал "${branchName}" успешно зарегистрирован в системе.`,
            icon: 'https://cdn-icons-png.flaticon.com/512/619/619153.png',
            badge: 'https://cdn-icons-png.flaticon.com/512/619/619153.png',
            tag: 'new-branch'
        });
    }

    showNewCourseNotification(courseName) {
        return this.showNotification('📚 Новый курс создан', {
            body: `Курс "${courseName}" добавлен в учебную программу.`,
            icon: 'https://cdn-icons-png.flaticon.com/512/201/201623.png',
            badge: 'https://cdn-icons-png.flaticon.com/512/201/201623.png',
            tag: 'new-course'
        });
    }

    showNewSessionNotification() {
        return this.showNotification('📅 Новая сессия запланирована', {
            body: 'Тренировочная сессия успешно добавлена в расписание.',
            icon: 'https://cdn-icons-png.flaticon.com/512/747/747310.png',
            tag: 'new-session'
        });
    }

    showAchievementNotification(achievement) {
        return this.showNotification('🎉 Достижение разблокировано!', {
            body: achievement,
            icon: 'https://cdn-icons-png.flaticon.com/512/9297/9297904.png',
            requireInteraction: true,
            tag: 'achievement'
        });
    }

    getPermissionStatus() {
        return Notification.permission;
    }

    isSupported() {
        return 'Notification' in window;
    }
}

export const notificationManager = new NotificationManager();