# Todo Backend API

A simple REST API for managing todos built with Node.js, Express, and TypeScript.

## Features

- Get all todos
- Get a specific todo by ID
- Create a new todo
- Update an existing todo
- Delete a todo
- CORS enabled for frontend integration

## Prerequisites

- Node.js v22.18.0 or higher
- npm

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the TypeScript code:
```bash
npm run build
```

## Running the Server

### Development mode (with TypeScript compilation):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3001`

## API Documentation

Interactive API documentation is available via Swagger UI at:
```
http://localhost:3001/api-docs
```

The Swagger documentation provides:
- Interactive API testing interface
- Detailed endpoint descriptions
- Request/response schemas
- Example requests and responses

## API Endpoints

### Get all todos
```
GET /api/todos
```

### Get a specific todo
```
GET /api/todos/:id
```

### Create a new todo
```
POST /api/todos
Content-Type: application/json

{
    "title": "New todo title",
    "completed": false
}
```

### Update a todo
```
PUT /api/todos/:id
Content-Type: application/json

{
    "title": "Updated title",
    "completed": true
}
```

### Delete a todo
```
DELETE /api/todos/:id
```

### Health check
```
GET /health
```

## Data Structure

Todo object:
```typescript
type Todo = {
    id: number;
    title: string;
    completed: boolean;
};
```

## Example Usage

### Create a todo:
```bash
curl -X POST http://localhost:3001/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn TypeScript", "completed": false}'
```

### Get all todos:
```bash
curl http://localhost:3001/api/todos
```

### Update a todo:
```bash
curl -X PUT http://localhost:3001/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Delete a todo:
```bash
curl -X DELETE http://localhost:3001/api/todos/1
```

## Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled JavaScript
- `npm run dev` - Run in development mode with ts-node
- `npm run watch` - Watch for changes and recompile
- `npm run lint` - Run ESLint on source files
- `npm run lint:fix` - Run ESLint and fix auto-fixable issues

## Dependencies

### Production Dependencies
- `express` - Web framework for Node.js
- `cors` - Cross-Origin Resource Sharing middleware
- `swagger-jsdoc` - Generate Swagger/OpenAPI specification from JSDoc comments
- `swagger-ui-express` - Serve Swagger UI for API documentation

### Development Dependencies
- `typescript` - TypeScript compiler
- `ts-node` - TypeScript execution environment for Node.js
- `@types/*` - TypeScript type definitions
- `eslint` - JavaScript/TypeScript linter