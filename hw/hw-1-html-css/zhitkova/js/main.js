import { loadState } from './state.js';
import { updateUI } from './ui.js';
import { initActions, initSidebar, setNotificationUI } from './events.js';
import { notificationManager } from './notification-api.js';
import { NotificationUI } from './notification-ui.js';

async function initApp() {
    console.log("Приложение инициализируется...");
    
    try {

        loadState();

        const notificationUI = initNotificationUI();

        setNotificationUI(notificationUI);

        await initNotificationAPI();

        updateUI();

        initActions();
        initSidebar();
        
        console.log("Приложение успешно запущено!");
        
    } catch (error) {
        console.error("Ошибка при инициализации приложения:", error);
        showError("Не удалось загрузить приложение. Пожалуйста, обновите страницу.");
    }
}

function initNotificationUI() {
    try {
        const notificationUI = new NotificationUI();

        window.notificationUI = notificationUI;
        
        return notificationUI;
    } catch (error) {
        console.error("Ошибка при инициализации Notification UI:", error);
        return null;
    }
}

async function initNotificationAPI() {
    const isSupported = notificationManager.isSupported();
    
    if (!isSupported) {
        console.warn('Браузер не поддерживает Notification API');
        showBrowserWarning();
        return;
    }

    const permission = notificationManager.getPermissionStatus();
    
    if (permission === 'denied') {
        console.warn('Пользователь запретил уведомления');
    }
}


function showBrowserWarning() {
    const warning = document.createElement('div');
    warning.className = 'browser-warning';
    warning.innerHTML = `
        <div style="
            background: #fff3cd; 
            border: 1px solid #ffeaa7; 
            padding: 10px 15px; 
            margin: 10px 0; 
            border-radius: 8px;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 10px;
        ">
            <span style="font-size: 18px;">⚠️</span>
            <div>
                <strong>Внимание:</strong> Ваш браузер не поддерживает системные уведомления.
                <br><small>Для полного функционала используйте Chrome, Firefox или Edge.</small>
            </div>
        </div>
    `;
    
    const welcomeSection = document.querySelector('.welcome');
    if (welcomeSection) {
        welcomeSection.parentNode.insertBefore(warning, welcomeSection.nextSibling);
        
        setTimeout(() => {
            if (warning.parentNode) {
                warning.style.opacity = '0';
                warning.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    if (warning.parentNode) {
                        warning.parentNode.removeChild(warning);
                    }
                }, 500);
            }
        }, 10000);
    }
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'app-error';
    errorDiv.innerHTML = `
        <div style="
            background: #fee2e2;
            border: 1px solid #fecaca;
            color: #991b1b;
            padding: 15px;
            margin: 10px;
            border-radius: 8px;
            text-align: center;
        ">
            <strong>Ошибка:</strong> ${message}
        </div>
    `;
    
    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.prepend(errorDiv);
    } else {
        document.body.prepend(errorDiv);
    }
}
if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}
export { notificationManager };