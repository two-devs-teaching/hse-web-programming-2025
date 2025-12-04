import { groupTodos, renderTodoGroupList } from './ui';
import { getTodos, addTodo, completeTodo } from './api';
import { initSpeechRecognition } from './features/speech-recognition';

export class Store {
    constructor() {
        this.todos = [];
    }

    async init() {
        const todos = await getTodos();

        this.todos = todos;

        this.form();
        this.ui();
    }

    _completeTodo(id) {
        for (const todo of this.todos) {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
        }
    }

    async _handleCompleteTodo(id) {
        const todo = this.todos.find((todo) => todo.id === id);

        if (!todo) return;

        await completeTodo(todo);

        this._completeTodo(id);
        this.ui();
    }

    _addTodo(todo) {
        this.todos.unshift(todo);
    }

    async _handleAddTodo(event) {
        event.preventDefault();

        const title = event.target.elements.todo.value;

        if (!title) return;
        
        event.target.elements.todo.value = '';

        const todo = await addTodo(title);

        this._addTodo(todo);
        this.ui();
    }

    _configureSubmit(todoForm) {
        todoForm.addEventListener('submit', (event) => this._handleAddTodo(event));
    }

    _configureVoiceInput(todoForm) {
        const voiceInput = document.getElementById('todo-voice-input');
        const todoInput = todoForm.elements.todo;

        initSpeechRecognition(voiceInput, todoInput);
    }

    form() {
        const todoForm = document.getElementById('todo-form');
        
        this._configureSubmit(todoForm);
        this._configureVoiceInput(todoForm);
    }

    ui() {
        const container = document.getElementsByClassName('todo-list')[0];

        const groups = groupTodos(this.todos);
        const groupsElement = renderTodoGroupList(groups, (event) => this._handleCompleteTodo(event));

        const existingGroups = container.querySelectorAll('.todo-group__todos');
        existingGroups.forEach((group) => group.remove());

        container.appendChild(groupsElement);
    }
}
