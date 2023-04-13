const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Web Analytics API',
            version: '1.0.0',
            description: 'API for collecting web analytics data',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
    },
    apis: ['./server.js'],
};

const specs = swaggerJSDoc(options);

module.exports = (app) => {
    app.use('/api', swaggerUi.serve, swaggerUi.setup(specs));
};
