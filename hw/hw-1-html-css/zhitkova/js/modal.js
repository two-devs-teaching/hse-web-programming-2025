const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalInput = document.getElementById("modal-input");
const modalForm = document.getElementById("modal-form");
const modalCancel = document.getElementById("modal-cancel");

let modalAction = null;

export function openModal({ title, placeholder, onSubmit }) {
  modalTitle.textContent = title;
  modalInput.placeholder = placeholder;
  modalInput.value = "";
  modalAction = onSubmit;
  modal.classList.remove("hidden");
  modalInput.focus();
}

export function closeModal() {
  modal.classList.add("hidden");
  modalAction = null;
}

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = modalInput.value.trim();
  if (!value || !modalAction) return;
  modalAction(value);
  closeModal();
});

modalCancel.addEventListener("click", closeModal);