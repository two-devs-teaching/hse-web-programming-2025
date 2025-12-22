import { state, loadState } from './state.js';
import { updateUI } from './ui.js';
import { initActions, initSidebar } from './events.js';

document.addEventListener("DOMContentLoaded", () => {
  loadState();        
  updateUI();         
  initActions();      
  initSidebar();      
});

export { state };