import { state, saveState } from './state.js';
import { openModal } from './modal.js';
import { updateUI, renderNotifications } from './ui.js';
import { notificationManager } from './notification-api.js';

let notificationUI = null;

export function setNotificationUI(uiInstance) {
    notificationUI = uiInstance;
}
export function initActions() {
    const actions = document.querySelectorAll(".quick-action-card");
    
    if (!actions.length) return;

    actions[0].addEventListener("click", () => {
        openModal({
            title: "Add New Hospital Branch",
            placeholder: "Enter branch name",
            onSubmit: async (name) => {
                try {
                    state.branches.push(name);
                    state.notifications.unshift({
                        text: `New branch '${name}' added`,
                        time: "just now",
                        icon: "🏥"
                    });
                    await showBrowserNotification(
                        '🏥 Новый филиал добавлен',
                        `Филиал "${name}" успешно зарегистрирован в системе.`,
                        '🏥'
                    );
                    
                    updateUI();
                    saveState();
                    
                } catch (error) {
                    console.error('Ошибка при добавлении филиала:', error);
                    updateUI();
                    saveState();
                }
            }
        });
    });
    actions[1].addEventListener("click", () => {
        openModal({
            title: "Add New Course",
            placeholder: "Enter course name",
            onSubmit: async (title) => {
                try {
                    state.courses.push(title);
                    state.notifications.unshift({
                        text: `New course '${title}' created`,
                        time: "just now",
                        icon: "📚"
                    });
                    
                    await showBrowserNotification(
                        '📚 Новый курс создан',
                        `Курс "${title}" добавлен в учебную программу.`,
                        '📚'
                    );
                    
                    updateUI();
                    saveState();
                    
                } catch (error) {
                    console.error('Ошибка при добавлении курса:', error);
                    updateUI();
                    saveState();
                }
            }
        });
    });
    
    actions[2].addEventListener("click", async () => {
        try {
            state.notifications.unshift({
                text: "New training session scheduled",
                time: "just now",
                icon: "📅"
            });

            await showBrowserNotification(
                '📅 Новая сессия запланирована',
                'Тренировочная сессия успешно добавлена в расписание.',
                '📅'
            );

            renderNotifications();
            saveState();
            
        } catch (error) {
            console.error('Ошибка при планировании сессии:', error);
            renderNotifications();
            saveState();
        }
    });
}

async function showBrowserNotification(title, body, icon) {
    const permission = notificationManager.getPermissionStatus();
    
    if (permission === 'granted') {
        if (notificationUI) {
            notificationUI.showEventNotification(title, body, icon);
        } else {
            notificationManager.showNotification(title, {
                body: body,
                icon: getIconUrl(icon),
                tag: 'hospital-event'
            });
        }
    } else if (permission === 'default') {
        const granted = await notificationManager.requestPermission();
        if (granted) {
            if (notificationUI) {
                notificationUI.showEventNotification(title, body, icon);
            } else {
                notificationManager.showNotification(title, {
                    body: body,
                    icon: getIconUrl(icon),
                    tag: 'hospital-event'
                });
            }
        }
    }
}

function getIconUrl(icon) {
    const iconMap = {
        '🏥': 'https://cdn-icons-png.flaticon.com/512/619/619153.png',
        '📚': 'https://cdn-icons-png.flaticon.com/512/201/201623.png',
        '📅': 'https://cdn-icons-png.flaticon.com/512/747/747310.png'
    };
    
    return iconMap[icon] || 'https://cdn-icons-png.flaticon.com/512/201/201623.png';
}

export function initSidebar() {
    const navItems = document.querySelectorAll(".nav-item");
    
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
        });
    });
}