import { groupTodos, renderTodoGroupList } from './ui';
import { addTodoByLS, getTodosByLS, completeTodoByLS, getTodosByLSWithPagination } from './api/local-storage';
import { initSpeechRecognition } from './api/speech-recognition';
import { InfiniteScrollManager } from './api/intersection-observer';

export class Store {
    constructor() {
        this.todos = [];
        this.pageSize = 10;
        this.infiniteScrollManager = new InfiniteScrollManager(
            () => this._loadMoreTodos(),
            this.pageSize
        );
    }

    init() {
        this.infiniteScrollManager.init();        
        this.form();
        this._loadInitialTodos();
    }

    handleCompleteTodo(id) {
        // Обновляем внешнее хранилище
        completeTodoByLS(id);

        // Обновляем локальное хранилище
        for (const todo of this.todos) {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
        }

        // Ререндерим интерфейс
        this.ui();
    }

    handleAddTodo(event) {
        event.preventDefault();

        const title = event.target.elements.todo.value;

        if (!title) {
            return;
        }
        
        event.target.elements.todo.value = '';

        const newTodo = {
            title,
            completed: false,
            id: Date.now()
        };
    
        // Обновляем внешнее хранилище
        addTodoByLS(newTodo);

        // Обновляем локальное хранилище
        this.todos.unshift(newTodo);

        // Ререндерим интерфейс
        this.ui();
    }

    _configureSubmit(todoForm) {
        todoForm.addEventListener('submit', (event) => this.handleAddTodo(event));
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

    _loadInitialTodos() {
        this.todos = getTodosByLSWithPagination(null, this.pageSize);

        this.ui();
    }

    async _loadMoreTodos() {
        if (this.todos.length === 0) {
            return false;
        }

        const lastTodoId = this.todos[this.todos.length - 1].id;
        
        // Добавляем искусственную задержку для демонстрации лоадера
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const newTodos = getTodosByLSWithPagination(lastTodoId, this.pageSize);
        
        if (newTodos.length === 0) {
            return false;
        }

        this.todos.push(...newTodos);
        this.ui();
        
        return newTodos.length === this.pageSize;
    }

    _renderTodos(container) {
        const groups = groupTodos(this.todos);
        const groupsElement = renderTodoGroupList(groups, (event) => this.handleCompleteTodo(event));

        const existingGroups = container.querySelectorAll('.todo-group__todos');
        existingGroups.forEach((group) => group.remove());

        container.appendChild(groupsElement);
    }

    _renderSentinel(container) {
        this.infiniteScrollManager.detachSentinel();

        const allTodos = getTodosByLS();
        
        if (this.todos.length < allTodos.length) {
            this.infiniteScrollManager.attachSentinel(container);
        }
    }

    ui() {
        const container = document.getElementsByClassName('todo-list')[0];

        this._renderTodos(container);
        this._renderSentinel(container);
    }
}
