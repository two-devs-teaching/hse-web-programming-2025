import cors from 'cors';
import express, { Request, Response } from 'express';

import { MOCK_TODOS } from './data/mockData';
import { Todo } from './types/todo';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory storage (in a real app, you'd use a database)
const todos: Todo[] = [...MOCK_TODOS];

let nextId = Math.max(...todos.map(todo => todo.id)) + 1;

// GET /api/todos - Get all todos
app.get('/api/todos', (_req: Request, res: Response) => {
    res.json(todos);
});

// GET /api/todos/:id - Get a specific todo
app.get('/api/todos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
  
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
  
    res.json(todo);
});

// POST /api/todos - Create a new todo
app.post('/api/todos', (req: Request, res: Response) => {
    const { title, completed = false } = req.body;
  
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Title is required and must be a string' });
    }
  
    const newTodo: Todo = {
        id: nextId++,
        title: title.trim(),
        completed: Boolean(completed)
    };
  
    todos.unshift(newTodo);
    res.status(201).json(newTodo);
});

// PUT /api/todos/:id - Update a todo
app.put('/api/todos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === id);
  
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
  
    const { title, completed } = req.body;
  
    if (title !== undefined) {
        if (typeof title !== 'string') {
            return res.status(400).json({ error: 'Title must be a string' });
        }
        todos[todoIndex].title = title.trim();
    }
  
    if (completed !== undefined) {
        todos[todoIndex].completed = Boolean(completed);
    }
  
    res.json(todos[todoIndex]);
});

// DELETE /api/todos/:id - Delete a todo
app.delete('/api/todos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === id);
  
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
  
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    res.json(deletedTodo);
});

// Health check endpoint
app.get('/health', (_: Request, res: Response) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use('*', (_: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: any) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Todo API server is running on http://localhost:${PORT}`);
    console.log('📝 Available endpoints:');
    console.log('   GET    /api/todos     - Get all todos');
    console.log('   GET    /api/todos/:id - Get a specific todo');
    console.log('   POST   /api/todos     - Create a new todo');
    console.log('   PUT    /api/todos/:id - Update a todo');
    console.log('   DELETE /api/todos/:id - Delete a todo');
    console.log('   GET    /health        - Health check');
});

export default app;
