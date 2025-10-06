import { TODOS } from './data';
import { Store } from './store';

const store = new Store(TODOS);

document.addEventListener('DOMContentLoaded', () => store.init());