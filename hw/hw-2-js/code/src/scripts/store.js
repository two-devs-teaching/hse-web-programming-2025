import { groupTodos, renderTodoGroupList } from './todo';

export class Store {
    todos = [];

    constructor(todos) {
        this.todos = todos;
    }

    init() {
        this.form();
        this.ui();
    }

    _completeTodo(todoId) {
        for (const todo of this.todos) {
            if (todo.id === todoId) {
                todo.completed = !todo.completed;
            }
        }
    }

    _addTodo(title) {
        this.todos.push({
            id: Date.now(),
            title,
            completed: false
        });
    }

    handleCompleteTodo(todoId) {
        this._completeTodo(todoId);
        this.ui();
    }

    handleAddTodo(event) {
        event.preventDefault();

        const title = event.target.elements.todo.value;

        if (!title) {
            return;
        }
        
        event.target.elements.todo.value = '';
    
        this._addTodo(title);
        this.ui();
    }

    form() {
        const todoForm = document.getElementById('todo-form');

        todoForm.addEventListener('submit', (event) => this.handleAddTodo(event));
    }

    ui() {
        const groups = groupTodos(this.todos);
        const groupsElement = renderTodoGroupList(groups, (event) => this.handleCompleteTodo(event));

        const container = document.getElementsByClassName('todo-list')[0];

        container.replaceChild(groupsElement, container.lastChild);
    }
}

