import { getTodos, addTodo, completeTodo, deleteTodo } from '../scripts/api.js';

// Мокаем fetch глобально
global.fetch = jest.fn();

describe('API Функции', () => {
    const API_URL = 'http://localhost:3001/api/todos';

    beforeEach(() => {
        fetch.mockClear();
    });

    describe('getTodos', () => {
        it('должен успешно получить список задач', async () => {
            const mockTodos = [
                { id: 1, title: 'Тестовая задача 1', completed: false },
                { id: 2, title: 'Тестовая задача 2', completed: true }
            ];

            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockTodos,
            });

            const result = await getTodos();

            expect(fetch).toHaveBeenCalledWith(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            expect(result).toEqual(mockTodos);
        });

        it('должен выбросить ошибку при неудачном запросе', async () => {
            const errorMessage = 'Ошибка сети';
            
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => errorMessage,
            });

            await expect(getTodos()).rejects.toThrow(errorMessage);
        });

        it('должен обработать сетевые ошибки', async () => {
            fetch.mockRejectedValueOnce(new Error('Ошибка сети'));

            await expect(getTodos()).rejects.toThrow('Ошибка сети');
        });
    });

    describe('addTodo', () => {
        it('должен успешно добавить новую задачу', async () => {
            const newTodo = { id: 3, title: 'Новая задача', completed: false };
            const title = 'Новая задача';

            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => newTodo,
            });

            const result = await addTodo(title);

            expect(fetch).toHaveBeenCalledWith(API_URL, {
                method: 'POST',
                body: JSON.stringify({ title }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            expect(result).toEqual(newTodo);
        });

        it('должен выбросить ошибку при неудачном добавлении задачи', async () => {
            const errorMessage = 'Не удалось добавить задачу';
            
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => errorMessage,
            });

            await expect(addTodo('Тестовая задача')).rejects.toThrow(errorMessage);
        });

        it('должен обработать пустой заголовок', async () => {
            const newTodo = { id: 3, title: '', completed: false };

            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => newTodo,
            });

            const result = await addTodo('');

            expect(fetch).toHaveBeenCalledWith(API_URL, {
                method: 'POST',
                body: JSON.stringify({ title: '' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            expect(result).toEqual(newTodo);
        });
    });

    describe('completeTodo', () => {
        it('должен успешно завершить задачу', async () => {
            const todo = { id: 1, title: 'Тестовая задача', completed: false };
            const updatedTodo = { ...todo, completed: true };

            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => updatedTodo,
            });

            const result = await completeTodo(todo);

            expect(fetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: 'PUT',
                body: JSON.stringify({ completed: !todo.completed }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            expect(result).toEqual(updatedTodo);
        });

        it('должен отменить завершение выполненной задачи', async () => {
            const todo = { id: 1, title: 'Тестовая задача', completed: true };
            const updatedTodo = { ...todo, completed: false };

            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => updatedTodo,
            });

            const result = await completeTodo(todo);

            expect(fetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: 'PUT',
                body: JSON.stringify({ completed: !todo.completed }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            expect(result).toEqual(updatedTodo);
        });

        it('должен выбросить ошибку при неудачном завершении задачи', async () => {
            const todo = { id: 1, title: 'Тестовая задача', completed: false };
            const errorMessage = 'Не удалось обновить задачу';
            
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => errorMessage,
            });

            await expect(completeTodo(todo)).rejects.toThrow(errorMessage);
        });
    });

    describe('deleteTodo', () => {
        it('должен успешно удалить задачу', async () => {
            const todoId = 1;
            const deleteResponse = { success: true };

            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => deleteResponse,
            });

            const result = await deleteTodo(todoId);

            expect(fetch).toHaveBeenCalledWith(`${API_URL}/1`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            expect(result).toEqual(deleteResponse);
        });

        it('должен выбросить ошибку при неудачном удалении задачи', async () => {
            const todoId = 1;
            const errorMessage = 'Не удалось удалить задачу';
            
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => errorMessage,
            });

            await expect(deleteTodo(todoId)).rejects.toThrow(errorMessage);
        });

        it('должен обработать удаление несуществующей задачи', async () => {
            const todoId = 999;
            const errorMessage = 'Задача не найдена';
            
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => errorMessage,
            });

            await expect(deleteTodo(todoId)).rejects.toThrow(errorMessage);
        });
    });
});