export const state = {
  branches: [
    "Lahore Branch",
    "Karachi Medical Center",
    "Islamabad Branch"
  ],
  courses: [
    "Advanced Cardiology",
    "Emergency Medicine",
    "Pediatric Care"
  ],
  trainees: 247,
  trainers: 42,
  notifications: [
    {
      text: "Course 'Advanced Cardiology' starts in 2 days",
      time: "2 hours ago",
      icon: "📅"
    }
  ]
};

export function saveState() {
  localStorage.setItem("dashboardState", JSON.stringify(state));
}

export function loadState() {
  const saved = localStorage.getItem("dashboardState");
  if (saved) {
    Object.assign(state, JSON.parse(saved));
  }
}