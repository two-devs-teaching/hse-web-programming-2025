import { notificationManager } from './notification-api.js';

export class NotificationUI {
    constructor() {
        this.notificationBell = document.getElementById('notification-bell');
        this.notificationDot = document.getElementById('notification-dot');
        this.notificationModal = document.getElementById('notification-modal');
        
        this.notificationStatus = document.getElementById('notification-status');
        this.enableButton = document.getElementById('enable-notifications');
        this.testButton = document.getElementById('test-notification');
        this.closeButton = document.getElementById('close-notification-modal');
        
        this.init();
    }
    
    init() {
        if (!this.notificationBell) {
            console.error('Элемент notification-bell не найден');
            return;
        }
        
        this.notificationBell.addEventListener('click', (e) => {
            e.preventDefault();
            this.openSettingsModal();
        });
        
        this.initModal();
        
        this.updateNotificationStatus();
        
        setInterval(() => this.updateNotificationStatus(), 5000);
    }
    
    initModal() {
        if (this.enableButton) {
            this.enableButton.addEventListener('click', async () => {
                await this.handleEnableNotifications();
            });
        }

        if (this.testButton) {
            this.testButton.addEventListener('click', () => {
                this.handleTestNotification();
            });
        }

        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => {
                this.closeSettingsModal();
            });
        }
        if (this.notificationModal) {
            this.notificationModal.addEventListener('click', (e) => {
                if (e.target === this.notificationModal) {
                    this.closeSettingsModal();
                }
            });
        }
    }
    
    openSettingsModal() {
        this.updateModalContent();
        if (this.notificationModal) {
            this.notificationModal.classList.remove('hidden');
        }
    }
    
    closeSettingsModal() {
        if (this.notificationModal) {
            this.notificationModal.classList.add('hidden');
        }
    }
    
    updateNotificationStatus() {
        if (!this.notificationBell) return;
        
        const isSupported = notificationManager.isSupported();
        const permission = notificationManager.getPermissionStatus();

        this.notificationBell.className = 'notification';
        
        if (!isSupported) {
            this.notificationBell.classList.add('disabled');
            if (this.notificationDot) this.notificationDot.style.display = 'none';
            return;
        }
        
        switch (permission) {
            case 'granted':
                this.notificationBell.classList.add('granted');
                if (this.notificationDot) this.notificationDot.style.display = 'block';
                break;
            case 'denied':
                this.notificationBell.classList.add('denied');
                if (this.notificationDot) this.notificationDot.style.display = 'none';
                break;
            case 'default':
                if (this.notificationDot) {
                    this.notificationDot.style.display = 'block';
                    this.notificationDot.style.background = '#f59e0b';
                }
                break;
        }
    }
    
    updateModalContent() {
        if (!this.notificationStatus) return;
        
        const isSupported = notificationManager.isSupported();
        const permission = notificationManager.getPermissionStatus();
        
        if (!isSupported) {
            this.notificationStatus.textContent = 'Не поддерживается вашим браузером';
            this.notificationStatus.className = 'unsupported';
            if (this.enableButton) this.enableButton.disabled = true;
            if (this.testButton) this.testButton.disabled = true;
            return;
        }
        
        const statusTexts = {
            'granted': 'Уведомления включены',
            'denied': 'Уведомления отключены',
            'default': 'Разрешение не запрошено'
        };
        
        this.notificationStatus.textContent = statusTexts[permission] || 'Неизвестно';
        this.notificationStatus.className = permission;
        
        if (this.enableButton) {
            if (permission === 'granted') {
                this.enableButton.textContent = 'Уведомления активны ✓';
                this.enableButton.disabled = true;
                this.enableButton.style.background = '#d1fae5';
                this.enableButton.style.color = '#065f46';
            } else if (permission === 'denied') {
                this.enableButton.textContent = 'Разрешить в настройках браузера';
                this.enableButton.disabled = true;
                this.enableButton.style.background = '#fee2e2';
                this.enableButton.style.color = '#991b1b';
            } else {
                this.enableButton.textContent = 'Включить уведомления';
                this.enableButton.disabled = false;
                this.enableButton.style.background = '';
                this.enableButton.style.color = '';
            }
        }
        
        if (this.testButton) {
            this.testButton.disabled = permission !== 'granted';
        }
    }
    
    async handleEnableNotifications() {
        try {
            const granted = await notificationManager.requestPermission();
            
            if (granted) {
                this.showMessage('Уведомления успешно включены!', 'success');

                this.updateNotificationStatus();
                this.updateModalContent();

                setTimeout(() => {
                    this.closeSettingsModal();
                }, 2000);
            } else {
                this.showMessage('Не удалось включить уведомления', 'error');
                this.updateModalContent();
            }
        } catch (error) {
            console.error('Ошибка при включении уведомлений:', error);
            this.showMessage('Произошла ошибка', 'error');
        }
    }
    
    handleTestNotification() {
        try {
            const notification = notificationManager.showNotification('🔔 Тест Hospital Dashboard', {
                body: 'Это тестовое уведомление от системы управления больницей.',
                icon: 'https://cdn-icons-png.flaticon.com/512/201/201623.png',
                requireInteraction: true,
                tag: 'test-notification'
            });
            
            if (notification) {
                this.showMessage('Тестовое уведомление отправлено!', 'success');

                if (this.notificationDot) {
                    this.notificationDot.classList.add('has-unread');
                    setTimeout(() => {
                        this.notificationDot.classList.remove('has-unread');
                    }, 3000);
                }
            } else {
                this.showMessage('Не удалось отправить уведомление', 'error');
            }
        } catch (error) {
            console.error('Ошибка при отправке тестового уведомления:', error);
            this.showMessage('Произошла ошибка', 'error');
        }
    }
    
    showMessage(text, type = 'info') {
        const message = document.createElement('div');
        message.className = `notification-message ${type}`;
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 600;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
        `;
        
        if (type === 'success') {
            message.style.background = '#d1fae5';
            message.style.color = '#065f46';
            message.style.border = '1px solid #a7f3d0';
        } else if (type === 'error') {
            message.style.background = '#fee2e2';
            message.style.color = '#991b1b';
            message.style.border = '1px solid #fecaca';
        } else {
            message.style.background = '#dbeafe';
            message.style.color = '#1e40af';
            message.style.border = '1px solid #bfdbfe';
        }
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 3000);
    }

    showEventNotification(title, body, icon = '🏥') {
        if (notificationManager.getPermissionStatus() === 'granted') {
            notificationManager.showNotification(title, {
                body: body,
                icon: this.getIconUrl(icon),
                tag: 'event-notification'
            });

            if (this.notificationDot) {
                this.notificationDot.classList.add('has-unread');
                setTimeout(() => {
                    this.notificationDot.classList.remove('has-unread');
                }, 3000);
            }
        }
    }
    
    getIconUrl(icon) {
        const iconMap = {
            '🏥': 'https://cdn-icons-png.flaticon.com/512/619/619153.png',
            '📚': 'https://cdn-icons-png.flaticon.com/512/201/201623.png',
            '📅': 'https://cdn-icons-png.flaticon.com/512/747/747310.png',
            '🎓': 'https://cdn-icons-png.flaticon.com/512/9297/9297904.png'
        };
        
        return iconMap[icon] || 'https://cdn-icons-png.flaticon.com/512/201/201623.png';
    }
}

if (!document.querySelector('#notification-animations')) {
    const style = document.createElement('style');
    style.id = 'notification-animations';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes bellPulse {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(10deg); }
            75% { transform: rotate(-10deg); }
            100% { transform: rotate(0deg); }
        }
        
        .notification.new-event .bell {
            animation: bellPulse 0.5s ease;
        }
    `;
    document.head.appendChild(style);
}