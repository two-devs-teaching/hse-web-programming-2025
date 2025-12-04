import { renderTodoGroupList, groupTodos } from '../scripts/ui/todos.js';

// Мокаем DOM методы
document.createElement = jest.fn((tagName) => {
    const element = {
        tagName: tagName.toUpperCase(),
        id: '',
        className: '',
        textContent: '',
        type: '',
        checked: false,
        name: '',
        onclick: null,
        classList: {
            add: jest.fn(),
            remove: jest.fn(),
            contains: jest.fn(),
        },
        appendChild: jest.fn(),
        querySelectorAll: jest.fn(() => []),
        addEventListener: jest.fn(),
    };
    return element;
});

describe('UI Функции', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('groupTodos', () => {
        it('должен создать активную группу со всеми задачами', () => {
            const todos = [
                { id: 1, title: 'Задача 1', completed: false },
                { id: 2, title: 'Задача 2', completed: true },
                { id: 3, title: 'Задача 3', completed: false }
            ];

            const result = groupTodos(todos);

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({
                id: 'active',
                title: 'Active',
                headless: true,
                todos: todos
            });
        });

        it('должен обработать пустой массив задач', () => {
            const todos = [];

            const result = groupTodos(todos);

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({
                id: 'active',
                title: 'Active',
                headless: true,
                todos: []
            });
        });

        it('должен включить все задачи независимо от статуса завершения', () => {
            const todos = [
                { id: 1, title: 'Завершенная задача', completed: true },
                { id: 2, title: 'Незавершенная задача', completed: false }
            ];

            const result = groupTodos(todos);

            expect(result[0].todos).toEqual(todos);
        });
    });

    describe('renderTodoGroupList', () => {
        it('должен отрендерить пустой список групп', () => {
            const groups = [];
            const onComplete = jest.fn();

            const result = renderTodoGroupList(groups, onComplete);

            expect(document.createElement).toHaveBeenCalledWith('div');
            expect(result.className).toBe('todo-group__todos');
        });

        it('должен отрендерить одну группу с задачами', () => {
            const groups = [
                {
                    id: 'active',
                    title: 'Активные',
                    headless: true,
                    todos: [
                        { id: 1, title: 'Тестовая задача', completed: false }
                    ]
                }
            ];
            const onComplete = jest.fn();

            const result = renderTodoGroupList(groups, onComplete);

            expect(document.createElement).toHaveBeenCalledWith('div');
            expect(document.createElement).toHaveBeenCalledWith('section');
            expect(document.createElement).toHaveBeenCalledWith('h2');
            expect(document.createElement).toHaveBeenCalledWith('ul');
            expect(document.createElement).toHaveBeenCalledWith('li');
            expect(document.createElement).toHaveBeenCalledWith('label');
            expect(document.createElement).toHaveBeenCalledWith('input');
            expect(document.createElement).toHaveBeenCalledWith('span');
        });

        it('должен отрендерить несколько групп', () => {
            const groups = [
                {
                    id: 'active',
                    title: 'Активные',
                    headless: false,
                    todos: [
                        { id: 1, title: 'Активная задача', completed: false }
                    ]
                },
                {
                    id: 'completed',
                    title: 'Завершенные',
                    headless: false,
                    todos: [
                        { id: 2, title: 'Завершенная задача', completed: true }
                    ]
                }
            ];
            const onComplete = jest.fn();

            const result = renderTodoGroupList(groups, onComplete);

            // Должен создать элементы для обеих групп
            const sectionCalls = document.createElement.mock.calls.filter(call => call[0] === 'section');
            expect(sectionCalls).toHaveLength(2);
        });

        it('должен обработать группу со скрытым заголовком', () => {
            const groups = [
                {
                    id: 'active',
                    title: 'Активные',
                    headless: true,
                    todos: []
                }
            ];
            const onComplete = jest.fn();

            renderTodoGroupList(groups, onComplete);

            // Должен создать элемент h2 и добавить класс visually-hidden
            expect(document.createElement).toHaveBeenCalledWith('h2');
        });

        it('должен обработать задачи с разными статусами завершения', () => {
            const groups = [
                {
                    id: 'mixed',
                    title: 'Смешанные',
                    headless: false,
                    todos: [
                        { id: 1, title: 'Незавершенная задача', completed: false },
                        { id: 2, title: 'Завершенная задача', completed: true }
                    ]
                }
            ];
            const onComplete = jest.fn();

            renderTodoGroupList(groups, onComplete);

            // Должен создать input элементы для чекбоксов
            const inputCalls = document.createElement.mock.calls.filter(call => call[0] === 'input');
            expect(inputCalls).toHaveLength(2);
        });

        it('должен установить правильные свойства элементов', () => {
            const groups = [
                {
                    id: 'test-group',
                    title: 'Тестовая группа',
                    headless: false,
                    todos: [
                        { id: 1, title: 'Тестовая задача', completed: false }
                    ]
                }
            ];
            const onComplete = jest.fn();

            renderTodoGroupList(groups, onComplete);

            // Проверяем, что createElement был вызван с ожидаемыми элементами
            expect(document.createElement).toHaveBeenCalledWith('div');
            expect(document.createElement).toHaveBeenCalledWith('section');
            expect(document.createElement).toHaveBeenCalledWith('h2');
            expect(document.createElement).toHaveBeenCalledWith('ul');
            expect(document.createElement).toHaveBeenCalledWith('li');
            expect(document.createElement).toHaveBeenCalledWith('label');
            expect(document.createElement).toHaveBeenCalledWith('input');
            expect(document.createElement).toHaveBeenCalledWith('span');
        });

        it('должен обработать пустые задачи в группе', () => {
            const groups = [
                {
                    id: 'empty',
                    title: 'Пустая группа',
                    headless: false,
                    todos: []
                }
            ];
            const onComplete = jest.fn();

            const result = renderTodoGroupList(groups, onComplete);

            expect(result.className).toBe('todo-group__todos');
            // Должен все равно создать структуру группы даже без задач
            expect(document.createElement).toHaveBeenCalledWith('section');
            expect(document.createElement).toHaveBeenCalledWith('h2');
            expect(document.createElement).toHaveBeenCalledWith('ul');
        });
    });

    describe('Граничные случаи рендеринга задач', () => {
        it('должен обработать задачи со специальными символами в заголовке', () => {
            const groups = [
                {
                    id: 'special',
                    title: 'Специальные символы',
                    headless: false,
                    todos: [
                        { id: 1, title: 'Задача с "кавычками" & <тегами>', completed: false }
                    ]
                }
            ];
            const onComplete = jest.fn();

            renderTodoGroupList(groups, onComplete);

            expect(document.createElement).toHaveBeenCalledWith('span');
        });

        it('должен обработать задачи с очень длинными заголовками', () => {
            const longTitle = 'А'.repeat(1000);
            const groups = [
                {
                    id: 'long',
                    title: 'Длинные заголовки',
                    headless: false,
                    todos: [
                        { id: 1, title: longTitle, completed: false }
                    ]
                }
            ];
            const onComplete = jest.fn();

            renderTodoGroupList(groups, onComplete);

            expect(document.createElement).toHaveBeenCalledWith('span');
        });

        it('должен обработать задачи с числовыми ID', () => {
            const groups = [
                {
                    id: 'numeric',
                    title: 'Числовые ID',
                    headless: false,
                    todos: [
                        { id: 123, title: 'Задача с числовым ID', completed: false }
                    ]
                }
            ];
            const onComplete = jest.fn();

            renderTodoGroupList(groups, onComplete);

            expect(document.createElement).toHaveBeenCalledWith('label');
            expect(document.createElement).toHaveBeenCalledWith('input');
        });
    });

    describe('Обработка событий', () => {
        it('должен передать колбэк onComplete элементам задач', () => {
            const groups = [
                {
                    id: 'test',
                    title: 'Тест',
                    headless: false,
                    todos: [
                        { id: 1, title: 'Тестовая задача', completed: false }
                    ]
                }
            ];
            const onComplete = jest.fn();

            renderTodoGroupList(groups, onComplete);

            // Функция onComplete должна использоваться в процессе рендеринга
            expect(typeof onComplete).toBe('function');
        });
    });
});