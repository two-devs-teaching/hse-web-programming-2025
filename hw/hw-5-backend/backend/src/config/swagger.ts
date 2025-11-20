import swaggerJSDoc, { Options } from 'swagger-jsdoc';

const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo API',
            version: '1.0.0',
            description: 'A simple REST API for managing todos built with Node.js, Express, and TypeScript',
            contact: {
                name: 'API Support',
                email: 'support@todoapi.com'
            },
            license: {
                name: 'ISC',
                url: 'https://opensource.org/licenses/ISC'
            }
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                Todo: {
                    type: 'object',
                    required: ['id', 'title', 'completed'],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Unique identifier for the todo',
                            example: 1
                        },
                        title: {
                            type: 'string',
                            description: 'The todo title',
                            example: 'Buy groceries'
                        },
                        completed: {
                            type: 'boolean',
                            description: 'Whether the todo is completed',
                            example: false
                        }
                    }
                },
                CreateTodoRequest: {
                    type: 'object',
                    required: ['title'],
                    properties: {
                        title: {
                            type: 'string',
                            description: 'The todo title',
                            example: 'Buy groceries'
                        },
                        completed: {
                            type: 'boolean',
                            description: 'Whether the todo is completed (defaults to false)',
                            example: false
                        }
                    }
                },
                UpdateTodoRequest: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'The todo title',
                            example: 'Buy groceries and cook dinner'
                        },
                        completed: {
                            type: 'boolean',
                            description: 'Whether the todo is completed',
                            example: true
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'Error message',
                            example: 'Todo not found'
                        }
                    }
                },
                HealthCheck: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            description: 'Health status',
                            example: 'OK'
                        },
                        timestamp: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Current timestamp',
                            example: '2023-12-01T10:30:00.000Z'
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/index.ts'] // Path to the API files
};

export const swaggerSpec = swaggerJSDoc(options);
