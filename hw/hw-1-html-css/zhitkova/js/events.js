import { state } from './state.js';
import { openModal } from './modal.js';
import { updateUI, renderNotifications } from './ui.js';
import { saveState } from './state.js';

export function initActions() {
  const actions = document.querySelectorAll(".quick-action-card");

  actions[0].addEventListener("click", () => {
    openModal({
      title: "Add New Hospital Branch",
      placeholder: "Enter branch name",
      onSubmit: (name) => {
        state.branches.push(name);
        state.notifications.unshift({
          text: `New branch '${name}' added`,
          time: "just now",
          icon: "🏥"
        });
        updateUI();
        saveState();
      }
    });
  });

  actions[1].addEventListener("click", () => {
    openModal({
      title: "Add New Course",
      placeholder: "Enter course name",
      onSubmit: (title) => {
        state.courses.push(title);
        state.notifications.unshift({
          text: `New course '${title}' created`,
          time: "just now",
          icon: "📚"
        });
        updateUI();
        saveState();
      }
    });
  });

  actions[2].addEventListener("click", () => {
    state.notifications.unshift({
      text: "New training session scheduled",
      time: "just now",
      icon: "📅"
    });
    renderNotifications();
    saveState();
  });
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