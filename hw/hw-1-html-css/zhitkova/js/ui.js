import { state } from './state.js';

export function renderStats() {
  const values = document.querySelectorAll(".stat-value");
  values[0].textContent = state.branches.length;
  values[1].textContent = state.courses.length;
  values[2].textContent = state.trainees;
  values[3].textContent = state.trainers;
  values[4].textContent = "18";
}

export function renderNotifications() {
  const list = document.querySelector(".notif-list");
  list.innerHTML = "";

  state.notifications.forEach(item => {
    const li = document.createElement("li");
    li.className = "notif-item";
    li.innerHTML = `
      <span class="notif-icon orange">${item.icon}</span>
      <div>
        <p>${item.text}</p>
        <span class="time">${item.time}</span>
      </div>
    `;
    list.appendChild(li);
  });

  document.querySelector(".new-badge").textContent = 
    `${state.notifications.length} New`;
}

export function updateUI() {
  renderStats();
  renderNotifications();
}