import cors from 'cors';
import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import { swaggerSpec } from './config/swagger';
import { MOCK_TODOS } from './data/mockData';
import { Todo } from './types/todo';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// In-memory storage (in a real app, you'd use a database)
const todos: Todo[] = [...MOCK_TODOS];

let nextId = Math.max(...todos.map(todo => todo.id)) + 1;

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     description: Retrieve a list of all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of todos retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
app.get('/api/todos', (_req: Request, res: Response) => {
    res.json(todos);
});

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a specific todo
 *     description: Retrieve a todo by its ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the todo to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Todo retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/api/todos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
  
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
  
    res.json(todo);
});

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     description: Create a new todo item
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTodoRequest'
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo
 *     description: Update an existing todo by its ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the todo to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTodoRequest'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     description: Delete a todo by its ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the todo to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.delete('/api/todos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === id);
  
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
  
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    res.json(deletedTodo);
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     description: Check if the API is running
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthCheck'
 */
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
    console.log(`📚 Swagger documentation available at http://localhost:${PORT}/api-docs`);
    console.log('📝 Available endpoints:');
    console.log('   GET    /api/todos     - Get all todos');
    console.log('   GET    /api/todos/:id - Get a specific todo');
    console.log('   POST   /api/todos     - Create a new todo');
    console.log('   PUT    /api/todos/:id - Update a todo');
    console.log('   DELETE /api/todos/:id - Delete a todo');
    console.log('   GET    /health        - Health check');
});

export default app;
